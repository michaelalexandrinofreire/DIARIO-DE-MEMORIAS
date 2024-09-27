
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAOU5VMj6E75IIlx8K2V3BRFZfO1OHFr2w",
  authDomain: "diario-de-memorias-1c508.firebaseapp.com",
  projectId: "diario-de-memorias-1c508",
  storageBucket: "diario-de-memorias-1c508.appspot.com",
  messagingSenderId: "973692647823",
  appId: "1:973692647823:web:8c8f7ee68327d1fce533fa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);