/**
 * mainspt.js — LIDE Framework
 * --------------------------------------
 * Layer 1: Core Initialization
 * Layer 2: UI Behavior (Layout & Interaction)
 * --------------------------------------
 */

// ===============================
// 1. Core Initialization
// ===============================

const LIDE = {
  version: "0.2.0-ui",
  initialized: false,
  log(msg) {
    console.log(`[LIDE] ${msg}`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  LIDE.log("Framework Initialized ✅");
  LIDE.initialized = true;

  // Core
  LIDE.initFooterYear();
  LIDE.initMenuToggle();

  // UI Behavior Layer
  // LIDE.initScrollBehavior(); // <-- REMOVED: Auto-scroll behavior
  LIDE.initStickyHeader();

  // Scrollbar layout adjustment
  LIDE.adjustForScrollbar();
  window.addEventListener("resize", LIDE.adjustForScrollbar);
  window.addEventListener("scroll", LIDE.adjustForScrollbar);
});

// ===============================
// 2. Base Utilities (REVISED)
// ===============================

LIDE.initFooterYear = function() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  LIDE.log("Footer year updated");
};

LIDE.initMenuToggle = function() {
  const toggle = document.getElementById("menu-toggle");
  // MODIFICATION: Target the navigation element by its ID from the HTML
  const navMenu = document.getElementById("main-nav");
  
  if (!toggle || !navMenu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    
    // MODIFICATION: Toggle the required 'active' class on the navigation element (main-nav)
    navMenu.classList.toggle("active");
    
    // Optional (but recommended for accessibility/scroll lock)
    document.body.classList.toggle("menu-open"); 

    LIDE.log("Menu toggled");
  });
};

// ===============================
// 3. UI Behavior Layer
// ===============================

// LIDE.initScrollBehavior function REMOVED to disable auto-hiding scrollbar logic.

/**
 * B. Sticky Header
 * Adds shadow or background when scrolling down
 */
LIDE.initStickyHeader = function() {
  const header = document.getElementById("site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) { // <-- Adds 'is-sticky' when scrolling down
      header.classList.add("is-sticky");
    } else { // <-- Removes 'is-sticky' when at the very top
      header.classList.remove("is-sticky");
    }
  });

  LIDE.log("Sticky header initialized");
};

// ===============================
// 4. Scrollbar Layout Adjustment
// ===============================

LIDE.adjustForScrollbar = function() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollbarWidth > 0 ? scrollbarWidth + "px" : "0";
  LIDE.log(`Scrollbar adjustment applied: ${scrollbarWidth}px`);
};
