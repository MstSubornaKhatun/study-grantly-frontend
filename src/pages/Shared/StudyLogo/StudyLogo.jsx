import React from 'react';
// import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const StudyLogo = () => {
    return (
        <Link to="/">
            <div className='flex items-end'>
                {/* <img className='mb-2' src={logo} alt="" /> */}
                  <div className="text-3xl font-extrabold text-center">
                        Study<span className="text-[#e2a5aa]">Grantly</span>
                    </div> 
            </div>
        </Link>
    );
};

export default StudyLogo;