let currentSortColumn = -1;
let sortDirection = 1; // 1 = ascending, -1 = descending

// Filter table based on search input
function filterTable() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.getElementById("questTable");
  const rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) { // Skip header row
    let visible = false;
    const cells = rows[i].getElementsByTagName("td");
    
    for (let j = 0; j < cells.length; j++) {
      if (cells[j]) {
        const text = cells[j].textContent.toLowerCase();
        if (text.includes(filter)) {
          visible = true;
          break;
        }
      }
    }
    rows[i].style.display = visible ? "" : "none";
  }
}

// Sort table by column
function sortTable(columnIndex) {
  const table = document.getElementById("questTable");
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const header = table.querySelectorAll("th")[columnIndex];
  
  // Toggle sort direction if clicking the same column
  if (currentSortColumn === columnIndex) {
    sortDirection *= -1;
  } else {
    currentSortColumn = columnIndex;
    sortDirection = 1;
  }

  // Update header arrows
  document.querySelectorAll("th").forEach(th => th.innerHTML = th.innerHTML.replace("▲", "").replace("▼", ""));
  header.innerHTML += sortDirection === 1 ? "▲" : "▼";

  rows.sort((a, b) => {
    const aText = a.getElementsByTagName("td")[columnIndex].textContent;
    const bText = b.getElementsByTagName("td")[columnIndex].textContent;
    
    // Numeric sorting for ID/Price columns
    if (columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5) {
      const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ""));
      const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ""));
      return (aNum - bNum) * sortDirection;
    }
    // Text sorting for Name/Category
    return aText.localeCompare(bText) * sortDirection;
  });

  // Rebuild table
  rows.forEach(row => table.tBodies[0].appendChild(row));
}

function open_descr(tElement) {
  const frame = document.getElementById("html_qpage");
  frame.src = `qData/${tElement.innerText}.html`
}

sortTable(2);