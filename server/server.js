import express from "express";
import {ChatAnthropic} from "@langchain/anthropic";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(express.json());

const model = new ChatAnthropic({
    temperature: 0.5,
    modelName: "claude-3-sonnet-20240229",
    // In Node.js defaults to process.env.ANTHROPIC_API_KEY,
    // anthropicApiKey: "ANTHROPIC_API_KEY",
    maxTokens: 1024,
});

async function generateWord(userTopic) {
    const response = await model.invoke(`Generate a word that has to do with ${userTopic}`);

    return response.content
}

app.get('/', (req, res) => {
    res.send("Random word generator is live");
});

app.post('/generate', async (req, res) => {
    try {
        let userTopic = req.body.query;
        const response = await generateWord(userTopic);

        // Send the response with the chat roles
        res.json({response});

    } catch (error) {
        console.error('Error fetching response:', error);
        res.status(500).json({error: 'Error fetching response'});
    }
});

app.listen(port, () => {
    console.log(`Random word generator listening on port ${port}`);
});