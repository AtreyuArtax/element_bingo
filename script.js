// --- Global Page Management ---
const bingoCallerPage = document.getElementById('bingoCallerPage');
const cardGeneratorPage = document.getElementById('cardGeneratorPage');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const showCallerBtn = document.getElementById('showCallerBtn');
const showGeneratorBtn = document.getElementById('showGeneratorBtn');

// Get both menu buttons
const menuButtonCaller = document.getElementById('menuButtonCaller');
const menuButtonGenerator = document.getElementById('menuButtonGenerator');

function showPage(pageId) {
  bingoCallerPage.style.display = 'none';
  cardGeneratorPage.style.display = 'none';
  if (pageId === 'bingoCaller') {
    bingoCallerPage.style.display = 'block';
    document.title = "Chemistry Element Bingo Caller"; // Update title
  } else if (pageId === 'cardGenerator') {
    cardGeneratorPage.style.display = 'block';
    document.title = "Element Bingo Card Generator"; // Update title
    // Ensure card generator elements are initialized/updated when shown
    if (!cardGeneratorPage.dataset.initialized) {
      setupCardGeneratorListeners();
      generatePreview(); // Generate initial preview
      cardGeneratorPage.dataset.initialized = 'true';
    }
  }
  hideMenu();
}

function toggleMenu() {
  menuOverlay.classList.toggle('open');
}

function hideMenu() {
  menuOverlay.classList.remove('open');
}

