import { Search } from "lucide-react";
import { EmployeeListFilters } from "../types/employee";

type EmployeeFiltersProps = {
  filters: EmployeeListFilters;
  onChange: (filters: EmployeeListFilters) => void;
};

export function EmployeeFilters({ filters, onChange }: EmployeeFiltersProps) {
  function updateFilter(name: keyof EmployeeListFilters, value: string | number) {
    onChange({
      ...filters,
      [name]: value,
      page: name === "page" ? Number(value) : 1
    });
  }

  return (
    <div className="filter-bar">
      <label className="search-field">
        <Search size={18} />
        <input
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          placeholder="Search name, email, or role"
        />
      </label>

      <label>
        Country
        <input
          value={filters.country}
          onChange={(event) => updateFilter("country", event.target.value)}
          placeholder="India"
        />
      </label>

      <label>
        Job title
        <input
          value={filters.jobTitle}
          onChange={(event) => updateFilter("jobTitle", event.target.value)}
          placeholder="Software Engineer"
        />
      </label>

      <label>
        Page size
        <select value={filters.pageSize} onChange={(event) => updateFilter("pageSize", Number(event.target.value))}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </label>
    </div>
  );
}
