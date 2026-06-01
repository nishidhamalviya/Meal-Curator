/**
 * Meal Curator - galactic foodie core logic
 * Integrates Zomato Bangalore CSV dataset with premium fallback safety
 */

// 1. Fallback Restaurant Database (extracted from Zomato-data-.csv and enriched)
// Used dynamically if local file fetch fails due to CORS in file:// protocol
const fallbackRestaurants = [
  { name: "Meghana Foods", rate: 4.4, votes: 4401, approxCost: 300, type: "Dining", cuisines: ["indian"], diets: ["veg", "non-veg"] },
  { name: "Onesta", rate: 4.6, votes: 2556, approxCost: 300, type: "Cafes", cuisines: ["italian"], diets: ["veg", "non-veg"] },
  { name: "Jalsa", rate: 4.1, votes: 775, approxCost: 400, type: "Buffet", cuisines: ["indian"], diets: ["veg", "non-veg"] },
  { name: "Spice Elephant", rate: 4.1, votes: 787, approxCost: 400, type: "Buffet", cuisines: ["indian"], diets: ["veg", "non-veg"] },
  { name: "San Churro Cafe", rate: 3.8, votes: 918, approxCost: 400, type: "Cafes", cuisines: ["cafes", "desserts"], diets: ["veg"] },
  { name: "Addhuri Udupi Bhojana", rate: 3.7, votes: 88, approxCost: 150, type: "Buffet", cuisines: ["south-indian"], diets: ["veg"] },
  { name: "Szechuan Dragon", rate: 4.2, votes: 1647, approxCost: 300, type: "Dining", cuisines: ["chinese"], diets: ["veg", "non-veg"] },
  { name: "Empire Restaurant", rate: 4.4, votes: 4884, approxCost: 375, type: "Dining", cuisines: ["indian"], diets: ["veg", "non-veg"] },
  { name: "McDonald's", rate: 3.9, votes: 286, approxCost: 250, type: "Dining", cuisines: ["fast-food"], diets: ["veg", "non-veg"] },
  { name: "Domino's Pizza", rate: 3.9, votes: 540, approxCost: 400, type: "Dining", cuisines: ["italian", "fast-food"], diets: ["veg", "non-veg"] },
  { name: "Hari Super Sandwich", rate: 3.2, votes: 45, approxCost: 100, type: "Dining", cuisines: ["fast-food", "cafes"], diets: ["veg"] },
  { name: "Namma Brahmin's Idli", rate: 3.6, votes: 34, approxCost: 50, type: "Dining", cuisines: ["south-indian"], diets: ["veg"] },
  { name: "Corner House Ice Cream", rate: 4.3, votes: 345, approxCost: 200, type: "Dining", cuisines: ["desserts"], diets: ["veg"] },
  { name: "XO Belgian Waffle", rate: 3.7, votes: 17, approxCost: 200, type: "Dining", cuisines: ["desserts"], diets: ["veg"] },
  { name: "Burger King", rate: 3.2, votes: 71, approxCost: 300, type: "Dining", cuisines: ["fast-food"], diets: ["veg", "non-veg"] },
  { name: "Behrouz Biryani", rate: 3.9, votes: 230, approxCost: 325, type: "Dining", cuisines: ["indian"], diets: ["veg", "non-veg"] },
  { name: "Third Wave Coffee Roasters", rate: 4.5, votes: 502, approxCost: 350, type: "Cafes", cuisines: ["cafes"], diets: ["veg", "non-veg"] },
  { name: "Faasos", rate: 4.2, votes: 415, approxCost: 250, type: "Dining", cuisines: ["fast-food", "indian"], diets: ["veg", "non-veg"] },
  { name: "Chaatimes", rate: 3.8, votes: 133, approxCost: 100, type: "Dining", cuisines: ["fast-food"], diets: ["veg"] },
  { name: "Havyaka Mess", rate: 3.9, votes: 28, approxCost: 150, type: "Dining", cuisines: ["south-indian"], diets: ["veg"] },
  { name: "Sweet Truth", rate: 3.9, votes: 35, approxCost: 250, type: "Dining", cuisines: ["desserts"], diets: ["veg"] },
  { name: "Corner House", rate: 4.3, votes: 345, approxCost: 200, type: "Dining", cuisines: ["desserts"], diets: ["veg"] }
];

