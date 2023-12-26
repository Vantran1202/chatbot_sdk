class Order < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions

  acts_as_paranoid

  belongs_to :user
  belongs_to_active_hash :plan

  scope :current_order, -> { where(expired_at: DateTime.current..).or(where(expired_at: nil)).order(id: :desc) }
end
