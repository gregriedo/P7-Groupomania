const Article = require('../models/articles.js');
const Comment = require('../models/comments.js');
const fs = require('fs');

exports.createArticle = (req, res) => {
    if (!req.file) {

    const article = new Article({
        title: req.body.title,
        message: req.body.message,
        user_id: req.body.user_id,
        image_article: ""

    })
    Article.create(article, (err, data) => {
        if (err)
            res.status(500).json({ message: "Article non créé !" })
        else res.send(data)
    })

    } else {
        const article = new Article({
        title: req.body.title,
        message: req.body.message,
        user_id: req.body.user_id 

    })
    Article.create(article, (err, data) => {
        if (err)
            res.status(500).json({ message: "Article non créé !" })
        else res.send(data)
    })
    }
}

exports.getOneArticle = (req, res, next) => {
  Article.findById(req.params.id, (err, article) => {
        if (err) {
            res.status(500).send({ message: "Aucun Article trouvé !" + err });
        }
        else {
            res.send(article)
          }
        })
  };

exports.modifyArticle = (req, res, next) => {
  const articleObject = req.file ?
    {
      ...JSON.parse(req.body.article),
      image_article: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Article modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteArticle = (req, res, next) => {
  Article.remove(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Article introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "Article introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'Article supprimé avec succès !' })
    })
}



exports.getAllArticle = (req, res, next) => {
  Article.getAllArticle((err, articles)=>{
    if(err){
      res.status(500).send({ message: "Aucun Article trouvé !" + err });
    }
     else{
       Comment.getAllComment((err, comments) => {
                if (err) {
                    res.status(500).send({ message: "Aucun commentaires trouvés !" + err });
                } else {
                    comments.forEach(comment => {
                        if (articles[0].article_id === comment.article_id) {
                            articles[0].comments.push(comment)
                        }
                    })
                }
                res.send(articles)
            })
     }
  })
};
