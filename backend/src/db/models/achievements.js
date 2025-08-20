const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const achievements = sequelize.define(
    'achievements',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

date_awarded: {
        type: DataTypes.DATE,

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

  achievements.associate = (db) => {

    db.achievements.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.achievements.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return achievements;
};

