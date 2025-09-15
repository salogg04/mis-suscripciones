const form = document.getElementById("subForm");
const list = document.getElementById("subsList");

function getSubs() {
  return JSON.parse(localStorage.getItem("subs") || "[]");
}

function saveSubs(subs) {
  localStorage.setItem("subs", JSON.stringify(subs));
}

function renderSubs() {
  const subs = getSubs();
  list.innerHTML = "";

  subs.forEach((sub, index) => {
    const li = document.createElement("li");

    const today = new Date();
    const nextPayment = new Date(sub.nextPayment);
    const daysLeft = Math.ceil((nextPayment - today) / (1000 * 60 * 60 * 24));

    li.innerHTML = `
      <span>
        <strong>${sub.name}</strong><br/>
        €${sub.amount} - en ${daysLeft} días<br/>
        Categoría: ${sub.category || "N/A"}
      </span>
      <button class="remove-btn" onclick="removeSub(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

function removeSub(index) {
  const subs = getSubs();
  subs.splice(index, 1);
  saveSubs(subs);
  renderSubs();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newSub = {
    name: form.name.value.trim(),
    amount: parseFloat(form.amount.value),
    nextPayment: form.nextPayment.value,
    category: form.category.value.trim()
  };

  const subs = getSubs();
  subs.push(newSub);
  saveSubs(subs);
  form.reset();
  renderSubs();
});

renderSubs();