// Pre-defined Gourmet Dish Combinations
const dishDatabase = {
  indian: {
    veg: [
      { name: "Paneer Butter Masala + Butter Naan x2 + Jeera Rice", items: ["Paneer Butter Masala", "Tandoori Butter Naan x2", "Aromatic Jeera Rice", "Onion Laccha Salad"] },
      { name: "Dal Makhani Deluxe Combo", items: ["Slow-cooked Dal Makhani", "Garlic Naan x2", "Steamed Basmati Rice", "Sirka Onion"] },
      { name: "Chole Bhature Maharaja Plate", items: ["Pind Chole Masala", "Fluffy Bhature x2", "Sweet Lassi (Chilled)", "Mixed Pickle & Onion"] },
      { name: "Special Rajasthani Veg Thali", items: ["Dal Bati Churma", "Shahi Paneer", "Missi Roti x2", "Jeera Pulao", "Gulab Jamun x1"] }
    ],
    "non-veg": [
      { name: "Meghana Chicken Biryani Classic Combo", items: ["Bangalore Chicken Dum Biryani", "Mirchi Ka Salan", "Creamy Cucumber Raita", "Boiled Egg x1"] },
      { name: "Butter Chicken + Garlic Naan Combo", items: ["Rich Butter Chicken Boneless", "Garlic Naan x2", "Spiced Jeera Rice", "Mint Chutney"] },
      { name: "Mutton Rogan Josh Royal Thali", items: ["Kashmiri Mutton Rogan Josh", "Butter Roti x3", "Saffron Pulao", "Sirka Onion"] }
    ]
  },
  "south-indian": {
    veg: [
      { name: "Special Ghee Podi Dosa Combo", items: ["Crispy Ghee Podi Masala Dosa", "Steamed Idli x1", "Sambar & Chutney Duo", "Filter Coffee (Chilled/Hot)"] },
      { name: "Royal South Indian Tiffin Feast", items: ["Medu Vada x2", "Mini Rava Kesari", "Steamed Idli x2", "Rich Coconut Chutney"] },
      { name: "Traditional Karnataka Oota (Full Meal)", items: ["Jolada Rotti x2", "Ennegayi (Eggplant Curry)", "Bisi Bele Bath", "Curd Rice", "Payasam"] }
    ],
    "non-veg": [
      { name: "Chicken Chettinad Parotta Combo", items: ["Fiery Chicken Chettinad", "Malabar Parotta x3", "Raita & Fresh Onion"] },
      { name: "Ambur Chicken Biryani Plate", items: ["Ambur Style Chicken Biryani", "Ennai Kathirikai (Eggplant)", "Cold Curd Raita"] }
    ]
  },
  chinese: {
    veg: [
      { name: "Schezwan Noodles + Veg Manchurian", items: ["Spicy Veg Hakka Noodles", "Veg Manchurian in Gravy", "Crispy Spring Roll x1", "Chilled Coke"] },
      { name: "Fried Rice Combo + Chilli Paneer", items: ["Veg Fried Rice", "Chilli Paneer Dry", "Hot & Sour Soup"] }
    ],
    "non-veg": [
      { name: "Chicken Hakka Noodles + Chilli Chicken Combo", items: ["Chicken Noodles", "Chilli Chicken Gravy", "Fried Chicken Momo x2", "Chilled Pepsi"] },
      { name: "Chicken Schezwan Rice + Manchurian Combo", items: ["Chicken Fried Rice", "Chicken Manchurian Dry", "Kimchi Salad"] }
    ]
  },
  italian: {
    veg: [
      { name: "Margherita Pizza + Garlic Bread Combo", items: ["Woodfired Margherita Pizza (Medium)", "Stuffed Garlic Bread (Cheese)", "Pepsi Can"] },
      { name: "Pesto Penne Pasta + Garlic Bread", items: ["Creamy Pesto Penne Pasta", "Garlic Bread slices x3", "Italian Green Salad"] }
    ],
    "non-veg": [
      { name: "Chicken Supreme Pizza + Wing Platter", items: ["Spicy Chicken Pizza (Medium)", "BBQ Chicken Wings x4", "Chilled Coke"] },
      { name: "Chicken Alfredo Pasta Combo", items: ["Rich White Sauce Chicken Pasta", "Garlic Bread with Cheese x2", "Soft Drink"] }
    ]
  },
  "fast-food": {
    veg: [
      { name: "Paneer Burger Meal Box", items: ["Spicy Paneer Burger", "Peri Peri French Fries (L)", "Chilled Coca Cola", "Cheese Dip"] },
      { name: "Cheesy Paneer Wrap Combo", items: ["Grilled Paneer Wrap", "Salted French Fries", "Onion Rings x4", "Fanta"] }
    ],
    "non-veg": [
      { name: "McSpicy Chicken Burger Feast", items: ["McSpicy Chicken Burger", "Crispy Chicken Nuggets x6", "French Fries (L)", "Chilled Coke"] },
      { name: "Double Cheese Chicken Whopper Meal", items: ["Double Chicken Whopper", "Cheese Fries", "Chilled Soft Drink"] }
    ]
  },
  cafes: {
    veg: [
      { name: "Cheese Panini + Hot Cappuccino Combo", items: ["Gourmet Cheese Panini Sandwich", "Classic Hot Cappuccino", "Warm Choco Chip Cookie"] },
      { name: "Avocado Toast + Cold Brew", items: ["Smashed Avocado Toast", "Special Iced Cold Brew Coffee", "Sea Salt Chocolate Chip Cookie"] }
    ],
    "non-veg": [
      { name: "Chicken Club Sandwich + Hot Latte Combo", items: ["Smoked Chicken Club Sandwich", "Rich Espresso Hot Latte", "Melted Fudge Brownie"] },
      { name: "Chicken Wrap + Cafe Frappe Combo", items: ["Spiced Chicken Wrap", "Creamy Caramel Frappe", "Choco Chip Muffin"] }
    ]
  },
  desserts: {
    veg: [
      { name: "Corner House Death by Chocolate Platter", items: ["Double Layer Cocoa Cake", "Vanilla Ice Cream Scoop x2", "Hot Chocolate Fudge Sauce", "Toasted Whipped Cream & Cashews"] },
      { name: "Classic Belgian Waffle Supreme", items: ["Warm Belgian Waffle", "Drizzle of Nutella & Caramel", "Fresh Banana Slices", "Vanilla Bean Scoop"] },
      { name: "Gourmet Fudge Brownie Sundae", items: ["Warm Walnut Fudge Brownie", "Double Scoop Vanilla", "Hot Fudge sauce pouring", "Maraschino Cherry"] }
    ],
    "non-veg": [
      // Desserts are naturally vegetarian
      { name: "Corner House Death by Chocolate Platter", items: ["Double Layer Cocoa Cake", "Vanilla Ice Cream Scoop x2", "Hot Chocolate Fudge Sauce", "Toasted Whipped Cream & Cashews"] },
      { name: "Classic Belgian Waffle Supreme", items: ["Warm Belgian Waffle", "Drizzle of Nutella & Caramel", "Fresh Banana Slices", "Vanilla Bean Scoop"] }
    ]
  }
};

