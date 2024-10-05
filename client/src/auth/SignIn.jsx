import React, { useState } from "react";

export default function SignIn() {
  const [warningMsg, setwarningMsg] = useState("");

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    setwarningMsg("");
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const userDetails = { email, password };

    const response = await signin(userDetails);
    if (response.signin) {
      window.open("/", "_parent");
      console.log(response);
    } else {
      setwarningMsg(response.msg);
    }
  };

  const signin = async (userDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signin`, {
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
            width: "22rem",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* form */}
          <form onSubmit={handelFormSubmit}>
            {/* <h1 className="h3 mb-4 fw-bold text-center">Welcome Back!</h1> */}


            
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
  Welcome Back!
</h1>





            

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-pill"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                style={{
                  padding: "12px 15px",
                  border: "1px solid #ced4da",
                  fontSize: "1rem",
                  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#007bff";
                  e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#ced4da";
                  e.target.style.boxShadow = "inset 0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              />
              <label htmlFor="floatingInput" className="ms-3">
                Email address
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-pill"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                style={{
                  padding: "12px 15px",
                  border: "1px solid #ced4da",
                  fontSize: "1rem",
                  boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#007bff";
                  e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#ced4da";
                  e.target.style.boxShadow = "inset 0 1px 3px rgba(0, 0, 0, 0.1)";
                }}
              />
              <label htmlFor="floatingPassword" className="ms-3">
                Password
              </label>
            </div>

            {/* warning message */}
            <div
              className="text-danger mb-4"
              style={{ height: "24px", textAlign: "center", fontSize: "0.9rem" }}
            >
              {warningMsg} &nbsp;
              {warningMsg === "User not exists" && <a href="/signup">Sign-up</a>}
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
                  background: "linear-gradient(90deg, #007bff 0%, #0056b3 100%)",
                  border: "none",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
                onMouseLeave={(e) =>
                  (e.target.style.background = "linear-gradient(90deg, #007bff 0%, #0056b3 100%)")
                }
              >
                Sign in
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
