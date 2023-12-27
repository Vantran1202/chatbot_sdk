class Campaigns::Projects::Interfaces::NewForm < ApplicationForm
  attribute :project
  attribute :chatbot_name, default: Settings.sdk.chatbot_name
  attribute :theme_color, default: '#1F2937'
  attribute :initial_message,
            default: 'I am an AI Assistant, Ask me anything, I will help answer your questions based on my understanding.'
  attribute :suggest_message

  before_validation :sanitize_attributes

  def sanitize_attributes
    return if project.nil?

    self.chatbot_name    = project.cfg_interfaces['chatbot_name'].presence    || chatbot_name
    self.theme_color     = project.cfg_interfaces['theme_color'].presence     || theme_color
    self.initial_message = project.cfg_interfaces['initial_message'].presence || initial_message
    self.suggest_message = project.cfg_interfaces['suggest_message'].presence || suggest_message
  end
end
