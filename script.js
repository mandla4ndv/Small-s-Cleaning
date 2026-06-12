// NAV
const burger = document.getElementById('burgerBtn');
const mMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mMenu.classList.toggle('open'));
function closeMenu() { mMenu.classList.remove('open'); }

// Set min date for booking
const dateInput = document.getElementById('bDate');
if (dateInput) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// CHAT WIDGET
setTimeout(() => {
  const w = document.getElementById('chatWidget');
  if (w) { w.style.display = 'block'; }
}, 4000);
document.getElementById('chatWidget').style.display = 'none';

// CALCULATOR STATE
let calcState = {
  service: '', serviceName: '',
  size: '', qty: 1,
  bedrooms: 1, houseType: 'house', cleanType: 'standard', frequency: 'once',
  mattressSize: 'double',
  urgency: 0, addons: [],
  basePrice: 0
}

// --- PRICING ---
const PRICING = {
  couch: { '1-seater': 250, '2-seater': 450, '3-seater': 550, '4-seater': 750, '5-seater': 850, '6-seater': 950, '7-seater': 1050, '8-seater': 1250 },
  chair: { 'Chair': 150, 'Small Ottoman': 150, 'Large Ottoman': 200, 'XL Ottoman': 300 },
  carpet: { 'Small 3x3': 550, 'Medium 4x4': 650, 'Large 5x5': 750, 'Extra-Large 6x6': 850 },
  rug: { 'Small': 350, 'Medium': 450, 'Large': 550, 'Extra-Large': 650 },
  mattress: { 'Single': 380, 'Double': 580, 'Queen': 580, 'King': 680 },
  window: { perWindow: 50 },
  house: { 1: 1500, 2: 1800, 3: 2100, 4: 2500 },
  apartment: { 1: 1200, 2: 1500, 3: 1800 },
  office: { base: 800 },
  car: { Sedan: 400, SUV: 550, Bakkie: 500 },
  shoes: { 'Standard': 130, 'White Restoration': 150, 'Suede & Nubuck': 180, 'Midsole De-Yellowing': 250 },
  movein: { base: 600 },
  postconstruction: { base: 0 },
  postoccupational: { base: 700 }
}

// --- ADDONS ---
const ADDONS = {
  couch: ['Leather conditioning +R80', 'Fabric protector +R100', 'Odour treatment +R60'],
  carpet: ['Stain protector +R80', 'Odour treatment +R60'],
  rug: ['Stain protector +R80', 'Odour treatment +R60'],
  mattress: ['Odour treatment +R50', 'Allergy treatment +R80'],
  house: ['Kitchen cleaning +R450', 'Bathroom sanitising +R350', 'Shower deep clean +R650', 'Dusting +R250', 'Vacuuming +R250', 'Floor mopping +R350', 'Window cleaning +R200', 'Laundry +R120'],
  apartment: ['Kitchen cleaning +R450', 'Bathroom sanitising +R350', 'Shower deep clean +R650', 'Dusting +R250', 'Vacuuming +R250', 'Floor mopping +R350', 'Window cleaning +R150'],
  office: ['Window cleaning +R200', 'Bathroom deep clean +R150', 'Kitchen/breakroom +R120'],
  car: ['Engine bay +R150', 'Odour bomb +R80', 'Fabric protector +R100'],
  default: []
}

function selectService(svc, name) {
  calcState.service = svc;
  calcState.serviceName = name;
  calcState.size = '';
  calcState.qty = 1;
  calcState.bedrooms = 1;
  buildStep2();
  goStep(2);
}

