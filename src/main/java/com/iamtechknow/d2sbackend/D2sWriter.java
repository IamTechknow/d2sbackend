package com.iamtechknow.d2sbackend;

import java.io.ByteArrayOutputStream;
import java.time.Instant;

import static com.iamtechknow.d2sbackend.D2ExtendedItem.*;
/**
 * Primary class to create a byte chunk representing a Diablo 2 1.13c Save
 */
public class D2sWriter {
    private static final int MAGIC_NUMBER = 0xaa55aa55, VERSION = 0x0060,
                        ACT1 = 0, ACT2 = 1, ACT3 = 2, ACT4 = 3, ACT5 = 4;
    private static final byte[] QUEST_HEADER = new byte[]{0x57, 0x6F, 0x6F, 0x21, 0x6, 0, 0, 0, 0x2A, 0x1},
                                WAYPOINT_HEADER = new byte[]{0x57, 0x53, 0x1, 0, 0, 0, 0x50, 0};
    private static final byte COMPLETED_BYTE_1 = (byte) 0xFD, COMPLETED_BYTE_2 = (byte) 0x9F,
                            JUST_COMPLETED_BYTE_1 = (byte) 0xFE, JUST_COMPLETED_BYTE_2 = (byte) 0xFF;

    private ByteArrayOutputStream stream;

    // Bit writing state for attributes and items
    private long bitCount;
    private long currentByte;

    public D2sWriter(ByteArrayOutputStream stream) {
        this.stream = stream;
    }

    /**
     * Write all the data needed for the save to be valid.
     */
    public void write(D2Save save) {
        if(save == null)
            throw new NullPointerException("Save cannot be null. Check that it is parsed correctly?");

        writeHeader(save);
        writeAttributes(save);
        writeSkills(save);
        writeItems(save);
        writeCorpse();

        if(save.isExpansion()) {
            writeHireling();
            writeGolem();
        }
    }

    public int size() {
        return stream.size();
    }

    /**
     * Obtain the byte array, calculate and write the checksum and file length at the beginning.
     */
    public byte[] toByteArray() {
        byte[] result = stream.toByteArray();
        int len = result.length, checksum = 0, offset = 8;

        // Write the length
        for(int i = 0; i < 4; i++)
            result[offset + i] = (byte) (len >> (8 * i) );

        // Compute the checksum and write it. The bytes need to be unsigned
        // Info on checksum is at https://evilertoaster.wordpress.com/2008/05/19/diablo-2-111-save-file/#comment-179
        for(byte b : result)
            checksum = (checksum << 1) + Byte.toUnsignedInt(b) + ( (checksum & 0x80000000) != 0 ? 1 : 0);

        offset = 12;
        for(int i = 0; i < 4; i++)
            result[offset + i] = (byte) (checksum >> (8 * i) );

        return result;
    }

    /**
     * Write the file header, or the first 765 bytes.
     */
    private void writeHeader(D2Save save) {
        writeInt(MAGIC_NUMBER);
        writeInt(VERSION);
        writeInt(0); // Leave length and checksum 0 and set them later
        writeInt(0);
        
        // Active weapon
        writeInt(0);
        
        // Character Name (padded to 16 bytes)
        for(char c : save.getName().toCharArray())
            stream.write(c);
        skip(16 - save.getName().length());

        // Character status
        byte status = 0;
        if(save.isHardcore())
            status |= 1 << 2;
        if(save.isExpansion())
            status |= 1 << 5;
        stream.write(status);

        // Character progression
        stream.write(save.getDifficulty());

        // Two unknown bytes, Character class
        skip(2);
        stream.write(save.getClassNum());

        // Unknown bytes
        stream.write(0x10);
        stream.write(0x1E);

        // Character level
        stream.write(save.getLevel());

        // Unknown bytes, timestamp
        writeInt(0);
        writeInt((int) Instant.now().getEpochSecond());

        // Unknown bytes
        writeInt(0xFFFFFFFF);

        // Hotkeyed skills for 16 keys and 4 mouse keys - 0xFFFF0000 means no skill
        for(int i = 0; i < 16; i++)
            writeInt(0x0000FFFF);
        skip(16);

        // Character appearance - for now, just set it so nothing is equipped
        for(int i = 0; i < 8; i++)
            writeInt(0xFFFFFFFF);

        // Difficulty and starting act. Three bytes, one for each difficulty.
        writeArray(getDifficulty(save));

        // Map ID. This may be safely set to 0 and the game can change it itself.
        writeInt(0);

        // Unknown bytes + Hireling Data + padding
        skip(2 + 14 + 144);

        writeQuests(save.getDifficulty(), save.getStartingAct(), save.getRewards(), save.isExpansion());

        writeWaypoints(save);

        // Unknown byte
        stream.write(1);

        // NPC introductions
        stream.write(0x77);
        stream.write(0x34);
        skip(49);
    }

