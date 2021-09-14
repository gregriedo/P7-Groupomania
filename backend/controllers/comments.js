const Comment = require('../models/comments.js');
const fs = require('fs');

exports.createNewComment = (req, res, next) => {
  if (req.body) {
      const comment = new Comment({
      comment: req.body.comment,
      user_id: req.body.user_id,
      article_id: req.body.article_id,
      date_comment: req.body.date_comment

  })
  Comment.createNewComment(comment, (err, data) => {
      if (err)
          res.status(500).json({ message: "Commentaire non créé !" })
      else res.send(data)
  })
  }
}

// RÉCUPÉRATION DE TOUS LES COMMENTAIRES

exports.getAllComment = (req, res, next) => {

    Comment.getAllComment((err, data) => {
        if (err)
            res.status(500).send({ message: "Commentaire non trouvé" + err });
        else res.send(data);
    });
};



exports.deleteComment = (req, res, next) => {

    Comment.deleteComment(req.params.id, (err, data) => {
        console.log(req.params.id);
        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Commentaire introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "commentaire introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'Commentaire supprimé avec succès !' })
    })
}
