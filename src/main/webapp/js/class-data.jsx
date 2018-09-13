// Skill and attribute data for each class
module.exports = [
    { // Amazon
        "attributes": [20, 25, 20, 15],
        "skills": [
            {
                id: 6, name: "Magic Arrow", level: 1, deps: []
            },
            {
                id: 7, name: "Fire Arrow", level: 1, deps: []
            },
            {
                id: 8, name: "Inner Sight", level: 1, deps: []
            },
            {
                id: 9, name: "Critical Strike", level: 1, deps: []
            },
            {
                id: 10, name: "Jab", level: 1, deps: []
            },
            {
                id: 11, name: "Cold Arrow", level: 6, deps: []
            },
            {
                id: 12, name: "Multiple Shot", level: 6, deps: [6]
            },
            {
                id: 13, name: "Dodge", level: 6, deps: []
            },
            {
                id: 14, name: "Power Strike",  level: 6, deps: [10]
            },
            {
                id: 15, name: "Poison Javelin", level: 6, deps: []
            },
            {
                id: 16, name: "Exploding Arrow", level: 12, deps: [7, 12]
            },
            {
                id: 17, name: "Slow Missiles", level: 12, deps: [8]
            },
            {
                id: 18, name: "Avoid", level: 12, deps: [13]
            },
            {
                id: 19, name: "Impale", level: 12, deps: [10]
            },
            {
                id: 20, name: "Lightning Bolt", level: 12, deps: [15]
            },
            {
                id: 21, name: "Ice Arrow", level: 18, deps: [11]
            },
            {
                id: 22, name: "Guided Arrow", level: 18, deps: [11, 12]
            },
            {
                id: 23, name: "Penetrate", level: 18, deps: [9]
            },
            {
                id: 24, name: "Charged Strike", level: 18, deps: [14, 20]
            },
            {
                id: 25, name: "Plague Javelin", level: 18, deps: [20]
            },
            {
                id: 26, name: "Strafe", level: 24, deps: [22]
            },
            {
                id: 27, name: "Immolation Arrow", level: 24, deps: [16]
            },
            {
                id: 28, name: "Decoy", level: 24, deps: [17]
            },
            {
                id: 29, name: "Evade", level: 24, deps: [18]
            },
            {
                id: 30, name: "Fend", level: 24, deps: [19]
            },
            {
                id: 31, name: "Freezing Arrow", level: 30, deps: [21]
            },
            {
                id: 32, name: "Valkyrie", level: 30, deps: [28, 29]
            },
            {
                id: 33, name: "Pierce", level: 30, deps: [23]
            },
            {
                id: 34, name: "Lightning Strike", level: 30, deps: [24]
            },
            {
                id: 35, name: "Lightning Fury", level: 30, deps: [25]
            }
        ]
    },
    { // Sorceress
        "attributes": [10, 25, 10, 35],
        "skills": [
            {
                id: 36, name: "Fire Bolt", level: 1, deps: []
            },
            {
                id: 37, name: "Warmth", level: 1, deps: []
            },
            {
                id: 38, name: "Charged Bolt", level: 1, deps: []
            },
            {
                id: 39, name: "Ice Bolt", level: 1, deps: []
            },
            {
                id: 40, name: "Frozen Armor", level: 1, deps: []
            },
            {
                id: 41, name: "Inferno", level: 6, deps: []
            },
            {
                id: 42, name: "Static Field", level: 6, deps: []
            },
            {
                id: 43, name: "Telekinesis", level: 6, deps: []
            },
            {
                id: 44, name: "Frost Nova",  level: 6, deps: []
            },
            {
                id: 45, name: "Ice Blast", level: 6, deps: [39]
            },
            {
                id: 46, name: "Blaze", level: 12, deps: [41]
            },
            {
                id: 47, name: "Fire Ball", level: 12, deps: [36]
            },
            {
                id: 48, name: "Nova", level: 12, deps: [42]
            },
            {
                id: 49, name: "Lightning", level: 12, deps: [40, 45]
            },
            {
                id: 50, name: "Shiver Armor", level: 12, deps: [15]
            },
            {
                id: 51, name: "Fire Wall", level: 18, deps: [46]
            },
            {
                id: 52, name: "Enchant", level: 18, deps: [37, 47]
            },
            {
                id: 53, name: "Chain Lightning", level: 18, deps: [49]
            },
            {
                id: 54, name: "Teleport", level: 18, deps: [43]
            },
            {
                id: 55, name: "Glacial Spike", level: 18, deps: [45]
            },
            {
                id: 56, name: "Meteor", level: 24, deps: [47, 51]
            },
            {
                id: 57, name: "Thunder Storm", level: 24, deps: [48, 53]
            },
            {
                id: 58, name: "Energy Shield", level: 24, deps: [53, 54]
            },
            {
                id: 59, name: "Blizzard", level: 24, deps: [44, 55]
            },
            {
                id: 60, name: "Chilling Armor", level: 24, deps: [50]
            },
            {
                id: 61, name: "Fire Mastery", level: 30, deps: []
            },
            {
                id: 62, name: "Hydra", level: 30, deps: [52]
            },
            {
                id: 63, name: "Lightning Mastery", level: 30, deps: []
            },
            {
                id: 64, name: "Frozen Orb", level: 30, deps: [59]
            },
            {
                id: 65, name: "Cold Mastery", level: 30, deps: []
            }
        ]
    },
    { // Necromancer
        "attributes": [15, 25, 15, 25],
        "skills": [
            {
                id: 66, name: "Amplify Damage", level: 1, deps: []
            },
            {
                id: 67, name: "Teeth", level: 1, deps: []
            },
            {
                id: 68, name: "Bone Armor", level: 1, deps: []
            },
            {
                id: 69, name: "Skeleton Mastery", level: 1, deps: [70]
            },
            {
                id: 70, name: "Raise Skeleton", level: 1, deps: []
            },
            {
                id: 71, name: "Dim Vision", level: 6, deps: []
            },
            {
                id: 72, name: "Weaken", level: 6, deps: [66]
            },
            {
                id: 73, name: "Poison Dagger", level: 6, deps: []
            },
            {
                id: 74, name: "Corpse Explosion",  level: 6, deps: [67]
            },
            {
                id: 75, name: "Clay Golem", level: 6, deps: []
            },
            {
                id: 76, name: "Iron Maiden", level: 12, deps: [66]
            },
            {
                id: 77, name: "Terror", level: 12, deps: [72]
            },
            {
                id: 78, name: "Bone Wall", level: 12, deps: [68]
            },
            {
                id: 79, name: "Golem Mastery", level: 12, deps: [75]
            },
            {
                id: 80, name: "Raise Skeletal Mage", level: 12, deps: [70]
            },
            {
                id: 81, name: "Confuse", level: 18, deps: [71]
            },
            {
                id: 82, name: "Life Tap", level: 18, deps: [76]
            },
            {
                id: 83, name: "Poison Explosion", level: 18, deps: [73, 74]
            },
            {
                id: 84, name: "Bone Spear", level: 18, deps: [74]
            },
            {
                id: 85, name: "Blood Golem", level: 18, deps: [75]
            },
            {
                id: 86, name: "Attract", level: 24, deps: [81]
            },
            {
                id: 87, name: "Decrepify", level: 24, deps: [77]
            },
            {
                id: 88, name: "Bone Prison", level: 24, deps: [78, 84]
            },
            {
                id: 89, name: "Summon Resist", level: 24, deps: [79]
            },
            {
                id: 90, name: "Iron Golem", level: 24, deps: [85]
            },
            {
                id: 91, name: "Lower Resist", level: 30, deps: [82, 87]
            },
            {
                id: 92, name: "Poison Nova", level: 30, deps: [83]
            },
            {
                id: 93, name: "Bone Spirit", level: 30, deps: [84]
            },
            {
                id: 94, name: "Fire Golem", level: 30, deps: [90]
            },
            {
                id: 95, name: "Revive", level: 30, deps: [80, 90]
            }
        ]
    },
    { // Paladin
        "attributes": [25, 20, 25, 15],
        "skills": [
            {
                id: 96, name: "Sacrifice", level: 1, deps: []
            },
            {
                id: 97, name: "Smite", level: 1, deps: []
            },
            {
                id: 98, name: "Might", level: 1, deps: []
            },
            {
                id: 99, name: "Prayer", level: 1, deps: []
            },
            {
                id: 100, name: "Resist Fire", level: 1, deps: []
            },
            {
                id: 101, name: "Holy Bolt", level: 6, deps: []
            },
            {
                id: 102, name: "Holy Fire", level: 6, deps: [98]
            },
            {
                id: 103, name: "Thorns", level: 6, deps: []
            },
            {
                id: 104, name: "Defiance",  level: 6, deps: []
            },
            {
                id: 105, name: "Resist Cold", level: 6, deps: []
            },
            {
                id: 106, name: "Zeal", level: 12, deps: [96]
            },
            {
                id: 107, name: "Charge", level: 12, deps: [97]
            },
            {
                id: 108, name: "Blessed Aim", level: 12, deps: [98]
            },
            {
                id: 109, name: "Cleansing", level: 12, deps: [99]
            },
            {
                id: 110, name: "Resist Lightning", level: 12, deps: []
            },
            {
                id: 111, name: "Vengeance", level: 18, deps: [106]
            },
            {
                id: 112, name: "Blessed Hammer", level: 18, deps: [101]
            },
            {
                id: 113, name: "Concentration", level: 18, deps: [108]
            },
            {
                id: 114, name: "Holy Freeze", level: 18, deps: [102]
            },
            {
                id: 115, name: "Vigor", level: 18, deps: [104, 109]
            },
            {
                id: 116, name: "Conversion", level: 24, deps: [111]
            },
            {
                id: 117, name: "Holy Shield", level: 24, deps: [107, 112]
            },
            {
                id: 118, name: "Holy Shock", level: 24, deps: [114]
            },
            {
                id: 119, name: "Sanctuary", level: 24, deps: [103, 114]
            },
            {
                id: 120, name: "Meditation", level: 24, deps: [109]
            },
            {
                id: 121, name: "Fist of the Heavens", level: 30, deps: [112, 116]
            },
            {
                id: 122, name: "Fanaticism", level: 30, deps: [113]
            },
            {
                id: 123, name: "Conviction", level: 30, deps: [119]
            },
            {
                id: 124, name: "Redemption", level: 30, deps: [115]
            },
            {
                id: 125, name: "Salvation", level: 30, deps: []
            }
        ]
    },
    { // Barbarian
        "attributes": [30, 20, 25, 10],
        "skills": [
            {
                id: 126, name: "Bash", level: 1, deps: []
            },
            {
                id: 127, name: "Sword Mastery", level: 1, deps: []
            },
            {
                id: 128, name: "Axe Mastery", level: 1, deps: []
            },
            {
                id: 129, name: "Mace Mastery", level: 1, deps: []
            },
            {
                id: 130, name: "Howl", level: 1, deps: []
            },
            {
                id: 131, name: "Find Potion", level: 1, deps: []
            },
            {
                id: 132, name: "Leap", level: 6, deps: []
            },
            {
                id: 133, name: "Double Swing", level: 6, deps: [126]
            },
            {
                id: 134, name: "Pole Arm Mastery",  level: 6, deps: []
            },
            {
                id: 135, name: "Throwing Mastery", level: 6, deps: []
            },
            {
                id: 136, name: "Spear Mastery", level: 6, deps: []
            },
            {
                id: 137, name: "Taunt", level: 6, deps: [130]
            },
            {
                id: 138, name: "Shout", level: 6, deps: [130]
            },
            {
                id: 139, name: "Stun", level: 12, deps: [126]
            },
            {
                id: 140, name: "Double Throw", level: 12, deps: [133]
            },
            {
                id: 141, name: "Increased Stamina", level: 12, deps: []
            },
            {
                id: 142, name: "Find Item", level: 12, deps: [131]
            },
            {
                id: 143, name: "Leap Attack", level: 18, deps: [132]
            },
            {
                id: 144, name: "Concentrate", level: 18, deps: [139]
            },
            {
                id: 145, name: "Iron Skin", level: 18, deps: []
            },
            {
                id: 146, name: "Battle Cry", level: 18, deps: [137]
            },
            {
                id: 147, name: "Frenzy", level: 24, deps: [140]
            },
            {
                id: 148, name: "Increased Speed", level: 24, deps: [141]
            },
            {
                id: 149, name: "Battle Orders", level: 24, deps: [138]
            },
            {
                id: 150, name: "Grim Ward", level: 24, deps: [150]
            },
            {
                id: 151, name: "Whirlwind", level: 30, deps: [143, 144]
            },
            {
                id: 152, name: "Berserk", level: 30, deps: [144]
            },
            {
                id: 153, name: "Natural Resistance", level: 30, deps: [145]
            },
            {
                id: 154, name: "War Cry", level: 30, deps: [146, 149]
            },
            {
                id: 155, name: "Battle Command", level: 30, deps: [149]
            }
        ]
    },
    { // Druid
        "attributes": [15, 20, 25, 20],
        "skills": [
            {
                id: 221, name: "Raven", level: 1, deps: []
            },
            {
                id: 222, name: "Poison Creeper", level: 1, deps: []
            },
            {
                id: 223, name: "Wearwolf", level: 1, deps: []
            },
            {
                id: 224, name: "Shape Shifting", level: 1, deps: [223]
            },
            {
                id: 225, name: "Firestorm", level: 1, deps: []
            },
            {
                id: 226, name: "Oak Sage", level: 6, deps: []
            },
            {
                id: 227, name: "Summon Spirit Wolf", level: 6, deps: [221]
            },
            {
                id: 228, name: "Wearbear", level: 6, deps: []
            },
            {
                id: 229, name: "Molten Boulder",  level: 6, deps: [225]
            },
            {
                id: 230, name: "Arctic Blast", level: 6, deps: []
            },
            {
                id: 231, name: "Carrion Vine", level: 12, deps: [222]
            },
            {
                id: 232, name: "Feral Rage", level: 12, deps: [223]
            },
            {
                id: 233, name: "Maul", level: 12, deps: [228]
            },
            {
                id: 234, name: "Fissure", level: 12, deps: [229]
            },
            {
                id: 235, name: "Cyclone Armor", level: 12, deps: [230]
            },
            {
                id: 236, name: "Heart of Wolverine", level: 18, deps: [226]
            },
            {
                id: 237, name: "Summon Dire Wolf", level: 18, deps: [226, 227]
            },
            {
                id: 238, name: "Rabies", level: 18, deps: [232]
            },
            {
                id: 239, name: "Fire Claws", level: 18, deps: [232, 233]
            },
            {
                id: 240, name: "Twister", level: 18, deps: [235]
            },
            {
                id: 241, name: "Solar Creeper", level: 24, deps: [231]
            },
            {
                id: 242, name: "Hunger", level: 24, deps: [239]
            },
            {
                id: 243, name: "Shock Wave", level: 24, deps: [233]
            },
            {
                id: 244, name: "Volcano", level: 24, deps: [234]
            },
            {
                id: 245, name: "Tornado", level: 24, deps: [240]
            },
            {
                id: 246, name: "Spirit of Barbs", level: 30, deps: [236]
            },
            {
                id: 247, name: "Summon Grizzly", level: 30, deps: [237]
            },
            {
                id: 248, name: "Fury", level: 30, deps: [238]
            },
            {
                id: 249, name: "Armageddon", level: 30, deps: [244, 250]
            },
            {
                id: 250, name: "Hurricane", level: 30, deps: [245]
            }
        ]
    },
    { // Assassin
        "attributes": [20, 20, 20, 25],
        "skills": [
            {
                id: 251, name: "Fire Blast", level: 1, deps: []
            },
            {
                id: 252, name: "Claw Mastery", level: 1, deps: []
            },
            {
                id: 253, name: "Psychic Hammer", level: 1, deps: []
            },
            {
                id: 254, name: "Tiger Strike", level: 1, deps: []
            },
            {
                id: 255, name: "Dragon Talon", level: 1, deps: []
            },
            {
                id: 256, name: "Shock Field", level: 6, deps: [251]
            },
            {
                id: 257, name: "Blade Sentinel", level: 6, deps: []
            },
            {
                id: 258, name: "Burst of Speed", level: 6, deps: [252]
            },
            {
                id: 259, name: "Fists of Fire",  level: 6, deps: []
            },
            {
                id: 260, name: "Dragon Claw", level: 6, deps: [255]
            },
            {
                id: 261, name: "Charged Bolt Sentry", level: 12, deps: [256]
            },
            {
                id: 262, name: "Wake of Fire", level: 12, deps: [251]
            },
            {
                id: 263, name: "Weapon Block", level: 12, deps: [252]
            },
            {
                id: 264, name: "Cloak of Shadows", level: 12, deps: [253]
            },
            {
                id: 265, name: "Cobra Strike", level: 12, deps: [254]
            },
            {
                id: 266, name: "Blade Fury", level: 18, deps: [257, 262]
            },
            {
                id: 267, name: "Fade", level: 18, deps: [258]
            },
            {
                id: 268, name: "Shadow Warrior", level: 18, deps: [263, 264]
            },
            {
                id: 269, name: "Claws of Thunder", level: 18, deps: [256]
            },
            {
                id: 270, name: "Dragon Tail", level: 18, deps: [260]
            },
            {
                id: 271, name: "Lightning Sentry", level: 24, deps: [261]
            },
            {
                id: 272, name: "Inferno Sentry", level: 24, deps: [262]
            },
            {
                id: 273, name: "Mind Blast", level: 24, deps: [264]
            },
            {
                id: 274, name: "Blades of Ice", level: 24, deps: [269]
            },
            {
                id: 275, name: "Dragon Flight", level: 24, deps: [270]
            },
            {
                id: 276, name: "Death Sentry", level: 30, deps: [271]
            },
            {
                id: 277, name: "Blade Shield", level: 30, deps: [266]
            },
            {
                id: 278, name: "Venom", level: 30, deps: [267]
            },
            {
                id: 279, name: "Shadow Master", level: 30, deps: [268]
            },
            {
                id: 280, name: "Phoenix Strike", level: 30, deps: [265, 274]
            }
        ]
    }
];
