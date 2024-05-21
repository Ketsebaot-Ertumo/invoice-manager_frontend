"use client";

import React, { useEffect, useState } from "react";
import LockClockOutlined from "@mui/icons-material/LockClockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { userSignInAction } from "../../redux/actions/userAction";
import { Avatar, Box, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required!"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 chars length")
    .required("Password is required!"),
});

const LogIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, isAuthenticated, userInfo } = useSelector(state => state.signIn);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role === "admin") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, userInfo, router]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignInAction(values));
      actions.resetForm();
    }
  });

  return (
    <>
      <Box className="bg-gray-200 h-screen flex" sx={{ alignItems: "center", justifyContent: "center" }}>
        <Box component="form" onSubmit={formik.handleSubmit} className="form_style boarder-style">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%",}} className="p-5 bg-white rounded">
            <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
              <LockClockOutlined />
            </Avatar>
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary"
                },
                fieldset: { boarderColor: "rgb(231, 215, 240)" }
              }}
              fullWidth
              id="email"
              label="Email"
              name="email"
              InputLabelProps={{
                shrink: true,
              }}
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
                "& .MuiInputBase-root": {
                  color: "text.secondary"
                },
                fieldset: { boarderColor: "rgb(231, 235, 240)" }
              }}
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputLabelProps={{
                shrink: true,
              }}
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

            <Button disabled={loading} fullWidth variant="contained" type="submit">{loading ? <CircularProgress /> : "Log In"}</Button>
            <div className="flex justify-between gap-10 pt-2 text-blue-500">
              <Link href="/password/forgot" style={{ textDecoration: "none" }}><p>Forgot Password?</p></Link>
              <Link href="/" style={{ textDecoration: "none" }} className="text-center">Don&apos;t have an Account?</Link>
            </div>
          </Box>
        </Box>
      </Box>

      <div className="bg-gray-200 text-center sm:text-right text-black text-opacity-20 md:text-lg font-normal font-['Inter'] sm:pr-20 py-5 sm:py-10">
        <p>© <span>{new Date().getFullYear()}</span> Lepton Games. All rights reserved.</p>
      </div>
    </>
  );
};

export default LogIn;