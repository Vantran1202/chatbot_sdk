module Gpt
  class Embedding
    def self.create(input, model = Settings.gpt.model_embedding)
      client = Client.constructor
      client.embeddings(parameters: { model:, input: })
    end
  end
end
