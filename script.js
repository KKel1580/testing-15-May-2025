function matchCentres() {
  const selectedItems = Array.from(document.querySelectorAll('input[name="item"]:checked')).map(cb => cb.value);
  const resultContainer = document.getElementById("match-result");
  const selectedItemsContainer = document.getElementById("selected-items-container");

  resultContainer.innerHTML = ""; // Clear any existing content

  // Update the selected items display
  if (selectedItems.length === 0) {
    selectedItemsContainer.innerHTML = "<p>No items selected</p>";
  } else {
    selectedItemsContainer.innerHTML = "<p>Selected items: </p>" + selectedItems.map(item => 
      `<span class="selected-item">${item}</span>`).join('');
  }

  // If no items are selected, return early
  if (selectedItems.length === 0) {
    resultContainer.innerHTML = "<p>Please select at least one item.</p>";
    return;
  }

  // Score each centre: full match gets top priority
  const matches = donationCentres
    .map(centre => {
      const matchingItems = selectedItems.filter(item => centre.items.includes(item));
      return {
        ...centre,
        matchCount: matchingItems.length,
        isFullMatch: matchingItems.length === selectedItems.length
      };
    })
    .filter(centre => centre.matchCount > 0) // Remove centres with no matches
    .sort((a, b) => {
      // Full matches first, then more matches higher
      if (a.isFullMatch && !b.isFullMatch) return -1;
      if (!a.isFullMatch && b.isFullMatch) return 1;
      return b.matchCount - a.matchCount; // Sort by match count if not full match
    });

  // If no matches found
  if (matches.length === 0) {
    resultContainer.innerHTML = "<p>No matching centres found. Try selecting different items.</p>";
    return;
  }

  // Display sorted results
  matches.forEach(centre => {
    const box = document.createElement("div");
    box.classList.add("centre-box");
    
    // Add additional styling or a label for full matches
    const fullMatchLabel = centre.isFullMatch ? `<span class="full-match-label">Full Match</span>` : '';

    box.innerHTML = `
      <img src="${centre.image}" alt="${centre.name}" class="centre-image">
      <div class="centre-info">
        <h3>${centre.name}</h3>
        <p><strong>Location:</strong> ${centre.location}</p>
        <p><strong>Accepted Items:</strong> ${centre.items.join(", ")}</p>
        <p><strong>Operating Hours:</strong> ${centre.hours}</p>
        ${fullMatchLabel}  <!-- Add the "Full Match" label if applicable -->
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
