import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importing icons from lucide-react

export default function SignUp() {
  const [warningMsg, setwarningMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    setwarningMsg("");
    const form = e.target;

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password != confirmPassword) {
      setwarningMsg("Passwords do not match");
      return;
    }

    const userDetails = { username, email, password, confirmPassword };

    const response = await signup(userDetails);
    console.log(response);
    if (response.signup) {
      window.open("/signin", "_parent");
    } else {
      setwarningMsg(response.msg);
    }
  };

  const signup = async (userDetails) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userDetails),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center py-4 bg-body-tertiary"
        style={{ height: "100vh" }}
      >
        <main
          className="form-signin m-auto rounded-4"
          style={{ width: "25rem", backgroundColor: "white", padding: "25px" }}
        >
          <form onSubmit={handelFormSubmit}>
            <h1 className="h3 mb-3 fw-normal">Sign Up to fusionFLOW</h1>

            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="name_123"
                name="username"
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                name="email"
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-2 position-relative">
              <input
                type={passwordVisible ? "text" : "password"} // Toggle input type
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
              />
              <label htmlFor="password">Password</label>
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
                style={{ cursor: "pointer" }}
              >
                {passwordVisible ? <EyeOff /> : <Eye />}
              </span>
            </div>

            <div className="form-floating position-relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"} // Toggle input type
                className="form-control"
                id="confirmPassword"
                placeholder="Password"
                name="confirmPassword"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                } // Toggle visibility
                style={{ cursor: "pointer" }}
              >
                {confirmPasswordVisible ? <EyeOff /> : <Eye />}
              </span>
            </div>

            {/* warning message */}
            <div
              className="text-danger m-2"
              style={{ height: "24px", textAlign: "center" }}
            >
              {warningMsg}
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button
              className="btn btn-primary py-2"
              type="submit"
              style={{ width: "10rem" }}
            >
              Sign up
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
