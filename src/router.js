const { Router } = require('express')
const router = new Router()
const TaskController = require("./app/controllers/TaskController")
const UserController = require('./app/controllers/UserController')
const AdminAuth = require('./app/middlewares/AdminAuth')

router.post("/task", AdminAuth ,TaskController.create)
router.get("/task/user/:id", AdminAuth ,UserController.tasksByUser)
router.put("/task/:id", AdminAuth ,TaskController.edit)
router.delete("/task/:id", AdminAuth ,TaskController.destroy)
router.put("/task/status/:id", AdminAuth ,TaskController.editStatus)
router.post("/user", UserController.create)
router.post("/login", UserController.login)


module.exports = router