// --- Centralized Element Data ---
// Detailed data for all 118 elements. This remains the primary source of element information.
const elementDetails = {
  "1": { name: "Hydrogen", symbol: "H", atomicNumber: 1, atomicMass: "1.008 u", commonIonicCharges: ["+1", "-1"], state: "gas" },
  "2": { name: "Helium", symbol: "He", atomicNumber: 2, atomicMass: "4.0026 u", commonIonicCharges: [], state: "gas" },
  "3": { name: "Lithium", symbol: "Li", atomicNumber: 3, atomicMass: "6.94 u", commonIonicCharges: ["+1"], state: "solid" },
  "4": { name: "Beryllium", symbol: "Be", atomicNumber: 4, atomicMass: "9.0122 u", commonIonicCharges: ["+2"], state: "solid" },
  "5": { name: "Boron", symbol: "B", atomicNumber: 5, atomicMass: "10.81 u", commonIonicCharges: ["+3"], state: "solid" },
  "6": { name: "Carbon", symbol: "C", atomicNumber: 6, atomicMass: "12.011 u", commonIonicCharges: ["+4", "-4"], state: "solid" },
  "7": { name: "Nitrogen", symbol: "N", atomicNumber: 7, atomicMass: "14.007 u", commonIonicCharges: ["-3"], state: "gas" },
  "8": { name: "Oxygen", symbol: "O", atomicNumber: 8, atomicMass: "15.999 u", commonIonicCharges: ["-2"], state: "gas" },
  "9": { name: "Fluorine", symbol: "F", atomicNumber: 9, atomicMass: "18.998 u", commonIonicCharges: ["-1"], state: "gas" },
  "10": { name: "Neon", symbol: "Ne", atomicNumber: 10, atomicMass: "20.180 u", commonIonicCharges: [], state: "gas" },
  "11": { name: "Sodium", symbol: "Na", atomicNumber: 11, atomicMass: "22.990 u", commonIonicCharges: ["+1"], state: "solid" },
  "12": { name: "Magnesium", symbol: "Mg", atomicNumber: 12, atomicMass: "24.305 u", commonIonicCharges: ["+2"], state: "solid" },
  "13": { name: "Aluminum", symbol: "Al", atomicNumber: 13, atomicMass: "26.982 u", commonIonicCharges: ["+3"], state: "solid" },
  "14": { name: "Silicon", symbol: "Si", atomicNumber: 14, atomicMass: "28.085 u", commonIonicCharges: ["+4", "-4"], state: "solid" },
  "15": { name: "Phosphorus", symbol: "P", atomicNumber: 15, atomicMass: "30.974 u", commonIonicCharges: ["-3", "+3", "+5"], state: "solid" },
  "16": { name: "Sulfur", symbol: "S", atomicNumber: 16, atomicMass: "32.06 u", commonIonicCharges: ["-2"], state: "solid" },
  "17": { name: "Chlorine", symbol: "Cl", atomicNumber: 17, atomicMass: "35.45 u", commonIonicCharges: ["-1"], state: "gas" },
  "18": { name: "Argon", symbol: "Ar", atomicNumber: 18, atomicMass: "39.948 u", commonIonicCharges: [], state: "gas" },
  "19": { name: "Potassium", symbol: "K", atomicNumber: 19, atomicMass: "39.098 u", commonIonicCharges: ["+1"], state: "solid" },
  "20": { name: "Calcium", symbol: "Ca", atomicNumber: 20, atomicMass: "40.078 u", commonIonicCharges: ["+2"], state: "solid" },
  "21": { name: "Scandium", symbol: "Sc", atomicNumber: 21, atomicMass: "44.956 u", commonIonicCharges: ["+3"], state: "solid" },
  "22": { name: "Titanium", symbol: "Ti", atomicNumber: 22, atomicMass: "47.867 u", commonIonicCharges: ["+4"], state: "solid" },
  "23": { name: "Vanadium", symbol: "V", atomicNumber: 23, atomicMass: "50.942 u", commonIonicCharges: ["+3", "+4", "+5"], state: "solid" },
  "24": { name: "Chromium", symbol: "Cr", atomicNumber: 24, atomicMass: "51.996 u", commonIonicCharges: ["+2", "+3", "+6"], state: "solid" },
  "25": { name: "Manganese", symbol: "Mn", atomicNumber: 25, atomicMass: "54.938 u", commonIonicCharges: ["+2", "+3", "+4", "+7"], state: "solid" },
  "26": { name: "Iron", symbol: "Fe", atomicNumber: 26, atomicMass: "55.845 u", commonIonicCharges: ["+2", "+3"], state: "solid" },
  "27": { name: "Cobalt", symbol: "Co", atomicNumber: 27, atomicMass: "58.933 u", commonIonicCharges: ["+2", "+3"], state: "solid" },
  "28": { name: "Nickel", symbol: "Ni", atomicNumber: 28, atomicMass: "58.693 u", commonIonicCharges: ["+2"], state: "solid" },
  "29": { name: "Copper", symbol: "Cu", atomicNumber: 29, atomicMass: "63.546 u", commonIonicCharges: ["+1", "+2"], state: "solid" },
  "30": { name: "Zinc", symbol: "Zn", atomicNumber: 30, atomicMass: "65.38 u", commonIonicCharges: ["+2"], state: "solid" },
  "31": { name: "Gallium", symbol: "Ga", atomicNumber: 31, atomicMass: "69.723 u", commonIonicCharges: ["+3"], state: "solid" },
  "32": { name: "Germanium", symbol: "Ge", atomicNumber: 32, atomicMass: "72.63 u", commonIonicCharges: ["+4"], state: "solid" },
  "33": { name: "Arsenic", symbol: "As", atomicNumber: 33, atomicMass: "74.922 u", commonIonicCharges: ["-3", "+3", "+5"], state: "solid" },
  "34": { name: "Selenium", symbol: "Se", atomicNumber: 34, atomicMass: "78.971 u", commonIonicCharges: ["-2"], state: "solid" },
  "35": { name: "Bromine", symbol: "Br", atomicNumber: 35, atomicMass: "79.904 u", commonIonicCharges: ["-1"], state: "liquid" },
  "36": { name: "Krypton", symbol: "Kr", atomicNumber: 36, atomicMass: "83.798 u", commonIonicCharges: [], state: "gas" },
  "37": { name: "Rubidium", symbol: "Rb", atomicNumber: 37, atomicMass: "85.468 u", commonIonicCharges: ["+1"], state: "solid" },
  "38": { name: "Strontium", symbol: "Sr", atomicNumber: 38, atomicMass: "87.62 u", commonIonicCharges: ["+2"], state: "solid" },
  "39": { name: "Yttrium", symbol: "Y", atomicNumber: 39, atomicMass: "88.906 u", commonIonicCharges: ["+3"], state: "solid" },
  "40": { name: "Zirconium", symbol: "Zr", atomicNumber: 40, atomicMass: "91.224 u", commonIonicCharges: ["+4"], state: "solid" },
  "41": { name: "Niobium", symbol: "Nb", atomicNumber: 41, atomicMass: "92.906 u", commonIonicCharges: ["+5"], state: "solid" },
  "42": { name: "Molybdenum", symbol: "Mo", atomicNumber: 42, atomicMass: "95.95 u", commonIonicCharges: ["+6"], state: "solid" },
  "43": { name: "Technetium", symbol: "Tc", atomicNumber: 43, atomicMass: "(98) u", commonIonicCharges: ["+7"], state: "synthetic" },
  "44": { name: "Ruthenium", symbol: "Ru", atomicNumber: 44, atomicMass: "101.07 u", commonIonicCharges: ["+3", "+4"], state: "solid" },
  "45": { name: "Rhodium", symbol: "Rh", atomicNumber: 45, atomicMass: "102.91 u", commonIonicCharges: ["+3"], state: "solid" },
  "46": { name: "Palladium", symbol: "Pd", atomicNumber: 46, atomicMass: "106.42 u", commonIonicCharges: ["+2", "+4"], state: "solid" },
  "47": { name: "Silver", symbol: "Ag", atomicNumber: 47, atomicMass: "107.87 u", commonIonicCharges: ["+1"], state: "solid" },
  "48": { name: "Cadmium", symbol: "Cd", atomicNumber: 48, atomicMass: "112.41 u", commonIonicCharges: ["+2"], state: "solid" },
  "49": { name: "Indium", symbol: "In", atomicNumber: 49, atomicMass: "114.82 u", commonIonicCharges: ["+3"], state: "solid" },
  "50": { name: "Tin", symbol: "Sn", atomicNumber: 50, atomicMass: "118.71 u", commonIonicCharges: ["+2", "+4"], state: "solid" },
  "51": { name: "Antimony", symbol: "Sb", atomicNumber: 51, atomicMass: "121.76 u", commonIonicCharges: ["-3", "+3", "+5"], state: "solid" },
  "52": { name: "Tellurium", symbol: "Te", atomicNumber: 52, atomicMass: "127.60 u", commonIonicCharges: ["-2", "+4", "+6"], state: "solid" },
  "53": { name: "Iodine", symbol: "I", atomicNumber: 53, atomicMass: "126.90 u", commonIonicCharges: ["-1"], state: "solid" },
  "54": { name: "Xenon", symbol: "Xe", atomicNumber: 54, atomicMass: "131.29 u", commonIonicCharges: [], state: "gas" },
  "55": { name: "Cesium", symbol: "Cs", atomicNumber: 55, atomicMass: "132.91 u", commonIonicCharges: ["+1"], state: "solid" },
  "56": { name: "Barium", symbol: "Ba", atomicNumber: 56, atomicMass: "137.33 u", commonIonicCharges: ["+2"], state: "solid" },
  "57": { name: "Lanthanum", symbol: "La", atomicNumber: 57, atomicMass: "138.91 u", commonIonicCharges: ["+3"], state: "solid" },
  "58": { name: "Cerium", symbol: "Ce", atomicNumber: 58, atomicMass: "140.12 u", commonIonicCharges: ["+3", "+4"], state: "solid" },
  "59": { name: "Praseodymium", symbol: "Pr", atomicNumber: 59, atomicMass: "140.91 u", commonIonicCharges: ["+3"], state: "solid" },
  "60": { name: "Neodymium", symbol: "Nd", atomicNumber: 60, atomicMass: "144.24 u", commonIonicCharges: ["+3"], state: "solid" },
  "61": { name: "Promethium", symbol: "Pm", atomicNumber: 61, atomicMass: "(145) u", commonIonicCharges: ["+3"], state: "synthetic" },
  "62": { name: "Samarium", symbol: "Sm", atomicNumber: 62, atomicMass: "150.36 u", commonIonicCharges: ["+2", "+3"], state: "solid" },
  "63": { name: "Europium", symbol: "Eu", atomicNumber: 63, atomicMass: "151.96 u", commonIonicCharges: ["+2", "+3"], state: "solid" },
  "64": { name: "Gadolinium", symbol: "Gd", atomicNumber: 64, atomicMass: "157.25 u", commonIonicCharges: ["+3"], state: "solid" },
  "65": { name: "Terbium", symbol: "Tb", atomicNumber: 65, atomicMass: "158.93 u", commonIonicCharges: ["+3", "+4"], state: "solid" },
  "66": { name: "Dysprosium", symbol: "Dy", atomicNumber: 66, atomicMass: "162.50 u", commonIonicCharges: ["+3"], state: "solid" },
  "67": { name: "Holmium", symbol: "Ho", atomicNumber: 67, atomicMass: "164.93 u", commonIonicCharges: ["+3"], state: "solid" },
  "68": { name: "Erbium", symbol: "Er", atomicNumber: 68, atomicMass: "167.26 u", commonIonicCharges: ["+3"], state: "solid" },
  "69": { name: "Thulium", symbol: "Tm", atomicNumber: 69, atomicMass: "168.93 u", commonIonicCharges: ["+2", "+3"], state: "solid" },
  "70": { name: "Ytterbium", symbol: "Yb", atomicNumber: 70, atomicMass: "173.05 u", commonIonicCharges: ["+2", "+3"], state: "solid" },
  "71": { name: "Lutetium", symbol: "Lu", atomicNumber: 71, atomicMass: "174.97 u", commonIonicCharges: ["+3"], state: "solid" },
  "72": { name: "Hafnium", symbol: "Hf", atomicNumber: 72, atomicMass: "178.49 u", commonIonicCharges: ["+4"], state: "solid" },
  "73": { name: "Tantalum", symbol: "Ta", atomicNumber: 73, atomicMass: "180.95 u", commonIonicCharges: ["+5"], state: "solid" },
  "74": { name: "Tungsten", symbol: "W", atomicNumber: 74, atomicMass: "183.84 u", commonIonicCharges: ["+6"], state: "solid" },
  "75": { name: "Rhenium", symbol: "Re", atomicNumber: 75, atomicMass: "186.21 u", commonIonicCharges: ["+7"], state: "solid" },
  "76": { name: "Osmium", symbol: "Os", atomicNumber: 76, atomicMass: "190.23 u", commonIonicCharges: ["+4"], state: "solid" },
  "77": { name: "Iridium", symbol: "Ir", atomicNumber: 77, atomicMass: "192.22 u", commonIonicCharges: ["+3", "+4"], state: "solid" },
  "78": { name: "Platinum", symbol: "Pt", atomicNumber: 78, atomicMass: "195.08 u", commonIonicCharges: ["+2", "+4"], state: "solid" },
  "79": { name: "Gold", symbol: "Au", atomicNumber: 79, atomicMass: "196.97 u", commonIonicCharges: ["+1", "+3"], state: "solid" },
  "80": { name: "Mercury", symbol: "Hg", atomicNumber: 80, atomicMass: "200.59 u", commonIonicCharges: ["+1", "+2"], state: "liquid" },
  "81": { name: "Thallium", symbol: "Tl", atomicNumber: 81, atomicMass: "204.38 u", commonIonicCharges: ["+1", "+3"], state: "solid" },
  "82": { name: "Lead", symbol: "Pb", atomicNumber: 82, atomicMass: "207.2 u", commonIonicCharges: ["+2", "+4"], state: "solid" },
  "83": { name: "Bismuth", symbol: "Bi", atomicNumber: 83, atomicMass: "208.98 u", commonIonicCharges: ["+3"], state: "solid" },
  "84": { name: "Polonium", symbol: "Po", atomicNumber: 84, atomicMass: "(209) u", commonIonicCharges: ["+2", "+4"], state: "solid" },
  "85": { name: "Astatine", symbol: "At", atomicNumber: 85, atomicMass: "(210) u", commonIonicCharges: ["-1", "+1"], state: "solid" },
  "86": { name: "Radon", symbol: "Rn", atomicNumber: 86, atomicMass: "(222) u", commonIonicCharges: [], state: "gas" },
  "87": { name: "Francium", symbol: "Fr", atomicNumber: 87, atomicMass: "(223) u", commonIonicCharges: ["+1"], state: "synthetic" },
  "88": { name: "Radium", symbol: "Ra", atomicNumber: 88, atomicMass: "(226) u", commonIonicCharges: ["+2"], state: "synthetic" },
  "89": { name: "Actinium", symbol: "Ac", atomicNumber: 89, atomicMass: "(227) u", commonIonicCharges: ["+3"], state: "synthetic" },
  "90": { name: "Thorium", symbol: "Th", atomicNumber: 90, atomicMass: "232.04 u", commonIonicCharges: ["+4"], state: "solid" },
  "91": { name: "Protactinium", symbol: "Pa", atomicNumber: 91, atomicMass: "231.04 u", commonIonicCharges: ["+4", "+5"], state: "solid" },
  "92": { name: "Uranium", symbol: "U", atomicNumber: 92, atomicMass: "238.03 u", commonIonicCharges: ["+3", "+4", "+6"], state: "solid" },
  "93": { name: "Neptunium", symbol: "Np", atomicNumber: 93, atomicMass: "(237) u", commonIonicCharges: ["+3", "+4", "+5", "+6"], state: "synthetic" },
  "94": { name: "Plutonium", symbol: "Pu", atomicNumber: 94, atomicMass: "(244) u", commonIonicCharges: ["+3", "+4"], state: "synthetic" },
  "95": { name: "Americium", symbol: "Am", atomicNumber: 95, atomicMass: "(243) u", commonIonicCharges: ["+3"], state: "synthetic" },
  "96": { name: "Curium", symbol: "Cm", atomicNumber: 96, atomicMass: "(247) u", commonIonicCharges: ["+3"], state: "synthetic" },
  "97": { name: "Berkelium", symbol: "Bk", atomicNumber: 97, atomicMass: "(247) u", commonIonicCharges: ["+3", "+4"], state: "synthetic" },
  "98": { name: "Californium", symbol: "Cf", atomicNumber: 98, atomicMass: "(251) u", commonIonicCharges: ["+3"], state: "synthetic" },
  "99": { name: "Einsteinium", symbol: "Es", atomicNumber: 99, atomicMass: "(252) u", commonIonicCharges: ["+2", "+3"], state: "synthetic" },
  "100": { name: "Fermium", symbol: "Fm", atomicNumber: 100, atomicMass: "(257) u", commonIonicCharges: ["+2", "+3"], state: "synthetic" },
  "101": { name: "Mendelevium", symbol: "Md", atomicNumber: 101, atomicMass: "(258) u", commonIonicCharges: ["+2", "+3"], state: "synthetic" },
  "102": { name: "Nobelium", symbol: "No", atomicNumber: 102, atomicMass: "(259) u", commonIonicCharges: ["+2", "+3"], state: "synthetic" },
  "103": { name: "Lawrencium", symbol: "Lr", atomicNumber: 103, atomicMass: "(262) u", commonIonicCharges: ["+3"], state: "synthetic" },
  "104": { name: "Rutherfordium", symbol: "Rf", atomicNumber: 104, atomicMass: "(267) u", commonIonicCharges: ["+4"], state: "synthetic" },
  "105": { name: "Dubnium", symbol: "Db", atomicNumber: 105, atomicMass: "(268) u", commonIonicCharges: ["+5"], state: "synthetic" },
  "106": { name: "Seaborgium", symbol: "Sg", atomicNumber: 106, atomicMass: "(271) u", commonIonicCharges: ["+6"], state: "synthetic" },
  "107": { name: "Bohrium", symbol: "Bh", atomicNumber: 107, atomicMass: "(272) u", commonIonicCharges: ["+7"], state: "synthetic" },
  "108": { name: "Hassium", symbol: "Hs", atomicNumber: 108, atomicMass: "(277) u", commonIonicCharges: ["+8"], state: "synthetic" },
  "109": { name: "Meitnerium", symbol: "Mt", atomicNumber: 109, atomicMass: "(276) u", commonIonicCharges: ["+9"], state: "synthetic" },
  "110": { name: "Darmstadtium", symbol: "Ds", atomicNumber: 110, atomicMass: "(281) u", commonIonicCharges: ["+10"], state: "synthetic" },
  "111": { name: "Roentgenium", symbol: "Rg", atomicNumber: 111, atomicMass: "(280) u", commonIonicCharges: ["+11"], state: "synthetic" },
  "112": { name: "Copernicium", symbol: "Cn", atomicNumber: 112, atomicMass: "(285) u", commonIonicCharges: ["+12"], state: "synthetic" },
  "113": { name: "Nihonium", symbol: "Nh", atomicNumber: 113, atomicMass: "(286) u", commonIonicCharges: ["+1"], state: "synthetic" },
  "114": { name: "Flerovium", symbol: "Fl", atomicNumber: 114, atomicMass: "(289) u", commonIonicCharges: ["+2"], state: "synthetic" },
  "115": { name: "Moscovium", symbol: "Mc", atomicNumber: 115, atomicMass: "(290) u", commonIonicCharges: ["+1"], state: "synthetic" },
  "116": { name: "Livermorium", symbol: "Lv", atomicNumber: 116, atomicMass: "(293) u", commonIonicCharges: ["+2"], state: "synthetic" },
  "117": { name: "Tennessine", symbol: "Ts", atomicNumber: 117, atomicMass: "(294) u", commonIonicCharges: ["-1"], state: "synthetic" },
  "118": { name: "Oganesson", symbol: "Og", atomicNumber: 118, atomicMass: "(294) u", commonIonicCharges: [], state: "synthetic" }
};

