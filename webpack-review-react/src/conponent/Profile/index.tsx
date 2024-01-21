import React from "react";
import REACT_SVG from '../../assets/react.svg'
import './index.less'

export default function Profile() {
    return <div className="profile_container">
        <div className='profile_container__img_container'>
            <img src={REACT_SVG}></img>
        </div>
        <h1>Hello, React!</h1>
        <h2>The library for web and native user interfaces</h2>
        <div className="profile_container__btn_container">
            <button onClick={()=>{
                window.open("https://react.dev/learn")
            }}>Learn More</button>
        </div>
    </div>
}