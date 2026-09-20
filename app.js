const container = document.querySelector(".container");
const btn = document.createElement("button");
btn.textContent = "RESET";
document.body.appendChild(btn);

for (let i = 0; i < 256; i++) {
  const div = document.createElement("div");

  container.appendChild(div);

  div.addEventListener("mouseover", () => {
    div.style.backgroundColor = "black";
  });
}

btn.addEventListener("click", () => {
  const squares = container.querySelectorAll("div");
  squares.forEach((div) => (div.style.backgroundColor = ""));
});
