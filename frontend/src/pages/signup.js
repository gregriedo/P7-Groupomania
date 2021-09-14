import React, {useState} from 'react';
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/styles/signup.css";
import axios from 'axios';


const CreateAccount = ({ history }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
    input: {
      display: "none",
    },
    button: {
      margin: theme.spacing(1),
    },
    
  }));
      const [values, setValues] = React.useState({
        showPassword: false,
      });
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
const classes = useStyles();
const [mail, setMail] = useState('');
const [password, setPassword] = useState('');
const [username, setUsername] = useState('');
const [isAdmin] = useState(false);



const signup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/signup", { 
        mail,
        password,
        username,
        isAdmin,
  
        
    })
    .then((response) => {
       console.log(response);
       history.replace("/login");
       alert("Votre Compte a bien été crée !")
       
    })
    .catch(function (error) {
      console.log(error);
    });
      
    
  }
      
        return (
            <form  className={classes.root} autoComplete="off">
            <div>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-mail">
                Adresse Mail
              </InputLabel>
             <Input
              id="mail"
              type="mail"
              placeholder=" Email"
              required pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}" 
              title="Ex: groupomania@gmail.com, ..."
              value={values.mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
             aria-describedby="standard-mail-helper-text"
              inputProps={{
                "aria-label": "mail",
             }}
             />
            </FormControl>
           <FormControl className={clsx(classes.margin, classes.textField)}> 
             <InputLabel htmlFor="standard-adornment-mail">
              Username
             </InputLabel>
            <Input
              id="username"
              type="text"
              placeholder=" Username"
              required pattern="[a-zâäàéèùêëîïôöçñA-Z\s]{3,30}" 
              title="Ex: SuperMario, Jo ..."
              value={values.username}
              onChange={(event) => {
                setUsername(event.target.value);
               }}
              aria-describedby="standard-mail-helper-text"
              inputProps={{
                 "aria-label": " Username",
              }}
            />
           </FormControl>
          <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="password"
            type={values.showPassword ? "text" : "password"}
            placeholder=" Password"
            required pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{3,25}" 
            title='Doit contenir min 1 chiffre'
            value={values.password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
         
          
          
            
        
        
    
        </FormControl>
      </div>
      <Button onClick={signup} type="submit" variant="contained" color="primary">
        Créer son compte
      </Button>
            </form>
        );
          
            

};

export default CreateAccount;