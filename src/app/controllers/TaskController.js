const Task = require("../models/Task")
const User = require('../models/User')

module.exports = {
    async create (req, res){
        const { task, id } = req.body

        if(task == undefined || task == "" || task == " "){
            return res.status(406).json({err: "Taks Invalida"})
        }

        const user = await User.findOne({where:{id}})

        if(user == null){
            return res.status(404).json({err: 'Usuario não encontrado'})
        }

        const newTask = await Task.create({task: task, userId: id})

        res.status(201).json(newTask)
    },

    async edit (req, res) {
        const id = req.params.id

        const { task }= req.body

        const findTask = await Task.findOne({where: {id}})

        if(findTask == null || findTask == undefined){
            return res.status(404).json({err: "Usuario não encontrado"})
        }

        if(task == undefined || task == "" || task == " "){
            return res.status(406).json({err: "Taks Invalida"})
        }

        await Task.update({task}, {
            where: {
                id: findTask.id
            }
        })

        res.status(200).json({msg: "Mensagem alterada com sucesso"})
    },

    async destroy(req,res){
        const id = req.params.id

        const task = await Task.findOne({where: {id}})

        if(task == null || task == undefined){
            return res.status(404).json({err: "Usuario não encontrado"})
        }

        await Task.destroy({where: {id}})

        res.status(200).json({msg: 'Taks Excluida'})
    },

    async editStatus (req, res){
        const id = req.params.id

        const task = await Task.findOne({where: {id}})

        if(task == null || task == undefined){
            return res.status(404).json({err: "Usuario não encontrado"})
        }

        if(task.status != 'Pendente'){
            return res.status(406).json({err: 'Essa tarefa já está com o status de concluida'})
        }

        await Task.update({status: 'Concluido'}, {
            where: {
                id: id
            }
        })

        res.status(200).json({msg: 'Status alterado'})
    }
}