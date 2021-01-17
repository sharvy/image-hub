class Image < ApplicationRecord
  has_one_attached :file
  validate :file_format

  private
  def file_format
    return unless file.attached?
  end
end
