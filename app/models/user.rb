class User < ApplicationRecord
  include User::Callback
  acts_as_paranoid

  has_one :user_counter, dependent: :destroy
  has_one :current_order, -> { current_order }, class_name: 'Order', dependent: :destroy

  has_many :projects, dependent: :destroy
  has_many :orders,   dependent: :destroy
end
