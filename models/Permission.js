'use strict'

module.exports = (sequelize, Datatypes)=>{
    return sequelize.define('permission', {
        id : {
            type : Datatypes.INTEGER,
            primaryKey : true,
            autoincrement : true
        },
        type : {
            type : Datatypes.STRING,
            required : true,
            allowNull : false
        },
        updated_at : { type : Datatypes.DATE},
        deleted_at : { type : Datatypes.DATE}
        
    },
    {
        //if we want the automatically created column "createdAt to created_at"
        underscored : true,
        //if the user deletes itself, it doesn't get deleted from the database, 
        //rather gets an entry on deleted_at 
        paranoid : true
    });
};