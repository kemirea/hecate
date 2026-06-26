/* Route Planner — Phase 0
 * Static maps + predefined groups. A route is an ordered list of "pulls";
 * a pull is 1+ groups; a group is 1+ monster placements. Each placement is a
 * dot on the map that REFERENCES a monster in the global catalog (js/monsters.js)
 * for its name + count. Clicking any dot selects the whole group. Each group is
 * used at most once across a route. Persistence: localStorage only.
 *
 * Modes:
 *   - "plan"  (default): build routes out of pulls.
 *   - "place" (dev tool): manage the monster catalog, drop monster dots, and
 *     export both the catalog (-> monsters.js) and the groups (-> maps.js).
 */
(function () {
  "use strict";

  const MAPS = window.MAPS;
  const LS_KEY = "routePlanner.routes.v1";
  const DRAFT_KEY = "routePlanner.groupDraft.v4.";
  const CATALOG_KEY = "routePlanner.monsterCatalog.v5.";
  const PALETTE = [
    "#e6194b", "#3cb44b", "#4363d8", "#f58231", "#911eb4",
    "#008080", "#9a6324", "#e6ab02", "#46f0f0", "#f032e6",
    "#1f78b4", "#bcbd22"
  ];
  const HULL_PAD = 8;
  const HULL_SAMPLES = 14;

  // ---- State ----------------------------------------------------------------
  const state = {
    mapId: MAPS[0].id,
    mode: "plan",
    route: null,
    activePullId: null,
    activeGroupId: null,      // placement mode
    activeMonsterRef: null,   // placement mode: which catalog monster to drop
  };

  let map = null;
  let mapCfg = null;
  let groupMarkers = {};
  let overlayLayer = null;

  // Placement-mode working copies
  let draftGroups = null;
  let draftMapId = null;
  let draftCatalog = null;       // current map's monster catalog (working copy)
  let draftCatalogMapId = null;

  // ---- Helpers --------------------------------------------------------------
  const $ = (sel) => document.querySelector(sel);
  const genId = (p) => p + "_" + Math.random().toString(36).slice(2, 9);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  function mapConfig(id) { return MAPS.find((m) => m.id === id); }
  function pullColor(i) { return PALETTE[i % PALETTE.length]; }

  // Both modes share one working dataset (the drafts), seeded from the files and
  // persisted to localStorage, so placement edits show up in the planner too.
  function currentGroups() { ensureDraft(); return draftGroups; }
  function groupById(id) { return currentGroups().find((g) => g.id === id); }

  function catalog() { ensureCatalogDraft(); return draftCatalog; }
  function defOf(ref) { return catalog().find((d) => d.id === ref); }
  function placementName(p) { const d = defOf(p.ref); return d ? d.name : "(unknown)"; }
  // A specific placement "chickened" in the current route counts 0 (plan mode
  // only). Keyed by the placement's stable id so only that one dot is affected.
  function isChickenId(id) {
    return state.mode === "plan" && state.route && Array.isArray(state.route.chickenIds) &&
      state.route.chickenIds.includes(id);
  }
  function placementCount(p) {
    if (isChickenId(p.id)) return 0;
    const d = defOf(p.ref);
    return d ? (d.count || 0) : 0;
  }

  function activeIndex() { return state.route.pulls.findIndex((p) => p.id === state.activePullId); }
  function pullIndexOfGroup(groupId) { return state.route.pulls.findIndex((p) => p.groupIds.includes(groupId)); }

  function monsterPoint(p) { return { x: p.x, y: mapCfg.height - p.y }; }
  function toLatLng(pt) { return L.latLng(pt.y, pt.x); }
  function latLngToPixels(ll) { return { x: ll.lng, y: mapCfg.height - ll.lat }; }
  function groupPoints(g) { return g.monsters.map(monsterPoint); }

  // ---- Counts & percentages -------------------------------------------------
  function requiredCount() { return mapCfg.requiredCount || 0; }
  // A group's count is the sum of its placements' point values (from the catalog).
  function groupCount(g) { return g.monsters.reduce((a, p) => a + placementCount(p), 0); }
  function pullCount(pull) {
    return pull.groupIds.reduce((a, gid) => { const g = groupById(gid); return a + (g ? groupCount(g) : 0); }, 0);
  }
  function routeCount() { return state.route.pulls.reduce((a, p) => a + pullCount(p), 0); }
  function fmtNum(n) { return String(Math.round(n * 100) / 100); }
  function pctOf(count) { const r = requiredCount(); return r ? (count / r) * 100 : 0; }
  function fmtPct(count) { return fmtNum(pctOf(count)) + "%"; }

  // ---- Persistence ----------------------------------------------------------
  function loadAllRoutes() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; } catch (_) { return []; } }
  function saveAllRoutes(arr) { localStorage.setItem(LS_KEY, JSON.stringify(arr)); }

  function loadDraft(mapId) { try { return JSON.parse(localStorage.getItem(DRAFT_KEY + mapId)); } catch (_) { return null; } }
  function saveDraft() { if (draftGroups) localStorage.setItem(DRAFT_KEY + state.mapId, JSON.stringify(draftGroups)); }
  function clearDraft(mapId) { localStorage.removeItem(DRAFT_KEY + mapId); }

  function loadCatalogDraft(mapId) { try { return JSON.parse(localStorage.getItem(CATALOG_KEY + mapId)); } catch (_) { return null; } }
  function saveCatalogDraft() { if (draftCatalog) localStorage.setItem(CATALOG_KEY + state.mapId, JSON.stringify(draftCatalog)); }
  function clearCatalogDraft(mapId) { localStorage.removeItem(CATALOG_KEY + mapId); }
  function catalogSeed(mapId) { return (window.MONSTERS && window.MONSTERS[mapId]) || []; }

  // ---- Route lifecycle ------------------------------------------------------
  function freshPull() { return { id: genId("p"), groupIds: [] }; }
  function freshRoute(mapId) { return { id: genId("r"), name: "New Route", mapId: mapId, pulls: [freshPull()], chickenIds: [] }; }

  function newRoute() {
    state.route = freshRoute(state.mapId);
    state.activePullId = state.route.pulls[0].id;
    if (state.mode === "plan") { renderAll(); renderSavedRoutes(); }
    setStatus("New route started.");
  }

  function loadRoute(routeId) {
    const found = loadAllRoutes().find((r) => r.id === routeId);
    if (!found) return;
    state.route = clone(found);
    if (state.route.mapId !== state.mapId) {
      state.mapId = state.route.mapId;
      $("#map-select").value = state.mapId;
      initMap();
    }
    if (!state.route.pulls || state.route.pulls.length === 0) state.route.pulls = [freshPull()];
    if (!Array.isArray(state.route.chickenIds)) state.route.chickenIds = [];
    state.activePullId = state.route.pulls[0].id;
    renderAll();
    setStatus("Loaded “" + (state.route.name || "Untitled") + "”.");
  }

  function saveRoute() {
    if (!state.route.name) state.route.name = "New Route";
    state.route.mapId = state.mapId;
    const now = Date.now();
    state.route.updatedAt = now;
    const all = loadAllRoutes();
    const i = all.findIndex((r) => r.id === state.route.id);
    if (i >= 0) all[i] = clone(state.route);
    else { state.route.createdAt = now; all.push(clone(state.route)); }
    saveAllRoutes(all);
    renderSavedRoutes();
    setStatus("Saved “" + state.route.name + "”.");
  }

  // ---- Pull editing ---------------------------------------------------------
  function addPull() {
    const p = freshPull();
    state.route.pulls.push(p);
    state.activePullId = p.id;
    renderAll();
  }

  function deletePull(pullId) {
    const pulls = state.route.pulls;
    if (pulls.length <= 1) { pulls[0] = freshPull(); state.activePullId = pulls[0].id; renderAll(); return; }
    const idx = pulls.findIndex((p) => p.id === pullId);
    if (idx < 0) return;
    pulls.splice(idx, 1);
    if (state.activePullId === pullId) state.activePullId = pulls[Math.max(0, idx - 1)].id;
    renderAll();
  }

  function setActivePull(pullId) { state.activePullId = pullId; renderAll(); }

  function toggleGroupInActivePull(groupId) {
    const active = state.route.pulls[activeIndex()];
    if (!active) return;
    const owner = pullIndexOfGroup(groupId);
    if (owner >= 0 && state.route.pulls[owner].id === active.id) {
      active.groupIds = active.groupIds.filter((id) => id !== groupId);
    } else {
      if (owner >= 0) { const o = state.route.pulls[owner]; o.groupIds = o.groupIds.filter((id) => id !== groupId); }
      active.groupIds.push(groupId);
    }
    renderAll();
  }

  function removeGroup(pullId, groupId) {
    const p = state.route.pulls.find((x) => x.id === pullId);
    if (!p) return;
    p.groupIds = p.groupIds.filter((id) => id !== groupId);
    renderAll();
  }

  function toggleChicken(placementId) {
    if (!Array.isArray(state.route.chickenIds)) state.route.chickenIds = [];
    const i = state.route.chickenIds.indexOf(placementId);
    if (i >= 0) state.route.chickenIds.splice(i, 1);
    else state.route.chickenIds.push(placementId);
    buildMarkers();
    renderAll();
  }

  // ---- Placement: drafts ----------------------------------------------------
  function ensureDraft() {
    if (draftMapId !== state.mapId || !draftGroups) {
      draftGroups = loadDraft(state.mapId) || clone(mapCfg.groups);
      draftMapId = state.mapId;
      renumberGroups();
      if (ensurePlacementIds(draftGroups)) saveDraft();
      state.activeGroupId = draftGroups[0] ? draftGroups[0].id : null;
    }
  }
  function ensureCatalogDraft() {
    if (draftCatalogMapId !== state.mapId || !draftCatalog) {
      const saved = loadCatalogDraft(state.mapId);
      draftCatalog = (Array.isArray(saved) && saved.length) ? saved : clone(catalogSeed(state.mapId));
      draftCatalogMapId = state.mapId;
      if (!state.activeMonsterRef || !draftCatalog.some((d) => d.id === state.activeMonsterRef)) {
        state.activeMonsterRef = draftCatalog[0] ? draftCatalog[0].id : null;
      }
    }
  }

  // ---- Placement: catalog CRUD ----------------------------------------------
  function addMonsterDef(name, count) {
    let id = slug(name || "");
    if (!id || draftCatalog.some((d) => d.id === id)) id = genId("m");
    draftCatalog.push({ id: id, name: name || "Monster", count: count || 0 });
    state.activeMonsterRef = id;
    saveCatalogDraft(); renderMonsterPicker(); buildMarkers(); renderAll();
  }
  function updateMonsterDef(ref, name, count) {
    const d = draftCatalog.find((x) => x.id === ref);
    if (!d) return;
    d.name = name || "Monster"; d.count = count || 0;
    saveCatalogDraft(); renderMonsterPicker(); buildMarkers(); renderAll();
  }
  function deleteMonsterDef(ref) {
    const d = draftCatalog.find((x) => x.id === ref);
    if (!d) return;
    if (!confirm("Delete monster “" + d.name + "” from the catalog? Existing placements of it will show as unknown.")) return;
    draftCatalog = draftCatalog.filter((x) => x.id !== ref);
    if (state.activeMonsterRef === ref) state.activeMonsterRef = draftCatalog[0] ? draftCatalog[0].id : null;
    saveCatalogDraft(); renderMonsterPicker(); buildMarkers(); renderAll();
  }

  // ---- Placement: groups + placements ---------------------------------------
  // Groups are auto-named G1, G2, ... by their order in the list.
  function renumberGroups() { draftGroups.forEach((g, i) => { g.name = "G" + (i + 1); }); }

  function newDraftGroup() {
    const g = { id: genId("g"), name: "", monsters: [] };
    draftGroups.push(g);
    renumberGroups();
    state.activeGroupId = g.id;
    saveDraft(); buildMarkers(); renderAll();
  }
  function deleteDraftGroup(groupId) {
    const g = draftGroups.find((x) => x.id === groupId);
    if (!g) return;
    if (g.monsters.length && !confirm("Delete group “" + g.name + "” and its " + g.monsters.length + " placement(s)?")) return;
    draftGroups = draftGroups.filter((x) => x.id !== groupId);
    renumberGroups();
    if (state.activeGroupId === groupId) state.activeGroupId = draftGroups[0] ? draftGroups[0].id : null;
    saveDraft(); buildMarkers(); renderAll();
  }
  function setActiveGroup(groupId) { state.activeGroupId = groupId; buildMarkers(); renderAll(); }

  function addPlacement(groupId, ref, coords) {
    const g = draftGroups.find((x) => x.id === groupId);
    if (!g) return;
    g.monsters.push({ id: genId("m"), ref: ref, x: Math.round(coords.x), y: Math.round(coords.y) });
    saveDraft(); buildMarkers(); renderAll();
  }

  // Backfill stable ids for any placements that don't have one (older drafts).
  function ensurePlacementIds(groups) {
    let changed = false;
    groups.forEach((g) => g.monsters.forEach((p) => { if (!p.id) { p.id = genId("m"); changed = true; } }));
    return changed;
  }
  function setPlacementRef(groupId, idx, ref) {
    const g = draftGroups.find((x) => x.id === groupId);
    if (!g || !g.monsters[idx]) return;
    g.monsters[idx].ref = ref;
    saveDraft(); buildMarkers(); renderAll();
  }
  function movePlacement(groupId, idx, coords) {
    const g = draftGroups.find((x) => x.id === groupId);
    if (!g || !g.monsters[idx]) return;
    g.monsters[idx].x = Math.round(coords.x);
    g.monsters[idx].y = Math.round(coords.y);
    saveDraft();
  }
  function deletePlacement(groupId, idx) {
    const g = draftGroups.find((x) => x.id === groupId);
    if (!g) return;
    g.monsters.splice(idx, 1);
    saveDraft(); buildMarkers(); renderAll();
  }

  function resetDraft() {
    if (!confirm("Discard placement edits (this map's groups AND the catalog) and reload from the files?")) return;
    clearDraft(state.mapId); clearCatalogDraft(state.mapId);
    draftGroups = clone(mapCfg.groups); draftMapId = state.mapId;
    renumberGroups();
    ensurePlacementIds(draftGroups);
    draftCatalog = clone(catalogSeed(state.mapId)); draftCatalogMapId = state.mapId;
    state.activeGroupId = draftGroups[0] ? draftGroups[0].id : null;
    state.activeMonsterRef = draftCatalog[0] ? draftCatalog[0].id : null;
    renderMonsterPicker(); buildMarkers(); renderAll();
    setStatus("Reverted to files.");
  }

  // ---- Map setup ------------------------------------------------------------
  function initMap() {
    mapCfg = mapConfig(state.mapId);
    if (map) { map.remove(); map = null; }
    groupMarkers = {};

    map = L.map("map", { crs: L.CRS.Simple, minZoom: -3, zoomSnap: 0.25, attributionControl: false });
    const bounds = [[0, 0], [mapCfg.height, mapCfg.width]];
    L.imageOverlay(mapCfg.url, bounds).addTo(map);
    map.fitBounds(bounds);
    map.setMaxBounds(L.latLngBounds(bounds).pad(0.4));
    overlayLayer = L.layerGroup().addTo(map);

    map.on("click", (e) => {
      if (state.mode !== "place") return;
      if (!state.activeGroupId) { setStatus("Create or select a group first (+ New group)."); return; }
      if (!state.activeMonsterRef) { setStatus("Create or select a monster first (+ New monster)."); return; }
      addPlacement(state.activeGroupId, state.activeMonsterRef, latLngToPixels(e.latlng));
    });

    buildMarkers();
  }

  function highlightGroup(groupId, on) {
    (groupMarkers[groupId] || []).forEach((m) => { const el = m.getElement(); if (el) el.classList.toggle("grp-hover", on); });
  }

  function buildMarkers() {
    ensureDraft(); ensureCatalogDraft();
    Object.values(groupMarkers).forEach((arr) => arr.forEach((m) => map.removeLayer(m)));
    groupMarkers = {};
    const placing = state.mode === "place";

    currentGroups().forEach((g) => {
      groupMarkers[g.id] = [];
      const isActiveGroup = g.id === state.activeGroupId;
      g.monsters.forEach((p, idx) => {
        const marker = L.marker(toLatLng(monsterPoint(p)), {
          icon: placing ? placeIcon(isActiveGroup) : freeIcon(),
          draggable: placing,
          riseOnHover: true,
        }).addTo(map);

        if (placing) {
          marker.bindTooltip(g.name + " — " + placementName(p) + " (" + fmtNum(placementCount(p)) + ")", { direction: "top", offset: [0, -8] });
          marker.on("click", () => openPlacementModal(g.id, idx));
          marker.on("dragend", (e) => movePlacement(g.id, idx, latLngToPixels(e.target.getLatLng())));
        } else {
          marker.bindTooltip(
            "<b>" + placementName(p) + "</b> · " + g.name +
            "<br>Count " + fmtNum(placementCount(p)) + " (" + fmtPct(placementCount(p)) + ")",
            { direction: "top", offset: [0, -8] }
          );
          marker.on("click", () => toggleGroupInActivePull(g.id));
          marker.on("mouseover", () => highlightGroup(g.id, true));
          marker.on("mouseout", () => highlightGroup(g.id, false));
          marker.on("contextmenu", (e) => {
            if (e.originalEvent) e.originalEvent.preventDefault();
            const chick = isChickenId(p.id);
            showContextMenu(e.originalEvent.clientX, e.originalEvent.clientY, [
              { label: chick ? "Unmark Chicken" : "Mark Chicken", onClick: () => toggleChicken(p.id) },
            ]);
          });
        }
        groupMarkers[g.id].push(marker);
      });
    });

    if (!placing) renderMapOverlays();
  }

  function freeIcon() { return L.divIcon({ className: "grp-icon", html: '<div class="grp-free-dot"></div>', iconSize: [24, 24], iconAnchor: [12, 12] }); }
  function placeIcon(active) {
    return L.divIcon({
      className: "grp-icon" + (active ? "" : " dim"),
      html: '<div class="grp-place-dot' + (active ? "" : " inactive") + '"></div>',
      iconSize: [24, 24], iconAnchor: [12, 12],
    });
  }
  // Assigned monsters keep their dot — just tinted with the pull's color.
  // Never dimmed; the active pull is only emphasized (scaled up).
  function assignedDot(color, isActive) {
    return L.divIcon({
      className: "grp-icon" + (isActive ? " active" : ""),
      html: '<div class="grp-dot-assigned" style="background:' + color + '"></div>',
      iconSize: [24, 24], iconAnchor: [12, 12],
    });
  }
  function chickenIcon() {
    return L.divIcon({ className: "grp-icon", html: '<div class="grp-chicken">🐔</div>', iconSize: [24, 24], iconAnchor: [12, 12] });
  }
  // One small number badge per pull, floated above the pull's centroid.
  function pullNumberMarker(centroid, number, color) {
    return L.marker(centroid, {
      interactive: false,
      icon: L.divIcon({
        className: "pull-num",
        html: '<span class="pull-num-badge" style="background:' + color + '">' + number + "</span>",
        iconSize: [22, 18], iconAnchor: [11, 26],
      }),
    });
  }

  // ---- Geometry -------------------------------------------------------------
  function convexHull(points) {
    const pts = points.slice().sort((a, b) => a.x - b.x || a.y - b.y);
    if (pts.length < 3) return pts;
    const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const lower = [];
    for (const p of pts) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
      lower.push(p);
    }
    const upper = [];
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
      upper.push(p);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
  }
  function paddedHullLatLngs(points) {
    const samples = [];
    points.forEach((c) => {
      for (let k = 0; k < HULL_SAMPLES; k++) {
        const a = (2 * Math.PI * k) / HULL_SAMPLES;
        samples.push({ x: c.x + HULL_PAD * Math.cos(a), y: c.y + HULL_PAD * Math.sin(a) });
      }
    });
    return convexHull(samples).map((p) => toLatLng(p));
  }
  function pullPoints(pull) {
    const pts = [];
    pull.groupIds.forEach((gid) => { const g = groupById(gid); if (g) groupPoints(g).forEach((p) => pts.push(p)); });
    return pts;
  }
  function pullCentroid(pull) {
    const pts = pullPoints(pull);
    if (pts.length === 0) return null;
    const sx = pts.reduce((a, p) => a + p.x, 0);
    const sy = pts.reduce((a, p) => a + p.y, 0);
    return toLatLng({ x: sx / pts.length, y: sy / pts.length });
  }

  // ---- Rendering: map overlays (plan mode) ----------------------------------
  function renderMapOverlays() {
    if (!overlayLayer) return;
    overlayLayer.clearLayers();
    const activeIdx = activeIndex();
    Object.values(groupMarkers).forEach((arr) => arr.forEach((m) => { m.setIcon(freeIcon()); m.setZIndexOffset(0); }));

    state.route.pulls.forEach((pull, i) => {
      const color = pullColor(i);
      const isActive = i === activeIdx;
      const pts = pullPoints(pull);
      if (pts.length >= 2) {
        L.polygon(paddedHullLatLngs(pts), {
          color: color, weight: 2, opacity: isActive ? 1 : 0.75,
          fillColor: color, fillOpacity: isActive ? 0.4 : 0.28, interactive: false,
        }).addTo(overlayLayer);
      }
      pull.groupIds.forEach((gid) => { (groupMarkers[gid] || []).forEach((m) => m.setIcon(assignedDot(color, isActive))); });

      const c = pullCentroid(pull);
      if (c) pullNumberMarker(c, i + 1, color).addTo(overlayLayer);
    });

    // Chickened monsters override their dot with a 🐔, regardless of pull.
    currentGroups().forEach((g) => {
      const ms = groupMarkers[g.id] || [];
      g.monsters.forEach((p, idx) => {
        if (isChickenId(p.id) && ms[idx]) { ms[idx].setIcon(chickenIcon()); ms[idx].setZIndexOffset(100000); }
      });
    });

    const centroids = state.route.pulls.map(pullCentroid).filter(Boolean);
    if (centroids.length >= 2) {
      L.polyline(centroids, { color: "#222", weight: 3, opacity: 0.7, dashArray: "6 7", interactive: false }).addTo(overlayLayer);
    }
  }

  // ---- Rendering: pulls list (plan mode) ------------------------------------
  function renderPullsList() {
    const list = $("#pulls-list");
    list.innerHTML = "";
    const onlyOne = state.route.pulls.length <= 1;

    state.route.pulls.forEach((pull, i) => {
      const li = document.createElement("li");
      li.className = "pull" + (pull.id === state.activePullId ? " active" : "");
      li.dataset.pullId = pull.id;

      const row = document.createElement("div");
      row.className = "pull-row";
      const pc = pullCount(pull);
      row.innerHTML =
        '<span class="pull-grip" title="Drag to reorder">⠿</span>' +
        '<span class="pull-badge" style="background:' + pullColor(i) + '">' + (i + 1) + "</span>" +
        '<span class="pull-title">Pull ' + (i + 1) +
        ' <span class="pull-count">(' + pull.groupIds.length + " group" + (pull.groupIds.length === 1 ? "" : "s") + ")</span>" +
        '<span class="pull-total">Count <b>' + fmtNum(pc) + "</b> (" + fmtPct(pc) + ")</span></span>";

      const del = document.createElement("button");
      del.className = "pull-del"; del.textContent = "✕";
      del.title = onlyOne ? "Clears this pull" : "Delete pull";
      del.addEventListener("click", (e) => { e.stopPropagation(); deletePull(pull.id); });
      row.appendChild(del);
      row.addEventListener("click", () => setActivePull(pull.id));
      row.querySelector(".pull-grip").addEventListener("click", (e) => e.stopPropagation());

      const members = document.createElement("ul");
      members.className = "pull-members";
      // Tally each monster across all groups in the pull (first-seen order),
      // tracking how many instances of each are chickened.
      const tally = new Map();
      pull.groupIds.forEach((gid) => {
        const g = groupById(gid);
        if (!g) return;
        g.monsters.forEach((p) => {
          const t = tally.get(p.ref) || { qty: 0, chick: 0 };
          t.qty++;
          if (isChickenId(p.id)) t.chick++;
          tally.set(p.ref, t);
        });
      });
      tally.forEach((t, ref) => {
        const d = defOf(ref);
        const m = document.createElement("li");
        m.className = "pull-member";
        const chickTag = t.chick > 0
          ? ' <span class="chicken-tag" title="' + t.chick + ' chickened">🐔' + (t.chick > 1 ? t.chick : "") + "</span>"
          : "";
        m.innerHTML = '<span style="flex:1">' + (d ? d.name : "(unknown)") + chickTag +
          '</span> <span class="mon">×' + t.qty + "</span>";
        members.appendChild(m);
      });

      li.appendChild(row); li.appendChild(members); list.appendChild(li);
    });

    if (list._sortable) list._sortable.destroy();
    list._sortable = Sortable.create(list, {
      handle: ".pull-grip", animation: 140,
      onEnd: () => {
        const order = Array.from(list.children).map((li) => li.dataset.pullId);
        state.route.pulls.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        renderAll();
      },
    });
  }

  function renderRouteTotal() {
    const el = $("#route-total");
    if (!el) return;
    const c = routeCount();
    const p = pctOf(c);
    const barW = Math.max(0, Math.min(100, p));
    el.innerHTML =
      "<b>" + fmtNum(c) + "</b> / " + fmtNum(requiredCount()) +
      ' <span class="pct">(' + fmtNum(p) + "%)</span>" +
      '<div class="bar"><span style="width:' + barW + '%"></span></div>';
  }

  function renderSavedRoutes() {
    const sel = $("#saved-select");
    if (!sel) return;
    const routes = loadAllRoutes().filter((r) => r.mapId === state.mapId).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    sel.innerHTML = "";
    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = routes.length ? "— Load saved route —" : "— No saved routes —";
    sel.appendChild(ph);
    routes.forEach((r) => {
      const o = document.createElement("option");
      o.value = r.id;
      o.textContent = (r.name || "Untitled route") + " (" + r.pulls.length + " pull" + (r.pulls.length === 1 ? "" : "s") + ")";
      sel.appendChild(o);
    });
    sel.value = routes.some((r) => r.id === state.route.id) ? state.route.id : "";
  }

  // ---- Rendering: placement panel -------------------------------------------
  function renderMonsterPicker() {
    const sel = $("#active-monster");
    if (!sel) return;
    sel.innerHTML = "";
    (draftCatalog || []).forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d.id;
      opt.textContent = d.name + " (" + fmtNum(d.count || 0) + ")";
      sel.appendChild(opt);
    });
    if (state.activeMonsterRef) sel.value = state.activeMonsterRef;
  }

  function renderPlacementPanel() {
    const list = $("#groups-list");
    list.innerHTML = "";
    (draftGroups || []).forEach((g) => {
      const li = document.createElement("li");
      li.className = "pull" + (g.id === state.activeGroupId ? " active" : "");
      const active = g.id === state.activeGroupId;

      const row = document.createElement("div");
      row.className = "pull-row";
      row.innerHTML =
        '<span class="pull-badge" style="background:' + (active ? "#d6336c" : "#9aa2ad") + '">' + g.monsters.length + "</span>" +
        '<span class="pull-title">' + g.name +
        ' <span class="pull-count">(' + g.monsters.length + " monster" + (g.monsters.length === 1 ? "" : "s") + ")</span></span>";

      const del = document.createElement("button");
      del.className = "pull-del"; del.textContent = "✕"; del.title = "Delete group";
      del.addEventListener("click", (e) => { e.stopPropagation(); deleteDraftGroup(g.id); });
      row.appendChild(del);
      row.addEventListener("click", () => setActiveGroup(g.id));

      const members = document.createElement("ul");
      members.className = "pull-members";
      g.monsters.forEach((p, idx) => {
        const m = document.createElement("li");
        m.className = "pull-member";
        m.innerHTML = "<span>" + placementName(p) + '</span> <span class="mon">(' + fmtNum(placementCount(p)) +
          " pts) · (" + Math.round(p.x) + ", " + Math.round(p.y) + ")</span>";
        const x = document.createElement("button");
        x.className = "member-del"; x.textContent = "✕"; x.title = "Delete placement";
        x.addEventListener("click", (e) => { e.stopPropagation(); deletePlacement(g.id, idx); });
        m.appendChild(x);
        members.appendChild(m);
      });

      li.appendChild(row); li.appendChild(members); list.appendChild(li);
    });
  }

  function renderAll() {
    if (state.mode === "place") {
      if (overlayLayer) overlayLayer.clearLayers();
      renderPlacementPanel();
    } else {
      renderPullsList();
      renderRouteTotal();
      renderMapOverlays();
    }
  }

  // ---- Context menu ---------------------------------------------------------
  let ctxMenuEl = null;
  function closeContextMenu() {
    if (ctxMenuEl) { ctxMenuEl.remove(); ctxMenuEl = null; document.removeEventListener("mousedown", onCtxDocDown, true); }
  }
  function onCtxDocDown(e) { if (ctxMenuEl && !ctxMenuEl.contains(e.target)) closeContextMenu(); }
  function showContextMenu(x, y, items) {
    closeContextMenu();
    const menu = document.createElement("div");
    menu.className = "context-menu";
    items.forEach((it) => {
      const b = document.createElement("button");
      b.className = "context-item";
      b.textContent = it.label;
      b.addEventListener("click", () => { closeContextMenu(); it.onClick(); });
      menu.appendChild(b);
    });
    menu.style.left = x + "px";
    menu.style.top = y + "px";
    document.body.appendChild(menu);
    ctxMenuEl = menu;
    setTimeout(() => document.addEventListener("mousedown", onCtxDocDown, true), 0);
  }

  // ---- Modals ---------------------------------------------------------------
  function makeModal(node) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    const box = document.createElement("div");
    box.className = "modal-box";
    box.appendChild(node);
    overlay.appendChild(box);
    overlay.addEventListener("mousedown", (e) => { if (e.target === overlay) close(); });
    document.body.appendChild(overlay);
    function close() { overlay.remove(); }
    return { close };
  }

  // Add (ref == null) or edit (ref given) a catalog monster.
  function openMonsterDefModal(ref) {
    const existing = ref ? draftCatalog.find((d) => d.id === ref) : null;
    const frag = document.createElement("div");
    frag.innerHTML =
      "<h3>" + (existing ? "Edit monster" : "New monster") + "</h3>" +
      '<div class="modal-field"><label>Name</label><input id="m-name" type="text" placeholder="Goblin" /></div>' +
      '<div class="modal-field"><label>Count (point value)</label><input id="m-count" type="number" min="0" step="any" value="1" /></div>';

    const actions = document.createElement("div");
    actions.className = "modal-actions";
    actions.innerHTML = '<div class="spacer"></div>';
    if (existing) {
      const delBtn = document.createElement("button");
      delBtn.className = "btn btn-danger"; delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => { modal.close(); deleteMonsterDef(ref); });
      actions.insertBefore(delBtn, actions.firstChild);
    }
    const cancel = document.createElement("button");
    cancel.className = "btn"; cancel.textContent = "Cancel";
    cancel.addEventListener("click", () => modal.close());
    const save = document.createElement("button");
    save.className = "btn btn-primary"; save.textContent = "Save";
    actions.appendChild(cancel); actions.appendChild(save);
    frag.appendChild(actions);

    const modal = makeModal(frag);
    const nameEl = frag.querySelector("#m-name");
    const countEl = frag.querySelector("#m-count");
    if (existing) { nameEl.value = existing.name; countEl.value = existing.count || 0; }
    nameEl.focus();

    function commit() {
      const name = nameEl.value.trim();
      let count = parseFloat(countEl.value);
      if (!Number.isFinite(count) || count < 0) count = 0;
      modal.close();
      if (existing) updateMonsterDef(ref, name, count);
      else addMonsterDef(name, count);
    }
    save.addEventListener("click", commit);
    frag.addEventListener("keydown", (e) => { if (e.key === "Enter") commit(); });
  }

  // Edit which monster a placement is, or delete the placement.
  function openPlacementModal(groupId, idx) {
    const g = draftGroups.find((x) => x.id === groupId);
    if (!g || !g.monsters[idx]) return;
    const placement = g.monsters[idx];

    const frag = document.createElement("div");
    frag.innerHTML =
      "<h3>Placement in " + g.name + "</h3>" +
      '<div class="modal-field"><label>Monster</label><select id="p-ref"></select></div>';
    const sel = frag.querySelector("#p-ref");
    draftCatalog.forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d.id; opt.textContent = d.name + " (" + fmtNum(d.count || 0) + ")";
      sel.appendChild(opt);
    });
    sel.value = placement.ref;

    const actions = document.createElement("div");
    actions.className = "modal-actions";
    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-danger"; delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => { modal.close(); deletePlacement(groupId, idx); });
    const cancel = document.createElement("button");
    cancel.className = "btn"; cancel.textContent = "Cancel";
    cancel.addEventListener("click", () => modal.close());
    const save = document.createElement("button");
    save.className = "btn btn-primary"; save.textContent = "Save";
    save.addEventListener("click", () => { modal.close(); setPlacementRef(groupId, idx, sel.value); });
    actions.appendChild(delBtn);
    actions.appendChild(document.createElement("div")).className = "spacer";
    actions.appendChild(cancel); actions.appendChild(save);
    frag.appendChild(actions);

    const modal = makeModal(frag);
  }

  function buildCatalogExport() {
    const lines = draftCatalog.map((d) =>
      "    { id: " + JSON.stringify(d.id) + ", name: " + JSON.stringify(d.name) + ", count: " + (d.count || 0) + " }"
    );
    return state.mapId + ": [\n" + lines.join(",\n") + "\n  ]";
  }
  function buildGroupsExport() {
    const groupStr = draftGroups.map((g) => {
      if (g.monsters.length === 0) {
        return "      { id: " + JSON.stringify(g.id) + ", name: " + JSON.stringify(g.name) + ", monsters: [] }";
      }
      const mons = g.monsters.map((p) =>
        "        { id: " + JSON.stringify(p.id) + ", ref: " + JSON.stringify(p.ref) +
        ", x: " + Math.round(p.x) + ", y: " + Math.round(p.y) + " }"
      ).join(",\n");
      return "      { id: " + JSON.stringify(g.id) + ", name: " + JSON.stringify(g.name) + ", monsters: [\n" + mons + "\n      ] }";
    }).join(",\n");
    return "groups: [\n" + groupStr + "\n    ]";
  }

  // Encode the current route to a single-line shareable string.
  function encodeRoute(route) {
    const payload = {
      v: 1,
      m: route.mapId,
      n: route.name || "",
      p: route.pulls.map((pl) => pl.groupIds),
      c: route.chickenIds || [],
    };
    return "RP1:" + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  }

  // Decode an "RP1:" string and load it as a new (unsaved) route.
  function importRoute(str) {
    str = (str || "").trim();
    let payload;
    try {
      if (str.indexOf("RP1:") !== 0) throw new Error("prefix");
      payload = JSON.parse(decodeURIComponent(escape(atob(str.slice(4)))));
    } catch (e) { setStatus("That doesn't look like a valid route string."); return false; }
    if (!payload || !mapConfig(payload.m)) { setStatus("Route is for an unknown map."); return false; }

    if (payload.m !== state.mapId) { state.mapId = payload.m; $("#map-select").value = state.mapId; initMap(); }

    const pulls = (Array.isArray(payload.p) && payload.p.length)
      ? payload.p.map((gids) => ({ id: genId("p"), groupIds: Array.isArray(gids) ? gids.slice() : [] }))
      : [freshPull()];
    state.route = {
      id: genId("r"),
      name: payload.n || "Imported Route",
      mapId: payload.m,
      pulls: pulls,
      chickenIds: Array.isArray(payload.c) ? payload.c.slice() : [],
    };
    state.activePullId = state.route.pulls[0].id;

    state.mode = "plan";
    document.body.classList.remove("placement-mode");
    buildMarkers(); renderAll(); renderSavedRoutes();

    const known = new Set(currentGroups().map((g) => g.id));
    const missing = new Set();
    state.route.pulls.forEach((pl) => pl.groupIds.forEach((id) => { if (!known.has(id)) missing.add(id); }));
    setStatus(missing.size
      ? "Imported — " + missing.size + " unknown group(s) skipped. Save to keep it."
      : "Route imported. Save to keep it.");
    return true;
  }

  function openRouteExportModal() {
    const frag = document.createElement("div");
    frag.innerHTML =
      "<h3>Export route</h3>" +
      '<p class="hint" style="margin-top:0">Copy this string to save or share “' +
      (state.route.name || "Untitled") + '” (' + mapCfg.name + ").</p>" +
      "<textarea readonly></textarea>";
    const ta = frag.querySelector("textarea");
    ta.value = encodeRoute(state.route);

    const actions = document.createElement("div");
    actions.className = "modal-actions";
    const copy = document.createElement("button");
    copy.className = "btn btn-primary"; copy.textContent = "Copy to clipboard";
    copy.addEventListener("click", () => {
      ta.select();
      navigator.clipboard.writeText(ta.value).then(() => { copy.textContent = "Copied!"; }, () => { document.execCommand("copy"); copy.textContent = "Copied!"; });
    });
    const close = document.createElement("button");
    close.className = "btn"; close.textContent = "Close";
    const modal = makeModal(frag);
    close.addEventListener("click", () => modal.close());
    actions.appendChild(close); actions.appendChild(copy);
    frag.appendChild(actions);
    ta.focus(); ta.select();
  }

  function openRouteImportModal() {
    const frag = document.createElement("div");
    frag.innerHTML =
      "<h3>Import route</h3>" +
      '<p class="hint" style="margin-top:0">Paste a route string (starts with <code>RP1:</code>). It loads as a new route — Save to keep it.</p>' +
      '<textarea placeholder="RP1:..."></textarea>';
    const ta = frag.querySelector("textarea");

    const actions = document.createElement("div");
    actions.className = "modal-actions";
    const cancel = document.createElement("button");
    cancel.className = "btn"; cancel.textContent = "Cancel";
    const importBtn = document.createElement("button");
    importBtn.className = "btn btn-primary"; importBtn.textContent = "Import";
    const modal = makeModal(frag);
    cancel.addEventListener("click", () => modal.close());
    importBtn.addEventListener("click", () => { if (importRoute(ta.value)) modal.close(); });
    actions.appendChild(cancel); actions.appendChild(importBtn);
    frag.appendChild(actions);
    ta.focus();
  }

  function openExportModal(kind) {
    const isCatalog = kind === "catalog";
    const frag = document.createElement("div");
    frag.innerHTML =
      "<h3>" + (isCatalog ? "Export monster catalog" : "Export groups for " + mapCfg.name) + "</h3>" +
      '<p class="hint" style="margin-top:0">' +
      (isCatalog
        ? "Replace this map's <code>" + mapCfg.id + ": [...]</code> entry in <code>js/monsters.js</code> with the text below."
        : "Replace the <code>groups: [...]</code> block for this map in <code>js/maps.js</code> with the text below.") +
      "</p><textarea readonly></textarea>";
    const ta = frag.querySelector("textarea");
    ta.value = isCatalog ? buildCatalogExport() : buildGroupsExport();

    const actions = document.createElement("div");
    actions.className = "modal-actions";
    const copy = document.createElement("button");
    copy.className = "btn btn-primary"; copy.textContent = "Copy to clipboard";
    copy.addEventListener("click", () => {
      ta.select();
      navigator.clipboard.writeText(ta.value).then(() => { copy.textContent = "Copied!"; }, () => { document.execCommand("copy"); copy.textContent = "Copied!"; });
    });
    const close = document.createElement("button");
    close.className = "btn"; close.textContent = "Close";
    const modal = makeModal(frag);
    close.addEventListener("click", () => modal.close());
    actions.appendChild(close); actions.appendChild(copy);
    frag.appendChild(actions);
    ta.focus(); ta.select();
  }

  // ---- Mode switching -------------------------------------------------------
  function setMode(mode) {
    state.mode = mode;
    document.body.classList.toggle("placement-mode", mode === "place");
    if (mode === "place") { draftMapId = null; ensureDraft(); ensureCatalogDraft(); renderMonsterPicker(); }
    buildMarkers();
    renderAll();
    setStatus(mode === "place" ? "Placement mode: pick a monster + group, then click the map." : "Route planning mode.");
  }

  let statusTimer = null;
  function setStatus(msg) {
    const el = $("#status");
    el.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { el.textContent = ""; }, 3000);
  }

  // ---- Wire up --------------------------------------------------------------
  function init() {
    const sel = $("#map-select");
    MAPS.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = m.id; opt.textContent = m.name;
      sel.appendChild(opt);
    });
    sel.value = state.mapId;
    sel.addEventListener("change", () => {
      state.mapId = sel.value;
      initMap();
      if (state.mode === "plan") { newRoute(); renderSavedRoutes(); }
      else renderMonsterPicker();
      renderAll();
    });

    $("#add-pull").addEventListener("click", addPull);
    $("#new-route").addEventListener("click", newRoute);
    $("#save-route").addEventListener("click", saveRoute);
    $("#export-route").addEventListener("click", openRouteExportModal);
    $("#import-route").addEventListener("click", openRouteImportModal);
    $("#saved-select").addEventListener("change", (e) => { if (e.target.value) loadRoute(e.target.value); });
    $("#saved-rename").addEventListener("click", () => {
      const id = $("#saved-select").value;
      if (!id) { setStatus("Select a saved route first."); return; }
      const all = loadAllRoutes();
      const t = all.find((x) => x.id === id);
      if (!t) return;
      const next = prompt("Rename route:", t.name || "");
      if (next == null) return;
      t.name = next.trim() || "Untitled route";
      saveAllRoutes(all);
      if (state.route.id === id) state.route.name = t.name;
      renderSavedRoutes();
    });
    $("#saved-delete").addEventListener("click", () => {
      const id = $("#saved-select").value;
      if (!id) { setStatus("Select a saved route first."); return; }
      const all = loadAllRoutes();
      const t = all.find((x) => x.id === id);
      if (!t) return;
      if (!confirm("Delete “" + (t.name || "Untitled") + "”?")) return;
      saveAllRoutes(all.filter((x) => x.id !== id));
      if (state.route.id === id) newRoute();
      renderSavedRoutes();
    });
    $("#toggle-place").addEventListener("click", () => setMode(state.mode === "place" ? "plan" : "place"));
    $("#new-group").addEventListener("click", newDraftGroup);
    $("#new-monster").addEventListener("click", () => openMonsterDefModal(null));
    $("#edit-monster").addEventListener("click", () => { if (state.activeMonsterRef) openMonsterDefModal(state.activeMonsterRef); });
    $("#active-monster").addEventListener("change", (e) => { state.activeMonsterRef = e.target.value; });
    $("#export-catalog").addEventListener("click", () => openExportModal("catalog"));
    $("#export-groups").addEventListener("click", () => openExportModal("groups"));
    $("#reset-draft").addEventListener("click", resetDraft);

    state.route = freshRoute(state.mapId);
    state.activePullId = state.route.pulls[0].id;
    initMap();
    renderAll();
    renderSavedRoutes();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
