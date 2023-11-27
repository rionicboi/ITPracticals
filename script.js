const yourName = "Ryan Jose";
const yourAge = 20;
const yourCourse = "BSc(H) Computer Science";
const yourPlans = "Arson";
const yourHobbies = ["Cars", "Bikes", "Gaming"];

document.getElementById("name").textContent = yourName;
document.getElementById("age").textContent = yourAge;
document.getElementById("course").textContent = yourCourse;
document.getElementById("plans").textContent = yourPlans;
const hobbiesList = document.getElementById("hobbies");
hobbiesList.innerHTML = "";
yourHobbies.forEach((hobby) => {
    const listItem = document.createElement("li");
    listItem.textContent = hobby;
    hobbiesList.appendChild(listItem);
});

