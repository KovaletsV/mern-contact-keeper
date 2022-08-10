const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

//Connect database
connectDB();

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server working on port ${PORT}`));
app.get("/", (req, res) => res.json({ message: "working" }));
