package com.iamtechknow.d2sbackend;

// Magic property IDs mapped to variable bit vector sizes and bias values.
public class D2MagicProperties {
    private static int[] ids_map, bias;

    static {
        ids_map = new int[256];
        bias = new int[128];

        // Mapping for IDs 0 - 46, 73 - 160, 214 - 254
        int[][] tempIDs = {{8, 7, 7, 7, 0, 0, 0, 9, 0, 8, 0, 8,
                0, 0, 0, 0, 9, 9, 0, 10, 6, 6, 7, 6, 7, 0, 0, 8, 8,
                0, 0, 11, 9, 8, 6, 6, 8, 8, 8, 8, 5, 8, 5, 8, 5, 8, 5},
                {8, 6, 7, 6, 6, 7, 9, 8, 7, 0, 3, 3, 9, 7, 7, 0, 4, 5,
                8, 7, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 7, 0, 0, 1,
                0, 8, 9, 7, 7, 6, 1, 7, 7, 1, 9, 7, 9, 9, 10, 10, 0, 3,
                3, 5, 0, 0, 0, 0, 0, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
                7, 7, 7, 7, 7, 0, 1, 1, 7, 0, 7, 7, 7, 6, 7},
                {6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
                6, 6, 6, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 6, 6, 8}};
        int[] idIdx = {0, 73, 214};

        // Bias values for IDs 0 - 11, 39 - 45, 74 - 80, 119 - 124
        int[][] tempBiases = {{32, 32, 32, 32, 0, 0, 0, 32, 0, 32, 0, 32},
            {50, 0, 50, 0, 50, 0, 50},
            {30, 20, 10, 10, 0, 100, 100},
            {20, 128, 20, 20, 128, 128}};
        int[] biasIdx = {0, 39, 74, 119};

        for(int i = 0; i < tempIDs.length; i++)
            System.arraycopy(tempIDs[i], 0, ids_map, idIdx[i], tempIDs[i].length);
        ids_map[179] = ids_map[180] = 3;
        ids_map[194] = 4;

        for(int i = 0; i < tempBiases.length; i++)
            System.arraycopy(tempBiases[i], 0, bias, biasIdx[i], tempBiases[i].length);
        bias[31] = bias[33] = 10;
        bias[85] = 50; bias[89] = 4; bias[91] = 100;
        bias[93] = bias[96] = bias[99] = bias[102] = bias[105] = bias[110] = bias[111] = bias[154] = 20;
    }

    public static int getLengthForId(int id) {
        if(id < 0 || id > 254)
            throw new IllegalArgumentException("Magic ID does not exist");

        return ids_map[id];
    }

    public static int getBiasForId(int id) {
        if(id < 0 || id > 124)
            throw new IllegalArgumentException("Bias for magic ID does not exist");

        return bias[id];
    }
}
