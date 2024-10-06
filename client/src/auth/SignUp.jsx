import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import lucide-react icons

export default function SignUp() {
  const [warningMsg, setWarningMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setWarningMsg("");
    const form = e.target;

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setWarningMsg("Passwords do not match");
      return;
    }

    const userDetails = { username, email, password, confirmPassword };

    const response = await signup(userDetails);
    console.log(response);
    if (response.signup) {
      window.open("/signin", "_parent");
    } else {
      setWarningMsg(response.msg);
    }
  };

  const signup = async (userDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="d-flex align-items-center py-4 bg-light" style={{ height: "100vh" }}>
        <main
          className="form-signin m-auto rounded-4 shadow-lg"
          style={{
            width: "25rem",
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleFormSubmit}>
            <h1
              className="h3 mb-4 fw-bold text-center"
              style={{
                fontSize: "2rem",
                background: "linear-gradient(90deg, #007bff, #00b4db)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              Sign Up to fusionFLOW
            </h1>

            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control rounded-pill input-field"
                id="username"
                placeholder="name_123"
                name="username"
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control rounded-pill input-field"
                id="email"
                placeholder="name@example.com"
                name="email"
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-2 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control rounded-pill input-field"
                id="password"
                placeholder="Password"
                name="password"
              />
              <label htmlFor="password">Password</label>
              {/* Eye icon for password visibility */}

{showPassword ? (
               <Eye
               className="toggle-password"
               onClick={togglePasswordVisibility}
               style={{
                 position: "absolute",
                 right: "10px",
                 top: "50%",
                 transform: "translateY(-50%)",
                 cursor: "pointer",
               }}
             />
              ) : (
                <EyeOff
                className="toggle-password"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
              )}
            </div>

            <div className="form-floating mb-2 position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control rounded-pill input-field"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              {/* Eye icon for confirm password visibility */}
              {showConfirmPassword ? (
                <Eye
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
              ) : (
                <EyeOff
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
              )}
            </div>

            {/* warning message */}
            <div className="text-danger m-2" style={{ height: "15px", textAlign: "center" }}>
              {warningMsg}
            </div>

            <div className="form-check text-start mb-3">
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
            <div className="text-center">
              <button
                className="btn btn-primary rounded-pill py-2"
                type="submit"
                style={{
                  width: "100%",
                  height:"3.1rem",
                  background: "linear-gradient(90deg, #007bff 0%, #00b4db 100%)",
                  border: "none",
                }}
              >
                Sign up
              </button>
            </div>
          </form>
        </main>
      </div>

      <style jsx="true">{`
        .input-field {
          padding: 10px;
          border: 1px solid #ced4da;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .input-field:hover {
          border-color: #007bff;
          box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
        }

        .toggle-password {
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
}
