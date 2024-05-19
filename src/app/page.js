
"use client";

import { useEffect, useState } from 'react';
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { userSignUpAction } from "../redux/actions/userAction";
import { Avatar, Box, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from 'next/link';

const validationSchema = yup.object({
  fullName: yup
    .string('Enter your full name')
    .max(20, "Name can't exceed 20 characters")
    .min(4, "Name can't be less than 4 characters")
    .required("Name is required!"),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required!'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 chars length')
    .required('Password is required!'),
});


export default function Signup() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, isAuthenticated, userSignUp } = useSelector(state => state.signUp);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/confirm`);
    }
  }, [isAuthenticated]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignUpAction(values));
      actions.resetForm();
    }
  });

  return (
    <>
      <Box className='bg-gray-200 h-screen flex' sx={{ alignItems: "center", justifyContent: "center" }}>
        <Box onSubmit={formik.handleSubmit} component="form" className="form_style boarder-style">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}} className="p-5 bg-white rounded">
            <Avatar sx={{ m: 1, bgcolor: "#4CAF50", mb: 3 }}>
              <LockClockOutlined />
            </Avatar>
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": { color: 'text.secondary'},
                fieldset: { boarderColor: "rgb(231, 215, 240)" }
              }}
              fullWidth
              id="email"
              label="Email"
              name='email'
              InputLabelProps={{ shrink: true }}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": { color: 'text.secondary' },
                fieldset: { boarderColor: "rgb(231, 235, 240)" }
              }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": { color: 'text.secondary' },
                fieldset: { boarderColor: "rgb(231, 235, 240)" }
              }}
              fullWidth
              id="fullName"
              name="fullName"
              label='Full Name'
              type="name"
              InputLabelProps={{ shrink: true }}
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <Button disabled={loading} fullWidth variant="contained" type="submit" className='bg-green-600 hover:bg-green-500'>
              {loading ? <CircularProgress /> : 'Sign Up'}
            </Button>
            <div className="flex justify-between gap-10 pt-2 text-green-600">
              <Link href='/password/forgot'><p>Forgot Password?</p></Link>
              <Link href='/signin' style={{ textDecoration: 'none' }} className="text-center">Already have an Account?</Link>
            </div>
          </Box>
        </Box>
      </Box>
      <div className="text-center sm:text-right text-black text-opacity-20 md:text-lg font-normal font-['Inter'] sm:mr-20 py-5 sm:py-10">
        <p>© <span>{new Date().getFullYear()}</span> Lepton Games. All rights reserved.</p>
      </div>
    </>
  );
}


