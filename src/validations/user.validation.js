const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    role: Joi.string().valid('user', 'admin'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      gender: Joi.string().valid('male', 'female', 'other').optional(),
      nationality: Joi.string().optional(),
      hashTags: Joi.array().items(Joi.string()).optional(),
      aboutMe: Joi.string().max(250).allow('').allow(null).optional(),
      preferredLanguage: Joi.array().items(Joi.string()).optional(),
      location: Joi.string().allow('').allow(null).optional(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateIsShowReview = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      isShowReview: Joi.boolean(),
    })
    .min(1),
};

const updateUserAvatar = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateIsShowReview,
  updateUserAvatar,
};