    /**
     * Write information for quests. What gets written here affects waypoint data,
     * that is waypoints in a given act only appear if the character has traveled to the act.
     */
    private void writeQuests(int saveDiff, int startingAct, D2QuestRewards quest, boolean isExpansion) {
        writeArray(QUEST_HEADER);

        // Quest information for Normal, Nightmare, Hell modes.
        for(int i = 0; i < 3; i++)
            writeQuestForDiff(i * 5, saveDiff, startingAct, quest, isExpansion);
    }

    /**
     * Write the quest information for the given difficulty. All byte chunks start out as not started.
     *
     * Most acts may be described with a 16 byte chunk, the first two are for introduction, the next 12 bytes
     * are for each quest, then last two indicate the character has traveled to the next act.
     * For act 5, the first 4 bytes are just padding and then rest are for the quests.
     * For act 4, the chunk is 18 bytes long, where after the first 3 quests at byte 8, the next two bytes indicate
     * the user went to act 5. The next 6 bytes are unused quests and are always 0. The last two bytes are set to
     * one when the player has talked to Cain after killing Diablo.
     */
    private void writeQuestForDiff(int currDiff, int saveDiff, int startingAct, D2QuestRewards quest, boolean isExpansion) {
        if(currDiff > saveDiff) {
            skip(96);
            return;
        }

        if(currDiff < saveDiff) // Difficulty completed, Set Boss quests completed
            startingAct = 5;

        byte[] arr = new byte[16]; // intro + 6 quests + traveled

        if(quest.isDen())
            writeQuestCompleted(arr, 2, 3, true);
        if(quest.isImbue()) {
            arr[6] = (byte) 0xFE;
            arr[7] = (byte) 0x9F;
        }
        if(startingAct > ACT1) {
            writeQuestCompleted(arr, 8, 9, false); // Rescued Cain
            writeQuestCompleted(arr, 12, 13, false); // Killed Andy
            arr[14] = 1; // Traveled to Act 2
            arr[15] = 0;
        }

        writeArray(arr);

        // Most quests are done here because it takes the longest during rushes
        arr = new byte[16];

        if(quest.isSkillBook() && startingAct >= ACT2)
            writeQuestCompleted(arr, 2, 3, true);

        if(startingAct > ACT2) {
            arr[4] = (byte) 0x79; // Quest 2
            arr[5] = (byte) 0x1C;
            writeQuestCompleted(arr, 6, 7, false); // Quest 3
            writeQuestCompleted(arr, 8, 9, false); // Quest 4
            writeQuestCompleted(arr, 10, 11, false); // Killed Summoner
            arr[12] = (byte) 0xE5; // Killed Duriel
            arr[13] = (byte) 0x1F;
            arr[14] = 1; // Traveled to Act 3
            arr[15] = 0;
        }

        writeArray(arr);

        arr = new byte[16];

        if(quest.isLamEsen() && startingAct >= ACT3)
            writeQuestCompleted(arr, 2, 3, false);
        if(quest.isPotion() && startingAct >= ACT3)
            writeQuestCompleted(arr, 8, 9, true);

        if(startingAct > ACT3) {
            writeQuestCompleted(arr, 4, 5, false); // Smashed the orb
            writeQuestCompleted(arr, 10, 11, false); // Killed Council, which must be done before Meph
            writeQuestCompleted(arr, 12, 13, false); // Killed Meph
            arr[14] = 1; // Traveled to Act 4
            arr[15] = 0;
        }

        writeArray(arr);

        arr = new byte[18];

        if(quest.isIzual() && startingAct >= ACT4)
            writeQuestCompleted(arr, 2, 3, true);

        if(startingAct > ACT4) {
            writeQuestCompleted(arr, 4, 5, false); // Killed Diablo
            if(isExpansion) {
                arr[8] = 1; // Traveled to Act 5
                arr[9] = 0;
                arr[16] = 1; // Talk to Cain after killing Diablo
                arr[17] = 0;
            }
        }

        writeArray(arr);

        arr = new byte[16];

        if(isExpansion && quest.isSocket() && startingAct >= ACT5)
            writeQuestCompleted(arr, 4, 5, true);
        if(isExpansion && quest.isScroll() && startingAct >= ACT5) // FIXME: Scroll is read but quest does not say complete after taking to Malah
            writeQuestCompleted(arr, 8, 9, true);
        if(isExpansion && didFinishAncientsForDiff(currDiff, quest) && startingAct >= ACT5)
            writeQuestCompleted(arr, 12, 13, false);
        if(isExpansion && startingAct > ACT5)
            writeQuestCompleted(arr, 14, 15, false); // Killed Baal. Since one can get credit in town, Ancients need not be done

        writeArray(arr);

        skip(14); // Quest Padding
    }

