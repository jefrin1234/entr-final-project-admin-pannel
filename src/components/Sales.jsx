

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { axiosInstance } from "../config/axiosInstance";

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState({
    dailySales: [],
    monthlySales: [],
    yearlySales: [],
  });
  const [activeChart, setActiveChart] = useState("yearly");
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axiosInstance.get("/admin/all-sales");
        if (response.data && response.data.data) {
          setSalesData(response.data.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching sales data", error);
      }
    };

    fetchSalesData();
  }, []);

  
  const filteredMonthlySales = salesData.monthlySales.filter(
    (sale) => sale._id.year === selectedYear
  );

  const filteredDailySales = salesData.dailySales.filter(
    (sale) => sale._id.year === selectedYear && sale._id.month === selectedMonth
  );

  const uniqueYears = [
    ...new Set(salesData.yearlySales.map((sale) => sale._id.year)),
  ];

  const uniqueMonths = [
    ...new Set(
      salesData.monthlySales
        .filter((sale) => sale._id.year === selectedYear)
        .map((sale) => sale._id.month)
    ),
  ];

  const resetSelections = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
  };

  const handleChartTypeChange = (chartType) => {
    setActiveChart(chartType);
    resetSelections();
  };

 
  const calculateTotalSales = (data) => {
    return data.reduce((total, sale) => total + sale.totalSales, 0);
  };


  let totalSales = 0;
  if (activeChart === "yearly") {
    totalSales = calculateTotalSales(salesData.yearlySales);
  } else if (activeChart === "monthly" && selectedYear) {
    totalSales = calculateTotalSales(filteredMonthlySales);
  } else if (activeChart === "daily" && selectedYear && selectedMonth) {
    totalSales = calculateTotalSales(filteredDailySales);
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-700">Sales Dashboard</h2>
      
     
      <div className="flex justify-center space-x-4 my-4">
        {["yearly", "monthly", "daily"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded shadow-lg transition-transform transform ${
              activeChart === type ? "bg-blue-600 text-white scale-105" : "bg-blue-400 text-white hover:bg-blue-500"
            }`}
            onClick={() => handleChartTypeChange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Sales
          </button>
        ))}
      </div>

    
      {activeChart !== "yearly" && (
        <div className="my-4 flex justify-center">
          <label className="mr-2 font-semibold">Select Year: </label>
          <select
            className="px-2 py-1 border border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
            value={selectedYear || ""}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value));
              setSelectedMonth(null);
            }}
          >
            <option value="" disabled>
              Select Year
            </option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

     
      {activeChart === "daily" && selectedYear && (
        <div className="my-4 flex justify-center">
          <label className="mr-2 font-semibold">Select Month: </label>
          <select
            className="px-2 py-1 border border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
            value={selectedMonth || ""}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            <option value="" disabled>
              Select Month
            </option>
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString("en-US", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </div>
      )}

      
      <div className="text-center text-xl font-bold text-gray-800 mb-4">
        {activeChart === "yearly" && `Total Yearly Sales: ₹${totalSales.toLocaleString()}`}
        {activeChart === "monthly" && selectedYear && `Total Monthly Sales for ${selectedYear}: ₹${totalSales.toLocaleString()}`}
        {activeChart === "daily" && selectedYear && selectedMonth && `Total Daily Sales for ${new Date(selectedYear, selectedMonth - 1).toLocaleString("en-US", { month: "long", year: "numeric" })}: ₹${totalSales.toLocaleString()}`}
      </div>

     
      {activeChart === "yearly" && salesData.yearlySales.length > 0 && (
        <div className="flex justify-center">
          <BarChart
            width={700}
            height={400}
            data={salesData.yearlySales}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            className="bg-white p-4 rounded shadow-lg"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id.year" tick={{ fill: "#555" }} />
            <YAxis tick={{ fill: "#555" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#4A90E2">
              <LabelList dataKey="totalSales" position="top" />
            </Bar>
            <Bar dataKey="totalQuantity" fill="#50E3C2">
              <LabelList dataKey="totalQuantity" position="top" />
            </Bar>
          </BarChart>
        </div>
      )}

    
      {activeChart === "monthly" &&
        selectedYear &&
        filteredMonthlySales.length > 0 && (
          <div className="flex justify-center">
            <BarChart
              width={700}
              height={400}
              data={filteredMonthlySales}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              className="bg-white p-4 rounded shadow-lg"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="_id.month"
                tick={{ fill: "#555" }}
                tickFormatter={(month) =>
                  new Date(0, month - 1).toLocaleString("en-US", {
                    month: "short",
                  })
                }
              />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" fill="#4A90E2">
                <LabelList dataKey="totalSales" position="top" />
              </Bar>
              <Bar dataKey="totalQuantity" fill="#50E3C2">
                <LabelList dataKey="totalQuantity" position="top" />
              </Bar>
            </BarChart>
          </div>
        )}

      
      {activeChart === "daily" &&
        selectedYear &&
        selectedMonth &&
        filteredDailySales.length > 0 && (
          <div className="flex justify-center">
            <BarChart
              width={700}
              height={400}
              data={filteredDailySales}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              className="bg-white p-4 rounded shadow-lg"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id.day" tick={{ fill: "#555" }} />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" fill="#4A90E2">
                <LabelList dataKey="totalSales" position="top" />
              </Bar>
              <Bar dataKey="totalQuantity" fill="#50E3C2">
                <LabelList dataKey="totalQuantity" position="top" />
              </Bar>
            </BarChart>
          </div>
        )}

    
      {(activeChart === "monthly" &&
        selectedYear &&
        filteredMonthlySales.length === 0) ||
      (activeChart === "daily" &&
        selectedYear &&
        selectedMonth &&
        filteredDailySales.length === 0) ? (
        <div className="text-center text-gray-500 mt-6">
          No sales data available for the selected period.
        </div>
      ) : null}
    </div>
  );
};

export default SalesDashboard;
