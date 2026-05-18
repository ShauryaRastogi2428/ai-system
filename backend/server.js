const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); 

require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const candidateRoutes =
require("./routes/candidateRoutes");

const matchRoutes =
require("./routes/matchRoutes");

const aiRoutes =
require("./routes/aiRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("AI Recruiter Backend Running");
});

app.use("/api/candidates", candidateRoutes);

app.use("/api/match", matchRoutes);

app.use("/api/ai", aiRoutes);

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected");

  app.listen(process.env.PORT, () => {

    console.log(
      `Server Running On ${process.env.PORT}`
    );

  });

})

.catch((error) => {

  console.log(error);

});