// Centralized definitions of element sets by atomic number
const ELEMENT_SETS_ATOMIC_NUMBERS = {
  all: Array.from({ length: 118 }, (_, i) => i + 1), // All 118 elements
  top70: [ // Top 70 Common Elements
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 40, 41, 42, 46, 47, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 74, 78, 79, 80, 81, 82, 83, 84, 85, 86,
    87, 88, 92, 94, 96, 99, 101, 102
  ],
  fiftySix: [ // 56 Common Elements
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 47, 48, 50, 51, 53, 54, 55, 56, 74, 78, 79, 80, 82, 86, 87, 88, 92, 94
  ]
};

/**
 * Retrieves an array of atomic numbers for a given game mode.
 * @param {string} mode - The game mode ('all', 'top70', 'fiftySix').
 * @returns {number[]} An array of atomic numbers.
 */
function getAtomicNumbersForMode(mode) {
  return ELEMENT_SETS_ATOMIC_NUMBERS[mode] ? ELEMENT_SETS_ATOMIC_NUMBERS[mode].slice() : [];
}

/**
 * Retrieves an array of element symbols for a given element set.
 * @param {string} set - The element set ('all', 'top70', 'fiftySix').
 * @returns {string[]} An array of element symbols.
 */
function getSymbolsForSet(set) {
  const atomicNumbers = ELEMENT_SETS_ATOMIC_NUMBERS[set];
  if (!atomicNumbers) return [];
  return atomicNumbers.map(num => elementDetails[num].symbol);
}