// Desserts Database for the Smart Customizer Add-on
const dessertMenu = [
  { name: "Hot Chocolate Fudge Jar", price: 120, restaurant: "Corner House" },
  { name: "Nutella Belgian Waffle", price: 100, restaurant: "XO Belgian Waffle" },
  { name: "Tender Coconut Ice Cream Scoop", price: 80, restaurant: "NIC Ice Creams" },
  { name: "Warm Walnut Brownie", price: 90, restaurant: "Theobroma" },
  { name: "Chilled Mango Kulfi", price: 60, restaurant: "Grameen Kulfi" }
];

// App State Variables
let database = [...fallbackRestaurants];
let selectedCuisine = "indian";
let selectedDiet = "veg";
let servingsCount = 1;
let curatedMealCost = 0;
let baseMealCost = 0;
let dessertAdded = null;

// DOM Elements
const cuisineCards = document.querySelectorAll(".cuisine-card");
const dietBtns = document.querySelectorAll(".diet-btn");
const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const servingsCountText = document.getElementById("servingsCount");
const servingsLabel = document.getElementById("servingsLabel");
const servingsVisual = document.getElementById("servingsVisual");
const budgetSlider = document.getElementById("budget");
const budgetDisplay = document.getElementById("budgetDisplay");
const budgetVibe = document.getElementById("budgetVibe");
const mealTypeSelect = document.getElementById("mealType");

