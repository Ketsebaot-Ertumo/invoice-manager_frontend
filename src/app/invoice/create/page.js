"use client";

import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, MenuItem, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";
import Footer from "@/components/Footer";



const validationSchema = yup.object({
    item_number: yup
        .string('Add an item number!')
        .required('An item number is required!'),
    total: yup
        .string('Add total amount!')
        .required('total amount is required!'),
    exp_date: yup
        .string('Add expired date!')
        .required('Expired date is required!'),
    client_name: yup
        .string('Add a client name!')
        .required('Name is required!'),
    client_email: yup
        .string('Add a client email!'),
        // .required('Email is required!'),
    client_phone: yup
        .string('Add a client phone!'),
        // .required('Phone is required!'),
    client_company: yup
        .string('Add a client company name!')
        // .required('Company name is required!'),
});


const Create = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const URL = process.env.NEXT_PUBLIC_API_URL;

    // Create a global Axios instance with the desired default configuration
    axios.defaults.withCredentials = true;

    const [formData, setFormData] = useState({
        item_number: '',
        total: '',
        exp_date: '',
        client_name: '',
        client_email: '',
        client_phone: '',
        client_company: ''
      });

        const createNewInvoice = async (values) => {

            setLoading(true)
            try {
                const { data } = await axios.post(`${URL}/invoice/create`, values );
    
                if (data.success === true) {
                    toast.success('Invoice created successfully!');
                    router.push('/dashboard');
                }
                setLoading(false)
            } catch (error) {
                console.error(error, values);
                toast.error('Failed to create invoice. Please try again!');
                setLoading(false)

            }
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
            initialValues: formData,
            validationSchema: validationSchema,
            onSubmit: (values, actions) => {
                createNewInvoice(values);
                actions.resetForm();
            }
        });



    return (
        <>
            <div className='bg-gray-200 px-50 md:px-[400px] py-5 md:pt-10 text-black'>
                <Typography variant="h4" className="pb-8 text-center pt-5 md:pt-10">Create Invoice</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="item_number"
                        label="Item Number"
                        name="item_number"
                        type="number"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Item Number"
                        value={values.item_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.item_number && Boolean(errors.item_number)}
                        helperText={touched.item_number && errors.item_number}
                    />

                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="total"
                        label="Total Amount"
                        name="total"
                        type="number"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Total Amount"
                        value={values.total}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.total && Boolean(errors.total)}
                        helperText={touched.total && errors.total}
                    />

                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="exp_date"
                        label="Expired Date"
                        name="exp_date"
                        type="date"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Expired Date"
                        value={values.exp_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.exp_date && Boolean(errors.exp_date)}
                        helperText={touched.exp_date && errors.exp_date}
                    />

                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="client_name"
                        label="Client Name"
                        name="client_name"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Client Name"
                        value={values.client_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.client_name && Boolean(errors.client_name)}
                        helperText={touched.client_name && errors.client_name}
                    />

                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="client_email"
                        label="Client Email"
                        name="client_email"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Client Email"
                        value={values.client_email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.client_email && Boolean(errors.client_email)}
                        helperText={touched.client_email && errors.client_email}
                    />

                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="client_phone"
                        label="Client PHone"
                        name="client_phone"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Client Phone"
                        value={values.client_phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.client_phone && Boolean(errors.client_phone)}
                        helperText={touched.client_phone && errors.client_phone}
                    />

                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="client_company"
                        label="Client Company Name"
                        name="client_company"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Client Company Name"
                        value={values.client_company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.client_company && Boolean(errors.client_company)}
                        helperText={touched.client_company && errors.client_company}
                    />


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    elevation={0}
                    sx={{mt:3, p:1,mb:2, boarderRadius: "25px",}}
                    disabled={loading}
                 >
                    {loading ? <CircularProgress /> : 'Create Invoice'}
                 </Button>
              </Box>
          
          </div>

          <Footer />
          
        </>
    );
       
    
}

export default withAuth(Create); // Wrap your component with the HOC

