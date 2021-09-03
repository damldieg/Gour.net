const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "https://acortar.link/OD2aI3"
    },
    score: {
      type: DataTypes.INTEGER
    },
    healthiness: {
      type: DataTypes.INTEGER
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Resume"
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Instructions"
    }
  
  });
};
