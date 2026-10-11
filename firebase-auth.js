
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Palitan ang values gamit ang config mula sa Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyDrdHMW5P1eRHucO5lQvOKIlacoxneKcz4",
  authDomain: "circle-developer-console.firebaseapp.com",
  projectId: "circle-developer-console",
  appId: "1:904118916433:web:bf128d705e2993ddf2af70"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registration
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
  } catch (error) {
    alert(error.message);
  }
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
});

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (error) {
    alert(error.message);
  }
});

// Observe the user's login state
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("authStatus");
  if (status) {
    status.textContent = user
      ? `Logged in as ${user.email}`
      : "Not logged in";
  }
});
