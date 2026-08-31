const menu = [
  {
    id: "smash",
    name: "Banani Smash",
    cat: "burgers",
    price: 429,
    spice: "Medium",
    copy: "Double smash, ghee bun, pickle crunch, secret grill sauce.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "naga-burger",
    name: "Naga Inferno Burger",
    cat: "burgers",
    price: 469,
    spice: "Call the fan",
    copy: "Dried naga oil, cheddar melt, cooling slaw if you still have pride.",
    img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wings",
    name: "Naga Honey Wings",
    cat: "chicken",
    price: 399,
    spice: "Hot",
    copy: "Crisp flats tossed in honey-naga glaze. Six pieces of trouble.",
    img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bucket",
    name: "Midnight Fry Bucket",
    cat: "chicken",
    price: 799,
    spice: "Medium",
    copy: "Eight pieces, mustard-oil brine, Dhaka late-shift energy.",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "shawarma",
    name: "Gulshan Shawarma",
    cat: "wraps",
    price: 289,
    spice: "Mild",
    copy: "Garlic toum, pickled onion, charcoal chicken, lavash hug.",
    img: "https://images.unsplash.com/photo-1529006557810-274b0fa69ce7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kebab",
    name: "Beef Kebab Roll",
    cat: "wraps",
    price: 349,
    spice: "Medium",
    copy: "Seekh kebab, green chutney, onion hail. Street, but seated.",
    img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fries",
    name: "Loaded Cheese Fries",
    cat: "sides",
    price: 249,
    spice: "Mild",
    copy: "Hand-cut, nacho flood, chilli flakes, spring onion rain.",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rings",
    name: "Crisp Onion Rings",
    cat: "sides",
    price: 199,
    spice: "Mild",
    copy: "Buttermilk batter, smoked ketchup on the side.",
    img: "https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lassi",
    name: "Mango Lassi Freeze",
    cat: "drinks",
    price: 149,
    spice: "Cool",
    copy: "Alphonso-style mango, yoghurt, a little cardamom.",
    img: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "borhani",
    name: "Spiced Borhani",
    cat: "drinks",
    price: 129,
    spice: "Warm",
    copy: "Wedding-table yoghurt drink. Cuts through the grease like a hero.",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  },
];

const reviews = [
  {
    quote:
      "The Banani Smash tastes like someone finally took Dhaka burgers seriously. Ghee bun is unfair.",
    name: "Farzana Ahmed",
    place: "Dhanmondi 27",
  },
  {
    quote:
      "Naga wings after a late lab at BUET. I walked home sweating and happy. 10/10 would suffer again.",
    name: "Rahim Chowdhury",
    place: "Palashi, Dhaka",
  },
  {
    quote:
      "Ordered the kebab roll to GEC. Still hot, still messy, still the best wrap in Chattogram this month.",
    name: "Nusrat Karim",
    place: "Chattogram",
  },
  {
    quote:
      "Borhani plus fries is a personality. Staff didn’t flinch when I asked for extra naga. Respect.",
    name: "Arif Hasan",
    place: "Gulshan 2",
  },
];

const grid = document.getElementById("menu-grid");
const bag = [];
const drawer = document.getElementById("order-drawer");
const bagList = document.getElementById("bag-list");
const bagEmpty = document.getElementById("bag-empty");
const bagTotal = document.getElementById("bag-total");
const toast = document.getElementById("toast");
const mobileNav = document.querySelector(".mobile-nav");
const track = document.getElementById("review-track");
const dotsWrap = document.getElementById("review-dots");

let reviewIndex = 0;
let reviewTimer;

function taka(n) {
  return `৳${n}`;
}

function renderMenu(filter = "all") {
  grid.innerHTML = menu
    .filter((item) => filter === "all" || item.cat === filter)
    .map(
      (item) => `
      <article class="card" data-cat="${item.cat}">
        <img src="${item.img}" alt="${item.name}" />
        <div class="card-body">
          <p class="spice">${item.spice}</p>
          <h3>${item.name}</h3>
          <p>${item.copy}</p>
          <p class="price">${taka(item.price)}</p>
          <button class="btn btn-primary add" data-add="${item.id}" type="button">Add to bag</button>
        </div>
      </article>`
    )
    .join("");
}

function renderBag() {
  const grouped = bag.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const rows = Object.entries(grouped).map(([id, qty]) => {
    const item = menu.find((m) => m.id === id);
    return `<li><span>${item.name} × ${qty}</span><strong>${taka(item.price * qty)}</strong></li>`;
  });

  bagList.innerHTML = rows.join("");
  bagEmpty.hidden = bag.length > 0;
  const total = bag.reduce((sum, id) => sum + menu.find((m) => m.id === id).price, 0);
  bagTotal.textContent = taka(total);
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("is-on");
  setTimeout(() => toast.classList.remove("is-on"), 1800);
}

function openDrawer() {
  drawer.hidden = false;
}

function closeDrawer() {
  drawer.hidden = true;
}

function renderReview() {
  const item = reviews[reviewIndex];
  track.innerHTML = `
    <article class="review">
      <div class="stars" aria-label="5 stars">★★★★★</div>
      <p>“${item.quote}”</p>
      <footer><strong>${item.name}</strong> · ${item.place}</footer>
    </article>`;
  dotsWrap.innerHTML = reviews
    .map(
      (_, i) =>
        `<button class="dot ${i === reviewIndex ? "is-active" : ""}" data-dot="${i}" aria-label="Review ${i + 1}"></button>`
    )
    .join("");
}

function goReview(step) {
  reviewIndex = (reviewIndex + step + reviews.length) % reviews.length;
  renderReview();
}

function startSlider() {
  clearInterval(reviewTimer);
  reviewTimer = setInterval(() => goReview(1), 5200);
}

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderMenu(btn.dataset.filter);
  });
});

grid.addEventListener("click", (e) => {
  const id = e.target.dataset.add;
  if (!id) return;
  bag.push(id);
  renderBag();
  const item = menu.find((m) => m.id === id);
  showToast(`${item.name} landed in your bag`);
});

document.querySelectorAll("[data-open-order]").forEach((btn) => {
  btn.addEventListener("click", openDrawer);
});

document.querySelectorAll("[data-close-order]").forEach((btn) => {
  btn.addEventListener("click", closeDrawer);
});

drawer.addEventListener("click", (e) => {
  if (e.target === drawer) closeDrawer();
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (!bag.length) {
    showToast("Add something from the grill first");
    return;
  }
  showToast("Counter’s ready — show this bag in Banani, Dhanmondi, or GEC");
  bag.length = 0;
  renderBag();
  closeDrawer();
});

document.querySelector(".nav-toggle").addEventListener("click", () => {
  mobileNav.hidden = !mobileNav.hidden;
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.hidden = true;
  });
});

document.querySelector(".slider-nav.prev").addEventListener("click", () => {
  goReview(-1);
  startSlider();
});

document.querySelector(".slider-nav.next").addEventListener("click", () => {
  goReview(1);
  startSlider();
});

dotsWrap.addEventListener("click", (e) => {
  if (e.target.dataset.dot == null) return;
  reviewIndex = Number(e.target.dataset.dot);
  renderReview();
  startSlider();
});

renderMenu();
renderBag();
renderReview();
startSlider();
