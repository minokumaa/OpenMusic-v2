const Joi = require('joi');

const SongPayloadSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().integer().options({ convert: false }).required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().integer().options({ convert: false }),
    albumId: Joi.string(),
});

module.exports = { SongPayloadSchema };