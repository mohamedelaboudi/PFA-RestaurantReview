import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCfhFSc7rCATNko3AO2PDvUfw5bwwVE-zs",
  authDomain: "pfatest-d279e.firebaseapp.com",
  projectId: "pfatest-d279e",
  storageBucket: "pfatest-d279e.appspot.com",
  messagingSenderId: "356692417230",
  appId: "1:356692417230:web:dd0a65d283c2b511934e9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)