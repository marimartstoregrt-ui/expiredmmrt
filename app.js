// SAMPLE DATA SEMENTARA
const sample = [
  { nama: "Susu UHT", barcode: "89912345", expired: "2024-04-27", status: "Expired" },
  { nama: "Roti Tawar", barcode: "12345", expired: "2024-04-29", status: "H+1" },
  { nama: "Mi Instan", barcode: "998877", expired: "2024-05-02", status: "Aman" }
];

// DASHBOARD
function loadDashboard() {
  document.getElementById("expiredCount").innerText = sample.filter(x => x.status === "Expired").length;
  document.getElementById("todayCount").innerText   = sample.filter(x => x.status === "Hari Ini").length;
  document.getElementById("h1Count").innerText      = sample.filter(x => x.status === "H+1").length;
  document.getElementById("okCount").innerText      = sample.filter(x => x.status === "Aman").length;

  const list = document.getElementById("priorityList");
  if (!list) return;

  list.innerHTML = "";

  sample.forEach(item => {
    list.innerHTML += `
      <div class="item">
        <div class="item-name">${item.nama}</div>
        <div class="item-info">${item.barcode} • ${item.expired}</div>
        <span class="badge ${getBadge(item.status)}">${item.status}</span>
      </div>
    `;
  });
}

function getBadge(status) {
  switch(status) {
    case "Expired": return "b-expired";
    case "Hari Ini": return "b-today";
    case "H+1": return "b-h1";
    default: return "b-ok";
  }
}

// INPUT PAGE — HYBRID DATE PICKER
function setupMariMartDatePicker() {
  const y = document.getElementById("year");
  const m = document.getElementById("month");
  const d = document.getElementById("day");

  if (!y || !m || !d) return;

  for (let i = 2010; i <= 2035; i++)
    y.innerHTML += `<option value="${i}">${i}</option>`;

  for (let i = 1; i <= 12; i++)
    m.innerHTML += `<option value="${i}">${String(i).padStart(2,'0')}</option>`;

  function updateDays() {
    const year = y.value;
    const month = m.value;
    const maxDay = new Date(year, month, 0).getDate();

    d.innerHTML = "";
    for (let i = 1; i <= maxDay; i++) {
      d.innerHTML += `<option value="${i}">${String(i).padStart(2,'0')}</option>`;
    }
  }

  y.onchange = updateDays;
  m.onchange = updateDays;

  updateDays();
}

function saveItem() {
  const barcode = document.getElementById("barcode").value;
  const nama = document.getElementById("nama").value;
  const expired = `${year.value}-${month.value.padStart(2, "0")}-${day.value.padStart(2, "0")}`;

  console.log("DATA DISIMPAN:", { barcode, nama, expired });

  alert("Data berhasil disimpan (demo).");
  window.location.href = "index.html";
}

if (window.location.href.includes("index")) loadDashboard();
if (window.location.href.includes("input")) setupMariMartDatePicker();
