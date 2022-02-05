const seatCheck = (option, data) => {
  const isAvailable = data.filter((item) => Object.values(item)[0] !== "Full");

  return isAvailable.length > 0 ? isAvailable : `${option} no seat available`;
};

module.exports = seatCheck;
