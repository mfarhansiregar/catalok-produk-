const products = [
  { name: "Mobile Legends", category: "moba", price: "1.500", color: "#1e3a8a", initial: "ML", desc: "Diamond & Starlight Member" },
  { name: "Free Fire", category: "battle-royale", price: "1.000", color: "#b91c1c", initial: "FF", desc: "Diamond & Membership" },
  { name: "PUBG Mobile", category: "battle-royale", price: "15.000", color: "#ca8a04", initial: "PG", desc: "UC & Royale Pass" },
  { name: "Genshin Impact", category: "rpg", price: "16.000", color: "#0e7490", initial: "GI", desc: "Genesis Crystal & Blessing" },
  { name: "Valorant", category: "fps", price: "15.000", color: "#dc2626", initial: "VL", desc: "Valorant Points" },
  { name: "Honkai Star Rail", category: "rpg", price: "16.000", color: "#6d28d9", initial: "HS", desc: "Oneiric Shards" },
  { name: "Arena of Valor", category: "moba", price: "3.000", color: "#047857", initial: "AV", desc: "Voucher & V-Network" },
  { name: "Call of Duty Mobile", category: "fps", price: "10.000", color: "#166534", initial: "CD", desc: "CP Points" },
  { name: "Point Blank", category: "fps", price: "5.000", color: "#374151", initial: "PB", desc: "Cash & Package" },
  { name: "Ragnarok M", category: "rpg", price: "10.000", color: "#be185d", initial: "RG", desc: "Big Cat Coin" },
  { name: "League of Legends WR", category: "moba", price: "15.000", color: "#0369a1", initial: "WR", desc: "Wild Cores" },
  { name: "Clash of Clans", category: "rpg", price: "15.000", color: "#a16207", initial: "CC", desc: "Gems & Gold Pass" }
];

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const tabs = document.querySelectorAll('.tab');
let currentFilter = 'all';

function render() {
  const keyword = search.value.toLowerCase();
  const filtered = products.filter(p =>
    (currentFilter === 'all' || p.category === currentFilter) &&
    p.name.toLowerCase().includes(keyword)
  );

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="no-result">Tidak ada game yang cocok dengan pencarianmu.</div>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="card" onclick="openModal('${p.name}', '${p.desc}')">
      <div class="card-img" style="background: linear-gradient(135deg, ${p.color}, #0f1420);">
        ${p.initial}
      </div>
      <div class="card-body">
        <div class="card-category">${p.category.replace('-', ' ')}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-price">Mulai dari <strong>Rp ${p.price}</strong></div>
        <button class="card-btn">Top Up Sekarang</button>
      </div>
    </div>
  `).join('');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    render();
  });
});

search.addEventListener('input', render);

function openModal(name, desc) {
  document.getElementById('modal-title').textContent = 'Top Up ' + name;
  document.getElementById('modal-desc').textContent = desc + ' — Masukkan detail akun kamu.';
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

function submitOrder() {
  const uid = document.getElementById('userId').value;
  const sid = document.getElementById('serverId').value;
  if (!uid || !sid) {
    alert('Mohon lengkapi User ID dan Server ID.');
    return;
  }
  alert('Pesanan berhasil dibuat! Lanjut ke pembayaran...');
  closeModal();
  document.getElementById('userId').value = '';
  document.getElementById('serverId').value = '';
}

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

render();