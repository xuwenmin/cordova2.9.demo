package com.phonegap.hellodemo;

import android.os.Bundle;
import org.apache.cordova.*;

public class MainActivity extends DroidGap {
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState); 
        super.loadUrl(Config.getStartUrl());  
        //super.loadUrl("file:///android_asset/www/test4.html");    
    }            
                                    
}                
                                                          