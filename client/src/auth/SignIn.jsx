import React, { useState } from "react";

export default function SignIn() {

  const [warningMsg, setwarningMsg] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setwarningMsg('');
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const userDetails = { email, password };

    const response = await signin(userDetails);
    if (response?.signin) {
      window.open('/', '_parent');
      console.log(response);
    } else {
      setwarningMsg(response?.msg || 'An error occurred');
    }
  }

  const signin = async (userDetails) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(userDetails)
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      return { signin: false, msg: 'Error signing in' };
    }
  }

  return (
    <>
      <div className="d-flex align-items-center py-4 bg-body-tertiary" style={{ height: '100vh' }}>
        <main className="form-signin m-auto rounded-4" style={{ width: "20rem", backgroundColor: "white", padding: "25px" }}>
          <form onSubmit={handleFormSubmit}>
            <h1 className="h3 mb-3 fw-normal">Welcome back !</h1>

            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            {/* warning message */}
            <div className="text-danger m-2" style={{ height: '24px', textAlign: "center" }}>
              {warningMsg} &nbsp;
              {warningMsg?.toLowerCase() === "user not exists" && <a href="/signup">Sign-up</a>}
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
            <button className="btn btn-primary py-2" type="submit" style={{ width: "10rem" }}>
              Sign in
            </button>

          </form>
        </main>
      </div>
    </>
  );
}
