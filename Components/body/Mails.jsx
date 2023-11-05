/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { backEndUrl } from "../../config";
import "./Mails.css";
import ViewMail from "./ViewMail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { mailsCount } from "../../src/features/MailsCountSlice";


const Mails = () => {


  const [mails, setMails] = useState([]);
  const [singleMail, setSingleMail] = useState("");
  const [viewMail, setViewMail] = useState(false);
  
  const dispatch = useDispatch();

// const getMailsApiCalls = useSelector((state)=> state.getMailsReducer)
// console.log(getMailsApiCalls)


  const { accessToken } = JSON.parse(sessionStorage.getItem("user"));

  const getMails = async () => {
    const { accessToken } = JSON.parse(sessionStorage.getItem("user"));
    const response = await fetch(`${backEndUrl}/mails`, {
      headers: {
        "auth-token": accessToken,
      },
    });
    const allMails = await response.json();
    const reverseMails = allMails.reverse();
    setMails(reverseMails);
    dispatch(mailsCount(mails.length))
  };

  // if(getMailsApiCalls === true){
  //   getMails()
  // }
  const handleCancelViewMail = () => {
    if (viewMail === true) {
      setViewMail(false);
    } else {
      setViewMail(true);
    }
  };
  const handleOpenView = async (mailId) => {
    const response = await fetch(`${backEndUrl}/mails/${mailId}`, {
      headers: {
        "auth-token": accessToken,
      },
    });
    const mail = await response.json();
    console.log(mail);
    setSingleMail(mail);
    setViewMail(true);
  };

  const handleAddImportant = async (mailId) => {
    console.log(mailId);
    const response = await fetch(`${backEndUrl}/mails/${mailId}`, {
      headers: {
        "auth-token": accessToken,
      },
    });
    const mail = await response.json();
    const add = await fetch(`${backEndUrl}/importantMails`, {
      method: "POST",
      body: JSON.stringify({ ...mail, mailId: mailId }),
      headers: {
        "Content-Type": "application/json",
        "auth-token": accessToken,
      },
    });
    if (add.status === 402) {
      toast.error("Already Added", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.success(`Added successfully`, {
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



  useEffect(() => {
    handleOpenView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getMails();
  }, [mails]);

  return (
    <div>
      <h3 className="mails-head-logo">All Mails</h3>
      <div>
        
        <div className="mails-body">
          <div className="mails-body-sec">
          
              {mails.map((d, i) => (
                
                <div
                  key={i}
                  className="mails-mail"
                  style={{
                    overflow: "scroll",
                  }}
                  
                >
                  
                  <div className="mails-content" 
                  onClick={() => handleOpenView(d.mailId)}
                  >
                    <p className="mails-table-to">{d.to}</p>
                    <p className="mails-table-subject">{d.subject}</p>
                  </div>
                  <div className="mails-table-action">
                    
                    <button
                      className="mails-importBtn"
                      onClick={() => handleAddImportant(d.mailId)}
                    >
                      Add to Important
                    </button>
                  </div>
                  
                </div>
               
              ))}
               
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
       
        {viewMail && (
          <ViewMail singleMail={singleMail} cancelView={handleCancelViewMail} />
        )}
      </div>
    </div>
  );
};

export default Mails;
