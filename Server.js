const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
 });

app.post('/predict', cors(), async (req, res) => {
 try {
    // Use the provided auth token directly
    const authToken = 'ya29.a0AXooCgs2UgzmbPONGa9EQKadmRPN_GCO8kn3I-3RXT2nYH-Mtm25qxuJa35X1GZg6KrvBMmzRemBMxBkyCGn2BimSWVdDvfj36RaflJRB86-O5IHf7T6JoBn-nHle0MuKjFDiZK78UCBIn099Udm2-fC8pzBR3y54V5CjNY9iTf96K9-bT4j04NDCBKFyQrH7erIKGMSJ5oiT1MI4f5b6jMaNCLBn-y9MLyJHJohB1hevnriw4Fm2R85LNDtEzsN7NL9xb9KgGox9QnnldHyjwGjrfNr86Gq3sOt6poYrYYaV1DNGhQDWTH9-qYnTLe8iFEpQXXUR5A2GULPO92MGC1PBu-MWvViF09l6nRs6B6rP9MS9gbNMoyXhf14qyuT66UIux3mWU3wp7NRWFobuNzcnTz7NF_UaCgYKAc4SARESFQHGX2MiPmp3NcP0HaleL5H2z3c0aA0423';

    const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
    const PROJECT_ID = "zinc-code-419604";
    const MODEL_ID = "text-bison";
    const LOCATION_ID = "us-central1";

    // Extract the question from the request body
    const question = req.body.question;

    // Construct the request body for the API call
    const requestBody = {
      "instances": [
          {
              "content": ` You will Act as Electronics Engineering Knowledge Hub , Who knows everything about electronics engineering , so whenever a asked question related Electronics Engineering Answer it 4 to 7 points also if required return Mathematical expression , Restrict your knowledge to Electronics Engineering , do not answer anything apart from Electronics Engineering.\n\ninput: ${question}\noutput:`
          }
      ],
      "parameters": {
          "candidateCount": 1,
          "maxOutputTokens": 1024,
          "temperature": 0.9,
          "topP": 1
      }
    };

    const response = await axios.post(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predict`, requestBody, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    // Send the response from the API call back to the client
    res.json(response.data);
 } catch (error) {
  console.error(error);
  res.status(500).send('An error occurred while processing your request.');
}
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
