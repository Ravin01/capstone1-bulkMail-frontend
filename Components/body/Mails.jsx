import { useEffect, useState } from "react"
import { backEndUrl } from "../../config"
import './Mails.css'
import ViewMail from "./ViewMail"
// import ViewMail from "./ViewMail"

const Mails = () => {
  const [mails, setMails] = useState([])
  const [singleMail, setSingleMail] = useState('')
  const [viewMail, setViewMail] = useState(false)

  const getMails = async()=>{
    const response = await fetch(`${backEndUrl}/sendMail`)
    const allMails = await response.json()
    const reverseMails = allMails.reverse()
    setMails(reverseMails)
  }
// const handleViewMail = async(mailId)=>{
  
// }

const handleCancelViewMail = () => {
  if (viewMail === true) {
    setViewMail(false);
  } else {
    setViewMail(true);
  }
};
const handleOpenView = async(mailId)=>{
  const response = await fetch(`${backEndUrl}/sendMail/${mailId}`)
  const mail = await response.json()
  setSingleMail(mail)
  setViewMail(true)
}

  useEffect(()=>{
    getMails()
    handleOpenView()
  },[mails])

  return (
    <div>
      <h3 className="mails-head-logo">All Mails</h3>
      <div>
        <table className="mails-table">
          {/* <thead className="mails-table-header">
            <th className="mails-table-sn">No</th>
            <th className="mails-table-to">To</th>
            <th className="mails-table-subject" >Subject</th>
            <th className="mails-table-action">Actions</th>
          </thead> */}
          <div className="mails-table-body">
          <tbody >
            {mails.map((d,i)=>(
              <tr key={i} className="mails-table-mail" style={{
                overflow : 'scroll'
              }}>
                <div>
                <td className="mails-table-sn">{i+1}</td>
                <td className="mails-table-to">{d.to}</td>
                <td className="mails-table-subject">{d.subject}</td>
                </div>
                <td className="mails-table-action">
                  <button onClick={()=> handleOpenView(d.mailId)} className="mails-viewBtn">Explore</button>
                  <button className="mails-importBtn">Add to Important</button>
                </td>
              </tr>
            ))}
          </tbody>
          </div>
          
        </table>
        {/* <p>{singleMail}</p> */}
        {viewMail && <ViewMail singleMail = {singleMail} cancelView={handleCancelViewMail} />}
      </div>
    </div>
  )
}

export default Mails