    /**
     * Writes the waypoint data for the save. If the character has finished a difficulty,
     * all town waypoints are unlocked for that difficulty.
     */
    private void writeWaypoints(D2Save save) {
        writeArray(WAYPOINT_HEADER);

        // Data for each difficulty - 2 unknown bytes, 5 byte bit vector for all WPs, then padding
        for(int i = 0; i < 3; i++) {
            byte[] currData = getWaypointForDiffAndAct(i * 5, save.getDifficulty(), save.getStartingAct());

            stream.write(2);
            stream.write(1);
            writeArray(currData);
            skip(17);
        }
    }

    /**
     * Write the attributes of the character. This section has variable length
     */
    private void writeAttributes(D2Save save) {
        stream.write(0x67); // "gf"
        stream.write(0x66);

        D2CharacterAttributes attrs = new D2CharacterAttributes(save);
        int[] lengths_map = new int[]{10, 10, 10, 10, 10, 8, 21, 21, 21, 21, 21, 21, 7, 32, 25, 25};
        int[] ids = getIds(attrs);
        long[] values = getValues(attrs, ids.length);

        writeVariableData(ids, values, lengths_map, new int[16], 16);

        // Flush the rest of the bits, padded with 0 (already reversed)
        stream.write((int) currentByte);
    }

    // Write the amount of skill points allocated for each skill
    private void writeSkills(D2Save save) {
        stream.write(0x69); // "if"
        stream.write(0x66);
        for(int i : save.getSkills())
            stream.write(i);
    }

