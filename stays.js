// const unsplashKey = "VrnlI4kwDsyQP-yZfyIfAk5eI6NqkjGljZ7Phw2VaOU";
// const staysGrid = document.getElementById("staysGrid");
// const loadMoreBtn = document.getElementById("loadMoreBtn");

// let page = 1;

// // Fetch stays
// async function loadStays() {
//   try {
//     const response = await fetch(
//       `https://api.unsplash.com/search/photos?query=hotel+resort+stay&per_page=6&page=${page}&client_id=${unsplashKey}`
//     );
//     const data = await response.json();

//     data.results.forEach((photo, index) => {
//       const stayCard = document.createElement("div");
//       stayCard.classList.add("stay-card");
//       stayCard.innerHTML = `
//         <img src="${photo.urls.small}" alt="Stay">
//         <h3>${index % 2 === 0 ? "Luxury Resort" : "Cozy Stay"}</h3>
//         <p>${index % 2 === 0 ? "5★ resort with spa & ocean view." : "Affordable & cozy stay for families."}</p>
//         <p class="price">₹${(5000 + Math.floor(Math.random() * 10000)).toLocaleString()} / night</p>
//         <a href="#" class="btn-stay">Book Now</a>
//       `;
//       staysGrid.appendChild(stayCard);
//     });
//   } catch (error) {
//     staysGrid.innerHTML = `<p>⚠ Error loading stays. Try again later.</p>`;
//   }
// }

// loadStays();

// loadMoreBtn.addEventListener("click", () => {
//   page++;
//   loadStays();
// });


const unsplashKey = "VrnlI4kwDsyQP-yZfyIfAk5eI6NqkjGljZ7Phw2VaOU";
const staysGrid = document.getElementById("staysGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const filterBtns = document.querySelectorAll(".filter-btn");

let page = 1;
let currentCategory = "luxury";

// Fetch stays based on category
async function loadStays(reset = false) {
  if (reset) staysGrid.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${currentCategory}+hotel+stay&per_page=6&page=${page}&client_id=${unsplashKey}`
    );
    const data = await response.json();

    data.results.forEach((photo, index) => {
      const stayCard = document.createElement("div");
      stayCard.classList.add("stay-card");
      stayCard.innerHTML = `
        <img src="${photo.urls.small}" alt="Stay">
        <h3>${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Stay</h3>
        <p>${currentCategory === "luxury" ? "5★ premium stay with spa & ocean view." : 
             currentCategory === "budget" ? "Affordable & cozy stay for families." : 
             "Relaxing resort with scenic surroundings."}</p>
        <p class="price">₹${(5000 + Math.floor(Math.random() * 10000)).toLocaleString()} / night</p>
        <a href="#" class="btn-stay">Book Now</a>
      `;
      staysGrid.appendChild(stayCard);
    });
  } catch (error) {
    staysGrid.innerHTML = `<p>⚠ Error loading stays. Try again later.</p>`;
  }
}

// Initial load
loadStays();

// Load more button
loadMoreBtn.addEventListener("click", () => {
  page++;
  loadStays();
});

// Filter button functionality
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.getAttribute("data-category");
    page = 1;
    loadStays(true); // reset grid
  });
});
