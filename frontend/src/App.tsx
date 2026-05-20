import { BarChart3, UsersRound } from "lucide-react";
import { NavLink, Route, Routes } from "react-router-dom";
import { EmployeesPage } from "./pages/EmployeesPage";
import { InsightsPage } from "./pages/InsightsPage";

export function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">SP</span>
          <div>
            <strong>Salary Portal</strong>
            <span>HR operations</span>
          </div>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          <NavLink to="/" end>
            <UsersRound size={18} />
            Employees
          </NavLink>
          <NavLink to="/insights">
            <BarChart3 size={18} />
            Insights
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </main>
    </div>
  );
}
