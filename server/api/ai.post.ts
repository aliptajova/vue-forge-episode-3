import { ofetch } from 'ofetch';
import { OpenAIApi } from 'openai';


export default defineEventHandler(async(event) => {
     const body = await readBody(event);
     

    //HERE I WRITE FOR FETCHING AI RESPONSE
    const {choices} = await ofetch('https://api.openai.com/v1/chat/completions',{ 
        method: 'POST', 
        headers: {
            Authorization: `Bearer ${process.env.NUXT_OPENAI_API_KEY}`,
        },
        body: { 
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": body.message }],
            "temperature": 0,
            "n": 1
         }
    })

    return choices[0]?.message?.content;
})