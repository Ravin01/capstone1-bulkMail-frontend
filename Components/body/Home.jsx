import { useEffect, useState } from "react";
import { SideNav } from "../nav/SideNav";
import { TopNav } from "../nav/TopNav";
import Mails from "./Mails";
import SendMail from "./SendMail";
import "./Home.css";
import { Route, Routes } from "react-router-dom";
import ImportantMails from "./ImportantMails";
import Preloader from "./preloader/Preloader";
import store from "../../src/Store/Store";
import { Provider } from "react-redux";


export const Home = () => {
  const [mailBox, setMailBox] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleMailBox = () => {
    setMailBox(true);
  };
  const handleCancelBtn = () => {
    if (mailBox === true) {
      setMailBox(false);
    } else {
      setMailBox(true);
    }
  };

  // Nav
  const [nav, setNav] = useState("sideNav-container");
  const openNav = () => {
    if (nav === "sideNav-container-res") {
      setNav("sideNav-container");
    } else {
      setNav("sideNav-container-res");
    }
  };
 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500); 
  }, []);

  
  return (
    <>


    
    <Provider store={store}>
      {loading ? <Preloader /> : <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          color: "#242424",
          backgroundColor: "#58D68D",
          // backgroundImage: 'linear-gradient(-45deg, #2ECC71 30%, black 100%)'
          // background: '#040404'
        }}
      >

        
        <div>
          <TopNav openNav={openNav} nav={nav} />
        </div>
        <div>
          <SideNav nav={nav} closeNav={openNav} />
          <div className="home-main-container">
            {/* Routes fro Mails and Important Mails */}
            <Routes>
            <Route path="/mail" element={<Mails />} />
            <Route path="/important" element={<ImportantMails />} />
            </Routes>
          </div>
          <div className="home-mail-send">
            <div onClick={handleMailBox} className="home-send-btn">
              <p className="home-send-font">Send</p>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        </div>
        


        {mailBox && <SendMail cancelBtn={handleCancelBtn} />}
      </div>
      }
      </Provider>
     
    </>
  );
};
