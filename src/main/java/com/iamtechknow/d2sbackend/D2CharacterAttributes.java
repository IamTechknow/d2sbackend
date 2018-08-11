package com.iamtechknow.d2sbackend;

/**
 * Contains attribute information that may be written into a Diablo II save file.
 */
public class D2CharacterAttributes {
    // Classes that correspond to their save code
    private static final int AMAZON = 0, SORCERESS = 1, NECRO = 2, PALADIN = 3, BARB = 4, DRUID = 5, ASSASSIN = 6,
                            ACT2 = 1, ACT3 = 2, MAX_QUEST_TIMES = 3;

    private final int str;
    private final int dex;
    private final int vit;
    private final int nrg;
    private final int skillPoints;
    private final int attrPoints;
    private final int gold;
    private final int stashGold;
    private final int level;
    private final long experience;
    private final double life;
    private final double stamina;
    private final double mana;

    /**
     * Determine and write the attributes themselves based on the class and level.
     */
    public D2CharacterAttributes(D2Save save) {
        int[] vals = getDefaultAttributes(save);
        str = vals[0]; dex = vals[1]; vit = vals[2]; nrg = vals[3];
        gold = save.getGold();
        stashGold = save.getStashGold();
        level = save.getLevel();
        experience = getExperience(level);

        life = calcLife(save, vals[4]);
        stamina = calcStamina(save, vals[5]);
        mana = calcMana(save, vals[6]);

        // Attributes from quests, calculate how many times the quest has been done. Capped at 3
        // Note that most quest rewards need to be received in the game and thus not accounted for here.
        int timesBeatGame = save.getDifficulty() / 5;

        int timesCompletedLamEsen = timesBeatGame * (save.getRewards().isLamEsen() ? 1 : 0);
        if(save.getStartingAct() >= ACT3 && save.getRewards().isLamEsen())
            timesCompletedLamEsen++;
        timesCompletedLamEsen = Math.min(MAX_QUEST_TIMES, timesCompletedLamEsen);

        attrPoints = 5 * (save.getLevel() - 1 + timesCompletedLamEsen);

        int timesKilledRadamant = timesBeatGame * (save.getRewards().isSkillBook() ? 1 : 0);
        if(save.getStartingAct() >= ACT2 && save.getRewards().isSkillBook())
            timesKilledRadamant++;
        timesKilledRadamant = Math.min(MAX_QUEST_TIMES, timesKilledRadamant);

        skillPoints = (save.getLevel() - 1) + timesKilledRadamant;
    }

    public int getStr() {
        return str;
    }

    public int getDex() {
        return dex;
    }

    public int getVit() {
        return vit;
    }

    public int getNrg() {
        return nrg;
    }

    public int getSkillPoints() {
        return skillPoints;
    }

    public int getAttrPoints() {
        return attrPoints;
    }

    public int getGold() {
        return gold;
    }

    public int getStashGold() {
        return stashGold;
    }

    public int getLevel() {
        return level;
    }

    public long getExperience() {
        return experience;
    }

    /**
     * Returns a fixed-point binary number of the character's life, with a 24-bit integer and a 8-bit fractional value.
     * Here the fractional part is always 0.
     * @return 32-bit representation of life
     */
    public int getLife() {
        int life_whole = (int) life;
        return life_whole << 8;
    }

    /**
     * Returns a fixed-point binary number of the character's stamina
     * @return 32-bit representation of stamina
     */
    public int getStamina() {
        int stamina_whole = (int) stamina, stamina_frac = (int) (256 * (stamina - stamina_whole));
        stamina_whole <<= 8;

        return stamina_whole | stamina_frac;
    }

    /**
     * Returns a fixed-point binary number of the character's mana
     * @return 32-bit representation of mana
     */
    public int getMana() {
        int mana_whole = (int) mana, mana_frac = (int) (256 * (mana - mana_whole));
        mana_whole <<= 8;

        return mana_whole | mana_frac;
    }

    /**
     * Get the default character attributes from level 1
     */
    private int[] getDefaultAttributes(D2Save save) {
        int[] arr;
        switch(save.getClassNum()) {
            case AMAZON:
                arr = new int[]{20, 25, 20, 15, 50, 84, 15};
                break;
            case SORCERESS:
                arr = new int[]{10, 25, 10, 35, 40, 74, 35};
                break;
            case NECRO:
                arr = new int[]{15, 25, 15, 25, 45, 79, 25};
                break;
            case PALADIN:
                arr = new int[]{25, 20, 25, 15, 55, 89, 15};
                break;
            case BARB:
                arr = new int[]{30, 20, 25, 10, 55, 92, 10};
                break;
            case DRUID:
                arr = new int[]{15, 20, 25, 20, 55, 84, 20};
                break;
            default: // Assassin
                arr = new int[]{20, 20, 20, 25, 50, 95, 25};
        }
        return arr;
    }

    private double calcLife(D2Save save, double life) {
        switch(save.getClassNum()) {
            case SORCERESS: // +2 life per level
            case DRUID:
            case NECRO:
                return life + 2 * (save.getLevel() - 1);
            case BARB: // +4 life
                return life + 4 * (save.getLevel() - 1);
            default: // +3 life for Pal, Sin, Amazon
                return life + 3 * (save.getLevel() - 1);
        }
    }

    private double calcStamina(D2Save save, double stamina) {
        switch(save.getClassNum()) {
            case ASSASSIN:
                return stamina + 1.25 * (save.getLevel() - 1);
            default:
                return stamina + (save.getLevel() - 1);
        }
    }

    private double calcMana(D2Save save, double mana) {
        switch(save.getClassNum()) {
            case BARB:
                return mana + (save.getLevel() - 1);
            case PALADIN:
            case AMAZON:
                return mana + 1.5 * (save.getLevel() - 1);
            case ASSASSIN:
                return mana + 1.75 * (save.getLevel() - 1);
            default: // +2 mana for Sorc, Necro, Druid
                return mana + 2 * (save.getLevel() - 1);
        }
    }

    private long getExperience(int level) {
        if(level < 1 || level > 99)
            throw new IllegalArgumentException("Level is not between 1 and 99");

        long[] lut = new long[] {0, 0, 500, 1500, 3750, 7875, 14175, 22680, 32886, 44396, 57715,
                72144, 90180, 112725, 140906, 176132, 220165, 275207, 344008, 430010, 537513,
                671891, 839864, 1049830, 1312287, 1640359, 2050449, 2563061, 3203826, 3902260, 4663553,
                5493363, 6397855, 7383752, 8458379, 9629723, 10906488, 12298162, 13815086, 15468534, 17270791,
                19235252, 21376515, 23710491, 26254525, 29027522, 32050088, 35344686, 38935798, 42850109, 47116709,
                51767302, 56836449, 62361819, 68384473, 74949165, 82104680, 89904191, 98405658, 107672256, 117772849,
                128782495, 140783010, 153863570, 168121381, 183662396, 200602101, 219066380, 239192444, 261129853, 285041630,
                311105466, 339515048, 370481492, 404234916, 441026148, 481128591, 524840254, 572485967, 624419793, 681027665,
                742730244, 809986056, 883294891, 963201521, 1050299747, 1145236814, 1248718217, 1361512946, 1484459201, 1618470619,
                1764543065, 1923762030, 2097310703, 2286478756L, 2492671933L, 2717422497L, 2962400612L, 3229426756L, 3520485254L
        };
        return lut[level];
    }
}