// --- Element Bingo Caller Script ---
// Simple function to determine approximate electron shell configuration.
function getElectronShells(Z) {
  let shells = [];
  const capacities = [2, 8, 18, 32, 18, 8]; // simplified capacities
  for (let cap of capacities) {
    if (Z > cap) {
      shells.push(cap);
      Z -= cap;
    } else {
      shells.push(Z);
      Z = 0;
      break;
    }
  }
  return shells;
}
function createBohrDiagram(atomicNumber) {
  const shells = getElectronShells(Number(atomicNumber));
  let html = '<div class="bohr-diagram"><strong>Bohr Diagram:</strong><br>';
  shells.forEach((electrons, index) => {
    html += `<div class="shell">Shell ${index + 1}: ${electrons} e⁻</div>`;
  });
  html += '</div>';
  return html;
}

// Family assignment function based on atomic number.
function assignFamilies() {
  document.querySelectorAll('td[id^="elem-"]').forEach(cell => {
    let atomic = Number(cell.getAttribute('data-atomic'));
    // Remove any previously assigned family classes.
    cell.classList.remove('alkali', 'alkaline-earth', 'transition', 'basic-metal', 'metalloid', 'nonmetal', 'halogen', 'noble', 'lanthanide', 'actinide');
    if ([3, 11, 19, 37, 55, 87].includes(atomic)) {
      cell.classList.add('alkali');
    } else if ([4, 12, 20, 38, 56, 88].includes(atomic)) {
      cell.classList.add('alkaline-earth');
    } else if ((atomic >= 21 && atomic <= 30) || (atomic >= 39 && atomic <= 48) ||
      (atomic >= 72 && atomic <= 80) || (atomic >= 104 && atomic <= 112)) {
      cell.classList.add('transition');
    } else if ([13, 31, 49, 50, 81, 82, 83].includes(atomic)) {
      cell.classList.add('basic-metal');
    } else if ([5, 14, 32, 33, 51, 52].includes(atomic)) {
      cell.classList.add('metalloid');
    } else if ([1, 6, 7, 8, 15, 16, 34].includes(atomic)) {
      cell.classList.add('nonmetal');
    } else if ([9, 17, 35, 53, 85].includes(atomic)) {
      cell.classList.add('halogen');
    } else if ([2, 10, 18, 36, 54, 86].includes(atomic)) {
      cell.classList.add('noble');
    } else if (atomic >= 57 && atomic <= 71) {
      cell.classList.add('lanthanide');
    } else if (atomic >= 89 && atomic <= 103) {
      cell.classList.add('actinide');
    }
    // Additional explicit assignments for exceptions:
    else if (atomic === 84) {
      cell.classList.add('metalloid');
    } else if (atomic >= 113 && atomic <= 115) {
      cell.classList.add('basic-metal');
    } else if (atomic === 116) {
      cell.classList.add('basic-metal');
    } else if (atomic === 117) {
      cell.classList.add('halogen');
    } else if (atomic === 118) {
      cell.classList.add('noble');
    }
  });
}