function buildStep2() {
  const s = calcState.service;
  const title = document.getElementById('step2Title');
  const content = document.getElementById('step2Content');
  title.innerHTML = `${calcState.serviceName} — Details`;

  let html = '';
  if (s === 'couch') {
    html = `<div class="calc-label">What type of couch?</div>
    <div class="options-grid">
      <button class="opt-btn" onclick="selectSize('1-seater',this)">1-Seater<br><small>R250</small></button>
      <button class="opt-btn" onclick="selectSize('2-seater',this)">2-Seater<br><small>R450</small></button>
      <button class="opt-btn" onclick="selectSize('3-seater',this)">3-Seater<br><small>R550</small></button>
      <button class="opt-btn" onclick="selectSize('4-seater',this)">4-Seater<br><small>R750</small></button>
      <button class="opt-btn" onclick="selectSize('5-seater',this)">5-Seater<br><small>R850</small></button>
      <button class="opt-btn" onclick="selectSize('6-seater',this)">6-Seater<br><small>R950</small></button>
      <button class="opt-btn" onclick="selectSize('7-seater',this)">7-Seater<br><small>R1,050</small></button>
      <button class="opt-btn" onclick="selectSize('8-seater',this)">8-Seater<br><small>R1,250</small></button>
    </div>
    <div class="calc-label" style="margin-top:20px">How many couches?</div>
    <div class="qty-control" style="margin-bottom:24px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">1</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>`;
  } else if (s === 'chair') {
    html = `<div class="calc-label">What type?</div>
    <div class="options-grid">
      <button class="opt-btn" onclick="selectSize('Chair',this)">Chair<br><small>R150</small></button>
      <button class="opt-btn" onclick="selectSize('Small Ottoman',this)">Small Ottoman<br><small>R150</small></button>
      <button class="opt-btn" onclick="selectSize('Large Ottoman',this)">Large Ottoman<br><small>R200</small></button>
      <button class="opt-btn" onclick="selectSize('XL Ottoman',this)">XL Ottoman<br><small>R300</small></button>
    </div>
    <div class="calc-label" style="margin-top:20px">How many?</div>
    <div class="qty-control" style="margin-bottom:24px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">1</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>`;
  } else if (s === 'carpet') {
    html = `<div class="calc-label">What size fitted carpet?</div>
    <div class="options-grid">
      <button class="opt-btn" onclick="selectSize('Small 3x3',this)">Small (3x3)<br><small>R550</small></button>
      <button class="opt-btn" onclick="selectSize('Medium 4x4',this)">Medium (4x4)<br><small>R650</small></button>
      <button class="opt-btn" onclick="selectSize('Large 5x5',this)">Large (5x5)<br><small>R750</small></button>
      <button class="opt-btn" onclick="selectSize('Extra-Large 6x6',this)">Extra-Large (6x6)<br><small>R850</small></button>
    </div>
    <p style="font-size:13px;color:var(--mid);margin-top:10px;">Office carpet: R25-R35/m² (Custom Quote)</p>
    <div class="calc-label" style="margin-top:20px">How many rooms?</div>
    <div class="qty-control" style="margin-bottom:24px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">1</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>`;
  } else if (s === 'rug') {
    html = `<div class="calc-label">What size rug?</div>
    <div class="options-grid">
      <button class="opt-btn" onclick="selectSize('Small',this)">Small<br><small>R350</small></button>
      <button class="opt-btn" onclick="selectSize('Medium',this)">Medium<br><small>R450</small></button>
      <button class="opt-btn" onclick="selectSize('Large',this)">Large<br><small>R550</small></button>
      <button class="opt-btn" onclick="selectSize('Extra-Large',this)">Extra-Large<br><small>R650</small></button>
    </div>
    <p style="font-size:13px;color:var(--mid);margin-top:10px;"><i class="fa-solid fa-truck"></i> Collection days: Wednesdays | Delivery days: Fridays</p>
    <div class="calc-label" style="margin-top:20px">How many rugs?</div>
    <div class="qty-control" style="margin-bottom:24px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">1</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>`;
  } else if (s === 'mattress') {
    html = `<div class="calc-label">What size mattress?</div>
    <div class="options-grid">
      <button class="opt-btn" onclick="selectSize('Single',this)">Single<br><small>R380</small></button>
      <button class="opt-btn" onclick="selectSize('Double',this)">Double<br><small>R580</small></button>
      <button class="opt-btn" onclick="selectSize('Queen',this)">Queen<br><small>R580</small></button>
      <button class="opt-btn" onclick="selectSize('King',this)">King<br><small>R680</small></button>
    </div>
    <div class="calc-label" style="margin-top:20px">How many mattresses?</div>
    <div class="qty-control" style="margin-bottom:24px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">1</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>`;
  } else if (s === 'window') {
    html = `<div class="calc-label">How many windows?</div>
    <div class="qty-control" style="margin-bottom:16px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">5</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>
    <p style="font-size:13px;color:var(--mid)">R50 per window (inside + outside). Minimum 3 windows.</p>`;
    calcState.qty = 5;
    calcState.size = 'perWindow';
  } else if (s === 'house') {
    html = `<div class="calc-label">Type of home</div>
    <div class="options-grid" style="margin-bottom:20px">
      <button class="opt-btn" onclick="selectHouseType('apartment',this)">Apartment</button>
      <button class="opt-btn" onclick="selectHouseType('townhouse',this)">Townhouse</button>
      <button class="opt-btn selected" onclick="selectHouseType('house',this)">House</button>
    </div>
    <div class="calc-label">Number of bedrooms</div>
    <div class="options-grid" style="margin-bottom:20px">
      <button class="opt-btn" onclick="selectBedrooms(1,this)">1 Bedroom</button>
      <button class="opt-btn" onclick="selectBedrooms(2,this)">2 Bedrooms</button>
      <button class="opt-btn" onclick="selectBedrooms(3,this)">3 Bedrooms</button>
      <button class="opt-btn" onclick="selectBedrooms(4,this)">4+ Bedrooms</button>
    </div>
    <div class="calc-label">Type of clean</div>
    <div class="options-grid" style="margin-bottom:20px">
      <button class="opt-btn selected" onclick="selectCleanType('standard',this)">Standard Clean</button>
      <button class="opt-btn" onclick="selectCleanType('deep',this)">Deep Clean +R300</button>
    </div>
    <div class="calc-label">Frequency</div>
    <div class="options-grid">
      <button class="opt-btn selected" onclick="selectFrequency('once',this)">Once-Off</button>
      <button class="opt-btn" onclick="selectFrequency('weekly',this)">Weekly −10%</button>
      <button class="opt-btn" onclick="selectFrequency('monthly',this)">Monthly −5%</button>
    </div>`;
    calcState.houseType = 'house';
    calcState.bedrooms = 1;
    calcState.cleanType = 'standard';
    calcState.frequency = 'once';
  } else if (s === 'apartment') {
    html = `<div class="calc-label">Number of bedrooms</div>
    <div class="options-grid" style="margin-bottom:20px">
      <button class="opt-btn" onclick="selectBedrooms(1,this)">1 Bedroom</button>
      <button class="opt-btn" onclick="selectBedrooms(2,this)">2 Bedrooms</button>
      <button class="opt-btn" onclick="selectBedrooms(3,this)">3+ Bedrooms</button>
    </div>
    <div class="calc-label">Type of clean</div>
    <div class="options-grid">
      <button class="opt-btn selected" onclick="selectCleanType('standard',this)">Standard Clean</button>
      <button class="opt-btn" onclick="selectCleanType('deep',this)">Deep Clean +R200</button>
    </div>`;
    calcState.bedrooms = 1;
    calcState.cleanType = 'standard';
  } else if (s === 'office') {
    html = `<div class="calc-label">Approximate office size</div>
    <div class="options-grid" style="margin-bottom:20px">
      <button class="opt-btn" onclick="selectSize('small',this)">Small<br><small>1–5 people — R800</small></button>
      <button class="opt-btn" onclick="selectSize('medium',this)">Medium<br><small>6–15 people — R1,200</small></button>
      <button class="opt-btn" onclick="selectSize('large',this)">Large<br><small>15+ people — R1,800</small></button>
    </div>`;
  } else if (s === 'car') {
    html = `<div class="calc-label">Vehicle type</div>
    <div class="options-grid" style="margin-bottom:20px">
      <button class="opt-btn" onclick="selectSize('Sedan',this)">Sedan / Hatch<br><small>R400</small></button>
      <button class="opt-btn" onclick="selectSize('SUV',this)">SUV / MPV<br><small>R550</small></button>
      <button class="opt-btn" onclick="selectSize('Bakkie',this)">Bakkie / Truck<br><small>R500</small></button>
    </div>
    <div class="calc-label">How many vehicles?</div>
    <div class="qty-control" style="margin-bottom:24px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">1</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>`;
  } else if (s === 'shoes') {
    html = `<div class="calc-label">Type of wash?</div>
    <div class="options-grid">
      <button class="opt-btn" onclick="selectSize('Standard',this)">Standard<br><small>R130</small></button>
      <button class="opt-btn" onclick="selectSize('White Restoration',this)">White Restore<br><small>R150</small></button>
      <button class="opt-btn" onclick="selectSize('Suede & Nubuck',this)">Suede/Nubuck<br><small>R180</small></button>
      <button class="opt-btn" onclick="selectSize('Midsole De-Yellowing',this)">Midsole Fix<br><small>R250</small></button>
    </div>
    <p style="font-size:13px;color:var(--mid);margin-top:10px;"><i class="fa-solid fa-gift"></i> Free lace cleaning with every pair.</p>
    <div class="calc-label" style="margin-top:20px">How many pairs?</div>
    <div class="qty-control" style="margin-bottom:16px">
      <button class="qty-btn" onclick="adjustQty(-1)"><i class="fa-solid fa-minus"></i></button>
      <div class="qty-val" id="qtyDisplay">1</div>
      <button class="qty-btn" onclick="adjustQty(1)"><i class="fa-solid fa-plus"></i></button>
    </div>`;
    calcState.size = 'perPair';
  } else if (s === 'movein') {
    html = `<div class="calc-label">Number of bedrooms</div>
    <div class="options-grid" style="margin-bottom:20px">
      <button class="opt-btn" onclick="selectBedrooms(1,this)">1 Bedroom</button>
      <button class="opt-btn" onclick="selectBedrooms(2,this)">2 Bedrooms</button>
      <button class="opt-btn" onclick="selectBedrooms(3,this)">3 Bedrooms</button>
      <button class="opt-btn" onclick="selectBedrooms(4,this)">4+ Bedrooms</button>
    </div>
    <p style="font-size:13px;color:var(--mid)">Move-in/move-out deep clean starts from R600 for 1 bedroom.</p>`;
    calcState.bedrooms = 1;
  } else if (s === 'postconstruction' || s === 'postoccupational') {
    html = `<div style="background:var(--teal-light);border-radius:12px;padding:24px;margin-bottom:20px; border: 1px solid rgba(29,170,178,0.3);">
      <p style="font-size:16px;font-weight:700;color:var(--teal-dark);margin-bottom:12px;"><i class="fa-solid fa-clipboard-list"></i> Custom Quote Required</p>
      <p style="font-size:14px;color:var(--mid);line-height:1.6">This service requires an on-site assessment to quote accurately. Please proceed to the next step and we'll contact you to arrange a free site visit or you can WhatsApp us photos of the space.</p>
    </div>`;
  }

  content.innerHTML = html;
}

