import type React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import api from "../services/api";
import type { UserT } from "../types/types";

const LIMIT = 20;

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<UserT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({
    limit: LIMIT,
    currentPage: 1,
    totalPages: 1,
    result: 0,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get(
          `/user/admin/employees?page=${currentPage}&limit=${LIMIT}`,
        );
        setEmployees(response.data.data);
        setMeta(response.data.meta);
      } catch (err) {
        setError("Failed to fetch employees");
        console.error(err);
      }
      setLoading(false);
    };

    fetchEmployees();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-background-secondary p-4 rounded-lg shadow-theme">
      <h2 className="text-2xl font-bold mb-4 text-primary">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background-secondary">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Name
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Username
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Email
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Mobile
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="hover:bg-background-tertiary">
                <td className="py-2 px-4 border-b border-default text-primary">
                  {employee.fullName}
                </td>
                <td className="py-2 px-4 border-b border-default text-primary">
                  {employee.userName}
                </td>
                <td className="py-2 px-4 border-b border-default text-primary">
                  {employee.email}
                </td>
                <td className="py-2 px-4 border-b border-default text-primary">
                  {employee.mobile || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-default text-primary">
                  {employee.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-secondary">
          Page {meta.currentPage} of {meta.totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === meta.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EmployeeList;
