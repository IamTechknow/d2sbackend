package com.iamtechknow.d2sbackend;

/**
 * POJO with variables to indicate quest rewards.
 */
public class D2QuestRewards {
    private boolean den, imbue, skillBook, potion, lamEsen, izual, socket, scroll;
    private boolean nAncients, nmAncients, hAncients;

    public boolean isDen() {
        return den;
    }

    public void setDen(boolean den) {
        this.den = den;
    }

    public boolean isImbue() {
        return imbue;
    }

    public void setImbue(boolean imbue) {
        this.imbue = imbue;
    }

    public boolean isSkillBook() {
        return skillBook;
    }

    public void setSkillBook(boolean skillBook) {
        this.skillBook = skillBook;
    }

    public boolean isPotion() {
        return potion;
    }

    public void setPotion(boolean potion) {
        this.potion = potion;
    }

    public boolean isLamEsen() {
        return lamEsen;
    }

    public void setLamEsen(boolean lamEsen) {
        this.lamEsen = lamEsen;
    }

    public boolean isIzual() {
        return izual;
    }

    public void setIzual(boolean izual) {
        this.izual = izual;
    }

    public boolean isSocket() {
        return socket;
    }

    public void setSocket(boolean socket) {
        this.socket = socket;
    }

    public boolean isScroll() {
        return scroll;
    }

    public void setScroll(boolean scroll) {
        this.scroll = scroll;
    }

    public boolean isnAncients() {
        return nAncients;
    }

    public void setnAncients(boolean nAncients) {
        this.nAncients = nAncients;
    }

    public boolean isNmAncients() {
        return nmAncients;
    }

    public void setNmAncients(boolean nmAncients) {
        this.nmAncients = nmAncients;
    }

    public boolean ishAncients() {
        return hAncients;
    }

    public void sethAncients(boolean hAncients) {
        this.hAncients = hAncients;
    }
}
