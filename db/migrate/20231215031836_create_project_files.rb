class CreateProjectFiles < ActiveRecord::Migration[7.1]
  def change
    create_table :project_files do |t|
      t.belongs_to :project, index: false, null: false
      t.string :filename, null: false
      t.string :filetype, null: false
      t.float :filesize, null: false, default: 0

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :project_files, %i[project_id], where: 'deleted_at IS NULL'
  end
end