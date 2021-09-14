const sql = require('../connexion.js');

const Comment = function(comment) {
  this.id = comment.id,
  this.comment = comment.comment,
  this.user_id = comment.user_id,
  this.article_id = comment.article_id,
  this.date_comment = comment.date
};


// Création d'un commentaire

Comment.createNewComment = (newComment, result) => {
    sql.query(`INSERT INTO Comment (comment, article_id, user_id, date_comment) VALUES ("${newComment.comment}","${newComment.article_id}","${newComment.user_id}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du commentaire : ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

// Récupération de tous les commentaires

Comment.getAllComment = result => {
    sql.query(`SELECT comment.id, comment.article_id, comment.comment, comment.date_comment, comment.user_id, user.username FROM Comment INNER JOIN User ON comment.user_id = user.id ORDER BY date_comment DESC`, (err, res) => {
      if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let comments = [];
        comments = res.map(element => {
            let content = new Comment(element)
            content.author = {
                username: element.username,
            }
            return comments;
        })
        result(null, res);
    });
};

// Suppression d'un commentaire en fonction de son ID

Comment.deleteComment = (id, result) => {
    sql.query("DELETE FROM Comment WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Suppression du commentaire avec l'id: ", id);
        result(null, res);
    });
};


module.exports = Comment;
