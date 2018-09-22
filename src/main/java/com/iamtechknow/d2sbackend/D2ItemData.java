package com.iamtechknow.d2sbackend;

// Contains specific item data values, including magical properties and values. All values optional
public class D2ItemData {
	private final int defense;
	
	private final int maxDur, curDur;
	
	private final int sockets;
	
	private final int quantity;
	
	// Number of lists, more than one for set items
	private final int propertyLists;
	
	// Property IDs and corresponding values. The IDs are 9 bits and values are variable bits (up to 32)
	private final int[] propertyIds, propertyValues;
	
	public static class Builder {
        private int defense;
        private int maxDur, curDur;
        private int sockets;
        private int quantity;
        private int propertyLists;
        private int[] propertyIds, propertyValues;

        public Builder setDefense(int defense) {
            this.defense = defense;
            return this;
        }

        public Builder setMaxDur(int maxDur) {
            this.maxDur = maxDur;
            return this;
        }

        public Builder setCurDur(int curDur) {
            this.curDur = curDur;
            return this;
        }

        public Builder setSockets(int sockets) {
            this.sockets = sockets;
            return this;
        }

        public Builder setQuantity(int quantity) {
            this.quantity = quantity;
            return this;
        }

        public Builder setPropertyLists(int propertyLists) {
            this.propertyLists = propertyLists;
            return this;
        }

        public Builder setPropertyIds(int[] propertyIds) {
            this.propertyIds = propertyIds;
            return this;
        }

        public Builder setPropertyValues(int[] propertyValues) {
            this.propertyValues = propertyValues;
            return this;
        }

        public D2ItemData build() {
            return new D2ItemData(this);
        }
    }

    private D2ItemData(Builder builder) {
        defense = builder.defense;
        maxDur = builder.maxDur;
        curDur = builder.curDur;
        sockets = builder.sockets;
        quantity = builder.quantity;
        propertyLists = builder.propertyLists;
        propertyIds = builder.propertyIds;
        propertyValues = builder.propertyValues;
    }

    public int getDefense() {
        return defense;
    }

    public int getMaxDur() {
        return maxDur;
    }

    public int getCurDur() {
        return curDur;
    }

    public int getSockets() {
        return sockets;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getPropertyLists() {
        return propertyLists;
    }

    public int[] getPropertyIds() {
        return propertyIds;
    }

    public int[] getPropertyValues() {
        return propertyValues;
    }
}
