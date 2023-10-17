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

  // Nav
  const [nav, setNav] = useState('sideNav-container')
  const openNav = ()=>{
    if(nav === 'sideNav-container-res'){
      setNav('sideNav-container')
    }else{
      setNav('sideNav-container-res')
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          height : '100vh',
          width : '100vw',
          color : '#242424',
          backgroundColor : '#ECF0F1'
        }}
      >
        <div>
        <TopNav openNav={openNav} nav={nav} />
        </div>
        <div>
        <SideNav nav={nav} closeNav={openNav} />
          <div
            style={{
              margin: "80px 0px 0px 300px",
            }}
          >
            <Mails />
          </div>
          <div className="home-mail-send">
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
