// Sample data for donation centers
// Sample donation center data
const donationCentres = [
  {
    name: "Goodwill Centre",
    location: "123 Charity St, City",
    items: ["clothes", "books", "toys"],
    hours: "Mon-Fri: 9 AM - 5 PM",
    image: "images/goodwill.jpg"
  },
  {
    name: "Hope for All",
    location: "456 Hope Ave, City",
    items: ["furniture", "appliances"],
    hours: "Mon-Sat: 10 AM - 6 PM",
    image: "images/hope.jpg"
  },
  {
    name: "Community Chest",
    location: "789 Giving Rd, City",
    items: ["clothes", "appliances"],
    hours: "Mon-Sun: 8 AM - 8 PM",
    image: "images/community-chest.jpg"
  }
];

// Matching function
function matchCentres() {
  const selectedItems = Array.from(document.querySelectorAll('input[name="item"]:checked')).map(cb => cb.value);
  const resultContainer = document.getElementById("match-result");
  resultContainer.innerHTML = "";

  const matches = donationCentres.filter(centre => {
    return centre.items.some(item => selectedItems.includes(item));
  });

  if (matches.length === 0) {
    resultContainer.innerHTML = "<p>No matching centres found. Try selecting different items.</p>";
    return;
  }

  matches.forEach(centre => {
    const box = document.createElement("div");
    box.classList.add("centre-box");
    box.innerHTML = `
      <img src="${centre.image}" alt="${centre.name}" class="centre-image">
      <div class="centre-info">
        <h3>${centre.name}</h3>
        <p><strong>Location:</strong> ${centre.location}</p>
        <p><strong>Accepted Items:</strong> ${centre.items.join(", ")}</p>
        <p><strong>Operating Hours:</strong> ${centre.hours}</p>
      </div>
    `;
    resultContainer.appendChild(box);
  });
}

// Automatically run matchCentres() when any checkbox is clicked
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('input[name="item"]').forEach(checkbox => {
    checkbox.addEventListener('change', matchCentres);
  });

  matchCentres(); // run once on load
});
