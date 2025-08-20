const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const discussion_boards = sequelize.define(
    'discussion_boards',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

topic: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  discussion_boards.associate = (db) => {

    db.discussion_boards.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.discussion_boards.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return discussion_boards;
};

