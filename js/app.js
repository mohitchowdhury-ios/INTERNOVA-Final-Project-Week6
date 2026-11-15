/**
 * ============================================================================
 * DevPulse - Interactive Developer Knowledge Engine
 * 6-Week Web Development Capstone Project
 * 
 * Features Demonstrated:
 * - Functions (Arrow functions, event handlers, sanitizers, state managers)
 * - Arrays & Objects (Resource catalog data model, filters, bookmarks)
 * - Array Methods (filter, reduce, sort, find, findIndex, map, forEach)
 * - DOM Manipulation (Dynamic card rendering, modals, drawer, accordion)
 * - Event Handling (Click, submit, input, keydown, change)
 * - Form Validation (Real-time regex checking & custom error feedback)
 * - LocalStorage Persistence (Bookmarks, custom submissions, theme settings)
 * ============================================================================
 */

// Initial Seed Dataset representing rich developer assets
const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    title: 'MDN Web Docs — Modern JavaScript Guide',
    category: 'frontend',
    rating: 5.0,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    tags: ['JavaScript', 'HTML5', 'Web API', 'Reference'],
    description: 'The golden standard of documentation covering deep ECMAScript specs, DOM APIs, and modern async patterns.',
    date: '2026-10-15',
    featured: true
  },
  {
    id: 'res-2',
    title: 'Clean Architecture in Node.js & Express',
    category: 'backend',
    rating: 4.9,
    url: 'https://nodejs.org/en/docs',
    tags: ['Node.js', 'REST API', 'Architecture', 'TypeScript'],
    description: 'Comprehensive guidelines for structuring scalable backend services, dependency injection, and data persistence.',
    date: '2026-10-18',
    featured: true
  },
  {
    id: 'res-3',
    title: 'Docker & Kubernetes Hands-On Production Handbook',
    category: 'devops',
    rating: 4.8,
    url: 'https://www.docker.com',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'Containers'],
    description: 'Step-by-step blueprints for containerizing microservices, writing production Dockerfiles, and deploying to clusters.',
    date: '2026-10-22',
    featured: false
  },
  {
    id: 'res-4',
    title: 'Modern CSS Flexbox & CSS Grid Mastery',
    category: 'frontend',
    rating: 4.9,
    url: 'https://css-tricks.com',
    tags: ['CSS3', 'Flexbox', 'Grid', 'Responsive'],
    description: 'Master the CSS Box Model, responsive layout architectures, custom properties, and fluid typography.',
    date: '2026-10-25',
    featured: true
  },
  {
    id: 'res-5',
    title: 'Refactoring UI & Design Principles for Developers',
    category: 'design',
    rating: 4.9,
    url: 'https://www.refactoringui.com',
    tags: ['UI/UX', 'Figma', 'Accessibility', 'Color Theory'],
    description: 'Practical tactics for engineers to design beautiful, user-friendly interfaces without formal graphic design training.',
    date: '2026-10-28',
    featured: false
  },
  {
    id: 'res-6',
    title: 'FastAPI & Python Microservices Architecture',
    category: 'backend',
    rating: 4.8,
    url: 'https://fastapi.tiangolo.com',
    tags: ['Python', 'FastAPI', 'AsyncIO', 'OpenAPI'],
    description: 'High-performance, async web framework for building modern APIs with automatic interactive documentation.',
    date: '2026-11-01',
    featured: false
  },
  {
    id: 'res-7',
    title: 'GitHub Actions CI/CD Pipeline Automation',
    category: 'devops',
    rating: 4.7,
    url: 'https://docs.github.com/en/actions',
    tags: ['GitHub', 'CI/CD', 'DevOps', 'Automation'],
    description: 'Automate testing, linting, building, and deployment workflows directly within your GitHub repositories.',
    date: '2026-11-04',
    featured: false
  },
  {
    id: 'res-8',
    title: 'Hugging Face Open Source AI & Transformers',
    category: 'ai',
    rating: 4.9,
    url: 'https://huggingface.co',
    tags: ['AI', 'PyTorch', 'Transformers', 'NLP'],
    description: 'The definitive hub for downloading, fine-tuning, and integrating state-of-the-art machine learning models.',
    date: '2026-11-08',
    featured: true
  },
  {
    id: 'res-9',
    title: 'TypeScript Deep Dive & Advanced Generics',
    category: 'frontend',
    rating: 4.8,
    url: 'https://www.typescriptlang.org',
    tags: ['TypeScript', 'Static Typing', 'Generics', 'Frontend'],
    description: 'In-depth exploration of TypeScript type systems, utility types, mapped types, and strict compiler configs.',
    date: '2026-11-10',
    featured: false
  },
  {
    id: 'res-10',
    title: 'Prompt Engineering & LLM Application Patterns',
    category: 'ai',
    rating: 4.7,
    url: 'https://platform.openai.com/docs',
    tags: ['LLM', 'AI', 'Prompt Engineering', 'LangChain'],
    description: 'Practical design patterns for integrating generative AI, embeddings, vector databases, and autonomous agents.',
    date: '2026-11-14',
    featured: false
  }
];

