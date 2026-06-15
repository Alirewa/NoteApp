export default class NotesView {
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete, onSearch } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.onSearch = onSearch;

    this.root.innerHTML = `
      <div class="overlay" id="overlay"></div>

      <div class="sidebar" id="sidebar">
        <div class="sidebar__header">
          <div class="sidebar__logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>یادداشت‌ها</span>
          </div>
          <button class="sidebar__close" id="sidebarClose" title="بستن">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="sidebar__search">
          <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" class="search-input" placeholder="جستجو در یادداشت‌ها..." />
        </div>

        <div class="notes__list"></div>

        <button class="add-btn" id="addNoteBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          یادداشت جدید
        </button>
      </div>

      <div class="main-content" id="mainContent">
        <div class="topbar">
          <button class="menu-toggle" id="menuToggle" title="منو">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="topbar__title">یادداشت‌ها</div>
          <button class="add-btn mobile-add" id="mobileAddBtn" title="یادداشت جدید">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        <div class="preview" id="notePreview">
          <input type="text" class="preview__title" placeholder="عنوان یادداشت..." />
          <textarea class="preview__body" placeholder="متن یادداشت را اینجا بنویسید..."></textarea>
        </div>

        <div class="empty-state" id="emptyState">
          <svg class="empty-state__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <h3>هیچ یادداشتی وجود ندارد</h3>
          <p>برای شروع، یک یادداشت جدید بسازید</p>
          <button class="add-btn add-btn--outline" id="emptyAddBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            ساخت یادداشت جدید
          </button>
        </div>
      </div>
    `;

    const addNoteBtn = this.root.querySelector("#addNoteBtn");
    const mobileAddBtn = this.root.querySelector("#mobileAddBtn");
    const emptyAddBtn = this.root.querySelector("#emptyAddBtn");
    const menuToggle = this.root.querySelector("#menuToggle");
    const sidebarClose = this.root.querySelector("#sidebarClose");
    const overlay = this.root.querySelector("#overlay");
    const inputTitle = this.root.querySelector(".preview__title");
    const inputBody = this.root.querySelector(".preview__body");
    const searchInput = this.root.querySelector(".search-input");

    [addNoteBtn, mobileAddBtn, emptyAddBtn].forEach(btn => {
      btn.addEventListener("click", () => {
        this.onNoteAdd();
        this._closeSidebar();
      });
    });

    [inputTitle, inputBody].forEach(field => {
      field.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    searchInput.addEventListener("input", () => {
      this.onSearch(searchInput.value.trim());
    });

    menuToggle.addEventListener("click", () => this._openSidebar());
    sidebarClose.addEventListener("click", () => this._closeSidebar());
    overlay.addEventListener("click", () => this._closeSidebar());

    this.updateNotePreviewVisibility(false);
  }

  _openSidebar() {
    this.root.querySelector("#sidebar").classList.add("sidebar--open");
    this.root.querySelector("#overlay").classList.add("overlay--visible");
  }

  _closeSidebar() {
    this.root.querySelector("#sidebar").classList.remove("sidebar--open");
    this.root.querySelector("#overlay").classList.remove("overlay--visible");
  }

  _formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 65;
    const safeTitle = title || "بدون عنوان";
    const safeBody = body || "";
    return `
      <div class="note-card" data-note-id="${id}">
        <div class="note-card__header">
          <div class="note-card__title">${safeTitle}</div>
          <button class="note-card__delete" data-note-id="${id}" title="حذف">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
        <div class="note-card__body">
          ${safeBody.substring(0, MAX_BODY_LENGTH)}${safeBody.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="note-card__date">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${this._formatDate(updated)}
        </div>
      </div>
    `;
  }

  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");
    notesContainer.innerHTML = "";

    if (notes.length === 0) {
      notesContainer.innerHTML = `
        <div class="no-results">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          نتیجه‌ای یافت نشد
        </div>`;
      return;
    }

    let html = "";
    for (const note of notes) {
      html += this._createListItemHTML(note.id, note.title, note.body, note.updated);
    }
    notesContainer.innerHTML = html;

    notesContainer.querySelectorAll(".note-card").forEach(card => {
      card.addEventListener("click", () => {
        this.onNoteSelect(card.dataset.noteId);
        this._closeSidebar();
      });
    });

    notesContainer.querySelectorAll(".note-card__delete").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        this.onNoteDelete(btn.dataset.noteId);
      });
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".preview__title").value = note.title;
    this.root.querySelector(".preview__body").value = note.body;

    this.root.querySelectorAll(".note-card").forEach(card => {
      card.classList.remove("note-card--active");
    });

    const activeCard = this.root.querySelector(`.note-card[data-note-id="${note.id}"]`);
    if (activeCard) activeCard.classList.add("note-card--active");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector("#notePreview").style.display = visible ? "flex" : "none";
    this.root.querySelector("#emptyState").style.display = visible ? "none" : "flex";
  }
}
