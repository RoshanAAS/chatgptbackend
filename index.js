const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const { connection } = require("./configs/db");
require("dotenv").config();

 const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter)

app.post("/get-prompt-result", (req, res) => {
  const { prompt } = req.body;

  console.log(process.env.API_KEY);

  if (!prompt) {
    // Send a 400 status code and a message indicating that the prompt is missing
    return res.status(400).send({ error: "Prompt is missing in the request" });
  }
  try {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      })
      .then((data) => {
        res.status(200).send(data.data.choices[0]);
      });
  } catch (error) {
    // const errorMsg = error.response ? error.response.data.error :`${error}`;
    // console.error(errorMsg);
    // Send a 500 status code and the error message as the response
    return res.status(500).send(error.messages);
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection
    console.log("Connected To Database");

  } catch (error) {
    console.log(error);
  }
  console.log(`app is runing at ${process.env.PORT}`);
});
