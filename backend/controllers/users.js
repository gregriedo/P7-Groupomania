const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// CRÉATION D'UN UTILISATEUR
exports.signup = (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: "Erreur !" })
    }
    //Hashage du MDP
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
          let admin = "USER";
          if (req.body.isAdmin) {
              admin = req.body.isAdmin;
          }
            const user = new User({
                mail: req.body.mail,
                password: hash,
                username: req.body.username,
                isAdmin : req.body.isAdmin
            })

            User.create(user, (err, data) => {
                if (err)
                    res.status(500).json({ message: "Utilisateur non crée !" + err })
                else res.send(data);
            })

        }).catch(err => res.status(500).json({ message: "Il y a une erreur :" + err }))

}
//Vérification de la validité des identifiants
exports.login = (req, res) => {
    User.findOne(req.body.mail, (err, user) => {
        if (err) {
            res.status(400).json({ message: err })
        }
        else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: "Mot de passe incorrect !" })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id }, 'SECRET_TOKEN', {
                            expiresIn: '6h'
                        })
                    })
                })
        }
    }
    )
}


exports.findOneUser = (req, res, next) => {
  User.findById(req.params.id, (err, user)=>{

    if(user){
        res.status(200).json(user);
      }
    if(err){
        res.status(404).json({
          error: error
        });
      }

  });

};

exports.deleteUser = (req, res, next) => {
  User.deleteUser(req.params.id, (err,data)=>{
    if(err){
     res.status(500).json({ error });
   }
   else{
     res.json({message:"Utilisateur supprimé avec succès !"})
   }

 })
}



exports.getAllUsers = (req, res, next) => {
  User.getAllUsers((err, data) => {
    if (err)
    res.status(404).json({
      error: error
      });
    else res.send(data);
  });
};
