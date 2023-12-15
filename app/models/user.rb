class User < ApplicationRecord
  acts_as_paranoid

  has_one :user_counter, dependent: :destroy

  has_many :projects, dependent: :destroy
  has_many :orders,   dependent: :destroy
end
