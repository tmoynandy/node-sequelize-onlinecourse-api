'use strict'

module.exports = (sequelize, Datatypes)=>{
    return sequelize.define('user', {
        id : {
            type : Datatypes.UUID,
            primaryKey : true
        },
        first_name : {
            type : Datatypes.STRING,
            isAlphanumeric : true,
            required : true,
            //allows first name to be null
            allowNull : true
        },
        last_name : {
            type : Datatypes.STRING,
            required : true,
            //allows first name to be null
            allowNull : true
        },
        username : {
            type : Datatypes.STRING,
            required : true,
            allowNull : true,
            len:[8,20]
        },
        email : {
            type : Datatypes.STRING,
            required : true,
            allowNull : true,
            len:[7,100],
            isEmail : true
        },
        password : {
            type : Datatypes.STRING,
            required : true,
            allowNull : true,
            len:[8,20]
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