/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { backEndUrl } from "../../config";
import "./Mails.css";
import ViewMail from "./ViewMail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mails = () => {
  const [mails, setMails] = useState([]);
  const [singleMail, setSingleMail] = useState("");
  const [viewMail, setViewMail] = useState(false);

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
  };

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
        <table className="mails-table">
          <div className="mails-table-body">
            <tbody>
              {mails.map((d, i) => (
                <tr
                  key={i}
                  className="mails-table-mail"
                  style={{
                    overflow: "scroll",
                  }}
                >
                  <div>
                    <td className="mails-table-sn">{i + 1}</td>
                    <td className="mails-table-to">{d.to}</td>
                    <td className="mails-table-subject">{d.subject}</td>
                  </div>
                  <td className="mails-table-action">
                    <button
                      onClick={() => handleOpenView(d.mailId)}
                      className="mails-viewBtn"
                    >
                      Explore
                    </button>
                    <button
                      className="mails-importBtn"
                      onClick={() => handleAddImportant(d.mailId)}
                    >
                      Add to Important
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
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
        </table>
        {viewMail && (
          <ViewMail singleMail={singleMail} cancelView={handleCancelViewMail} />
        )}
      </div>
    </div>
  );
};

export default Mails;
