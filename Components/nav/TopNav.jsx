import './TopNav.css'

export const TopNav = ()=>{
    sessionStorage.setItem('test', 'some value')
    let work = sessionStorage.getItem('test')
    console.log(work)
    return (
        <div style={{
            width : '80vw',
            height : '60px',
            backgroundColor : '#5B2C6F',
            position : 'fixed',
            right : '0',
            top : '0',
        }}>
            <div style={{
                display : 'flex',
                width : '100%',
                height : '100%',
                justifyContent : 'space-between',
                alignItems : 'center',
                padding : '25px'
            }}>
                <div>
                    <input type="text" placeholder="search mail" className="search" />
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                </div>
                <div style={{
                    display : 'flex',
                    width : '15vw',
                    justifyContent : 'space-between'
                }}>
                    <h4>{name}</h4>
                    <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_3C9f184YdepmY8v1NI1b-QnfCQAY9Q5lvrmu6WI3icYqasb9c2RJBPz4hkFJjQJM_c&usqp=CAU" alt="Profile Image" className='topNav-profile' /></div>
                </div>
            </div>
        </div>
    )
}