module Gpt
  class TikToken
    # def self.count(string, model: Settings.gpt.model_embedding)
    #   get_tokens(string, model:).length
    # end

    # def self.get_tokens(string, model: Settings.gpt.model_embedding)
    #   encoding = Tiktoken.encoding_for_model(model)
    #   tokens = encoding.encode(string)
    #   tokens.index_with { |token| encoding.decode([token]) }
    # end

    def self.split_text_by_word_limit(text, word_limit:)
      words = text.split(/\s+/)
      chunks = []
      current_chunk = []

      words.each do |word|
        if current_chunk.size + word.split(/[[:punct:]]/).reject(&:empty?).size <= word_limit
          current_chunk << word
        else
          chunks << current_chunk.join(' ')
          current_chunk = [word]
        end
      end

      chunks << current_chunk.join(' ') unless current_chunk.empty?
      chunks
    end
  end
end
