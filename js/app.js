// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getDatabase, set, ref, get, remove ,update } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0_OvRW8ICrHLD4zYOqkt5aQVXzfLIguo",
    authDomain: "my-blog-fadfe.firebaseapp.com",
    projectId: "my-blog-fadfe",
    storageBucket: "my-blog-fadfe.appspot.com",
    messagingSenderId: "218838082461",
    appId: "1:218838082461:web:5c9f8a8c9c1f034d7a8574",
    measurementId: "G-CTWLQ8R1YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// =========signin==========

const myBlogContainer = document.querySelector('.myblog');
const loginContainer = document.querySelector('.login');


onAuthStateChanged(auth, (user) => {
    if (user) {
        myBlogContainer.classList.add("show")
        loginContainer.classList.add("hide")

    } else {
        myBlogContainer.classList.remove("show")
        loginContainer.classList.remove("hide")
    }
})

function signInUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid);

        })
}
signInUser()

const signIn = document.querySelector("#main")
signIn.addEventListener("click", signInUser)


// =========signout==========

const sign_out_btn = document.querySelector("#logOut")
sign_out_btn.addEventListener("click", () => {
    signOut(auth).then(() => {

    }).catch((error) => {
        console.log('error' + error)
    })
})

// LOG SECTION CODE

const main2 = document.querySelector("#main2")

const post_btn = document.querySelector("#post_btn")

function addPost() {
    let title = document.querySelector("#title").value
    let content = document.querySelector("#content").value
    // let image_upload = document.querySelector("#image-upload").value

    const id = Math.floor(Math.random() * 100)

    set(ref(db, "post/" + id), {
        title: title,
        content: content,
        //  image_upload: image_upload,
    })
    main2.innerHTML = "Data Aded"

}


post_btn.addEventListener("click", addPost)


// get data from db/..........


function getData() {
    const get_data = ref(db, "post/")
    get(get_data).then((snapShot) => {
        const data = snapShot.val()
        // console.log(data)

        let html = ""

        const table = document.querySelector("table")

        for (const key in data) {
            const { title, content } = data[key]

            html += `
            <tr>
          <td> <span class="post_number"></span></td>
          <td ><span ><b>${title}</b></span><br>${content}</td>
          <td> <button class="delete" onclick="deletebtn(${key})">Delete</button></td>
          <td> <button class="edite" onclick="editebtn(${key})">edite</button></td>
          </tr> 
            `
        }
        table.innerHTML = html

    })
}
getData()


// delet data

window.deletebtn = function (key) {

    remove(ref(db, `post/${key}`))
    main2.innerHTML = "Data Deleted"
    getData()

}

window.editebtn = function(key) {
    const user_ref = ref(db, `post/${key}`)

    get(user_ref).then((item)=> {
        document.querySelector("#title").value = item.val().title;
        document.querySelector("#content").value = item.val().content;
    })
      const edite_btn = document.querySelector(".edite_btn")
      edite_btn.classList.add("show")
      document.querySelector("#post_btn").classList.add("hide")



      edite_btn.addEventListener("click",update_form)
      function update_form(){
        let title = document.querySelector("#title").value
        let content = document.querySelector("#content").value;


        update(ref(db , `post/${key}`),{
            title: title,
            content: content,
        })


        document.querySelector("#title").value =""
        document.querySelector("#content").value=""

        getData()
      }

   

}
