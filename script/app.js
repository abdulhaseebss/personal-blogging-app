import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, orderBy, deleteDoc, doc, updateDoc, where } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


// profileDiv.className = "hidden"

const loginBtn = document.querySelector('#loginBtn')
const profileDiv = document.querySelector('#profileDiv')
const logout = document.querySelector('#logout')
const profileImage = document.querySelector('#profileImage');
const username = document.querySelector('#username');
const profile = document.querySelector('#profile');
const dashboard = document.querySelector('#dashboard');


profile.addEventListener('click' , ()=>{
    window.location = "profile.html"
})
dashboard.addEventListener('click' , ()=>{
    window.location = "dashboard.html"
})


loginBtn.style.display = "none"



onAuthStateChanged(auth, async(user) => {
    if (user) {
      
        const uid = user.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let fullName = `${doc.data().firstName} ${ doc.data().lastName}`
            console.log(fullName);
            username.innerHTML = fullName
            profileImage.src = doc.data().profileUrl
            return
        });
        // getDataFromFirestore(user.uid)
    } else {
        loginBtn.style.display = "block"
        profileDiv.style.display = 'none'
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


