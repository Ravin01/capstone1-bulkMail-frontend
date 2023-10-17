/* eslint-disable react/prop-types */
import './TopNav.css'

export const TopNav = ({openNav, nav})=>{
    const handleOpenSideNav = ()=>{
        console.log(nav)
        openNav()
    }
    return (
        <div className='topNav-container'>
            <div style={{
                display : 'flex',
                width : '100%',
                height : '100%',
                justifyContent : 'space-between',
                alignItems : 'center',
                padding : '0px 25px 0px 15px'
            }}>
                <div style={{
                    display : 'flex',
                    alignItems : 'center'
                }}>
                    <div>
                    <i className="fa-solid fa-bars" onClick={handleOpenSideNav}></i>
                    </div>
                    <input type="text" placeholder="search mail" className="search" />
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                    
                </div>
                <div style={{
                    display : 'flex',
                    width : '15vw',
                    justifyContent : 'space-between',
                    alignItems : 'center'
                }}>
                    <h4>{name}</h4>
                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_3C9f184YdepmY8v1NI1b-QnfCQAY9Q5lvrmu6WI3icYqasb9c2RJBPz4hkFJjQJM_c&usqp=CAU" alt="Profile Image" className='topNav-profile' /></div>
                    
                </div>
            </div>
        </div>
    )
}