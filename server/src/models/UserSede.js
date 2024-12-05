const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserSede = sequelize.define('UserSede', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    reason_social: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    ruc: {
      type: DataTypes.STRING,
    },

    address: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
      },

      type_of_service: {
        type: DataTypes.STRING,
      },
      contact_person: {
        type: DataTypes.STRING,
      },
      charges: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      specialty: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      
    province: {
      type: DataTypes.STRING,
    },
    district: {
        type: DataTypes.STRING,
      },  
        password: {
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

  

  return UserSede;
};
