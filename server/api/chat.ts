import { type ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream } from "ai"

export default defineLazyEventHandler(async () => {
  // Create an OpenAI API client (that's edge friendly!)
  const openai = new OpenAIApi(new Configuration({
     apiKey: useRuntimeConfig().openaiApiKey
  }))

  return defineEventHandler(async (event) => {
    // Extract the `prompt` from the body of the request
    const { messages } = (await readBody(event)) as {
      messages: ChatCompletionRequestMessage[]
    }

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages.map((message) => ({
        content: message.content,
        role: message.role
      }))
    })

    // Convert the response into a friendly text-stream
    return OpenAIStream(response)
  })
})
