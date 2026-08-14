// ==========================================
// CRICKET CORA — APP CHECK
// reCAPTCHA Enterprise configuration
// ==========================================

// App Check will be initialized here after
// the main Firebase app instance is connected.
//
// The Firebase App Check registration has already
// been completed in Firebase Console.

export const appCheckConfig = {
  enabled: true,
  provider: "reCAPTCHA Enterprise",
  tokenAutoRefresh: true
};
