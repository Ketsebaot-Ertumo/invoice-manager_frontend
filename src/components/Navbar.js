import Image from "next/image";
import Logo from '../images/logo.png'
import { Close, Menu } from '@mui/icons-material';
import MenuNav from './Menu';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";


function Navbar() {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector(state => state.signIn);
  const dispatch = useDispatch();
  const router = useRouter();

  //log out
  const logOut = () => {
      dispatch(userLogoutAction());
      router.push('/');
  }

  const handleNavMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-5 sm:px-10 fixed z-40 w-full h-[44px] md:h-[60px] bg-black">
      <Link href="/">
        <div className="flex items-center gap-5 hover:text-gray-500 pl-2">
          <Image
            src={Logo}
            className="rounded-full w-6 h-6 sm:w-10 sm:h-10"
            alt="logo"
        />
          <p className="hidden sm:flex text-white">Lepton Games</p>
        </div>
      </Link>

      <MenuNav />

      <div className="lg:hidden pr-3" onClick={handleNavMenu}>
          <Menu className="lg:mb-3 text-white" />

          {isMenuOpen && (
            <div className="absolute bg-white shadow text-left rounded-lg p-3 h-screen ml-[-90px] w-full top-0">
              <div className="mb-3 ml-[100px]">
                <IconButton edge="start" color="black" onClick={handleNavMenu} aria-label="close">
                  <Close className="black" />
                </IconButton>
              </div>
              <div>
                {!userInfo || userInfo?.token === null ? (
                  <Link href="/">
                    <div className="cursor-pointer hover:text-gray-500">
                      Login
                    </div>
                  </Link>
                ) : (
                  <div className="cursor-pointer hover:text-gray-500" onClick={logOut}>
                    Logout
                  </div>
                )}
              </div>
                <Link href="/signup">
                  <div className="cursor-pointer text-black hover:text-gray-500 pt-8">
                    Signup
                  </div>
                </Link>
            </div>
          )}
      </div>

    </header>
  );
}

export default Navbar;
