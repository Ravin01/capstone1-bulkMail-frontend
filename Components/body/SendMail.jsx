/* eslint-disable react/prop-types */
import { useState } from "react"
import { backEndUrl } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './SendMail.css'

const SendMail = ({cancelBtn}) => {
  const [data, setData] = useState({
    from : 'ravinganapathi@gmail.com',
    to : '',
    subject : '',
    text : ''
  })
  const [emails, setEmails] = useState([]);
  const count = emails.length
  const [inputValue, setInputValue] = useState('');
  const handleChange = (ele)=>{
    const {name, value} = ele.target;
    setData({
      ...data, [name] : value
    })
  }
  const handleSubmit = async(ele)=>{
    ele.preventDefault();
console.log({...data, to : emails})
    const newMail = await fetch(`${backEndUrl}/sendMail`,{
      method : 'POST',
      body : JSON.stringify({...data, to : emails}),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    
    if(newMail.status === 200){
      setData({
        to : '',
      subject : '',
      text : ''
      })
      setEmails([])
      toast.success(`${count} email successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      toast.error('Not sent, Refresh and Try again', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChipDelete = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        setEmails([...emails, inputValue]);
        setInputValue('');
      }
    }
  };
  const handleCancel = () => {
    cancelBtn()
  };
  return (
    <div className="sendMail-container">
      <div className="sendMail-con2">
      
      <form action="POST" onSubmit={handleSubmit} className="sendMail-form">
        <h4>Write your mail</h4>
        <br />
        
     <div className="sendMail-div" >
     <label htmlFor="to" className="sendMail-label" >To  </label>
      <input
        id="to"
        type="email"
        placeholder="Enter email and hit enter"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        className="sendMail-in"
      />
     </div>
     <div className="sendMail-div">
     <label htmlFor="subject" className="sendMail-label" >Subject </label>
        <input type="text" name="subject" id="subject" placeholder="Enter subject" value={data.subject} onChange={handleChange} required className="sendMail-in"/>
     </div>
        <div className="sendMail-div-text">
        <label htmlFor="text" className="sendMail-label">Body </label>
        <textarea type="text" name="text" id="text" placeholder="enter text"value={data.text} onChange={handleChange} className="sendMail-text"/>
        </div>
        <button type="submit" className="sendMail-btn" >Send</button>
      </form>
      <div className="chip-container-home">
        <div className="chip-align">
        <p>Mails : </p>
        <p>{count}</p>
        </div>
        <div className="chip-container">
        {emails.map((email, index) => (
          <div key={index} className="chip">
            {email}
            <button onClick={() => handleChipDelete(index)} className="cancelEmail-btn" >&times;</button>
          </div>
        ))}
        </div>
      </div>
      </div>
      <div
          style={{
            position: "absolute",
            top: "20px",
            right: "60px",
            width : '30px',
            height : '30px',
            backgroundColor : 'white',
            borderRadius : '50%',
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center'
          }}
        >
          <button onClick={handleCancel} className="home-cancel-btn"><i className="fa-solid fa-x"></i></button>
        </div>
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
    </div>
  )
}

export default SendMail