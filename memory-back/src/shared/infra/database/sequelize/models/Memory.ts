module.exports = (sequelize, DataTypes) => {
    const Memory = sequelize.define("memory", {
        memory_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        host_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        memory: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Memory;
};