let remainingElements, currentElement;
let collapsedHeight = 0;
let desiredCollapseHeight = 0; // global variable for our desired collapse height
let isExpanded = false;
const rowHeight = 50;

function initBingoCaller() {
  const gameModeSelector = document.getElementById('gameMode');
  const currentElementDisplay = document.getElementById('currentElementDisplay');
  const calledList = document.getElementById('calledList');
  const calledContainer = document.getElementById('calledContainer');
  const toggleExpandButton = document.getElementById('toggleExpandButton');

  // Get elements based on selected game mode from the centralized source
  remainingElements = getAtomicNumbersForMode(gameModeSelector.value);

  // Reset each cell’s state.
  for (let i = 1; i <= 118; i++) {
    const cell = document.getElementById('elem-' + i);
    if (cell) {
      cell.classList.remove('current', 'called', 'recently-called'); // Also remove recently-called
    }
  }
  currentElement = null;
  currentElementDisplay.textContent = 'Element BINGO!';
  calledList.innerHTML = '';
  const tableWrapper = document.querySelector('.table-wrapper');
  desiredCollapseHeight = tableWrapper.offsetHeight - 20; // 20px shorter than the table wrapper
  collapsedHeight = desiredCollapseHeight;
  calledContainer.style.height = desiredCollapseHeight + "px";
  isExpanded = false;
  toggleExpandButton.style.display = "none";
  toggleExpandButton.textContent = "Expand";
  assignFamilies();
}

function checkOverflow() {
  const calledContainer = document.getElementById('calledContainer');
  const calledList = document.getElementById('calledList');
  const toggleExpandButton = document.getElementById('toggleExpandButton');

  if (isExpanded) {
    toggleExpandButton.style.display = "block";
  } else if (calledList.scrollHeight > (calledContainer.clientHeight - rowHeight)) {
    toggleExpandButton.style.display = "block";
  } else {
    toggleExpandButton.style.display = "none";
  }
}

// Custom message box function (replaces alert/confirm)
function showCustomMessageBox(message, type = 'info', callback = null) {
  const existingModal = document.getElementById('customMessageBox');
  if (existingModal) existingModal.remove(); // Remove any existing message box

  const modal = document.createElement('div');
  modal.id = 'customMessageBox';
  modal.classList.add('reset-modal-overlay'); // Reuse the overlay style
  modal.innerHTML = `
        <div class="reset-modal-content">
            <h2 class="text-xl font-bold text-gray-900 mb-4">${type === 'error' ? 'Error' : 'Notification'}</h2>
            <p class="text-gray-700 mb-6">${message}</p>
            <button id="messageBoxOkButton" class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 ease-in-out">
                OK
            </button>
        </div>
    `;
  document.body.appendChild(modal);

  document.getElementById('messageBoxOkButton').addEventListener('click', () => {
    modal.remove();
    if (callback) callback();
  });

  // Hide if clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      if (callback) callback();
    }
  });
}

