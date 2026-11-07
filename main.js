const translations = {
  cs: {
    pageTitle: "Kalkulačka povrchu válce",
    title: "Kalkulačka povrchu válce",
    subtitle: "Povrch válce bez podstav a s podstavami",
    imageAlt: "Válec s výškou h a poloměrem r",
    diameter: "Vnější průměr",
    diameterPlaceholder: "např. 10",
    length: "Délka válce",
    lengthPlaceholder: "např. 20",
    unit: "Jednotka",
    calculate: "Spočítat",
    withoutBases: "Bez podstav (plášť)",
    withBases: "S podstavami",
    error: "Zadejte kladný průměr a délku.",
    toDark: "Přepnout na tmavý režim",
    toLight: "Přepnout na světlý režim",
  },
  en: {
    pageTitle: "Cylinder Surface Calculator",
    title: "Cylinder surface calculator",
    subtitle: "Cylinder surface area without and with bases",
    imageAlt: "Cylinder with height h and radius r",
    diameter: "Outer diameter",
    diameterPlaceholder: "e.g. 10",
    length: "Length of the cylinder",
    lengthPlaceholder: "e.g. 20",
    unit: "Unit",
    calculate: "Calculate",
    withoutBases: "Without bases (lateral)",
    withBases: "With bases",
    error: "Enter a positive diameter and length.",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
  },
  de: {
    pageTitle: "Zylinder-Oberflächenrechner",
    title: "Zylinder-Oberflächenrechner",
    subtitle: "Oberfläche eines Zylinders ohne und mit Grundflächen",
    imageAlt: "Zylinder mit Höhe h und Radius r",
    diameter: "Außendurchmesser",
    diameterPlaceholder: "z. B. 10",
    length: "Länge des Zylinders",
    lengthPlaceholder: "z. B. 20",
    unit: "Einheit",
    calculate: "Berechnen",
    withoutBases: "Ohne Grundflächen (Mantel)",
    withBases: "Mit Grundflächen",
    error: "Bitte einen positiven Durchmesser und eine Länge eingeben.",
    toDark: "Zum dunklen Modus wechseln",
    toLight: "Zum hellen Modus wechseln",
  },
};

const DEFAULT_LANGUAGE = "cs";

// localStorage can throw in private windows or with blocked site data
function loadSetting(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

window.onload = function () {
  const root = document.documentElement;
  const form = document.getElementById("calculator-form");
  const diameterInput = document.getElementById("outer-diameter");
  const lengthInput = document.getElementById("length-of-the-cylinder");
  const unitSelect = document.getElementById("unit-select");
  const lateralOutput = document.getElementById("lateral-surface");
  const totalOutput = document.getElementById("total-surface");
  const errorMessage = document.getElementById("error-message");
  const themeToggle = document.getElementById("theme-toggle");
  const languageButtons = document.querySelectorAll(".language-button");

  let language = loadSetting("language");
  if (!translations[language]) {
    language = DEFAULT_LANGUAGE;
  }
  let lastResult = null;

  /*---THEME---*/
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function updateThemeToggle() {
    const isDark = root.getAttribute("data-theme") === "dark";
    const label = translations[language][isDark ? "toLight" : "toDark"];
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;
  }

  themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    saveSetting("theme", next);
    updateThemeToggle();
  });

  // Follow the device setting until the user picks a theme themselves
  systemDark.addEventListener("change", function (event) {
    if (loadSetting("theme")) {
      return;
    }
    root.setAttribute("data-theme", event.matches ? "dark" : "light");
    updateThemeToggle();
  });

  /*---LANGUAGE---*/
  function formatArea(value, unit) {
    return (
      value.toLocaleString(language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      unit +
      "²"
    );
  }

  function applyLanguage() {
    const text = translations[language];
    root.lang = language;
    document.title = text.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = text[element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      element.placeholder = text[element.dataset.i18nPlaceholder];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
      element.alt = text[element.dataset.i18nAlt];
    });

    languageButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.dataset.lang === language);
    });

    updateThemeToggle();
    showResult();
  }

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      language = button.dataset.lang;
      saveSetting("language", language);
      applyLanguage();
    });
  });

  /*---CALCULATION---*/
  function showResult() {
    if (!lastResult) {
      lateralOutput.textContent = "–";
      totalOutput.textContent = "–";
      return;
    }
    lateralOutput.textContent = formatArea(lastResult.lateral, lastResult.unit);
    totalOutput.textContent = formatArea(lastResult.total, lastResult.unit);
  }

  function calculate() {
    const outerDiameter = parseFloat(diameterInput.value);
    const cylinderLength = parseFloat(lengthInput.value);

    diameterInput.setAttribute("aria-invalid", !(outerDiameter > 0));
    lengthInput.setAttribute("aria-invalid", !(cylinderLength > 0));

    if (!(outerDiameter > 0) || !(cylinderLength > 0)) {
      errorMessage.hidden = false;
      lastResult = null;
      showResult();
      return;
    }

    const radius = outerDiameter / 2;
    const lateralSurface = Math.PI * outerDiameter * cylinderLength;

    errorMessage.hidden = true;
    lastResult = {
      lateral: lateralSurface,
      total: lateralSurface + 2 * Math.PI * radius * radius,
      unit: unitSelect.value,
    };
    showResult();
  }

  // Covers both the button and pressing Enter in an input
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });

  applyLanguage();
};
