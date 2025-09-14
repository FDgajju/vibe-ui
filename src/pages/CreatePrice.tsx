import type React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import api from "../services/api";
import { PRICE_OF, type PriceT } from "../types/types";

const CreatePrice: React.FC = () => {
  const [price, setPrice] = useState<Partial<PriceT>>({
    city: "",
    amount: 0,
    priceOf: "REACTIONS",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setPrice((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number.parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/price", price);
      toast.success("Price created successfully");
      navigate("/admin/pricing");
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Failed to create price");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] m-auto bg-background-secondary p-4 rounded-lg shadow-theme">
      <h2 className="text-2xl font-bold mb-4 text-primary">Create Price</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-error text-center">{error}</p>}

        <div className="flex flex-col gap-1">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-secondary"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={price.city || ""}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="priceOf"
            className="block text-sm font-medium text-secondary"
          >
            Price of
          </label>
          <select
            id="priceOf"
            name="priceOf"
            value={price.priceOf}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
          >
            <option value={PRICE_OF.REACTIONS} selected>
              {PRICE_OF.REACTIONS}
            </option>
            <option value={PRICE_OF.VIEWS}>{PRICE_OF.VIEWS}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-secondary"
          >
            amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={price.amount || 0}
            onChange={handleChange}
            className="block w-full rounded-md border-1 border-gray-200 shadow-theme focus:border-primary focus:ring-primary py-2.5 px-2 "
            required
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create price"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePrice;
