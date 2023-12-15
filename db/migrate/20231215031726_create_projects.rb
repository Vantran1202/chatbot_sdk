class CreateProjects < ActiveRecord::Migration[7.1]
  def change
    create_table :projects do |t|
      t.uuid :uuid, null: false
      t.string :name, null: false
      t.string :website

      # 1 to 255 bytes: TINYTEXT
      # 256 to 65535 bytes: TEXT
      # 65536 to 16777215 bytes: MEDIUMTEXT --> Default
      # 16777216 to 4294967295 bytes: LONGTEXT
      t.text :content, limit: 16777215
      t.string :cfg_interfaces
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :projects, %i[uuid], where: 'deleted_at IS NULL', unique: true
  end
end
