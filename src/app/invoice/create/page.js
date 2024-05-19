// import React, { useEffect, useState } from "react";
// import { Box, Button, CircularProgress, MenuItem, TextField, TextareaAutosize, Typography } from "@mui/material";
// import { useFormik } from "formik";
// import * as yup from 'yup';
// import axios from "axios";
// import ReactQuill from 'react-quill';
// import "react-quill/dist/quill.snow.css";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {modules}  from '../components/moduleToolbar';


// const validationSchema = yup.object({
//     title: yup
//         .string('Add a Post Title')
//         .required('Post title is required'),
//     job_type: yup
//         .string('Add Content!')
//         .required('Content is required'),
//     job_sector: yup
//         .string('Add Content!')
//         .required('Content is required'),
//     work_location: yup
//         .string('Add Content!')
//         .required('Content is required'),
//     experience_level: yup
//         .string('Add Content!') 
//         .required('Content is required'),
//     vacancies: yup
//         .string('Add Content!') 
//         .required('Content is required'),
//     salary: yup
//         .string('Add Content!')
//         .required('Content is required'),
//     deadline: yup
//         .string('Add Content!') 
//         .required('Content is required'),
//     description: yup
//         .string('Add Content!')
//         .required('Content is required'),
//     qualification: yup
//         .string('Add Content!')
//         .required('Content is required'),
//     skills: yup
//         .string('Add Content!')
//         .required('Content is required'),
// });


// const CreateJob = () => {
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const url = process.env.REACT_APP_url;

//     // Create a global Axios instance with the desired default configuration
//     axios.defaults.withCredentials = true;

//     const [formData, setFormData] = useState({
//         title: '',
//         job_type: '',
//         job_sector: '',
//         work_location: '',
//         experience_level: '',
//         vacancies: '',
//         salary: '',
//         deadline: '',
//         description: '',
//         qualification: '',
//         skills: '',
//       });

//         const createNewPost = async (values) => {
//             setLoading(true)
//             try {
//                 const { data } = await axios.post(`${url}/job/create`, values );
    
//                 if (data.success === true) {
//                     toast.success('Job post created successfully!');
//                     navigate('/admin/post/job');
//                 }
//                 setLoading(false)
//             } catch (error) {
//                 console.error(error, values);
//                 toast.error('Failed to create post. Please try again!');
//                 setLoading(false)

//             }
//         };
    
//         const {
//             values,
//             errors,
//             touched,
//             handleBlur,
//             handleChange,
//             handleSubmit,
//             setFieldValue
//         } = useFormik({
//             initialValues: formData,
//             validationSchema: validationSchema,
//             onSubmit: (values, actions) => {
//                 createNewPost(values);
//                 actions.resetForm();
//             }
//         });



//     return (
//         <>
//             <div className='px-50 md:px-[200px] md:py-5' sx={{ bgcolor: "white"}}>
//                 <Typography variant="h4" className="pb-8 text-center">Create Job Post</Typography>
//                 <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    
//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="title"
//                         label="Post title"
//                         name="title"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Post title"
//                         value={values.title}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.title && Boolean(errors.title)}
//                         helperText={touched.title && errors.title}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="job_type"
//                         label="Job Type"
//                         name="job_type"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Job Type"
//                         value={values.job_type}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.job_type && Boolean(errors.job_type)}
//                         helperText={touched.job_type && errors.job_type}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="job_sector"
//                         label="Job Sector"
//                         name="job_sector"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Job Sector"
//                         value={values.job_sector}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.job_sector && Boolean(errors.job_sector)}
//                         helperText={touched.job_sector && errors.job_sector}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="work_location"
//                         label="Work Location"
//                         name="work_location"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Work Location"
//                         value={values.work_location}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.work_location && Boolean(errors.work_location)}
//                         helperText={touched.work_location && errors.work_location}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="experience_level"
//                         label="Experience"
//                         name="experience_level"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Experience"
//                         value={values.experience_level}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.experience_level && Boolean(errors.experience_level)}
//                         helperText={touched.experience_level && errors.experience_level}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="vacancies"
//                         label="Vacancy"
//                         name="vacancies"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Vacancy"
//                         value={values.vacancies}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.vacancies && Boolean(errors.vacancies)}
//                         helperText={touched.vacancies && errors.vacancies}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="salary"
//                         label="Salary"
//                         name="salary"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Salary"
//                         value={values.salary}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.salary && Boolean(errors.salary)}
//                         helperText={touched.salary && errors.salary}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         id="deadline"
//                         label="Deadline"
//                         name="deadline"
//                         required
//                         type="date"
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Deadline"
//                         value={values.deadline}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.deadline && Boolean(errors.deadline)}
//                         helperText={touched.deadline && errors.deadline}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         multiline
//                         minRows={3}
//                         id="description"
//                         label="Description"
//                         name="description"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Description"
//                         value={values.description}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.description && Boolean(errors.description)}
//                         helperText={touched.description && errors.description}
                        
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         multiline
//                         minRows={3}
//                         id="qualification"
//                         label="Qualification"
//                         name="qualification"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Qualification"
//                         value={values.qualification}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.qualification && Boolean(errors.qualification)}
//                         helperText={touched.qualification && errors.qualification}
//                     />

//                     <TextField sx={{ mb: 3 }}
//                         fullWidth
//                         multiline
//                         minRows={3}
//                         id="skills"
//                         label="Skills"
//                         name="skills"
//                         required
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         placeholder="Skills"
//                         value={values.skills}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.skills && Boolean(errors.skills)}
//                         helperText={touched.skills && errors.skills}
//                     />


//                 <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     elevation={0}
//                     sx={{mt:3, p:1,mb:2, boarderRadius: "25px",}}
//                     // disabled={loading}
//                  >
//                     {loading ? <CircularProgress /> : 'Create Post'}
//                  </Button>
//               </Box>
          
//           </div>
//         </>
//     );
       
    
// }
// export default CreateJob

