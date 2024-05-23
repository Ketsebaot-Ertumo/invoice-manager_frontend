"use client";

import { useEffect, useState } from "react";
import { Avatar, Box, Button, CircularProgress, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Footer from "@/components/Footer";



const validationSchema = yup.object({
    fullName: yup
        .string('Enter your full name')
        .max(20, "Name can't exceed 20 characters")
        .min(4, "Name can't be less than 4 characters"),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email'),
    phone: yup
        .string('Add phone number')
        .min(8, 'Phone number should have a minimum of 8 digits!')
        .max(9, 'Phone number not have to be more than 9 digits!'),
});

const EditUser = () => {
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { id } = useParams();
    const URL = process.env.NEXT_PUBLIC_API_URL;
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phone: '',
    });

    // console.log('id', id)

    // Create a global Axios instance with the desired default configuration
    axios.defaults.withCredentials = true;


    //update user profile
    const updateUser= async (values) => {
        setLoading(true);
        try{
            const {data} = await axios.put(`${URL}/user/edit/${id}`, values);
            if (data.success === true){
                toast.success('User profile updated successfully.');
                router.push('/dashboard')
            }else{
                toast.error(data.message);
                console.log(data.message)
            }
            setLoading(false);
        }catch(error){
            console.log(error);
            toast.error(error.response.data.error);
            setLoading(false);
        }
    }

    // Fetch user profile data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`${URL}/user/show/${id}`);
                setUserData({
                    fullName: data.user.fullName,
                    email: data.user.email,
                    phone: data.user.phone,
                });
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        };

        fetchUserData();
    }, [id]);


    const handleCountryCodeChange = (event) => {
        const selectedCountryCode = event.target.value;
        setFieldValue("selectedCountryCode", selectedCountryCode);
    };
      

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues: {
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            selectedCountryCode: "+251",
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            // Concatenate the selectedCountryCode with the phone number
            const phoneNumberWithCountryCode = `${values.selectedCountryCode}${values.phone}`;
            console.log(phoneNumberWithCountryCode)
            
            // Create a new object with the updated phone number
            const updatedValues = {
                ...values,
                phone: phoneNumberWithCountryCode,
            };
            updateUser(updatedValues);
            actions.resetForm();
        }
    });

    return (
        <>
            <div className="px-50 py-10 md:px-[500px] md:py-20" sx={{ bgcolor: "white"}}>
                <div className="flex justify-center"><Avatar src="" alt=""/></div>
                <Typography className="text-center pt-5" variant="h5" sx={{ pb: 4 }}>Edit your Profile</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        sx={{
                            mb: 3,
                            "& .MuiInputBase-root": {
                            color: 'text.secondary'
                            },
                            fieldset: { boarderColor: "rgb(231, 235, 240)" }
                        }}
                        fullWidth
                        id="fullName"
                        name="fullName"
                        label='Full Name'
                        type="name"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Full Name"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.fullName && Boolean(errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                    />

                    <TextField
                         sx={{
                            mb: 3,
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            },
                            fieldset: {boarderColor: "rgb(231, 215, 240)"}
                          }}
                          fullWidth
                          id="email"
                          label="Email"
                          name='email'
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder="E-mail"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                    />
                    
                    <TextField
                         sx={{
                            mb: 3,
                            "& .MuiInputBase-root": {
                                color: 'text.secondary'
                            },
                            fieldset: {boarderColor: "rgb(231, 215, 240)"}
                          }}
                          fullWidth
                          id="phone"
                          label="Phone Number"
                          name='phone'
                          InputLabelProps={{
                            shrink: true,
                          }}
                          placeholder="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {/* +251 */}
                                <Select
                                    value={values.selectedCountryCode}
                                    onChange={handleCountryCodeChange}
                                    sx={{ 
                                    '.MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                      }, }}
                                    >
                                    <MenuItem value="+1">+1</MenuItem>
                                    <MenuItem value="+251">+251</MenuItem>
                                </Select>
                              </InputAdornment>
                            ),
                          }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        elevation={0}
                        sx={{mt:3, p:1,mb:2, boarderRadius: "25px",}}
                        disabled={loading}
                    >
                    {loading ? <CircularProgress /> : 'Edit Profile'}
                 </Button>
              </Box>
          
          </div>


          <Footer />

        </>
    );
           
}

export default withAuth(EditUser); // Wrap component with the HOC

