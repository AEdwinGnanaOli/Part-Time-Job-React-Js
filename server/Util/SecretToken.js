const jwt= require('jsonwebtoken')

module.exports.createSceretToken=(id)=>{
    return jwt.sign({id},'jwt_secret_key',{
        expiresIn:'1d'
    })
}

