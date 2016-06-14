var keystone = require('keystone');
var Types = keystone.Field.Types;
var social = require('keystone-social-login');

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	roomNumber: {type: Types.Number, required: true, initial: true,  index: true },
	phoneNumber: {type: Types.Number, required: true, initial: true },
	emergencyContactName: {type: Types.Name },
	emergencyContactNumber: {type: Types.Number }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

/**
* Social Media Injection
*/

social.plugin(User);

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
