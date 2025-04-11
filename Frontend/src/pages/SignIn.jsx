import React from 'react';
import { Input, Button } from '../components';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import authService from '../backend/auth';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const session = await authService.login({ email, username, password });
      if (session) {
        const userData = session.user;
        if (userData) dispatch(login(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-zinc-100 to-zinc-300">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            value={email}
            type="email"
            placeholder="Email"
            className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-center text-gray-500">OR</div>
          <Input
            value={username}
            type="text"
            placeholder="Username"
            className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-center">{error}</p>}
          <Button
            children="Sign In"
            textColor="text-white"
            className="w-full p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            type="submit"
          />
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-gray-900 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;

