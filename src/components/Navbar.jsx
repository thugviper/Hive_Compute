import React, { useState } from 'react'
import { close, logo, menu } from '../assets'
import { navLinks } from '../constants'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)

  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <img src={logo} alt='hive_comp' className='w-[210px] h-[200px]' />
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, i) => (
          <li
            key={nav.id}
            className={`relative font-poppins font-normal cursor-pointer text-[16px] text-purple-300 bg-purple-900 border-2 border-purple-800 
px-4 py-2 rounded-lg shadow-none transition-all duration-300 ease-in-out 
hover:text-purple-900 hover:bg-purple-300 hover:shadow-[0_0_0.5em_0.2em_rgb(217,176,255),0_0_1.5em_0.5em_rgba(191,123,255,0.5),inset_0_0_.4em_.2em_rgb(217,176,255)] 
active:shadow-[0_0_0.4em_0.2em_rgb(217,176,255),0_0_1em_1em_rgba(191,123,255,0.4),inset_0_0_.3em_.2em_rgb(217,176,255)]
active:scale-95

          ${i === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
          >
            <a href={`#${nav.id}`} className="block w-full h-full text-center">
              {nav.title}
            </a>
            <div className="absolute top-[120%] left-0 w-full h-full bg-[rgba(191,123,255,0.500)] blur-[1.5em] opacity-50 transform perspective-[1em] rotate-x-[35deg] scale-[1,0.6]"></div>
          </li>

        ))}
      </ul>
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggle((previous) => !previous)}
        />
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((nav, i) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${i === navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-white mr-10`}
              >
                <a href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
