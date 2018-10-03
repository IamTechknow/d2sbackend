package com.iamtechknow.d2sbackend;

import java.io.ByteArrayOutputStream;

import static com.iamtechknow.d2sbackend.D2ExtendedItem.*;

// Helper class that assists the main Writer in writing items to the byte stream.
public class D2sItemWriter {
    private ByteArrayOutputStream writerStream;
    private BitWriter bitWriter;

    public D2sItemWriter(ByteArrayOutputStream stream, BitWriter writer) {
        writerStream = stream;
        bitWriter = writer;
    }

    // Write the simple and if it exists, the extended item data
    // If an item has socketed items it will recursively write them
    public void writeItem(D2Item item) {
        writerStream.write(0x4A);
        writerStream.write(0x4D);

        // Write the next 16 bits (16 - 32): Item is IDed (bit 4), socketed (bit 11)
        short vec1 = 0;
        vec1 |= boolToInt(item.isIdentified()) << 4;
        vec1 |= boolToInt(item.isSocketed()) << 11;
        bitWriter.writeBits(vec1, 16);

        // Player ear to unknown 15 bits: Item is simple (bit 5), ethereal (bit 6), personalized (bit 8), RW (bit 10)
        int vec2 = 0;
        vec2 |= boolToInt(item.isSimple()) << 5;
        vec2 |= boolToInt(item.isEthereal()) << 6;
        vec2 |= 1 << 7; // always set to 1
        vec2 |= boolToInt(item.isPersonalized()) << 8;
        vec2 |= boolToInt(item.isHasRW()) << 10;
        bitWriter.writeBits(vec2, 26);

        // item location, equipped position, coordinates, item store (bits 58 - 76)
        vec2 = 0;
        vec2 |= item.getItemLocation();
        vec2 |= item.getEquippedLoc() << 3;
        vec2 |= item.getX() << 7;
        vec2 |= item.getY() << 11;
        vec2 |= item.getItemStore() << 15;
        bitWriter.writeBits(vec2, 18);

        // Write item type. Not byte aligned, so don't use stream directly
        vec2 = 0;
        for(int i = 0; i < item.getItemType().length(); i++)
            vec2 |= item.getItemType().charAt(i) << (i * 8);
        bitWriter.writeBits(vec2, 32);

        // Number of socketed items, then write extended info if applicable, finally flush bits.
        bitWriter.writeBits(item.getNumSocketed(), 3);

        if(!item.isSimple()) {
            D2ExtendedItem xItem = item.getExtendedData();

            // Unique ID, iLvl, quality
            bitWriter.writeBits(xItem.getIdentifier(), 32);
            bitWriter.writeBits(xItem.getiLvl(), 7);
            bitWriter.writeBits(xItem.getQuality(), 4);

            // Image type for jewelery, jewels, charms
            bitWriter.writeBits(boolToInt(xItem.isGenericMagicItem()), 1);
            if(xItem.isGenericMagicItem()) {
                bitWriter.writeBits(xItem.getImgType(), 3);
            }

            // Expansion items
            bitWriter.writeBits(boolToInt(xItem.isExpansionItem()), 1);
            if(xItem.isExpansionItem()) {
                bitWriter.writeBits(xItem.getExpansionMagicProperty(), 11);
            }

            // Low quality
            bitWriter.writeBits(boolToInt(xItem.isLowQuality()), 1);
            if(xItem.isLowQuality()) {
                bitWriter.writeBits(xItem.getQualityData(), 11);
            }

            // Handle non-white items
            switch(xItem.getQuality()) {
                case SET:
                    bitWriter.writeBits(xItem.getSetId(), 12);
                    break;
                case UNIQUE:
                    bitWriter.writeBits(xItem.getUniqueId(), 12);
                    break;
                case RARE:
                case CRAFTED:
                    bitWriter.writeBits(xItem.getFirstWordId(), 8);
                    bitWriter.writeBits(xItem.getSecondWordId(), 8);

                    // Depending on the size of the prefix and suffix IDs,
                    // write a 1 or 0 then the id
                    for(int i = 0; i < 3; i++) {
                        boolean hasIthPrefix = i < xItem.getPrefixIds().length,
                                hasIthSuffix = i < xItem.getSuffixIds().length;

                        bitWriter.writeBits(boolToInt(hasIthPrefix), 1);
                        if(hasIthPrefix)
                            bitWriter.writeBits(xItem.getPrefixIds()[i], 11);

                        bitWriter.writeBits(boolToInt(hasIthSuffix), 1);
                        if(hasIthSuffix)
                            bitWriter.writeBits(xItem.getSuffixIds()[i], 11);
                    }
                    break;
                default: // Magical
                    bitWriter.writeBits(xItem.getPrefixId(), 11);
                    bitWriter.writeBits(xItem.getSuffixId(), 11);
            }

            if(item.isHasRW()) // 12 bit ID and 5 in 4-bit vector
                bitWriter.writeBits( (xItem.getRwId() << 4) | 5, 16);

            // Write the item's owner then add a zero
            if(item.isPersonalized()) {
                for(char c : xItem.getOwner().toCharArray())
                    bitWriter.writeBits(c, 7);
                bitWriter.writeBits(0, 7);
            }

            bitWriter.writeBits(boolToInt(xItem.isIdTome()), 1);

            // Item specific data
            D2ItemData itemData = xItem.getData();

            if(D2ItemTypes.isArmor(item.getItemType()) || D2ItemTypes.isShield(item.getItemType()))
                bitWriter.writeBits(itemData.getDefense(), 10);

            // Account for indestructibility by checking for 0 max durability
            if(D2ItemTypes.isNonMisc(item.getItemType())) {
                bitWriter.writeBits(itemData.getMaxDur(), 8);
                if(itemData.getMaxDur() > 0)
                    bitWriter.writeBits(itemData.getCurDur(), 8);
            }

            if(item.isSocketed())
                bitWriter.writeBits(itemData.getSockets(), 4);

            if(D2ItemTypes.isTome(item.getItemType()))
                bitWriter.writeBits(0, 5);

            if(D2ItemTypes.hasQuantity(item.getItemType()))
                bitWriter.writeBits(itemData.getQuantity(), 9);

            // Fill a bit vector that represents how many lists of properties
            // exist for this item (bonuses for 2 or more set items equipped)
            if(xItem.getQuality() == SET) {
                int[] listMap = {0, 1, 3, 7, 15, 31};
                bitWriter.writeBits(listMap[itemData.getPropertyLists()], 5);
            }

            // Write the variable length fields for the item's magical properties
            // TODO: handle magical properties with more than 2 property values

            // Runeword properties start with 0x1FF
            if(item.isHasRW())
                bitWriter.writeBits(bitWriter.reverseBits(0x01FF, 9), 9);

            if(xItem.getQuality() >= MAGICAL || item.isHasRW()) {
                int[] ids = itemData.getPropertyIds();
                long[] values = itemData.getPropertyValues();
                writeVariableData(ids, values, D2MagicProperties.getLengthMap(), D2MagicProperties.getBiasMap(), 254);
            }

            // Write the partial set properties inherent to this item, each in their own list
            // (No set item has 2 properties for wearing another item, even if possible)
            if(xItem.getQuality() == SET) {
                int[] ids = itemData.getSetBonusIds();
                long[] vals = itemData.getSetBonusValues();
                for(int i = 0; i < itemData.getPropertyLists(); i++)
                    writeVariableData(new int[]{ids[i]}, new long[]{vals[i]}, D2MagicProperties.getLengthMap(), D2MagicProperties.getBiasMap(), 254);
            }
        }

        writerStream.write((int) bitWriter.flush());

        // Socketed items immediately follow their parent item
        if(item.getNumSocketed() >= 0)
            for(D2Item socket : item.getSocketedItems())
                writeItem(socket);
    }

    // Converts a boolean to its C equivalent
    private int boolToInt(boolean b) {
        return b ? 1 : 0;
    }

    private void writeVariableData(int[] ids, long[] values, int[] lengths_map, int[] bias, int maxId) {
        for(int i = 0; i < ids.length; i++) {
            if(ids[i] < 0 || ids[i] > maxId)
                throw new IllegalArgumentException("Variable ID " + ids[i] + " does not exist");

            // Put ID into integer, reverse the last 9 bits, write the 9 bits in reverse order.
            // Repeat for the value itself
            long id = ids[i], val = values[i] + bias[ids[i]];
            id = bitWriter.reverseBits(id, 9);
            bitWriter.writeBits(id, 9);

            val = bitWriter.reverseBits(val, lengths_map[ids[i]]);
            bitWriter.writeBits(val, lengths_map[ids[i]]);
        }

        // Write 0x01FF id, end of attributes
        bitWriter.writeBits(bitWriter.reverseBits(0x01FF, 9), 9);
    }
}
