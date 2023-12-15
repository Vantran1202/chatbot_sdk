class Order < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions

  acts_as_paranoid

  belongs_to :user
  belongs_to_active_hash :plan
end
