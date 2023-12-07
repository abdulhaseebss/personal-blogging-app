import { createUserWithEmailAndPassword,onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { auth, db, storage } from './config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'

const form = document.querySelector('#form');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeat-password');
const modalMessage = document.querySelector('#modal-message');
const uploadPic = document.querySelector('#upload-picture');



onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location = 'index.html'
        // return
    }
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (password.value !== repeatPassword.value) {
        console.log('password are not same');
        modalMessage.innerHTML = 'password is not same here'
        my_modal_1.showModal()
        return
    }
    const files = uploadPic.files[0]
    const storageRef = ref(storage, email.value);
    uploadBytes(storageRef, files).then(() => {
        getDownloadURL(storageRef).then((url) => {
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    addDoc(collection(db, "users"), {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        uid: user.uid,
                        profileUrl: url
                    }).then((res) => {
                        console.log(res);
                        window.location = 'login.html'
                    }).catch((err) => {
                        console.log(err);
                    })
                })
        })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                modalMessage.innerHTML = errorMessage
                my_modal_1.showModal()
            });
    })

        .catch((error) => {
            const errorMessage = error.message;
            const errorCode = error.message;
            console.log(errorMessage);
            console.log(errorCode);
            modalMessage.innerHTML = errorMessage
                my_modal_1.showModal()
        });

})