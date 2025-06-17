const menu = document.getElementById("menu");
const menuBar = document.getElementById("menu-bar");
const closeMenu = document.getElementById("close");

menu.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeBar);

function openMenu() {
  menuBar.style.width = "0px";

  if (menuBar.style.width === "0px") {
    menuBar.style.width = "300px";
  } else {
    menuBar.style.width = "0px";
  }
}

function closeBar() {
  menuBar.style.width = "0px";
}

const root = document.documentElement;
const toggleBtns = document.querySelectorAll(".themeToggle");
const icons = document.querySelectorAll(".themeIcon");

let isDark = false;

if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark");
  document.body.classList.add("dark");
  icons.src = "./assets/icons/day-mode.svg";
} else {
  icons.src = "./assets/icons/night-mode.svg";
}

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isNowDark = root.classList.toggle("dark");
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", isNowDark ? "dark" : "light");

    icons.forEach((icon) => {
      icon.src = isNowDark
        ? "./assets/icons/day-mode.svg"
        : "./assets/icons/night-mode.svg";
    });
  });
});
