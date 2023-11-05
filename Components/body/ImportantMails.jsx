import { useEffect, useState } from "react";
import { backEndUrl } from "../../config";
// import "./Mails.css";
import ViewMail from "./ViewMail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ImportantMails.css'
import { useDispatch } from "react-redux";
import { importantCount } from "../../src/features/ImportantMailCount";

const ImportantMails = () => {
  const [mails, setMails] = useState([]);
  const [singleMail, setSingleMail] = useState("");
  const [viewMail, setViewMail] = useState(false);

  const dispatch = useDispatch()

  const { accessToken } = JSON.parse(sessionStorage.getItem("user"));

  const getMails = async () => {
    const { accessToken } = JSON.parse(sessionStorage.getItem("user"));
    const response = await fetch(`${backEndUrl}/importantMails`, {
      headers: {
        "auth-token": accessToken,
      },
    });
    const allMails = await response.json();
    const reverseMails = allMails.reverse();
    setMails(reverseMails);
    // console.log(mails.length)
    dispatch(importantCount(reverseMails.length))
  };

  const handleCancelViewMail = () => {
    if (viewMail === true) {
      setViewMail(false);
    } else {
      setViewMail(true);
    }
  };
  const handleOpenView = async (mailId) => {
    const response = await fetch(`${backEndUrl}/importantMails/${mailId}`, {
      headers: {
        "auth-token": accessToken,
      },
    });
    const mail = await response.json();
    setSingleMail(mail);
    setViewMail(true);
  };
  const handleRemoveMail = async (mailId) => {
    const remove = await fetch(`${backEndUrl}/importantMails/${mailId}`, {
      method: "DELETE",
      headers: {
        "auth-token": accessToken,
      },
    });
    if (remove) {
      toast.success(`Removed successfully`, {
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
      toast.error("Error", {
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
      <h3 className="imMails-head-logo">Important Mails</h3>
      <div>
       
          <div className="imMails-body">
            <div className="imMails-body-sec">
              {mails.map((d, i) => (
                <div
                  key={i}
                  className="imMails-mail"
                  style={{
                    overflow: "scroll",
                  }}
                >
                  <div className="imMails-content" onClick={() => handleOpenView(d.mailId)}>

                    <p className="imMails-table-to">{d.to}</p>
                    <p className="imMails-table-subject">{d.subject}</p>
                  </div>
                  <div className="imMails-table-action">
                    
                    <button
                      className="imMails-importBtn"
                      onClick={() => handleRemoveMail(d.mailId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
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

export default ImportantMails;
