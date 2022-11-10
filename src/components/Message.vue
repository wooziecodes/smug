<template>
    <div class="d-flex parent">
        <img v-if="isUser" :src="imgUrl" class="leftImg" />
        <div :class="{ user: isUser, recipient: !isUser }">
            {{ text }}
        </div>
        <img v-if="!isUser" :src="imgUrl" class="rightImg" />
    </div>

</template>
<script>
import { getDocs, query, collection, where } from "firebase/firestore"
import { db, storage } from "../firebase/init"
import { ref, getDownloadURL, listAll } from "firebase/storage"

export default {
    data() {
        return {
            message: "",
            imgUrl: ""
        }
    },
    props: {
        user: String,
        recipient: String,
        text: String,
        isUser: Boolean
    },
    created() {
        this.loadImage()
    },
    methods: {
        async loadImage() {
            const q = query(collection(db, "users"), where("uid", "==", this.user))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
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
            })
        }
    }
}
</script>
<style>
.parent {
    margin-top: 1%;
}

.user {
    width: 30%;
    background: #75acb4;
    color: white;
    border-radius: 6px;
    padding: 10px;
}

.recipient {
    width: 30%;
    background: #1f5c64;
    color: white;
    border-radius: 6px;
    padding: 10px;
    margin-right: 0;
    margin-left: auto;
}

.leftImg {
    object-fit: cover;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 2%;
}

.rightImg {
    object-fit: cover;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 2%;
}
</style>