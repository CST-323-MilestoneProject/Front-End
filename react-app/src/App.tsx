// src/App.tsx
import React from "react";
import CustomerList from "./CustomerList";

const App: React.FC = () => {
  console.log("App component fired");
  return (
    <div>
      <h1>Your App Title</h1>
      <CustomerList />
    </div>
  );
};

export default App;
