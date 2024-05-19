
// import { useEffect, useState } from "react";
// import { Menu, MenuItem, menuClasses } from "react-pro-sidebar";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import { Box } from "@mui/material";
// import PeoplesIcon from '@mui/icons-material/PeopleSharp';
// import { useRouter } from "next/navigation"; 
// import { useDispatch, useSelector } from "react-redux";
// import { userLogoutAction } from '../redux/actions/userAction';
// import LoginIcon from '@mui/icons-material/Login';
// import { AssignmentInd, GroupAdd, ManageAccountsOutlined, PostAdd, Work } from "@mui/icons-material";
// import Link from "next/link";

// const Sidebar = () => {
//     const { userInfo } = useSelector(state => state.signIn);
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [activeMenu, setActiveMenu] = useState(null);
//     const [showIconOnly, setShowIconOnly] = useState(false);

//     // log out
//     const logOut = () => {
//         dispatch(userLogoutAction());
//         router.push('/signin');
//     }

//     const handleMenuItemClick = (event) => {
//     };

//     return (
//         <>
//          <div className={`pt-8 xs:pt-2 sm:pt-5 md:pt-6`}>
//              <div style={{ boarderRightStyle: "none" }}>
//                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100vh' }}>
//                      <Box sx={{ pt: 4 }}>
//                          <Menu
//                             menuItemStyles={{
//                                 button: {
//                                     [`&.${menuClasses.button}`]: {
//                                         color: "#000",
//                                     },
//                                     [`&.${menuClasses.disabled}`]: {
//                                         color: "green",
//                                     },
//                                     '&:hover': {
//                                         backgroundColor: "#fafafa",
//                                         color: "#1976d2",
//                                     },
//                                 },
//                                 icon: {
//                                     [`&.${menuClasses.icon}`]: {
//                                         color: "#1976d2",
//                                     }
//                                 },
//                             }}>

//                             {userInfo && userInfo.role === 'admin' ? (
//                                 <div>
//                                         <MenuItem component={<Link href="/admin/dashboard" />} icon={<DashboardIcon /> }>Dashboard</MenuItem>
//                                         <MenuItem onClick={ handleMenuItemClick} component={<Link href="/admin/create/Posts" />} icon={<PostAdd />}>Create Invoice</MenuItem>
//                                         <MenuItem onClick={ handleMenuItemClick} component={<Link href="/admin/users" />} icon={<ManageAccountsOutlined />}>Users</MenuItem>
//                                 </div>
//                              ) : (
//                                 <div>
//                                     <div>
//                                         <MenuItem className={`${activeMenu === 'dashboard' ? 'bg-w-g' : ''}`} component={<Link href="/user/dashboard" />} icon={<DashboardIcon />}><span className={`${activeMenu === 'dashboard' ? 'text-blue' : 'text-black'}`}>User Dashboard</span></MenuItem>
//                                         <MenuItem className={`${activeMenu === 'profile' ? 'bg-w-g' : ''}`} component={<Link href="/user/profile" />} icon={<ManageAccountsOutlined />}><span className={`${activeMenu === 'profile' ? 'text-blue' : 'text-black'}`}>Profile Setting</span></MenuItem>
//                                     </div>
//                                 </div>
//                             )}
//                         </Menu>
//                     </Box>
//                     <Box sx={{ pb: 2 }}>
//                         <Menu
//                             menuItemStyles={{
//                                 button: {
//                                     [`&.${menuClasses.button}`]: {
//                                         color: '#000',
//                                     },
//                                     [`&.${menuClasses.disabled}`]: {
//                                         color: "green",
//                                     },
//                                     '&:hover': {
//                                         backgroundColor: '#fafafa',
//                                         color: "#1976d2",
//                                     },
//                                 },
//                                 icon: {
//                                     [`&.${menuClasses.icon}`]: {
//                                         color: '#1976d2',
//                                     }
//                                 },
//                             }}>
//                             <MenuItem onClick={logOut} icon={<LoginIcon />}>
//                                 <span>Log out</span>
//                             </MenuItem>
//                         </Menu>
//                     </Box>
//                 </Box>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Sidebar;