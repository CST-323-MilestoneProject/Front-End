// Import necessary hooks and modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomersList from './components/CustomersList';
import Login from './components/Login';
import CustomerDetail from './components/CustomerDetail';
import Logger from './utility/Logger';

// Type definition for a customer object
type Customer = {
  id?: number;
  customerDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

function App() {
    // State hooks for managing application state
  const [customers, setCustomers] = useState<Customer[]>([]); // Array of customers
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null); // Currently selected customer for detail view
  const [loggedIn, setLoggedIn] = useState(false);// Tracks if a user is logged in
  const [loading, setLoading] = useState(true);// Loading state for async operations

  // Function to fetch customers from backend API
  const fetchCustomers = () => {
    axios.get<Customer[]>('https://gcu-cst-323-419521.uw.r.appspot.com/api/customers')
      .then(response => {
        setCustomers(response.data);
        setLoading(false);
        Logger.debug('Customers fetched successfully', response.data);
      })
      .catch(error => {
        // console.error("There was an error fetching the customers: ", error);
        Logger.error("There was an error fetching the customers: ", error);
        setLoading(false);
      });
  };

  // Effect hook to fetch customers when the user logs in
  useEffect(() => {
    if (loggedIn) {
      fetchCustomers();
    }
  }, [loggedIn]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoggedIn(true);
    }, 1000);
  };

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };


  // Function to select a customer and show details
  const updateCustomer = (updatedCustomer: Customer) => {
    if (updatedCustomer.id) {
      axios.put(`https://gcu-cst-323-419521.uw.r.appspot.com/api/customers/${updatedCustomer.id}`, updatedCustomer)
        .then(response => {

          setCustomers(customers.map(c => c.id === updatedCustomer.id ? response.data : c));
          setSelectedCustomer(null);
          Logger.debug(`Customer with ID: ${updatedCustomer.id} updated successfully.`);

        })
        .catch(error => {
          // console.error("There was an error updating the customer: ", error);
          Logger.error(`There was an error updating the customer with ID: ${updatedCustomer.id}: `, error);
        });
    } else {
      Logger.warn("Attempted to update a customer without an ID")
    }
  };

  // Function to delete a customer
  const handleDeleteCustomer = (customerId: number) => {
    Logger.info(`Deleting customer with ID: ${customerId}`);
    setCustomers(customers.filter(c => c.id !== customerId));
    Logger.debug(`Customer with ID: ${customerId} removed from the local state.`);
  };

  // Callback after a successful delete operation
  const afterDelete = () => {
    setSelectedCustomer(null);
  };

  // Function to add a new customer
  const addCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    axios.post<Customer>('https://gcu-cst-323-419521.uw.r.appspot.com/api/customers', newCustomer)
      .then(response => {
        const addedCustomer = response.data;
        // console.log('this is new customer', newCustomer);
        Logger.debug('New customer added successfully', addedCustomer);
        setCustomers([...customers, addedCustomer]);
      })
      .catch(error => {
        // console.error("There was an error adding the customer: ", error);
        //TEST
        Logger.error("There was an error adding the customer: ", error);
      });
  };

  // Render the application UI based on the current state
  return (
    <div className='container mt-5'>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : loading ? (
        <div>Loading...</div>
      ) : selectedCustomer ? (
        <CustomerDetail
          customer={selectedCustomer}
          updateCustomer={updateCustomer}
          goBack={() => setSelectedCustomer(null)}
          handleDeleteCustomer={handleDeleteCustomer}
          afterDelete={afterDelete}
        />
      ) : (
        <CustomersList customers={customers} selectCustomer={selectCustomer} addCustomer={addCustomer} />
      )}
    </div>
  );
}

export default App;
