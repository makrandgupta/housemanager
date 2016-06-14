var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Fine Model
 * ==========
 */

var Fine = new keystone.List('Fine');

Fine.add({
	name: { type: String, required: true },
	description	: { type: String },
	assignedTo: { type: Types.Relationship, ref: 'User' },
	assignedBy: { type: Types.Relationship, ref: 'User' },
	dueDate: { type: Types.Date },
});

Fine.register();
