import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBebaxBvrXghHy2gvvnOPazGS2oEdGgDYI",
  authDomain: "just-beauty-37e6d.firebaseapp.com",
  databaseURL: "https://just-beauty-37e6d-default-rtdb.firebaseio.com",
  projectId: "just-beauty-37e6d",
  storageBucket: "just-beauty-37e6d.firebasestorage.app",
  messagingSenderId: "51254735898",
  appId: "1:51254735898:web:5bcda1ec098c9f6884cda3",
  measurementId: "G-RX6MK36EG0"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getDatabase(app)

export { app, auth, db, analytics }
