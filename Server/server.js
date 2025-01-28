const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const otRoutes = require("./routes/otRoutes");
// const roomRoutes = require("./routes/roomRoutes");
const cookieParser = require("cookie-parser");


dotenv.config();
connectDB();


const app = express();
// const cors = require('cors');

// Use CORS with credentials option
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/ots", otRoutes);
// app.use("/api/rooms", roomRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
