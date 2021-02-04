// const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const WorkoutLog = sequelize.define('workoutlog', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
        }
    });
    return WorkoutLog;
};