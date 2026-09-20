# 🎨 Project: Etch-a-Sketch Post-Mortem & Final Code

This document serves as a complete record of the code, thought processes, mistakes, and breakthroughs encountered while building this project.

---

## 🚀 1. Layout & Alignment: The Centering Issue

### ❌ The Mistake

I initially applied `display: flex` to the `.container`, expecting the whole grid area to center itself on the screen. Instead, the container stayed glued to the top/side of the page.

### 💡 The Realization

- Making the container flex only tells its _inner children_ (the dynamically generated grid squares) how to behave.
- To center the container container itself, the **parent of the container (the `<body>`)** needs to be the flexbox.

### ✅ The Fix

Applying `flex-direction: column`, `justify-content: center`, and `align-items: center` to the `body` successfully centers the grid container and the button right in the middle of the screen.

---

## 📐 2. The Math Fail (Area vs. Percentages)

### ❌ The Mistake

I originally tried to calculate the grid square sizes using a fixed pixel area formula: `250000 / (square * square)`.

Because CSS properties like `width` and `height` only measure a **single linear side** (not total 2D area), dividing by the squared total caused the items to be completely the wrong size.

### 💡 The Realization

A container is always **100%** wide and **100%** high. To divide a row into equal parts, you only divide 100% by the number of squares in _one row_ (`square`), ignoring the total item count.

### ✅ The Fix

```javascript
div.style.width = `${100 / square}%`;
div.style.height = `${100 / square}%`;
```

---

## 📦 3. The Overflow & Box-Sizing Breakthrough

### ❌ The Mistake

Even after fixing the math to use percentages, the grid blocks spilled out and broke out of the container layout boundaries.

### 💡 The Realization

Browsers default to `box-sizing: content-box`. This means if a cell has a width of `10%` and you add a `1px border`, its actual size becomes `10% + 2px`. Across 10 cells, those extra pixels add up and force the final cells to overflow and drop to the next line.

### ✅ The Fix

By applying `box-sizing: border-box` to `.container div`, the browser forces the border _inside_ the percentage allocation, keeping the math perfectly locked at 100%.

---

## 🌈 4. Good Ideas: Rainbow Trails & Event Delegation

### 💡 The Hover and Reset Implementation

- **The Rainbow Math:** Using `Math.random() * 256` wrapped in a function dynamically builds random `rgb()` colors on the fly every time the mouse moves.
- **The Reset Loop:** Instead of trying to add event listeners to a list, using `container.querySelectorAll("div")` combined with a `.forEach()` loop cleanly strips the custom backgrounds away to reset the board.
- **The Parent Hover Bug Fix:** Initially, adding a `mouseover` listener to the whole `container` meant that if the mouse touched the outer container boundary, the _entire block_ turned a random color. Changing the condition to `if (event.target !== container)` ensures only the inner squares change colors.

---

## 📂 5. The Final Code Base

### 📄 `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Etch a Sketch</title>
    <!-- Relative link or your absolute link: C:\Users\Admin\Desktop\Etch-a-sketch\style.css -->
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container"></div>
    <script src="app.js"></script>
  </body>
</html>
```

### 📄 `style.css`

```css
body {
  min-height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  width: 500px;
  height: 500px;
  border: 2px solid black;
}

.container div {
  box-sizing: border-box;
  background-color: aliceblue;
  border: 1px solid black;
}

button {
  color: black;
  padding: 8px 16px;
  cursor: pointer;
}
```

### 📄 `app.js`

```javascript
const square = parseInt(prompt("How many squares per side?"));
const container = document.querySelector(".container");

// Create and insert the reset button
const btn = document.createElement("button");
btn.textContent = "RESET";
document.body.appendChild(btn);

// Build the grid
for (let i = 0; i < square * square; i++) {
  const div = document.createElement("div");
  div.style.width = `${100 / square}%`;
  div.style.height = `${100 / square}%`;
  container.appendChild(div);
}

// Generate random rainbow RGB value
function rgbColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Hover effect (With safety check so the parent container doesn't colorize)
container.addEventListener("mouseover", (event) => {
  if (event.target !== container) {
    event.target.style.backgroundColor = rgbColor();
  }
});

// Clear board reset loop
btn.addEventListener("click", () => {
  const squares = container.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = ""));
});
```
