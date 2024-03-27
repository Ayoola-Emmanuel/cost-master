document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cost-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get selected values
    const engineSize = parseInt(document.getElementById("engine-size").value);
    const importDuty = document.getElementById("import-duty").value;
    const manufactureDate = new Date(
      document.getElementById("manufacture-date").value
    );
    const facilities = {
      ac: document.getElementById("facility-ac").checked,
      openRoof: document.getElementById("facility-open-roof").checked,
    };
    const make = document.getElementById("make").value;

    // Calculate the total cost based on the selected options
    let totalCost = calculateTotalCost(
      engineSize,
      importDuty,
      manufactureDate,
      facilities,
      make
    );

    // Display the calculated cost next to the label for cost
    document.getElementById("cost").textContent = "$" + totalCost.toFixed(2);
  });
});

function calculateTotalCost(
  engineSize,
  importDuty,
  manufactureDate,
  facilities,
  make
) {
  let baseCost = 0;

  // Base cost based on engine size
  switch (engineSize) {
    case 4:
      baseCost += 20000; // Example base cost for 4-cylinder
      break;
    case 6:
      baseCost += 25000; // Example base cost for 6-cylinder
      break;
    case 8:
      baseCost += 30000; // Example base cost for 8-cylinder
      break;
  }

  // Adjust base cost based on import duty
  switch (importDuty) {
    case "US":
      baseCost *= 1.1; // Example import duty for US
      break;
    case "Canada":
      baseCost *= 1.2; // Example import duty for Canada
      break;
    case "Mexico":
      baseCost *= 1.15; // Example import duty for Mexico
      break;
  }

  // Adjust base cost based on manufacture date (considering depreciation)
  const currentYear = new Date().getFullYear();
  const yearsOld = currentYear - manufactureDate.getFullYear();
  const depreciationRate = 0.05; // Example depreciation rate (5% per year)
  baseCost *= Math.pow(1 - depreciationRate, yearsOld);

  // Additional costs for facilities
  if (facilities.ac) {
    baseCost += 1000; // Example additional cost for A/C
  }
  if (facilities.openRoof) {
    baseCost += 2000; // Example additional cost for Open roof
  }

  // Additional costs or adjustments based on make (custom logic based on different car manufacturers)
  switch (make) {
    case "Toyota":
      baseCost *= 1.05; // Example adjustment for Toyota cars
      break;
    case "Lexus":
      baseCost *= 1.1; // Example adjustment for Lexus cars
      break;
    // Add more cases for other car makes as needed
  }

  return baseCost;
}
