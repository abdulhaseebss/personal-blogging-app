import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const profileImage = document.querySelector('#profileImage');
const username = document.querySelector('#username');
const allBlogs = document.querySelector('#allBlogs');
const profile = document.querySelector('#profile');
const logout = document.querySelector('#logout');


allBlogs.addEventListener('click' , ()=>{
    window.location = "index.html"
});
profile.addEventListener('click' , ()=>{
    window.location = "profile.html"
});



onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let fullName = `${doc.data().firstName} ${doc.data().lastName}`
            username.innerHTML = fullName
            profileImage.src = doc.data().profileUrl
        });
        // getDataFromFirestore(user.uid)
    } else {
        window.location = 'index.html'
    }
});

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');

    }).catch((error) => {
        console.log(error);
    });
})