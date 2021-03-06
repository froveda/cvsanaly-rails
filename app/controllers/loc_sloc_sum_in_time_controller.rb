class LocSlocSumInTimeController < ApplicationController
  before_filter :set_repositories, :set_dates, :set_committers, only: [:loc_sum_by_date]

  ## LOC/SLOC SUM in time
  def loc_sum_by_date
  end

  def loc_sum_by_date_filtered
    if from.nil? || to.nil? || repository.nil?
      render text: "No results were found."
      return
    end

    @commits = Commit.joins(:metrics)
                 .select('DATE(scmlog.date) as date, SUM(metrics.loc) AS loc, SUM(metrics.sloc) AS sloc')
                 .where(scmlog: { date: (from .. to), repository_id: repository })
                 .group('DATE(scmlog.date)')
                 .order('DATE(scmlog.date) asc')
    @commits = @commits.where(scmlog: { committer_id: committer }) unless committer.nil?

    if @commits.any?
      render layout: false
    else
      render text: "No results were found."
    end
  end
end
