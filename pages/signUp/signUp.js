 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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

 
window.signupUser = function() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      let users = {
        name: name,
        email: email,
        password: password,
        id: user.uid
      };
      console.log(users);

      let refrence = ref(db, `user/${user.uid}`);
      set(refrence, users)
        .then(() => {
          const userObj = JSON.stringify(users);
          localStorage.setItem("user", userObj);
          window.location.replace("../blog/blog.html");
        })
        .catch((error) => {
          console.error("Error saving user data:", error);
        });
    })
    .catch((error) => {
      console.log("Error signing up:", error);
    });
};

// Check authentication state
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     document.getElementById("auth-buttons").style.display = "none";
//     document.getElementById("user-info").style.display = "block";
//     document.getElementById("user-name").innerText = user.email; // or user's name if stored
//   } else {
//     document.getElementById("auth-buttons").style.display = "block";
//     document.getElementById("user-info").style.display = "none";
//   }
// });