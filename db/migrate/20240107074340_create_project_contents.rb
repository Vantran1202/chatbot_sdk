class CreateProjectContents < ActiveRecord::Migration[7.1]
  def change
    create_table :project_contents do |t|
      t.references :moduleable, polymorphic: true, index: false
      t.text :contents, null: false
      t.vector :vectors, limit: 1536 # OpenAI/text-embedding-ada-002
      t.integer :token_counts, default: 0

      t.datetime :deleted_at, null: true
      t.timestamps
    end

    add_index :project_contents, %i(moduleable_id moduleable_type), where: 'deleted_at IS NULL'
  end
end
