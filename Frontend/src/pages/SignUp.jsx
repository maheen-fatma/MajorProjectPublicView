import React, { useState } from 'react';
import { Input, Button } from '../components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import authService from '../backend/auth';

function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      if (avatar) formData.append('avatar', avatar);

      const session = await authService.createAccount(formData);
      if (session) {
        navigate('/sign-in');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-zinc-100 to-zinc-300">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            value={fullName}
            type="text"
            placeholder="Full Name"
            className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            value={email}
            type="email"
            placeholder="Email"
            className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
          />
          {error && <p className="text-red-600 text-center">{error}</p>}
          <Button
            children="Create Account"
            textColor="text-white"
            className="w-full p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            type="submit"
          />
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-gray-900 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
