/* eslint-disable react/prop-types */
import { useState } from "react";
import { backEndUrl } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SendMail.css";
// import { useDispatch } from "react-redux";
// import { getMailsApi } from "../../src/features/getMailsSlice";

const SendMail = ({ cancelBtn }) => {
  const [data, setData] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const [emails, setEmails] = useState([]);
  const count = emails.length;
  const [inputValue, setInputValue] = useState("");
  // const [getStateMails, setStateMails] = useState(false);

  // const dispatch = useDispatch();

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const [sending, setSending] = useState(false);
  const { accessToken } = JSON.parse(sessionStorage.getItem("user"));
  const handleSubmit = async (ele) => {
    ele.preventDefault();
    setSending(true);
    const newMail = await fetch(`${backEndUrl}/mails`, {
      method: "POST",
      body: JSON.stringify({ ...data, to: emails }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": accessToken,
      },
    });

    if (newMail.status === 200) {
      setData({
        to: "",
        subject: "",
        text: "",
      });
      setEmails([]);
      setSending(false);
      toast.success(`${count} email Sent successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // setStateMails(true)
      // setStateMails(false)
    } else {
      setSending(false);
      toast.error("Not sent, Fill all input, check connection", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  // dispatch(getMailsApi(getStateMails));
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChipDelete = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        setEmails([...emails, inputValue]);
        setInputValue("");
      }
    }
  };
  const handleCancel = () => {
    cancelBtn();
  };
  return (
    <div className="sendMail-container">
      <div className="sendMail-con2">
        <h4 className="sendMail-writeText">Write your mail</h4>
        <div className="sendMail-content">
          <form action="POST" onSubmit={handleSubmit} className="sendMail-form">
            <div className="sendMail-div">
              <label htmlFor="to" className="sendMail-label">
                To{" "}
              </label>
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
              <label htmlFor="subject" className="sendMail-label">
                Subject{" "}
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter subject"
                value={data.subject}
                onChange={handleChange}
                required
                className="sendMail-in"
              />
            </div>
            <div className="sendMail-div-text">
              <label htmlFor="text" className="sendMail-label">
                Body{" "}
              </label>
              <textarea
                type="text"
                name="text"
                id="text"
                placeholder="enter text"
                value={data.text}
                onChange={handleChange}
                className="sendMail-text"
              />
            </div>
            <button type="submit" className="sendMail-btn">
              Send
            </button>
          </form>
          <div className="chip-container-home">
            <div className="chip-align">
              <p>Mails : </p>
              <p>{count}</p>
            </div>
            <div
              className="chip-container"
              placeholder="Enter email in To and hit enter or space-bar"
            >
              {emails.map((email, index) => (
                <div key={index} className="chip">
                  {email}
                  <button
                    onClick={() => handleChipDelete(index)}
                    className="cancelEmail-btn"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="home-mail-cancelBtn">
        <button onClick={handleCancel} className="home-cancel-btn">
          <i className="fa-solid fa-x"></i>
        </button>
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
      {sending && (
        <div className="sendMail-sending">
          <div className="preload-sendMail"></div>
          <h5>Sending {count} ...</h5>
        </div>
      )}
    </div>
  );
};

export default SendMail;
