interface LoginProps {
  onLogin: () => void;
}

const Login:React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-4">Welcome</h1>
      <p className="lead">Please log in to manage customers.</p>
      <button className="btn btn-primary btn-lg" onClick={onLogin}>Login</button>
    </div>
  );
};

export default Login;
