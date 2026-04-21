const $ = (id) => document.getElementById(id);

// --- View management ---
function showView(name) {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  $(name + "-view").classList.add("active");
}

function showMsg(elId, text, type) {
  const el = $(elId);
  el.textContent = text;
  el.className = "status-msg " + type;
}

function clearMsg(elId) {
  const el = $(elId);
  el.textContent = "";
  el.className = "status-msg";
}

// --- Settings ---
async function loadSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["appUrl", "authSecret"], resolve);
  });
}

async function saveSettings() {
  const appUrl = $("app-url").value.trim().replace(/\/$/, "");
  const authSecret = $("auth-secret").value.trim();
  if (!appUrl || !authSecret) {
    showMsg("settings-msg", "Both fields are required.", "error");
    return;
  }
  await new Promise((resolve) => chrome.storage.sync.set({ appUrl, authSecret }, resolve));
  showMsg("settings-msg", "Settings saved!", "success");
  setTimeout(() => { clearMsg("settings-msg"); showView("main"); }, 800);
}

// --- Page text extraction ---
async function getPageText() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.body.innerText.trim().slice(0, 8000),
  });
  return results[0]?.result ?? "";
}

// --- Capture flow ---
async function captureJob() {
  const { appUrl, authSecret } = await loadSettings();
  if (!appUrl || !authSecret) {
    showView("settings");
    return;
  }

  const captureBtn = $("capture-btn");
  captureBtn.disabled = true;
  showMsg("capture-msg", "Reading page...", "loading");

  let pageText;
  try {
    pageText = await getPageText();
  } catch {
    showMsg("capture-msg", "Could not read page. Try refreshing.", "error");
    captureBtn.disabled = false;
    return;
  }

  showMsg("capture-msg", "Extracting with AI...", "loading");

  let extracted;
  try {
    const res = await fetch(`${appUrl}/api/extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authSecret}`,
      },
      body: JSON.stringify({ pageText }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    extracted = await res.json();
  } catch (err) {
    showMsg("capture-msg", "Extraction failed: " + err.message, "error");
    captureBtn.disabled = false;
    return;
  }

  // Populate form
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  $("company").value = extracted.company ?? "";
  $("role").value = extracted.role ?? "";
  $("salary").value = extracted.salary ?? "";
  $("url").value = extracted.url || tab.url || "";
  $("notes").value = extracted.notes ?? "";
  $("applied-at").value = new Date().toISOString().split("T")[0];

  clearMsg("capture-msg");
  $("form-section").classList.add("active");
  captureBtn.disabled = false;
}

// --- Save flow ---
async function saveJob(status) {
  const { appUrl, authSecret } = await loadSettings();
  const company = $("company").value.trim();
  const role = $("role").value.trim();

  if (!company || !role) {
    showMsg("save-msg", "Company and Role are required.", "error");
    return;
  }

  const saveBtn = status === "SAVED" ? $("save-later-btn") : $("save-applied-btn");
  saveBtn.disabled = true;
  showMsg("save-msg", "Saving...", "loading");

  try {
    const res = await fetch(`${appUrl}/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authSecret}`,
      },
      body: JSON.stringify({
        company,
        role,
        status,
        salary: $("salary").value.trim() || null,
        url: $("url").value.trim() || null,
        notes: $("notes").value.trim() || null,
        appliedAt: $("applied-at").value,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    showMsg("save-msg", "Saved! ✓", "success");
    setTimeout(() => window.close(), 1200);
  } catch (err) {
    showMsg("save-msg", "Save failed: " + err.message, "error");
    saveBtn.disabled = false;
  }
}

// --- Init ---
document.addEventListener("DOMContentLoaded", async () => {
  const { appUrl, authSecret } = await loadSettings();

  // Prefill settings fields
  if (appUrl) $("app-url").value = appUrl;
  if (authSecret) $("auth-secret").value = authSecret;

  // Show settings if not configured, otherwise main
  if (!appUrl || !authSecret) {
    showView("settings");
  } else {
    showView("main");
  }

  $("settings-toggle").addEventListener("click", () => {
    const settingsVisible = $("settings-view").classList.contains("active");
    showView(settingsVisible ? "main" : "settings");
  });

  $("save-settings").addEventListener("click", saveSettings);
  $("capture-btn").addEventListener("click", captureJob);
  $("save-applied-btn").addEventListener("click", () => saveJob("APPLIED"));
  $("save-later-btn").addEventListener("click", () => saveJob("SAVED"));
  $("reset-btn").addEventListener("click", () => {
    $("form-section").classList.remove("active");
    clearMsg("capture-msg");
    clearMsg("save-msg");
  });
});
