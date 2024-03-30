import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomersList from './components/CustomersList';
import Login from './components/Login';
import CustomerDetail from './components/CustomerDetail';
import Logger from './utility/Logger';


type Customer = {
  id?: number;
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

  const fetchCustomers = () => {
    axios.get<Customer[]>('https://milestonebackend.azurewebsites.net/api/customers')
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

  const updateCustomer = (updatedCustomer: Customer) => {
    if (updatedCustomer.id) {
      axios.put(`https://milestonebackend.azurewebsites.net/api/customers/${updatedCustomer.id}`, updatedCustomer)
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

  const handleDeleteCustomer = (customerId: number) => {
    setCustomers(customers.filter(c => c.id !== customerId));
  };

  const afterDelete = () => {
    setSelectedCustomer(null);
  };

  const addCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    axios.post<Customer>('https://milestonebackend.azurewebsites.net/api/customers', newCustomer)
      .then(response => {
        const addedCustomer = response.data;
        console.log('this is new customer', newCustomer);
        setCustomers([...customers, addedCustomer]);
      })
      .catch(error => {
        console.error("There was an error adding the customer: ", error);
      });
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
