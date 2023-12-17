class Campaigns::Projects::BaseForm < ApplicationForm
  attribute :uuid
  attribute :name
  attribute :content_type
  attribute :content
  attribute :files
end
