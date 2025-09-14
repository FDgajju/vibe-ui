import type React from "react";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import api from "../services/api";
import type { PriceT } from "../types/types";
import { prettyDate } from "../utils/dateFormate";

const LIMIT = 20;

const PricingList: React.FC = () => {
  const [prices, setPrices] = useState<PriceT[]>([]);
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
    const fetchPrices = async () => {
      try {
        const response = await api.get(
          `/price?page=${currentPage}&limit=${LIMIT}`,
        );
        setPrices(response.data.data);
        setMeta(response.data.meta);
      } catch (err) {
        setError("Failed to fetch prices");
        console.error(err);
      }
      setLoading(false);
    };

    fetchPrices();
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
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Like & Views Price List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background-secondary">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                City
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Price of
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Amount
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Created Date
              </th>
              <th className="py-2 px-4 border-b border-default text-left text-secondary">
                Updated Date
              </th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price._id} className="hover:bg-background-tertiary">
                <td className="py-2 px-4 border-b border-default text-primary">
                  {price.city}
                </td>
                <td className="py-2 px-4 border-b border-default text-primary">
                  {price.priceOf}
                </td>
                <td className="py-2 px-4 border-b border-default text-primary">
                  {price.amount}
                </td>
                <td className="py-2 px-4 border-b border-default text-primary">
                  {prettyDate(price.createdAt as string)}
                </td>

                <td className="py-2 px-4 border-b border-default text-primary">
                  {prettyDate(price.createdAt) === prettyDate(price.updatedAt)
                    ? "NA"
                    : prettyDate(price.updatedAt)}
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

export default PricingList;
