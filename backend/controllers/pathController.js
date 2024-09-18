import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai'
const openai = new OpenAI({apiKey: process.env.API_KEY, dangerouslyAllowBrowser: true})


export const getPath = async (req, res, next) => {

    const {input} = req.body

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: 'generate a specific learning roadmap path for ' + input,
            },
        ],
    });

    res.status(201).json(completion.choices[0].message)
}

