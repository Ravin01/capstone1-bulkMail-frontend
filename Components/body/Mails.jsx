import { useEffect, useState } from "react"
import { backEndUrl } from "../../config"
import './Mails.css'
import ViewMail from "./ViewMail"

const Mails = () => {
  const [mails, setMails] = useState([])
  const [singleMail, setSingleMail] = useState('')
  const [viewMail, setViewMail] = useState(false)

  const {accessToken} = JSON.parse(sessionStorage.getItem('user'))

  const getMails = async()=>{
    const {accessToken} = JSON.parse(sessionStorage.getItem('user'))
    const response = await fetch(`${backEndUrl}/sendMail`,{
      headers:{
        'auth-token' : accessToken
      }
    })
    const allMails = await response.json()
    const reverseMails = allMails.reverse()
    setMails(reverseMails)
  }

const handleCancelViewMail = () => {
  if (viewMail === true) {
    setViewMail(false);
  } else {
    setViewMail(true);
  }
};
const handleOpenView = async(mailId)=>{
  const response = await fetch(`${backEndUrl}/sendMail/${mailId}`,{
    headers:{
      'auth-token' : accessToken
    }
  })
  const mail = await response.json()
  setSingleMail(mail)
  setViewMail(true)
}
useEffect(()=>{
  handleOpenView()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  useEffect(()=>{
    getMails()
  },[mails])

  return (
    <div>
      <h3 className="mails-head-logo">All Mails</h3>
      <div>
        <table className="mails-table">
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
        {viewMail && <ViewMail singleMail = {singleMail} cancelView={handleCancelViewMail} />}
      </div>
    </div>
  )
}

export default Mails