import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


type Customer = {
  id: number;
  customerDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};


type CustomerDetailProps = {
  customer: Customer;
  updateCustomer: (customer: Customer) => void;
  goBack: () => void;
};

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, updateCustomer, goBack }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleBackClick = () => {
    goBack();
  };

  const handleSubmit = () => {
    updateCustomer(editedCustomer);
    setIsEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isEditMode ? (
        <>
          <input type="text" value={editedCustomer.firstName} onChange={handleChange} name="firstName" />
          <input type="text" value={editedCustomer.lastName} onChange={handleChange} name="lastName" />
          <input type="text" value={editedCustomer.email} onChange={handleChange} name="email" />
          <input type="text" value={editedCustomer.phoneNumber} onChange={handleChange} name="phoneNumber" />
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <>
          <p>ID: {customer.id}</p>
          <p>Details: {customer.customerDetails}</p>
          <p>First Name: {customer.firstName}</p>
          <p>Last Name: {customer.lastName}</p>
          <p>Email: {customer.email}</p>
          <p>Phone Number: {customer.phoneNumber}</p>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default CustomerDetail;
