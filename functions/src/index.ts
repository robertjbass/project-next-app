import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors'
import axios from 'axios'


const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


app.get('/', (req, res) => {
  console.log(req, res)
})


// Expose Express API as a single Cloud Function:
exports.functions = functions.https.onRequest(app);



 