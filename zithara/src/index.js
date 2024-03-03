import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const recordsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/customers'); // Replace '/api/customers' with your backend endpoint
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSort = (key) => {
    setSortBy(key);
  };

  // Filter and sort data based on search query and sort option
  let filteredData = [...data];
  if (searchQuery) {
    filteredData = filteredData.filter(
      (customer) =>
        customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (sortBy) {
    filteredData.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortBy === 'time') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });
  }

  // Calculate pagination values
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div>
      <h1>Customer Management App</h1>
      <SearchBar onSearch={handleSearch} />
      <Table data={currentRecords} onSort={handleSort} />
      <Pagination
        totalRecords={filteredData.length}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
