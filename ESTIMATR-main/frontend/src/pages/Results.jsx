import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Logout from './Logout';

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const item_name = queryParams.get("item_name");
  const item_type = queryParams.get("item_type");
  const make = queryParams.get("make");
  const model = queryParams.get("model");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const params = new URLSearchParams({
          item_name,
          item_type,
          make,
          model,
          page,
          sort_by: sortBy,
          sort_direction: sortDirection
        });

        const response = await axios.get(`http://localhost:5000/results?${params.toString()}`, {
          withCredentials: true
        });

        setProducts(response.data.products || []);
        setTotalPages(response.data.total_pages || 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchResults();
  }, [item_name, item_type, make, model, page, sortBy, sortDirection]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-row sm:flex-row justify-between items-center mb-4">
        <Logout/>
      

      <Link to="/searchinput" className="inline-block mb-4 text-blue-600 hover:underline">← Go Back</Link>
     </div>
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Automated Price Finder</h1>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Results</h2>

      {/* Search info summary */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Item Name:</strong> {item_name}</p>
        <p><strong>Item Type:</strong> {item_type}</p>
        <p><strong>Make:</strong> {make}</p>
        <p><strong>Model:</strong> {model}</p>
      </div>

      {/* Sort dropdown */}
      <div className="mb-4">
        <label htmlFor="sort-by" className="mr-2 text-sm font-medium text-gray-700">Sort By:</label>
        <select
          id="sort-by"
          className="border border-gray-300 p-2 rounded-md"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price">Price</option>
          <option value="ratings">Ratings</option>
        </select>
      </div>

      {/* Results table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Product Title</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Ratings</th>
              <th className="p-2 border">Website Source</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No products found.</td>
              </tr>
            ) : (
              products.map((p, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="p-2 border break-words max-w-xs">{p[1]}</td>
                  <td className="p-2 border">{p[2]}</td>
                  <td className="p-2 border">{p[3]}</td>
                  <td className="p-2 border">
                    <a href={p[4]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit</a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          className={`text-blue-600 hover:underline ${page <= 1 ? 'invisible' : ''}`}>
          Previous
        </button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          className={`text-blue-600 hover:underline ${page >= totalPages ? 'invisible' : ''}`}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Results;
