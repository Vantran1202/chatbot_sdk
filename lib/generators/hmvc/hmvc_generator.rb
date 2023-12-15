# frozen_string_literal: true

class HmvcGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)
  class_option :form,   type: :string, default: ''
  class_option :action, type: :string, default: 'index,show,create,update,destroy'

  class_option :skip_controller, type: :boolean, default: false
  class_option :skip_operation,  type: :boolean, default: false
  class_option :skip_form,       type: :boolean, default: false

  def create_controller_file
    return if options[:skip_controller]

    template 'controller.rb', File.join("app/controllers/#{class_path.join('/')}", "#{file_name}_controller.rb")
  end

  def create_operation_file
    return if options[:skip_operation]

    options[:action].split(',').each do |act|
      template "operations/#{act}.rb", File.join("app/operations/#{file_path}", "#{act}_operation.rb")
    end
  end

  def create_form_file
    return if options[:skip_form]

    forms = options[:form].split(',')
    forms = options[:action].split(',').delete_if { |x| %w[index show destroy].include?(x) } if forms.blank?

    forms.each do |act|
      template "forms/#{act}.rb", File.join("app/forms/#{file_path}", "#{act}_form.rb")
    end
  end

  private

  def add_comment_endpoint(action)
    case action
    when 'create'  then '# [POST] ...'
    when 'update'  then '# [PUT] ...'
    when 'destroy' then '# [DELETE] ...'
    when 'index', 'show' then '# [GET] ...'
    else '# [METHOD] ...'
    end
  end

  def add_comment_created_at
    "# CREATED AT: #{Time.current}"
  end

  def add_comment_maintainer
    "# MAINTAINER: #{`git config user.email`}"
  end
end
