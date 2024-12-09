import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Guide } from '../types';

interface AdminDashboardProps {
  guides: Guide[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ guides }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const filteredGuides = guides.filter((guide) =>
    guide.jomax_id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGuides.length / itemsPerPage);
  const currentGuides = filteredGuides.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-blue-800 font-medium">Total Guides</h3>
          <p className="text-3xl font-bold text-blue-600">{guides.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-green-800 font-medium">Total Tickets</h3>
          <p className="text-3xl font-bold text-green-600">
            {guides.reduce((acc, guide) => acc + guide.tickets.length, 0)}
          </p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search guides..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Guide ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Tickets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket Numbers
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentGuides.map((guide) => (
              <motion.tr
                key={guide.jomax_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">{guide.jomax_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {guide.tickets.length}
                </td>
                <td className="px-6 py-4">
                  {guide.tickets.join(', ')}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};