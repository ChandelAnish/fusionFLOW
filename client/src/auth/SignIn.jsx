import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [warningMsg, setwarningMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/signin`,
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
        {/* Other content */}
        <main
          className="form-signin m-auto rounded-4"
          style={{ width: "20rem", backgroundColor: "white", padding: "25px" }}
        >
          {/* form */}
          <form onSubmit={handelFormSubmit}>
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

            <div className="form-floating position-relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
              />
              <label htmlFor="floatingPassword">Password</label>
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* warning message */}
            <div
              className="text-danger m-2"
              style={{ height: "24px", textAlign: "center" }}
            >
              {warningMsg} &nbsp;
              {warningMsg === "User not exists" && (
                <a href="/signup">Sign-up</a>
              )}
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
              Sign in
            </button>
          </form>
        </main>

        <script
          src="/docs/5.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
      </div>
    </>
  );
}
