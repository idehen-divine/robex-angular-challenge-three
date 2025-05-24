import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lonely.shortly',
  appName: 'shortly',
  webDir: 'dist/app/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      autoHide: true,
      backgroundColor: '#ffffff',
      splashScreenDelay: 3000,
      splashScreenShow: true,
      launchAutoHide: true,
      splashFullScreen: true,
      splashImmersive: true,
    }
  }
};

export default config;
