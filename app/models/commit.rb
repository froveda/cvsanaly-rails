class Commit < ActiveRecord::Base
  self.table_name = :scmlog

  attr_accessible :author_id, :committer_id, :composed_rev, :date, :message, :repository_id, :rev

  has_many :actions, class_name: "Action", foreign_key: :commit_id, dependent: :destroy
  has_many :file_copies, foreign_key: :from_commit_id, dependent: :destroy
  has_many :tag_revisions, foreign_key: :commit_id, dependent: :destroy
  has_many :metrics, dependent: :destroy
  has_many :commits_lines, dependent: :destroy
  has_many :file_links, dependent: :destroy

  belongs_to :author, class_name: "Person"
  belongs_to :committer, class_name: "Person"
  belongs_to :repository

  validates_presence_of :committer_id, unless: :author_id?
  validates_presence_of :author_id, unless: :committer_id?
  validates_presence_of :repository, :date, :message

  ## RailsAdmin
  def title
    "Rev #{rev}"
  end
end
