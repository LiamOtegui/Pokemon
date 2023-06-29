// Averiguar que poronga es este archivo.

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("TypeMatchup", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    attacking_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Types',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    defending_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Types',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  });
}