const form = document.getElementById("registrationForm");
const search = document.getElementById("search");
const list = document.getElementById("list");
const errMsg = document.getElementById("error")

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^.{8,}$/; 

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function displayUsers(users = getUsers()) {
  list.innerHTML = "";

  if (users.length === 0) {
    list.innerHTML = `<tr><td colspan="2">No users.</td></tr>`;
    return;
  }

  users.forEach(user => {
    const row = document.createElement("tr");
    const nameCol= document.createElement("td");
    nameCol.textContent = user.name;
    const emailCol = document.createElement("td");
    emailCol.textContent = user.email;

    row.appendChild(nameCol);
    row.appendChild(emailCol);
    list.appendChild(row);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  errMsg.innerText="";

  if (!emailPattern.test(email)) {
    errMsg.innerText = "Please enter a valid email address.";
    return;
  }

  if (!passwordPattern.test(password)) {
    errMsg.innerText = "Password must be at least 8 characters long.";
    return;
  }

  const users = getUsers();

  if (users.some(u => u.email === email)) {
    errMsg.innerText = "An account with this email already exists.";
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