function selectSize(size, btn) {
  calcState.size = size;
  const parent = btn.closest('.options-grid');
  parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  calcPrice();
}

function selectHouseType(type, btn) {
  calcState.houseType = type;
  const parent = btn.closest('.options-grid');
  parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  calcPrice();
}

function selectBedrooms(n, btn) {
  calcState.bedrooms = n;
  const parent = btn.closest('.options-grid');
  parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  calcPrice();
}

function selectCleanType(type, btn) {
  calcState.cleanType = type;
  const parent = btn.closest('.options-grid');
  parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  calcPrice();
}

function selectFrequency(freq, btn) {
  calcState.frequency = freq;
  const parent = btn.closest('.options-grid');
  parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  calcPrice();
}

function adjustQty(delta) {
  calcState.qty = Math.max(1, calcState.qty + delta);
  const d = document.getElementById('qtyDisplay');
  if (d) d.textContent = calcState.qty;
  calcPrice();
}

function selectUrgency(type, surcharge) {
  calcState.urgency = surcharge;
  calcState.urgencyLabel = type;
  document.querySelectorAll('.urgency-opts .opt-btn').forEach(b => b.classList.remove('selected'));
  event.target.closest('.opt-btn').classList.add('selected');
  calcPrice();
}

function toggleAddon(addon, btn) {
  const idx = calcState.addons.indexOf(addon);
  if (idx > -1) { calcState.addons.splice(idx, 1); btn.classList.remove('selected'); }
  else { calcState.addons.push(addon); btn.classList.add('selected'); }
  calcPrice();
}

