// Item types, names, and ids
module.exports = {
  primary: [
    'Armor',
    'Shields',
    'Melee Weapons',
    'Ranged Weapons',
    'Staves',
    'Jewelry',
    'Class Items',
    'Miscellaneous',
  ],
  quality: [
    'All',
    'Normal',
    'Exceptional',
    'Elite',
  ],
  rarity: [
    'Normal',
    'Set',
    'Unique',
  ],
  Armor: [
    'Belts',
    'Body Armor',
    'Boots',
    'Gloves',
    'Helms',
    'Circlets',
  ],
  Shields: [
    'Shields',
  ],
  'Melee Weapons': [
    'Axes',
    'Daggers',
    'Maces',
    'Polearms',
    'Scepters',
    'Spears',
    'Swords',
  ],
  'Ranged Weapons': [
    'Bows',
    'Crossbows',
    'Javelins',
    'Throwing Weapons',
  ],
  Staves: [
    'Staves',
    'Wands',
    'Sorceress Orbs',
  ],
  Jewelry: [
    'Rings',
    'Amulets',
  ],
  'Class Items': [
    'Amazon Weapons',
    'Assassin Claws',
    'Barbarian Helms',
    'Druid Helms',
    'Necromancer Totems',
    'Paladin Shields',
    'Sorceress Orbs',
  ],
  Miscellaneous: [
    'Runes',
    'Gems',
    'Potions',
    'Scrolls',
    'Tomes',
    'Other',
  ],
  BeltsNormalNormal: [
    {
      name: 'Sash', id: 'lbl', min: 2, max: 2, dur: 12,
    },
    {
      name: 'Light Belt', id: 'vbl', min: 3, max: 3, dur: 14,
    },
    {
      name: 'Belt', id: 'mbl', min: 5, max: 5, dur: 16,
    },
    {
      name: 'Heavy Belt', id: 'tbl', min: 6, max: 6, dur: 18,
    },
    {
      name: 'Plated Belt', id: 'hbl', min: 8, max: 11, dur: 24,
    },
  ],
  BeltsExceptionalNormal: [
    {
      name: 'Demonhide Sash', id: 'zlb', min: 29, max: 34, dur: 12,
    },
    {
      name: 'Sharkskin Belt', id: 'zvb', min: 31, max: 36, dur: 14,
    },
    {
      name: 'Mesh Belt', id: 'zmb', min: 35, max: 40, dur: 16,
    },
    {
      name: 'Battle Belt', id: 'ztb', min: 37, max: 42, dur: 18,
    },
    {
      name: 'War Belt', id: 'zhb', min: 41, max: 52, dur: 24,
    },
  ],
  BeltsEliteNormal: [
    {
      name: 'Spiderweb Sash', id: 'ulc', min: 55, max: 62, dur: 12,
    },
    {
      name: 'Vampirefang Belt', id: 'uvc', min: 56, max: 63, dur: 14,
    },
    {
      name: 'Mithril Coil', id: 'umc', min: 58, max: 65, dur: 16,
    },
    {
      name: 'Troll Belt', id: 'utc', min: 59, max: 66, dur: 18,
    },
    {
      name: 'Colossus Girdle', id: 'uhc', min: 61, max: 71, dur: 24,
    },
  ],
  BeltsNormalSet: [
    { name: 'Arctic Binding', id: '56' },
    { name: 'Death\'s Guard', id: '48' },
    { name: 'Hsaru\'s Iron Stay', id: '5' },
    { name: 'Infernal Sign', id: '43' },
    { name: 'Iratha\'s Cord', id: '12' },
    { name: 'Hwanin\'s Blessing', id: '110' },
    { name: 'Sigon\'s Wrap', id: '39' },
  ],
  BeltsExceptionalSet: [
    { name: 'Immortal King\'s Detail', id: '72' },
    { name: 'M\'avina\'s Tenet', id: '93' },
    { name: 'Tal Rasha\'s Fine Spun Cloth', id: '76' },
    { name: 'Wilhelm\'s Pride', id: '105' },
  ],
  BeltsEliteSet: [
    { name: 'Credendum', id: '99' },
    { name: 'Trang-Oul\'s Girth', id: '89' },
  ],
  BeltsNormalUnique: [
    { name: 'Lenymo', id: '112' },
    { name: 'Snakecord', id: '113' },
    { name: 'Nightsmoke', id: '114' },
    { name: 'Goldwrap', id: '115' },
    { name: 'Bladebuckle', id: '116' },
  ],
  BeltsExceptionalUnique: [
    { name: 'String of Ears', id: '242' },
    { name: 'Razortail', id: '243' },
    { name: 'Gloom\'s Trap', id: '244' },
    { name: 'Snowclash', id: '245' },
    { name: 'Thundergod\'s Vigor', id: '246' },
  ],
  BeltsEliteUnique: [
    { name: 'Arachnid Mesh', id: '373' },
    { name: 'Nosferatu\'s Coil', id: '374' },
    { name: 'Verdungo\'s Hearty Cord', id: '376' },
  ],
  'Body ArmorNormalNormal': [
    {
      name: 'Quilted Armor', id: 'qui', min: 8, max: 11, dur: 20,
    },
    {
      name: 'Leather Armor', id: 'lea', min: 14, max: 17, dur: 24,
    },
    {
      name: 'Hard Leather Armor', id: 'hla', min: 21, max: 24, dur: 28,
    },
    {
      name: 'Studded Leather', id: 'stu', min: 32, max: 35, dur: 32,
    },
    {
      name: 'Ring Mail', id: 'rng', min: 45, max: 48, dur: 26,
    },
    {
      name: 'Scale Mail', id: 'scl', min: 57, max: 60, dur: 36,
    },
    {
      name: 'Breast Plate', id: 'brs', min: 65, max: 68, dur: 50,
    },
    {
      name: 'Chain Mail', id: 'chn', min: 72, max: 75, dur: 45,
    },
    {
      name: 'Splint Mail', id: 'spl', min: 90, max: 95, dur: 30,
    },
    {
      name: 'Light Plate', id: 'ltp', min: 90, max: 107, dur: 60,
    },
    {
      name: 'Field Plate', id: 'fld', min: 101, max: 105, dur: 48,
    },
    {
      name: 'Plate Mail', id: 'plt', min: 108, max: 116, dur: 60,
    },
    {
      name: 'Gothic Plate', id: 'gth', min: 128, max: 135, dur: 55,
    },
    {
      name: 'Full Plate Mail', id: 'ful', min: 150, max: 161, dur: 70,
    },
    {
      name: 'Ancient Armor', id: 'aar', min: 218, max: 233, dur: 60,
    },
  ],
  'Body ArmorExceptionalNormal': [
    {
      name: 'Ghost Armor', id: 'xui', min: 102, max: 117, dur: 20,
    },
    {
      name: 'Serpentskin Armor', id: 'xea', min: 111, max: 126, dur: 24,
    },
    {
      name: 'Demonhide Armor', id: 'xla', min: 122, max: 136, dur: 28,
    },
    {
      name: 'Trellised Leather', id: 'xtu', min: 138, max: 153, dur: 32,
    },
    {
      name: 'Linked Mail', id: 'xng', min: 158, max: 172, dur: 26,
    },
    {
      name: 'Tigulated Mail', id: 'xcl', min: 176, max: 190, dur: 36,
    },
    {
      name: 'Cuirass', id: 'xrs', min: 188, max: 202, dur: 50,
    },
    {
      name: 'Mesh Armor', id: 'xhn', min: 198, max: 213, dur: 45,
    },
    {
      name: 'Russet Armor', id: 'xpl', min: 225, max: 243, dur: 30,
    },
    {
      name: 'Mage Plate', id: 'xtp', min: 225, max: 261, dur: 60,
    },
    {
      name: 'Sharktooth Armor', id: 'xld', min: 242, max: 258, dur: 48,
    },
    {
      name: 'Templar Coat', id: 'xlt', min: 252, max: 274, dur: 60,
    },
    {
      name: 'Embossed Plate', id: 'xth', min: 282, max: 303, dur: 55,
    },
    {
      name: 'Chaos Armor', id: 'xul', min: 315, max: 342, dur: 70,
    },
    {
      name: 'Ornate Plate', id: 'xar', min: 417, max: 450, dur: 60,
    },
  ],
  'Body ArmorEliteNormal': [
    {
      name: 'Dusk Shroud', id: 'uui', min: 361, max: 467, dur: 20,
    },
    {
      name: 'Wyrmhide', id: 'uea', min: 364, max: 470, dur: 24,
    },
    {
      name: 'Scarab Husk', id: 'ula', min: 369, max: 474, dur: 28,
    },
    {
      name: 'Wire Fleece', id: 'utu', min: 375, max: 481, dur: 32,
    },
    {
      name: 'Diamond Mail', id: 'ung', min: 383, max: 489, dur: 26,
    },
    {
      name: 'Loricated Mail', id: 'ucl', min: 390, max: 496, dur: 36,
    },
    {
      name: 'Great Hauberk', id: 'urs', min: 395, max: 501, dur: 50,
    },
    {
      name: 'Boneweave', id: 'uhn', min: 399, max: 505, dur: 42,
    },
    {
      name: 'Balrog Skin', id: 'upl', min: 410, max: 517, dur: 30,
    },
    {
      name: 'Archon Plate', id: 'utp', min: 410, max: 524, dur: 60,
    },
    {
      name: 'Kraken Shell', id: 'uld', min: 417, max: 523, dur: 48,
    },
    {
      name: 'Hellforge Plate', id: 'ult', min: 421, max: 530, dur: 60,
    },
    {
      name: 'Lacquered Plate', id: 'uth', min: 433, max: 541, dur: 55,
    },
    {
      name: 'Shadow Plate', id: 'uul', min: 446, max: 557, dur: 70,
    },
    {
      name: 'Sacred Armor', id: 'uar', min: 487, max: 600, dur: 60,
    },
  ],
  'Body ArmorNormalSet': [
    { name: 'Angelic Mantle', id: '51' },
    { name: 'Arcanna\'s Flesh', id: '61' },
    { name: 'Arctic Furs', id: '55' },
    { name: 'Berserker\'s Hauberk', id: '45' },
    { name: 'Cathan\'s Mesh', id: '26' },
    { name: 'Isenhart\'s Case', id: '15' },
    { name: 'Milabrega\'s Robe', id: '24' },
    { name: 'Sigon\'s Shelter', id: '37' },
    { name: 'Tancred\'s Spine', id: '31' },
    { name: 'Vidala\'s Ambush', id: '19' },
    { name: 'Cow King\'s Hide', id: '118' },
  ],
  'Body ArmorExceptionalSet': [
    { name: 'Aldur\'s Deception', id: '67' },
    { name: 'Griswold\'s Heart', id: '82' },
    { name: 'Haemosu\'s Adament', id: '102' },
    { name: 'Hwanin\'s Refuge', id: '109' },
    { name: 'Trang-Oul\'s Scales', id: '86' },
  ],
  'Body ArmorEliteSet': [
    { name: 'Immortal King\'s Soul Cage', id: '71' },
    { name: 'M\'avina\'s Embrace', id: '91' },
    { name: 'Naj\'s Light Plate', id: '121' },
    { name: 'Natalya\'s Shadow', id: '64' },
    { name: 'Sazabi\'s Ghost Liberator', id: '113' },
    { name: 'Tal Rasha\'s Guardianship', id: '79' },
  ],
  'Body ArmorNormalUnique': [
    { name: 'Greyform', id: '79' },
    { name: 'Blinkbat\'s Form', id: '80' },
    { name: 'The Centurion', id: '81' },
    { name: 'Twitchthroe', id: '82' },
    { name: 'Darkglow', id: '83' },
    { name: 'Hawkmail', id: '84' },
    { name: 'Sparking Mail', id: '85' },
    { name: 'Venom Ward', id: '86' },
    { name: 'Iceblink', id: '87' },
    { name: 'Boneflesh', id: '88' },
    { name: 'Rattlecage', id: '89' },
    { name: 'Rockfleece', id: '90' },
    { name: 'Goldskin', id: '91' },
    { name: 'Silks of the Victor', id: '92' },
    { name: 'Heavenly Garb', id: '93' },
  ],
  'Body ArmorExceptionalUnique': [
    { name: 'The Spirit Shroud', id: '209' },
    { name: 'Skin of the Vipermagi', id: '210' },
    { name: 'Skin of the Flayed One', id: '211' },
    { name: 'Iron Pelt', id: '212' },
    { name: 'Spirit Forge', id: '213' },
    { name: 'Crow Caw', id: '214' },
    { name: 'Shaftstop', id: '215' },
    { name: 'Duriel\'s Shell', id: '216' },
    { name: 'Skullder\'s Ire', id: '217' },
    { name: 'Guardian Angel', id: '218' },
    { name: 'Toothrow', id: '219' },
    { name: 'Que-Hegan\'s Wisdom', id: '223' },
    { name: 'Atma\'s Wail', id: '220' },
    { name: 'Black Hades', id: '221' },
    { name: 'Corpsemourn', id: '222' },
  ],
  'Body ArmorEliteUnique': [
    { name: 'Leviathan', id: '317' },
    { name: 'Ormus\' Robes', id: '358' },
    { name: 'Steel Carapace', id: '348' },
    { name: 'The Gladiator\'s Bane', id: '250' },
    { name: 'Arkaine\'s Valor', id: '251' },
    { name: 'Templar\'s Might', id: '366' },
    { name: 'Tyrael\'s Might', id: '311' },
  ],
  GlovesNormalSet: [
    { name: 'Arctic Mitts', id: '57' },
    { name: 'Cleglaw\'s Pincers', id: '8' },
    { name: 'Death\'s Hand', id: '47' },
    { name: 'Iratha\'s Cuff', id: '10' },
  ],
  ShieldsNormalNormal: [
    { name: 'Buckler', id: 'buc' },
    { name: 'Small Shield', id: 'sml' },
    { name: 'Large Shield', id: 'lrg' },
    { name: 'Kite Shield', id: 'kit' },
    { name: 'Spiked Shield', id: 'spk' },
    { name: 'Bone Shield', id: 'bsh' },
    { name: 'Tower Shield', id: 'tow' },
    { name: 'Gothic Shield', id: 'gts' },
  ],
  ShieldsExceptionalNormal: [
    { name: 'Defender', id: 'xuc' },
    { name: 'Round Shield', id: 'xml' },
    { name: 'Scutum', id: 'xrg' },
    { name: 'Dragon Shield', id: 'xit' },
    { name: 'Barbed Shield', id: 'xpk' },
    { name: 'Grim Shield', id: 'xsh' },
    { name: 'Pavise', id: 'xow' },
    { name: 'Ancient Shield', id: 'xts' },
  ],
  ShieldsEliteNormal: [
    { name: 'Heater', id: 'uuc' },
    { name: 'Luna', id: 'uml' },
    { name: 'Hyperion', id: 'urg' },
    { name: 'Monarch', id: 'uit' },
    { name: 'Blade Barrier', id: 'upk' },
    { name: 'Troll Nest', id: 'ush' },
    { name: 'Aegis', id: 'uow' },
    { name: 'Ward', id: 'uts' },
  ],
  AxesNormalNormal: [
    {
      name: 'Hand Axe', id: 'hax', min: 3, max: 6, dur: 28,
    },
    {
      name: 'Axe', id: 'axe', min: 4, max: 11, dur: 24,
    },
    {
      name: 'Double Axe', id: '2ax', min: 5, max: 13, dur: 24,
    },
    {
      name: 'Military Pick', id: 'mpi', min: 7, max: 11, dur: 26,
    },
    {
      name: 'War Axe', id: 'wax', min: 10, max: 18, dur: 26,
    },
    {
      name: 'Large Axe', id: 'lax', min: 6, max: 13, dur: 30,
    },
    {
      name: 'Broad Axe', id: 'bax', min: 10, max: 18, dur: 35,
    },
    {
      name: 'Battle Axe', id: 'btx', min: 12, max: 32, dur: 40,
    },
    {
      name: 'Great Axe', id: 'gax', min: 9, max: 30, dur: 50,
    },
    {
      name: 'Giant Axe', id: 'gix', min: 22, max: 45, dur: 50,
    },
  ],
  AxesExceptionalNormal: [
    {
      name: 'Hatchet', id: '9ha', min: 10, max: 21, dur: 28,
    },
    {
      name: 'Cleaver', id: '9ax', min: 10, max: 33, dur: 24,
    },
    {
      name: 'Twin Axe', id: '92a', min: 13, max: 38, dur: 24,
    },
    {
      name: 'Crowbill', id: '9mp', min: 14, max: 34, dur: 26,
    },
    {
      name: 'Naga', id: '9wa', min: 16, max: 45, dur: 26,
    },
    {
      name: 'Military Axe', id: '9la', min: 14, max: 34, dur: 30,
    },
    {
      name: 'Bearded Axe', id: '9ba', min: 21, max: 49, dur: 35,
    },
    {
      name: 'Tabar', id: '9bt', min: 24, max: 77, dur: 40,
    },
    {
      name: 'Gothic Axe', id: '9ga', min: 18, max: 70, dur: 50,
    },
    {
      name: 'Ancient Axe', id: '9gi', min: 43, max: 85, dur: 50,
    },
  ],
  AxesEliteNormal: [
    {
      name: 'Tomahawk', id: '7ha', min: 33, max: 58, dur: 28,
    },
    {
      name: 'Small Crescent', id: '7ax', min: 38, max: 60, dur: 24,
    },
    {
      name: 'Ettin Axe', id: '72a', min: 33, max: 66, dur: 24,
    },
    {
      name: 'War Spike', id: '7mp', min: 30, max: 48, dur: 26,
    },
    {
      name: 'Berserker Axe', id: '7wa', min: 24, max: 71, dur: 26,
    },
    {
      name: 'Feral Axe', id: '7la', min: 25, max: 123, dur: 30,
    },
    {
      name: 'Silver-edged Axe', id: '7ba', min: 62, max: 110, dur: 35,
    },
    {
      name: 'Decapitator', id: '7bt', min: 49, max: 137, dur: 40,
    },
    {
      name: 'Champion Axe', id: '7ga', min: 59, max: 94, dur: 50,
    },
    {
      name: 'Glorious Axe', id: '7gi', min: 60, max: 124, dur: 50,
    },
  ],
  Runes: [
    { name: 'El Rune', id: 'r01' },
    { name: 'Eld Rune', id: 'r02' },
    { name: 'Tir Rune', id: 'r03' },
    { name: 'Nef Rune', id: 'r04' },
    { name: 'Eld Rune', id: 'r05' },
    { name: 'Ith Rune', id: 'r06' },
    { name: 'Tal Rune', id: 'r07' },
    { name: 'Ral Rune', id: 'r08' },
    { name: 'Ort Rune', id: 'r09' },
    { name: 'Thul Rune', id: 'r10' },
    { name: 'Amn Rune', id: 'r11' },
    { name: 'Sol Rune', id: 'r12' },
    { name: 'Shael Rune', id: 'r13' },
    { name: 'Dol Rune', id: 'r14' },
    { name: 'Hel Rune', id: 'r15' },
    { name: 'Io Rune', id: 'r16' },
    { name: 'Lum Rune', id: 'r17' },
    { name: 'Ko Rune', id: 'r18' },
    { name: 'Fal Rune', id: 'r19' },
    { name: 'Lem Rune', id: 'r20' },
    { name: 'Pul Rune', id: 'r21' },
    { name: 'Um Rune', id: 'r22' },
    { name: 'Mal Rune', id: 'r23' },
    { name: 'Ist Rune', id: 'r24' },
    { name: 'Gul Rune', id: 'r25' },
    { name: 'Vex Rune', id: 'r26' },
    { name: 'Ohm Rune', id: 'r27' },
    { name: 'Lo Rune', id: 'r28' },
    { name: 'Sur Rune', id: 'r29' },
    { name: 'Ber Rune', id: 'r30' },
    { name: 'Jah Rune', id: 'r31' },
    { name: 'Cham Rune', id: 'r32' },
    { name: 'Zod Rune', id: 'r33' },
  ],
  Gems: [
    { name: 'Chipped Amethyst', id: 'gcv' },
    { name: 'Chipped Diamond', id: 'gcw' },
    { name: 'Chipped Emerald', id: 'gcg' },
    { name: 'Chipped Ruby', id: 'gcr' },
    { name: 'Chipped Sapphire', id: 'gcb' },
    { name: 'Chipped Skull', id: 'skc' },
    { name: 'Chipped Topaz', id: 'gcy' },
    { name: 'Flawed Amethyst', id: 'gfv' },
    { name: 'Flawed Diamond', id: 'gfw' },
    { name: 'Flawed Emerald', id: 'gfg' },
    { name: 'Flawed Ruby', id: 'gfr' },
    { name: 'Flawed Sapphire', id: 'gfb' },
    { name: 'Flawed Skull', id: 'skf' },
    { name: 'Flawed Topaz', id: 'gfy' },
    { name: 'Amethyst', id: 'gsv' },
    { name: 'Diamond', id: 'gsw' },
    { name: 'Emerald', id: 'gsg' },
    { name: 'Ruby', id: 'gsr' },
    { name: 'Sapphire', id: 'gsb' },
    { name: 'Skull', id: 'sku' },
    { name: 'Topaz', id: 'gsy' },
    { name: 'Flawless Amethyst', id: 'gzv' },
    { name: 'Flawless Diamond', id: 'glw' },
    { name: 'Flawless Emerald', id: 'glg' },
    { name: 'Flawless Ruby', id: 'glr' },
    { name: 'Flawless Sapphire', id: 'glb' },
    { name: 'Flawless Skull', id: 'skl' },
    { name: 'Flawless Topaz', id: 'gly' },
    { name: 'Perfect Amethyst', id: 'gpv' },
    { name: 'Perfect Diamond', id: 'gpw' },
    { name: 'Perfect Emerald', id: 'gpg' },
    { name: 'Perfect Ruby', id: 'gpr' },
    { name: 'Perfect Sapphire', id: 'gpb' },
    { name: 'Perfect Skull', id: 'skz' },
    { name: 'Perfect Topaz', id: 'gpy' },
  ],
  Potions: [
    { name: 'Lesser Healing Potion', id: 'hp1' },
    { name: 'Lesser Mana Potion', id: 'mp1' },
    { name: 'Light Healing Potion', id: 'hp2' },
    { name: 'Light Mana Potion', id: 'mp2' },
    { name: 'Healing Potion', id: 'hp3' },
    { name: 'Mana Potion', id: 'mp3' },
    { name: 'Strong Healing Potion', id: 'hp4' },
    { name: 'Strong Mana Potion', id: 'mp4' },
    { name: 'Greater Healing Potion', id: 'hp5' },
    { name: 'Greater Mana Potion', id: 'mp5' },
    { name: 'Rejuvenation Potion', id: 'rvs' },
    { name: 'Full Rejuvenation Potion', id: 'rvl' },
  ],
  Scrolls: [
    { name: 'Identity Scroll', id: 'isc' },
    { name: 'Town Portal Scroll', id: 'tsc' },
  ],
  Tomes: [
    { name: 'Identify Book', id: 'ibk' },
    { name: 'Town Portal Book', id: 'tbk' },
  ],
  Other: [
    { name: 'Burning Essence of Terror', id: 'bet' },
    { name: 'Charged Essence of Hatred', id: 'ceh' },
    { name: 'Festering Essence of Destruction', id: 'fed' },
    { name: 'Twisted Essence of Suffering', id: 'tes' },
    { name: 'Token of Absolution', id: 'toa' },
    { name: 'Key of Hate', id: 'pk1' },
    { name: 'Key of Terror', id: 'pk2' },
    { name: 'Key of Destruction', id: 'pk3' },
  ],
};
