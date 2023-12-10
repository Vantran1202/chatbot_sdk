# frozen_string_literal: true

class UniquenessValidator < ActiveModel::EachValidator
  def initialize(klass)
    super
    @klass = options[:model] if options[:model]
  end

  def validate_each(record, attribute)
    record_org    = record
    attribute_org = attribute
    attribute     = options[:attribute].to_sym if options[:attribute]
    base_attrs    = {}
    base_attrs[attribute] = record_org.send(attribute)

    options[:scope]&.each do |scope_attribute|
      base_attrs[scope_attribute] = record_org.send(scope_attribute)
    end

    record = if record_org.try(:record)
               options[:model].where.not(id: record_org.send(:record).id).exists?(base_attrs)
             else
               options[:model].exists?(base_attrs)
             end

    record_org.errors.add(attribute_org, :taken) if record
  end
end
