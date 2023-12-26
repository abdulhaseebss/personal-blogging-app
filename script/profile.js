import { onAuthStateChanged, signOut, updatePassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where, updateDoc, doc, orderBy } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


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
const oldPassword = document.querySelector('#oldPassword')

personalBlog.addEventListener('click', () => {
    window.location = "index.html"
})

allBlogs.addEventListener('click', () => {
    window.location = "index.html"
})
dashboard.addEventListener('click', () => {
    window.location = "dashboard.html"
})

let uid;
let arr = []

onAuthStateChanged(auth, async (user) => {
    if (user) {
        uid = user.uid;
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
            // console.log(doc.data());
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

pen.addEventListener('click', async () => {
    my_modal_1.showModal()

    // userForm.addEventListener('submit' ,  async function updateUserName(e) {  
    //     e.preventDefault() 
    //     // console.log(doc.data());
    //     uid = auth.currentUser.uid;
    //     const q = query(collection(db, "user"), where("uid", "==", uid));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.data());
    //         let fullName = `${doc.data().firstName} ${doc.data().lastName}`
    //         const updatedName = doc.data().firstName

    //         console.log(updatedName);

    //         // username.innerHTML = fullName
    //         // username1.innerHTML = fullName

    //         // profileImage.src = doc.data().profileUrl
    //     });

    //     // const q = query(collection(db, "user"), where("uid", "==", uid));
    //     // const querySnapshot = await getDocs(q);
    //     // console.log(querySnapshot);
    //     // querySnapshot.forEach((doc) => {
    //     //   updateDoc(doc.ref, {
    //     //     firstName: firstInput.value,
    //     //     lastName: lastInput.value,
    //     //   });
    //     // });
    //     // updateUserName()
    // })
    // const firstP = prompt('Enter First Name')
    // const lastP = prompt('Enter Last Name')
    // console.log(firstP);
    // console.log(arr[0]);
    // let newArr = arr[0]
    // await updateDoc(doc(db, "user"), {
    //     firstName: firstP,
    //     lastName: lastP
    // });
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
    console.log(user);



    if (repeatPassword.value !== newPassword.value) {
        alert('Password are not same')
        return
    }

    if (arr[0].password === oldPassword.value) {
        updatePassword(user, newPassword.value)
            .then(async() => {
                // Update successful.
                const q = query(collection(db, "user"), where("uid", "==", uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    updateDoc(doc.ref, {
                        password:newPassword.value
                    });
                });
                alert("password updated");
            }).catch((error) => {
                // An error ocurred
                // ...
                console.log(error);
            });
    } else {
        alert('Old Password is incorrect')
    }
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


const allArry = [];


const postsQuerySnapshot = await getDocs(collection(db, "posts"), orderBy("postDate", "desc"), where('uid', '==', uid));
postsQuerySnapshot.forEach((doc) => {
    allArry.push({ ...doc.data(), docId: doc.id });
});
console.log(allArry);

// console.log(allArry);
// console.log(arr);

let newArr = []


async function getDataFromFirestore(uid) {
    newArr.length = 0;
      const q = await query(collection(db, "posts"), orderBy("time", "desc"), where("uid", "==", uid));
    // const userUid = await auth.currentUser
    // console.log(uid);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        newArr.push({ ...doc.data(), docId: doc.id });
    });
    console.log(newArr);
    // renderPost();
}

getDataFromFirestore(uid)


userForm.addEventListener('submit', (e) => {
    e.preventDefault()

    async function updateUserName() {
        const q = query(collection(db, "user"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, {
                firstName: firstInput.value,
                lastName: lastInput.value,
            });
        });
    }

    const fullName = `${firstInput.value} ${lastInput.value}`
    console.log(fullName);
    newArr.forEach(async (item) => {
        console.log('update called', item);
        await updateDoc(doc(db, "posts", item.docId), {
            name: fullName
        });
    })
    updateUserName()
})



