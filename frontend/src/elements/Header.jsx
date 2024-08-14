import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    let Links = [
        { name: "Compiler", link: "/compiler" },
        { name: "Arena", link: "/arena" },
    ];
    let [open, setOpen] = useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 z-10'>
            <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1 text-white'>
                    <span>g++ compiler</span>
                </div>
                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-5 cursor-pointer md:hidden text-white'>
                    {open ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gradient-to-r from-blue-500 to-indigo-500 md:bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-16 opacity-100' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
                    {
                        Links.map((link, index) => (
                            <li key={index} className='md:ml-8 md:my-0 my-7 font-semibold'>
                                <a href={link.link} className='text-white hover:text-yellow-300 duration-500'>{link.name}</a>
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
        </div>
    );
};

export default Header;
