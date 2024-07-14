const Joi = require('joi');

const UserPayloadSchema = Joi.object({
    username: Joi.string().max(50).required(),
    fullname: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { UserPayloadSchema };