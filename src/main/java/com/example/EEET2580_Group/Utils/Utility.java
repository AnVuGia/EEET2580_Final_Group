package com.example.EEET2580_Group.Utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class Utility {
    static List<String> colorList= Arrays.asList("#BD3C14",
                                            "#FF2717",
                                            "#4554A4",
                                            "#0B9BE3",
                                            "#06A3B7",
                                            "#009688",
                                            "#009606",
                                            "#8D9900",
                                            "#FD5D10",
                                            "#65499D");
    public static String returnColor(){
        Random random = new Random();
        int index = random.nextInt(colorList.size());
        return colorList.get(index);
    }
}
