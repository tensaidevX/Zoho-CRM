import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../assets/css/login.module.css";
import { validateEmail } from "../utils";
import { login } from "../api";
export default function Login(props) {
  let [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    let { email, password } = userDetails;

    if (!email || !password) {
      toast.error("Please enter valid details ");
      return;
    }

    if (validateEmail(userDetails.email)) {
      let response = await login(userDetails);
      if (response.success) {
        localStorage.setItem("token", response.data.data);
        toast.success("User Signed in Succesfully");
        window.location.href = "/dashboard";
      }
      if (response.message && response.message === "Incorrect Password") {
        toast.error("Incorrect Password");
      }

      if (response && response.message === "User not Found") {
        toast.error("User not found");
      }
    } else {
      toast.error("Please enter valid email");
      return;
    }
  }

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className={styles.loginWrapper}>
        <div className={styles.loginForm}>
          <div className={styles.inputField}>
            <TextField
              id='outlined-basic'
              label='Email'
              name='email'
              variant='outlined'
              value={userDetails.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <div className={styles.inputField}>
            <TextField
              type='password'
              name='password'
              id='outlined-basic'
              label='Password'
              variant='outlined'
              value={userDetails.password}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </div>
          <Button
            className={styles.loginBtn}
            variant='contained'
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </Button>
          <Button
            className={styles.loginBtn}
            variant='text'
            onClick={() => props.login()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
