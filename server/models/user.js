const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
	firstName: { type: String, unique: false },
	lastName: { type: String, unique: false },
	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	userPhoneNumber: { type: Number, unique: false, required: true, default: 0 },
	emergencyContactNumber: { type: Number, unique: false, required: true, default: 0 },
	weight: { type: Number, unique: false, required: true, default: 130 },
	gender: { type: String, unique: false, required: true, default: 'f' },
	selfAlertThreshold: { type: Number, unique: false, required: true, default: 0.1 },
	emergencyAlertThreshold: { type: Number, unique: false, required: true, default: 0.1 },
	drinks: [
		{
			// Store ObjectIds in the array
			type: Schema.Types.ObjectId,
			// The ObjectIds will refer to the ids in the Drinks model
			ref: "Drink"
		}
	]
});

// All the following should be read from db and written to state when app loads(?)
//
// userPhoneNumber is for sending text alerts to the user. NOTE: If this number isn't
// already in this app's state, it is collected at Check-In or Add Drink to Count.
// This number is also kept in localStorage and should be re-written there if changed.
//
// emergencyContactNumber is for sending text alerts to user's emergency contact. If
// not supplied, the userPhoneNumber is used for emergencyContactNumber. NOTE: If
// this number isn't already in this app's state, it is collected at Check-In or
// Add Drink to Count. This number is also kept in localStorage and should be re-
// written there if changed.
//
// weight and gender are used for BAC calculations. They have defaults and are
// required because we need *some* number and gender to work with.
//
// selfAlertThreshold is the BAC at which we alert the user in the app display
// (not by text). At present, we don't have this actual alerting implemented (5/10/19).
//
// emergencyAlertThreshold is the BAC at which we text the user's emergency contact
// with a Google Maps link. This text is sent *without* any user interaction. If
// user's own number is used for emergency contact, a text is sent to user with an
// Uber link instead of Google Maps.


// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		// no password provided
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
})

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
