import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import firebaseConfig from './firebase.json'
import Chat from './components/Chat'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

function App () {
  return (
    <Chat />
  )
}

export default App
