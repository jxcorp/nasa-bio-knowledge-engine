const express = require("express");
const cors = require("cors");

const datasetRoutes = require("./routes/DatasetRoutes");

const app = express();
const PORT = 5000;


const allowedOrigins = [
  'https://space-biology.web.app',
 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Routes
app.use("/", datasetRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`CORS Proxy Server running at http://localhost:${PORT}`);
  
});