const curateBtn = document.getElementById("curateBtn");
const surpriseBtn = document.getElementById("surpriseBtn");

const emptyState = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const resultState = document.getElementById("resultState");
const reelStrip = document.getElementById("reelStrip");

// Result Nodes
const resultRestName = document.getElementById("resultRestName");
const resultRestRating = document.getElementById("resultRestRating");
const resultRestVotes = document.getElementById("resultRestVotes");
const resultCostForTwo = document.getElementById("resultCostForTwo");
const resultRestType = document.getElementById("resultRestType");
const resultItemsList = document.getElementById("resultItemsList");
const resultPerPersonPrice = document.getElementById("resultPerPersonPrice");
const resultServingsMultiplier = document.getElementById("resultServingsMultiplier");
const resultTotalPrice = document.getElementById("resultTotalPrice");

// Dessert Customizer Nodes
const dessertWidget = document.getElementById("dessertWidget");
const dessertRemainingText = document.getElementById("dessertRemainingText");
const dessertProposalText = document.getElementById("dessertProposalText");
const addDessertBtn = document.getElementById("addDessertBtn");

const swiggyLink = document.getElementById("swiggyLink");
const zomatoLink = document.getElementById("zomatoLink");

// ==========================================================================
// 2. CSV Parser Engine
// ==========================================================================
function parseZomatoCSV(csvText) {
  const lines = csvText.split("\n");
  const parsed = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse commas ignoring them inside quotes
    const cols = [];
    let insideQuotes = false;
    let currentCol = "";
    
    for (let char of line) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        cols.push(currentCol.trim());
        currentCol = "";
      } else {
        currentCol += char;
      }
    }
    cols.push(currentCol.trim());
    
    if (cols.length >= 7) {
      const name = cols[0].replace(/"/g, "");
      const onlineOrder = cols[1];
      const bookTable = cols[2];
      const rateStr = cols[3];
      const votes = parseInt(cols[4]) || 0;
      const approxCostForTwoStr = cols[5].replace(/"/g, "").replace(/,/g, "");
      const approxCostForTwo = parseInt(approxCostForTwoStr) || 0;
      const type = cols[6].replace(/"/g, "");
      
      // Clean rating value (e.g., "4.1/5" or "3.8 /5" -> 4.1)
      let rate = parseFloat(rateStr.split("/")[0]) || 0;
      
      // Map Zomato types/cuisines dynamically to our filter structure
      let cuisines = ["indian"];
      const lowerName = name.toLowerCase();
      const lowerType = type.toLowerCase();
      
      if (lowerType.includes("cafe") || lowerName.includes("cafe") || lowerName.includes("coffee") || lowerName.includes("tea")) {
        cuisines = ["cafes"];
      } else if (lowerName.includes("pizza") || lowerName.includes("pasta") || lowerName.includes("onesta") || lowerName.includes("domino") || lowerName.includes("pizzeria")) {
        cuisines = ["italian"];
      } else if (lowerName.includes("idli") || lowerName.includes("dosa") || lowerName.includes("bhojana") || lowerName.includes("sagar") || lowerName.includes("mess") || lowerName.includes("tindi")) {
        cuisines = ["south-indian"];
      } else if (lowerName.includes("chinese") || lowerName.includes("bites") || lowerName.includes("dragon") || lowerName.includes("beijing")) {
        cuisines = ["chinese"];
      } else if (lowerName.includes("burger") || lowerName.includes("fries") || lowerName.includes("king") || lowerName.includes("mcdonald") || lowerName.includes("roll")) {
        cuisines = ["fast-food"];
      } else if (lowerName.includes("sweet") || lowerName.includes("cake") || lowerName.includes("ice cream") || lowerName.includes("waffle") || lowerName.includes("cream") || lowerName.includes("dessert")) {
        cuisines = ["desserts"];
      } else {
        // Default North Indian/Mughlai categories
        cuisines = ["indian"];
      }
      
      // Map Diets dynamically: Udupi, Sagar, Veg tags, Cafe chains, Cakes are primarily Veg
      let diets = ["veg", "non-veg"];
      if (lowerName.includes("veg") || lowerName.includes("udupi") || lowerName.includes("sagar") || lowerName.includes("brahmin") || lowerName.includes("bhojana") || lowerName.includes("sweets") || lowerName.includes("ice cream") || lowerName.includes("waffle") || lowerName.includes("cake")) {
        diets = ["veg"];
      }
      
      parsed.push({
        name,
        onlineOrder,
        bookTable,
        rate,
        votes,
        approxCost: approxCostForTwo > 0 ? approxCostForTwo / 2 : 200, // Cost per person
        type,
        cuisines,
        diets
      });
    }
  }
  
  return parsed.length > 0 ? parsed : null;
}

// Fetch Zomato CSV at Startup
async function initDatabase() {
  try {
    console.log("Meal Curator: Fetching Zomato-data-.csv...");
    const response = await fetch("Zomato-data-.csv");
    if (!response.ok) throw new Error("Network response error fetching CSV");
    
    const csvText = await response.text();
    const parsedData = parseZomatoCSV(csvText);
    
    if (parsedData) {
      database = parsedData;
      console.log(`Meal Curator: Dynamic CSV Engine Loaded successfully. Analyzed ${database.length} restaurants.`);
    } else {
      throw new Error("CSV parsing returned empty data");
    }
  } catch (error) {
    console.warn("Meal Curator Fetch Warning:", error.message);
    console.log("Meal Curator CORS/Environment Warning: Fetch blocked or CSV empty. Loading high-fidelity Bengaluru database successfully!");
    // Fallback is already initialized in state
  }
}

initDatabase();

// ==========================================================================
// 3. Form Interactivity & Widget Controllers
// ==========================================================================

// Cuisine Cards selection
cuisineCards.forEach(card => {
  card.addEventListener("click", () => {
    cuisineCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedCuisine = card.getAttribute("data-value");
  });
});

// Diet selection
dietBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    dietBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDiet = btn.getAttribute("data-diet");
  });
});

