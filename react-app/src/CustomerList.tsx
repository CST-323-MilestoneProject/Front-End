// src/CustomerList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
  id: number;
  customerDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const CustomerList: React.FC = () => {
  console.log("CustomerList is being accessed");
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    console.log("useEffect ran");
    axios
      .get<Customer[]>("http://localhost:8080/api/customers")
      .then((response) => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(customers);

  return (
    <div>
      <h2>Customer List</h2>
      {customers.length > 0 ? (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName} - {customer.email} {customer.customerDetails} {customer.phoneNumber}
            </li>
          ))}
        </ul>
      ) : (
        <p>No customers available.</p>
      )}
    </div>
  );
};

export default CustomerList;
