const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://codeninjas-86894.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(express.json());