function buildAddons() {
  const s = calcState.service;
  const addonList = ADDONS[s] || ADDONS.default;
  const area = document.getElementById('addonsArea');
  if (!area) return;
  if (addonList.length === 0) { area.innerHTML = '<p style="font-size:14px;color:var(--mid)">No add-ons available for this service.</p>'; return; }

  area.innerHTML = addonList.map(a =>
    `<button class="opt-btn" style="font-size:13px; flex-direction:row;" onclick="toggleAddon('${a}',this)">
       <i class="fa-solid fa-plus" style="font-size:12px;"></i> ${a}
     </button>`
  ).join('');
}

function getBasePrice() {
  const s = calcState.service;
  const p = PRICING[s];
  if (!p) return 0;

  let base = 0;
  if (s === 'couch') base = (p[calcState.size] || 0) * calcState.qty;
  else if (s === 'chair') base = (p[calcState.size] || 150) * calcState.qty;
  else if (s === 'carpet' || s === 'rug') base = (p[calcState.size] || 350) * calcState.qty;
  else if (s === 'mattress') base = (p[calcState.size] || 380) * calcState.qty;
  else if (s === 'window') base = Math.max(3, calcState.qty) * 50;
  else if (s === 'house') {
    base = p[Math.min(calcState.bedrooms, 4)] || 1500;
    if (calcState.cleanType === 'deep') base += 300;
    if (calcState.frequency === 'weekly') base = Math.round(base * 0.9);
    if (calcState.frequency === 'monthly') base = Math.round(base * 0.95);
  } else if (s === 'apartment') {
    const aprices = { 1: 1200, 2: 1500, 3: 1800 };
    base = aprices[Math.min(calcState.bedrooms, 3)] || 1200;
    if (calcState.cleanType === 'deep') base += 200;
  } else if (s === 'office') {
    const opmap = { small: 800, medium: 1200, large: 1800 };
    base = opmap[calcState.size] || 800;
  } else if (s === 'car') {
    base = (PRICING.car[calcState.size] || 400) * calcState.qty;
  } else if (s === 'shoes') {
    base = (PRICING.shoes[calcState.size] || 130) * calcState.qty;
  } else if (s === 'movein') {
    const mpmap = { 1: 600, 2: 900, 3: 1200, 4: 1500 };
    base = mpmap[Math.min(calcState.bedrooms, 4)] || 600;
  } else if (s === 'postconstruction') {
    base = 0;
  } else if (s === 'postoccupational') {
    base = 700;
  }
  return base;
}

