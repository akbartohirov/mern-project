const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const linkRoutes = require("./routes/link.routes");
const redirectRoutes = require("./routes/redirect.routes");
const cors = require("cors");
const connection = require("./db/mongodb");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config/.env" });

connection(
  "mongodb+srv://akbar:akbar307toh@cluster0.mycg6.mongodb.net/links?retryWrites=true&w=majority"
);

app.use("/api/auth", authRoutes);
app.use("/api/link", linkRoutes);
app.use("/t", redirectRoutes);

app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The App has been started on port ${PORT}...`);
});
