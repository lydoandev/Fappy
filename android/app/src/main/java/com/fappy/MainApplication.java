package com.fappy;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
// import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import io.invertase.firebase.database.ReactNativeFirebaseDatabasePackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.storage.ReactNativeFirebaseStoragePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import com.reactnativecommunity.viewpager.RNCViewPagerPackage;

import java.util.Arrays;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.airbnb.android.react.maps.MapsPackage;

public class MainApplication extends NavigationApplication {

   @Override
   protected ReactGateway createReactGateway() {
       ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
           @Override
           protected String getJSMainModuleName() {
               return "index";
           }
       };
       return new ReactGateway(this, isDebug(), host);
   }

   @Override
   public boolean isDebug() {
       return BuildConfig.DEBUG;
   }

   protected List<ReactPackage> getPackages() {
       // Add additional packages you require here
       // No need to add RnnPackage and MainReactPackage
       return Arrays.<ReactPackage>asList(
          new RNCViewPagerPackage(),
          new RNFusedLocationPackage(),
          new MapsPackage(),
          new VectorIconsPackage(),
          new ReactNativeFirebaseAppPackage(),
          new ReactNativeFirebaseMessagingPackage(),
          new ReactNativePushNotificationPackage(),
          new LinearGradientPackage(),
          new ReactNativeFirebaseDatabasePackage(),
          new ImagePickerPackage(),
          new ReactNativeFirebaseStoragePackage()
       );
   }

   @Override
   public List<ReactPackage> createAdditionalReactPackages() {
       return getPackages();
   }
}
