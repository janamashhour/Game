import React from 'react';
import './intro.css';
import { useEffect, useState } from 'react';
import Preloader from '../components/layout/preloader';

const Intro = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 5000)
  
      return () => clearTimeout(timer)
    }, [])
  
    if (loading) {
      return <Preloader />
    }
    return ( <>
    
    </> );
}
 
export default Intro;