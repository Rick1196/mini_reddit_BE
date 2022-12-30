const { getAuth } = require("firebase-admin/auth");
const { initializeApp } = require("firebase-admin/app");

const app = initializeApp();

// const app = initializeApp(firebaseConfig);
const auth = getAuth();

module.exports = { app, auth };
