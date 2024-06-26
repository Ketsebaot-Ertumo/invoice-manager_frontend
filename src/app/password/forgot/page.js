"use client";

import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { forgot } from "../../../redux/actions/userAction";
import { Box, CircularProgress } from "@mui/material";
import Footer from "@/components/Footer";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required!"),
});

const Forgot = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, isAuthenticated, user } = useSelector((state) => state.forgot);

  useEffect(() => {
    if (isAuthenticated) {
        router.push(`/password/reset/${user.resetToken}`);
    }
  }, [isAuthenticated, user]);


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(forgot(values));
      actions.resetForm();
    },
  });

  return (
    <>
      <Box
        className="bg-gray-200 h-screen flex text-black"
        sx={{ alignItems: "center", justifyContent: "center", bgcolor: "primary.white" }}
      >
        <Box onSubmit={formik.handleSubmit} component="form" className="form_style boarder-style">
          <Box
            className="flex bg-white p-5 rounded"
            sx={{ flexDirection: "column", alignItems: "center", width: "100%" }}
          >
            <p className="text-xl font-semibold opacity-80">Forgot your password?</p>
            <p className="opacity-70 pb-8 pt-[5px]">No worries, just enter your email below.</p>
            <TextField
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "text.secondary",
                },
                fieldset: { boarderColor: "rgb(231, 215, 240)" },
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

            <Button
              className="font-normal"
              disabled={loading}
              fullWidth
              variant="contained"
              type="submit"
            >
              {loading ? <CircularProgress /> : "Reset Password"}
            </Button>

            <div className="pt-5 opacity-70 text-sm">Having issues with your link? Try and add <br />
              <a href="mailto:ertumoketsebaot@gmail.com" className="text-blue-500">PasswordReset@techethio.com</a>{" "}
              to your email contacts so the link <br /> doesn't end up in your spam.
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

export default Forgot;