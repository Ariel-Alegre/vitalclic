

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const InPersonShifts = sequelize.define('InPersonShifts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shifts: {
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
      type: DataTypes.STRING(1000),
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

    sedeId: {  // Clave foránea para la relación con UserProfessional
      type: DataTypes.UUID, // Cambié el tipo de INTEGER a UUID
      allowNull: true,  // Permite que el valor sea null
      references: {
        model: 'UserSedes', 
        key: 'id', // Clave primaria de UserProfessionals
      },
    },





  }, {
    timestamps: false, // Agrega createdAt y updatedAt automáticamente
  }
  );



  return InPersonShifts;
};
