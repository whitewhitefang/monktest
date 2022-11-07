const form = document.getElementById('preferences');
const reset = document.querySelector(".form__actions--cancel");

function checkData() {
  if (localStorage.getItem("monktestobj")) {
    const storedData = JSON.parse(localStorage.getItem("monktestobj"));
    const form = document.forms.preferences.elements;
    const root = document.documentElement;
    for (let key of form) {
      if (key.name === "themeDark" || key.name === "themeLight") {
        if (storedData.theme === form[key].value) {
          form[key].setAttribute("checked", true);
        } else {
          form[key].removeAttribute("checked");
        }        
      }
    }    
    for (let [key, value] of Object.entries(storedData)) {
      if (key !== "theme") {
        form[key].value = value;
      }
    }
    if (storedData.theme === "dark") {
      root.classList.add("dark-mode");
    }
    if (root.classList && storedData.theme === "light") {
      root.classList.remove("dark-mode");
    }
  } 
}

function savePreferences(event) {
  event.preventDefault();
  let data = {};
  let form = new FormData(document.forms.preferences);  
  for (let [key, value] of form) {
    data[key] = value;
  }
  localStorage.setItem("monktestobj", JSON.stringify(data));
  location.reload();
}  

function resetLS() {
  if (!localStorage.getItem("monktestobj")) return;
  localStorage.removeItem("monktestobj");
  location.reload();
}

form.addEventListener('submit', event => savePreferences(event));
reset.addEventListener('click', resetLS);
window.addEventListener('load', checkData);