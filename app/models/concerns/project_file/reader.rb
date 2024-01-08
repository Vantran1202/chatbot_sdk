# frozen_string_literal: true

module ProjectFile::Reader
  extend ActiveSupport::Concern

  def yield_read_file(&)
    if filetype == 'pdf'
      reader = PDF::Reader.new(filename.file.path)
      reader.pages.each_with_index(&)
    elsif filetype = 'docx'
      doc = Docx::Document.open(filename.file.path)
      doc.paragraphs.each(&)
    end
  end
end
