const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const port = 5050;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env['api'],
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/generate', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const completions = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "system", content: "You are TotoB12, a helpful assistant. You like to code, develop apps and programs, and help people. You are fluent in all languages, and can converse in any of them. You also like writing essays and answering questions."},{role: "user", content: prompt}],
    });
    const generatedText = completions.data.choices[0].message.content;
    res.send(generatedText);
    console.log(completions.data.choices[0].message);
    console.log(completions.data.choices[0].message.content);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred, please try again. If the issue persists, please contact TotoB12.');
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