    // Gather all D2Item objects and write them
    private void writeItems(D2Save save) {
        stream.write(0x4A);
        stream.write(0x4D);
        
        int numItems = 0;
        if(save.isRejuv()) {
            numItems += 4;
        }
        stream.write(numItems);
        stream.write(numItems >> 8);
        
        D2Item.Builder builder;
        D2Item[] items = new D2Item[numItems];
        int idx = 0;
        
        // Create four full rejuvs, each that differ only in X position
        if(save.isRejuv()) {
            builder = new D2Item.Builder("rvl");
            builder.setSimple(true);
            
            for(int i = idx; i < idx + 4; i++) { // belts have no rows
                builder.setItemLocation(D2Item.BELT).setX(i - idx);
                items[idx + i] = builder.build();
            }
            idx += 4;
        }
        
        // Write the simple and extended item data
        for(D2Item item : items) {
            stream.write(0x4A);
            stream.write(0x4D);

            // Write the next 16 bits (16 - 32): Item is IDed (bit 4), socketed (bit 11)
            short vec1 = 0;
            vec1 |= boolToInt(item.isIdentified()) << 4;
            vec1 |= boolToInt(item.isSocketed()) << 11;
            writeBits(vec1, 16);

            // Player ear to unknown 15 bits: Item is simple (bit 5), ethereal (bit 6), personalized (bit 8), RW (bit 10)
            int vec2 = 0;
            vec2 |= boolToInt(item.isSimple()) << 5;
            vec2 |= boolToInt(item.isEthereal()) << 6;
            vec2 |= 1 << 7; // always set to 1
            vec2 |= boolToInt(item.isPersonalized()) << 8;
            vec2 |= boolToInt(item.isHasRW()) << 10;
            writeBits(vec2, 26);

            // item location, equipped position, coordinates, item store (bits 58 - 76)
            vec2 = 0;
            vec2 |= item.getItemLocation();
            vec2 |= item.getEquippedLoc() << 3;
            vec2 |= item.getX() << 7;
            vec2 |= item.getY() << 11;
            vec2 |= item.getItemStore() << 15;
            writeBits(vec2, 18);

            // Write item type. Not byte aligned, so don't use stream directly
            vec2 = 0;
            for(int i = 0; i < item.getItemType().length(); i++)
                vec2 |= item.getItemType().charAt(i) << (i * 8);
            writeBits(vec2, 32);

            // Number of socketed items, then write extended info if applicable, finally flush bits.
            writeBits(item.getNumSocketed(), 3);

            if(!item.isSimple()) {
                D2ExtendedItem xItem = item.getExtendedData();

                // Unique ID, iLvl, quality
                writeBits(xItem.getIdentifier(), 32);
                writeBits(xItem.getiLvl(), 7);
                writeBits(xItem.getQuality(), 4);

                // Image type for jewelery, jewels, charms
                writeBits(boolToInt(xItem.isGenericMagicItem()), 1);
                if(xItem.isGenericMagicItem()) {
                    writeBits(xItem.getImgType(), 3);
                }

                // Expansion items
                writeBits(boolToInt(xItem.isExpansionItem()), 1);
                if(xItem.isExpansionItem()) {
                    writeBits(xItem.getExpansionMagicProperty(), 11);
                }

                // Low quality
                writeBits(boolToInt(xItem.isLowQuality()), 1);
                if(xItem.isLowQuality()) {
                    writeBits(xItem.getQualityData(), 11);
                }

                // Handle non-white items
                switch(xItem.getQuality()) {
                    case SET:
                        writeBits(xItem.getSetId(), 12);
                        break;
                    case UNIQUE:
                        writeBits(xItem.getUniqueId(), 12);
                        break;
                    case RARE:
                    case CRAFTED:
                        writeBits(xItem.getFirstWordId(), 8);
                        writeBits(xItem.getSecondWordId(), 8);

                        // Depending on the size of the prefix and suffix IDs,
                        // write a 1 or 0 then the id
                        for(int i = 0; i < 3; i++) {
                            boolean hasIthPrefix = i < xItem.getPrefixIds().length,
                                    hasIthSuffix = i < xItem.getSuffixIds().length;

                            writeBits(boolToInt(hasIthPrefix), 1);
                            if(hasIthPrefix)
                                writeBits(xItem.getPrefixIds()[i], 11);

                            writeBits(boolToInt(hasIthSuffix), 1);
                            if(hasIthSuffix)
                                writeBits(xItem.getSuffixIds()[i], 11);
                        }
                        break;
                    default: // Magical
                        writeBits(xItem.getPrefixId(), 11);
                        writeBits(xItem.getSuffixId(), 11);
                }

                if(item.isHasRW()) // 12 bit ID and 5 in 4-bit vector
                    writeBits( (xItem.getRwId() << 4) | 5, 16);

                // Write the item's owner then add a zero
                if(item.isPersonalized()) {
                    for(char c : xItem.getOwner().toCharArray())
                        writeBits(c, 7);
                    writeBits(0, 7);
                }

                writeBits(boolToInt(xItem.isIdTome()), 1);

                // Item specific data
                D2ItemData itemData = xItem.getData();

                if(D2ItemTypes.isArmor(item.getItemType()) || D2ItemTypes.isShield(item.getItemType()))
                    writeBits(itemData.getDefense(), 10);

                // Account for indestructibility by checking for 0 max durability
                if(D2ItemTypes.isNonMisc(item.getItemType())) {
                    writeBits(itemData.getMaxDur(), 8);
                    if(itemData.getMaxDur() > 0)
                        writeBits(itemData.getCurDur(), 8);
                }

                if(item.isSocketed())
                    writeBits(itemData.getSockets(), 4);

                if(D2ItemTypes.isTome(item.getItemType()))
                    writeBits(0, 5);

                if(D2ItemTypes.hasQuantity(item.getItemType()))
                    writeBits(itemData.getQuantity(), 9);

                if(xItem.getQuality() == SET)
                    writeBits(itemData.getPropertyLists(), 5);

                // Write the variable length fields for the item's magical properties
                // TODO: handle magical properties with more than 2 property values

                // Runeword properties start with 0x1FF
                if(item.isHasRW())
                    writeBits(reverseBits(0x01FF, 9), 9);

                if(xItem.getQuality() >= MAGICAL || item.isHasRW()) {
                    int[] ids = itemData.getPropertyIds();
                    long[] values = itemData.getPropertyValues();
                    writeVariableData(ids, values, D2MagicProperties.getLengthMap(), D2MagicProperties.getBiasMap(), 254);
                }

                // TODO: Handle set items which have multiple lists
                if(xItem.getQuality() == SET) {

                }
            }

            stream.write((int) currentByte);

            // TODO: Write the item structures for socketed items
            if(item.getNumSocketed() >= 0) {

            }
        }
    }

