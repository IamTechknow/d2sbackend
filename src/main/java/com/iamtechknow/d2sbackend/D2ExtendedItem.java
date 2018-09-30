package com.iamtechknow.d2sbackend;

public class D2ExtendedItem {
    private static final int UNUSED = 4;
    public static final int SET = 5, RARE = 6, UNIQUE = 7, CRAFTED = 8;

    // Fields common to all items. Quality tells us the item type
    private final int identifier, iLvl, quality;

    // Jewelry/Jewel/Charm data
    private final boolean genericMagicItem;
    private final int imgType;

    // Expansion Item data
    private final boolean expansionItem;
    private final int expansionMagicProperty;

    // Quality data for low or superior items
    private final int qualityData;

    // Prefix and Suffix for magic items. If 0, the item does not have a prefix/affix property
    private final int prefixId, suffixId;

    private final int setId, uniqueId, rwId;

    // Rare/crafted item data (up to 3 prefixes, 3 suffixes)
    private final int firstWordId, secondWordId;
    private final int[] prefixIds, suffixIds;

    // Personalization data
    private final String owner;

    private final boolean idTome;
	
	// Item specific data
	private final D2ItemData data;

    public static class Builder {
        // Required fields
        private final int identifier, iLvl, quality;
        private boolean genericMagicItem;
        private int imgType;
        private boolean expansionItem;
        private int expansionMagicProperty;

        // Optional values, 0 generally means none or is unused
        private int qualityData = UNUSED;
        private int prefixId, suffixId;
        private int setId, uniqueId, rwId;
        private int firstWordId, secondWordId;
        private int[] prefixIds, suffixIds;
        private String owner;
        private boolean idTome;
        private D2ItemData data;

        public Builder(int id, int lvl, int quality) {
            identifier = id;
            iLvl = lvl;
            this.quality = quality;
        }

        public Builder setGenericMagicItem(boolean genericMagicItem) {
            this.genericMagicItem = genericMagicItem;
            return this;
        }

        public Builder setImgType(int imgType) {
            this.imgType = imgType;
            return this;
        }

        public Builder setExpansionItem(boolean expansionItem) {
            this.expansionItem = expansionItem;
            return this;
        }

        public Builder setExpansionMagicProperty(int expansionMagicProperty) {
            this.expansionMagicProperty = expansionMagicProperty;
            return this;
        }

        public Builder setQualityData(int qualityData) {
            this.qualityData = qualityData;
            return this;
        }

        public Builder setPrefixId(int prefixId) {
            this.prefixId = prefixId;
            return this;
        }

        public Builder setSuffixId(int suffixId) {
            this.suffixId = suffixId;
            return this;
        }

        public Builder setSetId(int setId) {
            this.setId = setId;
            return this;
        }

        public Builder setUniqueId(int uniqueId) {
            this.uniqueId = uniqueId;
            return this;
        }

        public Builder setRwId(int rwId) {
            this.rwId = rwId;
            return this;
        }

        public Builder setFirstWordId(int firstWordId) {
            this.firstWordId = firstWordId;
            return this;
        }

        public Builder setSecondWordId(int secondWordId) {
            this.secondWordId = secondWordId;
            return this;
        }

        public Builder setPrefixIds(int[] prefixIds) {
            this.prefixIds = prefixIds;
            return this;
        }

        public Builder setSuffixIds(int[] suffixIds) {
            this.suffixIds = suffixIds;
            return this;
        }

        public Builder setOwner(String owner) {
            this.owner = owner;
            return this;
        }

        public Builder setIdTome(boolean idTome) {
            this.idTome = idTome;
            return this;
        }

        public Builder setData(D2ItemData data) {
            this.data = data;
            return this;
        }

        public D2ExtendedItem build() {
            return new D2ExtendedItem(this);
        }
    }

    private D2ExtendedItem(Builder builder) {
        identifier = builder.identifier;
        iLvl = builder.iLvl;
        quality = builder.quality;
        genericMagicItem = builder.genericMagicItem;
        imgType = builder.imgType;
        expansionItem = builder.expansionItem;
        expansionMagicProperty = builder.expansionMagicProperty;
        qualityData = builder.qualityData;
        prefixId = builder.prefixId;
        suffixId = builder.suffixId;
        setId = builder.setId;
        uniqueId = builder.uniqueId;
        rwId = builder.rwId;
        firstWordId = builder.firstWordId;
        secondWordId = builder.secondWordId;
        prefixIds = builder.prefixIds;
        suffixIds = builder.suffixIds;
        owner = builder.owner;
        idTome = builder.idTome;
        data = builder.data;
    }

    public int getIdentifier() {
        return identifier;
    }

    public int getiLvl() {
        return iLvl;
    }

    public int getQuality() {
        return quality;
    }

    public boolean isGenericMagicItem() {
        return genericMagicItem;
    }

    public int getImgType() {
        return imgType;
    }

    public boolean isExpansionItem() {
        return expansionItem;
    }

    public int getExpansionMagicProperty() {
        return expansionMagicProperty;
    }

    public int getQualityData() {
        return qualityData;
    }

    public int getPrefixId() {
        return prefixId;
    }

    public int getSuffixId() {
        return suffixId;
    }

    public int getSetId() {
        return setId;
    }

    public int getUniqueId() {
        return uniqueId;
    }

    public int getRwId() {
        return rwId;
    }

    public int getFirstWordId() {
        return firstWordId;
    }

    public int getSecondWordId() {
        return secondWordId;
    }

    public int[] getPrefixIds() {
        return prefixIds;
    }

    public int[] getSuffixIds() {
        return suffixIds;
    }

    public String getOwner() {
        return owner;
    }

    public boolean isIdTome() {
        return idTome;
    }

    public boolean isLowQuality() {
        return qualityData < UNUSED;
    }

    public D2ItemData getData() {
        return data;
    }
}
