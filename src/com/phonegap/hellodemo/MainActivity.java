package com.phonegap.hellodemo;

import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import org.apache.cordova.*;

public class MainActivity extends DroidGap {
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState); 
        super.setIntegerProperty("splashscreen", R.drawable.bg);
        //super.loadUrl("file:///android_asset/www/index.html", 5000);
        setFullscreen();
//        super.loadUrl("file:///android_asset/www/main.html?r="+System.currentTimeMillis(),1000);   
//        super.loadUrl(Config.getStartUrl(),1000); 
//        super.loadUrl("http://feenan.sinaapp.com/test1.html?r="+System.currentTimeMillis(), 3000); 
          super.loadUrl("file:///android_asset/www/index.html?r="+System.currentTimeMillis(),1000);              
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                              
  //全屏（无标题栏和状态栏）
    public void setFullscreen() {
         getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
         requestWindowFeature(Window.FEATURE_NO_TITLE);
         getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                         WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }         
         
  //无标题栏
    public void setNoTitle() {
         requestWindowFeature(Window.FEATURE_NO_TITLE);
    } 
                                                                                                                
}                                             
                                                                                                                                      