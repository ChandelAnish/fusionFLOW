import React, { useState } from 'react';

const OTP = ({otp}) => {
    const [warningMsg,setwarningMsg] =useState('');
  const handleFormSubmit =async (e) => {
    setwarningMsg('')
    e.preventDefault();
    const form=e.target;
    const otphere=form.otp.value;
    console.log(otphere);
    console.log(otp.otp);
    if(otphere==otp.otp){
        const data=await saveUser(otp.userDetails);
        console.log(data)
    }else{
        setwarningMsg('Enter OTP is incorrect')
    }

  };
  const saveUser=async(userDetails)=>{
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          credentials:"include",
          body: JSON.stringify(userDetails)
        })
        const data = await response.json()
        
        return data;
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <>
      <div className="d-flex align-items-center py-4 bg-body-tertiary" style={{ height: '100vh' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
          <symbol id="check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
          </symbol>
          <symbol id="circle-half" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
          </symbol>
          {/* Other SVG symbols can remain here */}
        </svg>

        <div className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
          {/* Theme toggle button */}
          <button className="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
            <svg className="bi my-1 theme-icon-active" width="1em" height="1em">
              <use href="#circle-half"></use>
            </svg>
            <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
            {/* Theme options */}
            <li>
              <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                <svg className="bi me-2 opacity-50" width="1em" height="1em">
                  <use href="#sun-fill"></use>
                </svg>
                Light
                <svg className="bi ms-auto d-none" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              </button>
            </li>
            <li>
              <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="dark" aria-pressed="false">
                <svg className="bi me-2 opacity-50" width="1em" height="1em">
                  <use href="#moon-stars-fill"></use>
                </svg>
                Dark
                <svg className="bi ms-auto d-none" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              </button>
            </li>
            <li>
              <button type="button" className="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto" aria-pressed="true">
                <svg className="bi me-2 opacity-50" width="1em" height="1em">
                  <use href="#circle-half"></use>
                </svg>
                Auto
                <svg className="bi ms-auto d-none" width="1em" height="1em">
                  <use href="#check2"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <main className="form-signin m-auto rounded-4" style={{ width: "25rem", backgroundColor: "white", padding: "25px" }}>
          <form onSubmit={handleFormSubmit}>
            <h1 className="h3 mb-3 fw-normal">Enter OTP</h1>

            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
              />
              <label htmlFor="otp">Enter OTP</label>
            </div>

            {/* Warning message */}
            <div className="text-danger m-2" style={{ height: '24px', textAlign: "center" }}>
              {/* Replace this with actual warning message state */}
              {warningMsg}
            </div>

            <button className="btn btn-primary py-2" type="submit" style={{ width: "10rem" }}>
              Verify OTP
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
};

export default OTP;
