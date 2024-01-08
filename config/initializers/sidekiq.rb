scheme = "redis://localhost:6379/0"

# Config Redis
$redis = Redis.new(url: scheme)

# Config Sidekiq
Sidekiq.configure_server do |config|
  config.redis = { url: scheme }
end

Sidekiq.configure_client do |config|
  config.redis = { url: scheme }
end
