const donors = [
  { name: 'Sunrise Bakery', food: 'Bread & pastries', qty: 36, need: 'Any', expiry: 1, location: 'A' },
  { name: 'Green Basket', food: 'Produce boxes', qty: 48, need: 'Vegan', expiry: 2, location: 'B' },
  { name: 'Corner Cafe', food: 'Hot lunch bowls', qty: 24, need: 'Vegetarian', expiry: 1, location: 'C' },
  { name: 'Harvest Kitchen', food: 'Rice & lentils', qty: 60, need: 'Vegan', expiry: 5, location: 'D' },
  { name: 'Daily Dairy', food: 'Yogurt cups', qty: 42, need: 'Vegetarian', expiry: 4, location: 'E' },
  { name: 'Pasta House', food: 'Pasta trays', qty: 76, need: 'Any', expiry: 7, location: 'F' }
];
const hubs = [
  { name: 'Northside Hub', demand: 65, capacity: 80, diet: ['Any', 'Vegan', 'Vegetarian'], location: 'N' },
  { name: 'Eastside Pantry', demand: 54, capacity: 60, diet: ['Vegan', 'Vegetarian'], location: 'P' },
  { name: 'Family Centre', demand: 42, capacity: 50, diet: ['Any', 'Vegetarian'], location: 'Q' },
  { name: 'Youth Shelter', demand: 33, capacity: 40, diet: ['Any', 'Vegan'], location: 'Y' }
];
const points = {
  A: [2.2, 3.96], B: [6.28, 2.52], C: [7.48, 5.48], D: [3, 7], E: [7, 3], F: [4, 4],
  N: [4.84, 7.24], P: [7.84, 2.52], Q: [3.32, 5.48], Y: [6.36, 7.16]
};
const pointsAll = { ...points };
for (let x = 1; x <= 9; x += 2) for (let y = 1; y <= 9; y += 2) pointsAll[`J${x}_${y}`] = [x, y];
const nodes = Object.keys(pointsAll);
const edges = Object.fromEntries(nodes.map(n => [n, []]));

function connect(a, b) {
  const pa = pointsAll[a], pb = pointsAll[b];
  const distance = Math.hypot(pa[0] - pb[0], pa[1] - pb[1]);
  edges[a].push([b, distance]);
  edges[b].push([a, distance]);
}
for (let x = 1; x <= 9; x += 2) {
  for (let y = 1; y <= 9; y += 2) {
    if (x < 9) connect(`J${x}_${y}`, `J${x + 2}_${y}`);
    if (y < 9) connect(`J${x}_${y}`, `J${x}_${y + 2}`);
  }
}
for (const site of Object.keys(points)) {
  const nearest = nodes.filter(n => n.startsWith('J'))
    .map(n => [n, Math.hypot(points[site][0] - pointsAll[n][0], points[site][1] - pointsAll[n][1])])
    .sort((a, b) => a[1] - b[1]).slice(0, 2);
  nearest.forEach(([junction]) => connect(site, junction));
}

function aStar(start, goal) {
  const heuristic = n => Math.hypot(pointsAll[n][0] - pointsAll[goal][0], pointsAll[n][1] - pointsAll[goal][1]);
  const open = [start], cost = { [start]: 0 }, previous = {};
  while (open.length) {
    open.sort((a, b) => cost[a] + heuristic(a) - cost[b] - heuristic(b));
    const current = open.shift();
    if (current === goal) {
      const path = [current];
      while (previous[path[0]]) path.unshift(previous[path[0]]);
      return { distance: +cost[current].toFixed(1), path };
    }
    for (const [next, weight] of edges[current]) {
      const nextCost = cost[current] + weight;
      if (nextCost < (cost[next] ?? Infinity)) {
        previous[next] = current;
        cost[next] = nextCost;
        if (!open.includes(next)) open.push(next);
      }
    }
  }
  return { distance: 99, path: [] };
}

function triangle(x, a, b, c) {
  return Math.max(0, Math.min((x - a) / (b - a || 1), (c - x) / (c - b || 1), 1));
}
function urgency(offer, hub, distance) {
  const clamp = x => Math.max(0, Math.min(1, x));
  const expiry = clamp(1 - offer.expiry / 8);
  const demand = triangle(hub.demand, 0, 65, 100);
  const proximity = clamp(1 - distance / 12);
  const score = Math.max(Math.min(expiry, demand), Math.min(expiry, proximity) * .9, Math.min(demand, proximity) * .55);
  return Math.round(score * 100);
}

