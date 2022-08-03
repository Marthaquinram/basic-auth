//for password, we could make hasing the responsibility of the handler.
// const signupHandler = async (req, res) => {
//     let { username, password } = req.body;
//     password = await bcrypt.hash(password);
//     const user = UserCollection.create({ username, password });
// }

const SECRET = process.env.SECRET;
const HASH_STRENGTH = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userModel = (sequelize, DataTypes) => {
    const model = sequelize.define('User', {
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                const payload = { username: this.username, role: this.role };
                return jwt.sign(payload, SECRET);
            },
        },
    });

    // alternatively, make hashing the responsibility of the model
    model.beforeCreate(async (user) => {
        let hashedPassword = await bcrypt.hash(user.password, HASH_STRENGTH);
        user.password = hashedPassword;
        user.role = 'admin';
        //now , all the handler needs to do is call new User(username, password).create
    });


    return model;
}
module.exports = userModel;
