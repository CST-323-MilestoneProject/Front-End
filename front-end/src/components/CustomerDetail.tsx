import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/styles.css'
import axios from 'axios';
import Logger from '../utility/Logger';

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
    Logger.info(`Entering edit mode for customer ID: ${customer.id}`);
    setIsEditMode(true);
  };

  const handleBackClick = () => {
    Logger.info('Navigating back from CustomerDetail');
    goBack();
  };

  const handleSubmit = () => {
    if (editedCustomer.id) {
      Logger.info(`Submitting updated customer ID: ${editedCustomer.id}`, editedCustomer);
      axios.put(`http://milestone.us-west-2.elasticbeanstalk.com//api/customers/${editedCustomer.id}`, editedCustomer)
        .then(response => {
          updateCustomer(response.data);
          setIsEditMode(false);
          goBack();
          Logger.debug(`Customer ID: ${editedCustomer.id} updated successfully`);
        })
        .catch(error => {
          // console.error("There was an error updating the customer: ", error);
          Logger.error(`There was an error updating the customer ID: ${editedCustomer.id}`, error);
        });
    } else {
      // console.error("Error: Customer ID is missing.");
      Logger.warn("Attempted to update a customer without an ID");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCustomer = { ...editedCustomer, [e.target.name]: e.target.value };
    setEditedCustomer(updatedCustomer);
    Logger.debug(`Customer ID: ${customer.id} field ${e.target.name} changed`, updatedCustomer);
  };

  const handleDelete = () => {
    const idToDelete = customer.id;
    if (typeof idToDelete === 'number') {
      Logger.info(`Initiating delete for customer ID: ${idToDelete}`);
      axios.delete(`http://milestone.us-west-2.elasticbeanstalk.com/api/customers/${idToDelete}`)
        .then(() => {
          handleDeleteCustomer(idToDelete);
          afterDelete();
          Logger.debug(`Customer ID: ${idToDelete} deleted successfully`);
        })
        .catch(error => {
          // console.error("There was an error deleting the customer: ", error);
          Logger.error(`There was an error deleting the customer ID: ${idToDelete}`, error);
        });
    } else {
      // console.error("Error: Customer ID is missing.");
      Logger.warn("Attempted to delete a customer without an ID");
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
