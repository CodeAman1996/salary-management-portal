import { Banknote, BriefcaseBusiness, Globe2, TrendingUp, UsersRound } from "lucide-react";
import { useState } from "react";
import { InsightCard } from "../components/InsightCard";
import { useCountrySalaryInsight, useJobTitleSalaryInsight, useSalarySummary } from "../hooks/useInsights";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

export function InsightsPage() {
  const [country, setCountry] = useState("India");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const summaryQuery = useSalarySummary();
  const countryQuery = useCountrySalaryInsight(country);
  const jobTitleQuery = useJobTitleSalaryInsight(country, jobTitle);

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <h1>Salary Insights</h1>
          <p>Review salary summary, country-level ranges, and role-based averages.</p>
        </div>
      </section>

      <section className="insight-grid">
        <InsightCard
          title="Employees"
          value={formatNumber(summaryQuery.data?.employeeCount)}
          helper="Total records tracked"
          icon={UsersRound}
          accent="green"
        />
        <InsightCard
          title="Countries"
          value={formatNumber(summaryQuery.data?.countryCount)}
          helper="Compensation coverage"
          icon={Globe2}
          accent="blue"
        />
        <InsightCard
          title="Average salary"
          value={formatSalary(summaryQuery.data?.averageSalary)}
          helper="Across all employees"
          icon={Banknote}
          accent="amber"
        />
        <InsightCard
          title="Salary range"
          value={`${formatSalary(summaryQuery.data?.minSalary)} - ${formatSalary(summaryQuery.data?.maxSalary)}`}
          helper="Minimum to maximum"
          icon={TrendingUp}
          accent="rose"
        />
      </section>

      {summaryQuery.isError ? (
        <div className="state-panel error-state">
          Unable to load salary summary. Check that the backend API is running.
        </div>
      ) : null}

      <section className="filter-bar insight-filters">
        <label>
          Country
          <input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="India" />
        </label>

        <label>
          Job title
          <input
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Software Engineer"
          />
        </label>
      </section>

      <section className="insight-detail-grid">
        <div className="insight-panel">
          <div className="panel-heading">
            <Globe2 size={20} />
            <div>
              <h2>Country salary range</h2>
              <p>{country || "Select a country"}</p>
            </div>
          </div>

          {countryQuery.isLoading ? <div className="state-panel">Loading country insight...</div> : null}
          {countryQuery.isError ? <div className="state-panel error-state">Unable to load country insight.</div> : null}
          {countryQuery.data ? (
            <div className="metric-list">
              <Metric label="Employees" value={formatNumber(countryQuery.data.employeeCount)} />
              <Metric label="Minimum salary" value={formatSalary(countryQuery.data.minSalary)} />
              <Metric label="Maximum salary" value={formatSalary(countryQuery.data.maxSalary)} />
              <Metric label="Average salary" value={formatSalary(countryQuery.data.averageSalary)} />
            </div>
          ) : null}
        </div>

        <div className="insight-panel">
          <div className="panel-heading">
            <BriefcaseBusiness size={20} />
            <div>
              <h2>Role average salary</h2>
              <p>
                {jobTitle || "Select a job title"} in {country || "country"}
              </p>
            </div>
          </div>

          {jobTitleQuery.isLoading ? <div className="state-panel">Loading role insight...</div> : null}
          {jobTitleQuery.isError ? <div className="state-panel error-state">Unable to load role insight.</div> : null}
          {jobTitleQuery.data ? (
            <div className="metric-list">
              <Metric label="Employees" value={formatNumber(jobTitleQuery.data.employeeCount)} />
              <Metric label="Average salary" value={formatSalary(jobTitleQuery.data.averageSalary)} />
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatNumber(value?: number | null): string {
  return value === null || value === undefined ? "..." : currencyFormatter.format(value);
}

function formatSalary(value?: number | null): string {
  return value === null || value === undefined ? "..." : currencyFormatter.format(value);
}
