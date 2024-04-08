
// Props type definition for the Login component
interface LoginProps {
  onLogin: () => void;
}

// Login functional component
const Login:React.FC<LoginProps> = ({ onLogin }) => {
  // Render a simple login UI with a button
  return (
    <div className="jumbotron text-center">
      <h1 className="display-4">Welcome</h1>
      <p className="lead">CRM</p>
      <button className="btn btn-primary btn-lg" onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
