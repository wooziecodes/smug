<template>
    <div class="parent-container" @click="toggleSelect">
        <img :src="imgUrl" class="pfp" />
        <div class="preview">
            <p class="name">{{ name }}</p>
            <p class="text">{{ recent }}</p>
        </div>
    </div>
</template>
<script>
import { query, collection, orderBy, onSnapshot, getDocs } from "firebase/firestore"
import { db, storage } from "../firebase/init"
import { ref, getDownloadURL, listAll } from "firebase/storage"

export default {
    data() {
        return {
            uid: "",
            recent: "",
            imgUrl: "",
            name: "",
        }
    },
    props: {
        id: String,
        user: String
    },
    created() {
        this.getUID()
        this.loadImage()
    },
    methods: {
        async getRecentMessage() {
            const q = query(collection(db, "messages"), orderBy("timestamp"))
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid == this.uid && doc.data().recipient == this.user) {
                        this.recent = doc.data().text
                    } else if (doc.data().recipient == this.uid && doc.data().uid == this.user) {
                        this.recent = doc.data().text
                    }
                })
            })
        },
        async getUID() {
            const q = query(collection(db, "users"))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                if (doc.id == this.id) {
                    this.uid = doc.data().uid
                    this.name = doc.data().user
                    this.getRecentMessage()
                }
            })
        },
        async loadImage() {
            const q = query(collection(db, "users"))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                if (doc.id == this.id) {
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
        toggleSelect() {
            this.$emit("toggleSelect", this.uid)
        }
    }
}
</script>
<style>
.parent-container {
    margin-top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 10vh;
    cursor: pointer;
}

.parent-container:hover {
    background: #D9D9D9;
}

.pfp {
    object-fit: cover;
    height: 45%;
    border-radius: 50%;
    margin-left: 5%;
}

.preview {
    margin-left: 5%;
}

.name {
    margin-top: 12%;
    font-size: 16px;
    color: black;
}

.text {
    margin-top: -12%;
    font-size: 14px;
}
</style>