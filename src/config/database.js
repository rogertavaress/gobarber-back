module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobarberdb',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
}
