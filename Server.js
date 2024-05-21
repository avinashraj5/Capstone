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
    const authToken = 'ya29.a0AXooCgvQ7dsdho938j5mpJLXK_0SZObx4T67MFcd3GJTta6ft5tWpJUl8sqoGt_KsC_4kDoSwJAfxvR_CCt4Vvyo8WW8ElR7yjHC3ZFzD3qEMc7LPeDOi67f09bqXWsOUNVH8_1e0WLyIwmrvCEUVewCPPD31aRhnP_mZLjDyDUUSEDLBWLWAU3PYzP7JkcG7rWn8sKk7fiXCESCROrA2M1teOwGsI4Sa3oC36FUS56PXoQ9mxkQ4WkL-Xn8K4DVs3aLoYT0_7icAUjcS94IoBD87DzeNi-TwnLOdLK85zMsKgC0HzwS-lm4GNiTu19S3P8_R6PYrN7_AOhZuwT9DVvNaGQpi9PHRAdOs63jvj692aZ0qwMV16u8u1OQbXAORvZT5QdKoj2FT1IkPXfoFUZ5_mna4TWvaCgYKAYgSARESFQHGX2MijxOJH9xBBugUDTw0DEG2bA0423';

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
