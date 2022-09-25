import  mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'UserName is required!'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [4, 'Password need to be longer!']
    },
});

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});
UserSchema.methods = {
    _hashPassword(password) {
        return bcrypt.hashSync(password,10);
    },
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    },
    toJSON() {
        return {
            _id: this._id,
            userName: this.userName
        };
    },
};

export default mongoose.model('User', UserSchema);