# frozen_string_literal: true

module Plan::Reader
  extend ActiveSupport::Concern

  PACKAGES = { free: :free, standard: :standard, premium: :premium }
  STRIPE_PAYMENT_PURPOSE = :stripe_payment_status

  included do
    self.data = [
      {
        id: 1, type: PACKAGES[:free], name: 'Free', price: 0.0, popular: false, price_id: nil, day_counts: 0, level: 1,
        image: 'images/projects/pricing-basic.png'
      },
      {
        id: 2, type: PACKAGES[:standard], name: 'Standard', price: 39.0, popular: true, day_counts: 30, level: 2,
        price_id: 'price_1ORUTwB3GEKz6QVVS11hX05R',
        image: 'images/projects/pricing-standard.png'
      },
      {
        id: 3, type: PACKAGES[:premium], name: 'Premium', price: 99.0, popular: false, day_counts: 30, level: 3,
        price_id: 'price_1OR5BLB3GEKz6QVV2pmb1B1d',
        image: 'images/projects/pricing-premium.png'
      }
    ]
  end

  module ClassMethods
    def package_free
      find_by!(type: PACKAGES[:free])
    end

    def package_standard
      find_by!(type: PACKAGES[:standard])
    end

    def package_premium
      find_by!(type: PACKAGES[:premium])
    end

    def encrypted_payment_status(status, user:, plan:)
      data = { status:, user_id: user.id, plan_id: plan.id }
      message_verifier = Rails.application.message_verifier(STRIPE_PAYMENT_PURPOSE)
      message_verifier.generate(data, purpose: STRIPE_PAYMENT_PURPOSE, expires_in: 5.minutes)
    end

    def decrypted_payment_status(signed_message)
      message_verifier = Rails.application.message_verifier(STRIPE_PAYMENT_PURPOSE)
      message_verifier.verified(signed_message, purpose: STRIPE_PAYMENT_PURPOSE)&.symbolize_keys
    end
  end

  def package_free?
    type == PACKAGES[:free]
  end

  def package_standard?
    type == PACKAGES[:standard]
  end

  def package_premium?
    type == PACKAGES[:premium]
  end
end
