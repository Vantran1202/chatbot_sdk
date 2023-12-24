# frozen_string_literal: true

module Plan::Reader
  extend ActiveSupport::Concern

  PACKAGES = { free: :free, standard: :standard, premium: :premium }

  included do
    self.data = [
      {
        id: 1, type: PACKAGES[:free], name: 'Free', price: 0.0, popular: false,
        image: 'images/projects/pricing-basic.png'
      },
      {
        id: 2, type: PACKAGES[:standard], name: 'Standard', price: 39.0, popular: true,
        image: 'images/projects/pricing-standard.png'
      },
      {
        id: 3, type: PACKAGES[:premium], name: 'Premium', price: 99.0, popular: false,
        image: 'images/projects/pricing-premium.png', class: 'ti ti-alphabet-greek'
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
  end
end
