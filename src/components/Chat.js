import * as firebase from 'firebase/app'
import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'

class Chat extends Component {
  constructor () {
    super()

    this.state = {
      messages: [],
      session: null,
      isOpen: false
    }
  }

  async onAuthStateChanged (user) {
    const db = firebase.database()
    const firestore = firebase.firestore()

    if (!user) {
      return
    }

    const { uid } = user

    db.ref('chats').child(uid).set({})

    const session = db.ref(`chats/${uid}`)

    this.setState({ session })

    const sessionFirestore = firestore.collection('chats').doc(uid)

    sessionFirestore.set({
      messages: []
    })

    session.on('child_added', async newMessage => {
      const value = newMessage.val()

      this.setState({
        messages: [
          ...this.state.messages,
          value
        ]
      })

      // Back up to the Firestore.
      await sessionFirestore.set({
        messages: this.state.messages
      })
    })

    setTimeout(() => {
      session.push({
        author: 'them',
        type: 'text',
        data: {
          text: 'Welcome! How can we help you?'
        }
      })

      this.setState({
        isOpen: true
      })
    }, 3000)
  }

  async componentDidMount () {
    const auth = firebase.auth()

    auth.onAuthStateChanged((user) => this.onAuthStateChanged(user))
    firebase.auth().signInAnonymously()
  }

  autoReply () {
    setTimeout(() => {
      this.state.session.push({
        author: 'them',
        type: 'text',
        data: {
          text: 'One moment please.'
        }
      })
    }, 1000)
  }

  _onMessageWasSent (message) {
    this.state.session.push(message)
    this.autoReply()
  }

  _onFilesSelected (files) {
    for (const file of files) {
      this.state.session.push({
        author: 'me',
        type: 'file',
        data: {
          fileName: file.name
        }
      })
    }

    this.autoReply()
  }

  _handleClick () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    if (!this.state.session) {
      return null
    }

    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Customer Support'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onFilesSelected={this._onFilesSelected.bind(this)}
        handleClick={this._handleClick.bind(this)}
        messageList={this.state.messages}
        isOpen={this.state.isOpen}
        showEmoji
      />
    </div>)
  }
}

export default Chat
