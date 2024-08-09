import React, { useState } from 'react';
import Form from './components/Form';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';


const Auth = () => {
  return (
    <>
      <Navbar />
      <div className='flex justify-center items-center space-x-4'>
        <Login />
        <Register />
      </div>
    </>
  )
};

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const router = useRouter();

  // LOGIC
  const onSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/login", { username, password });

      // Set the cookie with the access token from the response
      setCookies("access_token", response.data.token);

      // Store userID for quick access
      window.localStorage.setItem("userID", response.data.userID);
      alert(`${JSON.stringify(response.data)}`);

      // Redirect to homepage
      router.push("/");

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
    </>
  )
};

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!username || !password) {
      alert("Username and password cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/auth/register", { username, password });

      alert(`${JSON.stringify(response.data)}`);

      // Redirect to homepage
      router.push("/");

    } catch (err) {
      console.error(err);

    }

  };

  return (
    <>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      />
    </>
  )
};
export default Auth;