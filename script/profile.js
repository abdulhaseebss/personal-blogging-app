import { onAuthStateChanged, signOut ,updatePassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where, updateDoc, doc, } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const profileImage = document.querySelector('#profileImage');
const username = document.querySelector('#username');
const username1 = document.querySelector('#username1');
const logout = document.querySelector('#logout');
const dashboard = document.querySelector('#dashboard');
const allBlogs = document.querySelector('#allBlogs');
const firstInput = document.querySelector('#firstInput');
const lastInput = document.querySelector('#lastInput');
const userForm = document.querySelector('#userForm');
const pen = document.querySelector('#pen');
const updateForm = document.querySelector('#updateForm');
const newPassword = document.querySelector('#newPassword');
const repeatPassword = document.querySelector('#repeatPassword');
const personalBlog = document.querySelector('#personalBlog')
const changeName = document.querySelector('#changeName')

personalBlog.addEventListener('click' , ()=>{
    window.location = "index.html"
})

allBlogs.addEventListener('click' , ()=>{
    window.location = "index.html"
})
dashboard.addEventListener('click' , ()=>{
    window.location = "dashboard.html"
})

let uid;

onAuthStateChanged(auth, async (user) => {
    if (user) {
         uid = user.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let fullName = `${doc.data().firstName} ${doc.data().lastName}`
            username.innerHTML = fullName
            username1.innerHTML = fullName
            profileImage.src = doc.data().profileUrl
        });
        // getDataFromFirestore(user.uid)
    } else {
        window.location = 'index.html'
    }
});

pen.addEventListener('click' , ()=>{
    my_modal_1.showModal()

    userForm.addEventListener('submit' ,  async function updateUserName(e) {  
        e.preventDefault() 
        // console.log(doc.data());
        uid = auth.currentUser.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let fullName = `${doc.data().firstName} ${doc.data().lastName}`
            const updatedName = doc.data().firstName

            console.log(updatedName);
            
            // username.innerHTML = fullName
            // username1.innerHTML = fullName
            
            // profileImage.src = doc.data().profileUrl
        });

        // const q = query(collection(db, "user"), where("uid", "==", uid));
        // const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        // querySnapshot.forEach((doc) => {
        //   updateDoc(doc.ref, {
        //     firstName: firstInput.value,
        //     lastName: lastInput.value,
        //   });
        // });
        // updateUserName()
    })
})

  





logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');

    }).catch((error) => {
        console.log(error);
    });
})
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = auth.currentUser;



    if (repeatPassword.value !== newPassword.value) {
     alert('Password are not same')
      return
    }
  
  
    updatePassword(user, newPassword.value)
    .then(() => {
        // Update successful.
        console.log("password updated");
      }).catch((error) => {
        // An error ocurred
        // ...
        console.log(error);
      });
})

// changeName.addEventListener("click", async (user) => {
//     // const newName = prompt("Enter a new name");
//     if (firstInput.value && lastInput.value === "") {
//       return;
//     }
//     await updateProfile(user, {
//       firstName: firstInput.value,
//       lastName: lastInput.value,

//     });
//     // rendernewData(user);
//   });

//   function rendernewData(user) {
//     username.innerHTML =  user.displayName;
//     username1.innerHTML =  user.displayName;
//   }