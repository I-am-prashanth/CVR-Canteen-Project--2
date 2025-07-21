import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Admin credentials check (in a real app, this would be an API call)
    if (email === 'admin@cvrcanteen.com' && password === 'admin123') {
      // Successful login
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center p-4">
      {/* Error Alert (only shows when there's an error) */}
      {error && (
        <div role="alert" className="alert alert-error max-w-md mb-6">
          <svg className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Warning Message */}
      <div role="alert" className="alert alert-warning max-w-md mb-8">
        <svg className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Warning! Only admin is allowed on this page.</span>
      </div>

      {/* Login Form */}
      <div className="card bg-gray-500 shadow-lg w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6 text-center">Admin Login</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Admin Email</span>
              </label>
              <input 
                type="email" 
                placeholder="admin@cvrcanteen.com" 
                className="input input-bordered w-full" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered w-full" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-sm text-gray-600 text-center max-w-md">
        If you're not an administrator, please return to the main site.
        <br />
        Unauthorized access attempts will be logged.
      </p>
    </div>
  );
}

export default Login;