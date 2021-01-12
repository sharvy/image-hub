class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.text :title
      t.string :url

      t.timestamps
    end
  end
end
