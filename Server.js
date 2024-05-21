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
    const authToken = 'ya29.a0AXooCgtbHOXKqweu1dVR0vNJGGtpJTuf-KuoaBqVwJRz6fD5pCGJvf3OWxYEhn804C7bxShjWWgZGluvAPU9f-JZFNl9P8UNA8dvKa3m9qISJqWmK3y09cZChr1S2zZMXzBKhrzNj4a6tjJqWL6EudibDVFIlPD56WGov23I3nIrC2DiEOS1clgUpZJtL6i4JMdAQ9shnSlpaeAURydEAdpYLmBOzU3SehF1_C-T9QKLIlLQE5AqoudBMkeI1WP0UvJO4gvILAfVpLToYTSgqoIuBOqnCammXzsSULGrA3e3Rfch7nU6yZpdOydoerKa2jJw-pkgh_OXRtJ0rpLTKhB66tmXSZObh426hNHL9EAPgbQYGST-eBZVQW9K_UNct7TJi9LV9xO93-wjU-CQYInyIr_nSd7raCgYKAYMSARESFQHGX2Mimi4iQMzA7tjyMqFvtO3M4w0423';

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
