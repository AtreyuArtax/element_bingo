# 🧪 Chemistry Element Bingo

A lightweight, classroom-ready web app for running **Element Bingo** and generating printable bingo cards from curated element sets. It’s fast, teacher-friendly, and runs entirely in the browser—no logins or servers.

**Live site:** https://AtreyuArtax.github.io/element_bingo


## ✨ What it does

### 1) Bingo Caller
- Interactive **periodic table** with family colour coding (alkali, alkaline earth, transition, metalloids, nonmetals, halogens, noble gases, lanthanides, actinides).
- **Call Next Element** randomly selects from the chosen set and builds a **Called Elements** list.
- **Game modes / element sets**:
  - **56 Common Elements**
  - **70 Common Elements**
  - **All 118 Elements**
- Click any element to open a details **modal** (name, atomic number, atomic mass, common ionic charges, state at STP) plus a **simple Bohr diagram** (intro-level shell fill).
- **Reset** with a modern confirmation dialog.

### 2) Card Generator
- Create **N** randomized cards using the selected element set.
- Choose **Cards per Page** (1 / 2 / 4) and **Paper Size** (Letter / A4).
- Optional **font** choices for screen preview (Poppins, Times, Courier, Verdana).
- One-click **Generate & Print** opens a clean print layout in a new window.
- Built-in **probability helper** estimates how many calls are needed for ~50% chance of a winner (for the group and for a single card).


## 🚀 Quick Start (Teachers)

1. Open the live site: **https://AtreyuArtax.github.io/element_bingo**  
2. Use the **☰ menu** to switch between **Bingo Caller** and **Card Generator**.
3. **Bingo Caller**
   - Pick a **game mode** (56/70/All).
   - Press **Call Next Element** and watch the list grow.
   - Click any element cell for details (ionic charges, mass, Bohr diagram).
   - **Reset** anytime (with confirmation).
4. **Card Generator**
   - Set **Number of Cards**, **Cards per Page**, **Element Set**, and **Paper Size**.
   - Click **Randomize** to preview.
   - Click **Generate & Print** to open the print window, then print or save as PDF.

> 💡 Tips
> - If the print window doesn’t open, allow pop-ups for your browser tab.
> - For big classes, start with **56** or **70** to get winners at a reasonable pace.



## 🧠 Element Data

All element info (1–118) is embedded in the app:
- **Name, symbol, atomic number, atomic mass**
- **Common ionic charges** (typical textbook values)
- **State at STP**
- **Simplified Bohr diagram** (intro-level shell capacities)

Family colours are applied automatically across the periodic table.


## 📦 Tech Stack

- **HTML + CSS + JavaScript** (no build step)
- **Tailwind CDN** for quick, clean UI primitives
- **Google Fonts (Poppins)** for the generator preview
- 100% **client-side** — works offline after first load


## 🗂 Local Use

To run locally without internet:

1. Download `index.html` (or `element_bingo.html`) from this repository.
2. Double-click the file to open it in any modern browser (Chrome, Edge, Firefox, Safari).
3. Everything will work exactly the same as the live site.

## 🖨 Printing & Layout

- **Cards per Page**: 1, 2, or 4 (auto scales to fit **Letter** or **A4**).
- The print view uses a **clean grid** with distinct borders and a **FREE** center cell.
- To save as PDF, choose **Print → Save as PDF** in your browser.

## 🔢 Probability Helper (How it’s estimated)

The generator estimates:
- Calls for **≥50% chance** of _any_ winner in the group.
- Calls for **≥1% chance** of _any_ winner in the group.
- Calls for **≥50% chance** for a _single_ card.
- Expected number of winners at the 50% mark.

It uses combinations on the chosen element set size `T` and card coverage `k` (with standard 5×5, FREE center). Results are approximate and meant for classroom pacing—not rigorous statistical guarantees.

## 📄 License

MIT License — free for personal, educational, or commercial use.


## 👤 Credits

Built and maintained by **@AtreyuArtax** for classroom fun and chemistry learning. 🎉