function setupBingoCallerListeners() {
  const callButton = document.getElementById('callButton');
  const resetButton = document.getElementById('resetButton'); // This is the original reset button
  const gameModeSelector = document.getElementById('gameMode');
  const currentElementDisplay = document.getElementById('currentElementDisplay');
  const calledList = document.getElementById('calledList');
  const calledContainer = document.getElementById('calledContainer');
  const toggleExpandButton = document.getElementById('toggleExpandButton');
  const modalOverlay = document.getElementById('elementModal'); // Element details modal
  const modalName = document.getElementById('modalName');
  const modalAtomic = document.getElementById('modalAtomic');
  const modalMass = document.getElementById('modalMass');
  const modalCharges = document.getElementById('modalCharges');
  const modalState = document.getElementById('modalState');
  const modalClose = document.getElementById('modalClose');
  const bohrDiagramDiv = document.getElementById('bohrDiagram');

  // New: Reset Confirmation Modal elements
  const resetConfirmationModal = document.getElementById('resetConfirmationModal');
  const confirmResetButton = document.getElementById('confirmResetButton');
  const cancelResetButton = document.getElementById('cancelResetButton');

  gameModeSelector.addEventListener('change', initBingoCaller);

  function handleCall(atomicNumber) {
    const currentElementDisplay = document.getElementById('currentElementDisplay');
    const calledList = document.getElementById('calledList');

    // 1. Remove red outline from any previously recently-called cell
    document.querySelectorAll('td.recently-called').forEach(td => td.classList.remove('recently-called'));

    // 2. Process the element that was 'current' from the *previous* call
    if (currentElement !== null) {
      const prevCurrentCell = document.getElementById('elem-' + currentElement);
      if (prevCurrentCell) {
        prevCurrentCell.classList.remove('current'); // Remove 'current' status
        prevCurrentCell.classList.add('called'); // Mark it as 'called' (turns white)
        prevCurrentCell.classList.add('recently-called'); // Add red outline to this element

        // Add to the called list
        const li = document.createElement('li');
        li.textContent = elementDetails[currentElement].name;
        calledList.insertBefore(li, calledList.firstChild);
        checkOverflow();
      }
    }

    // 3. Mark the new element as current
    currentElement = atomicNumber;
    currentElementDisplay.textContent = elementDetails[atomicNumber].name;
  }

  callButton.addEventListener('click', function () {
    if (remainingElements.length === 0) {
      const currentElementDisplay = document.getElementById('currentElementDisplay');
      currentElementDisplay.textContent = "All elements have been called!";
      document.querySelectorAll('td.recently-called').forEach(td => td.classList.remove('recently-called'));
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingElements.length);
    const nextAtomic = remainingElements.splice(randomIndex, 1)[0];
    handleCall(nextAtomic);
  });

  // --- Secret Keyboard Shortcuts ---
  let keyBuffer = "";
  let keyTimer = null;

  document.addEventListener('keydown', function (e) {
    // Only listen if the bingo caller page is visible
    if (document.getElementById('bingoCallerPage').style.display === 'none') return;

    // Clear buffer after 2 seconds of inactivity
    if (keyTimer) clearTimeout(keyTimer);
    keyTimer = setTimeout(() => { keyBuffer = ""; }, 2000);

    if (e.key === 'Enter') {
      const symbol = keyBuffer.trim();
      if (symbol) {
        // Find element by symbol (case-insensitive for convenience)
        const elementEntry = Object.entries(elementDetails).find(([num, details]) =>
          details.symbol.toLowerCase() === symbol.toLowerCase()
        );

        if (elementEntry) {
          const atomicNumber = parseInt(elementEntry[0]);
          const index = remainingElements.indexOf(atomicNumber);

          if (index !== -1) {
            remainingElements.splice(index, 1);
            handleCall(atomicNumber);
          } else if (currentElement === atomicNumber) {
            // Already current, do nothing or show message
          } else {
            // Already called
            showCustomMessageBox(`${elementDetails[atomicNumber].name} has already been called.`);
          }
        }
      }
      keyBuffer = "";
    } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      keyBuffer += e.key;
    }
  });


  toggleExpandButton.addEventListener('click', function () {
    if (isExpanded) {
      calledContainer.style.height = desiredCollapseHeight + "px";
      toggleExpandButton.textContent = "Expand";
      isExpanded = false;
    } else {
      calledContainer.style.height = "auto";
      toggleExpandButton.textContent = "Collapse";
      isExpanded = true;
    }
  });

  // Modified: Reset button now shows confirmation modal
  resetButton.addEventListener('click', function () {
    resetConfirmationModal.classList.remove('hidden'); // Show the reset confirmation modal
  });

  // New: Event listener for "Confirm Reset" button
  confirmResetButton.addEventListener('click', () => {
    initBingoCaller(); // Perform the actual reset
    resetConfirmationModal.classList.add('hidden'); // Hide the modal
    //showCustomMessageBox('The game has been reset!'); // Show a custom success message
  });

  // New: Event listener for "Cancel Reset" button
  cancelResetButton.addEventListener('click', () => {
    resetConfirmationModal.classList.add('hidden'); // Hide the modal
  });

  // New: Hide reset confirmation modal if clicking outside its content
  resetConfirmationModal.addEventListener('click', (event) => {
    if (event.target === resetConfirmationModal) {
      resetConfirmationModal.classList.add('hidden');
    }
  });


  // Modal functionality (for element details)
  function showElementDetailsModal(details) {
    modalName.textContent = details.name;
    modalAtomic.textContent = details.atomicNumber;
    modalMass.textContent = details.atomicMass;
    modalCharges.textContent = details.commonIonicCharges.length ? details.commonIonicCharges.join(", ") : "None";
    modalState.textContent = details.state;
    bohrDiagramDiv.innerHTML = createBohrDiagram(details.atomicNumber);
    modalOverlay.style.display = "flex";
  }

  function hideElementDetailsModal() { // Renamed to avoid conflict
    modalOverlay.style.display = "none";
  }

  // Attach event listeners to each periodic table cell
  document.querySelectorAll('td[id^="elem-"]').forEach(cell => {
    cell.addEventListener('click', function (e) {
      if (cell.classList.contains('empty') || cell.classList.contains('label')) return;
      const atomic = cell.getAttribute('data-atomic');
      // Use the centralized elementDetails object directly
      const details = elementDetails[atomic];
      if (details) {
        showElementDetailsModal(details);
      } else {
        console.error("Element details not found for atomic number:", atomic);
      }
      e.stopPropagation();
    });
  });

  modalClose.addEventListener('click', hideElementDetailsModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) hideElementDetailsModal();
  });
}


