import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, orderBy, deleteDoc, doc, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


// profileDiv.className = "hidden"

const loginBtn = document.querySelector('#loginBtn')
const profileDiv = document.querySelector('#profileDiv')
const logout = document.querySelector('#logout')
const profileImage = document.querySelector('#profileImage');
const username = document.querySelector('#username');


loginBtn.className = "hidden"


onAuthStateChanged(auth, async(user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            username.innerHTML = doc.data().name
            profileImage.src = doc.data().profileUrl
            console.log();
        });
        // getDataFromFirestore(user.uid)
    } else {
        window.location = 'signup.html'
    }
    
    
});




logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        profileDiv.className = "hidden"
        loginBtn.className = "block"

    }).catch((error) => {
        console.log(error);
    });
})


