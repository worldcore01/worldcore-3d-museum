// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// TODO: Replace with your actual Firebase config keys from the console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "circle-developer-console.firebaseapp.com",
  projectId: "circle-developer-console",
  storageBucket: "circle-developer-console.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const statusText = document.getElementById("status");
const logoutBtn = document.getElementById("logoutBtn");

// Monitor Auth state (displays logged-in user or updates UI)
onAuthStateChanged(auth, (user) => {
  if (user) {
    statusText.textContent = `Logged in as: ${user.email}`;
    logoutBtn.style.display = "inline-block";
  } else {
    statusText.textContent = "Not logged in.";
    logoutBtn.style.display = "none";
  }
});

// Register User
document.getElementById("registerBtn").addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Registration successful!");
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// Login User
document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Logged in successfully!");
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// Logout User
logoutBtn.addEventListener("click", () => {
  signOut(auth).catch((error) => alert(error.message));
});
