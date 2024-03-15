import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomersList from './components/CustomersList';
import Login from './components/Login';
import CustomerDetail from './components/CustomerDetail'; // Assuming this is the default export

// Define the Customer type
type Customer = {
  id: number;
  customerDetails: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      axios.get<Customer[]>('/customers.json')
        .then(response => {
          setCustomers(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the customers: ", error);
          setLoading(false);
        });
    }
  }, [loggedIn]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoggedIn(true);
    }, 1000); // Simulate a loading time
  };

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const updateCustomer = (updatedCustomer: Customer) => {
      // Placeholder for the API call: log the updated customer to the console
  console.log('Updating customer:', updatedCustomer);

  // Simulate a successful API call by updating the state
  setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  setSelectedCustomer(null); // Deselect customer after update
  };

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
        />
      ) : (
        <CustomersList customers={customers} selectCustomer={selectCustomer} />
      )}
    </div>
  );
}

export default App;
