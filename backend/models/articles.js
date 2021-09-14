const sql = require('../connexion.js');

const Article = function(article) {
  this.id = article.id,
  this.title = article.title,
  this.message = article.message,
  this.user_id = article.user_id,
  this.date_creation = article.date

};

//Création d'un article

Article.create = (newArticle, result) => {
    sql.query(`INSERT INTO Article (title, message,  user_id, date_creation) VALUES ('${newArticle.title}','${newArticle.message}','${newArticle.user_id}', Now()) `, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        else{
          console.log("Création de l'article : ", { id: res.insertId, ...newArticle});
          result(null, { id: res.insertId, ...newArticle });
        }

    });
};

//Récupération de tous les articles
Article.getAllArticle = result => {
    sql.query(`SELECT article.id, article.title, article.message, article.date_creation, article.user_id, user.username FROM Article INNER JOIN User ON article.user_id = user.id ORDER BY date_creation DESC`, (err, res) => {
        if (!res.length) {
            console.log("erreur: ", err);
            result(null, "Aucun Article trouvé :( ");

        }
        if(res.length){
          result(null, res);
        }

    });
};


// Récupération d'un article en fonction de son ID

Article.findById = (articleId, result) => {
    sql.query(`SELECT * FROM Article WHERE id = ${articleId} ORDER BY date_creation DESC`,
        (err, res) => {
            if (err) {
                console.log("erreur: ", err);
                result(err, null);
                return;
            }
            else {
                console.log("Article trouvé ! : ", res);
                result(null, res);
                return;
            }
        })
};

// Supression d'un article

Article.remove = (id, result) => {
    sql.query("DELETE FROM Article WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Non trouvé !" }, null);
            return;
        }
        console.log("Suppression de l'Article avec l'id : ", id);
        result(null, res);
    });
};


module.exports = Article;
