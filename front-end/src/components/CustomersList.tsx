// Import statements for required modules and Bootstrap components
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/styles.css'
import Logger from '../utility/Logger';

// Type definition for a Customer object
type Customer = {
  id?: number;
  customerDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

// Props type for the CustomersList component
type CustomersListProps = {
  customers: Customer[];
  selectCustomer: (customer: Customer) => void;
  addCustomer: (customer: Customer) => void;
};

// CustomersList functional component
const CustomersList: React.FC<CustomersListProps> = ({ customers, selectCustomer, addCustomer }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Customer>({ customerDetails: '', firstName: '', lastName: '', email: '', phoneNumber: '' });

  // Function to open the modal for adding a new customer
  const handleShow = () => {
    Logger.info('Opening the Add Customer modal');
    setShowModal(true);
  }

  // Function to close the modal
  const handleClose = () => {
    Logger.info('Closing the Add Customer modal');
    setShowModal(false);

  }

  // Function to handle changes in the form input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCustomer = { ...newCustomer, [e.target.name]: e.target.value };
    setNewCustomer(updatedCustomer);
    Logger.debug('Form value changed', updatedCustomer);
  };

  // Function to handle the submission of the new customer form
  const handleSubmit = () => {
    Logger.info('Submitting new customer', newCustomer);
    addCustomer(newCustomer);
    handleClose();

  };


  // JSX to return from the component, rendering a button to add a customer,
  // a modal with a form for adding a new customer, and a list of customers
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Customer
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCustomerDetails">
              <Form.Label>Details</Form.Label>
              <Form.Control type="text" name="customerDetails" placeholder="Enter Details" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
              <tr key={customer.id} className="customer-row" onClick={() => selectCustomer(customer)} style={{ cursor: 'pointer' }}>
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
    </>
  );
};

export default CustomersList;
