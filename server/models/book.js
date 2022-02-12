const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Book = sequelize.define (
    "Book", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titlu: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [5, 100],
                }
            }
        },
        gen: {  
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [5, 100],
                }
            }       
        },
        url: {
            type: DataTypes.STRING
        }
    }
)

module.exports = Book;