import Image from "next/image";
import Logo from '../images/logo.png'
import { Close, Menu } from '@mui/icons-material';
import MenuNav from './Menu';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
  };

  const handleNavMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-5 sm:px-10 fixed z-40 w-full h-[44px] md:h-[60px] bg-black">
      <Link href="/">
        <div className="flex items-center gap-5 hover:text-gray-500">
          <Image
            src={Logo}
            className="rounded-full w-6 h-6 sm:w-10 sm:h-10"
            alt="logo"
        />
          <p className="hidden sm:flex">Lepton Games</p>
        </div>
      </Link>

      <MenuNav />

      <div className="lg:hidden">
        <div className="pr-8" onClick={handleNavMenu}>
          <Menu className="lg:mb-3" />

          {isMenuOpen && (
            <div className="absolute bg-white shadow text-left rounded-lg p-3 h-screen ml-[-90px] w-full top-0">
              <div className="mb-3 ml-[100px]">
                <IconButton edge="start" color="black" onClick={handleNavMenu} aria-label="close">
                  <Close className="black" />
                </IconButton>
              </div>

              {/* <div onMouseEnter={() => handleMenuHover('aboutNav')} onMouseLeave={() => handleMenuHover(null)}> */}
                {/* <p className={`${activeMenu === 'aboutNav' ? 'text-gray-500' : 'text-black'} pb-3`}>About</p>
                {activeMenu === 'aboutNav' && (
                  <div className="absolute bg-white shadow text-left p-4 rounded-lg ml-[-180px]">
                    <ul>
                      <Link href="/about-us/#about">
                        <li className="hover:text-blue">
                          <p>About Us</p>
                        </li>
                      </Link>
                      <Link href="/about-us/#approach">
                        <li className="hover:text-blue py-5">
                          <p>Our Approach</p>
                        </li>
                      </Link>
                      <Link href="/about-us/#team">
                        <li className="hover:text-blue">
                          <p>Our Team</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
              </div> */}

              {/* <div onMouseEnter={() => handleMenuHover('servicesNav')} onMouseLeave={() => handleMenuHover(null)}>
                <p className={`${activeMenu === 'servicesNav' ? 'text-gray-500' : 'text-black'} pb-3`}>Services</p>
                {activeMenu === 'servicesNav' && (
                  <div className="absolute bg-white shadow text-left p-4 rounded-lg ml-[-160px]">
                    <ul>
                      <li className="hover:text-blue">
                        <Link href="/services#architectural">
                          <p>Architectural Design</p>
                        </Link>
                      </li>
                      <li className="hover:text-blue pt-5">
                        <Link href="/services/#interior">
                          <p>Interior Design</p>
                        </Link>
                      </li>
                      <li className="hover:text-blue pt-5">
                        <Link href="/services/#construction">
                          <p>Construction Works</p>
                        </Link>
                      </li>
                      <li className="hover:text-blue pt-5">
                        <Link href="/services/#finishing">
                          <p>Finishing Works</p>
                        </Link>
                      </li>
                      <li className="hover:text-blue pt-5">
                        <Link href="/services/#supervission">
                          <p>Construction Supervission</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div> */}

              {/* <div onMouseEnter={() => handleMenuHover('portfolioNav')} onMouseLeave={() => handleMenuHover(null)}>
                <Link href="/portfolio">
                  <p className={`${activeMenu === 'portfolioNav' ? 'text-gray-500' : 'text-black'} pb-3`}>Portfolio</p>
                </Link>
              </div> */}

              {/* <div onMouseEnter={() => handleMenuHover('contactNav')} onMouseLeave={() => handleMenuHover(null)}>
                <Link href="/contact-us">
                  <p className={`${activeMenu === 'contactNav' ? 'text-gray-500' : 'text-black'}`}>Contact Us</p>
                </Link>
              </div> */}
              <Link href="/signin">
                <div className="cursor-pointer text-black hover:text-gray-500">
                    LogIn
                </div>
              </Link>
              <Link href="/signup">
                <div className="cursor-pointer text-black hover:text-gray-500">
                    Signup
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;