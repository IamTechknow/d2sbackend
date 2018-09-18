package com.iamtechknow.d2sbackend;

/**
 * Item properties for Diablo II items, simple and complex.
 * Contains a builder class to initialize an object.
 * Information on the item format may be found <a href=https://user.xmission.com/~trevin/DiabloIIv1.09_Item_Format.shtml>here</a>
 */
public class D2Item {
    private final boolean identified, socketed, simple, ethereal, personalized, hasRW;
    private final String itemType;
    private final int numSockets;

    // Bits that determine where the item is.
    private final int itemLocation, itemStore, equippedLoc;

    // Inventory coordinates. If equipped, can be non-zero, but it is unused.
    private final int x, y;

    public static class Builder {
        private final String itemType;
        private boolean identified, socketed, simple, ethereal, personalized, hasRW;
        private int itemLocation, itemStore, equippedLoc;
        private int x, y;
        private int numSockets;

        public Builder(String type) {
            itemType = type;
        }

        public Builder setIdentified(boolean identified) {
            this.identified = identified;
            return this;
        }

        public Builder setSocketed(boolean socketed) {
            this.socketed = socketed;
            return this;
        }

        public Builder setSimple(boolean simple) {
            this.simple = simple;
            return this;
        }

        public Builder setEthereal(boolean ethereal) {
            this.ethereal = ethereal;
            return this;
        }

        public Builder setPersonalized(boolean personalized) {
            this.personalized = personalized;
            return this;
        }

        public Builder setHasRW(boolean hasRW) {
            this.hasRW = hasRW;
            return this;
        }

        public Builder setItemLocation(int itemLocation) {
            this.itemLocation = itemLocation;
            return this;
        }

        public Builder setItemStore(int itemStore) {
            this.itemStore = itemStore;
            return this;
        }

        public Builder setEquippedLoc(int equippedLoc) {
            this.equippedLoc = equippedLoc;
            return this;
        }

        public Builder setX(int x) {
            this.x = x;
            return this;
        }

        public Builder setY(int y) {
            this.y = y;
            return this;
        }

        public Builder setNumSockets(int numSockets) {
            this.numSockets = numSockets;
            return this;
        }

        public D2Item build() {
            return new D2Item(this);
        }
    }

    private D2Item(Builder builder) {
        identified = builder.identified;
        socketed = builder.socketed;
        simple = builder.simple;
        ethereal = builder.ethereal;
        personalized = builder.personalized;
        hasRW = builder.hasRW;
        itemType = builder.itemType;
        itemLocation = builder.itemLocation;
        itemStore = builder.itemStore;
        equippedLoc = builder.equippedLoc;
        x = builder.x;
        y = builder.y;
        numSockets = builder.numSockets;
    }

    public boolean isIdentified() {
        return identified;
    }

    public boolean isSocketed() {
        return socketed;
    }

    public boolean isSimple() {
        return simple;
    }

    public boolean isEthereal() {
        return ethereal;
    }

    public boolean isPersonalized() {
        return personalized;
    }

    public boolean isHasRW() {
        return hasRW;
    }

    public String getItemType() {
        return itemType;
    }

    public int getItemLocation() {
        return itemLocation;
    }

    public int getItemStore() {
        return itemStore;
    }

    public int getEquippedLoc() {
        return equippedLoc;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getNumSockets() {
        return numSockets;
    }
}
