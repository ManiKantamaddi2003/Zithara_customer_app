import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from './Pagination';


function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/customers?page=${currentPage}&pageSize=${pageSize}`);
      setData(response.data);
      setTotalPages(Math.ceil(response.headers['x-total-count'] / pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Customer Management App</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
