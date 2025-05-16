// Array of donation centers with the items they accept, their location, and operating hours
const donationCenters = [
  { 
    name: "Salvation Army", 
    items: ["clothes", "books", "toys", "furniture", "applicances"], 
    location: "123 Charity St., Cityville", 
    hours: "Mon-Fri: 9 AM - 5 PM",
    logo: "images/salvation army.png" 
  },
  { 
    name: "Charity B", 
    items: ["clothes", "furniture", "appliances"], 
    location: "456 Helping Ave., Townsville", 
    hours: "Mon-Sat: 10 AM - 6 PM",
    logo: "images/salvation army.png" 
  },
  { 
    name: "Charity C", 
    items: ["toys", "furniture", "appliances"], 
    location: "789 Generosity Rd., Villagetown", 
    hours: "Mon-Sun: 9 AM - 7 PM",
    logo: "images/salvation army.png" 
  },
  { 
    name: "Charity D", 
    items: ["books", "appliances"], 
    location: "101 Donation Blvd., Cityplace", 
    hours: "Tue-Sun: 10 AM - 4 PM",
    logo: "images/salvation army.png" 
  },
  { 
    name: "Charity E", 
    items: ["clothes", "toys", "furniture"], 
    location: "202 Kindness Dr., Metroville", 
    hours: "Mon-Sun: 8 AM - 8 PM",
    logo: "images/salvation army.png" 
  }
];

// Function to update the matching donation centers
function updateMatchingCenters() {
  const selectedItems = [];

  // Get all selected items from checkboxes
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
    selectedItems.push(checkbox.value);
  });

  // Filter and sort donation centers based on selected items
  const sortedCenters = donationCenters
    .map(center => {
      // Calculate how many selected items this center accepts
      const matchedItems = center.items.filter(item => selectedItems.includes(item));
      return { ...center, matchCount: matchedItems.length };
    })
    .filter(center => center.matchCount > 0)  // Only show centers that accept at least one selected item
    .sort((a, b) => b.matchCount - a.matchCount);  // Sort by matchCount in descending order

  // Display the results
  const resultContainer = document.getElementById("match-result");
  resultContainer.innerHTML = ""; // Clear previous results

  if (sortedCenters.length > 0) {
    sortedCenters.forEach(center => {
      const div = document.createElement("div");
      div.classList.add("donation-center");

      div.innerHTML = `
        <div class="center-box">
        <!-- Display Logo for each matching center -->
        <img src="${center.logo}" alt="${center.name} Logo" class="donation-logo">
          <h3>${center.name}</h3>
          <p><strong>Location:</strong> ${center.location}</p>
          <p><strong>Items Accepted:</strong> ${center.items.join(", ")}</p>
          <p><strong>Operating Hours:</strong> ${center.hours}</p>
        </div>
      `;
      resultContainer.appendChild(div);
    });
  } else {
    resultContainer.innerHTML = "<p>No donation centers match your selected items.</p>";
  }
}

// Add event listeners to checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener("change", updateMatchingCenters);
});

