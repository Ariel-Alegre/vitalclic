const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },

    
    
    genre: {
      type: DataTypes.STRING,
    },
    birthdate: {
      type: DataTypes.STRING,
    },
    
    email: {
      type: DataTypes.STRING,
    },

    country: {
      type: DataTypes.STRING,
    }, 
     province: {
      type: DataTypes.STRING,
    },  
    district: {
      type: DataTypes.STRING,
    }, 
     phone: {
      type: DataTypes.STRING,
    }, 
     password: {
      type: DataTypes.STRING,
    },

    dependents: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    role: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.STRING,
    },
    backgroundColor: {
      type: DataTypes.STRING,
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Se establece como false por defecto
    },
    // Nuevo campo para la fecha de aceptación de términos
    termsAcceptedAt: {
      type: DataTypes.DATE,
    },
    
 
 

    
  }, {
    timestamps: false, // Agrega createdAt y updatedAt automáticamente
  });

  

  return User;
};
