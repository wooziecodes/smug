<template>
    <div class="chatList">
        <ChatComponent v-for="chat in chats" :id="chat" :user="uid" @toggleSelect="toggleSelect"></ChatComponent>
    </div>
    <div class="container chat-container" v-if="selected">
        <div class="message-container">
            <Message v-for="message in messages" :user="message.uid" :recipient="message.recipient" :text="message.text"
                :isUser="message.isUser"></Message>
        </div>
        <div class="d-flex justify-content-between message-parent">
            <input type="text" class="form-control message-box" placeholder="Enter your message"
                @keypress.enter="sendMessage" v-model="text">
            <button type="button" class="btn send-btn" @click="sendMessage">Send</button>
        </div>
    </div>
</template>
<script>
import { query, collection, setDoc, doc, where, getDocs, onSnapshot, serverTimestamp, orderBy } from "firebase/firestore"
import { db, auth } from "../firebase/init"
import { onAuthStateChanged } from "firebase/auth"
import Message from "../components/Message.vue"
import ChatComponent from "../components/ChatComponent.vue"

export default {
    data() {
        return {
            uid: "",
            recipient: "",
            emitted: "",
            messages: [],
            chats: [],
            text: "",
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
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                const c = doc.data().chats
                c.forEach((chat) => {
                    this.chats.push(chat)
                })
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
        toggleSelect(e) {
            this.selected = true
            this.recipient = e
            this.getMessages();
        }
    },
    components: {
        Message, ChatComponent
    }
}
</script>
<style>
.chatList {
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100vh;
    overflow: auto;
}

.chat-container {
    position: absolute;
    right: 0;
    padding-top: 5vh;
    width: 70% !important;
    height: 100vh;
    background-color: #f3f9fb;
}

.message-container {
    height: 90%;
    overflow: auto;
}

.message-parent {
    position: absolute;
    bottom: 2vh;
    width: 58%;
    left: 21%;
}

.message-box {
    width: 85% !important;
}

.send-btn {
    background: #1f5c64 !important;
    color: white !important;
    width: 12%;
}
</style>