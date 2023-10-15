/* eslint-disable react/prop-types */
import './ViewMail.css'

const ViewMail = ({singleMail}) => {
    // console.log(singleMail)
  return (
    <div>
        <div>Mail</div>
        <p>{singleMail.to}</p>
        <p>{singleMail.subject}</p>
        <p>{singleMail.text}</p>
    </div>
  )
}

export default ViewMail