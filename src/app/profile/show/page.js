"use client";

import Image from "next/image";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from 'next/link';



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

                <div className='bg-gray-200 pt-20 h-screen'>
                    
                  <p className='text-2xl sm:text-4xl font-medium text-center pt-5 font-[Arial]'>Profile Setting</p>

                  <div className='flex justify-center gap-80 pt-10'>
                      <div className='rounded-full pt-10 text-center'>
                        <Image
                            src=''
                            className="rounded-full w-40 h-40 bg-blue-400"
                            alt=""
                        />
                        <p className="pt-5 text-xl">{fullName}</p>
                        <div className="flex justify-center">
                          <Link href={`/profile/edit/${id}`}>
                              <IconButton aria-label="edit">
                                  <Edit sx={{color: '#1976d2'}} />
                              </IconButton>
                          </Link>
                        </div>

                    </div>
                    
                    <div>
                        <div className='p-5 text-xl'>id: {id}</div>
                        <div className='p-5 text-xl'>Full Name: {fullName}</div>
                        <div className='p-5 text-xl'>Email: {email}</div>
                        <div className='p-5 text-xl'>Phone: {phone}</div>
                        <div className='p-5 text-xl'>Role: {role}</div>
                    </div>
                  </div>

                </div>

                <div className="bg-gray-200 text-center sm:text-right text-black text-opacity-20 md:text-lg font-normal font-['Inter'] sm:pr-20 py-5 sm:py-10">
                  <p>© <span>{new Date().getFullYear()}</span> Lepton Games. All rights reserved.</p>
                </div>

        </>
    );
}
export default Profile