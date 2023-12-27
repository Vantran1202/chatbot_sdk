module Gpt
  class Client
    def self.constructor
      OpenAI.configure do |config|
        config.access_token = Rails.application.credentials.dig(:open_ai, :api_key)
      end
      OpenAI::Client.new
    end
  end
end
