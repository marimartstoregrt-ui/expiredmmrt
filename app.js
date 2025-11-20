async function loadDashboard() {

  const res = await fetch(`${API_URL}?mode=list`);
  const data = await res.json();

  // ---- SUMMARY ANGKA ----
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  const expired = data.filter(x => x.status === "Expired").length;
  const lewatRH = data.filter(x => x.status === "Lewat RH").length;
  const bisaRetur = data.filter(x => x.status === "Bisa Retur").length;

  // Assign ke kartu dashboard
  document.getElementById("expiredCount").innerText = expired;
  document.getElementById("todayCount").innerText   = lewatRH;     // RH alert
  document.getElementById("h1Count").innerText      = bisaRetur;
  document.getElementById("okCount").innerText      = data.length;

  // ---- PRIORITAS LIST ----
  const list = document.getElementById("priorityList");
  list.innerHTML = "";

  // sort by expired ascending
  data.sort((a, b) => new Date(a.expired) - new Date(b.expired));

  data.forEach(item => {
    list.innerHTML += `
      <div class="item">
        <div class="item-name">${item.deskripsi}</div>
        <div class="item-info">${item.barcode} • Qty: ${item.qty}</div>
        <div class="item-info">Exp: ${item.expired} • RH: ${item.rh} • Batas Retur: ${item.batas_retur}</div>
        <span class="badge ${getBadge(item.status)}">${item.status}</span>
      </div>
    `;
  });
}


function getBadge(status) {
  switch(status) {
    case "Expired": return "b-expired";     // merah
    case "Lewat RH": return "b-today";      // orange
    case "Bisa Retur": return "b-h1";       // kuning
    default: return "b-ok";                 // hijau
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

// Selalu load dashboard jika elemen tersedia
if (document.getElementById("priorityList")) {
    loadDashboard();
}

// Selalu load date picker jika elemen tersedia
if (document.getElementById("year")) {
    setupMariMartDatePicker();
}

if (document.getElementById("priorityList")) {
  loadDashboard();
}



