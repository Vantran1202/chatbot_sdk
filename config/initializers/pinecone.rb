Pinecone.configure do |config|
  config.api_key     = Rails.application.credentials.dig(:pinecone, :api_key)
  config.environment = Rails.application.credentials.dig(:pinecone, :environment)
end
