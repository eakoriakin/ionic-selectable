var ngPackage = require('ng-packagr');
var path = require('path');

var packageCfg = path.normalize(path.join(__dirname, '../ng-package.json'));
var tsConfig = path.normalize(path.join(__dirname, '../tsconfig.lib.json'));

ngPackage
  .ngPackagr()
  .forProject(packageCfg)
  .withTsConfig(tsConfig)
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
