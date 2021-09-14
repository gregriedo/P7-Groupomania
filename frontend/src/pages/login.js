import React, { useState } from "react";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import "/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/styles/login.css";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";

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
}));

const ConnectForm = ({history}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");


  

  const login = (e) => {

      e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/login", {
        mail: mail,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        history.push("/userBoard");
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
  

  return (
    <form onSubmit={login} className={classes.root} autoComplete="off">
      <div>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-mail">
            Adresse Mail
          </InputLabel>
          <Input
            id="mail"
            type="mail"
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
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="password"
            required pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{3,25}" 
            title='Doit contenir min 1 chiffre'
            type={values.showPassword ? "text" : "password"}
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
      <Button type="submit" variant="contained" color="primary">
        Se Connecter
      </Button>
    </form>
  );
};

export default ConnectForm;
