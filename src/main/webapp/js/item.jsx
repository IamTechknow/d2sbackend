import ItemData from './item-data';
import ItemUtils from './itemUtils';

// POJO (Plain old JavaScript object) to standardize item properties
export default class Item {
  constructor(id, type, subType, rarity, quality, r, c, h, w) {
    // Identifying info (required)
    this.itemId = id;
    this.type = type;
    this.subType = subType;
    this.rarity = rarity;
    this.quality = quality;
    this.classification = ItemUtils.getClassificationFor(type, subType);

    // Item location (optional)
    this.r = r;
    this.c = c;
    this.height = h;
    this.width = w;

    // Search item data for corresponding item object then set item stats
    const group = ItemUtils.getGroup(type, subType, quality, rarity);
    const itemArray = quality === 'All' && type !== 'Miscellaneous' && type !== 'Jewelry'
      ? ItemUtils.concatDataFor(ItemData, subType, rarity) : ItemData[group];

    itemArray.forEach((itemObj) => {
      if (itemObj.id === id) {
        this.name = itemObj.name;
        this.minValue = itemObj.min;
        this.maxValue = itemObj.max;
        this.durability = itemObj.dur;
      }
    });
    this.currValue = this.maxValue;

    // TODO: Setters to allow item editing, getters for derived info like image prefix + classes
  }

  toString() {
    const lines = [this.name];

    if (this.classification === 'armor') {
      lines.push(`Defense: ${this.currValue}`, `Durability: ${this.durability}`);
    } else if (this.classification === 'weapon') {
      lines.push(`Damage: ${this.minValue} to ${this.maxValue}`, `Durability: ${this.durability}`);
    }

    return lines.join('\n');
  }
}
