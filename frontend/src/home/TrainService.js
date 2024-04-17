import axios from 'axios';

export const fetchTrainData = async (fromLocation, toLocation) => {
  try {
    // Fetch train data from the specified endpoint
    const response = await axios.get(`http://localhost:5000/trainList?from_location=${fromLocation}&to_location=${toLocation}`);

    // Extract and return train data from the response
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching train data:', error);
  }
};
