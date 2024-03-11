const {Schema, model} = require('mongoose');
const { v4: uuid} = require('uuid');
const crypto = require('crypto');

const userSchema = new Schema({
    email: { type: String, required: true, trim: true, unique: true},
    firstName: { type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    encryPassword: { type: String, required: true},
    salt: { type: String, required: true}
}, { 
    virtuals : { 
        fullName: {
            get() { 
                return `${this.firstName} ${this.lastName}`
            }
        },
        password: {
            set(password) {
                this.salt = uuid();
                this.encryPassword = this.securePassword(password);
            }
        }
    }
});

userSchema.methods = {
    securePassword: function(plainPassword){
        if(!plainPassword) return ""
        try{
            return crypto.createHmac("sha256", this.salt).update(plainPassword).digest("hex");
        } catch (err){
            console.log(err);
            return
        }
    }, 

    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) == this.encryPassword;
    }
}

const User = model('User', userSchema);
module.exports = User;