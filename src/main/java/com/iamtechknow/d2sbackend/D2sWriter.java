package com.iamtechknow.d2sbackend;

import java.io.ByteArrayOutputStream;
import java.time.Instant;

/**
 * Primary class to create a byte chunk representing a Diablo 2 Save
 */
public class D2sWriter {
    private static final int MAGIC_NUMBER = Integer.reverseBytes(0xaa55aa55), VERSION = Integer.reverseBytes(0x0060);
    private static final byte[] QUEST_HEADER = new byte[]{0x57, 0x6F, 0x6F, 0x21, 0x6, 0, 0, 0, 0x2A, 0x1},
                                WAYPOINT_HEADER = new byte[]{0x57, 0x53, 0x1, 0, 0, 0, 0x50, 0};

    private ByteArrayOutputStream stream;

    // Bit writing state for attributes
    private long bitCount;
    private long currentByte;

    public D2sWriter(ByteArrayOutputStream stream) {
        this.stream = stream;
    }

	/**
	 * Write all the data needed for the save to be valid.
	 */
    public void write(D2Save save) {
        writeHeader(save);
        writeAttributes(save);
        writeSkills();
        writeItems();
        writeCorpse();
        writeHireling();
        writeGolem();
    }

    public int size() {
        return stream.size();
    }

	/**
	 * Obtain the byte array, calculate and write the checksum and file length at the beginning.
	 */
    public byte[] toByteArray() {
        byte[] result = stream.toByteArray();
        int len = Integer.reverseBytes(result.length), checksum = 0, offset = 8;

        // Write the length
        for(int i = 0; i < 4; i++)
            result[offset + i] = (byte) (len >> (8 * (3 - i)) );

        // Compute the checksum and write it
        for(byte b : result)
            checksum = (checksum << 1) + b;

        offset = 12;
        checksum = Integer.reverseBytes(checksum);
        for(int i = 0; i < 4; i++)
            result[offset + i] = (byte) (checksum >> (8 * (3 - i)) );

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
        writeInt(Integer.reverseBytes((int) Instant.now().getEpochSecond()));

        // Unknown bytes
        writeInt(0xFFFFFFFF);

        // Hotkeyed skills for 16 keys and 4 mouse keys - 0xFFFF0000 means no skill
        for(int i = 0; i < 16; i++)
            writeInt(0xFFFF0000);
        skip(16);

        // Character appearance - for now, just set it so nothing is equipped
        for(int i = 0; i < 8; i++)
            writeInt(0xFFFFFFFF);

        // Difficulty and starting act. Three bytes, one for each difficulty.
        writeArray(getDifficulty(save));

        // Map ID. This may be safely set to 0 and the game can change it itself.
        writeInt(0);

        // Unknown bytes
        skip(2);

        // Hireling Data - not supported yet, so all bytes set to 0
        skip(14);

        // Unknown bytes, seems to be padding
        skip(144);

        writeQuests();

        writeWaypoints();

        // Unknown byte
        stream.write(1);

        // NPC introductions
        stream.write(0x77);
        stream.write(0x34);
        skip(49);
    }

    /**
     * Write information for quests. For now, no quests have been finished nor started.
     */
    private void writeQuests() {
        writeArray(QUEST_HEADER);

        // Quest information for Normal, Nightmare, Hell modes.
        skip(96*3);
    }

    private void writeWaypoints() {
        writeArray(WAYPOINT_HEADER);

        // Default data: act 1 town. Note the data is LSB first.
        byte[][] data = new byte[][]{{0x1, 0, 0, 0, 0}, {0x1, 0, 0, 0, 0}, {0x1, 0, 0, 0, 0}};

        // Data for each difficulty - 2 unknown bytes, 5 byte bit vector for all WPs, then padding
        for(int i = 0; i < 3; i++) {
            stream.write(2);
            stream.write(1);
            writeArray(data[i]);
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

        byte[] ids = getIds(attrs);
        int[] values = getValues(attrs, ids.length);

        // Put ID into integer, reverse the last 9 bits, write the 9 bits in reverse order.
        // Repeat for the value itself
        for(int i = 0; i < ids.length; i++) {
            long id = ids[i], val = values[i];
            id = reverseBits(id, 9);
            writeBits(id, 9);

            val = reverseBits(val, lengths_map[ids[i]]);
            writeBits(val, lengths_map[ids[i]]);
        }

        stream.write(0xFF); // 0x01FF, end of attributes
        stream.write(0x01);
    }

    // No skill points allocated
    private void writeSkills() {
        stream.write(0x69); // "if"
        stream.write(0x66);
        skip(30);
    }

	// start with JM header then insert 0 items
    private void writeItems() {
		stream.write(0x4A); 
        stream.write(0x4D);
        skip(2);
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
     * Helper method to write four bytes to the stream
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
     * Get the correct bit index based on difficulty and set the 8th bit
     */
	private byte[] getDifficulty(D2Save save) {
	    byte[] arr = new byte[3];
	    int diff = save.getDifficulty(), idx = 2;

	    if(diff >= 0 && diff < 5)
	        idx = 0;
	    else if(diff >= 5 && diff < 10)
	        idx = 1;
	    arr[idx] = -128; // Active difficulty, act 1

        return arr;
    }

    private byte[] getIds(D2CharacterAttributes attrs) {
	    ByteArrayOutputStream arr = new ByteArrayOutputStream();
	    for(int i : new int[] {0, 1, 2, 3})
	        arr.write(i);

	    if(attrs.getAttrPoints() != 0)
	        arr.write(4);
	    if(attrs.getSkillPoints() != 0)
	        arr.write(5);

        for(int i : new int[] {6, 7, 8, 9, 10, 11, 12})
            arr.write(i);

        if(attrs.getGold() != 0)
            arr.write(14);
        if(attrs.getStashGold() != 0)
            arr.write(15);

        return arr.toByteArray();
    }

    private int[] getValues(D2CharacterAttributes attrs, int size) {
	    if(size > 16)
	        throw new IllegalArgumentException("Invalid attribute size, max is 16");

	    int[] arr = new int[size];
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

        if(attrs.getGold() != 0)
            arr[idx++] = attrs.getGold();
        if(attrs.getStashGold() != 0)
            arr[idx] = attrs.getStashGold();

	    return arr;
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

    // TODO: Ensure that the casting does not truncate data. Unsigned bytes should be able to be written
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
