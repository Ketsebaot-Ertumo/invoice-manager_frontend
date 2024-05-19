import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, Typography, gridClasses } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment/moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../components/Loader';



export default function Dashboard() {
    
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const url = process.env.url;
    
    // Create a global Axios instance with the desired default configuration
    axios.defaults.withCredentials = true;
    
    //show all invoices
    const displayAll= async () => {
        setLoading(true);
        try{
            const { data } = await axios.get(`${url}/invoice/all`)
            setInvoices(data.invoices);
            setLoading(false);
        }catch(error){
            console.log(error);
            toast.error('Failed to fetch invoices!');
            setLoading(false);
        }
    }
    useEffect(() =>{
      displayAll();
    }, []);


    //delete invoice
    const deleteInvoice = async(e, invoice_number) => {
        if(window.confirm('Are you sure you want to delete this invoice')){
            try{
                const { data } = await axios.delete(`${url}/invoice/delete/${invoice_number}`);
                if(data.success === true){
                    toast.success(data.message);
                    displayAll();
                }else{
                    toast.error(data.message)
                    console.log(data.message)
                }
            }catch(error){
                console.log(error);
                toast.error('Failed to delete invoice!');
            }
        }
    };


    const columns =[
        {
            field: 'invoice_number',
            headerName: 'Invoice Number',
            width: 150,
            editable: true
        },
        {
            field: 'client_name',
            headerName: 'Client Name',
            width: 150
        },
        {
            field: 'client_email',
            headerName: 'Client Email',
            width: 150
        },
        {
            field: 'client_phone',
            headerName: 'Client Phone',
            width: 150
        },
        {
            field: 'client_company',
            headerName: 'Client Company',
            width: 150
        },
        {
          field: 'item_nmber',
          headerName: 'Item Number',
          width: 150
        },
        {
          field: 'total',
          headerName: 'Total',
          width: 150
        },
        {
          field: 'exp_date',
          headerName: 'Expire Date',
          width: 150
        },
        {
          field: 'createdAt',
          headerName: 'Created Date',
          width: 150,
          renderCell: (params) => (
              moment(params.row.createdAt).format('MMM DD, YYYY')
          )
        },
        {
        field: 'Actions',
        width: 100,
        renderCell: (value) => (
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '170px'}}>
                <Link to={`/invoice/edit/${value.row.invoice_number}`}>
                    <IconButton aria-label="edit">
                        <EditIcon sx={{color: '#1976d2'}} />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete" onClick={(e) => deleteInvoice(e, value.row.invoice_number)}>
                    <DeleteIcon sx={{color: "red"}} />
                </IconButton>
            </Box>  
        )}
    ];


    return(
        <>

            <Box className='bg-gray-200 h-screen text-black font-inter'>

                <div className='flex justify-between'>
                    <Typography variant="h4" sx={{color: 'black', pb: 3}}>
                        Invoices List
                    </Typography>
                    <Link to='/invoice/create'>
                        <Button className='rounded'>
                            Create Invoice
                        </Button> 
                    </Link>
                </div>
               
                <Paper sx={{bgcolor:'white'}}>
                    <Box sx={{height: 400, width: '100%'}}>
                        {loading? <Loader />:(
                        <DataGrid getRowId={(row) => row.invoice_number} 
                            sx={{
                                '& .MuiTablePagination-displayedRow': {
                                color: 'black',
                            },
                            color: 'black',
                            [
                                `& .${gridClasses.row}`]:{bgcolor: 'white'},
                            }}

                            rows={invoices}
                            columns={columns}
                            checkboxSelection
                            pageSizeOptions={[10,25,50,75,100]}
                            />
                        )}
                    </Box>
                </Paper>
            </Box>
        </>
    );
}

