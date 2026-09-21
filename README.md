# 🎨 Etch-a-Sketch Project Notes

A quick guide to what I learned, the mistakes I made, and how I fixed them.

---

## ❌ Mistake 1: The Grid Centering Problem

- **What went wrong:** I put `display: flex` on the grid `.container`, but it wouldn't center on the screen.
- **The fix:** I learned that to center the container itself, I had to put the flex styling on its parent—the `<body>`.

## ❌ Mistake 2: Bad Grid Math (Area vs Side)

- **What went wrong:** I tried to size squares using an area formula (`250000 / (square * square)`). The blocks became huge and broke the grid.
- **The fix:** CSS dimensions work on linear sides. A container is always **100%** wide. To fit items perfectly, divide 100 by just one side: `${100 / square}%`.

## ❌ Mistake 3: Grid Spilling Out (Overflow)

- **What went wrong:** Percentage math was right, but adding borders made the blocks too big, forcing them to spill out of the container.
- **The fix:** Added `box-sizing: border-box` to the inner divs. This forces the browser to pack the borders _inside_ the percentage width.

## ❌ Mistake 4: Nested Event Listeners

- **What went wrong:** I tried to stop drawing by putting a `mouseover` listener inside a `click` listener. It created duplicate bugs that couldn't be turned off.
- **The fix:** I used a boolean flag variable (`let isDrawing = false`). Clicking toggles the switch (`!isDrawing`), and the hover event only paints if the switch is true.

---

## 🛠️ The Final Working Code (`app.js`)

```javascript
const square = parseInt(prompt("How many squares?"));
const container = document.querySelector(".container");
const btn = document.createElement("button");
let isDrawing = false; // 🔑 The toggle switch for drawing

btn.textContent = "RESET";
document.body.appendChild(btn);

// 📐 Perfect percentage grid generation
for (let i = 0; i < square * square; i++) {
  const div = document.createElement("div");
  div.style.width = `${100 / square}%`;
  div.style.height = `${100 / square}%`;
  container.appendChild(div);
}

// 🖱️ Click to turn drawing ON or OFF
container.addEventListener("click", () => {
  isDrawing = !isDrawing;
});

// 🖌️ Draw only if toggle is true and we aren't hovering on the outer border
container.addEventListener("mouseover", (event) => {
  if (isDrawing && event.target !== container) {
    event.target.style.backgroundColor = "black";
  }
});

// 🔄 Clear the grid back to default
btn.addEventListener("click", () => {
  const squares = container.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = ""));
});
```
