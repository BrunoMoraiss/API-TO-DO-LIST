const dbConfig = require('../config/database')
const Sequelize = require('sequelize')
const Task = require("../app/models/Task")
const User = require("../app/models/User")

const connection = new Sequelize(dbConfig)

Task.init(connection)
User.init(connection)
User.hasMany(Task, {
    foreignKey: 'userId',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
})
Task.belongsTo(User, {foreignKey: 'userId'})

module.exports = connection