// Servings plate counter
function updateServingsDOM() {
  servingsCountText.textContent = servingsCount;
  servingsLabel.textContent = servingsCount === 1 ? "Person" : "People";
  
  // Update servings plates display emojis dynamically
  let plates = "";
  for (let i = 0; i < servingsCount; i++) {
    plates += "🍽️";
  }
  servingsVisual.textContent = plates;
}

minusBtn.addEventListener("click", () => {
  if (servingsCount > 1) {
    servingsCount--;
    updateServingsDOM();
  }
});

plusBtn.addEventListener("click", () => {
  if (servingsCount < 8) {
    servingsCount++;
    updateServingsDOM();
  }
});

// Neon Budget Slider & Vibe Indicators
budgetSlider.addEventListener("input", () => {
  const value = parseInt(budgetSlider.value);
  budgetDisplay.textContent = `₹${value}`;
  
  // Categorize vibe tiers
  if (value < 250) {
    budgetVibe.innerHTML = "💸 <strong>Street Food Master:</strong> Budget-friendly authentic local bites!";
  } else if (value < 550) {
    budgetVibe.innerHTML = "🍔 <strong>Casual Feast:</strong> Generous portions from cozy mid-tier cafes.";
  } else if (value < 1200) {
    budgetVibe.innerHTML = "✨ <strong>Gourmet Dining:</strong> Upscale cuisines and premium ingredients.";
  } else {
    budgetVibe.innerHTML = "👑 <strong>Galactic Feast:</strong> A luxury culinary experience with zero limits!";
  }
});

