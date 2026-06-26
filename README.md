# Route Planner — Phase 0

A static-map route planner for a video game. A **route** is an ordered list of
**pulls**; a **pull** is one or more **groups**; a **group** is one or more
**monsters**, and each monster has its own dot on the map. Clicking any monster
dot selects the whole group. Each map has its own **monster catalog**
(`js/monsters.js`, keyed by map id), each monster with a `count` — the **point
value** that monster is worth (a single monster can be worth more than 1). Each
map placement references one of that map's catalog monsters by id and contributes
its `count`; you can place as many of a monster as you want. A group's/pull's/route's total is the **sum of placement
point values**. Each map has a `requiredCount`; the app shows each pull's and the
whole route's count as a percentage of it. Groups are fixed game data placed on
each map. This phase has no accounts — routes are saved in your browser's
`localStorage`.

## Run it

Leaflet and SortableJS are vendored locally (in `vendor/`), so the app is
self-contained and needs no internet connection. Run a tiny local web server
from this folder:

```bash
cd ~/Projects/hecate
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

(Opening `index.html` directly via `file://` mostly works too, but a local
server avoids browser quirks with local files.)

## How to use

- **Pick a map** from the toolbar dropdown.
- **New route** creates a route named "New Route" with **one empty pull**
  (selected). Save it, then load/switch routes via the **Route** dropdown in the
  toolbar; use ✎ / 🗑 next to it to rename or delete the selected route.
- **Click a group** on the map to add it to the selected pull. Click it again to
  remove it. Clicking a group that's in another pull **moves** it to the
  selected pull (each group is used at most once per route).
- **+ Add pull** creates a new pull and selects it. Select any pull in the list
  to edit which groups belong to it.
- **Drag** the ⠿ handle to reorder pulls (this is the visit order; the dashed
  route line follows it).
- Multi-group pulls are wrapped in a **shaded hull** sharing the pull's color
  and number.
- Click **Export** to get a single-line shareable text string for the current
  route (copy to clipboard from the dialog). **Import** opens a dialog to paste
  such a string; it loads as a new route (switching maps if needed) — Save to keep it.
- Click **Save** to store the current route. The toolbar **Route** dropdown
  lists saved routes for the current map; ✎ renames and 🗑 deletes the selected
  one. The route's **total count/percentage** stays pinned at the top of the
  sidebar while the pull list scrolls.

## Placement mode (building the catalog + placing monsters)

Click **📍 Placement mode** in the toolbar to manage monsters and place them
without hand-editing coordinates:

- **Monster catalog:** **+ New monster** defines a monster (name + count point
  value); **Edit** changes the one chosen in the **Active monster** dropdown.
- **+ New group** adds a group and selects it. Groups are auto-named **G1, G2,
  …** by the order they're added (no prompt).
- With a group selected and a monster chosen, **click the map** to drop that
  monster — placing many of the same monster is just repeated clicks.
- **Drag** a dot to move it; **click** a dot to change which monster it is, or
  delete it.
- Use the group list to switch the selected group or delete ✕ a group (deleting
  renumbers the rest).
- Edits **autosave** to your browser, per map (both the catalog and the groups).
- **Export catalog** → paste this map's `<mapId>: [...]` entry into
  `js/monsters.js`; **Export groups** → paste over that map's `groups` block in
  `js/maps.js`. **Reset** reverts both to the committed files.

The files stay the single source of truth — placement drafts only affect the
planner once you export and paste them in. Click 📍 again to return to route
planning.

## Files

```
index.html        markup + script tags
css/styles.css    styling
js/monsters.js    per-map monster catalogs (window.MONSTERS, keyed by map id)
js/maps.js        static map + group data; placements reference catalog ids
js/app.js         all app logic (state, map, pulls, catalog, persistence)
maps/*.webp       map images
vendor/           Leaflet + SortableJS (vendored locally, no CDN)
```

## Adding real data

- **Monsters** live in `js/monsters.js` as `window.MONSTERS`, an object keyed by
  map id (`{ everdawn: [...], sailors: [...] }`); each monster is
  `{ id, name, count }`, where `count` is the monster's point value. Monster ids
  only need to be unique within their map.
- **Maps** live in `js/maps.js`: set each map's `url`, `width`, `height`,
  `requiredCount` (target total), and `groups`. Each group has a `name` and a
  `monsters` array of placements `{ ref, x, y }`, where `ref` is a monster `id`
  from the catalog and `x`/`y` are pixel coordinates (origin = top-left).

The easiest way to fill these in is Placement mode (above): it exports both the
catalog and the groups. `requiredCount` isn't part of the export — set it
directly in `js/maps.js`.

## Not in this phase

User accounts, cloud sync, sharing, route stats, and map lasso-select. See the
project plan in Claude memory for the full phased roadmap.
