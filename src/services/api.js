const API_KEY_ID = process.env.REACT_APP_CALGARY_API_KEY_ID;
const API_SECRET = process.env.REACT_APP_CALGARY_API_SECRET;

export const fetchCalgaryData = async (endpoint) => {
  try {
    const response = await fetch(
      `https://data.calgary.ca/resource/${endpoint}`,
      {
        headers: {
          "X-App-Token": API_KEY_ID,
          "X-App-Secret": API_SECRET,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