function getAddonTotal() {
  return calcState.addons.reduce((total, a) => {
    const match = a.match(/\+R(\d+)/);
    return total + (match ? parseInt(match[1]) : 0);
  }, 0);
}

function calcPrice() {
  const base = getBasePrice();
  calcState.basePrice = base;
}

function buildResult() {
  const base = getBasePrice();
  const addons = getAddonTotal();
  const urgency = calcState.urgency || 0;
  const total = base + addons + urgency;

  document.getElementById('totalPrice').textContent = total > 0 ? total.toLocaleString() : 'TBC';

  let rows = `<div class="rb-row"><span>${calcState.serviceName}</span><span>${base > 0 ? 'R' + base.toLocaleString() : 'On-site quote'}</span></div>`;

  calcState.addons.forEach(a => {
    const match = a.match(/\+R(\d+)/);
    if (match) rows += `<div class="rb-row" style="color:var(--mid)"><span>${a.split(' +R')[0]}</span><span>+R${match[1]}</span></div>`;
  });

  if (urgency > 0) rows += `<div class="rb-row" style="color:var(--coral)"><span><i class="fa-solid fa-bolt"></i> Urgency surcharge</span><span>+R${urgency}</span></div>`;

  rows += `<div class="rb-row total"><span>Estimated Total</span><span>R${total > 0 ? total.toLocaleString() : 'TBC'}</span></div>`;

  // Email Confirmation UI
  rows += `
    <div style="background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-top: 24px; text-align: center;">
      <p style="color: red; font-weight: bold; margin-bottom: 16px; font-size: 14px;">ATTACH IMAGES TO THE EMAIL IF NEEDED</p>
      <button onclick="initiateEmailQuote()" class="btn btn-primary" style="width: 100%; justify-content: center;">
        <i class="fa-solid fa-envelope"></i> Confirm quote via email
      </button>
    </div>
  `;

  document.getElementById('breakdownRows').innerHTML = rows;
}

