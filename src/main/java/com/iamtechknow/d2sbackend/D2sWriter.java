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

    public D2sWriter(ByteArrayOutputStream stream) {
        this.stream = stream;
    }

	/**
	 * Write all the data needed for the save to be valid.
	 */
    public void write(D2Save save) {
        writeHeader(save);
        writeAttributes(save);
        writeSkills(save);
        writeItems(save);
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
        int len = 0, checksum = 0;

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

        // Waypoints
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
        // These bytes are always the same
        writeArray(QUEST_HEADER);

        // Quest information for Normal, Nightmare, Hell modes.
        skip(96*3);
    }

    private void writeWaypoints() {
        writeArray(WAYPOINT_HEADER);

        // Default data, act 1 town. Note the data is LSB first.
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

        // statistic availability bit vector
        // start with values that will always be there
        short vec = 0b0001111111001111;
        int stats = 5 * (save.getLevel() - 1);
        int skillPoints = (save.getLevel() - 1);

        // Determine if character should have stat, skill, experience points, gold, and/or stash gold
        if(stats != 0)
            vec |= 1 << 4;
        if(skillPoints != 0)
            vec |= 1 << 5;
        if(save.getLevel() != 0)
            vec |= 1 << 13;
        if(save.getGold() != 0)
            vec |= 1 << 14;
        if(save.getStashGold() != 0)
            vec |= 1 << 15;

        stream.write(vec);
        stream.write(vec >> 8);

        D2CharacterAttributes attrs = new D2CharacterAttributes(save);

    }

    private void writeSkills(D2Save save) {

    }

    private void writeItems(D2Save save) {

    }

    private void writeCorpse() {

    }

    private void writeHireling() {

    }

    private void writeGolem() {

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
}