// CSP backtracking: one compatible hub per offer, with hub capacity as a hard limit.
function findMatches() {
  const available = hubs.map(hub => ({ ...hub, used: 0 }));
  const ordered = [...donors].sort((a, b) => a.expiry - b.expiry || b.qty - a.qty);
  const assignments = [];
  function assign(index) {
    if (index === ordered.length) return true;
    const offer = ordered[index];
    const candidates = available
      .filter(hub => hub.diet.includes(offer.need) && hub.used + offer.qty <= hub.capacity)
      .map(hub => ({ hub, ...aStar(offer.location, hub.location) }))
      .sort((a, b) => urgency(offer, b.hub, b.distance) - urgency(offer, a.hub, a.distance));
    for (const choice of candidates) {
      choice.hub.used += offer.qty;
      assignments.push({ offer, hub: choice.hub, distance: choice.distance, path: choice.path, score: urgency(offer, choice.hub, choice.distance) });
      if (assign(index + 1)) return true;
      assignments.pop();
      choice.hub.used -= offer.qty;
    }
    return assign(index + 1);
  }
  assign(0);
  return assignments.sort((a, b) => b.score - a.score);
}

function drawRoutes(matches) {
  const xy = node => {
    const [x, y] = pointsAll[node];
    return [(x - 1) / 8 * 720, (y - 1) / 8 * 390];
  };
  document.querySelector('#routePaths').innerHTML = matches.map((match, i) => {
    const coords = match.path.map(xy);
    const d = coords.map((p, j) => `${j ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
    return `<path class="route route${i + 1}" d="${d}"/>`;
  }).join('');
  document.querySelector('#routeSummary').innerHTML = matches.length
    ? matches.map((m, i) => `<div><b>0${i + 1}</b><span><strong>${m.offer.name} → ${m.hub.name}</strong><small>${m.distance} sample units · ${m.offer.qty} meals · priority ${m.score}/100</small></span></div>`).join('')
    : '<p class="empty-state">Your suggested pickups will appear here.</p>';
  document.querySelector('#routes-count').innerHTML = `<i></i> ${matches.length ? Math.min(3, matches.length) + ' suggested routes' : 'No routes yet'}`;
}

function renderMatches() {
  const matches = findMatches();
  const assigned = new Set(matches.map(match => match.offer.name));
  document.querySelector('#matches').innerHTML = matches.length
    ? matches.map((m, i) => `<div class="match"><div class="match-num">0${i + 1}</div><div><h3>${m.offer.name} → ${m.hub.name}</h3><p>${m.offer.qty} meals · ${m.offer.need === 'Any' ? 'Any diet' : m.offer.need} · expires in ${m.offer.expiry}h</p></div><div class="score"><b>${m.score}</b><small>priority / 100</small></div></div>`).join('')
    : '<p class="empty-state">No offers fit the current hub rules and capacity.</p>';
  document.querySelector('#donations').innerHTML = donors.map(offer => `<tr><td>${offer.name}</td><td>${offer.food}</td><td>${offer.qty} meals</td><td><span class="diet">${offer.need}</span></td><td class="${offer.expiry <= 2 ? 'expiry' : ''}">${offer.expiry}h</td><td><span class="status ${assigned.has(offer.name) ? 'matched' : 'unmatched'}">${assigned.has(offer.name) ? 'MATCHED' : 'NO MATCH'}</span></td></tr>`).join('');
  const total = matches.reduce((sum, match) => sum + match.offer.qty, 0);
  document.querySelector('#runStatus').textContent = `${matches.length} of 6 offers matched · ${total} of ${donors.reduce((sum, offer) => sum + offer.qty, 0)} meals placed · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  drawRoutes(matches.slice(0, 3));
  document.querySelector('#reset').disabled = false;
}

document.querySelector('#run').addEventListener('click', () => {
  const button = document.querySelector('#run');
  button.disabled = true;
  button.querySelector('span').textContent = 'Finding matches…';
  requestAnimationFrame(() => {
    renderMatches();
    document.querySelector('#plan').hidden = false;
    document.querySelector('#plan').scrollIntoView({ behavior: 'smooth', block: 'start' });
    button.disabled = false;
    button.querySelector('span').textContent = 'Refresh matches';
  });
});
document.querySelector('#reset').addEventListener('click', () => {
  document.querySelector('#plan').hidden = true;
  document.querySelector('#donations').innerHTML = donors.map(offer => `<tr><td>${offer.name}</td><td>${offer.food}</td><td>${offer.qty} meals</td><td><span class="diet">${offer.need}</span></td><td class="${offer.expiry <= 2 ? 'expiry' : ''}">${offer.expiry}h</td><td><span class="status pending">PENDING</span></td></tr>`).join('');
  document.querySelector('#reset').disabled = true;
  document.querySelector('#run').querySelector('span').textContent = 'Find matches';
  document.querySelector('#routePaths').innerHTML = '';
  document.querySelector('#routeSummary').innerHTML = '<p class="empty-state">Your suggested pickups will appear here.</p>';
  document.querySelector('#routes-count').innerHTML = '<i></i> No routes yet';

  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// The offers are visible on arrival; results appear only after the user starts matching.
document.querySelector('#donations').innerHTML = donors.map(offer => `<tr><td>${offer.name}</td><td>${offer.food}</td><td>${offer.qty} meals</td><td><span class="diet">${offer.need}</span></td><td class="${offer.expiry <= 2 ? 'expiry' : ''}">${offer.expiry}h</td><td><span class="status pending">PENDING</span></td></tr>`).join('');
