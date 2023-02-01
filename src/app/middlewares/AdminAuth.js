const jwt = require("jsonwebtoken")

function AdminAuth (req, res, next){
    const tokenSecret = "hbwdbhnawdjnkwadnojiawndjmkold5+261w156gf1546g156rs1e56s156e"
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        const token = bearer[1]
        
        try{
            const information = jwt.verify(token, tokenSecret)
            if(information.role == 1){
                next()
            }else{
                return res.status(403).json({msg: "Você não tem permissão para acessar essa rota!"})
            }
            
        }catch(err){
            return res.status(403).json({msg: "Você não está autorizado!!"})
        }    
    }else{
        return res.status(403).json({msg: "Você não está autorizado!"})
    }
}

module.exports = AdminAuth