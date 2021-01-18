import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"

// const firebaseConfig = {
//     apiKey: `${process.env.DB_API_KEY}`,
//     authDomain: `${process.env.DB_AUTH_DOMAIN}`,
//     databaseURL: `${process.env.DB_DATABASE_URL}`,
//     projectId: `${process.env.DB_PROJECT_ID}`,
//     storageBucket: `${process.env.DB_STORAGE_BUCKET}`,
//     messagingSenderId: `${process.env.DB_MESSAGING_SENDER_ID}`,
//     appId: `${process.env.DB_APP_ID}`,
// }

const firebaseConfig = {
    apiKey: "AIzaSyDYC1uz2tSHeyRNZVvxqWLoeVLBy0_6WII",
    authDomain: "word-wolf-app.firebaseapp.com",
    databaseURL: "https://word-wolf-app.firebaseio.com",
    projectId: "word-wolf-app",
    storageBucket: "word-wolf-app.appspot.com",
    messagingSenderId: "96840990243",
    appId: "1:96840990243:web:dc2f966327e830226abb96"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export default firebase
