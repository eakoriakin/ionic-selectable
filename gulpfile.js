let gulp = require('gulp'),
  childProcess = require('child_process'),
  _ = require('lodash'),
  uglify = require('gulp-uglify-es').default,
  rename = require('gulp-rename'),
  jsonEditor = require('gulp-json-editor'),
  fs = require('fs'),
  tar = require('tar'),
  sass = require('gulp-sass');

let packageJson = JSON.parse(fs.readFileSync('./package.json')),
  paths = {
    gulp: 'node_modules/gulp/bin/gulp.js',
    ngPackagr: 'node_modules/ng-packagr/cli/main.js',
    ionic: 'C:/Program Files/nodejs/node_modules/ionic/bin/ionic',
    images: {
      root: 'images/'
    },
    src: {
      css: `src/app/components/${packageJson.name}/${packageJson.name}.component.scss`
    },
    dist: {
      root: 'dist/',
      package: 'dist/package.json',
      bundles: {
        root: 'dist/bundles/',
        file: `dist/bundles/${packageJson.name}.umd.js`,
        mapFile: `dist/bundles/${packageJson.name}.umd.js.map`,
        minFile: `${packageJson.name}.umd.min.js`
      },
      esm5: {
        root: 'dist/esm5/',
        file: `dist/esm5/${packageJson.name}.js`,
        minFile: `${packageJson.name}.min.js`
      },
      esm2015: {
        root: 'dist/esm2015/',
        file: `dist/esm2015/${packageJson.name}.js`,
        minFile: `${packageJson.name}.min.js`
      }
    }
  };

function executeCommand(command, parameters) {
  if (command === 'gulp') {
    command = paths.gulp;
  } else if (command === 'ng-packagr') {
    command = paths.ngPackagr;
  } else if (command === 'ionic') {
    command = paths.ionic;
  }

  var _parameters = _.cloneDeep(parameters);
  _parameters.unshift(command);

  childProcess.spawnSync('node', _parameters, { stdio: 'inherit', cwd: './' });
}

function createTar(file, directory) {
  return tar.create({
    gzip: true,
    strict: true,
    portable: true,
    cwd: directory,
    file: file,
    sync: true
  }, ['.']);
}

function copyCss() {
  return Promise.all([
    new Promise(function (resolve, reject) {
      // Copy original SCSS file to "module" folder from package.json.
      // That's where Ionic will be looking for it.
      fs.createReadStream(paths.src.css).pipe(
        fs.createWriteStream(`${paths.dist.esm5.root}${packageJson.name}.component.scss`)
          .on('error', reject)
          .on('close', resolve)
      );
    }),
    new Promise(function (resolve, reject) {
      gulp.src(paths.src.css)
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .pipe(rename(`${packageJson.name}.component.min.css`))
        .pipe(gulp.dest(paths.dist.esm5.root))
        .on('error', reject)
        .on('end', resolve);
    })
  ]);
}

function copyImages() {
  return new Promise(function (resolve, reject) {
    gulp.src(`${paths.images.root}**/*`)
      .pipe(gulp.dest(`${paths.dist.root}${paths.images.root}`))
      .on('error', reject)
      .on('end', resolve);
  });
}

// Although ng-packagr creates .tgz package, we modify package.json after it,
// so we need to repack it.
function pack() {
  let tarName = `${packageJson.name}-${packageJson.version}.tgz`;

  // Remove archive created by ng-packagr.
  fs.unlinkSync('dist.tgz');

  // Create new archive.
  createTar(tarName, paths.dist.root);
  fs.renameSync(tarName, `${paths.dist.root}${tarName}`);
}

function minifyJS() {
  // Minify files.
  return Promise.all([
    new Promise(function (resolve, reject) {
      gulp.src(paths.dist.esm5.file)
        .pipe(uglify())
        .on('error', reject)
        .pipe(rename(paths.dist.esm5.minFile))
        .pipe(gulp.dest(paths.dist.esm5.root))
        .on('error', reject)
        .on('end', resolve);
    }),
    new Promise(function (resolve, reject) {
      gulp.src(paths.dist.esm2015.file)
        .pipe(uglify())
        .on('error', reject)
        .pipe(rename(paths.dist.esm2015.minFile))
        .pipe(gulp.dest(paths.dist.esm2015.root))
        .on('error', reject)
        .on('end', resolve);
    })
  ]).then(function () {
    // Remove source files.
    fs.unlinkSync(paths.dist.bundles.file);
    fs.unlinkSync(paths.dist.bundles.mapFile);
    fs.unlinkSync(paths.dist.esm5.file);
    fs.unlinkSync(paths.dist.esm2015.file);
  });
}

function modifyPackageJson() {
  return new Promise(function (resolve, reject) {
    gulp.src(paths.dist.package)
      .pipe(jsonEditor(function (json) {
        json.main = `bundles/${paths.dist.bundles.minFile}`;
        json.module = `esm5/${paths.dist.esm5.minFile}`;
        json.es2015 = `esm2015/${paths.dist.esm2015.minFile}`;
        json.private = true;
        delete json.cordova;
        delete json.devDependencies;
        delete json.dependencies;
        delete json.repository;
        return json;
      }))
      .pipe(gulp.dest(paths.dist.root))
      .on('error', reject)
      .on('end', resolve);
  });
}

gulp.task('heroku', function () {
  executeCommand('ionic', ['build', '--minifyjs', '--minifycss', '--optimizejs']);
});

gulp.task('build', function () {
  executeCommand('ng-packagr', ['-p', 'ng-package.json']);

  minifyJS().then(function () {
    modifyPackageJson().then(function () {
      copyCss().then(function () {
        copyImages().then(function () {
          pack();
        });
      });
    });
  });
});

gulp.task('default', ['build']);
