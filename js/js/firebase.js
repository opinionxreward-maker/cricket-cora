// ==========================================
// CRICKET CORA — FIREBASE CORE
// Firebase App + Auth + Firestore + Storage
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import { firebaseConfig } from "../firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Keep Google login session persistent
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Firebase Auth persistence error:", error);
});

// Firestore
const db = getFirestore(app);

// Firebase Storage
const storage = getStorage(app);

// Export Firebase services
export {
  app,
  auth,
  db,
  storage
};