// EMAIL QUOTE INTEGRATION (Estimator Section)
function initiateEmailQuote() {
  const base = getBasePrice();
  const addons = getAddonTotal();
  const urgency = calcState.urgency || 0;
  const total = base + addons + urgency;

  const areaSelect = document.getElementById('areaSelect');
  const area = areaSelect ? areaSelect.options[areaSelect.selectedIndex].text : 'Not specified';

  const addonText = calcState.addons.length > 0 ? calcState.addons.join(', ') : 'None';

  const subject = encodeURIComponent(`Quote Confirmation Request: ${calcState.serviceName}`);

  let bodyText = `Greetings Smalls Cleaning,\n\nI hope this email finds you well.\n\nI would like to confirm a quotation for the following service:\n\n`;
  bodyText += `- Service: ${calcState.serviceName}\n`;

  if (calcState.size) bodyText += `- Type/Size: ${calcState.size}\n`;
  if (calcState.qty > 1) bodyText += `- Quantity: ${calcState.qty}\n`;
  if (calcState.houseType && (calcState.service === 'house' || calcState.service === 'apartment')) {
    bodyText += `- Property Type: ${calcState.houseType}\n`;
    bodyText += `- Bedrooms: ${calcState.bedrooms}\n`;
  }

  bodyText += `- Add-ons: ${addonText}\n`;
  bodyText += `- Area in Polokwane: ${area}\n`;
  if (urgency > 0) bodyText += `- Urgency: ${calcState.urgencyLabel} (+R${urgency})\n`;

  bodyText += `\nEstimated Total: R${total > 0 ? total.toLocaleString() : 'TBC'}\n\n`;
  bodyText += `Please let me know the next steps to confirm the final price and secure the booking.\n\n(Note: I have attached images of the items/space if needed.)\n\nKind regards,`;

  const formattedBody = bodyText.replace(/\n/g, '\r\n');
  const body = encodeURIComponent(formattedBody);

  window.location.href = `mailto:Info@smallscleaningservices.co.za?subject=${subject}&body=${body}`;
}

function goStep(n) {
  document.querySelectorAll('.calc-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + n).classList.add('active');

  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('dot' + i);
    if (i < n) { dot.classList.add('done'); dot.classList.remove('active'); dot.innerHTML = '<i class="fa-solid fa-check"></i>'; }
    else if (i === n) { dot.classList.add('active'); dot.classList.remove('done'); dot.innerHTML = i; }
    else { dot.classList.remove('done', 'active'); dot.innerHTML = i; }

    if (i < 4) {
      const line = document.getElementById('line' + i);
      line.classList.toggle('done', i < n);
    }
  }

  if (n === 3) buildAddons();
  if (n === 4) buildResult();

  // Ensure the top of the calculator stays aligned within the viewport
  const calcWrap = document.querySelector('.calc-wrap');
  const navHeight = document.getElementById('navbar').offsetHeight || 76;
  const padding = 20;
  const yPosition = calcWrap.getBoundingClientRect().top + window.scrollY - navHeight - padding;

  window.scrollTo({ top: yPosition, behavior: 'smooth' });
}

function resetCalc() {
  calcState = { service: '', serviceName: '', size: '', qty: 1, bedrooms: 1, houseType: 'house', cleanType: 'standard', frequency: 'once', mattressSize: 'double', urgency: 0, addons: [], basePrice: 0 };
  document.querySelectorAll('.calc-step .opt-btn').forEach(b => b.classList.remove('selected'));
}

// BOOKING SUBMIT VIA EMAIL CLIENT
function submitBooking() {
  const name = document.getElementById('bName').value.trim();
  const phone = document.getElementById('bPhone').value.trim();
  const email = document.getElementById('bEmail').value.trim();
  const service = document.getElementById('bService').value;
  const address = document.getElementById('bAddress').value.trim();
  const date = document.getElementById('bDate').value;
  const notes = document.getElementById('bNotes').value.trim();

  const msg = document.getElementById('bookingMsg');

  if (!name || !phone || !service || !address || !date) {
    msg.style.display = 'block';
    msg.style.color = 'var(--coral)';
    msg.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fill in your name, phone number, service, address, and preferred date.';
    return;
  }

  // Show status to user
  msg.style.display = 'block';
  msg.style.color = 'var(--teal)';
  msg.innerHTML = '<i class="fa-solid fa-envelope-open-text"></i> Opening your email client to confirm booking...';

  // Prepare Email Link Payload
  const subject = encodeURIComponent(`New Booking Confirmation: ${service} - ${name}`);

  let bodyText = `Greetings Smalls Cleaning,\n\nI would like to confirm my booking for your services. Please find my details below:\n\n`;
  bodyText += `--- Booking Details ---\n`;
  bodyText += `Name: ${name}\n`;
  bodyText += `Phone: ${phone}\n`;
  bodyText += `Email: ${email || 'Not provided'}\n`;
  bodyText += `Service Required: ${service}\n`;
  bodyText += `Address: ${address}\n`;
  bodyText += `Preferred Date: ${date}\n`;
  bodyText += `Notes/Extras: ${notes || 'None'}\n\n`;
  bodyText += `Please reply to confirm my time slot and provide details for the 50% deposit.\n\n(Note: I have attached images of the items/space if needed.)\n\nKind regards,\n${name}`;

  const formattedBody = bodyText.replace(/\n/g, '\r\n');
  const body = encodeURIComponent(formattedBody);

  // Use a slight timeout to let the user see the UI message before the browser opens the mail client
  setTimeout(() => {
    window.location.href = `mailto:Info@smallscleaningservices.co.za?subject=${subject}&body=${body}`;
  }, 500);
}

