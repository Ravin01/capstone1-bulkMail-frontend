import { useState } from "react";
import { SideNav } from "../nav/SideNav";
import { TopNav } from "../nav/TopNav";
import Mails from "./Mails";
import SendMail from "./SendMail";
import './Home.css'

export const Home = () => {
  const [mailBox, setMailBox] = useState(false);
  const handleMailBox = () => {
    setMailBox(true);
  };
  const handleCancelBtn = () => {
    if(mailBox === true){
      setMailBox(false);
    }else{
      setMailBox(true)
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          height : '100vh',
          width : '100vw',
          backgroundColor : 'black',
          color : '#D0D3D4'
        }}
      >
        <div>
          <SideNav />
        </div>
        <div>
          <TopNav />
          <div
            style={{
              margin: "80px 0px 0px 300px",
            }}
          >
            <Mails />
          </div>
          <div
            style={{
              position: "absolute",
              right: "60px",
              bottom: "70px",
            }}
          >
            <div onClick={handleMailBox} className="home-send-btn">
            <p className="">
              Send
            </p>
            <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        </div>
      </div>
      {/* {mailBox && (
        
      )} */}
      {mailBox && <SendMail cancelBtn={handleCancelBtn} />}
    </>
  );
};
