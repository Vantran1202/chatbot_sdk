module Project::Embedding
  extend ActiveSupport::Concern

  def pinecone
    @pinecone ||= Pinecone::Client.new
  end

  def index_name
    "#{user.id}-#{user.fullname.parameterize}"
  end

  def describe_index(name = nil)
    resp = pinecone.describe_index(name || index_name)
    return if resp.respond_to?(:match?) && resp.match?(/not found/)

    resp
  end

  def create_index(name = nil)
    Retryable.retryable(tries: 3) do
      resp = pinecone.create_index({
                                     metric: 'cosine',
                                     name: name || index_name,
                                     dimension: 1536 # OpenAI/text-embedding-ada-002
                                   })

      raise StandardError, "Failed to create index. Error: #{resp}" if resp.response.code.to_i > 200

      resp
    end
  end

  def delete_index(name = nil)
    resp = pinecone.delete_index(name || index_name)
    is_not_found = resp.is_a?(String) && resp.match?(/not found/)
    return false if is_not_found

    resp
  end

  def namespace_vector
    uuid
  end

  # Upsert a vector to an index in Pinecone
  #
  # @param [Array] vectors - An array of hashes representing the vectors to be upserted
  #   @option [String] id - The id of the vector
  #   @option [Hash] metadata - A hash of key-value pairs for the vector's metadata
  #   @option [Array] values - An array of numerical values for
  #
  # SAMPLE
  #   vectors: [{
  #     id: "1",
  #     metadata: {
  #       key: value
  #     },
  #     values: [
  #       0.1,
  #       0.2,
  #       0.0
  #     ]
  #   }]
  ###
  def create_vector(vectors)
    index = pinecone.index(index_name)
    index.upsert(namespace: namespace_vector, vectors:)
  end

  def delete_all_vector
    index = pinecone.index(index_name)
    index.delete(namespace: namespace_vector, delete_all: true)
  end

  # Query a vector from the index
  #
  #   @param [Array] embedding - The vector to query
  #   @param [Hash] opts - Optional parameters
  #     @option [Integer] top_k - The maximum number of results to return (default 10)
  #     @option [Boolean] include_values - Whether to include the values in the response (default false)
  #     @option [Boolean] include_metadata - Whether to include metadata in the response (default true
  def query_vector(embedding, opts = {})
    index = pinecone.index(index_name)
    response = index.query(vector: embedding, namespace: namespace_vector, **opts)
  end
end
