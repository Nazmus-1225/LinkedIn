const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.use(cors());

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const notificationRoutes = require("./routes/notification.routes");

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", notificationRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});