import sequelize from "@/config/database";

const calculateDistance = async (
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
) => {
  const result = await sequelize.query(
    `
      SELECT ST_Distance(
        ST_MakePoint(:lon1, :lat1)::geography,
        ST_MakePoint(:lon2, :lat2)::geography
      ) AS distance;
      `,
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: { lon1, lat1, lon2, lat2 }
    }
  );

  return result[0].distance; // Distance in meters
};