// ============================================================================
// Application State
// ============================================================================
let state = {
  resources: [],
  bookmarks: new Set(),
  activeCategory: 'all',
  searchQuery: '',
  sortMode: 'featured',
  viewMode: 'grid',
  theme: 'light'
};

// ============================================================================
// DOM Element Cache
// ============================================================================
const DOM = {
  // Navigation & Theme
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeToggleIcon: document.getElementById('themeToggleIcon'),
  mobileMenuToggle: document.getElementById('mobileMenuToggle'),
  mainNav: document.getElementById('mainNav'),
  navLinks: document.querySelectorAll('.nav-link'),

  // Catalog Filters & Search
  resourceSearchInput: document.getElementById('resourceSearchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  categoryPills: document.querySelectorAll('.pill-filter'),
  sortBySelect: document.getElementById('sortBySelect'),
  viewGridBtn: document.getElementById('viewGridBtn'),
  viewListBtn: document.getElementById('viewListBtn'),
  resourceGrid: document.getElementById('resourceGrid'),
  emptyCatalogState: document.getElementById('emptyCatalogState'),
  resultsCounter: document.getElementById('resultsCounter'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  statResourceCount: document.getElementById('statResourceCount'),

  // Bookmark Drawer
  bookmarkDrawerBtn: document.getElementById('bookmarkDrawerBtn'),
  bookmarkDrawer: document.getElementById('bookmarkDrawer'),
  closeDrawerBtn: document.getElementById('closeDrawerBtn'),
  bookmarkList: document.getElementById('bookmarkList'),
  bookmarkCountBadge: document.getElementById('bookmarkCountBadge'),
  emptyBookmarkNotice: document.getElementById('emptyBookmarkNotice'),
  clearAllBookmarksBtn: document.getElementById('clearAllBookmarksBtn'),

  // Add Resource Modal
  openSubmitModalBtn: document.getElementById('openSubmitModalBtn'),
  submitModal: document.getElementById('submitModal'),
  closeSubmitModalBtn: document.getElementById('closeSubmitModalBtn'),
  cancelSubmitModalBtn: document.getElementById('cancelSubmitModalBtn'),
  addResourceForm: document.getElementById('addResourceForm'),

  // Modal Inputs & Errors
  modalTitle: document.getElementById('modalTitle'),
  modalCategory: document.getElementById('modalCategory'),
  modalRating: document.getElementById('modalRating'),
  modalUrl: document.getElementById('modalUrl'),
  modalTags: document.getElementById('modalTags'),
  modalDescription: document.getElementById('modalDescription'),
  modalTitleError: document.getElementById('modalTitleError'),
  modalCategoryError: document.getElementById('modalCategoryError'),
  modalRatingError: document.getElementById('modalRatingError'),
  modalUrlError: document.getElementById('modalUrlError'),
  modalDescriptionError: document.getElementById('modalDescriptionError'),

  // Details Modal
  detailsModal: document.getElementById('detailsModal'),
  closeDetailsModalBtn: document.getElementById('closeDetailsModalBtn'),
  detailBadge: document.getElementById('detailBadge'),
  detailTitle: document.getElementById('detailTitle'),
  detailRating: document.getElementById('detailRating'),
  detailDate: document.getElementById('detailDate'),
  detailDesc: document.getElementById('detailDesc'),
  detailTags: document.getElementById('detailTags'),
  detailExternalLink: document.getElementById('detailExternalLink'),
  detailBookmarkToggleBtn: document.getElementById('detailBookmarkToggleBtn'),

  // Accordion & Contact
  faqAccordion: document.getElementById('faqAccordion'),
  contactForm: document.getElementById('contactForm'),
  contactName: document.getElementById('contactName'),
  contactEmail: document.getElementById('contactEmail'),
  contactSubject: document.getElementById('contactSubject'),
  contactMessage: document.getElementById('contactMessage'),
  nameError: document.getElementById('nameError'),
  emailError: document.getElementById('emailError'),
  messageError: document.getElementById('messageError'),

  // Hero Actions
  heroDemoBtn: document.getElementById('heroDemoBtn'),

  // Toast Container
  toastNotificationContainer: document.getElementById('toastNotificationContainer')
};

// ============================================================================
// Initialization Routine
// ============================================================================
function initApp() {
  loadStoredPreferences();
  renderCatalog();
  updateBookmarkBadges();
  updateStats();
  bindEventHandlers();
}

/**
 * Loads persisted settings from browser LocalStorage
 */
function loadStoredPreferences() {
  // Theme load
  const savedTheme = localStorage.getItem('devpulse_theme') || 'light';
  state.theme = savedTheme;
  applyTheme(savedTheme);

  // Bookmarks load
  try {
    const savedBookmarks = JSON.parse(localStorage.getItem('devpulse_bookmarks') || '[]');
    state.bookmarks = new Set(savedBookmarks);
  } catch (err) {
    state.bookmarks = new Set();
  }

  // Resources load (seed defaults + user custom submissions)
  try {
    const storedResources = JSON.parse(localStorage.getItem('devpulse_resources'));
    if (storedResources && Array.isArray(storedResources) && storedResources.length > 0) {
      state.resources = storedResources;
    } else {
      state.resources = [...INITIAL_RESOURCES];
      saveResources();
    }
  } catch (err) {
    state.resources = [...INITIAL_RESOURCES];
  }
}

function saveResources() {
  localStorage.setItem('devpulse_resources', JSON.stringify(state.resources));
}

function saveBookmarks() {
  localStorage.setItem('devpulse_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
}

// ============================================================================
// Filtering, Sorting, and Calculation Engines
// ============================================================================
function getFilteredResources() {
  const query = state.searchQuery.trim().toLowerCase();
  const category = state.activeCategory;

  // Array.prototype.filter implementation
  let results = state.resources.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;

    const matchesSearch = query === '' ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  // Array.prototype.sort implementation
  results.sort((a, b) => {
    switch (state.sortMode) {
      case 'rating-desc':
        return b.rating - a.rating;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'featured':
      default:
        // Featured items first, then rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });

  return results;
}

// ============================================================================
// DOM Rendering Functions
// ============================================================================
function renderCatalog() {
  const filtered = getFilteredResources();
  DOM.resourceGrid.innerHTML = '';

  // Update layout class
  if (state.viewMode === 'list') {
    DOM.resourceGrid.classList.add('list-layout');
  } else {
    DOM.resourceGrid.classList.remove('list-layout');
  }

  // Update counter badge
  DOM.resultsCounter.textContent = `Showing ${filtered.length} of ${state.resources.length} resources`;

  if (filtered.length === 0) {
    DOM.emptyCatalogState.style.display = 'block';
  } else {
    DOM.emptyCatalogState.style.display = 'none';

    filtered.forEach(res => {
      const isBookmarked = state.bookmarks.has(res.id);
      const card = createResourceCardElement(res, isBookmarked);
      DOM.resourceGrid.appendChild(card);
    });
  }
}

/**
 * Creates an interactive resource card element
 */
function createResourceCardElement(res, isBookmarked) {
  const article = document.createElement('article');
  article.className = 'resource-card';
  article.dataset.id = res.id;

  const tagsHTML = (res.tags || [])
    .slice(0, 3)
    .map(tag => `<span class="tag-item">#${escapeHTML(tag)}</span>`)
    .join('');

  article.innerHTML = `
    <div class="card-content">
      <div class="card-top">
        <span class="track-badge ${escapeHTML(res.category)}">${escapeHTML(res.category)}</span>
        <button 
          class="bookmark-icon-btn ${isBookmarked ? 'bookmarked' : ''}" 
          data-id="${res.id}" 
          title="${isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}"
          aria-label="Bookmark resource"
        >
          ${isBookmarked ? '🔖' : '🤍'}
        </button>
      </div>

      <h3 class="resource-title">${escapeHTML(res.title)}</h3>
      <p class="resource-description">${escapeHTML(res.description)}</p>

      <div class="tags-container">
        ${tagsHTML}
      </div>
    </div>

    <div class="card-footer">
      <span class="rating-badge">⭐ ${res.rating.toFixed(1)}</span>
      <div class="card-btn-group">
        <button class="btn btn-secondary inspect-btn" data-id="${res.id}">Details</button>
        <a href="${escapeHTML(res.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit ↗</a>
      </div>
    </div>
  `;

  return article;
}

/**
 * Updates stats counters in hero
 */
function updateStats() {
  if (DOM.statResourceCount) {
    DOM.statResourceCount.textContent = `${state.resources.length}+`;
  }
}

/**
 * Updates bookmark drawer and badge counter
 */
function updateBookmarkBadges() {
  const count = state.bookmarks.size;
  DOM.bookmarkCountBadge.textContent = count;

  DOM.bookmarkList.innerHTML = '';
  if (count === 0) {
    DOM.emptyBookmarkNotice.style.display = 'block';
  } else {
    DOM.emptyBookmarkNotice.style.display = 'none';

    state.bookmarks.forEach(id => {
      const item = state.resources.find(r => r.id === id);
      if (item) {
        const li = document.createElement('li');
        li.className = 'bookmark-item';
        li.innerHTML = `
          <div>
            <h4>${escapeHTML(item.title)}</h4>
            <span class="track-badge ${escapeHTML(item.category)}">${escapeHTML(item.category)}</span>
          </div>
          <button class="modal-close-btn remove-bookmark-btn" data-id="${item.id}" title="Remove bookmark">✕</button>
        `;
        DOM.bookmarkList.appendChild(li);
      }
    });
  }
}

// ============================================================================
// Modal Handlers
// ============================================================================
function openSubmitModal() {
  DOM.submitModal.classList.add('active');
  DOM.submitModal.setAttribute('aria-hidden', 'false');
  DOM.modalTitle.focus();
}

function closeSubmitModal() {
  DOM.submitModal.classList.remove('active');
  DOM.submitModal.setAttribute('aria-hidden', 'true');
  DOM.addResourceForm.reset();
  clearSubmitFormErrors();
}

function clearSubmitFormErrors() {
  DOM.modalTitleError.textContent = '';
  DOM.modalCategoryError.textContent = '';
  DOM.modalRatingError.textContent = '';
  DOM.modalUrlError.textContent = '';
  DOM.modalDescriptionError.textContent = '';
  [DOM.modalTitle, DOM.modalCategory, DOM.modalRating, DOM.modalUrl, DOM.modalDescription].forEach(input => {
    input.classList.remove('is-invalid');
  });
}

/**
 * Validates new resource submission
 */
function validateResourceForm(title, category, rating, url, description) {
  let isValid = true;
  clearSubmitFormErrors();

  if (!title || title.trim().length < 3) {
    DOM.modalTitleError.textContent = 'Title must be at least 3 characters long.';
    DOM.modalTitle.classList.add('is-invalid');
    isValid = false;
  }

  if (!category) {
    DOM.modalCategoryError.textContent = 'Please choose a technology category.';
    DOM.modalCategory.classList.add('is-invalid');
    isValid = false;
  }

  const numRating = parseFloat(rating);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    DOM.modalRatingError.textContent = 'Rating must be between 1.0 and 5.0.';
    DOM.modalRating.classList.add('is-invalid');
    isValid = false;
  }

  if (!url || !url.startsWith('http')) {
    DOM.modalUrlError.textContent = 'Please provide a valid web URL (e.g. https://...).';
    DOM.modalUrl.classList.add('is-invalid');
    isValid = false;
  }

  if (!description || description.trim().length < 10) {
    DOM.modalDescriptionError.textContent = 'Description must be at least 10 characters.';
    DOM.modalDescription.classList.add('is-invalid');
    isValid = false;
  }

  return isValid;
}

/**
 * Handles adding a new resource from modal
 */
function handleAddResource(e) {
  e.preventDefault();

  const title = DOM.modalTitle.value;
  const category = DOM.modalCategory.value;
  const rating = DOM.modalRating.value;
  const url = DOM.modalUrl.value;
  const rawTags = DOM.modalTags.value;
  const description = DOM.modalDescription.value;

  const valid = validateResourceForm(title, category, rating, url, description);
  if (!valid) return;

  const parsedTags = rawTags
    ? rawTags.split(',').map(t => t.trim()).filter(Boolean)
    : [category.toUpperCase()];

  const newResource = {
    id: `res-${Date.now()}`,
    title: title.trim(),
    category,
    rating: parseFloat(rating),
    url: url.trim(),
    tags: parsedTags,
    description: description.trim(),
    date: new Date().toISOString().split('T')[0],
    featured: false
  };

  state.resources.unshift(newResource);
  saveResources();
  updateStats();
  renderCatalog();
  closeSubmitModal();
  showToast('Resource published successfully!', 'success');
}

/**
 * Opens details inspector modal
 */
function openDetailsModal(id) {
  const item = state.resources.find(r => r.id === id);
  if (!item) return;

  DOM.detailBadge.className = `track-badge ${item.category}`;
  DOM.detailBadge.textContent = item.category.toUpperCase();
  DOM.detailTitle.textContent = item.title;
  DOM.detailRating.textContent = `⭐ ${item.rating.toFixed(1)} / 5.0`;
  DOM.detailDate.textContent = `Published on ${item.date}`;
  DOM.detailDesc.textContent = item.description;
  DOM.detailExternalLink.href = item.url;

  DOM.detailTags.innerHTML = (item.tags || [])
    .map(t => `<span class="tag-item">#${escapeHTML(t)}</span>`)
    .join('');

  // Setup bookmark toggle button inside modal
  const isBookmarked = state.bookmarks.has(item.id);
  DOM.detailBookmarkToggleBtn.textContent = isBookmarked ? '✓ Bookmarked' : '🔖 Bookmark Resource';
  DOM.detailBookmarkToggleBtn.onclick = () => {
    toggleBookmark(item.id);
    const updated = state.bookmarks.has(item.id);
    DOM.detailBookmarkToggleBtn.textContent = updated ? '✓ Bookmarked' : '🔖 Bookmark Resource';
  };

  DOM.detailsModal.classList.add('active');
  DOM.detailsModal.setAttribute('aria-hidden', 'false');
}

function closeDetailsModal() {
  DOM.detailsModal.classList.remove('active');
  DOM.detailsModal.setAttribute('aria-hidden', 'true');
}

// ============================================================================
// Bookmarking Engine
// ============================================================================
function toggleBookmark(id) {
  if (state.bookmarks.has(id)) {
    state.bookmarks.delete(id);
    showToast('Bookmark removed.', 'info');
  } else {
    state.bookmarks.add(id);
    showToast('Resource bookmarked!', 'success');
  }

  saveBookmarks();
  updateBookmarkBadges();
  renderCatalog();
}

function openBookmarkDrawer() {
  DOM.bookmarkDrawer.classList.add('active');
  DOM.bookmarkDrawer.setAttribute('aria-hidden', 'false');
}

function closeBookmarkDrawer() {
  DOM.bookmarkDrawer.classList.remove('active');
  DOM.bookmarkDrawer.setAttribute('aria-hidden', 'true');
}

function clearAllBookmarks() {
  if (state.bookmarks.size === 0) return;
  const ok = confirm('Clear all saved bookmarks?');
  if (ok) {
    state.bookmarks.clear();
    saveBookmarks();
    updateBookmarkBadges();
    renderCatalog();
    showToast('All bookmarks cleared.', 'info');
  }
}

// ============================================================================
// Contact Form & Validation
// ============================================================================
function handleContactSubmit(e) {
  e.preventDefault();

  const name = DOM.contactName.value.trim();
  const email = DOM.contactEmail.value.trim();
  const message = DOM.contactMessage.value.trim();

  let isValid = true;
  DOM.nameError.textContent = '';
  DOM.emailError.textContent = '';
  DOM.messageError.textContent = '';
  [DOM.contactName, DOM.contactEmail, DOM.contactMessage].forEach(i => i.classList.remove('is-invalid'));

  if (!name || name.length < 2) {
    DOM.nameError.textContent = 'Please enter your name (at least 2 characters).';
    DOM.contactName.classList.add('is-invalid');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    DOM.emailError.textContent = 'Please enter a valid email address.';
    DOM.contactEmail.classList.add('is-invalid');
    isValid = false;
  }

  if (!message || message.length < 10) {
    DOM.messageError.textContent = 'Message must be at least 10 characters long.';
    DOM.contactMessage.classList.add('is-invalid');
    isValid = false;
  }

  if (!isValid) return;

  DOM.contactForm.reset();
  showToast('Thank you! Your message has been sent successfully.', 'success');
}

// ============================================================================
// Theme Management
// ============================================================================
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    DOM.themeToggleIcon.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    DOM.themeToggleIcon.textContent = '🌙';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(state.theme);
  localStorage.setItem('devpulse_theme', state.theme);
}

// ============================================================================
// Notification Toast System
// ============================================================================
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✅' : type === 'danger' ? '⚠️' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;

  DOM.toastNotificationContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ============================================================================
// Utility Functions
// ============================================================================
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// Event Listeners Binding (Task 3 & 4)
// ============================================================================
function bindEventHandlers() {
  // Theme Toggle
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);

  // Mobile Navigation Menu Toggle
  DOM.mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = DOM.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    DOM.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    DOM.mainNav.classList.toggle('mobile-active');
  });

  // Close mobile nav when clicking any nav link
  DOM.navLinks.forEach(link => {
    link.addEventListener('click', () => {
      DOM.mainNav.classList.remove('mobile-active');
      DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Search Input Event
  DOM.resourceSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    DOM.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
    renderCatalog();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.resourceSearchInput.value = '';
    state.searchQuery = '';
    DOM.clearSearchBtn.style.display = 'none';
    renderCatalog();
    DOM.resourceSearchInput.focus();
  });

  // Category Filter Pills
  DOM.categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      DOM.categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.dataset.category;
      renderCatalog();
    });
  });

  // Footer Category Quick Filters
  document.querySelectorAll('[data-filter-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.dataset.filterLink;
      const targetPill = document.querySelector(`.pill-filter[data-category="${cat}"]`);
      if (targetPill) {
        DOM.categoryPills.forEach(p => p.classList.remove('active'));
        targetPill.classList.add('active');
        state.activeCategory = cat;
        renderCatalog();
      }
    });
  });

  // Sort Selector
  DOM.sortBySelect.addEventListener('change', (e) => {
    state.sortMode = e.target.value;
    renderCatalog();
  });

  // View Mode Toggles
  DOM.viewGridBtn.addEventListener('click', () => {
    DOM.viewGridBtn.classList.add('active');
    DOM.viewListBtn.classList.remove('active');
    state.viewMode = 'grid';
    renderCatalog();
  });

  DOM.viewListBtn.addEventListener('click', () => {
    DOM.viewListBtn.classList.add('active');
    DOM.viewGridBtn.classList.remove('active');
    state.viewMode = 'list';
    renderCatalog();
  });

  // Reset Filters Button
  DOM.resetFiltersBtn.addEventListener('click', () => {
    state.searchQuery = '';
    state.activeCategory = 'all';
    DOM.resourceSearchInput.value = '';
    DOM.clearSearchBtn.style.display = 'none';
    DOM.categoryPills.forEach(p => p.classList.remove('active'));
    document.querySelector('.pill-filter[data-category="all"]').classList.add('active');
    renderCatalog();
  });

  // Event Delegation for Resource Card Clicks (Bookmarks & Details)
  DOM.resourceGrid.addEventListener('click', (e) => {
    const bookmarkBtn = e.target.closest('.bookmark-icon-btn');
    const detailsBtn = e.target.closest('.inspect-btn');

    if (bookmarkBtn) {
      const id = bookmarkBtn.dataset.id;
      toggleBookmark(id);
    } else if (detailsBtn) {
      const id = detailsBtn.dataset.id;
      openDetailsModal(id);
    }
  });

  // Bookmark Drawer Events
  DOM.bookmarkDrawerBtn.addEventListener('click', openBookmarkDrawer);
  DOM.closeDrawerBtn.addEventListener('click', closeBookmarkDrawer);
  DOM.clearAllBookmarksBtn.addEventListener('click', clearAllBookmarks);
  DOM.bookmarkDrawer.addEventListener('click', (e) => {
    if (e.target === DOM.bookmarkDrawer) closeBookmarkDrawer();
  });

  // Remove individual bookmark from drawer
  DOM.bookmarkList.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-bookmark-btn');
    if (removeBtn) {
      toggleBookmark(removeBtn.dataset.id);
    }
  });

  // Add Resource Modal Events
  DOM.openSubmitModalBtn.addEventListener('click', openSubmitModal);
  DOM.closeSubmitModalBtn.addEventListener('click', closeSubmitModal);
  DOM.cancelSubmitModalBtn.addEventListener('click', closeSubmitModal);
  DOM.submitModal.addEventListener('click', (e) => {
    if (e.target === DOM.submitModal) closeSubmitModal();
  });
  DOM.addResourceForm.addEventListener('submit', handleAddResource);

  // Details Modal Events
  DOM.closeDetailsModalBtn.addEventListener('click', closeDetailsModal);
  DOM.detailsModal.addEventListener('click', (e) => {
    if (e.target === DOM.detailsModal) closeDetailsModal();
  });

  // Global Escape Key to close open dialogs
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSubmitModal();
      closeDetailsModal();
      closeBookmarkDrawer();
    }
  });

  // Interactive Accordion (FAQ)
  DOM.faqAccordion.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    const item = header.parentElement;
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    // Close other items
    document.querySelectorAll('.accordion-item').forEach(other => {
      if (other !== item) {
        other.classList.remove('active');
        other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('active');
    header.setAttribute('aria-expanded', !isExpanded);
  });

  // Contact Form Submission
  DOM.contactForm.addEventListener('submit', handleContactSubmit);

  // Hero Demo Button
  if (DOM.heroDemoBtn) {
    DOM.heroDemoBtn.addEventListener('click', () => {
      document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });
      showToast('Welcome to the DevPulse Interactive Catalog!', 'info');
    });
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