    // save as first item header, number indicate how many items in corpse which shall be 0
    private void writeCorpse() {
        stream.write(0x4A); 
        stream.write(0x4D);
        skip(2);
    }

    // just write "jf", no items to store because no hireling
    private void writeHireling() {
        stream.write(0x6A); 
        stream.write(0x66);
    }

    // just write "kf", and 0 indicating no golem
    private void writeGolem() {
        stream.write(0x6B); 
        stream.write(0x66);
        stream.write(0);
    }

    /**
     * Helper method to write four bytes to the stream, in little endian order.
     * @param i the integer to write
     */
    private void writeInt(int i) {
        stream.write(i);
        stream.write(i >> 8);
        stream.write(i >> 16);
        stream.write(i >> 24);
    }

    private void writeArray(byte[] arr) {
        for(byte b : arr)
            stream.write(b);
    }

    /**
     * Write 0 for the next len bytes, effectively skipping through them.
     */
    private void skip(int len) {
        for(int i = 0; i < len; i++)
            stream.write(0);
    }

    /**
     * Get the correct bit index based on difficulty, set the 8th bit and OR the starting act
     */
    private byte[] getDifficulty(D2Save save) {
        byte[] arr = new byte[3];
        int diff = save.getDifficulty(), idx = 2;

        if(diff >= 0 && diff < 5)
            idx = 0;
        else if(diff >= 5 && diff < 10)
            idx = 1;
        arr[idx] = (byte) (-128 | save.getStartingAct()); // 0x80 means active difficulty

        return arr;
    }

    /**
     * Given two indices, write bits to indicate the quest has just been finished.
     */
    private void writeQuestCompleted(byte[] arr, int first, int sec, boolean just) {
        arr[first] = just ? JUST_COMPLETED_BYTE_1 : COMPLETED_BYTE_1;
        arr[sec] = just ? JUST_COMPLETED_BYTE_2 : COMPLETED_BYTE_2;
    }

    /**
     * Return whether Ancients quest was completed for the given difficulty.
     */
    private boolean didFinishAncientsForDiff(int currDiff, D2QuestRewards quest) {
        switch(currDiff) {
            case 0:
                return quest.isnAncients();
            case 5:
                return quest.isNmAncients();
            default:
                return quest.ishAncients();
        }
    }

    /**
     * Forms the byte array representing unlocked waypoints based on the completed difficulty and starting act.
     * The bit fields are in LSB, so the 0th bit is Act 1 Town, and the 9th bit is Act 2 Town.
     * @return Waypoint data for the specified difficulty
     */
    private byte[] getWaypointForDiffAndAct(int currDiff, int saveDiff, int startingAct) {
        byte[] currData = new byte[]{0x1, 0, 0, 0, 0}, finishedData = new byte[]{0x01, 0x02, 0x04, 0x48, 0x00};

        if(currDiff < saveDiff) // Finished difficulty
            return finishedData;

        if(currDiff <= saveDiff) // Current difficulty, if not there yet, only Act 1 town waypoint active
            switch(startingAct) {
                case 4:
                    currData[3] |= 0x08;
                case 3:
                    currData[3] |= 0x40;
                case 2:
                    currData[2] |= 0x04;
                case 1:
                    currData[1] |= 0x02;
            }

        return currData;
    }

