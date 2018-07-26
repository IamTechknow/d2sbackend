package com.iamtechknow.d2sbackend;

import java.io.ByteArrayOutputStream;

/**
 * Primary class to create a byte chunk representing a Diablo 2 Save
 */
public class D2sWriter {
    private static final int MAGIC_NUMBER = Integer.reverse(0xaa55aa55);

    private ByteArrayOutputStream stream;

    public D2sWriter(ByteArrayOutputStream stream) {
        this.stream = stream;
    }

    public void write(D2Save save) {
        writeHeader(save);
        writeAttributes(save);
        writeSkills();
        writeItems();
        writeCorpse();
    }

    public int size() {
        return stream.size();
    }

    public byte[] toByteArray() {
        return stream.toByteArray();
    }

    private void writeHeader(D2Save save) {
        writeQuests();
    }

    private void writeQuests() {

    }

    private void writeAttributes(D2Save save) {

    }

    private void writeSkills() {

    }

    private void writeItems() {

    }

    private void writeCorpse() {

    }
}
