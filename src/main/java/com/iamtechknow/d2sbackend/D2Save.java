package com.iamtechknow.d2sbackend;

/**
 * POJO that stores all information to serialize a d2s file.
 */
public class D2Save {
    private static final int STARTING_LEVEL = 1, MAX_CLASS_NUM = 6, MAX_DIFFICULTY = 15,
                            GOLD_PER_LEVEL = 10000, MIN_LEN = 2, MAX_LENGTH = 15;

    private String name;
    private int level = STARTING_LEVEL;
    private int classNum;
    private int gold;
    private int stashGold;
    private boolean expansion;
    private boolean hardcore;
    private int difficulty;

    // Invalid booleans for error messages
    private boolean invalid, invalidForClassic, invalidName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getClassNum() {
        return classNum;
    }

    public void setClassNum(int classNum) {
        this.classNum = classNum;
    }

    public int getGold() {
        return gold;
    }

    public void setGold(int gold) {
        this.gold = gold;
    }

    public int getStashGold() {
        return stashGold;
    }

    public void setStashGold(int stashGold) {
        this.stashGold = stashGold;
    }

    public boolean isExpansion() {
        return expansion;
    }

    public void setExpansion(boolean expansion) {
        this.expansion = expansion;
    }

    public boolean isHardcore() {
        return hardcore;
    }

    public void setHardcore(boolean hardcore) {
        this.hardcore = hardcore;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public boolean isInvalid() {
        return invalid;
    }

    public boolean isInvalidForClassic() {
        return invalidForClassic;
    }

    public boolean isInvalidName() {
        return invalidName;
    }

    /**
     * Various checks to determine whether a save file could be made from this object, and caps gold amount.
     * @return whether the form data is valid
     */
    public boolean checkValid() {
        gold = Math.min(gold, level * GOLD_PER_LEVEL);
        invalidName = !checkName();
        invalidForClassic = !checkClass();
        invalid = invalidName || invalidForClassic || classNum > MAX_CLASS_NUM || difficulty > MAX_DIFFICULTY;
        return !invalid;
    }

    // Called in result.html via Thymeleaf
    public String getClassName() {
        String[] classes = {"Amazon", "Sorceress", "Necromancer", "Paladin", "Barbarian", "Druid", "Assassin"};
        return classes[classNum];
    }

    /**
     * Checks that the name is valid, that is, it is between 2-15 characters, it starts with a letter,
     * and contains no more than one occurrence of a dash or underscore.
     * @return whether the name is valid or not
     */
    private boolean checkName() {
        if(name == null || name.length() < MIN_LEN || name.length() > MAX_LENGTH || !Character.isAlphabetic(name.charAt(0)))
            return false;

        boolean found = false;
        for(char c : name.toCharArray())
            if(c == '-' || c == '_') {
                if(found)
                    return false;
                else
                    found = true;
            }

        return true;
    }

    /**
     * Checks that the class cannot be Assassin/Druid in non-expansion save
     * @return whether the class configuration is valid
     */
    private boolean checkClass() {
        return !(classNum >= 5 && !expansion);
    }
}
