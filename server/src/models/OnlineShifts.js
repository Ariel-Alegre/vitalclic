

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


    
 
 

    
  }, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

  

  return OnlineShifts;
};
