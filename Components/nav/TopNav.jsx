/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import './TopNav.css'

export const TopNav = ({openNav, nav})=>{
    const [name,setName] = useState(null)
    const handleOpenSideNav = ()=>{
        console.log(nav)
        openNav()
    }
    const user = ()=>{
        const userName = JSON.parse(sessionStorage.getItem('user'))
        setName(userName.userName)
    }
    useEffect(()=>{
        user()
    },[])
    return (
        <div className='topNav-container'>
            <div style={{
                display : 'flex',
                width : '100%',
                height : '100%',
                justifyContent : 'space-between',
                alignItems : 'center',
            }}
            className='topNav-con2'
            >
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
                    justifyContent: 'flex-end',
                    alignItems : 'center'
                }}
                className='topNav-profile-user'
                >
                    <h4 style={{
                        color : '#fff',
                        padding : '0px 15px 0px 0px'
                    }}
                    className='topNav-userName'
                    >{name}</h4>
                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_3C9f184YdepmY8v1NI1b-QnfCQAY9Q5lvrmu6WI3icYqasb9c2RJBPz4hkFJjQJM_c&usqp=CAU" alt="Profile Image" className='topNav-profile' /></div>
                    
                </div>
            </div>
        </div>
    )
}