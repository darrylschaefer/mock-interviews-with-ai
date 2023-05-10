const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_AWS_POLLY_ACCESS_KEY,
  secretAccessKey: process.env.AMAZON_AWS_POLLY_SECRET_KEY,
});

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: "v4",
  region: "us-east-1",
});

require("dotenv").config({
  path: "./.env",
});

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const sessionResponse = {
    transcription: null,
    chatResponse: null,
    audioResponse: null,
    messages: null,
  };

  //  console.log("Received request with body:", req.body);

  sessionResponse.messages = req.body.messages;

  if (req.body.audio) {
    const audio = req.body.audio;
    const base64 = audio.split(",")[1];
    const buf = Buffer.from(base64, "base64");
    buf.name = "sound.webm";

    const response = await openai.createTranscription(buf, `whisper-1`);
    0;
    //  console.log("Transcription response:", response.data);

    sessionResponse.transcription = response.data.text;
    sessionResponse.messages.push({
      role: "user",
      content: sessionResponse.transcription,
    });
  }

  try {
    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: sessionResponse.messages,
      })
      .then((data) => {
        sessionResponse.messages.push({
          role: data.data.choices[data.data.choices.length - 1].message.role,
          content:
            data.data.choices[data.data.choices.length - 1].message.content,
        });
        sessionResponse.chatResponse = data.data.choices;
        let params = {
          Text: data.data.choices[data.data.choices.length - 1].message.content,
          OutputFormat: "mp3",
          VoiceId: req.body.voiceId || "Joanna",
          Engine: "neural",
        };
        //      console.log(params);
        Polly.synthesizeSpeech(params, (err, data) => {
          if (err) {
            console.log("Error synthesizing speech:", err);
            res.status(500).json({ error: err });
          } else if (data) {
            const audioBuffer = Buffer.from(data.AudioStream);
            const audioDataURI = `data:${
              data.ContentType
            };base64,${audioBuffer.toString("base64")}`;
            data.audioDataURI = audioDataURI;

            sessionResponse.audio = data;
            // console.log("Session response:", sessionResponse);
            res.status(200).json(sessionResponse);
          }
        });
      })
      .catch((err) => {
        console.log("Error creating chat completion:", err);
        res.status(500).json({ error: err });
      });
  } catch (err) {
    console.log("Error creating chat completion:", err);
    res.status(500).json({ error: err });
  }
}
