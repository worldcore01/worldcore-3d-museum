import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "circle-developer-console.firebaseapp.com",
  projectId: "circle-developer-console",
  storageBucket: "circle-developer-console.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase and Google Auth Provider
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 1. DETECTION CODE: Listens to login and logout events automatically
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    console.log("Logged in user detected:", user.displayName, user.email);
    document.getElementById("status").textContent = `Logged in as: ${user.displayName} (${user.email})`;
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
  } else {
    // User is logged out
    console.log("No active session detected.");
    document.getElementById("status").textContent = "Logged out.";
    document.getElementById("loginBtn").style.display = "inline-block";
    document.getElementById("logoutBtn").style.display = "none";
  }
});

// 2. GOOGLE LOGIN CODE
document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Successfully authenticated with Google:", result.user);
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Login failed: " + error.message);
  }
});

// 3. LOGOUT CODE
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("Signed out of Firebase.");
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
});
