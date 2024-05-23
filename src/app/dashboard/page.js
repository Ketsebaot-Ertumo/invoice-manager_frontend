"use client";

import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Paper, Typography, gridClasses } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment/moment';
import Link from 'next/link';
import { Edit, Delete, Print, FileDownload, Menu } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Loader from '@/components/Loader';
import Sidebar from '@/components/Sidebar';
import withAuth from '@/utils/withAuth';




function Dashboard() {
    
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const url = process.env.NEXT_PUBLIC_API_URL;
    const [selectedRows, setSelectedRows] = useState([]);
    const [showIconOnly, setShowIconOnly] = useState(true);
 
    //show more 
    const handleMenuIconClick = (e) => {
        setShowIconOnly(!showIconOnly);
    };


    const handleRowSelectionChange = (newSelectionModel) => {
        setSelectedRows(newSelectionModel);
        // console.log('selection change', newSelectionModel);
    };

    const handleExportPDF = async () => {
        if (selectedRows.length > 0) {
            const selectedInvoices = invoices.filter(invoice => selectedRows.includes(invoice.invoice_number));

            const doc = new jsPDF();
            const title = 'Invoices Report';
            const date = moment().format('MMM DD, YYYY');
            const pageWidth = doc.internal.pageSize.getWidth();
            
            // Add the current date to the right
            doc.setFontSize(12);
            const dateWidth = doc.getTextWidth(`Date: ${date}`);
            doc.text(`Date: ${date}`, pageWidth - dateWidth - 10, 10);

            // Set font size for the title
            doc.setFontSize(20);

            // Calculate the width of the title text
            const titleWidth = doc.getTextWidth(title);

            // Position the title in the center
            const titleX = (pageWidth - titleWidth) / 2;
            doc.text(title, titleX, 20);

            const tableColumn = ["Invoice Number", "Item Number", "Total", "Expired Date", "Client Name", "Client Email", "Client Phone", "Client Company", "Created Date"];
            const tableRows = [];

            selectedInvoices.forEach(invoice => {
                const invoiceData = [
                    invoice.invoice_number,
                    invoice.item_number,
                    invoice.total,
                    invoice.exp_date,
                    invoice.client_name,
                    invoice.client_email,
                    invoice.client_phone,
                    invoice.client_company,
                    moment(invoice.created_at).format('MMM DD, YYYY')
                ];
                tableRows.push(invoiceData);
            });

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 30
            });
            doc.save('invoices.pdf');
        } else {
            toast.warning('No invoices selected for exporting.');
        }
    };

    const handleExportExcel = () => {
        if (selectedRows.length > 0) {
            const selectedInvoices = invoices.filter(invoice => selectedRows.includes(invoice.invoice_number));
            
            // Create a worksheet with the selected invoices data
            const worksheetData = selectedInvoices.map(invoice => ({
                'Invoice Number': invoice.invoice_number,
                'Item Number': invoice.item_number,
                'Total': invoice.total,
                'Expire Date': invoice.exp_date,
                'Client Name': invoice.client_name,
                'Client Email': invoice.client_email,
                'Client Phone': invoice.client_phone,
                'Client Company': invoice.client_company,
                'Created Date': moment(invoice.created_at).format('MMM DD, YYYY'),
            }));
    
            // Create a new worksheet and add title and date
            const worksheet = XLSX.utils.json_to_sheet([]);
            const title = 'Invoices Report';
            const date = moment().format('MMM DD, YYYY');
    
            // Adding the date at the top right corner
            XLSX.utils.sheet_add_aoa(worksheet, [[`Date: ${date}`]], { origin: 'H1' });

            // Adding the title at the center (adjust columns count as needed)
            XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: 'D2' });
            XLSX.utils.sheet_add_aoa(worksheet, [Object.keys(worksheetData[0])], { origin: 'A4' });
            XLSX.utils.sheet_add_json(worksheet, worksheetData, { skipHeader: true, origin: 'A5' });
            
    
            // Merge cells for the title and date
            worksheet['!merges'] = [
                { s: { r: 1, c: 3 }, e: { r: 1, c: 4 } }, // Merge title row across columns D to E (2 columns)
                { s: { r: 0, c: 7 }, e: { r: 0, c: 8 } }  // Merge date row across columns H to I (2 columns)
            ];
    
            // Create a new workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
    
            // Write the workbook and save it
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(data, 'invoices_report.xlsx');
        } else {
            toast.warning('No invoices selected for exporting.');
        }
    };

    
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


    //delete invoice for each one
    const deleteInvoice = async(e, invoice_number) => {
        if(window.confirm('Are you sure you want to delete this invoice')){
            try{
                const { data } = await axios.delete(`${url}/invoice/delete`, {
                    data: { invoice_numbers: invoice_number },
                  });
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


//delete for selected rows
const deleteInvoices = async (e, selectedInvoices) => {
  if (window.confirm('Are you sure you want to delete the selected invoices?')) {
    try {
      const { data } = await axios.delete(`${url}/invoice/delete`, {
        data: { invoice_numbers: selectedRows },
      });
      if (data.success === true) {
        toast.success(data.message);
        displayAll();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete invoices!');
    }
  }
};

    const columns =[
        {
            field: 'invoice_number',
            headerName: 'Invoice Number',
            width: 150,
            editable: true,
            renderCell: (params) => {
              const invoiceNumber = params.value.toString().padStart(8, '0');
              return invoiceNumber;
            }
        },          
        {
            field: 'item_number',
            headerName: 'Item Number',
            width: 150,
            renderCell: (params) => {
                const itemNumber = params.value.toString().padStart(4, '0');
                return itemNumber;
            }
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
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100px'}}>
                <Link href={`/invoice/edit/${value.row.invoice_number}`}>
                    <IconButton aria-label="edit">
                        <Edit sx={{color: '#1976d2'}} />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete" onClick={(e) => deleteInvoice(e, value.row.invoice_number)}>
                    <Delete sx={{color: 'red'}} />
                </IconButton>
                <IconButton aria-label="edit">
                    <Edit sx={{color: '#1976d2'}} />
                </IconButton>
            </Box>  
        )}
    ];


    return(
        <>
            <Box className='bg-white h-screen text-black font-inter pt-10'>

                <div className='flex justify-between p-5 pt-10 pb-2 w-full'>
                    <Typography variant="h4" className='text-black font-semibold pl-2'>
                        Invoice List
                    </Typography>
                    <Link href='/invoice/create'>
                        <Button disabled={loading} variant="contained" className="font-normal">
                            Create Invoice
                        </Button>
                    </Link>
                </div>
                <div className='flex gap-5 pl-4'>
                    <IconButton aria-label="more options" onClick={ handleMenuIconClick}>
                        <Menu />
                    </IconButton>
                    <div>
                        {selectedRows.length > 0 && (
                            <IconButton aria-label="print" onClick={handleExportPDF}>
                                <Print />
                            </IconButton>
                        )}
                        {selectedRows.length > 0 && (
                            <IconButton aria-label="Export" onClick={handleExportExcel}>
                                <FileDownload />
                            </IconButton>
                        )}
                        {selectedRows.length > 0 && (
                            <IconButton aria-label="delete" onClick={deleteInvoices}>
                                <Delete />
                            </IconButton>
                        )}
                    </div>
                </div>

                <div className='flex'>
               
                    <div className={`${showIconOnly ? 'w-[60px]' : ''} sm:hover:w-[220px]`}>
                        <Sidebar />
                    </div>

                    <Paper className='bg-white ml-4'>
                        <Box sx={{height: 400, width: '100%'}}>
                            {loading? <Loader />:(
                            <DataGrid 
                                getRowId={(row) => row.invoice_number} 
                                onCellClick={(params, event) => {
                                    if (params.field !== 'selection') {
                                        event.stopPropagation();
                                    }
                                }}
                                onRowSelectionModelChange={(newSelection) => handleRowSelectionChange(newSelection)}
                                selectionModel={selectedRows}
                                sx={{
                                    '& .MuiTablePagination-displayedRows': {
                                        color: 'black',
                                    },
                                    color: 'black',
                                    [`& .${gridClasses.row}`]:{bgcolor: 'white'},
                                }}
                                rows={invoices}
                                columns={columns}
                                checkboxSelection
                                pageSizeOptions={[5,25,50,75,100]}
                                />
                            )} 
                        </Box>
                    </Paper>
                </div>
            </Box>
        </>
    );
}

export default withAuth(Dashboard); // Wrap your component with the HOC

