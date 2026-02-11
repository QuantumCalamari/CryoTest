let fridgesData = [];

fetch('data/fridges.json')
  .then(response => response.json())
  .then(data => {
    fridgesData = data;
    createButtons();
  })
  .catch(err => {
    document.getElementById('fridge-view').innerHTML = `<p>Error loading data: ${err}</p>`;
  });

function createButtons() {
  const container = document.getElementById('fridge-buttons');
  fridgesData.forEach(f => {
    const btn = document.createElement('button');
    btn.textContent = f.name;
    btn.onclick = () => showFridge(f.id);
    container.appendChild(btn);
  });
}

function showFridge(id) {
  const fridge = fridgesData.find(f => f.id === id);
  const panel = document.getElementById('fridge-view');
  panel.innerHTML = `
    <h2>${fridge.name}</h2>
    <p><strong>Status:</strong> ${fridge.status}</p>
    <p><strong>Base Temp:</strong> ${fridge.baseTemp_mK} mK</p>
    <p><strong>Notes:</strong> ${fridge.notes}</p>
    <h3>Lines:</h3>
    <table border="1" cellpadding="5">
      <tr>
        <th>Name</th><th>Type</th><th>Attenuation</th><th>Status</th>
      </tr>
      ${fridge.lines.map(l => `<tr><td>${l.name}</td><td>${l.type}</td><td>${l.attenuation}</td><td>${l.status}</td></tr>`).join('')}
    </table>
  `;
}
