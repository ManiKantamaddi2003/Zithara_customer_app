import React from 'react';

const Table = ({ data, onSort }) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('date')}>Date</th>
          <th onClick={() => onSort('time')}>Time</th>
          <th>Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((customer) => (
          <tr key={customer.s_no}>
            <td>{new Date(customer.created_at).toLocaleDateString()}</td>
            <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            <td>{customer.customer_name}</td>
            <td>{customer.age}</td>
            <td>{customer.phone}</td>
            <td>{customer.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
