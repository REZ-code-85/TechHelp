(() => {
"use strict";

const LANGS = window.TECHHELP_LANGUAGES;
const categories = [
  {id:"programs", icon:"▣"},
  {id:"windows", icon:"⊞"},
  {id:"tutorials", icon:"⌘"},
  {id:"ai", icon:"✳"},
  {id:"cybersecurity", icon:"◈"},
  {id:"tools", icon:"⚒"},
  {id:"networks", icon:"⌁"},
  {id:"android", icon:"▣"}
];

const titles = {
  ar: {
    programs:"البرامج", windows:"ويندوز", tutorials:"الشروحات",
    ai:"الذكاء الاصطناعي", cybersecurity:"الأمن السيبراني",
    tools:"الأدوات", networks:"الشبكات", android:"أندرويد",
    articles:"المقالات", about:"عن الموقع", contact:"اتصل بنا",
    privacy:"الخصوصية", home:"الرئيسية"
  },
  en: {
    programs:"Software", windows:"Windows", tutorials:"Tutorials",
    ai:"Artificial intelligence", cybersecurity:"Cybersecurity",
    tools:"Tools", networks:"Networking", android:"Android",
    articles:"Articles", about:"About", contact:"Contact",
    privacy:"Privacy", home:"Home"
  },
  fr: {
    programs:"Logiciels", windows:"Windows", tutorials:"Tutoriels",
    ai:"Intelligence artificielle", cybersecurity:"Cybersécurité",
    tools:"Outils", networks:"Réseaux", android:"Android",
    articles:"Articles", about:"À propos", contact:"Contact",
    privacy:"Confidentialité", home:"Accueil"
  }
};

const categoryDescriptions = {
  ar: {
    programs:"برامج وتطبيقات مفيدة", windows:"إعدادات وحلول ويندوز",
    tutorials:"تعلم خطوة بخطوة", ai:"أدوات وأفكار ذكية",
    cybersecurity:"حماية الخصوصية والحسابات",
    tools:"أدوات رقمية مختارة", networks:"الشبكات والاتصال",
    android:"تطبيقات وإعدادات الهاتف"
  },
  en: {
    programs:"Useful software and apps", windows:"Windows tips and fixes",
    tutorials:"Learn step by step", ai:"AI tools and ideas",
    cybersecurity:"Protect privacy and accounts", tools:"Digital utilities",
    networks:"Networking and connectivity", android:"Phone apps and settings"
  },
  fr: {
    programs:"Logiciels et applications utiles", windows:"Conseils Windows",
    tutorials:"Apprendre étape par étape", ai:"Outils et idées IA",
    cybersecurity:"Protéger comptes et vie privée", tools:"Outils numériques",
    networks:"Réseaux et connectivité", android:"Applications et réglages"
  }
};

const pageDescriptions = {
  ar: {
    programs:"برامج موثوقة وأدوات تساعدك على إنجاز المزيد.",
    windows:"حلول ويندوز وإعداداته وصيانته خطوة بخطوة.",
    tutorials:"شروحات عملية مبسطة من الأساسيات إلى المتقدم.",
    ai:"اكتشف أدوات الذكاء الاصطناعي واستخداماتها.",
    cybersecurity:"تعلم حماية أجهزتك وحساباتك وخصوصيتك.",
    tools:"أدوات رقمية للإنتاجية والتعلم.",
    networks:"افهم الشبكات والاتصال وحل المشكلات.",
    android:"تلميحات وتطبيقات وإعدادات أندرويد.",
    articles:"استكشف المقالات التقنية حسب الموضوع."
  },
  en: {
    programs:"Discover useful software, apps and digital utilities.",
    windows:"Windows tips, settings, troubleshooting and maintenance.",
    tutorials:"Practical guides from basics to advanced workflows.",
    ai:"Discover AI tools and practical ways to use them.",
    cybersecurity:"Learn to protect your devices, accounts and privacy.",
    tools:"Digital tools for productivity and learning.",
    networks:"Understand networks and common connectivity issues.",
    android:"Android tips, apps and settings.",
    articles:"Explore technology articles by topic."
  },
  fr: {
    programs:"Découvrez des logiciels et outils numériques utiles.",
    windows:"Conseils, réglages et dépannage de Windows.",
    tutorials:"Des tutoriels pratiques, des bases aux usages avancés.",
    ai:"Découvrez les outils d’IA et leurs usages pratiques.",
    cybersecurity:"Protégez vos appareils, vos comptes et votre vie privée.",
    tools:"Des outils numériques pour travailler et apprendre.",
    networks:"Comprenez les réseaux et les problèmes de connexion.",
    android:"Conseils, applications et réglages Android.",
    articles:"Explorez les articles technologiques par thème."
  }
};

let lang = localStorage.getItem("techhelp-language") || "ar";
if (!LANGS[lang]) lang = "ar";

const page = document.body.dataset.page || "home";
const rootPage = ["home", "404"].includes(page);
const prefix = rootPage ? "" : "../";
const url = (p) => prefix + p;
const tr = (key) => LANGS[lang][key] || LANGS.en[key] || key;
const textOf = (obj) => obj?.[lang] || obj?.en || "";

function getArticles() {
  return window.TECHHELP_ARTICLES || [];
}

function articleURL(id) {
  return url("pages/article.html") + "?id=" + encodeURIComponent(id);
}

function renderHeader() {
  const nav = [
    ["home", "index.html"],
    ["programs", "pages/programs.html"],
    ["windows", "pages/windows.html"],
    ["tutorials", "pages/tutorials.html"],
    ["ai", "pages/ai.html"],
    ["cybersecurity", "pages/cybersecurity.html"],
    ["tools", "pages/tools.html"],
    ["networks", "pages/networks.html"],
    ["android", "pages/android.html"]
  ];

  document.querySelector("#header").innerHTML = `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="${url("index.html")}" aria-label="Techhelp">
          <span class="brand-mark">T</span>
          <span class="brand-name">tech<span>help</span></span>
        </a>

        <button class="menu-button" id="menu-button"
          aria-label="Toggle navigation" aria-expanded="false">☰</button>

        <nav class="nav-links" id="nav-links">
          ${nav.map(([key, href]) => `
            <a href="${url(href)}"
              class="${page === key ? "active" : ""}"
              data-nav-key="${key}">${titles[lang][key]}</a>
          `).join("")}
        </nav>

        <select class="language-select" id="language-select"
          aria-label="Language">
          <option value="ar">العربية</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </header>`;

  const select = document.querySelector("#language-select");
  select.value = lang;
  select.addEventListener("change", (event) => {
    lang = event.target.value;
    localStorage.setItem("techhelp-language", lang);
    applyLanguage();
  });

  const menu = document.querySelector("#menu-button");
  menu.addEventListener("click", () => {
    const navElement = document.querySelector("#nav-links");
    const open = navElement.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  document.querySelector("#footer").innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-about">
          <a class="brand" href="${url("index.html")}">
            <span class="brand-mark">T</span>
            <span class="brand-name">tech<span>help</span></span>
          </a>
          <p data-i18n="footerAbout">${tr("footerAbout")}</p>
        </div>
        <div class="footer-column">
          <h3 data-i18n="footerExplore">${tr("footerExplore")}</h3>
          ${["programs","windows","tutorials","ai","cybersecurity"].map(
            k => `<a href="${url("pages/"+k+".html")}">${titles[lang][k]}</a>`
          ).join("")}
        </div>
        <div class="footer-column">
          <h3 data-i18n="footerProject">${tr("footerProject")}</h3>
          <a href="${url("pages/about.html")}">${tr("about")}</a>
          <a href="${url("pages/contact.html")}">${tr("contact")}</a>
          <a href="${url("pages/articles.html")}">${tr("articles")}</a>
          <a href="${url("pages/privacy.html")}">${tr("privacy")}</a>
        </div>
      </div>
      <div class="footer-bottom container">
        <span>© ${new Date().getFullYear()} Techhelp —
          <span data-i18n="rights">${tr("rights")}</span></span>
        <a href="${url("pages/404.html")}">404</a>
      </div>
    </footer>`;
}

function renderCategories() {
  const container = document.querySelector("#categories");
  if (!container) return;

  container.innerHTML = categories.map(c => `
    <a class="category-card" href="${url("pages/"+c.id+".html")}">
      <span class="category-icon">${c.icon}</span>
      <h3>${titles[lang][c.id]}</h3>
      <p>${categoryDescriptions[lang][c.id]}</p>
      <span class="card-arrow">↗</span>
    </a>
  `).join("");
}

function articleCard(article) {
  const category = titles[lang][article.category] || article.category;
  return `
    <a class="article-card" href="${articleURL(article.id)}">
      <span class="article-tag">${category}</span>
      <h3>${textOf(article.title)}</h3>
      <p>${textOf(article.description)}</p>
      <span class="article-link" data-i18n="readMore">${tr("readMore")}</span>
    </a>`;
}

function renderArticleLists() {
  const all = getArticles();
  const latest = document.querySelector("#latest-articles");

  if (latest) {
    latest.innerHTML = all.slice(0, 3).map(articleCard).join("");
  }

  const list = document.querySelector("#page-articles");
  if (!list) return;

  const category = list.dataset.category;
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q") || "";
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput && initialQuery) searchInput.value = initialQuery;

  function draw() {
    const query = (searchInput?.value || "").trim().toLocaleLowerCase();
    const matches = all.filter(article => {
      const categoryMatch = category === "all" ||
        article.category === category;
      const searchable = [
        textOf(article.title),
        textOf(article.description),
        titles[lang][article.category] || ""
      ].join(" ").toLocaleLowerCase();
      return categoryMatch && (!query || searchable.includes(query));
    });

    list.innerHTML = matches.length
      ? matches.map(articleCard).join("")
      : `<div class="empty-state">${tr("noResults")}</div>`;

    const count = document.querySelector("#result-count");
    if (count) count.textContent = matches.length;
  }

  searchInput?.addEventListener("input", draw);
  draw();
}

function renderSearch() {
  document.querySelectorAll("[data-search-form]").forEach(form => {
    const input = form.querySelector("[data-search-input]");
    const results = form.querySelector("[data-search-results]");
    if (!input || !results) return;

    function updateResults() {
      const q = input.value.trim().toLocaleLowerCase();
      if (!q) {
        results.hidden = true;
        results.innerHTML = "";
        return;
      }

      const matches = getArticles().filter(a => {
        const fullText = [
          textOf(a.title), textOf(a.description),
          titles[lang][a.category] || ""
        ].join(" ").toLocaleLowerCase();
        return fullText.includes(q);
      }).slice(0, 7);

      results.innerHTML = matches.length
        ? matches.map(a => `
          <a class="search-result" href="${articleURL(a.id)}">
            <strong>${textOf(a.title)}</strong>
            <small>${titles[lang][a.category]}</small>
          </a>`).join("")
        : `<div class="search-result">${tr("noResults")}</div>`;

      results.hidden = false;
    }

    input.addEventListener("input", updateResults);

    form.addEventListener("submit", event => {
      event.preventDefault();
      const q = input.value.trim();
      if (!q) {
        input.focus();
        return;
      }
      location.href = url("pages/articles.html") + "?q=" +
        encodeURIComponent(q);
    });

    document.addEventListener("click", event => {
      if (!form.contains(event.target)) results.hidden = true;
    });
  });
}

function renderArticlePage() {
  if (page !== "article") return;

  const id = new URLSearchParams(location.search).get("id");
  const article = getArticles().find(a => a.id === id);
  const container = document.querySelector("#article-content");

  if (!article) {
    container.innerHTML = `
      <div class="error-code">404</div>
      <h1>${tr("notFound")}</h1>
      <a class="button primary" href="../index.html">${tr("backHome")}</a>`;
    return;
  }

  container.innerHTML = `
    <span class="eyebrow">${titles[lang][article.category]}</span>
    <h1>${textOf(article.title)}</h1>
    <p>${textOf(article.description)}</p>
    <a class="button secondary" href="../pages/articles.html">
      ${tr("allArticles")}
    </a>
    <article class="article-body">
      <h2>${lang === "ar" ? "مقدمة" : lang === "fr" ? "Introduction" : "Introduction"}</h2>
      <p>${textOf(article.description)}</p>
      <div class="notice">
        ${lang === "ar"
          ? "محتوى توضيحي أولي. أضف هنا نص المقال الكامل والمراجع."
          : lang === "fr"
          ? "Contenu de démonstration. Ajoutez ici l’article complet et ses références."
          : "Starter content. Add the complete article and references here."}
      </div>
      <h2>${lang === "ar" ? "خطوات عملية" : lang === "fr" ? "Étapes pratiques" : "Practical steps"}</h2>
      <ol>
        <li>${lang === "ar" ? "حدّد هدفك قبل البدء." : lang === "fr" ? "Définissez votre objectif." : "Define your goal."}</li>
        <li>${lang === "ar" ? "استخدم مصادر موثوقة." : lang === "fr" ? "Utilisez des sources fiables." : "Use reliable sources."}</li>
        <li>${lang === "ar" ? "تحقق من النتائج قبل تطبيقها." : lang === "fr" ? "Vérifiez les résultats avant application." : "Verify results before applying changes."}</li>
      </ol>
    </article>`;
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (LANGS[lang][key]) el.innerHTML = LANGS[lang][key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (LANGS[lang][key]) el.placeholder = LANGS[lang][key];
  });

  const title = document.querySelector("[data-page-title]");
  if (title && titles[lang][page]) title.textContent = titles[lang][page];

  const description = document.querySelector("[data-page-description]");
  if (description && pageDescriptions[lang][page]) {
    description.textContent = pageDescriptions[lang][page];
  }

  renderHeader();
  renderFooter();
  renderCategories();
  renderArticleLists();
  renderSearch();
  renderArticlePage();
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector("#form-status").textContent =
      tr("contactSuccess");
  });
}

async function init() {
  try {
    const response = await fetch(url("assets/data/articles.json"));
    if (!response.ok) throw new Error("Could not load articles");
    window.TECHHELP_ARTICLES = await response.json();
  } catch (error) {
    console.error("Techhelp articles could not be loaded.", error);
    window.TECHHELP_ARTICLES = [];
  }

  renderHeader();
  renderFooter();
  applyLanguage();
  setupContactForm();
}

document.addEventListener("DOMContentLoaded", init);
})();
