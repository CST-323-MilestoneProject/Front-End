import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Customer = {
  id: number;
  customerDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

type CustomersListProps = {
  customers: Customer[];
  selectCustomer: (customer: Customer) => void;
};

const CustomersList: React.FC<CustomersListProps> = ({ customers, selectCustomer }) => {
  return (
    <div className="table-responsive">
      <h2>Customers List</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Customer Details</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}
                className="customer-row"
                onClick={() => selectCustomer(customer)}
                style={{ cursor: 'pointer' }}>
              <td>{customer.id}</td>
              <td>{customer.customerDetails}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;
