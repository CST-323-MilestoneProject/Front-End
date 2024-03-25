import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/styles.css'
import axios from 'axios';

type Customer = {
  id?: number;
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
  handleDeleteCustomer: (customerId: number) => void;
  afterDelete: () => void;
};

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, updateCustomer, goBack, handleDeleteCustomer, afterDelete }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleBackClick = () => {
    goBack();
  };

  const handleSubmit = () => {
    if (editedCustomer.id) {
      axios.put(`https://milestonebackend.azurewebsites.net/api/customers/${editedCustomer.id}`, editedCustomer)
        .then(response => {
          updateCustomer(response.data);
          setIsEditMode(false);
          goBack();
        })
        .catch(error => {
          console.error("There was an error updating the customer: ", error);

        });
    } else {
      console.error("Error: Customer ID is missing.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    const idToDelete = customer.id;
    if (typeof idToDelete === 'number') {
      axios.delete(`https://milestonebackend.azurewebsites.net/api/customers/${idToDelete}`)
        .then(() => {
          handleDeleteCustomer(idToDelete);
          afterDelete();
        })
        .catch(error => {
          console.error("There was an error deleting the customer: ", error);
        });
    } else {
      console.error("Error: Customer ID is missing.");

    }
  };


  return (
    <div>
      {isEditMode ? (
        <>
          <input type="text" value={editedCustomer.customerDetails} onChange={handleChange} name="customerDetails" placeholder="Enter Customer Details" />
          <input type="text" value={editedCustomer.firstName} onChange={handleChange} name="firstName" placeholder="Enter First Name" />
          <input type="text" value={editedCustomer.lastName} onChange={handleChange} name="lastName" placeholder="Enter Last Name" />
          <input type="text" value={editedCustomer.email} onChange={handleChange} name="email" placeholder="Email" />
          <input type="text" value={editedCustomer.phoneNumber} onChange={handleChange} name="phoneNumber" placeholder="Enter Phone Number" />
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          <button className="btn btn-danger" onClick={handleDelete} style={{ marginTop: '10px' }}>Delete</button>
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
