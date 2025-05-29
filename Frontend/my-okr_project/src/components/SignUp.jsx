import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [content, SetContent] = useState({
    name: "",
    email: "",
    password: "",
    ReTypePassword: "",
  });
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = function (event) {
    const { name, value } = event.target;
    SetContent((previtems) => ({ ...previtems, [name]: value }));
  };

  const SignUp = async function (e) {
    e.preventDefault();
    if (content.password !== content.ReTypePassword) {
      <p>Password doesn't match</p>;
      toast.error("Password mismatch")
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth`, {
        name: content.name,
        email: content.email,
        password: content.password,
      },{
        withCredentials: true,
    });
      SetContent(response.data);
      toast.success("Successfully Registered")
      navigate("/login")
    } catch (error) {
      console.log(`Error in Signining In: `, error);
        toast.error((error.response?.data?.message || "Login failed"))
    }
  };

  return (
    <div>
      <h1>SignUp page</h1>

      <form onSubmit={SignUp}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={content.name}
          placeholder="Enter your name"
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={content.email}
          placeholder="Enter an email"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={content.password}
          placeholder="Password"
        />
        <label>Re-Type-Password</label>
        <input
          type="password"
          name="ReTypePassword"
          onChange={handleChange}
          value={content.ReTypePassword}
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpPage;
