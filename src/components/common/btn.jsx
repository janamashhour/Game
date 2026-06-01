import React from 'react';
import './btn.css';
import { Link } from 'react-router';

const Btn = (props) => {
    return ( <>
    <Link to={props.btnLink}>
    <button className={props.btnStyle}>
        {props.btnText}
    </button>
    </Link>
    </> );
}
 
export default Btn;