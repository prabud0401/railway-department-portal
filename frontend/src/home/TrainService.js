import axios from 'axios';

// Function to fetch train IDs based on from_location and to_location
export const fetchTrainIDs = async (fromLocation, toLocation) => {
    try {
        // Send a GET request to fetch train IDs using axios
        const response = await axios.get('http://localhost:5000/train', {
            params: {
                from_location: fromLocation,
                to_location: toLocation
            }
        });

        // Extract train IDs from the response
        const ids = response.data;

        // Return the extracted train IDs
        return ids;
    } catch (error) {
        console.error('Error fetching train IDs:', error);
        throw error; // Throw the error for handling in the component
    }
};

// Function to fetch train details by ID
export const fetchTrainDetails = async (id) => {
    try {
        // Send a GET request to fetch train details using axios
        const response = await axios.get(`http://localhost:5000/trainDetails/${id}`);

        // Extract train details from the response
        const trainDetails = response.data;

        // Return the extracted train details
        return trainDetails;
    } catch (error) {
        console.error(`Error fetching train details for train ID ${id}:`, error);
        throw error; // Throw the error for handling in the component
    }
};
