export default class ItemUtils {
  static getSizeFor(subType, currItemId) {
    switch (subType) {
      case 'Belts':
        return { h: 1, w: 2 };
      case 'Gloves':
      case 'Boots':
      case 'Necromancer Totems':
      case 'Helms':
      case 'Druid Helms':
      case 'Barbarian Helms':
      case 'Circlets':
        return { h: 2, w: 2 };
      case 'Body Armor':
        return { h: 3, w: 2 };
      case 'Assassin Claws':
        return { h: 3, w: 1 };
      case 'Tomes':
      case 'Wands':
        return { h: 2, w: 1 };
      case 'No subtypes':
      case 'Runes':
      case 'Gems':
      case 'Potions':
      case 'Scrolls':
        return { h: 1, w: 1 };
      case 'Other':
        return currItemId.startsWith('pk') ? { h: 2, w: 1 } : { h: 1, w: 1 };
      case 'Spears':
      case 'Polearms':
        return { h: 4, w: 2 };
      default: // account for items with various grid sizes
        return ItemUtils.getSizesFor(currItemId);
    }
  }

  // Account for normal, unique, and set IDs that don't fit the above criteria
  static getSizesFor(id) {
    // Sorc orbs
    let Items2By1 = ['ob1', 'ob2', 'ob3', 'ob4', 'ob6', 'ob7', 'ob8', 'ob9',
      'obb', 'obc', 'obd', 'obe'];
    // Daggers, throwing knives
    Items2By1 = Items2By1.concat(['dgr', 'dir', 'kri', 'bld', 'tkf', 'tax', 'bkf', '9dg', '9di',
      '9tk', '9ta', '9bk', '7dg', '7di', '7tk', '7ta', '7bk', '9tk', '9ta', '9bk', '7dg']);

    // Shields and Paladin Shields
    const Items2By2 = ['buc', 'sml', 'xuc', 'xml', 'pal', 'pa2', 'pa5', 'uuc',
      'uml', 'pa6', 'pa7', 'paa', 'pab', 'pac', 'paf'];
    let Items3By2 = ['lrg', 'kit', 'tow', 'bsh', 'spk', 'xrg', 'xit', 'xow',
      'xsh', 'xpk', 'urg', 'uit', 'uow', 'ush', 'upk'];

    // Normal Swords, Axes, Scepters, Throwing weapons, staves
    let Items3By1 = ['hax', 'clb', 'scp', 'gsc', 'spc', 'mac', 'mst', 'ssd',
      'scm', 'flc', 'wsd', 'kri', 'bld', 'jav', 'pil', 'ssp', 'sst', 'leg', 'msf'];
    Items3By1 = Items3By1.concat(['9ha', '9cl', '9sc', '9qs', '9sp', '9ma', '9mt', '9ss',
      '9sm', '9sb', '9fc', '9wd', '9kr', '9bl', '9ja', '9pi', '9s9', '8ss', 'jav', 'pil',
      'ssp', '9ja', '9pi', '9s9', '7ja', '7pi', '7gl']);
    Items3By1 = Items3By1.concat(['7ha', '7cl', '7sc', '7qs', '7sp', '7ma', '7mt', '7ss',
      '7sm', '7sb', '7fc', '7wd', '7kr', '7bl', '7ja', '7pi', '7s7', '6ss']);
    Items3By2 = Items3By2.concat(['axe', '2ax', 'mpi', 'wax', 'lax', 'bax', 'btx', 'gix',
      '9ax', '92a', '9mp', '9wa', '9la', '9ba', '9bt', '9gi', '7ax', '72a',
      '7mp', '7wa', '7la', '7ba', '7bt', '7gi']);

    // Sorc orbs, Amazon javelins
    Items3By1 = Items3By1.concat(['ob5', 'am5', 'oba', 'ama', 'obf', 'amf']);

    const Items4By1 = ['glv', 'tsp', '9gl', '9ts', '7s7', '7ts'];

    if (new Set(Items2By1).has(id)) {
      return { h: 2, w: 1 };
    }

    if (new Set(Items2By2).has(id)) {
      return { h: 2, w: 2 };
    }

    if (new Set(Items3By2).has(id)) {
      return { h: 3, w: 2 };
    }

    if (new Set(Items3By1).has(id)) {
      return { h: 3, w: 1 };
    }

    if (new Set(Items4By1).has(id)) {
      return { h: 4, w: 1 };
    }

    // All other IDs are for 4x2
    return { h: 4, w: 2 };
  }

  static getImgClasses(subType, currItemId) {
    const { h, w } = ItemUtils.getSizeFor(subType, currItemId);

    return `pickedUpImg pickedUp${h}x${w}`;
  }

  static getImgPrefix(type, rarity) {
    if (type === 'Miscellaneous' || type === 'Jewelry') {
      return '';
    }

    if (rarity === 'Unique') {
      return 'u';
    }

    return rarity === 'Set' ? 's' : '';
  }

  static getGroup(type, subType, quality, rarity) {
    // Jewelry and misc items don't have quality/rarity
    if (type === 'Jewelry') {
      return type;
    } else if (type === 'Miscellaneous') {
      return subType;
    }
    return subType + quality + rarity;
  }

  static concatDataFor(allItemData, type, rarity) {
    return allItemData.quality.slice(1)
      .reduce((accum, curr) => {
        const group = type + curr + rarity;
        return accum.concat(allItemData[group] ? allItemData[group] : []);
      }, []);
  }
}
