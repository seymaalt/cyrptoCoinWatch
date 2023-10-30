import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')


    const validationErrors = {}
    if (!name.trim()) {
      validationErrors.username = "username is required"
    }

    if (!email.trim()) {
      validationErrors.email = "email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "email is not valid"
    }

    if (!password.trim()) {
      validationErrors.password = "password is required"
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])/.test(password)) {
      validationErrors.password = "Bir büyük bir küçük harf içermeli"
    } else if (!/^(?=.*\d)/.test(password)) {
      validationErrors.password = "Sayi içermeli"
    } else if (!/^(?=.*[.,;@$!%*?&])/.test(password)) {
      validationErrors.password = "özel karaktere içermeli"
    } else if (!/^.{8,12}$/.test(password)) {
      validationErrors.password = "8-12 karakter içermeli"
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const name = formData.name
      const email = formData.email
      const password = formData.password
      //alert("Form Submitted successfully")



      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });

      axios.post('http://localhost:3001/register', { name, email, password })
        .then(result => {
          console.log(result)
          if (result.data == "Bu Email Zaten Mevcut!!!") {
            alert("Bu Email Zaten Mevcut!!!")
          }else{
            alert("Form Submitted successfully")
          }
          //navigate('/login')
        })
        .catch(err => console.log(err))

        
    }
  };



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    id="Name"
                    onChange={handleChange}
                    name = "name"
                    type="text"
                    label="Password"
                  />
                </FormControl>
                {errors.username && <span>{errors.username}</span>}
              </Grid>

              <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Email
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    type="text"
                    name = "email"
                    label="email"
                  />
                </FormControl>
                {errors.email && <span>{errors.email}</span>}
              </Grid>
              <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    onChange={handleChange}
                    id="outlined-adornment-password"
                    name = "password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {errors.password && <span>{errors.password}</span>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}