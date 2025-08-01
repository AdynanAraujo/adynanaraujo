const text = `Hello world`;
const speed = 50;
let i = 0;

const typeEl = document.getElementById("typewriter");

const cursor = document.createElement("span");
cursor.classList.add("cursor");
cursor.textContent = "|";
typeEl.appendChild(cursor);

function typeWriter() {
  if (i < text.length) {
    cursor.insertAdjacentText('beforebegin', text.charAt(i));
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = () => {
  typeEl.textContent = "";
  typeEl.appendChild(cursor);
  i = 0;
  typeWriter();
};
