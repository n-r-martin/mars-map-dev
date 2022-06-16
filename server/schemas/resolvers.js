// Template is taken from previous project and may require significant edits
// Accounting for app that may or may not require authentication

const { AuthenticationError } = require('apollo-server-express');
const { User, Data } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("datas");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    Datas: async () => {
      return Data.find();
    },
    Data: async (parent, { DataId }) => {
      return Data.findOne({ _id: DataId });
    },
    publicDatas: async () => {
      return Data.find({isPublic: true})
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addData: async (parent, { isPublic, expireTime, DataAuthor }) => {
      const Data = await Data.create({
        isPublic,
        expireTime,
        DataAuthor
      });
      return Data;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;