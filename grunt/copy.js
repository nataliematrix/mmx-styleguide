module.exports = function(grunt, options){
  return {
    target: {
      files: [
        // includes files within path
        {
          expand: true,
          cwd: 'src/',
          src: ['<%= copyFiles %>'],
          dest: 'dist/',
          filter: 'isFile'
        }
      ]
    },
    //file export
    export:{
      files:[
      {
        expand: true,
        cwd: 'src/sass',
        src: '**/*.scss',
        dest: '<%= exportDest %>/static/styles'
      },
      {
        expand: true,
        cwd: 'src/scripts',
        src: '**/*.js',
        dest: '<%= exportDest %>/static/scripts'
      },
      {
        expand: true,
        cwd: 'src/images',
        src: '**/*',
        dest: '<%= exportDest %>/static/images'
      },
      {
        expand: true,
        cwd: 'src/fonts',
        src: '**/*',
        dest: '<%= exportDest %>/static/fonts'
      },
      {
        expand: true,
        cwd: 'node_modules/bootstrap-sass/assets/stylesheets',
        src: '**/*.scss',
        dest: '<%= exportDest %>/static/styles/bootstrap'
      },
      {
        expand: true,
        cwd: 'node_modules/bootstrap-sass/assets/javascripts',
        src: '**/*.js',
        dest: '<%= exportDest %>/static/scripts/bootstrap'
      },
      {
        expand: true,
        cwd: 'node_modules/mmx-bootstrap-extensions/src/styles',
        src: '**/*.scss',
        dest: '<%= exportDest %>/static/styles/bootstrap-extensions'
      },
      {
        expand: true,
        cwd: 'node_modules/mmx-bootstrap-extensions/src/scripts',
        src: '**/*.js',
        dest: '<%= exportDest %>/static/scripts/bootstrap-extensions'
      }],
      options: {
        process: function(content, srcpath) {
          // Replace paths with paths for project
          if(srcpath.endsWith('_application-paths.scss')) {
            var theContent = content.split('\n').map(function(line) {
              var match = line.match(/\$.+:\s*'(.+)';/);
              if(match) {
                return match[0].replace(match[1], options.globalSettings.projectAssetsPath + match[1]);
              }
              else {
                return line;
              }
            })
            .join('\n');

            return theContent;
          }
          else if(srcpath.endsWith('_bootstrap.scss') || srcpath.endsWith('_bootstrap-extensions.scss')) {
            var theContent = content.split('\n').map(function(line) {
              var match = line.match(/@import\s+"(.+)";/);
              if(match) {
                var pathParts = match[1].split('/'),
                  newPath = pathParts.slice(pathParts.length - 2).join('/');
                return match[0].replace(match[1], newPath);
              }
              else {
                return line;
              }
            })
            .join('\n');

            return theContent;
          }
          else {
            return content;
          }
        }
      }
    }
  }
};