package com.iamtechknow.d2sbackend;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

// Utility class to determine whether an item is an armor, shield, weapon, or has a quantity.
// Used to parse specific item data
public class D2ItemTypes {
    private static Set<String> armorCodes = new HashSet<>(256),
        shieldCodes = new HashSet<>(64),
        weaponCodes = new HashSet<>(512),
        quantityCodes = new HashSet<>(32);

    static {
        String[] armor = {"dr6", "aar", "dr3", "utp", "ulm", "ba4", "ba5", "upl", "xhl", "ztb",
            "xtb", "xtg", "mbl", "drb", "bhm", "uh9", "uhn", "umb", "mgl", "ulg", "brs", "cap", "bab",
            "xlm", "mbt", "chn", "xul", "ci0", "uhc", "bae", "urn", "ci1", "crn", "utg", "xrs", "xsk",
            "usk", "xla", "xlb", "xlg", "zlb", "bad", "ci3", "ung", "drf", "uui", "drd", "xth", "dr4",
            "ba2", "fld", "fhl", "plt", "ful", "bac", "hgl", "xui", "uhl", "hbl", "lgl", "gth", "xrn",
            "urs", "ghm", "dr7", "xh9", "baf", "hla", "dr2", "tbl", "vbt", "xmg", "vgl", "ult", "hlm",
            "ba3", "dr8", "ukp", "urg", "ba1", "ba6", "uld", "uth", "lea", "lbt", "vbl", "tgl", "ltp",
            "tbt", "xng", "ba7", "ucl", "xtp", "msk", "xhn", "zmb", "xmb", "utb", "umc", "uhb", "uhg",
            "xar", "hbt", "qui", "ba8", "rng", "xpl", "uar", "dr9", "xkp", "lbl", "ba9", "scl", "ula",
            "uvb", "xea", "uul", "uap", "zvb", "xvb", "xvg", "xld", "skp", "dre", "baa", "ulc", "uhm",
            "dr5", "spl", "stu", "drc", "xlt", "ci2", "xcl", "dra", "xtu", "utc", "umg", "uvg", "uvc",
            "zhb", "xhb", "xhg", "xap", "xhm", "utu", "dr1", "uea", "ulb"
        };

        String[] shields = {"uow", "pa4", "pa7", "pa6", "pad", "xts", "xpk", "upk", "nef", "bsh",
            "buc", "ne9", "pa5", "ne5", "xit", "ne7", "ne4", "gts", "xsh", "pa9", "nea", "uuc", "neg",
            "pa3", "kit", "lrg", "uml", "neb", "uit", "ne6", "ned", "xow", "ne1", "pa8", "pa2", "xml",
            "paa", "pac", "pab", "xrg", "ne8", "sml", "spk", "nee", "pa1", "tow", "ush", "ne3", "paf",
            "uts", "pae", "ne2"
        };

        String[] weapons = {"9gi", "9wd", "8lx", "6ws", "am6", "7sm", "axe", "bal", "bkf", "8hx",
            "7gs", "7s7", "9sp", "bar", "bsw", "btx", "7cs", "9tk", "9wh", "9s8", "bst", "9bs", "9ba",
            "9h9", "7wa", "9vo", "bld", "6hb", "btl", "7dg", "bwn", "brn", "bax", "bsd", "9wn", "7ws",
            "8lb", "8cs", "am7", "ama", "am9", "am8", "ces", "7ga", "7b7", "gpm", "8rx", "9kr", "ob4",
            "clw", "clm", "9ax", "ob8", "clb", "7fb", "7gd", "6hx", "7vo", "cbw", "7bs", "mxb", "9mp",
            "6l7", "7pa", "7ls", "crs", "ob7", "9cl", "9sm", "9cm", "dgr", "7bt", "d33", "6rx", "obd",
            "7mt", "6s7", "9cr", "obf", "dir", "9ws", "2ax", "8cb", "ob5", "ob1", "8sb", "6cs", "obc",
            "7sb", "92h", "72a", "9gd", "opm", "7ss", "flc", "7kr", "9xf", "7la", "7lw", "fla", "flb",
            "9ma", "7ta", "7tk", "9ta", "opl", "9tr", "7gl", "7st", "7yw", "gix", "gis", "7wc", "g33",
            "9ss", "glv", "7gi", "ob6", "cst", "6mx", "9ga", "8lw", "8bs", "9b9", "amc", "gsc", "9gw",
            "gax", "6cb", "gma", "9pi", "7h7", "gsd", "9lw", "9tw", "9wc", "gwn", "hal", "hax", "9cs",
            "9ts", "9ha", "axf", "obb", "hxb", "hfh", "7cm", "9qs", "hdm", "hst", "hbw", "9b8", "6lw",
            "7fc", "7ja", "7sr", "9mt", "jav", "8ss", "ktr", "qf1", "9fl", "kri", "9p9", "lax", "7bl",
            "72h", "7wh", "7bw", "lxb", "9b7", "lbb", "lbw", "8l8", "lst", "lsd", "lwb", "mac", "am5",
            "am4", "am3", "7br", "9gm", "amb", "ame", "amd", "amf", "mau", "7sc", "9la", "mpi", "7di",
            "mst", "7wd", "9wa", "7o7", "7m7", "ops", "9pa", "6lx", "9yw", "7cr", "pik", "pil", "9dg",
            "pax", "7wn", "8ls", "9ar", "gps", "8hb", "am2", "7ma", "rxb", "9di", "8sw", "9sc", "8ws",
            "9ls", "7tw", "sbr", "ob2", "scp", "scm", "skr", "9qr", "7qr", "7fl", "scy", "7qs", "6lb",
            "9sb", "6bs", "sbb", "sbw", "8s8", "ssp", "sst", "ssd", "swb", "8mx", "7ba", "9s9", "7ax",
            "ob3", "ob9", "spr", "spt", "9gl", "6sb", "spc", "msf", "am1", "6ls", "9bl", "gpl", "7tr",
            "7pi", "qf2", "7ar", "oba", "9bt", "7s8", "tax", "tkf", "tsp", "7gm", "7ha", "9bw", "tri",
            "7cl", "9fc", "9gs", "92a", "2hs", "7sp", "7gw", "obe", "vou", "6ss", "wnd", "wax", "9m9",
            "9bk", "7xf", "9br", "whm", "9ja", "7p7", "wsp", "wsc", "9sr", "7mp", "wst", "wsd", "6sw",
            "7b8", "7ts", "7bk", "leg", "wrb", "9wb", "7wb", "9st", "ywn", "9fb"
        };

        String[] quantity = {
            "tbk", "ibk", "key", "gps", "ops", "gpm", "gpl", "opl", "aqv", "cqv", "tkf", "tax", "bkf",
            "bal", "9tk", "9ta", "9bk", "9b8", "7tk", "7ta", "7bk", "7b8", "jav", "pil", "ssp", "glv",
            "tsp", "9ja", "9pi", "9s9", "9gl", "9ts", "7ja", "7pi", "7s7", "7gl", "7ts", "am5", "ama",
            "amf"
        };

        armorCodes.addAll(Arrays.asList(armor));
        shieldCodes.addAll(Arrays.asList(shields));
        weaponCodes.addAll(Arrays.asList(weapons));
        quantityCodes.addAll(Arrays.asList(quantity));
    }

    public static boolean isArmor(String type) {
        return armorCodes.contains(type);
    }

    public static boolean isShield(String type) {
        return shieldCodes.contains(type);
    }

    public static boolean isNonMisc(String type) {
        return armorCodes.contains(type) || shieldCodes.contains(type) || weaponCodes.contains(type);
    }

    public static boolean hasQuantity(String type){
        return quantityCodes.contains(type);
    }

    public static boolean isTome(String type) {
        return type.equals("tbk") || type.equals("ibk");
    }
}
