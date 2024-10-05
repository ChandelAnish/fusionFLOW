import React, { useState } from "react";

export default function SignUp() {
  const [warningMsg, setwarningMsg] = useState("");

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    setwarningMsg("");
    const form = e.target;

    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
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
          <form onSubmit={handelFormSubmit}>
            {/* <h1 className="h3 mb-4 fw-bold text-center">Sign Up to fusionFLOW</h1> */}


            <h1
  className="h3 mb-4 fw-bold text-center"
  style={{
    fontSize: "2rem",  // Larger text size for more emphasis
    background: "linear-gradient(90deg, #007bff, #00b4db)",  // Gradient effect for text
    WebkitBackgroundClip: "text",  // Clip background to the text only
    WebkitTextFillColor: "transparent",  // Makes the text appear transparent to show the gradient
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",  // Adds a soft shadow
  }}
>
  Sign Up to fusionFLOW
</h1>
<p
  className="text-center"
  style={{
    fontSize: "1rem",  // A catchy subheading
    color: "#6c757d",
    marginTop: "-10px",  // Reduces space between the heading and subheading
  }}
>
</p>






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

            <div className="form-floating mb-2">
              <input
                type="password"
                className="form-control rounded-pill input-field"
                id="password"
                placeholder="Password"
                name="password"
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="password"
                className="form-control rounded-pill input-field"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            {/* warning message */}
            <div className="text-danger m-2" style={{ height: "24px", textAlign: "center" }}>
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
            <div className="text-center">
              <button
                className="btn btn-primary rounded-pill py-2"
                type="submit"
                style={{
                  width: "100%",
                  background: "linear-gradient(90deg, #007bff 0%, #0056b3 100%)",
                  border: "none",
                }}
              >
                Sign up
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Add custom CSS for hover effects */}
      <style jsx="true">{`
        .input-field {
          padding: 10px;
          border: 1px solid #ced4da;
          font-size: 1rem;
          transition: all 0.3s ease; /* Smooth transition for hover effect */
        }

        .input-field:hover {
          border-color: #007bff; /* Change border color on hover */
          box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5); /* Add subtle shadow */
        }
      `}</style>
    </>
  );
}
