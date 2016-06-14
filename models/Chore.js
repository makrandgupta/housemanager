var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Chore Model
 * ==========
 */

var Chore = new keystone.List('Chore');

Chore.add({
	name: { type: String, required: true },
	description	: { type: String },
	assignedTo: { type: Types.Relationship, ref: 'User' },
	dueDate: { type: Types.Date },
});

Chore.register();
