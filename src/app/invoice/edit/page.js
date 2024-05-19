// import React, { useEffect, useState } from "react";
// import { Box, Button, CircularProgress, InputAdornment, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import * as yup from 'yup';
// import axios from "axios";
// import ReactQuill from 'react-quill';
// import "react-quill/dist/quill.snow.css";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import {modules}  from '../components/moduleToolbar';




// const validationSchema = yup.object({
//     fullName: yup
//         .string('Enter your full name')
//         .max(20, "Name can't exceed 20 characters")
//         .min(4, "Name can't be less than 4 characters"),
//     email: yup
//         .string('Enter your email')
//         .email('Enter a valid email'),
//     phone: yup
//         .string('Add phone number')
//         .min(8, 'Phone number should have a minimum of 8 digits!')
//         .max(9, 'Phone number not have to be more than 9 digits!'),
// });

// const EditUser = () => {
    
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const {id} = useParams();
//     const [userData, setUserData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         role: '',
//     });
//     const [roleNames, setRoleNames] = useState([]);
//     const url = process.env.REACT_APP_url;

//     // Create a global Axios instance with the desired default configuration
//     axios.defaults.withCredentials = true;


//     //update user profile
//     const updateUser= async (values) => {
//         setLoading(true);
//         try{
//             // console.log(id,values)
//             const {data}= await axios.put(`${url}/user/edit/${id}`, values);
//             console.log(data.updatedUser)
//             if (data.success === true){
//                 toast.success('User profile updated successfully.');
//                 navigate('/admin/dashboard')
//             }else{
//                 toast.error(data.message);
//                 console.log(data.message)
//             }
//             setLoading(false);
//         }catch(error){
//             console.log(error);
//             toast.error(error.response.data.error);
//             setLoading(false);
//         }
//     }

//     // Fetch user data
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const { data } = await axios.get(`${url}/user/show/${id}`);
//                 setUserData({
//                     fullName: data.user.fullName,
//                     email: data.user.email,
//                     role: data.user.role,
//                     phone: data.user.phone,
//                 });
//                 console.log('data',data.user.role)
//             } catch (error) {
//                 console.log(error);
//                 toast.error(error);
//             }
//         };

//         fetchUserData();
//     }, [id]);

    
//     const fetchRoles = async () => {
//         try {
//             const { data } = await axios.get(`${url}/user/roleList`);
//             console.log('role names',data.roleNames)
//             setRoleNames(data.roleNames);
//         } catch (error) {
//             console.error('Failed to fetch roles names:', error);
//         }
//     };

//     useEffect(() => {
        
//         fetchRoles();
//     }, []);


//     const handleCountryCodeChange = (event) => {
//         const selectedCountryCode = event.target.value;
//         setFieldValue('selectedCountryCode', selectedCountryCode);
//     };
      

//     const {
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         setFieldValue
//     } = useFormik({
//         initialValues: {
//             fullName: userData.fullName,
//             email: userData.email,
//             phone: userData.phone,
//             role: userData.role,
//             selectedCountryCode: '+251',
//         },
//         validationSchema: validationSchema,
//         enableReinitialize: true,
//         onSubmit: (values, actions) => {
//             // Concatenate the selectedCountryCode with the phone number
//             const phoneNumberWithCountryCode = `${values.selectedCountryCode}${values.phone}`;
//             console.log(phoneNumberWithCountryCode)
            
//             // Create a new object with the updated phone number
//             const updatedValues = {
//                 ...values,
//                 phone: phoneNumberWithCountryCode,
//             };
//             console.log('updated values',updatedValues)
//             updateUser(updatedValues);
//             actions.resetForm();
//         }
//     });

//     return (
//         <>
//             <div className='px-50 md:px-[200px] md:py-5' sx={{ bgcolor: "white"}}>
//                 <Typography className="text-center" variant="h5" sx={{ pb: 4 }}>Edit User Profile</Typography>
//                 <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                 <TextField
//                         sx={{
//                             mb: 3,
//                             "& .MuiInputBase-root": {
//                             color: 'text.secondary'
//                             },
//                             fieldset: { boarderColor: "rgb(231, 235, 240)" }
//                         }}
//                         fullWidth
//                         id="fullName"
//                         name="fullName"
//                         label='Full Name'
//                         type="name"
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Full Name"
//                         value={values.fullName}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.fullName && Boolean(errors.fullName)}
//                         helperText={touched.fullName && errors.fullName}
//                     />

//                     <TextField
//                          sx={{
//                             mb: 3,
//                             "& .MuiInputBase-root": {
//                                 color: 'text.secondary'
//                             },
//                             fieldset: {boarderColor: "rgb(231, 215, 240)"}
//                           }}
//                           fullWidth
//                           id="email"
//                           label="Email"
//                           name='email'
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           placeholder="E-mail"
//                           value={values.email}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           error={touched.email && Boolean(errors.email)}
//                           helperText={touched.email && errors.email}
//                     />
                    
//                     <TextField
//                          sx={{
//                             mb: 3,
//                             "& .MuiInputBase-root": {
//                                 color: 'text.secondary'
//                             },
//                             fieldset: {boarderColor: "rgb(231, 215, 240)"}
//                           }}
//                           fullWidth
//                           id="phone"
//                           label="Phone Number"
//                           name='phone'
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           placeholder="Phone Number"
//                           value={values.phone}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           error={touched.phone && Boolean(errors.phone)}
//                           helperText={touched.phone && errors.phone}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 {/* +251 */}
//                                 <Select
//                                     value={values.selectedCountryCode}
//                                     onChange={handleCountryCodeChange}
//                                     sx={{ 
//                                     '.MuiOutlinedInput-notchedOutline': {
//                                             border: 'none',
//                                       }, }}
//                                     >
//                                     <MenuItem value="+1">+1</MenuItem>
//                                     <MenuItem value="+251">+251</MenuItem>
//                                 </Select>
//                               </InputAdornment>
//                             ),
//                           }}
//                     />

//                     <TextField
//                          sx={{
//                             mb: 3,
//                             "& .MuiInputBase-root": {
//                                 color: 'text.secondary'
//                             },
//                             fieldset: {boarderColor: "rgb(231, 215, 240)"}
//                           }}
//                           fullWidth
//                           id="role"
//                           label="Role Type"
//                           name='role'
//                           select
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           value={values.role}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           error={touched.role && Boolean(errors.role)}
//                           helperText={touched.role && errors.role}
//                     >
//                         <MenuItem value="" disabled>
//                                 Select a Role Type
//                         </MenuItem>
//                         {roleNames.map((nameOption) => (
//                             <MenuItem key={nameOption.role} value={nameOption.role}>
//                                 {nameOption.role}
//                             </MenuItem>
//                         ))}
//                     </TextField>

//                     <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     elevation={0}
//                     sx={{mt:3, p:1,mb:2, boarderRadius: "25px",}}
//                     disabled={loading}
//                  >
//                     {loading ? <CircularProgress /> : 'Edit'}
//                  </Button>
//               </Box>
          
//           </div>


//             <div className="text-center sm:text-right text-black text-opacity-20 md:text-lg font-normal font-['Inter'] sm:mr-20 py-5 sm:py-10">
//                 <p>© <span>{new Date().getFullYear()}</span> TechEthio IT Solutions PLC. All rights reserved.</p>
//             </div>
//         </>
//     );
           
// }
// export default EditUser

