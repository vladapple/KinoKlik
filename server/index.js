const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Routes
const routes = require('./routes/Routes');
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});