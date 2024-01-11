module Gpt
  class Chat
    attr_reader :client, :model

    def initialize(model = 'gpt-3.5-turbo')
      @model  = model
      @client = Client.constructor
    end

    def stream_chat(messages)
      client.chat(
        parameters: {
          model: 'gpt-3.5-turbo',
          messages:,
          temperature: 0.2,
          stream: proc do |chunk, _bytesize|
            yield(chunk)
          end
        }
      )
    end
  end
end
