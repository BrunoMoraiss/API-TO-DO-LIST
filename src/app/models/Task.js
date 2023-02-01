const { DataTypes, Model } = require("sequelize")

class Task extends Model{
    static init(sequelize){
        super.init({
            task: DataTypes.STRING,
            status: DataTypes.STRING,
            userId: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: "tasks"
        })
    }

}   

module.exports = Task