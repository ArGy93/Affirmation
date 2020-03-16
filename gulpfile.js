var gulp 				= require('gulp'); // Connect Gulp
var browserSync = require('browser-sync'); // Connect browser ynchronization
var del					= require('del'); // Connect to delete dist
var stylus			= require('gulp-stylus'); // Connect stylus
var concat			= require('gulp-concat'); // Connect for concatenation .js
var uglify			= require('gulp-uglifyjs'); // Connect minification .js
var cssnano			= require('gulp-cssnano'); // Connect minification css
var rename			= require('gulp-rename'); // Connect rename css (.min)
var prefixer		= require('gulp-autoprefixer'); // Connect prefixes to .css

// For synchronization browser with code
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false,
		tunnel: true
	});
});

// For recompile dist folder
gulp.task('clean', function () {
	return del.sync('dist/');
});

// For add frameworks and plugins to project
gulp.task('add-libs', function () {

	var jQuery = gulp.src('node_modules/jquery/dist/jquery.min.js')
							 .pipe(gulp.dest('src/libs/jQuery-3.3.1/'));

	var normalizyCss = gulp.src('node_modules/normalize.css/normalize.css')
										 .pipe(gulp.dest('src/libs/normalizeCss/'))

});

// For compilation styl-file to css-file
gulp.task('styl', function () {
	return gulp.src(['src/styl/main.styl',
									'src/styl/sections/main-section.styl',
									'src/styl/sections/about-section.styl',
									'src/styl/sections/basic.styl',
									'src/styl/sections/constructor.styl',
									'src/styl/sections/create.styl',
									'src/styl/sections/profile.styl',
									'src/styl/sections/changes.styl',
									'src/styl/sections/faq.styl',
									'src/styl/footer.styl',
									'src/styl/animation.styl',
									'src/styl/media.styl'])
				.pipe(concat('style.styl'))
				.pipe(stylus())
				.pipe(prefixer({
					browsers: [
						'last 10 versions',
						'> 1%',
						'ie 8',
						'iOS 10'
					],
					cascade: true
				}))
				.pipe(gulp.dest('src/css/'))
				.pipe(browserSync.reload({
					stream: true
				}))
});

// For minimizing styles
gulp.task('css-min', function () {
	return gulp.src('src/css/style.css')
				.pipe(cssnano())
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(gulp.dest('dist/css/'))
});

// For minimizing own scripts
gulp.task('scripts-min', function () {
	return gulp.src('src/js/**/*.js')
				 .pipe(concat('main.min.js'))
				 .pipe(uglify())
				 .pipe(gulp.dest('dist/js/'))
});

gulp.task('watch', ['browser-sync', 'add-libs', 'styl', 'scripts-min'], function () {
	gulp.watch('src/styl/**/*.styl', ['styl']);
	gulp.watch('src/**/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['add-libs', 'styl', 'css-min', 'scripts-min'],
	function () {

	var buildFonts = gulp.src('src/fonts/**/*')
									.pipe(gulp.dest('dist/fonts/'));

	var buildImg = gulp.src('src/img/**/*')
									.pipe(gulp.dest('dist/img/'));

	var buildVideos = gulp.src('src/videos/**/*')
									.pipe(gulp.dest('dist/videos/'));

	var buildLibs = gulp.src('src/libs/**/*')
								 .pipe(gulp.dest('dist/libs'))

	var buildCss = gulp.src('src/css/**/*.css')
								.pipe(gulp.dest('dist/css/'));

	var prodJs = gulp.src('src/js/**/*')
								.pipe(gulp.dest('dist/js/'));

	var buildHtml = gulp.src('src/**/*.html')
								.pipe(gulp.dest('dist/'))

});
