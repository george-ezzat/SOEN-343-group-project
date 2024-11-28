import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

class FirebaseSingleton {
  constructor() {
    if (!FirebaseSingleton.instance) {
      const firebaseConfig = {
        apiKey: "AIzaSyBSOvzhQ8WQH0C2mzs4FJx4oBgxQiYPJ4s",
        authDomain: "codeninjas-86894.firebaseapp.com",
        projectId: "codeninjas-86894",
        storageBucket: "codeninjas-86894.firebasestorage.app",
        messagingSenderId: "622748801942",
        appId: "1:622748801942:web:f4b89e0ff6a27e82029bb7",
        measurementId: "G-VFEQB4GSJ3"
      };

      this.app = initializeApp(firebaseConfig);
      this.analytics = getAnalytics(this.app);
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);

      FirebaseSingleton.instance = this;
    }

    return FirebaseSingleton.instance;
  }

  getApp() {
    return this.app;
  }

  getAnalytics() {
    return this.analytics;
  }

  getAuth() {
    return this.auth;
  }

  getFirestore() {
    return this.db;
  }
}

const instance = new FirebaseSingleton();
export default instance;
