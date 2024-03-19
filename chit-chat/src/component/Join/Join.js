import React, {useState} from 'react';
import './Join.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';


const Join = () => {
    const [name, setName] = useState("");
    return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
            <img src={logo} alt='logo' />
            <h1>Where Words Find Their Way</h1>
            <input type="text" id="joinInput" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' />
            <Link onClick={(event) => !name ? event.preventDefault() : null} to={`/chat/${name}`}><button className='joinBtn'>Login</button></Link>
        </div>
    </div>
  )
}

export default Join;