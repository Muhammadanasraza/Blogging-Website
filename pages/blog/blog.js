// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

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
const db = getDatabase(app);



function getPostData() {
    const usrerRef = ref(db, "post/")
    get(usrerRef).then((snap) => {
        const data = snap.val()
        // console.log(data)

        let html = ""
        const table = document.querySelector("#main")

        for (const key in data) {
            const { title, content } = data[key]

            html+= `
            <div class="post">
              <h2>${title}</h2>
              <p>${content}</p>

            </div>
    
            `
        }
        table.innerHTML = html

    })
}
getPostData()