// SMOOTH NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });

  navLinks.forEach(a => {
    a.style.background = a.getAttribute('href') === '#' + current ? 'var(--teal-light)' : '';
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--teal)' : '';
  });
});

// GALLERY MODAL LOGIC
const galleryData = {
  couch: [
    'assets/images/Couch 1.jpeg',
    'assets/images/Couch 2.jpeg',
    'assets/images/Couch 3.jpeg',
    'assets/images/Couch 4.jpeg',
    'assets/images/Couch 5.jpeg'
  ],
  commercial: [
    'assets/images/Commertial 1.jpeg',
    'assets/images/Commertial 2.jpeg',
    'assets/images/officeclean.jpeg'
  ],
  solar: [
    'assets/images/Solar 1.jpeg',
    'assets/images/Solar 2.jpeg',
  ],
  carpet: [
    'assets/images/Carpet 1.jpeg',
    'assets/images/Carpet 2.jpeg',
    'assets/images/Caropet 3.jpeg',
    'assets/images/Carpet 4.jpeg',
    'assets/images/Carpet 5.jpeg',
    'assets/images/Carpet 6.jpeg',
    'assets/images/carpet 7.jpeg'
  ],
  house: [
    'assets/images/houseclean.jpeg'
  ],
  car: [
    'assets/images/Car Exterior 1.jpeg',
    'assets/images/Car Exterior2.jpeg',
    'assets/images/Car interior 1.jpeg',
    'assets/images/Car interiror 2.jpeg',
    'assets/images/Car Interior 3.jpeg',
    'assets/images/Car Interiror 4.jpeg'
  ],
  mattress: [
    'assets/images/bedcleaning.jpeg',
    'assets/images/Matress 1.jpeg'
  ],
  chairs: [
    'assets/images/Chair 1.jpeg',
    'assets/images/Chair 2.jpeg',
    'assets/images/Chair 3.jpeg'
  ]
};

let currentGalleryCategory = [];
let currentGalleryIndex = 0;

function openGalleryModal(category) {
  currentGalleryCategory = galleryData[category];
  if (!currentGalleryCategory || currentGalleryCategory.length === 0) return;

  currentGalleryIndex = 0;
  updateModalImage();
  document.getElementById('galleryModal').style.display = "flex";
  document.getElementById('galleryModal').style.textAlign = "center";
  document.getElementById('galleryModal').style.justifyContent = "center";
  document.getElementById('galleryModal').style.alignItems = "center";
  document.getElementById('galleryModal').style.flexDirection = "column";
}

function closeGalleryModal() {
  document.getElementById('galleryModal').style.display = "none";
}

function changeModalImage(direction) {
  currentGalleryIndex += direction;

  if (currentGalleryIndex >= currentGalleryCategory.length) {
    currentGalleryIndex = 0;
  } else if (currentGalleryIndex < 0) {
    currentGalleryIndex = currentGalleryCategory.length - 1;
  }

  updateModalImage();
}

function updateModalImage() {
  const imgElement = document.getElementById('galleryModalImg');
  const captionElement = document.getElementById('galleryCaption');

  imgElement.src = currentGalleryCategory[currentGalleryIndex];
}

// Close modal when clicking outside the image
window.onclick = function (event) {
  const modal = document.getElementById('galleryModal');
  if (event.target === modal) {
    closeGalleryModal();
  }
}