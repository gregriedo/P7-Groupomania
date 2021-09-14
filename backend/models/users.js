const sql = require('../connexion.js');

const User = function(user) {
  this.id = user.id,
  this.mail = user.mail,
  this.password = user.password,
  this.username = user.username,
  this.isAdmin = user.isAdmin
};
    
//Création d'un Utilisateur

User.create = (newUser, result) => {
    sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création de l'utilisateur : ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

// Récupération d'un utilisateur en fonction de son ID

User.findById = (id, result) => {
    sql.query(`SELECT * FROM User WHERE id ='${id}'`, (err, res) => {

      if (err) throw err;
      if(res.length){
        result(null, res[0]);
      }
  console.log("Utilisateur trouvé:", res);
    });
};


// Récupération d'un utilisateur en fonction de son mail

User.findOne = (mail, result) => {
    sql.query(`SELECT * FROM User WHERE mail ='${mail}'`, function(err, res,){
      if (err) throw err;
      if(res.length){
        result(null, res[0]);
      }

});
};

// Récupération de tous les utilisateurs

User.getAllUsers = result => {
  sql.query("SELECT * FROM User", function(err, res){
    if (err) throw err;
    if(res.length){
      result(null, res);
    }
});
  };



//Suppression d'un utilisateur en fonction de son id

User.deleteUser = (id, result) => {
    sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
      if (err) throw err;
      if(res.affectedRows == 0){
        result(null);
      }
      result(null, res);
});
};

module.exports = User;
