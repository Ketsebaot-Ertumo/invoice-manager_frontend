"use client";

import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { confirmEmail } from "../../redux/actions/userAction";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";

const validationSchema = yup.object({
  confirmationCode: yup
    .string("Enter six digit code.")
    .min(6, "Code should be of 6 digit!")
    .max(6, "Code should be of 6 digit!")
    .required("Code is required"),
});

const Confirmation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, isAuthenticated, userinfo } = useSelector(
    (state) => state.forgot
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (userinfo.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  }, [isAuthenticated, router, userinfo]);

  const formik = useFormik({
    initialValues: {
      confirmationCode: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(confirmEmail(values));
      actions.resetForm();
    },
  });

  return (
    <>

      <Box className='bg-gray-200 h-screen flex text-black' sx={{ alignItems: "center", justifyContent: "center", }}>
        <Box onSubmit={formik.handleSubmit} component="form" className="form_style boarder-style" >
          <Box className='flex bg-white p-5 rounded' sx={{ flexDirection: "column", alignItems: "center", width: "100%" }}>
            <p className="text-xl font-semibold text-black opacity-80">Confirm Your Email</p>
            <p className="opacity-70 pb-8 pt-[5px] text-black text-center">Please enter a six digit code from your email.</p>
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: 'text.secondary'
                },
                fieldset: { boarderColor: "rgb(231, 215, 240)" }
              }}
              fullWidth
              id="confirmationCode"
              label="Confirmation Code"
              name='confirmationCode'
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Confirmation Code"
              value={formik.values.confirmationCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmationCode && Boolean(formik.errors.confirmationCode)}
              helperText={formik.touched.confirmationCode && formik.errors.confirmationCode}
            />

            <Button className="font-normal" disabled={loading} fullWidth variant="contained" type="submit">{loading ? <CircularProgress /> : "Confirm Email"}</Button>

            <div className="flex justify-between gap-10 sm:gap-20 pt-2 text-blue-500">
              <Link href='/password/register'><p>New Account?</p></Link>
              <Link href='/login' style={{ textDecoration: 'none' }} className="text-center">Already have an Account?</Link>
            </div>

            <div className="pt-5 opacity-70 text-sm">Having issues with your link? Try and add <br />
              <a href="mailto:ertumoketsebaot@gmail.com" className="text-blue-500">PasswordReset@techethio.com</a>
              to your email contacts so the link <br /> doesn't end up in your spam.
            </div>
            <div className="pt-5 pr-12 opacity-70 text-sm">For more support, contact our Customer Support Team at <br />{" "}
              <a href="mailto:ertumoketsebaot@gmail.com" className="text-blue-500">help@gmail.com</a>
            </div>

          </Box>
        </Box>
      </Box>

      <div className="text-center sm:text-right text-black text-opacity-20 md:text-lg font-normal font-['Inter'] sm:mr-20 py-5 sm:py-10">
        <p>© <span>{new Date().getFullYear()}</span> Lepton Games. All rights reserved.</p>
      </div>
    </>
  );
};

export default Confirmation;