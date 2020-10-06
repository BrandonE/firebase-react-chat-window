# firebase-react-chat-window

An implementation of [kingofthestack/react-chat-window](https://github.com/kingofthestack/react-chat-window) with a [Firebase](https://firebase.google.com/) backend. This repository was created for the SANS Institute Tech Tuesday Workshop [Firebase: Google Cloud's Evil Twin](https://www.sans.org/webcasts/tech-tuesday-firebase-google-clouds-evil-twin-116750).

## Installing Prerequisites

* [Node.js / NPM](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/)

## Testing Locally

1. Follow [these steps](https://firebase.google.com/docs/web/setup) to create a Firebase project, register an app with Firebase, and retrieve your Firebase config object.

2. Create a new file called `./src/firebase.json` containing your Firebase config object.

3. Run the following commands:

```bash
yarn
yarn start
```

## Linting the Application

The following will detect code flaws using [eslint](https://eslint.org/):

```bash
yarn
yarn lint
```

The following will attempt to automatically fix the detected code flaws:

```bash
npm install
npm run lint -- --fix
```
