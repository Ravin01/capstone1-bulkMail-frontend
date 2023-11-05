import './preloader.css'
import icon from '../../../src/assets/email.png'

const Preloader = () => {
  return (
    <div className='preloader-container'>
      <img src={icon} alt="" className='preloader-icon' />
      <div className="loader"></div>
      <h1 className='preloader-mail'>Mail System</h1>
    </div>
  )
}

export default Preloader