// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url_api_backend = "http://tmt020202ccna-001-site1.atempurl.com/api";

export const environment = {
  production: false,
  backend_api_url: url_api_backend,
  readOnlyKeys: {
    consumer_key: 'ck_85cdd6bc830c2c942542ac7aec1734b9b88b68f5',
    consumer_secret: 'cs_13b724dc3d6caba718b847589d52131c17f0e41b'
  },
  writableKeys: {
    consumer_key: 'ck_7fb9d2318b11ac1927aca42bed732cc872bf02c2',
    consumer_secret: 'cs_27202467a024d2c31693945a358f05aed37e78f8'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
