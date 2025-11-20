// contoh data statis (nantinya diganti API Apps Script)
const sample = [
  { nama: "Susu UHT", barcode: "89912345", expired: "2024-04-27", status: "Expired" },
  { nama: "Roti Tawar", barcode: "123456789", expired: "2024-04-29", status: "H+1" },
  { nama: "Mi Instan", barcode: "00998877", expired: "2024-05-02", status: "Aman" }
];

function loadDashboard() {
  // Hitung summary
  document.getElementById("expiredCount").innerText = sample.filter(x => x.status === "Expired").length;
  document.getElementById("todayCount").innerText   = sample.filter(x => x.status === "Hari Ini").length;
  document.getElementById("h1Count").innerText      = sample.filter(x => x.status === "H+1").length;
  document.getElementById("okCount").innerText      = sample.filter(x => x.status === "Aman").length;

  // Render List
  const list = document.getElementById("priorityList");
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

loadDashboard();

function saveItem() {
  const data = {
    barcode: document.getElementById("barcode").value,
    nama: document.getElementById("nama").value,
    expired: getDate(),
  };

  console.log("DATA DISIMPAN:", data);

  alert("Data berhasil disimpan (dummy).");
  window.location.href = "index.html";
}

function getDate() {
  let y = document.getElementById("year").value;
  let m = document.getElementById("month").value.padStart(2, "0");
  let d = document.getElementById("day").value.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// GENERATE YEAR - MONTH - DAY OPTIONS
function setupMariMartDatePicker() {
  const y = document.getElementById("year");
  const m = document.getElementById("month");
  const d = document.getElementById("day");

  // YEAR 2010 → 2035
  for (let i = 2010; i <= 2035; i++) {
    y.innerHTML += `<option value="${i}">${i}</option>`;
  }

  // MONTH 1 → 12
  for (let i = 1; i <= 12; i++) {
    m.innerHTML += `<option value="${i}">${String(i).padStart(2, '0')}</option>`;
  }

  // AUTO UPDATE DAY
  function updateDays() {
    const year = y.value;
    const month = m.value;
    const maxDay = new Date(year, month, 0).getDate();

    d.innerHTML = "";
    for (let i = 1; i <= maxDay; i++) {
      d.innerHTML += `<option value="${i}">${String(i).padStart(2, '0')}</option>`;
    }
  }

  y.onchange = updateDays;
  m.onchange = updateDays;

  updateDays();
}

// Call ketika halaman input dibuka
if (window.location.href.includes("input")) {
  setupMariMartDatePicker();
}

// GET FINAL DATE
function getDate() {
  return `${year.value}-${month.value.padStart(2, "0")}-${day.value.padStart(2, "0")}`;
}

