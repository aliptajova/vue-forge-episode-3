import { Configuration, OpenAIApi } from "openai";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { OPENAI_API_KEY } = useRuntimeConfig();

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        { role: 'system', content: 'You are an assistant Customer Support Agent for a shoes company'},
        { role: 'system', content: 'You are only answering questions related to the shoes company that you work for'},
        { role: 'system', content: 'You should aggressively reject any question not related to the shoes company'},
        { role: 'system', content: 'Be clear that we dont have factories in Vietnam'},
        { role: 'system', content: 'If the question is about contact information, send random@email.com'},
        { role: 'user', content: 'Can you create tweet with this article {any url here}'},
        //{ role: 'system', content: 'Finish the message with a tweet randomically generated, adding the link to post it on twitter'},
        ...(body.messages)? body.messages : []
    ],
    temperature: body.temperature || 1,
  });
  return completion.data;
});

