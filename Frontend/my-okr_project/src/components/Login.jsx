import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import toast from "react-hot-toast";

function LoginPage(){
  const [content, SetContent] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = function (event) {
    const { name, value } = event.target;
    SetContent((previtems) => ({ ...previtems, [name]: value }));
  };

  const login = async function (e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email: content.email, password: content.password },
        {
          withCredentials: true,
        }
      );
      SetContent(response.data);
      Cookies.set("token",response.data.token,{expires:365})
      toast.success("Logged in")
      navigate("/")
    } catch (error) {
      toast.error((error.response?.data?.message || "Login failed"))
    }
  };

  return (
    <div>
      <h1>Login page</h1>

      <form onSubmit={login}>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={content.email}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={content.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginPage;