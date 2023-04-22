import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import './Login.css';

// TODO: Add HI3 Tech Logo
// TODO: On Enter trigger login button

const theme = createTheme({
  palette: {
    primary:{
       main: "#d3d3d3" 
    }
  }
})

type Props = {
  email: string;  // type is string
  setEmail: (val: string) => void;  // Type is function that expects string, returns void
  password: string;
  setPassword: (val: string) => void;
  handleLogin: () => void;
  // hasAccount: boolean;
  // setHasAccount: (val: boolean) => void;
  error: string;
};

const Login: React.FC<Props> = ({
    email, setEmail,
    password, setPassword,
    error, handleLogin,
    // hasAccount, setHasAccount
}) => {
    return (
    <>
      <div className="Login-header">
        Login
      </div>
      <div className="Login-input">
        {/* Email input */}
        <input
        type="email"
        autoFocus
        required
        value={email}
        placeholder='Email' 
        onChange={(e) => setEmail(e.target.value)} />
        {/* Password input */}
        <input
        type="password"
        required 
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)} />

        <p className="Login-error">{error}</p>

        <ThemeProvider theme={theme} >
            <Button variant="outlined" 
            color='primary' 
            size='large'
            onClick={handleLogin} >
            Login
            </Button>
        </ThemeProvider>
      </div>
    </>
    );
}

export default Login;