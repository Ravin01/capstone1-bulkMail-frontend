/* eslint-disable react/prop-types */
import './ViewMail.css'

const ViewMail = ({singleMail,cancelView}) => {
  const handleCancelView = ()=>{
    cancelView()
  }
  return (
    <div className="viewMail-container">
      <div className="viewMail-con2">
          <div className="viewMail-form">
            <div className="viewMail-div">
              <h5 className='viewMail-label'>To</h5>
              <h5 className=''>{singleMail.to}</h5>
            </div>
            <div className="viewMail-div">
            <h4 className='viewMail-label'>Subject</h4>
              <h5>{singleMail.subject}</h5>
            </div>
            <div className="viewMail-div-text">
            <h4 className='viewMail-label'>Body</h4>
              <p className='viewMail-text'>{singleMail.text}</p>
            </div>
          </div>
      </div>
      <div className="viewMail-mail-cancelBtn" onClick={handleCancelView}>
        <button className="viewMail-cancel-btn" >
        <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default ViewMail