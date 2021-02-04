                            // 1
                            const Sequelize = require('sequelize');

                            //2                     //3           //4         /5          //6
                            const sequelize = new Sequelize('workoutlog', 'postgres', 'password', {
                                host: 'localhost',
                                dialect: 'postgres'
                            });

                            //9            //10        //11
                            sequelize.authenticate().then(() => {
                                    console.log('Connection has been established successfully.');
                                })
                                .catch(err => {
                                    console.error('Unable to connect to the database:', err);
                                });
                            //14
                            module.exports = sequelize;