package com.iamtechknow.d2sbackend;

import java.io.ByteArrayOutputStream;

// Utility to write up to 64 bits to a byte stream.
public class BitWriter {
    // Bit writing state for attributes and items
    private long bitCount;

    // Intermediate bit state, resets after 8 bits have been written to
    private long currentByte;

    private ByteArrayOutputStream stream;

    public BitWriter(ByteArrayOutputStream stream) {
        this.stream = stream;
    }

    // Takes an int in the range of [0, 255]
    public int reverseByte(int b) {
        int r = 0;
        for (int i = 0; i < 8; i++) {
            r <<= 1;
            r |= b & 1;
            b >>= 1;
        }
        return r;
    }

    public long reverseBits(long vec, int num) {
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

    public void writeBits(long vec, int num, boolean reverse) {
        if(num > 64)
            throw new IllegalArgumentException("Cannot write more than 64 bits");

        while (num > 0) {
            long cbit = Math.min(num, (8 - bitCount));

            currentByte = (currentByte << cbit) | ((vec >>> (num - cbit)) & ((1 << cbit) - 1));

            bitCount += cbit;
            num -= cbit;

            // Write the byte in reverse
            if(bitCount == 8) {
                int data = (int) currentByte;
                if(reverse)
                    data = reverseByte(data);
                stream.write(data);
                currentByte = 0;
                bitCount = 0;
            }
        }
    }

    public void writeBits(long vec, int num) {
        writeBits(vec, num, true);
    }

    // Flush the rest of the bits, padded with 0, and reverse the bits already seen
    public long flush() {
        long retVal = reverseBits(currentByte, (int) bitCount);
        currentByte = 0;
        bitCount = 0;
        return retVal;
    }
}
