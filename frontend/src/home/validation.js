// validation.js

export const validateSearch = (fromLocation, toLocation) => {
    const errors = {};
  
    if (!fromLocation) {
      errors.fromLocation = 'From location is required';
    }
  
    if (!toLocation) {
      errors.toLocation = 'To location is required';
    }
  
    return errors;
  };
  
  export const handleFromLocationChange = (e, setFromLocation, setSearchErrors, searchErrors) => {
    setFromLocation(e.target.value);
    setSearchErrors({ ...searchErrors, fromLocation: '' });
  };
  
  export const handleToLocationChange = (e, setToLocation, setSearchErrors, searchErrors) => {
    setToLocation(e.target.value);
    setSearchErrors({ ...searchErrors, toLocation: '' });
  };
  