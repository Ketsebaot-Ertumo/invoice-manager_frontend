
import { useEffect, useState } from "react";
import { Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box } from "@mui/material";
import { useRouter } from "next/navigation"; 
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from '../redux/actions/userAction';
import LoginIcon from '@mui/icons-material/Login';
import { AssignmentInd, GroupAdd, ManageAccountsOutlined, PostAdd, Work } from "@mui/icons-material";
import Link from "next/link";

const Sidebar = () => {
    const { userInfo } = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const router = useRouter();

    // log out
    const logOut = () => {
        dispatch(userLogoutAction());
        router.push('/signin');
    }

    const handleMenuItemClick = (event) => {
    };

    return (
        <>
         <div className={`pt-1 font-[Arial]`}>
             <div style={{ boarderRightStyle: "none" }}>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '68vh' }}>
                     <Box sx={{ pt: 0 }}>
                         <Menu
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "#000",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "#fafafa",
                                        color: "#1976d2",
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: "#1976d2",
                                    }
                                },
                            }}>

                            {userInfo && (
                                <div>
                                        <MenuItem component={<Link href="/dashboard" />} icon={<DashboardIcon />}>Dashboard</MenuItem>
                                        <MenuItem component={<Link href="/invoice/create" />} icon={<PostAdd />}>Create Invoice</MenuItem>
                                        <MenuItem component={<Link href="/profile/show" />} icon={<ManageAccountsOutlined />}>Profile Setting</MenuItem>
                                </div>
                            )}
                        </Menu>
                    </Box>
                    <Box sx={{ pb: 2 }}>
                        <Menu
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: '#000',
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: '#fafafa',
                                        color: "#1976d2",
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: '#1976d2',
                                    }
                                },
                            }}>
                            <MenuItem onClick={logOut} icon={<LoginIcon />}>
                                <span>Log out</span>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </div>
        </div>
        </>
    )
}

export default Sidebar;