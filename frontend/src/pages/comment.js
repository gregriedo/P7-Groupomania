import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  
  pos: {
    marginBottom: 12,
  },
});

export default function Comment( {history}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [comments, setComments] = useState([]);
  

  useEffect(() =>{
    const res = axios
    .get('http://localhost:3000/api/comment');
    res.then((data)=>{
      setComments(data.data);
    })
  }, []);

  const deleteComment = (e) =>{
    e.preventDefault();
    axios.delete(`http://localhost:3000/api/comment/`)
    .then((response) => {
      history.push("/userBoard");
      window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
     
    }

 

  
  return (
    <div className="comment">
      <div className="commentWrapper">
      {comments.map((c) => (
        <Card key={c.id}className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {c.username}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {c.date_creation}
          </Typography>
          <Typography variant="body2" component="p">
            <br />
            {c.comment}
          </Typography>
        </CardContent>
        <CardActions>
        <IconButton href="#/newComment" aria-label="reply">
              <ReplySharpIcon />
            </IconButton>
            <IconButton onClick={deleteComment} aria-label="delete comment">
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
      </Card>

    ))}
      </div>
      
    </div>
    
  );
}
