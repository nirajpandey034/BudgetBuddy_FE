const getFormattedDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0'); // Get day with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed, so add 1)
  const year = date.getFullYear(); // Get the full year

  return `${day}-${month}-${year}`; // Return the date in the desired format
};
export default getFormattedDate;
