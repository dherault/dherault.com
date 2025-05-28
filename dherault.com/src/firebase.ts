// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCCFMf-0jb14_8lCVxVW0C3IMaSZ-pJt-0',
  authDomain: 'dherault-com.firebaseapp.com',
  databaseURL: 'https://dherault-com.firebaseio.com',
  projectId: 'dherault-com',
  storageBucket: 'dherault-com.firebasestorage.app',
  messagingSenderId: '1044838175078',
  appId: '1:1044838175078:web:63c1ab0a18b798630478a7',
  measurementId: 'G-82ZHM0V9XT',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

getAnalytics(app)
