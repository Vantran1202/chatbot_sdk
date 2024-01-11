# frozen_string_literal: true

module Uuid
  extend ActiveSupport::Concern

  def generate_uuid
    loop do
      self.uuid = Digest::UUID.uuid_v5(Digest::UUID::DNS_NAMESPACE, DateTime.current.to_f.to_s)
      break unless self.class.exists?(uuid:)
    end
  end
end
