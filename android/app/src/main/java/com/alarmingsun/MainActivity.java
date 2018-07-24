package com.alarmingsun;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.view.WindowManager;

public class MainActivity extends ReactActivity {

    /**
     * Keep screen awake as long as app is running
     * https://thecodebarbarian.com/react-native-keep-awake-android-java
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.getWindow()
                .addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "alarmingsun";
    }
}
