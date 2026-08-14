// ==========================================
// CRICKET CORA — AUTHENTICATION
// Google Login + Persistent Session
// ==========================================

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  deleteUser
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { auth } from "../firebase-config.js";

const googleProvider = new GoogleAuthProvider();

// Google Login
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    return {
      success: true,
      user
    };
  } catch (error) {
    console.error("Google login failed:", error);

    return {
      success: false,
      error
    };
  }
}

// Logout
export async function logoutUser() {
  try {
    await signOut(auth);

    return {
      success: true
    };
  } catch (error) {
    console.error("Logout failed:", error);

    return {
      success: false,
      error
    };
  }
}

// Persistent session listener
export function watchAuthState(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// Account deletion
export async function deleteCurrentAccount() {
  try {
    const user = auth.currentUser;

    if (!user) {
      return {
        success: false,
        error: "No signed-in user."
      };
    }

    await deleteUser(user);

    return {
      success: true
    };
  } catch (error) {
    console.error("Account deletion failed:", error);

    return {
      success: false,
      error
    };
  }
}
