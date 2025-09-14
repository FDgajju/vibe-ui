import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import api from "../services/api";

const CreateEmployee: React.FC = () => {
  const [employee, setEmployee] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    role: "MANAGER",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (employee.password !== employee.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/user/admin/create-employee", employee);
      toast.success("Employee created successfully");
      navigate("/admin/employees");
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message || "Failed to create employee",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] m-auto bg-background-secondary p-4 rounded-lg shadow-theme">
      <h2 className="text-2xl font-bold mb-4 text-primary">Create Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-error text-center">{error}</p>}

        <div className="flex flex-col gap-1">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-secondary"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={employee.fullName}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-secondary"
          >
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={employee.userName}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-secondary"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-secondary"
          >
            Phone (Optional)
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-secondary"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={employee.role}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
          >
            <option value="MANAGER">Manager</option>
            <option value="ACCOUNTANT">Accountant</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-secondary"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={employee.password}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-secondary"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={employee.passwordConfirm}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
            required
          />
          {employee.password &&
            employee.passwordConfirm &&
            employee.password !== employee.passwordConfirm && (
              <p className="text-sm text-error text-left">
                Passwords do not match
              </p>
            )}
          {employee.password &&
            employee.passwordConfirm &&
            employee.password === employee.passwordConfirm && (
              <p className="text-sm text-success text-left">Passwords match</p>
            )}
        </div>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Employee"}
        </Button>
      </form>
    </div>
  );
};

export default CreateEmployee;
