import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Logo from '../assets/Logo.png';



export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} >
       <AppBar sx={{ backgroundColor: 'white' }}>
        <Toolbar>          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: "flex" }}
          >
            <img src={Logo} style={{width:"240px",height:"70px"}}></img>
           
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
           
            </IconButton>
            <Button color="primary">Login</Button>
            
            
            <Button color="primary">REGİSTER</Button>
         
           
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
         
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}