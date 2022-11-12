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
            <button type="button" class="btn" @click="sendMessage" id="send-btn">Send</button>
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
            <button type="button" class="btn" id="disabled-btn" disabled>Send</button>
        </div>
    </div>

    <div class="profile" v-if="selected">
        <div class="d-flex">

            <div class="container details">
                <div class="row">
                    <div class="col col-xl-6" style="text-align:center">
                        <img :src="imgUrl" class="img-fluid w-100 h-100" />
                    </div>

                    <div class="col col-xl-6">
                        <div class="row">
                            <div class="col">
                                <span class="card-name">{{ name }}&nbsp;</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <font-awesome-icon icon="fa-solid fa-star" class="fa-star" />
                                <span class="ratings">{{ rating }} ({{ ratingCount }})</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <span>Year {{ year }} {{ major }} Major</span>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
        <!-- <div class="desc">{{ description }}</div> -->
        <div v-if="!reviewing">
            <div v-if="!isAccepted">
                <div v-if="!isWaiting">
                    <div class="btn btn-light booking-btn" v-if="!hasSentBooking" @click="sendBooking">Send booking
                    </div>
                    <div class="btn btn-light booking-btn" v-if="hasSentBooking">Booking sent</div>
                </div>
                <div class="btn btn-light booking-btn" v-if="isWaiting" @click="acceptBooking($event)">Accept booking
                </div>
            </div>
            <div class="btn btn-light booking-btn" v-if="isAccepted">Booking Accepted</div>
        </div>
        <div class="d-flex justify-content-center heartBox" v-if="reviewing">
            <font-awesome-icon :icon="icon1" @mouseover="icon1 = ['fa-solid', 'fa-heart']"
                @mouseout="icon1 = ['fa-regular', 'fa-heart']" class="fa-heart" @click="rate(1)" />
            <font-awesome-icon :icon="icon2"
                @mouseover="icon1 = ['fa-solid', 'fa-heart']; icon2 = ['fa-solid', 'fa-heart']"
                @mouseout="icon1 = ['fa-regular', 'fa-heart']; icon2 = ['fa-regular', 'fa-heart']" class="fa-heart"
                @click="rate(2)" />
            <font-awesome-icon :icon="icon3"
                @mouseover="icon1 = ['fa-solid', 'fa-heart']; icon2 = ['fa-solid', 'fa-heart']; icon3 = ['fa-solid', 'fa-heart']"
                @mouseout="icon1 = ['fa-regular', 'fa-heart']; icon2 = ['fa-regular', 'fa-heart']; icon3 = ['fa-regular', 'fa-heart']"
                class="fa-heart" @click="rate(3)" />
            <font-awesome-icon :icon="icon4"
                @mouseover="icon1 = ['fa-solid', 'fa-heart']; icon2 = ['fa-solid', 'fa-heart']; icon3 = ['fa-solid', 'fa-heart']; icon4 = ['fa-solid', 'fa-heart']"
                @mouseout="icon1 = ['fa-regular', 'fa-heart']; icon2 = ['fa-regular', 'fa-heart']; icon3 = ['fa-regular', 'fa-heart']; icon4 = ['fa-regular', 'fa-heart']"
                class="fa-heart" @click="rate(4)" />
            <font-awesome-icon :icon="icon5"
                @mouseover="icon1 = ['fa-solid', 'fa-heart']; icon2 = ['fa-solid', 'fa-heart']; icon3 = ['fa-solid', 'fa-heart']; icon4 = ['fa-solid', 'fa-heart']; icon5 = ['fa-solid', 'fa-heart']"
                @mouseout="icon1 = ['fa-regular', 'fa-heart']; icon2 = ['fa-regular', 'fa-heart']; icon3 = ['fa-regular', 'fa-heart']; icon4 = ['fa-regular', 'fa-heart']; icon5 = ['fa-regular', 'fa-heart']"
                @click="rate(5)" />
        </div>
        <div v-if="reviewed">Thanks for leaving a review!</div>
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
            major: "",
            year: "",
            description: "",
            rating: "",
            ratingCount: "",
            text: "",
            imgUrl: "",
            selected: false,
            hasSentBooking: false,
            isWaiting: false,
            isAccepted: false,
            reviewing: false,
            reviewed: false,
            icon1: ['fa-regular', 'fa-heart'],
            icon2: ['fa-regular', 'fa-heart'],
            icon3: ['fa-regular', 'fa-heart'],
            icon4: ['fa-regular', 'fa-heart'],
            icon5: ['fa-regular', 'fa-heart']
        }
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.loadChat(user.uid)
                this.uid = user.uid
            }
        })

    },
    methods: {
        async rate(rating) {
            const q = query(collection(db, "users"), where("uid", "==", this.uid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((d) => {
                var confirmedBookings = d.data().confirmedBookings
                var idx = confirmedBookings.indexOf(this.recipient)
                confirmedBookings.splice(idx, 1)
                const userRef = doc(db, "users", d.id)
                updateDoc(userRef, {
                    confirmedBookings: confirmedBookings
                }).then(() => {
                    const q = query(collection(db, "users"), where("uid", "==", this.recipient))
                    getDocs(q).then((querySnapshot) => {
                        querySnapshot.forEach((docu) => {
                            var currentRating = docu.data().rating
                            var ratingCount = docu.data().ratingCount
                            var total = currentRating * ratingCount
                            ratingCount += 1
                            total = (total + rating) / ratingCount
                            const userRef = doc(db, "users", docu.id)
                            updateDoc(userRef, {
                                rating: total,
                                ratingCount: ratingCount
                            }).then(() => {
                                this.reviewing = false
                                this.reviewed = true
                            })
                        })

                    })
                })

            })
        },
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


                                            } else {
                                                this.recipient = recipient.data().uid
                                                this.getMessages();
                                                this.loadName();
                                                this.loadImage();
                                                this.loadCard(this.recipient)
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    }
                    this.chats = []
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
        async loadCard() {
            const q = query(collection(db, "users"), where("uid", "==", this.recipient))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.major = doc.data().major
                    this.year = doc.data().year
                    this.rating = doc.data().rating.toFixed(2)
                    this.ratingCount = doc.data().ratingCount
                    this.description = doc.data().description
                    var q = query(collection(db, "users"), where("uid", "==", this.uid))
                    getDocs(q).then((qs) => {
                        qs.forEach((d) => {
                            const pending = d.data().pendingBookings
                            if (pending.includes(this.recipient)) {
                                this.hasSentBooking = true
                            } else {
                                this.hasSentBooking = false
                            }
                            const sent = doc.data().pendingBookings
                            if (sent.includes(this.uid)) {
                                this.hasSentBooking = false
                                this.isWaiting = true
                            } else {
                                this.isWaiting = false
                            }
                            const confirmed = d.data().confirmedBookings
                            if (confirmed.includes(this.recipient)) {
                                this.isAccepted = true
                                this.reviewing = true
                            }
                            const otherConfirmed = doc.data().confirmedBookings

                            if (otherConfirmed.includes(this.uid)) {
                                this.isAccepted = true
                                this.reviewing = false
                            }
                        })
                    })

                })
            })

        },
        async sendBooking() {
            const q = query(collection(db, "users"), where("uid", "==", this.uid))
            getDocs(q).then((qs) => {
                qs.forEach((d) => {
                    const pending = d.data().pendingBookings
                    const userRef = doc(db, "users", d.id)
                    pending.push(this.recipient)
                    updateDoc(userRef, {
                        pendingBookings: pending
                    }).then(() => {
                        this.hasSentBooking = true
                    })
                })
            })
        },
        async acceptBooking() {
            const q = query(collection(db, "users"), where("uid", "==", this.recipient))
            getDocs(q).then((qs) => {
                qs.forEach((d) => {
                    const confirmed = d.data().confirmedBookings
                    const pending = d.data().pendingBookings
                    const idx = pending.indexOf(this.recipient)
                    pending.splice(idx, 1)
                    const userRef = doc(db, "users", d.id)
                    confirmed.push(this.uid)
                    updateDoc(userRef, {
                        confirmedBookings: confirmed,
                        pendingBookings: pending
                    }).then(() => {
                        this.isAccepted = true
                    })
                })
            })
        },
        getMessages() {
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
                this.selected = true
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
            this.selected = false
            this.recipient = e
            this.getMessages();
            this.loadName();
            this.loadImage();
            this.loadCard(this.uid)
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
    height: 75%;
    overflow: auto;
}

.ratings {
    font-size: 12px;
    color: #75ACB4;
}

.booking-btn {
    margin-top: 5%;
    width: 40%;
    margin-left: 30%;
}

.profile {
    position: absolute;
    top: 15%;
    right: 5%;
    height: 75%;
    width: 25%;
    background-color: #F1EFEF;
}

.heartBox {
    margin-top: 20%;
    width: 100%;
}

.details {
    margin-top: 5px;
    background: #F1EFEF !important;
    width: 100%
}

.profile img {
    width: 40%;
}

.fa-heart {
    width: 20px;
}

.chat-container {
    position: absolute;
    left: 27.5%;
    top: 15%;
    padding-top: 5vh;
    width: 40% !important;
    height: 75%;
    background-color: #f3f9fb;
}

.card-name {
    font-size: 18px;
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

#send-btn {
    background: #75ACB4 !important;
    color: white !important;
    width: 15%;
    font-size: 14px;
    height: 70%;
    margin-right: 2%;
}

#send-btn:hover {
    background: #1f5c64 !important;
}

#disabled-btn {
    background: #4c4c4c !important;
    color: white !important;
    width: 15%;
    font-size: 14px;
    height: 70%;
    margin-right: 2%;
}
</style>