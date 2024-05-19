"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, InputAdornment, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import { useNavigate, useParams } from "react-router-dom";




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

const Edit = () => {
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { invoice_number } = router.query || {};
    const [data, setData] = useState({
        item_number: '',
        total: '',
        exp_date: '',
        client_name: '',
        client_email: '',
        client_phone: '',
        client_company: ''
    });
    const URL = process.env.NEXT_PUBLIC_API_URL;

    // Create a global Axios instance with the desired default configuration
    axios.defaults.withCredentials = true;


    //update invoice
    const updateInvoice = async (values) => {

        setLoading(true);
        try{
            const {data}= await axios.put(`${URL}/invoice/edit/${invoice_number}`, values);
            console.log(data.updatedInvoice)
            if (data.success === true){
                toast.success('Invoice updated successfully.');
                navigate('/dashboard')
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

    // Fetch invoice date
    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const { data } = await axios.get(`${URL}/invoice/show/${invoice_number}`);
                setUserData({
                    item_number: data.invoice.item_number,
                    total: data.invoice.total,
                    exp_date: data.invoice.exp_date,
                    client_name: data.invoice.client_name,
                    client_email: data.invoice.client_email,
                    client_phone: data.invoice.client_phone,
                    client_company: data.invoice.client_company
                });
                console.log('data',data.invoice)
            } catch (error) {
                console.log(error);
                toast.error(error);
            }
        };

        fetchInvoiceData();
    }, [invoice_number]);
      

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
            item_number: data.item_number,
            total: data.total,
            exp_date: data.exp_date,
            client_name: data.client_name,
            client_email: data.client_email,
            client_phone: data.client_phone,
            client_company: data.client_company
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            updateInvoice(updatedValues);
            actions.resetForm();
        }
    });

    return (
        <>
            <div className='bg-gray-200 px-50 md:px-[400px] md:py-10 text-black' sx={{ bgcolor: "white"}}>
                <Typography className="text-center" variant="h5" sx={{ p: 4 }}>Edit Invoice</Typography>
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
                    {loading ? <CircularProgress /> : 'Edit'}
                 </Button>
              </Box>
          
          </div>


            <div className="text-center sm:text-right text-black text-opacity-20 md:text-lg font-normal font-['Inter'] sm:mr-20 py-5 sm:py-10">
                <p>© <span>{new Date().getFullYear()}</span> TechEthio IT Solutions PLC. All rights reserved.</p>
            </div>
        </>
    );
           
}
export default Edit

