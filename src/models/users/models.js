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
            type: DataTypes.VIRTUAL, //this means this isnt going to get stored in the data base, only avail. at runtime
            get() {
                const payload = { username: this.username, role: this.role };
                return jwt.sign(payload, SECRET);
            },
        },
    });

    // alternatively, make hashing the responsibility of the model
    model.beforeCreate(async (user) => {
        let hashedPassword = await bcrypt.hash(user.password, HASH_STRENGTH);
        console.log(hashedPassword);
        user.password = hashedPassword;
        user.role = 'admin';
        //now , all the handler needs to do is call new User(username, password).create
    });


    return model;
}
module.exports = userModel;

//As a user, I want to use my token to access routes that require a valid user

// Using an HTTP REST client, send a request to a “protected” route, such as / secretstuff
// Your request must send an “Authorization” header, with the value of Bearer TOKEN
// TOKEN is the token that you would have returned to the user after their signin step(above)
// If the TOKEN is valid(i.e.if it represents an actual user)
// The route should function as it normally would(sending a response)
// If not
// Send the user an error message stating “Invalid Login”