    /**
     * Determine the character attribute IDs based on the save model.
     * @return int array containing IDs to be written to save file
     */
    private int[] getIds(D2CharacterAttributes attrs) {
        ByteArrayOutputStream arr = new ByteArrayOutputStream();
        for(int i : new int[] {0, 1, 2, 3})
            arr.write(i);

        if(attrs.getAttrPoints() != 0)
            arr.write(4);
        if(attrs.getSkillPoints() != 0)
            arr.write(5);

        for(int i : new int[] {6, 7, 8, 9, 10, 11, 12})
            arr.write(i);

        if(attrs.getLevel() != 1)
            arr.write(13);
        if(attrs.getGold() != 0)
            arr.write(14);
        if(attrs.getStashGold() != 0)
            arr.write(15);

        byte[] temp = arr.toByteArray();
        int[] result = new int[temp.length];
        for(int i = 0; i < temp.length; i++)
            result[i] = temp[i];

        return result;
    }

    /**
     * Determine the values to be written based on the character's attributes.
     * @return array containing 10-32 bit vectors to be written to save file
     */
    private long[] getValues(D2CharacterAttributes attrs, int size) {
        if(size > 16)
            throw new IllegalArgumentException("Invalid attribute size, max is 16");

        long[] arr = new long[size];
        arr[0] = attrs.getStr(); arr[1] = attrs.getNrg(); arr[2] = attrs.getDex(); arr[3] = attrs.getVit();

        // At this point data may be missing so manage index.
        int idx = 4;
        if(attrs.getAttrPoints() != 0)
            arr[idx++] = attrs.getAttrPoints();
        if(attrs.getSkillPoints() != 0)
            arr[idx++] = attrs.getSkillPoints();

        arr[idx++] = attrs.getLife(); arr[idx++] = attrs.getLife();
        arr[idx++] = attrs.getMana(); arr[idx++] = attrs.getMana();
        arr[idx++] = attrs.getStamina(); arr[idx++] = attrs.getStamina();
        arr[idx++] = attrs.getLevel();

        if(attrs.getLevel() != 1)
            arr[idx++] = attrs.getExperience();
        if(attrs.getGold() != 0)
            arr[idx++] = attrs.getGold();
        if(attrs.getStashGold() != 0)
            arr[idx] = attrs.getStashGold();

        return arr;
    }

    private void writeVariableData(int[] ids, long[] values, int[] lengths_map, int[] bias, int maxId) {
        for(int i = 0; i < ids.length; i++) {
            if(ids[i] < 0 || ids[i] > maxId)
                throw new IllegalArgumentException("Variable ID " + ids[i] + " does not exist");

            // Put ID into integer, reverse the last 9 bits, write the 9 bits in reverse order.
            // Repeat for the value itself
            long id = ids[i], val = values[i] + bias[ids[i]];
            id = reverseBits(id, 9);
            writeBits(id, 9);

            val = reverseBits(val, lengths_map[ids[i]]);
            writeBits(val, lengths_map[ids[i]]);
        }

        // Write 0x01FF id, end of attributes
        writeBits(reverseBits(0x01FF, 9), 9);
    }

    // Converts a boolean to its C equivalent
    private int boolToInt(boolean b) {
        return b ? 1 : 0;
    }

    // Takes an int in the range of [0, 255]
    private int reverseByte(int b) {
        int r = 0;
        for (int i = 0; i < 8; i++) {
            r <<= 1;
            r |= b & 1;
            b >>= 1;
        }
        return r;
    }

    private long reverseBits(long vec, int num) {
        if(num > 64)
            throw new IllegalArgumentException("Cannot reverse more than 64 bits");

        long r = 0;
        for (int i = 0; i < num; i++) {
            r <<= 1;
            r |= vec & 1;
            vec >>= 1;
        }
        return r;
    }

    private void writeBits(long vec, int num) {
        if(num > 64)
            throw new IllegalArgumentException("Cannot write more than 64 bits");

        while (num > 0) {
            long cbit = Math.min (num, (8 - bitCount));

            currentByte = (currentByte << cbit) | ((vec >>> (num - cbit)) & ((1 << cbit) - 1));

            bitCount += cbit;
            num -= cbit;

            // Write the byte in reverse
            if(bitCount == 8) {
                int data = (int) currentByte;
                stream.write(reverseByte(data));
                currentByte = 0;
                bitCount = 0;
            }
        }
    }
}
