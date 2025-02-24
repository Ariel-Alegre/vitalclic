

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OnlineShifts = sequelize.define('OnlineShifts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shifts: {
      type: DataTypes.STRING,
    },
    communication: {
      type: DataTypes.STRING,
    },
    
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.STRING,
    },
    document_number: {
      type: DataTypes.STRING,
    },
    reason_for_shift: {
      type: DataTypes.STRING,
    },
    shifts: {
      type: DataTypes.STRING,
    },

    date: {
      type: DataTypes.STRING,
    },

    time: {
      type: DataTypes.STRING,
    },

    specialty: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.STRING,
    },

    userProfesionalId: {  // Clave foránea para la relación con UserProfessional
      type: DataTypes.UUID, // Cambié el tipo de INTEGER a UUID
      allowNull: true,  // Permite que el valor sea null
      references: {
        model: 'UserProfessionals', // La tabla relacionada (UserProfessionals)
        key: 'id', // Clave primaria de UserProfessionals
      },
    },





  }, {
    timestamps: false, // Agrega createdAt y updatedAt automáticamente
  }
  );

  OnlineShifts.associate = (models) => {
    OnlineShifts.belongsTo(models.User, { foreignKey: 'userId' }); // <-- Asegurar esta relación
  };

  return OnlineShifts;
};
