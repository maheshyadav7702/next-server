import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import TitleComp from "../titleComp";
import Controls from "@/components/users/controls/controls";
import { Form, useForm } from "@/components/users/useForm";
import axios from "axios";
import SuccessAlertMessage from "../users/successAlertMessage";

const initialFValues = {
  email: "",
  password: "",
};

const LoginComp: React.FC = () => {
  const [isAlert, setIsAlert] = useState(false);

  const alertCloseHandle = (value: boolean) => {
    setIsAlert(value);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("email" in fieldValues) {
      const emailText = fieldValues.email;
      if (emailText) {
        if (
          /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
            fieldValues.email
          )
        ) {
          temp.email = "";
        } else {
          temp.email = "Email is not valid.";
        }
      } else {
        temp.email = "Email is required";
      }
    }

    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "Password is required";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    axios
      .post("http://localhost:8000/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setIsAlert(true);
        console.log(res.data);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        setIsAlert(true);
      });
  };

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ backgroundColor: "skyblue" }}
      >
        <Grid
          boxShadow="2px 10px 20px 10px grey"
          padding={3}
          borderRadius={2}
          width="35%"
          sx={{ backgroundColor: "white" }}
        >
          <TitleComp name="login" desc="login" />
          <Form onSubmit={handleSubmit}>
            <Grid item xs={12} md={12} container mt={3} height={70}>
              <Controls.Input
                name="email"
                label="Email*"
                value={values.email}
                onChange={handleInputChange}
                placeholderText="Enter"
                error={errors?.email}
              />
            </Grid>
            <Grid item xs={12} md={12} container mt={3} height={70}>
              <Controls.Input
                name="password"
                label="Password*"
                value={values.password}
                onChange={handleInputChange}
                placeholderText="Enter"
                error={errors?.password}
              />
            </Grid>
            <Grid mt={3}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Form>
          <Grid display="flex" justifyContent="space-between" mt={3}>
            <Grid>
              <Button>New user?</Button>
            </Grid>
            <Grid>
              <Button> Forgot password?</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isAlert && (
        <Grid
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "10%",
            left: "50%",
          }}
        >
          <SuccessAlertMessage
            isAlert={isAlert}
            alertCloseHandle={alertCloseHandle}
          />
        </Grid>
      )}
    </>
  );
};

export default LoginComp;
