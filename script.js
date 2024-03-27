// Define the car pricing model
const basePrices = {
  "Toyota": {
    "4-cylinder": 20000,
    "6-cylinder": 25000,
    "8-cylinder": 30000
  }
};

const importDuties = {
  "US": 0,
  "Canada": 0.15,
  "Mexico": 0.20
};

const facilityCosts = {
  "A/C": 1000,
  "open roof": 2000
};

const dateModifiers = {
  "before 2020": -2000,
  "after 2024": 2000
};

// Define the function to calculate the cost of the car
function calculateCarCost(engineSize, make, importDuty, dateManufactured, facilities) {
  // Calculate the base price
  let basePrice = basePrices[make][engineSize];

  // Apply the import duty
  basePrice *= (1 + importDuties[importDuty]);

  // Add the costs for any facilities
  for (let i = 0; i < facilities.length; i++) {
    basePrice += facilityCosts[facilities[i]];
  }

  // Adjust the cost based on the date of manufacture
  if (dateManufactured in dateModifiers) {
    basePrice += dateModifiers[dateManufactured];
  }

  return basePrice;
}

// Example usage:
let carCost = calculateCarCost("4-cylinder", "Toyota", "US", "2023", ["A/C"]);
console.log(carCost);