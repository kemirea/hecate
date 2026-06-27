// Per-map monster catalogs. Each map has its OWN set of monsters, keyed by the
// map's id. Each monster has a `count` — the point value that monster is worth
// (a single monster can be worth more than 1). Map placements reference a
// monster by its `id` (the placement's `ref` field) and inherit its `name` and
// `count`. Edit a monster here and every placement of it on that map updates.
window.MONSTERS = {
  everdawn: [
    { id: "desecrator", name: "Desecrator", count: 3 },
    { id: "outrunner", name: "Outrunner", count: 2 },
    { id: "skittershard", name: "Skittershard", count: 1 },
    { id: "blighted_dawnbloom", name: "Blighted Dawnbloom", count: 2 },
    { id: "mangy_brute", name: "Mangy Brute", count: 1 },
    { id: "gorestained_butcher", name: "Gorestained Butcher", count: 5 },
    { id: "horned_seer", name: "Horned Seer", count: 3 },
    { id: "bloodstone_goliath", name: "Bloodstone Goliath", count: 5 },
    { id: "corrupted_totemic", name: "Corrupted Totemic", count: 4 }
  ],
  sailors: [
    { id: "fading_raider", name: "Fading Raider", count: 2 },
    { id: "vengeful_shade", name: "Vengeful Shade", count: 3 },
    { id: "tormented_spectre", name: "Tormented Spectre", count: 2 },
    { id: "lost_soul", name: "Lost Soul", count: 0.5 },
    { id: "dire_rat", name: "Dire Rat", count: 1 },
    { id: "witchreef_lasher", name: "Witchreef Lasher", count: 1 },
    { id: "deepbound_magi", name: "Deepbound Magi", count: 5 },
    { id: "water_elemental", name: "Water Elemental", count: 3 },
    { id: "hollowed_corsair", name: "Hollowed Corsair", count: 5 }
  ],
  godfall: [
    { id: "dredge", name: "Dredge", count: 1 },
    { id: "task_master", name: "Task Master", count: 4 },
    { id: "skittershard", name: "Skittershard", count: 1 },
    { id: "godfall_wardstone", name: "Godfall Wardstone", count: 2 },
    { id: "nezari_bolter", name: "Nezari Bolter", count: 2 },
    { id: "arcane_warden", name: "Arcane Warden", count: 4 },
    { id: "enforcer", name: "Enforcer", count: 5 },
    { id: "enraged_earth_elemental", name: "Enraged Earth Elemental", count: 7 },
    { id: "quarry_stalker", name: "Quarry Stalker", count: 2 }
  ],
  scryers: [],
  silken: [],
  urrak: [],
  cithrel: []
};