// --- Card Generator Script ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function combination(n, r) {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r;
  let num = 1,
    den = 1;
  for (let i = 0; i < r; i++) {
    num *= (n - i);
    den *= (i + 1);
  }
  return Math.round(num / den);
}

function pWinSingle(k, T) {
  const C = (n, r) => combination(n, r);
  let p4_line = (k >= 4 && T >= 4) ? C(k, 4) / C(T, 4) : 0;
  let p5_line = (k >= 5 && T >= 5) ? C(k, 5) / C(T, 5) : 0;
  p4_line = Math.min(1, p4_line);
  p5_line = Math.min(1, p5_line);
  let p_not_win_4 = Math.pow(1 - p4_line, 4);
  let p_not_win_5 = Math.pow(1 - p5_line, 8);
  let p_win = 1 - (p_not_win_4 * p_not_win_5);
  return Math.max(0, Math.min(1, p_win));
}

function updateInfoBox(elementsList) {
  const numCards = parseInt(document.getElementById("numCards").value) || 1;
  const T = elementsList.length;
  const infoBox = document.getElementById("infoBox");

  if (T < 24) {
    infoBox.innerHTML = `<strong>Warning:</strong> Element set has only ${T} items. Need at least 24. Probabilities cannot be calculated.`;
    return;
  }

  let k_med = 4;
  let p_total_med = 0;
  while (k_med <= T && p_total_med < 0.5) {
    let p_single = pWinSingle(k_med, T);
    p_total_med = 1 - Math.pow(1 - p_single, numCards);
    if (p_total_med >= 0.5) break;
    k_med++;
  }
  if (k_med > T) k_med = T;

  let k_1percent = 4;
  let p_total_1percent = 0;
  while (k_1percent <= T && p_total_1percent < 0.01) {
    let p_single = pWinSingle(k_1percent, T);
    p_total_1percent = 1 - Math.pow(1 - p_single, numCards);
    if (p_total_1percent >= 0.01) break;
    k_1percent++;
  }
  if (k_1percent > T) k_1percent = T;

  let k_single_50 = 4;
  let p_single_50 = 0;
  while (k_single_50 <= T && p_single_50 < 0.5) {
    p_single_50 = pWinSingle(k_single_50, T);
    if (p_single_50 >= 0.5) break;
    k_single_50++;
  }
  if (k_single_50 > T) k_single_50 = T;

  let expectedWinners = numCards * pWinSingle(k_med, T);
  const infoText = `<strong>Probabilities (Approx.)</strong><br>Using <strong>${T}</strong> elements for <strong>${numCards}</strong> player(s):<br>• ~<strong>${k_med}</strong> calls needed for ≥ 50% chance of <i>any</i> winner.<br>• ~<strong>${k_med}</strong> calls needed for ≥ 50% chance of <i>any</i> winner.<br>• ~<strong>${k_1percent}</strong> calls needed for ≥ 1% chance of <i>any</i> winner.<br>• ~<strong>${k_single_50}</strong> calls needed for ≥ 50% chance for a <i>single</i> card to win.<br>• At the <strong>${k_med}</strong> call mark (~50% overall), expect ~<strong>${expectedWinners.toFixed(2)}</strong> winner(s).`;
  infoBox.innerHTML = infoText;
}

function generateBingoCard(elementsList, shortSetLabel) {
  if (elementsList.length < 24) {
    console.error("Not enough elements to generate a card.");
    return '<div class="bingo-card" style="border: 2px dashed red; padding: 10px; text-align: center;">Error: Not enough elements.</div>';
  }
  let availableElements = shuffle(elementsList.slice());
  let cardElements = availableElements.slice(0, 24);
  let cardHTML = `<div class="card-header">ELEMENT BINGO (${shortSetLabel})</div>`;
  cardHTML += '<div class="card-grid">';
  let elementIndex = 0;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        cardHTML += '<div class="bingo-cell free">FREE</div>';
      } else {
        if (elementIndex < cardElements.length) {
          cardHTML += `<div class="bingo-cell">${cardElements[elementIndex++]}</div>`;
        } else {
          cardHTML += '<div class="bingo-cell">?</div>'; // Fallback, though should not happen with 24 elements
        }
      }
    }
  }
  cardHTML += '</div>';
  return `<div class="bingo-card">${cardHTML}</div>`;
}

function generatePreview() {
  const numCards = parseInt(document.getElementById("numCards").value) || 1;
  const elementSet = document.getElementById("elementSet").value;
  const fontChoice = document.getElementById("fontChoice").value;
  let elementsList, shortSetLabel;

  // Get elements based on selected set from the centralized source
  elementsList = getSymbolsForSet(elementSet);

  if (elementSet === "top70") {
    shortSetLabel = "'70";
  } else if (elementSet === "fiftySix") {
    shortSetLabel = "'56";
  } else { // 'all'
    shortSetLabel = "'118";
  }

  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";
  container.style.fontFamily = fontChoice;

  if (elementsList.length >= 24) {
    for (let i = 0; i < numCards; i++) {
      container.innerHTML += generateBingoCard(elementsList, shortSetLabel);
    }
    updateInfoBox(elementsList);
  } else {
    container.innerHTML = '<p style="color: red; padding: 20px;">Error: Not enough elements selected for a bingo card (minimum 24 required).</p>';
    document.getElementById("infoBox").innerHTML = `<strong>Error:</strong> Element set has only ${elementsList.length} items. Minimum 24 required.`;
  }
}

