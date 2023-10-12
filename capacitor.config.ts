import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Shop Giày',
  webDir: 'www',
  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: ["*"]
  }
};

export default config;
