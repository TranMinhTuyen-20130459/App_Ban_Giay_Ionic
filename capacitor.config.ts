import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'App_Ban_Giay',
  webDir: 'www',
  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: ["*"]
  }
};

export default config;
