const rows = document.getElementById("rows");
let agencies = [];

window.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "AGENCIES_DATA") return;

  agencies = event.data.payload;
  render(agencies);
});

function render(data) {
  rows.innerHTML = "";
  data.forEach((a, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${a.name}</td>
      <td>${a.googleNote || "—"}</td>
      <td>${a.googleCount || "—"}</td>
    `;
    rows.appendChild(tr);
  });
}

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  render(
    agencies.filter(a => a.name.toLowerCase().includes(q))
  );
});
const dashboardFrame = document.querySelector(
  'iframe[src="dashboard/dashboard.html"]'
);

if (dashboardFrame) {
  dashboardFrame.contentWindow.postMessage({
    type: "AGENCIES_DATA",
    payload: agenciesData.map(a => ({
      name: a.name,
      googleNote: a.googleNote,
      googleCount: a.googleCount,
      lat: a.lat,
      lng: a.lng
    }))
  }, "*");
}

