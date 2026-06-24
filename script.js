const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

/* Panels open/close */
const panels = $$("[data-panel]");
const openButtons = $$("[data-open]");
const closeButtons = $$("[data-close]");

function openPanel(name) {
  panels.forEach(p => {
    const isTarget = p.getAttribute("data-panel") === name;
    p.classList.toggle("isOpen", isTarget);
    p.setAttribute("aria-hidden", String(!isTarget));
  });
  // scroll to panel
  const target = $(`[data-panel="${name}"]`);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}
function closePanels() {
  panels.forEach(p => {
    p.classList.remove("isOpen");
    p.setAttribute("aria-hidden", "true");
  });
}

openButtons.forEach(btn => {
  btn.addEventListener("click", () => openPanel(btn.getAttribute("data-open")));
});
closeButtons.forEach(btn => btn.addEventListener("click", closePanels));

/* Tabs inside Menu */
const tabs = $$("[data-tab]");
const tabContents = $$("[data-tab-content]");

function setTab(tabName) {
  tabs.forEach(t => t.classList.toggle("isActive", t.getAttribute("data-tab") === tabName));
  tabContents.forEach(c => c.classList.toggle("isActive", c.getAttribute("data-tab-content") === tabName));
}
tabs.forEach(t => t.addEventListener("click", () => setTab(t.getAttribute("data-tab"))));

/* i18n */
const dict = {
  ro: {
    brand_name: "Restaurant",
    brand_tag: "Meniu • Atmosferă • Contact",
    card_menu: "Meniu",
    card_menu_sub: "Combo • Kebab • Drinks",
    card_atmo: "Atmosferă",
    card_atmo_sub: "Foto • Video • Social",
    card_contact: "Contact",
    card_contact_sub: "Hartă • Telefon • TikTok",
    close: "Închide",

    menu_title: "Meniu",
    tab_combo: "Combo",
    tab_kebab: "Kebab",
    tab_drinks: "Drinks",
    

    atmo_title: "Atmosferă",
    
    

    contact_title: "Contact",
    contact_map: "Google Maps",
    open_map: "Deschide harta",
    
    contact_phone: "Telefon",
   
  },

  ru: {
    brand_name: "Ресторан",
    brand_tag: "Меню • Атмосфера • Контакты",
    card_menu: "Меню",
    card_menu_sub: "Комбо • Кебаб • Напитки",
    card_atmo: "Атмосфера",
    card_atmo_sub: "Фото • Видео • Соцсети",
    card_contact: "Контакты",
    card_contact_sub: "Карта • Телефон • TikTok",
    close: "Закрыть",

    menu_title: "Меню",
    tab_combo: "Комбо",
    tab_kebab: "Кебаб",
    tab_drinks: "Напитки",
    

    atmo_title: "Атмосфера",
    
   

    contact_title: "Контакты",
    contact_map: "Google Maps",
    open_map: "Открыть карту",
    
    contact_phone: "Телефон",
   
  },

  en: {
    brand_name: "Restaurant",
    brand_tag: "Menu • Atmosphere • Contact",
    card_menu: "Menu",
    card_menu_sub: "Combos • Kebab • Drinks",
    card_atmo: "Atmosphere",
    card_atmo_sub: "Photos • Videos • Social",
    card_contact: "Contact",
    card_contact_sub: "Map • Phone • TikTok",
    close: "Close",

    menu_title: "Menu",
    tab_combo: "Combos",
    tab_kebab: "Kebab",
    tab_drinks: "Drinks",
    

    atmo_title: "Atmosphere",
    
  

    contact_title: "Contact",
    contact_map: "Google Maps",
    open_map: "Open map",
    
    contact_phone: "Phone",
    
  }
};

function setLang(lang) {
  document.documentElement.lang = lang;
  $$(".langBtn").forEach(b => b.classList.toggle("isActive", b.dataset.lang === lang));
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });
  localStorage.setItem("site_lang", lang);
}

$$(".langBtn").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

const saved = localStorage.getItem("site_lang") || "ro";
setLang(saved);
setTab("combo");
