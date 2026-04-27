const projects = [
  {
    name: "AmanAsmelash",
    repo: "smba11/AmanAsmelash",
    url: "https://github.com/smba11/AmanAsmelash",
    branch: "main",
    size: "0 KB",
    visibility: "Public",
    initials: "AA",
    focus: "Portfolio",
    color: "linear-gradient(145deg, #f6f0e5, #2ee6c3)",
    description: "The home repo for this personal site and project launcher.",
    notes: ["portfolio repo", "home base for the site", "ready for Vercel deployment"],
  },
  {
    name: "goatedcalc",
    repo: "smba11/goatedcalc",
    url: "https://github.com/smba11/goatedcalc",
    branch: "main",
    size: "3 KB",
    visibility: "Public",
    initials: "GC",
    focus: "Utility",
    color: "linear-gradient(145deg, #12bfa7, #5ce17b)",
    description: "A compact calculator project with a playful name and a tiny footprint.",
    notes: ["small utility build", "good candidate for a polished live demo", "public GitHub repo"],
  },
  {
    name: "the-imposters-game",
    repo: "smba11/the-imposters-game",
    url: "https://github.com/smba11/the-imposters-game",
    branch: "main",
    size: "45 KB",
    visibility: "Public",
    initials: "IG",
    focus: "Game",
    color: "linear-gradient(145deg, #ff554b, #ffb340)",
    description: "A game project centered on hidden roles, suspicion, and social deduction energy.",
    notes: ["game-facing project", "strong showcase piece for interaction", "public GitHub repo"],
  },
  {
    name: "healing-psychotherapy",
    repo: "smba11/healing-psychotherapy",
    url: "https://github.com/smba11/healing-psychotherapy",
    branch: "main",
    size: "44 KB",
    visibility: "Public",
    initials: "HP",
    focus: "Website",
    color: "linear-gradient(145deg, #36b37e, #a1d977)",
    description: "A calm web project for a psychotherapy or healing-focused experience.",
    notes: ["service-site direction", "good visual contrast against game projects", "public GitHub repo"],
  },
  {
    name: "imposter-online",
    repo: "smba11/imposter-online",
    url: "https://github.com/smba11/imposter-online",
    branch: "main",
    size: "1.7 MB",
    visibility: "Public",
    initials: "IO",
    focus: "Online Game",
    color: "linear-gradient(145deg, #306ee8, #22d1c5)",
    description: "A larger online version of an imposter-style game experience.",
    notes: ["largest repo in the launcher", "online game surface", "public GitHub repo"],
  },
  {
    name: "trip-packing-helper",
    repo: "smba11/trip-packing-helper",
    url: "https://github.com/smba11/trip-packing-helper",
    branch: "main",
    size: "42 KB",
    visibility: "Public",
    initials: "TP",
    focus: "Planner",
    color: "linear-gradient(145deg, #fac944, #f3793b)",
    description: "A practical helper for planning what to bring before a trip.",
    notes: ["utility app idea", "clear everyday use case", "public GitHub repo"],
  },
  {
    name: "linkpass",
    repo: "smba11/linkpass",
    url: "https://github.com/smba11/linkpass",
    branch: "main",
    size: "0 KB",
    visibility: "Public",
    initials: "LP",
    focus: "Product",
    color: "linear-gradient(145deg, #111827, #5eead4)",
    description: "A fresh repo with a strong name for a link or access-oriented product.",
    notes: ["early-stage repo", "brandable concept", "public GitHub repo"],
  },
  {
    name: "Wiggler",
    repo: "smba11/Wiggler",
    url: "https://github.com/smba11/Wiggler",
    branch: "main",
    size: "195 KB",
    visibility: "Public",
    initials: "W",
    focus: "Motion",
    color: "linear-gradient(145deg, #ff5a8a, #7c5cff)",
    description: "A playful project with motion baked right into the name.",
    notes: ["playful interaction potential", "medium-sized repo", "public GitHub repo"],
  },
  {
    name: "smbaflex",
    repo: "smba11/smbaflex",
    url: "https://github.com/smba11/smbaflex",
    branch: "main",
    size: "29 KB",
    visibility: "Public",
    initials: "SF",
    focus: "Brand",
    color: "linear-gradient(145deg, #16a34a, #84cc16)",
    description: "A personal-brand project that sounds built to show range and style.",
    notes: ["personal brand fit", "portfolio candidate", "public GitHub repo"],
  },
  {
    name: "Niechelist",
    repo: "smba11/Niechelist",
    url: "https://github.com/smba11/Niechelist",
    branch: "main",
    size: "65 KB",
    visibility: "Private",
    initials: "NL",
    focus: "Curated List",
    color: "linear-gradient(145deg, #6d5dfc, #31c4ff)",
    description: "A private niche-listing project, included here as part of the complete project map.",
    notes: ["private repository", "name suggests curated lists", "link may require GitHub access"],
  },
  {
    name: "smbamusic",
    repo: "smba11/smbamusic",
    url: "https://github.com/smba11/smbamusic",
    branch: "main",
    size: "47 KB",
    visibility: "Public",
    initials: "SM",
    focus: "Music",
    color: "linear-gradient(145deg, #f43f5e, #facc15)",
    description: "A music-flavored project that adds some creative texture to the portfolio.",
    notes: ["creative project lane", "could support audio/media later", "public GitHub repo"],
  },
  {
    name: "Fidel-Labs",
    repo: "smba11/Fidel-Labs",
    url: "https://github.com/smba11/Fidel-Labs",
    branch: "main",
    size: "0 KB",
    visibility: "Public",
    initials: "FL",
    focus: "Lab",
    color: "linear-gradient(145deg, #0f172a, #38bdf8)",
    description: "A lab-style repo with room to become a home for experiments or product ideas.",
    notes: ["early-stage lab", "brandable portfolio label", "public GitHub repo"],
  },
];