// Generate a new window for PDF printing using the old (working) print layout.
function generatePDFWindow() {
  const numCards = parseInt(document.getElementById("numCards").value) || 1;
  const cardsPerPage = parseInt(document.getElementById("cardsPerPage").value);
  const elementSet = document.getElementById("elementSet").value;
  const paperSize = document.getElementById("paperSize").value;
  const chosenFont = document.getElementById("fontChoice").value;
  let elementsList, shortSetLabel;

  // Get elements based on selected set from the centralized source
  elementsList = getSymbolsForSet(elementSet);

  if (elementSet === "top70") {
    shortSetLabel = "'70";
  } else if (elementSet === "fiftySix") {
    shortSetLabel = "'56";
  } else { // 'all'
    shortSetLabel = "'118";
  }

  if (elementsList.length < 24) {
    // Using a custom message box instead of alert()
    showCustomMessageBox("Error: Cannot generate print view because there are less than 24 elements.", 'error');
    return;
  }

  // Determine page dimensions (in mm) then convert to pixels (approx. 3.78px per mm)
  let pageWidthMM, pageHeightMM;
  if (paperSize === "A4") {
    pageWidthMM = 210; pageHeightMM = 297;
  } else {
    pageWidthMM = 216; pageHeightMM = 279;
  }
  const mmToPx = 3.78;
  const pageWidthPx = pageWidthMM * mmToPx;
  const pageHeightPx = pageHeightMM * mmToPx;
  const gapPx = 10;

  // Calculate maximum card size based on layout.
  let cardSizePx;
  if (cardsPerPage === 1) {
    cardSizePx = 0.9 * Math.min(pageWidthPx, pageHeightPx);
  } else if (cardsPerPage === 2) {
    cardSizePx = 0.9 * Math.min(pageWidthPx, (pageHeightPx - gapPx) / 2);
  } else { // cardsPerPage === 4
    cardSizePx = 0.9 * Math.min((pageWidthPx - gapPx) / 2, (pageHeightPx - gapPx) / 2);
  }
  cardSizePx = Math.floor(cardSizePx);

  // Create an array of bingo card HTML strings (using your generateBingoCard function).
  const cards = [];
  for (let i = 0; i < numCards; i++) {
    cards.push(generateBingoCard(elementsList, shortSetLabel));
  }

  // Group cards into pages.
  let pagesHTML = "";
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    const pageCards = cards.slice(i, i + cardsPerPage);
    let pageContent = "";
    pageCards.forEach(cardHTML => {
      pageContent += `<div class="pdf-card" style="width:${cardSizePx}px; height:${cardSizePx}px; margin: auto;">${cardHTML}</div>`;
    });
    let pageWrapperStyle = "";
    if (cardsPerPage === 1) {
      pageWrapperStyle = `display: flex; align-items: center; justify-content: center;`;
    } else if (cardsPerPage === 2) {
      pageWrapperStyle = `display: grid; grid-template-columns: 1fr; align-items: center; justify-items: center; gap: ${gapPx}px;`;
    } else { // cardsPerPage === 4
      pageWrapperStyle = `display: grid; grid-template-columns: 1fr 1fr; align-items: center; justify-items: center; gap: ${gapPx}px;`;
    }
    pagesHTML += `
      <div class="pdf-page" style="width:${pageWidthPx}px; height:${pageHeightPx}px; ${pageWrapperStyle} margin: auto; page-break-after: always;">
        ${pageContent}
      </div>
    `;
  }

  // Build complete HTML for the PDF window using the old (proven) printing layout.
  const pdfWindowHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bingo Cards PDF</title>
      <style>
        body { margin: 0; padding: 0; font-family: ${chosenFont}; }
        .pdf-page { box-sizing: border-box; }
        .pdf-card { width: 100%; height: 100%; }
        .bingo-card {
          border: 2px solid #000;
          display: flex;
          flex-direction: column;
          border-radius: 0.375rem; /* Rounded edges */
          overflow: hidden;      /* Ensure inner content clips to rounded corners */
        }
        .card-header {
          background-color: #f2f2f2;
          text-align: center;
          font-weight: bold;
          padding: 5px 0;
          border-bottom: 2px solid #000;
        }
        .card-grid {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(5, calc(100% / 5));
          grid-template-rows: repeat(5, calc(100% / 5));
        }
        .bingo-cell {
          border: 1px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          aspect-ratio: 1/1;
        }
        .free { background-color: #eee; !important;}
      </style>
    </head>
    <body>
      ${pagesHTML}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.onafterprint = function() { window.close(); };
          }, 500);
        };
      <\/script>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(pdfWindowHTML);
    printWindow.document.close();
  } else {
    // Using a custom message box instead of alert()
    showCustomMessageBox("Could not open print window. Please check your browser's pop-up blocker settings.", 'error');
  }
}

function setupCardGeneratorListeners() {
  // Get all relevant input elements
  const numCardsInput = document.getElementById("numCards");
  const cardsPerPageSelect = document.getElementById("cardsPerPage");
  const elementSetSelect = document.getElementById("elementSet");
  const paperSizeSelect = document.getElementById("paperSize");
  const fontChoiceSelect = document.getElementById("fontChoice");
  const randomizeButton = document.getElementById("generate"); // Renamed to Randomize

  // Add event listeners for automatic updates
  numCardsInput.addEventListener("input", generatePreview); // Use 'input' for real-time updates as user types
  cardsPerPageSelect.addEventListener("change", generatePreview);
  elementSetSelect.addEventListener("change", generatePreview);
  paperSizeSelect.addEventListener("change", generatePreview);
  fontChoiceSelect.addEventListener("change", generatePreview);

  // Keep the "Randomize" button for manual regeneration
  randomizeButton.addEventListener("click", generatePreview);
  document.getElementById("pdfBtn").addEventListener("click", generatePDFWindow);
}

// --- Initialize on page load ---
document.addEventListener('DOMContentLoaded', function () {
  // Set up menu listeners
  menuButtonCaller.addEventListener('click', toggleMenu);
  // Add event listener for the new menu button on the generator page
  menuButtonGenerator.addEventListener('click', toggleMenu);

  menuClose.addEventListener('click', hideMenu);
  // Removed the generic menuOverlay click to hideModal as it conflicts with the new reset modal
  // menuOverlay.addEventListener('click', function(e) {
  //   if (e.target === menuOverlay) hideModal();
  // });
  showCallerBtn.addEventListener('click', () => showPage('bingoCaller'));
  showGeneratorBtn.addEventListener('click', () => showPage('cardGenerator'));

  // Initialize the Bingo Caller page and its listeners
  initBingoCaller();
  setupBingoCallerListeners();

  // Show the default page (Bingo Caller)
  showPage('bingoCaller');
});
