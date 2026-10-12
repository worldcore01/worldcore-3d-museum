import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrdHMW5P1eRHucO5lQvOKIlacoxneKcz4",
  authDomain: "circle-developer-console.firebaseapp.com",
  databaseURL: "https://circle-developer-console-default-rtdb.firebaseio.com",
  projectId: "circle-developer-console",
  storageBucket: "circle-developer-console.firebasestorage.app",
  messagingSenderId: "904118916433",
  appId: "1:904118916433:web:bf128d705e2993ddf2af70",
  measurementId: "G-1GGM55J84K"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusText = document.getElementById("status");

// DETECTION & REDIRECT CODE
onAuthStateChanged(auth, (user) => {
  if (user) {
    statusText.innerHTML = "Access Granted! <br>Redirecting to 3D Museum... 🚀";
    
    // Smooth 1.5-second transition delay before redirecting
    setTimeout(() => {
      window.location.href = "https://worldcore-3d-museum.vercel.app/";
    }, 1500);
  } else {
    statusText.textContent = "Please sign in to continue.";
  }
});

// Email Registration
document.getElementById("registerBtn").addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (error) {
    alert("Registration Error: " + error.message);
  }
});

// Email Login
document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (error) {
    alert("Login Error: " + error.message);
  }
});

// Google Sign-In
document.getElementById("googleBtn").addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    alert("Google Sign-in Error: " + error.message);
  }
});
// Log Out / End Session
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("You have been logged out successfully!");
      // Tandaan: Kusang magre-refresh ang 'onAuthStateChanged' 
      // at ibabalik ang statusText sa "Please sign in to continue."
    } catch (error) {
      alert("Logout Error: " + error.message);
    }
  });
}
