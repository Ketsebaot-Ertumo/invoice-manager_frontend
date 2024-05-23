"use client";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {  useParams, useRouter } from "next/navigation";
import { reset } from "../../../redux/actions/userAction";
import { Box, CircularProgress, IconButton, InputAdornment, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Footer from "@/components/Footer";

const validationSchema = yup.object({
  newPassword: yup
    .string("Enter your a new password")
    .min(8, "Password should be of minimum 8 chars length")
    .required("Password is required!"),
  confirmPassword: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 chars length")
    .required("Password is required!")
    .test("passwords-match", "Passwords do not match!", function (value) {
      return this.parent.newPassword === value;
    }),
});

const Reset = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { resetToken } = useParams() ;
  const { loading, isAuthenticated } = useSelector((state) => state.reset);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const formik = useFormik({
    initialValues: {
      resetToken: resetToken,
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(reset(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <Box
        className="bg-gray-200 h-screen flex text-black"
        sx={{ alignItems: "center", justifyContent: "center", bgcolor: "primary.white" }}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          className="form_style boarder-style"
        >
          <Box
            className="flex bg-white p-5"
            sx={{ flexDirection: "column", alignItems: "center", width: "100%" }}
          >
            <p className="text-xl font-semibold opacity-80 pb-5">Password Reset</p>

            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="newPassword"
              name="newPassword"
              label="New Password"
              type={showPassword ? "text" : "password"}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
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
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { borderColor: "rgb(231, 235, 240)" },
              }}
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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

            <Button
              disabled={loading}
              fullWidth
              variant="contained"
              type="submit"
              className="font-normal"
            >
              {loading ? <CircularProgress /> : "Reset"}
            </Button>

            <div className="pt-5 opacity-70 text-sm">Having issues with your link? Try and add <br />
              <a href="mailto:ertumoketsebaot@gmail.com" className="text-blue-500">PasswordReset@techethio.com</a>{" "}
              to your email contacts so the link <br /> doesn&apos;t end up in your spam.
            </div>
            <div className="pt-5 pr-12 opacity-70 text-sm">For more support, contact our Customer Support Team at <br />{" "}
              <a href="mailto:ertumoketsebaot@gmail.com" className="text-blue-500">help@gmail.com</a>
            </div>

          </Box>
        </Box>
      </Box>

      <Footer />

    </>
  );
};

export default Reset;
