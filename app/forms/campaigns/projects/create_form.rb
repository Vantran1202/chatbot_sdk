class Campaigns::Projects::CreateForm < Campaigns::Projects::NewForm
  attribute :name
  attribute :content_type
  attribute :content

  validates :name, presence: true
  validates :content_type, presence: true
  validates :content, presence: true
end
