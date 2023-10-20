import { useState } from "react";
import { backEndUrl } from "../../config";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const [register, setRegister] = useState(false);
  const [data, setData] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });
  const [text, setText] = useState('password')
  const [eye,setEye] = useState('fa-solid fa-eye-slash')
  const handlePassword = ()=>{
    if(text === 'password'){
      setText('text')
      setEye('fa-solid fa-eye')
    }else{
      setText('password')
      setEye('fa-solid fa-eye-slash')
    }
  }
  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (ele) => {
    ele.preventDefault();
    const newUser = await fetch(`${backEndUrl}/registration`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await newUser.json()
    if (newUser.status === 409) {
      toast.error('Already exists', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } else {
      toast.error('user created successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      sessionStorage.setItem("user", JSON.stringify(userData));
      setRegister(true);
    }

    console.log(data);
    setData({
      userName: "",
      userEmail: "",
      password: "",
    });
  };
  if (register === true) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <div className="regis-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="regis-center">
        <form action="POST" onSubmit={handleSubmit} className="regis-form">
          <h3 className="regis-head">Registration</h3>
          <br />
          <br />
          <div className="regis-in" style={{
            display : 'flex',
            justifyContent : 'space-between'
          }}>
          <input
            type="text"
            name="userName"
            id="userName"
            value={data.userName}
            onChange={handleChange}
            required
            placeholder="Name"
            className="regis-icon"
          />
          <i className="fa-solid fa-user"></i>
          </div>
          <br />
          <br />
          <div className="regis-in" style={{
            display : 'flex',
            justifyContent : 'space-between'
          }}>
          <input
            type="text"
            name="userEmail"
            id="userEmail"
            value={data.userEmail}
            onChange={handleChange}
            required
            placeholder="Email"
            className="regis-icon"
          />
          <i className="fa-solid fa-envelope"></i>
          </div>
          <br />
          <br />
          <div className="regis-in" style={{
            display : 'flex',
            justifyContent : 'space-between'
          }}>
          <input
            type={text}
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="regis-icon"
          />
          <span className={eye} onClick={handlePassword} style={{
            cursor : 'pointer'
          }}></span>
          </div>
          <br />
          <br />
          <button type="submit" className="regis-submit">
            Register
          </button>
          <br />
          <br />
        </form>
      </div>
      <div className="regis-con2"></div>
      <div className="regis-login">
        <h1>Mail System</h1>
        <br />
        <h3>One of Us ?</h3>
        <br />
        <p>We are greatly invite you to </p>
        <br />
        <button className="regis-btn-login">
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "#20dbc2",
            }}
          >
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Register;
