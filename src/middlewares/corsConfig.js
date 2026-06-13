const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://electro-mart-49304.web.app",
    "https://electro-mart-49304.firebaseapp.com",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);