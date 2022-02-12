const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const VirtualShelf = sequelize.define(
    "VirtualShelf", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descriere: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [3, 100]
                }
            }
        },
        data: {
            type: DataTypes.DATE
        }

    }
)

module.exports = VirtualShelf;