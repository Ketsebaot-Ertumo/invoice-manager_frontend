
// import Image from "next/image";
// import Logo from '../images/logo.png'
// import { Close, Menu } from '@mui/icons-material';
// import MenuNav from './Menu';
// import { IconButton } from '@mui/material';
// import { useState } from 'react';
// import Link from 'next/link';
// // import Sidebar from "./Sidebar";
// import { GridMenuIcon } from '@mui/x-data-grid';

// function Navbar() {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showIconOnly, setShowIconOnly] = useState(false);
 
//   const handleMenuIconClick = (e) => {
//       setShowIconOnly(!showIconOnly);
//   };

//   const handleMenuHover = (menu) => {
//     setActiveMenu(menu);
//   };

//   const handleNavMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header className="flex items-center justify-between px-5 sm:px-10 fixed z-40 w-full h-[44px] md:h-[60px] bg-black">
      
//       <GridMenuIcon className={`cursor-pointer`} onClick={ handleMenuIconClick} />
      
//       <Link href="/">
//         <div className="flex items-center gap-5 hover:text-gray-500">
//           <Image
//             src={Logo}
//             className="rounded-full w-6 h-6 sm:w-10 sm:h-10"
//             alt="logo"
//         />
//           <p className="hidden sm:flex">Lepton Games</p>
//         </div>
//       </Link>

//       <MenuNav />

//       <div className="lg:hidden">
//         <div className="pr-8" onClick={handleNavMenu}>
//           <Menu className="lg:mb-3" />

//           {isMenuOpen && (
//             <div className="absolute bg-white shadow text-left rounded-lg p-3 h-screen ml-[-90px] w-full top-0">
//               <div className="mb-3 ml-[100px]">
//                 <IconButton edge="start" color="black" onClick={handleNavMenu} aria-label="close">
//                   <Close className="black" />
//                 </IconButton>
//               </div>

//               <Link href="/signin">
//                 <div className="cursor-pointer text-black hover:text-gray-500">
//                     LogIn
//                 </div>
//               </Link>
//               <Link href="/signup">
//                 <div className="cursor-pointer text-black hover:text-gray-500">
//                     Signup
//                 </div>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//     </header>
//   );
// }

// export default Navbar;