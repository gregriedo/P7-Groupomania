import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comment from '/Users/lhommesanscoeur/github/P7-Groupomania/frontend/src/pages/comment.js';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function RecipeReviewCard( {history} ) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  



  useEffect(() => {
    axios.get("http://localhost:3000/api/article/")
    .then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);
  
    const deletePost = () =>{
      if(user){
      axios.delete(`http://localhost:3000/api/article/${44}`,{
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authorization': 'Bearer ' + user.token,
        },
      })
      .then(() => {
        history.replace("/userBoard");
        window.location.reload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
       
      }
  }
  


  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => (
          <Card key={p.id}className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {p.username}
              </Avatar>
            }
            
            title={p.title}
            subheader={p.date_creation}
          />
          
          <CardContent>
            <Typography  color="textSecondary" component="p">
              {p.message}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <IconButton href="#/newComment" aria-label="reply">
              <ReplySharpIcon />
            </IconButton>
            <IconButton onClick={deletePost} aria-label="delete article">
              <DeleteIcon />
            </IconButton>
            
            
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
              
             

            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
           <Comment />
        </CardContent>
      </Collapse>
    </Card>
        ))}
      </div>
     
    </div>
    
  );
}
