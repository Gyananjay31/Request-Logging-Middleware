const express = require('express');
const app = express();
const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// app.post('/test', (req, res) => {
//   res.send('POST request received at /test');
// });


// Custom middleware to log request details
const requestLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(`[${timeStamp}] ${req.method} ${req.url} - ${req.ip}`);
  next();
};

// Use middleware globally
app.use(requestLogger);


// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the Request Logger App!');
});

app.post('/test', (req, res) => {
  res.send('POST request received at /test');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const morgan = require('morgan');

// Use morgan for detailed logs
app.use(morgan('combined'));


const logLevel = "info"; // change to "debug" as needed

const levelLogger = (req, res, next) => {
  if (logLevel === "debug") {
    console.log(`[DEBUG] ${new Date().toISOString()} ${req.method} ${req.url}`);
  } else if (logLevel === "info") {
    console.log(`[INFO] ${req.method} request to ${req.url}`);
  }
  next();
};

app.use(levelLogger);


