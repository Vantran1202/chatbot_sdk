class Project < ApplicationRecord
  extend Enumerize
  include Uuid
  include Project::Embedding
  acts_as_paranoid

  serialize :reason_failure, coder: JSON

  before_create :generate_uuid

  class_attribute :config, default: {
    reason_failure: {
      exceed_total_character: 'exceed_total_character',
      internal_error: 'internal_error'
    }
  }

  enumerize :content_type, in: %i[text file], default: :text, predicates: { prefix: true }
  enumerize :status, in: %i[creating done failed], predicates: { prefix: true }

  # https://api.rubyonrails.org/classes/ActiveRecord/AttributeMethods/Serialization/ClassMethods.html
  serialize :cfg_interfaces, type: Hash, coder: YAML

  belongs_to :user

  has_many :project_files, dependent: :destroy
  has_many :project_contents, as: :moduleable, dependent: :destroy
end
