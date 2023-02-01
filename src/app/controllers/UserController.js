const User = require("../models/User")
const Task = require("../models/Task")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const tokenSecret = "hbwdbhnawdjnkwadnojiawndjmkold5+261w156gf1546g156rs1e56s156e"

module.exports = {
    async create(req, res){
        const { email, password } = req.body

        const hash = await bcrypt.hash(password, 10)

        const findUser = await User.findOne({where: {email}})

        if(findUser != undefined){
            res.status(406).json({err: 'Usuario já cadastrado com esse email'})
        }else{
            const user = await User.create({
            email: email,  
            password: hash,
            })
            return res.status(201).json({msg: 'Usuario criado com sucesso'})
        }

    },

    async login (req, res){
        const {email, password} = req.body

        const user = await User.findOne({where: {email}})

        if(user != undefined){
            const verifyPassword = await bcrypt.compare(password, user.password)
            if(verifyPassword){
                const token = jwt.sign({email: user.email, role: user.role}, tokenSecret ,{expiresIn: '24h'})
                res.status(200).json({token: token})
            }else{
                res.status(406).json({err: "Senha Incorreta"})
            }
        }else{
            return res.status(404).json({err: "Usuario não cadastrado"})
        }
    },

    async tasksByUser (req, res){
        const id = req.params.id

        const user = await User.findOne({where:{id}})

        if(user != undefined){
            const tasks = await Task.findAll({
                attributes: ['id','task', 'status', 'userId'],
                include: [
                    {model: User, where: {id: id}, attributes: {exclude: ["password", "createdAt", "updatedAt"]}}
                ]
            })

            return res.status(200).json(tasks)
        }else{
            return res.status(404).json({err: "Usuario não cadastrado"})
        }
    }
}