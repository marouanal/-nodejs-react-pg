import React, { useState } from 'react'
import { Grid,  Paper, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import background from './background.jpg'
import brandname from './brandname.jpg'
import facebook from './facebook.jpeg'
import twitter from './twitter.jpeg'
import instagram from './instagram.jpeg'
import axios from 'axios'
//import { useHistory } from 'react-router'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },
    container: {
        height: '60%',
        marginTop: theme.spacing(10),
        backgroundColor: 'black', // Add black background color
        [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
            marginTop: 0,
            width: '100%',
            height: '100%'
        },
        [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
            marginTop: 0,
            width: '100%',
            height: '100%'
        }

    },
    div: {
        marginTop: theme.spacing(11),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '25%',
        margin: '0 auto',
    },
    
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        
    },
    button: {
        
        borderRadius: '25px',
        backgroundColor: '#1ABBAF',
        color: 'white',
        '&:hover': {
          backgroundColor: '#089B90',
        },
        marginTop : theme.spacing(1),
        margin:theme.spacing(6) ,
        left : 40
      },
      
   
      
}))


function Forget() {
  const [error] = useState('') ;
  const setMessage = useState("");
  const [body, setBody] = useState({
    email: "",
    favsport: "",
    password: "",
  });


  const inputChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

 

  const onSubmit = () => {
    axios
      .patch("http://localhost:4000/api/forget", body)
      .then((res) => {
        if (res.data === "User not found or incorrect favsport") {
          setMessage(res.data);
        } else {
          setMessage("Password updated successfully");
        }
      })
      .catch((err) => setMessage(err.response.data));
    }

  const classes = useStyles();
  
  return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={6} className={classes.left}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , color : 'white' , }}>
  <div className={`${classes.textContainer} center`}>
    <Typography component="h1" variant="h2" className={classes.text} style={{ fontSize: '3rem' }} >
      Welcome
    </Typography>
    <Typography variant="h5" className={classes.text} style={{ fontSize: '1.2rem' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada
      tincidunt mauris, in vestibulum odio viverra in.
    </Typography>
    <Typography component="h1" variant="h5" style={{ position: 'absolute', bottom: '0', left: '0', display: 'flex', alignItems: 'flex-end', marginLeft: '450px' , marginBottom: '100px' }} >
            <img src={facebook} alt="my" style={{ width: '20px', marginRight: '5px' }} />
            
            <img src={instagram} alt="my" style={{ width: '20px', marginRight: '5px' }} />
            <img src={twitter} alt="my" style={{ width: '20px' }}/>
              </Typography>
  </div>
</Grid>
          <Grid item xs={10} sm={6} component={Paper} elevation={5} square style={{  backgroundColor: '#171717', }}>
            <div className={classes.div} >
            <a style={{ display: 'block', textAlign: 'right', fontSize: '20px', marginTop: '20px', position: 'absolute' , color : 'grey', top: 0, right: 0 }} href="/register">Sign Up</a>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br><br></br>
              <br></br>
              <Typography component="h1" variant="h5"style={{ marginLeft: '45px' }} >
            <img src={brandname} alt="my" />
              </Typography>
              <form className={classes.form}>
               
                <TextField
                  InputProps={{
                    style: { backgroundColor: 'black', color: '#666666' , width: '300px' }
                  }}
                  autoFocus
                  color="primary"
                  margin="normal"
                  variant="outlined"
                  label="Adresse Email"
                  value={body.email}
                  onChange={inputChange}
                  name="email"
                />
                <br></br>
                <TextField
                  InputProps={{
                    style: { backgroundColor: 'black', color: '#666666' , width: '300px' }
                  }}
                  autoFocus
                  color="primary"
                  margin="normal"
                  variant="outlined"
                  label="Favorit Sport?"
                  value={body.favsport}
                  onChange={inputChange}
                  name="favsport"
                />
                <br></br>
                <TextField
                  InputProps={{
                    style: { backgroundColor: 'black', color: '#666666' , width: '300px'  }
                  }}
                  type="password"
                  color="primary"
                  margin="normal"
                  variant="outlined"
                  label="Password"
                  value={body.password}
                  onChange={inputChange}
                  name="password"
                />
                <a  style={{display: 'block' , fontSize: '10px',marginTop: '20px' , color : 'grey',  textDecoration: 'none' }} href="/forget" > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mot de pass oublié</a>
                <br></br>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={onSubmit}
                >
                  Se Connecter
                </Button>
                {error && (
                  <Typography
                    variant="body1"
                    color="error"
                    align="center"
                    style={{ fontSize: '1.2rem', marginTop: '1rem' }}
                  >
                    {error}
                  </Typography>
                )}
                
              </form>
              
            </div>
          </Grid>
        </Grid>
      )
    }
    
  
  export default Forget
  
