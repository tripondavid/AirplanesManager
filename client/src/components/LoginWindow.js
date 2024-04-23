import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginWindow() {
  const navigate = useNavigate();
  const handleLogin = () => {
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        document.cookie = "session_id=12345; path=/";
        navigate("/airplanes");
      }
    });
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleRegister}
      >
        Register
      </button>
    </>
  );
}

export default LoginWindow;
