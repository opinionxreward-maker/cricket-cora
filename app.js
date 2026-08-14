// ============================================================
// CRICKET CORA — MAIN APP CONTROLLER
// ============================================================

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
} from
  "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase-config.js";

// ============================================================
// FIREBASE
// ============================================================

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// ============================================================
// APP STATE
// ============================================================

const AppState = {
  user: null,
  currentPage: "home",
  online: navigator.onLine,
  initialized: false
};

// ============================================================
// DOM HELPERS
// ============================================================

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) =>
  document.querySelectorAll(selector);

// ============================================================
// INTERNET STATUS
// ============================================================

function updateOnlineStatus() {
  AppState.online = navigator.onLine;

  document.body.classList.toggle(
    "offline",
    !AppState.online
  );

  const offlineScreen = $("#offlineScreen");

  if (offlineScreen) {
    offlineScreen.classList.toggle(
      "hidden",
      AppState.online
    );
  }
}

window.addEventListener(
  "online",
  updateOnlineStatus
);

window.addEventListener(
  "offline",
  updateOnlineStatus
);

// ============================================================
// PAGE NAVIGATION
// EXACTLY 5 MAIN TABS
// Home | Matches | Battle | News | Profile
// ============================================================

function showPage(pageName) {
  const pages = $$(".page");

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const target = $(`#page-${pageName}`);

  if (target) {
    target.classList.add("active");
  }

  $$(".nav-btn").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );
  });

  AppState.currentPage = pageName;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function setupNavigation() {
  $$(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.dataset.page;

      if (page) {
        showPage(page);
      }
    });
  });
}

// ============================================================
// LOADING SCREEN
// ============================================================

function setLoadingProgress(value) {
  const progressBar = $("#loadingProgressBar");
  const percent = $("#loadingPercent");

  const safeValue = Math.max(
    0,
    Math.min(100, value)
  );

  if (progressBar) {
    progressBar.style.width = `${safeValue}%`;
  }

  if (percent) {
    percent.textContent = `${Math.round(safeValue)}%`;
  }
}

function hideLoadingScreen() {
  const loadingScreen = $("#loadingScreen");

  if (!loadingScreen) {
    return;
  }

  loadingScreen.style.opacity = "0";
  loadingScreen.style.pointerEvents = "none";

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 250);
}

// ============================================================
// AUTH STATE
// ============================================================

function setupAuthListener() {
  onAuthStateChanged(auth, (user) => {
    AppState.user = user || null;

    const loginScreen = $("#loginScreen");
    const app = $("#app");

    if (user) {
      if (loginScreen) {
        loginScreen.classList.add("hidden");
      }

      if (app) {
        app.classList.remove("hidden");
      }
    } else {
      if (app) {
        app.classList.add("hidden");
      }

      if (loginScreen) {
        loginScreen.classList.remove("hidden");
      }
    }
  });
}

// ============================================================
// GLOBAL APP INITIALIZATION
// ============================================================

async function initializeCricketCora() {
  try {
    setLoadingProgress(10);

    updateOnlineStatus();

    setLoadingProgress(25);

    setupNavigation();

    setLoadingProgress(40);

    setupAuthListener();

    setLoadingProgress(70);

    showPage("home");

    setLoadingProgress(100);

    AppState.initialized = true;

    setTimeout(() => {
      hideLoadingScreen();
    }, 350);

  } catch (error) {
    console.error(
      "Cricket Cora initialization failed:",
      error
    );

    setLoadingProgress(100);
    hideLoadingScreen();
  }
}

// ============================================================
// PUBLIC APP API
// ============================================================

window.CricketCora = {
  state: AppState,
  auth,
  db,
  showPage,
  updateOnlineStatus
};

// ============================================================
// START
// ============================================================

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeCricketCora
  );
} else {
  initializeCricketCora();
}