const launcher = document.querySelector("#launcher");
const pager = document.querySelector("#pager");
const selectedIcon = document.querySelector("#selectedIcon");
const selectedVisibility = document.querySelector("#selectedVisibility");
const selectedName = document.querySelector("#selectedName");
const selectedDescription = document.querySelector("#selectedDescription");
const selectedRepo = document.querySelector("#selectedRepo");
const selectedBranch = document.querySelector("#selectedBranch");
const selectedSize = document.querySelector("#selectedSize");
const selectedFocus = document.querySelector("#selectedFocus");
const githubLink = document.querySelector("#githubLink");
const notes = document.querySelector("#notes");
const prevProject = document.querySelector("#prevProject");
const nextProject = document.querySelector("#nextProject");
const focusLauncher = document.querySelector("#focusLauncher");

let activeIndex = 0;
let rotation = 0;
let dragStartX = 0;
let dragStartRotation = 0;
let isDragging = false;

function polarToCartesian(angle, radius) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: 50 + Math.cos(radians) * radius,
    y: 50 + Math.sin(radians) * radius,
  };
}

function renderLauncher() {
  launcher.innerHTML = "";
  pager.innerHTML = "";

  projects.forEach((project, index) => {
    const offset = index - activeIndex;
    const angle = offset * 34 - 90 + rotation;
    const radius = index === activeIndex ? 0 : 33 + Math.min(Math.abs(offset), 3) * 1.5;
    const point = polarToCartesian(angle, radius);
    const button = document.createElement("button");
    button.className = `project-face${index === activeIndex ? " is-active" : ""}`;
    button.type = "button";
    button.style.left = `${point.x}%`;
    button.style.top = `${point.y}%`;
    button.style.background = project.color;
    button.style.zIndex = index === activeIndex ? "5" : String(3 - Math.abs(offset));
    button.style.opacity = Math.abs(offset) > 6 ? "0.32" : "1";
    button.setAttribute("aria-label", `Select ${project.name}`);
    button.innerHTML = `<span>${project.initials}</span>`;
    button.addEventListener("click", () => selectProject(index));
    launcher.appendChild(button);

    const dot = document.createElement("span");
    dot.className = `pager-dot${index === activeIndex ? " is-active" : ""}`;
    pager.appendChild(dot);
  });
}

function renderPanel() {
  const project = projects[activeIndex];
  selectedIcon.textContent = project.initials;
  selectedIcon.style.background = project.color;
  selectedVisibility.textContent = project.visibility;
  selectedName.textContent = project.name;
  selectedDescription.textContent = project.description;
  selectedRepo.textContent = project.repo;
  selectedBranch.textContent = project.branch;
  selectedSize.textContent = project.size;
  selectedFocus.textContent = project.focus;
  githubLink.href = project.url;

  notes.innerHTML = "";
  project.notes.forEach((note) => {
    const item = document.createElement("li");
    item.textContent = note;
    notes.appendChild(item);
  });
}

function selectProject(index) {
  activeIndex = (index + projects.length) % projects.length;
  rotation = 0;
  renderLauncher();
  renderPanel();
}

function stepProject(direction) {
  selectProject(activeIndex + direction);
}

launcher.addEventListener("pointerdown", (event) => {
  isDragging = true;
  dragStartX = event.clientX;
  dragStartRotation = rotation;
  launcher.setPointerCapture(event.pointerId);
});

launcher.addEventListener("pointermove", (event) => {
  if (!isDragging) return;
  rotation = dragStartRotation + (event.clientX - dragStartX) * 0.18;
  renderLauncher();
});

launcher.addEventListener("pointerup", (event) => {
  if (!isDragging) return;
  isDragging = false;
  launcher.releasePointerCapture(event.pointerId);
  const delta = event.clientX - dragStartX;
  if (Math.abs(delta) > 35) {
    stepProject(delta > 0 ? -1 : 1);
  } else {
    rotation = 0;
    renderLauncher();
  }
});

launcher.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    stepProject(event.deltaY > 0 ? 1 : -1);
  },
  { passive: false },
);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") stepProject(1);
  if (event.key === "ArrowLeft") stepProject(-1);
});

prevProject.addEventListener("click", () => stepProject(-1));
nextProject.addEventListener("click", () => stepProject(1));
focusLauncher.addEventListener("click", () => launcher.querySelector(".is-active")?.focus());

renderLauncher();
renderPanel();
