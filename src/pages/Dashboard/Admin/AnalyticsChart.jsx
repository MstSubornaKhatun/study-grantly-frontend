import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AnalyticsChart = () => {
  const axiosSecure = useAxiosSecure();
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data from different endpoints
        const [users, scholarships, applications, reviews, payments] = await Promise.all([
          axiosSecure.get('/users'),
          axiosSecure.get('/scholarships'),
          axiosSecure.get('/applications'),
          axiosSecure.get('/reviews'),
          axiosSecure.get('/payments')
        ]);

        // Format data for chart
        const chartData = [
          { name: "Users", count: users.data.length },
          { name: "Scholarships", count: scholarships.data.length },
          { name: "Applications", count: applications.data.length },
          { name: "Reviews", count: reviews.data.length },
          { name: "Payments", count: payments.data.length },
        ];

        setAnalyticsData(chartData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        // Fallback to dummy data if API fails
        setAnalyticsData([
          { name: "Users", count: 0 },
          { name: "Scholarships", count: 0 },
          { name: "Applications", count: 0 },
          { name: "Reviews", count: 0 },
          { name: "Payments", count: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-[#640d14] dark:text-[#f4a261]">
          Admin Analytics Dashboard
        </h2>
        <div className="flex items-center justify-center h-96">
          <div className="w-16 h-16 bg-[#f4a261]/10 dark:bg-[#f4a261]/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#f4a261] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-[#640d14] dark:text-[#f4a261]">
        Admin Analytics Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {analyticsData.map((item, index) => (
          <div
            key={item.name}
            className="bg-gradient-to-r from-[#640d14]/10 to-[#f4a261]/10 dark:from-[#264653]/20 dark:to-[#f4a261]/20 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {item.name}
            </h3>
            <p className="text-2xl font-bold text-[#640d14] dark:text-[#f4a261] mt-1">
              {item.count}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              allowDecimals={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#d1d5db' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="#640d14" 
              radius={[6, 6, 0, 0]}
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(100, 13, 20, 0.1))'
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Summary */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total Records: {analyticsData.reduce((sum, item) => sum + item.count, 0)}
        </p>
      </div>
    </div>
  );
};

export default AnalyticsChart;