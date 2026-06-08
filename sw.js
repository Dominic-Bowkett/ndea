// Minimal service worker so the PWA satisfies install-prompt criteria
// (Chrome / Edge require a registered SW that handles fetches before
// they'll fire beforeinstallprompt). No caching is performed yet —
// requests fall through to the network as-is.

self.addEventListener("install", (event) => {
  // Activate this SW as soon as it's done installing instead of
  // waiting for the previous SW to terminate.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take over open clients on first activation so the install
  // prompt becomes available without a refresh.
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass through to the network. The handler exists so the SW is
  // considered "controlling" by the install-prompt heuristics.
  event.respondWith(fetch(event.request));
});
