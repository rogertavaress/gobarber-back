module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'admin',
    database: 'gobarberdb',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}
