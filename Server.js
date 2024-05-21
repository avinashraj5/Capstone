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
    const authToken = 'ya29.a0AXooCgvXuOfA7E8g4Hp0ZYwKbmfhD0FoeZjIldy7VgCl-nGjLh5WIjS6zmH_FYatUkr4j8FBYT1Ku3vS0RhJERgNh9S-cp-vwtqcFZRg1Nn91rOw8t9nKyHqBl02Knz-_d29hvJR8YuorRoeGG53tVpvN6ejB-JUdp6WBRkxd_eM3_wH9ERdwYsBIJJMd3amtSqAAvZ9Z3MUazoxY1PM54nsup4XAZBADnU4M8qlSIHCDBsGQP_SB7hg8rnj8wMtOsUAEcEVvNwRGL0mu7PPfE21isNToaI9CjXV2lwgPJeZ4-uqB9dPHZchuJIM83Z5r_WEnww6wcAhKL0KY_obKARD2Aab9r84BE77SA8qYrepsC_Ja5-jTQT1CHjf42W8DlQvgK9mb10nn8RJ6X75AXfIE6BdXUeBaCgYKAbASARESFQHGX2MiS9951n23jM3g8HJSlSbHlA0423';

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
