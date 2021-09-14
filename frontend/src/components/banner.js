import React, { useEffect, useState } from 'react';
import { fade, makeStyles }  from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import '/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/styles/banner.css';
import { Button } from '@material-ui/core';
import {useHistory} from 'react-router-dom';


let user = localStorage.getItem('user');

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    link: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    
  }));

  export default function ButtonAppBar(props) {
    const classes = useStyles();
    const [islogin, setIslogin] = useState(false);

    const history = useHistory();
    
    
    const OnLogout = () => {
      window.localStorage.clear();
      history.push('/');
      window.location.reload(false);
    }
    
    useEffect(()=>{

      if(user){
        setIslogin(true);
        
      }
      
    }, [ islogin]);
    
    
      return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Groupomania
            </Typography>
           
              <Link className={classes.link} href="#/" color="inherit">Accueil</Link>
              
              {islogin ?(
                <Button onClick={OnLogout} color="inherit">Déconnexion</Button>
              ): (
                <>
                <Link className={classes.link} href="#/signup" color="inherit">Créer un Compte</Link>
                <Link href="#/login"  color="inherit">Se Connecter</Link>
                </>
              )}
              
          </Toolbar>
        </AppBar>
        </div>
    );
    
  };

