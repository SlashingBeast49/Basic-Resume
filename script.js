const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("hs-theme");
if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem("hs-theme", next);
});

menuToggle.addEventListener("click", () => {
  const isOpen = !mobileMenu.hidden;
  mobileMenu.hidden = isOpen;
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const output = document.getElementById("terminalOutput");
const form = document.getElementById("terminalForm");
const input = document.getElementById("terminalInput");

const commands = {
  help: () => `available:
  about       short bio
  whoami      identify the human
  projects    serious projects
  sidequests  unnecessary projects
  now         what I'm doing
  skills      things I'm learning
  journey     the timeline
  contact     links
  ls          website sections
  cat about.txt
  neofetch    totally accurate system info
  clear       clear terminal
  exit        return to the top`,
  about: () => "H. Siddarth — 11th-grade PCMC student exploring programming, data science, AI and software by building things.",
  whoami: () => "h.siddarth\\nstudent / builder / professional debugger of his own code",
  projects: () => "Project Helix\\nProject Forge\\nPROOF (in development)",
  sidequests: () => "Rickroll Checker\\nAbsurd README Generator\\nProject Φ\\n...more questionable ideas incoming",
  now: () => "JEE prep\\nPython + data science\\nbuilding Helix / Forge / PROOF",
  skills: () => "Python · HTML · CSS · JavaScript\\npandas · JSON/CSV · SQLite · Git/GitHub\\nexploring: data science · ML · AI · APIs",
  journey: () => "started programming → small Python projects → Forge → Helix → data science / AI / ML → current JEE + coding phase",
  contact: () => "email: me@thehsiddarth.com\\ngithub: SlashingBeast49\\nx: @thehsiddarth\\nlinkedin: H. Siddarth",
  ls: () => "about/  projects/  sidequests/  now/  lab/  notes/  journey/  uses/  contact/  terminal/",
  "cat about.txt": () => "I learn best by building things.\\nSome are serious. Some are experiments. Some are completely unnecessary.",
  neofetch: () => "        H S\\n   ┌─────────────┐\\n   │ HS / student │\\n   │ PCMC + JEE   │\\n   │ Python       │\\n   │ data curious │\\n   └─────────────┘\\n uptime: still going",
  sudo: () => "nice try. this terminal has absolutely no privileges.",
  exit: () => "There is no real terminal to exit. Try `home` or scroll up.",
  home: () => "Use the page navigation, or type `ls` to see the map."
};

function print(text, kind="normal") {
  const div = document.createElement("p");
  div.className = `terminal-line ${kind}`;
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

print("HS_TERMINAL v0.1");
print("Type `help` for commands.");
print("");

form.addEventListener("submit", event => {
  event.preventDefault();
  const command = input.value.trim().toLowerCase();
  if (!command) return;
  print(`guest@h-siddarth:~$ ${command}`, "command");

  if (command === "clear") {
    output.innerHTML = "";
  } else {
    const result = commands[command];
    print(result ? result() : `command not found: ${command}\\ntry: help`);
  }
  input.value = "";
});

document.getElementById("terminal").addEventListener("click", () => input.focus());

const revealTargets = document.querySelectorAll(".project-card,.sidequest-card,.notes-grid article,.timeline>div");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = entry.target.style.transform || "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .08});

revealTargets.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(12px)";
  el.style.transition = "opacity .5s ease, transform .5s ease";
  observer.observe(el);
});
