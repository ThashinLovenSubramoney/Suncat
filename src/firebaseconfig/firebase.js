// DEBUG: show what Vite injected
console.log('[firebase] VITE_FIREBASE_ENABLED =', import.meta.env.VITE_FIREBASE_ENABLED);

// src/firebaseconfig/firebase.js
import { initializeApp } from 'firebase/app';

// Auth pieces (import real SDK, but wire them only if enabled)
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as _onAuthStateChanged,
  signOut as _signOut,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signInWithPopup as _signInWithPopup,
  sendEmailVerification as _sendEmailVerification,
  updateProfile as _updateProfile,
} from 'firebase/auth';

// Firestore & Storage
import { getFirestore, Timestamp as _Timestamp } from 'firebase/firestore';
import { getStorage, ref as _ref } from 'firebase/storage';

// Toggle comes from .env.local (false in local dev, true when you add real keys)
const enabled = import.meta.env.VITE_FIREBASE_ENABLED === 'true';
console.log('[firebase] enabled =', enabled);

// Defaults for local-dev (disabled)
let auth = null;
let db = null;
let storage = null;
let Timestamp = undefined;
let ref = undefined;
let GoogleAuthProviderExport = undefined;

// Return a no-op unsubscribe so components don't crash when disabled
let onAuthStateChanged = () => () => {};
let signOut = async () => {};
let createUserWithEmailAndPassword = async () => { throw new Error('Auth disabled in local dev'); };
let signInWithEmailAndPassword = async () => { throw new Error('Auth disabled in local dev'); };
let signInWithPopup = async () => { throw new Error('Auth disabled in local dev'); };
let sendEmailVerification = async () => {};
let updateProfile = async () => {};

if (enabled) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  Timestamp = _Timestamp;
  ref = _ref;
  GoogleAuthProviderExport = GoogleAuthProvider;

  onAuthStateChanged = _onAuthStateChanged;
  signOut = _signOut;
  createUserWithEmailAndPassword = _createUserWithEmailAndPassword;
  signInWithEmailAndPassword = _signInWithEmailAndPassword;
  signInWithPopup = _signInWithPopup;
  sendEmailVerification = _sendEmailVerification;
  updateProfile = _updateProfile;
}

export {
  auth,
  db,
  storage,
  Timestamp,
  ref,
  GoogleAuthProviderExport as GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  updateProfile,
};

export const firebaseEnabled = enabled;
