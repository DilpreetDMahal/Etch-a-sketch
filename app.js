const square = parseInt(prompt("How many square's ?"));
const container = document.querySelector(".container");
const btn = document.createElement("button");
let isDrawing = false;
btn.textContent = "RESET";
document.body.appendChild(btn);
const containerSize = 500;

for (let i = 0; i < square * square; i++) {
  const div = document.createElement("div");
  div.style.width = `${100 / square}%`;
  div.style.height = `${100 / square}%`;
  container.appendChild(div);
}

function rgbColor() {
  let r = Math.random() * 256;
  let g = Math.random() * 256;
  let b = Math.random() * 256;

  return `rgb(${r}, ${g}, ${b})`;
}

container.addEventListener("click", () => {
  isDrawing = !isDrawing;
});

container.addEventListener("mouseover", (event) => {
  if (isDrawing && event.target !== container) {
    event.target.style.backgroundColor = "black";
  }
});

btn.addEventListener("click", () => {
  const squares = container.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = ""));
});
