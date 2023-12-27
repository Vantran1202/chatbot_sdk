class Campaigns::Projects::Interfaces::CreateForm < Campaigns::Projects::Interfaces::NewForm
  attribute :chatbot_name
  attribute :theme_color
  attribute :initial_message
  attribute :suggest_message
end
