const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Console } = require('console');

const app = express();
const port = 8443;
// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/webhook', (req, res) => {    
    const adobeSignClientId = req.headers['x-adobesign-clientid'];
    res.setHeader('x-adobesign-clientid',adobeSignClientId);    
    res.send(`GET request received with clientId: ${adobeSignClientId}`);
    console.log('x-adobesign-clientid:', adobeSignClientId);
});
// Webhook endpoint to capture Adobe Sign events
app.post('/webhook', (req, res) => {
  // Capture the event data sent by Adobe Sign.
  var clientid = req.headers['x-adobesign-clientid'];
  if (clientid == "CBJCHBCAABAAeWAPme8oFbAPZTqb9W15dXkExVU9Qr7l") 
  {
      var responseBody = {
                      "xAdobeSignClientId" : clientid // Return Client Id in the body
      };
      //res.headers['Content-Type'] = 'application/json';
      res.body = responseBody;
      res.status = 200;
      console.log(JSON.stringify(responseBody));
      res.send(`Received with clientId: ${clientid}`);
  }    
  //const eventData = req.body;
  var eventData = req.body.data;
  console.log(JSON.stringify(eventData));
  // Log the received event data
  console.log('Received Adobe Sign webhook event:', eventData);

  // Process the event data as needed
  // Example: Handle specific events
  if (eventData.event && eventData.event.eventType === 'AGREEMENT_ACTION_COMPLETED') {
    console.log('Agreement action completed:', eventData);
  }

  // Respond with 200 OK to acknowledge receipt
  res.status(200).send('Webhook received successfully');
});

// Start the server on port 443 (or another port if needed)
const PORT = 8443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Home Page");
})
