export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme-mode";
const DEFAULT_MODE: ThemeMode = "dark";

const listeners = new Set<() => void>();

/** Cached so get_snapshot() returns a stable value between writes. */
let current: ThemeMode | null = null;

const read = (): ThemeMode => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "light"
      ? "light"
      : DEFAULT_MODE;
  } catch {
    // Storage can throw in private browsing.
    return DEFAULT_MODE;
  }
};

const emit = () => listeners.forEach((listener) => listener());

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  // Keep other tabs in sync.
  const on_storage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      current = read();
      emit();
    }
  };
  window.addEventListener("storage", on_storage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", on_storage);
  };
};

export const get_snapshot = (): ThemeMode => {
  if (current === null) current = read();
  return current;
};

/**
 * The server has no localStorage, so it always renders the default. React uses
 * this during hydration and then re-reads get_snapshot afterwards — which is
 * why the page can render real content on the server without a mismatch.
 */
export const get_server_snapshot = (): ThemeMode => DEFAULT_MODE;

export const toggle_mode = () => {
  const next: ThemeMode = get_snapshot() === "light" ? "dark" : "light";
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Preference won't survive the session, but the toggle still works.
  }
  emit();
};
