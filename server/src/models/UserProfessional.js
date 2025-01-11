const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserProfessional = sequelize.define('UserProfessional', {
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
    professional_college: {
      type: DataTypes.STRING,
    },

    registration_number: {
      type: DataTypes.STRING,
    },
    specialty_number_rne: {
      type: DataTypes.STRING,
    },

    specialty: {
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
    
    dni: {
      type: DataTypes.STRING,
    }, 
     phone: {
      type: DataTypes.STRING,
    }, 
     password: {
      type: DataTypes.STRING,
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
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  });

  

  return UserProfessional;
};
