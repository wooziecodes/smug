<template>
    <Navbar></Navbar>
    <div class="chatList">
        <ChatComponent v-for="chat in chats" :id="chat" :user="uid" @toggleSelect="toggleSelect"></ChatComponent>
    </div>
    <div class="container chat-container" v-if="selected">
        <div class="d-flex align-items-center chat-header">
            <img :src="imgUrl" />
            <span class="display-name">{{ name }}</span>
        </div>
        <div class="message-container">
            <Message v-for="message in messages" :user="message.uid" :recipient="message.recipient" :text="message.text"
                :isUser="message.isUser"></Message>
        </div>
        <div class="d-flex justify-content-between align-items-center message-parent">
            <input type="text" class="form-control message-box" placeholder="Enter your message"
                @keypress.enter="sendMessage" v-model="text">
            <button type="button" class="btn send-btn" @click="sendMessage" id="active-button">Send</button>
        </div>
    </div>
    
    <div class="container chat-container" v-if="selected == false">
        <div class="d-flex align-items-center chat-header">
            <img :src="imgUrl" />
            <span class="display-name">{{ name }}</span>
            Select a user first!
        </div>
        <div class="message-container">
            
        </div>
        <div class="d-flex justify-content-between align-items-center message-parent">
            <input type="text" class="form-control message-box" placeholder="Enter your message"
                @keypress.enter="sendMessage" v-model="text">
            <button type="button" class="btn send-btn" @click="sendMessage" disabled id="disabled-button">Send</button>
        </div>
        
    </div>

</template>
<script>
import { query, collection, setDoc, doc, updateDoc, where, getDocs, onSnapshot, serverTimestamp, orderBy } from "firebase/firestore"
import { db, auth, storage } from "../firebase/init"
import { ref, getDownloadURL, listAll } from "firebase/storage"
import { onAuthStateChanged } from "firebase/auth"
import Message from "../components/Message.vue"
import ChatComponent from "../components/ChatComponent.vue"
import Navbar from "../components/Navbar.vue"

export default {
    data() {
        return {
            uid: "",
            recipient: "",
            emitted: "",
            messages: [],
            chats: [],
            name: "",
            text: "",
            imgUrl: "",
            selected: false
        }
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.loadChat(user.uid)
                this.uid = user.uid
            } else {
                console.log("Not signed in")
            }
        })

    },
    methods: {
        async loadChat(uid) {
            const q = query(collection(db, "users"), where("uid", "==", uid))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((docu) => {
                    const c = docu.data().chats
                    if (this.$route.params.id != undefined && this.$route.params.id != "") {
                        this.selected = true
                        const q = query(collection(db, "listings"))
                        getDocs(q).then((querySnapshot) => {
                            querySnapshot.forEach((d) => {
                                if (d.id == this.$route.params.id) {
                                    const q = query(collection(db, "users"), where("uid", "==", d.data().userID))
                                    getDocs(q).then((querySnapshot) => {
                                        querySnapshot.forEach((recipient) => {
                                            if (!c.includes(recipient.id)) {
                                                const q = query(collection(db, "users"), where("uid", "==", this.uid))
                                                getDocs(q).then((querySnapshot) => {
                                                    querySnapshot.forEach((docu) => {
                                                        var chats = docu.data().chats
                                                        chats.push(recipient.id)
                                                        const userRef = doc(db, "users", docu.id)
                                                        updateDoc(userRef, {
                                                            chats: chats
                                                        }).then(() => {
                                                            this.chats = chats
                                                            const q2 = query(collection(db, "users"), where("uid", "==", recipient.data().uid))
                                                            getDocs(q2).then((querySnapshot) => {
                                                                querySnapshot.forEach((d) => {
                                                                    console.log('2')
                                                                    var rChats = d.data().chats
                                                                    rChats.push(docu.id)
                                                                    const newRef = doc(db, "users", recipient.id)
                                                                    updateDoc(newRef, {
                                                                        chats: rChats
                                                                    }).then(() => { })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })


                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                    c.forEach((chat) => {
                        this.chats.push(chat)
                    })
                })
            })

        },
        async setRecipient() {
            const q = query(collection(db, "listings"))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                if (doc.id == this.$route.params.id) {
                    this.recipient = doc.data().userID
                    this.getMessages();
                    this.loadName();
                    this.loadImage();
                }
            })
        },
        async getMessages() {
            const q = query(collection(db, "messages"), orderBy("timestamp"))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                this.messages = []
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid == this.uid && doc.data().recipient == this.recipient) {
                        var docData = doc.data()
                        docData["isUser"] = true
                        this.messages.push(docData)
                    } else if (doc.data().recipient == this.uid && doc.data().uid == this.recipient) {
                        var docData = doc.data()
                        docData["isUser"] = false
                        this.messages.push(docData)
                    }
                })
            })
        },
        async loadName() {
            const q = query(collection(db, "users"), where("uid", "==", this.recipient))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                this.name = doc.data().user
            })
        },
        async sendMessage() {
            const newMessage = {
                uid: this.uid,
                recipient: this.recipient,
                text: this.text,
                timestamp: serverTimestamp()
            }
            this.text = ""

            const messagesRef = collection(db, "messages")
            await setDoc(doc(messagesRef), newMessage);
        },
        async loadImage() {
            const q = query(collection(db, "users"))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                if (doc.data().uid == this.recipient) {
                    var listRef = ref(storage, "users")
                    listAll(listRef)
                        .then((res) => {
                            res.items.forEach((itemRef) => {
                                const prefix = itemRef.name.split(".")[0]
                                if (prefix == doc.id) {
                                    getDownloadURL(ref(storage, "users/" + itemRef.name))
                                        .then((url) => {
                                            this.imgUrl = url
                                        })
                                }
                            })
                        })
                }
            })
        },
        toggleSelect(e) {
            this.selected = true
            this.recipient = e
            this.getMessages();
            this.loadName();
            this.loadImage();
        }
    },
    components: {
        Message, ChatComponent, Navbar
    }
}
</script>
<style>
.chatList {
    position: absolute;
    background-color: #F1EFEF;
    top: 15%;
    left: 5%;
    width: 20%;
    height: 85%;
    overflow: auto;
}

.chat-container {
    position: absolute;
    left: 27.5%;
    top: 15%;
    padding-top: 5vh;
    width: 40% !important;
    height: 85%;
    background-color: #f3f9fb;
}

.chat-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
    background: #F1EFEF;
}

.chat-header span {
    font-size: 22px;
    margin-left: 2%;
}

.chat-header img {
    object-fit: cover;
    border-radius: 50%;
    height: 80%;
    margin-left: 3%;
}

.message-container {
    position: absolute;
    top: 10%;
    left: 0;
    height: 80%;
    width: 100%;
    overflow: auto;
}

.message-parent {
    position: absolute;
    background: #F1EFEF;
    bottom: 0;
    left: 0;
    height: 10%;
    width: 100%;
}

.message-box {
    width: 80% !important;
    height: 70% !important;
    font-size: 14px !important;
    margin-left: 2%;
}

.send-btn {
    color: white !important;
    width: 15%;
    font-size: 14px;
    height: 70%;
    margin-right: 2%;
}

#active-button{
    background: #75ACB4 !important;
}

#active-button:hover{
    background: #1f5c64 !important;
}

#disabled-button{
    background: #737373 !important;
}
</style>