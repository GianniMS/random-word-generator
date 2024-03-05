import express from "express";
import LlamaAI from 'llamaai';
import cors from "cors";
import bodyParser from "body-parser";

// nodemon --env-file=.env server.js

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//
// const apiToken = 'LLAMA_API_KEY';
// const llamaAPI = new LlamaAI(apiToken);
//
//
// async function generateWord(topic) {
//     let engineeredPrompt = `Generate a word that has to do with the following topic: ${topic}`;
//
//     // Invoke the model with the engineered prompt
//     const response = await model.invoke(engineeredPrompt, {
//         // Make it extra short
//         max_tokens: 2,
//     });
//
//     return response.content;
// };

// Middleware to parse incoming request bodies
app.use(express.json());

// Check if the server is live
app.get('/', (req, res) => {
    res.send("Random word generator is live")
})

app.post('/generate', async (req, res) => {
    try {
        // Get the topic from the input form
        const response = req.body.query;

        // Send the response with the chat roles
        res.json({ response });
    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).json({ error: 'Error fetching response' });
    }
});

app.listen(port, () => {
    console.log(`Random word generator listening on port ${port}`);
});