package com.iamtechknow.d2sbackend;

/**
 * POJO that stores all information to serialize a d2s file.
 */
public class D2Save {
    private static final int STARTING_LEVEL = 1;

    private String name;
    private int level = STARTING_LEVEL;
    private int classNum;
    private int gold;
    private int stashGold;
    private boolean expansion;
    private boolean hardcore;
    private int difficulty;

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
}
