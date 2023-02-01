const { DataTypes, Model } = require("sequelize")

class User extends Model{
    static init(sequelize){
        super.init({
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'users'
        })
    }

}   


module.exports = User