// ==========================================================================
// 4. Meal Curation Core Engine & Simulated Cooking Loader
// ==========================================================================
function curateMeal(surprise = false) {
  // Capture UI values
  let cuisine = selectedCuisine;
  let diet = selectedDiet;
  const totalBudget = parseInt(budgetSlider.value);
  const servings = servingsCount;
  const mealType = mealTypeSelect.value;
  
  // Reset customizer state
  dessertAdded = null;
  addDessertBtn.textContent = "Add";
  addDessertBtn.classList.remove("added");
  
  // Surprise mode randomized fields
  if (surprise) {
    // 1. Pick a random cuisine from available keys
    const cuisines = ["indian", "south-indian", "chinese", "italian", "fast-food", "cafes", "desserts"];
    cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
    
    // Select correct card in UI
    cuisineCards.forEach(c => {
      c.classList.remove("active");
      if (c.getAttribute("data-value") === cuisine) c.classList.add("active");
    });
    selectedCuisine = cuisine;
    
    // 2. Pick random diet
    const diets = ["veg", "non-veg"];
    diet = diets[Math.floor(Math.random() * diets.length)];
    dietBtns.forEach(b => {
      b.classList.remove("active");
      if (b.getAttribute("data-diet") === diet) b.classList.add("active");
    });
    selectedDiet = diet;
    
    // 3. Randomize budget slider value slightly
    const randomBudgets = [250, 450, 600, 800, 1200, 1500];
    const pickedBudget = randomBudgets[Math.floor(Math.random() * randomBudgets.length)];
    budgetSlider.value = pickedBudget;
    budgetDisplay.textContent = `₹${pickedBudget}`;
    budgetSlider.dispatchEvent(new Event("input"));
  }
  
  // Toggle states to Loading
  emptyState.classList.remove("active");
  resultState.classList.remove("active");
  loadingState.classList.add("active");
  
  // Trigger Frying Pan Loading Animation
  const foodEmojis = ["🍛", "🍕", "🥞", "🍔", "🧁", "🍩", "🍵", "🌶️"];
  const loadingFoodNodes = document.querySelectorAll(".flying-food");
  
  loadingFoodNodes.forEach(node => {
    // Assign random emojis
    node.textContent = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    
    // Assign randomized CSS animations properties
    const randomLeft = 35 + Math.random() * 25; // 35% - 60%
    const mxVal = -40 + Math.random() * 80;     // -40px to 40px
    const txVal = -30 + Math.random() * 60;     // -30px to 30px
    
    node.style.left = `${randomLeft}%`;
    node.style.setProperty("--mx", `${mxVal}px`);
    node.style.setProperty("--tx", `${txVal}px`);
  });
  
  // Spin restaurant slot-machine names
  let slotIteration = 0;
  const slotInterval = setInterval(() => {
    const shuffleArray = [...database];
    shuffleArray.sort(() => 0.5 - Math.random());
    const slice = shuffleArray.slice(0, 6);
    
    reelStrip.innerHTML = slice.map(item => `<div>${item.name}</div>`).join("");
    slotIteration++;
    if (slotIteration > 10) clearInterval(slotInterval);
  }, 120);

  // Compute result after a simulated "cooking time" (1.5s)
  setTimeout(() => {
    clearInterval(slotInterval);
    loadingState.classList.remove("active");
    
    // Filter database for options matching cuisine & diet & per-person budget
    const budgetPerPerson = totalBudget / servings;
    
    const candidates = database.filter(rest => {
      const matchCuisine = rest.cuisines.includes(cuisine);
      const matchDiet = rest.diets.includes(diet);
      const matchBudget = rest.approxCost <= budgetPerPerson;
      return matchCuisine && matchDiet && matchBudget;
    });
    
    if (candidates.length === 0) {
      // Show custom "No Matches" result card inside results
      resultRestName.textContent = "😔 Chef's Low Budget Warning";
      resultRestRating.textContent = "⭐ N/A";
      resultRestVotes.textContent = "0 votes";
      resultCostForTwo.textContent = "Too low";
      resultRestType.textContent = `No ${diet} ${cuisine} candidates under ₹${budgetPerPerson.toFixed(0)} per person.`;
      
      resultItemsList.innerHTML = `
        <li style="border-bottom: none; color: var(--text-muted);">
          <span class="item-icon">💡</span>
          <span class="item-name">Increase your budget limit or pick a different cuisine like South Indian / Fast Food.</span>
        </li>`;
      
      resultPerPersonPrice.textContent = "₹0";
      resultServingsMultiplier.textContent = `x ${servings}`;
      resultTotalPrice.textContent = "₹0";
      dessertWidget.style.display = "none";
      
      // Disable delivery links
      swiggyLink.href = "#";
      zomatoLink.href = "#";
      
      resultState.classList.add("active");
      return;
    }
    
    // Pick the best rated restaurant from candidates, with slight randomness to make searches exciting!
    candidates.sort((a, b) => b.rate - a.rate);
    const topFraction = candidates.slice(0, Math.max(1, Math.floor(candidates.length / 2)));
    const selectedRest = topFraction[Math.floor(Math.random() * topFraction.length)];
    
    // Build combo dishes
    const options = dishDatabase[cuisine]?.[diet] || dishDatabase[cuisine]?.["veg"] || [];
    const dish = options[Math.floor(Math.random() * options.length)] || {
      name: "Assorted Chef Special Combination Platter",
      items: ["Signature Main Dish", "Traditional Accompaniments", "Cold Beverages"]
    };
    
    // Cost Calculations
    // Base cost is derived from restaurant's approx cost per person with slight variation
    const variation = -20 + Math.floor(Math.random() * 40); // -20 to 20
    const calculatedPerPersonCost = Math.max(50, selectedRest.approxCost + variation);
    baseMealCost = calculatedPerPersonCost * servings;
    curatedMealCost = baseMealCost;
    
    // Fill result data
    resultRestName.textContent = selectedRest.name;
    resultRestRating.textContent = `⭐ ${selectedRest.rate || "3.8"}`;
    resultRestVotes.textContent = `${selectedRest.votes || "150"}+ votes`;
    resultCostForTwo.textContent = `₹${(selectedRest.approxCost * 2).toFixed(0)} for two`;
    resultRestType.textContent = `${selectedRest.type} • Bengaluru`;
    
    // Render combo items list
    resultItemsList.innerHTML = dish.items.map(item => `
      <li>
        <span class="item-icon">✓</span>
        <span class="item-name">${item}</span>
      </li>
    `).join("");
    
    updatePriceDisplay();
    
    // Initialize Delivery Links (deep search query parameters)
    const searchQuery = encodeURIComponent(`${selectedRest.name} Bangalore`);
    swiggyLink.href = `https://www.swiggy.com/search?query=${searchQuery}`;
    zomatoLink.href = `https://www.zomato.com/bangalore/delivery?q=${searchQuery}`;
    
    // ==========================================================================
    // Dessert customizer add-on trigger
    // ==========================================================================
    const remainingBudget = totalBudget - curatedMealCost;
    
    if (remainingBudget >= 60 && cuisine !== "desserts") {
      // Find a sweet option that fits the remaining budget
      const affordableDesserts = dessertMenu.filter(d => d.price * servings <= remainingBudget);
      
      if (affordableDesserts.length > 0) {
        const pickedDessert = affordableDesserts[Math.floor(Math.random() * affordableDesserts.length)];
        
        dessertProposalText.innerHTML = `Add <strong>${pickedDessert.name} x${servings}</strong> from <em>${pickedDessert.restaurant}</em> (+₹${pickedDessert.price * servings})`;
        dessertRemainingText.textContent = `You have ₹${remainingBudget} remaining in your budget!`;
        dessertWidget.style.display = "block";
        
        // Setup click handler for dessert adder
        addDessertBtn.onclick = () => {
          if (!dessertAdded) {
            dessertAdded = pickedDessert;
            curatedMealCost = baseMealCost + (pickedDessert.price * servings);
            
            // Render dessert item dynamically in the lists
            const dessertLi = document.createElement("li");
            dessertLi.id = "dessertItemRow";
            dessertLi.style.color = "#ff75b5";
            dessertLi.innerHTML = `
              <span class="item-icon">🍰</span>
              <span class="item-name">${pickedDessert.name} x${servings} (Add-on)</span>
            `;
            resultItemsList.appendChild(dessertLi);
            
            addDessertBtn.textContent = "Added!";
            addDessertBtn.classList.add("added");
            updatePriceDisplay();
          }
        };
      } else {
        dessertWidget.style.display = "none";
      }
    } else {
      dessertWidget.style.display = "none";
    }
    
    resultState.classList.add("active");
  }, 1500);
}

// Render total pricing rows
function updatePriceDisplay() {
  const costPerPerson = curatedMealCost / servingsCount;
  resultPerPersonPrice.textContent = `₹${costPerPerson.toFixed(0)}`;
  resultServingsMultiplier.textContent = `x ${servingsCount}`;
  resultTotalPrice.textContent = `₹${curatedMealCost.toFixed(0)}`;
}

// Action button listeners
curateBtn.addEventListener("click", () => curateMeal(false));
surpriseBtn.addEventListener("click", () => curateMeal(true));