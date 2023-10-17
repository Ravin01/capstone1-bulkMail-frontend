import { useEffect, useState } from "react"
import { backEndUrl } from "../../config"
import './Mails.css'
// import ViewMail from "./ViewMail"

const Mails = () => {
  const [mails, setMails] = useState([])
  const [singleMail, setSingleMail] = useState('')
  const getMails = async()=>{
    const response = await fetch(`${backEndUrl}/sendMail`)
    const allMails = await response.json()
    setMails(allMails)
  }
const handleViewMail = async(mailId)=>{
  const response = await fetch(`${backEndUrl}/sendMail/${mailId}`)
  const mail = await response.json()
  setSingleMail(mail)
}

  useEffect(()=>{
    getMails()
    handleViewMail()
  },[mails,singleMail])
  return (
    <div>
      <h3>Mails</h3>
      <div>
        <table className="mails-table">
          <thead className="mails-table-header">
            <th>S.No</th>
            <th>To</th>
            <th>Subject</th>
            <th className="mails-table-action">Actions</th>
          </thead>
          <tbody className="mails-table-body">
            {mails.map((d,i)=>(
              <tr key={i} onClick={()=> handleViewMail(d.mailId)}>
                <td>{i+1}</td>
                <td>{d.to}</td>
                <td>{d.subject}</td>
                <td>
                  <button>View</button>
                  <button>Add to Important</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <p>{singleMail}</p> */}
        {/* <ViewMail singleMail = {singleMail} /> */}
      </div>
    </div>
  )
}

export default Mails