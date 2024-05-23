"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Edit, Person3 } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import Link from 'next/link';
import withAuth from "@/utils/withAuth";
import Footer from "@/components/Footer";



const Profile = () =>{

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const URL = process.env.NEXT_PUBLIC_API_URL;

    // Create a global Axios instance with the desired default configuration
    axios.defaults.withCredentials = true;

    // display profile
    const dispalyProfile = async () => {
        setLoading(true);
        try {
          const {data} = await axios.get(`${URL}/user/profile`);
          setId(data.profile.id);
          setFullName(data.profile.fullName)
          setEmail(data.profile.email);
          setPhone(data.profile.phone);
          setRole(data.profile.role);
          setLoading(false);

        } catch (error) {
          console.log(error)
          toast.error(error.response?.data?.error || 'Failed to fetch ur profile detail!');
        }
      };
    
      useEffect(() => {
        dispalyProfile();
      }, [])


    return(
        <>

                <div className='bg-gray-200 sm:pt-5 lg:pt-20 h-screen'>
                    
                  <p className='hidden lg:flex justify-center text-2xl text-4xl font-medium text-center pt-5 font-[Arial]'>Profile Setting</p>

                  <div className='lg:flex justify-center gap-80 pt-10'>
                      <div className='rounded-full pt-10 text-center'>
                      
                        <Person3 className="hidden lg:flex rounded-full w-40 h-40"/>
                        <div className="flex lg:hidden justify-center"><Avatar src="" alt=""/></div>

                        <p className="pt-3 text-md">{fullName ? fullName : 'Full Name'}</p>
                        <div className="flex justify-center">
                          <Link href={`/profile/edit/${id}`}>
                              <IconButton aria-label="edit">
                                  <Edit sx={{color: '#1976d2'}} />
                              </IconButton>
                          </Link>
                        </div>

                    </div>
                    
                    <div className="px-10 lg:px-0">
                        <div className='p-5 text-lg'>id: {id}</div>
                        <div className='p-5 text-lg'>Full Name: {fullName}</div>
                        <div className='p-5 text-lg'>Email: {email}</div>
                        <div className='p-5 text-lg'>Phone: {phone}</div>
                        <div className='p-5 text-lg'>Role: {role}</div>
                    </div>
                  </div>

                </div>

                <Footer />

        </>
    );
}

export default withAuth(Profile); // Wrap component with the HOC