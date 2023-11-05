import { useState } from "react";
import { backEndUrl } from "../../config";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export const Login = () => {
  const [data, setData] = useState({
    userEmail: "",
    password: "",
  });
  const [text, setText] = useState('password')
  const [eye,setEye] = useState('fa-solid fa-eye-slash')
  // const [wait, setWait] = useState(false)
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
    try{
      ele.preventDefault();
    const newUser = await fetch(`${backEndUrl}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userData = await newUser.json()
    if (newUser.status === 401) {
        toast.error('Invalid Password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } else if (newUser.status === 403) {
      toast.error('User not yet registered', {
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
        // toast.success("Login successfully", {
        //   position: "top-right",
        //   autoClose: 2500,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        // });
        // setTimeout(() => {
        //   setWait(true);
        // }, 2500); 
        sessionStorage.setItem("user", JSON.stringify(userData));
    }
    setData({
      userEmail: "",
      password: "",
    });
  }catch(e){
    console.log("error",e)
  }
    }
      if (
        sessionStorage.getItem("user") &&
        JSON.parse(sessionStorage.getItem("user"))
      ) {
        return <Navigate to={"/mail"} replace />;
      }
  return (
    <div className="login-container">
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
      <div className="login-center">
        <form action="POST" onSubmit={handleSubmit} className="login-form">
          <h3 className="login-head">Welcome Back !</h3>
          <br />
          <br />
          <div className="login-in" style={{
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
            className="login-icon"
            placeholder="Email"
          />
          <i className="fa-solid fa-user"></i>
          </div>
          <br />
          <br />
          <div className="login-in" style={{
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
            className="login-icon"
          />
          <span className={eye} onClick={handlePassword} style={{
            cursor : 'pointer'
          }}></span>
          </div>
          <br />
          <p className="login-form-link">Forgot Password ? <Link to={"/forgot"} style={{
            textDecoration : 'none',
            color : '#2ECC71',
            fontSize : '15px'
          }}>Click here</Link></p>
          <br />
          <button type="submit" className="login-submit">Login</button>
        </form>
        </div>
        <div className="login-con2"></div>
        <div className="login-regis">
          <h2>New to our Mail System</h2>
         <br />
         <p>This is a Mail System, Here you can send mails to anyone either a single mail or also Bulk mail</p>
          <br />
          <p className="login-con2-p">Not yet Registered ? </p>
          <br />
          <button className="login-btn-regis"><Link to={"/register"} style={{
            textDecoration : 'none',
            color : '#58D68D'
          }}>Register</Link></button>
      </div>
    </div>
  );
};
