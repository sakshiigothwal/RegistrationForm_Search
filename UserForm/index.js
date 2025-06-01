const form = document.getElementById("registrationForm");
const search = document.getElementById("search");
const list = document.getElementById("list");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{8,}$/; 

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function displayUsers(users = getUsers()) {
  list.innerHTML = "";

  if (users.length === 0) {
    list.innerHTML = "No users.";
    return;
  }

  users.forEach(user => {
    const div = document.createElement("div");
    div.classList.add("user-card");
    div.innerHTML = `${user.name}<br>${user.email}`;
    list.appendChild(div);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    return;
  }

  const users = getUsers();

  if (users.some(u => u.email === email)) {
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);
  form.reset();
  displayUsers();
});

search.addEventListener("input", () => {
  const query = search.value.toLowerCase();
  const users = getUsers();

  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  );

  displayUsers(filtered);
});

displayUsers();
