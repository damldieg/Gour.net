const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER
    },
    resume: {
      type: DataTypes.TEXT,
      //allowNull: false,
    },
    instuctions: {
      type: DataTypes.TEXT,
      //allowNull: false,
    },
    idIngredients: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    idDiet: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    }
  });
};
