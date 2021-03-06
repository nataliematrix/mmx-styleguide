module.exports = function(grunt, options){
  return {
    options: {
      data: {
        debug: true,
        pretty: true,
        // these are global project settings passed to the views
        settings: '<%= globalSettings %>'
      }
    },
    // Use this to compile single files (faster)
    // dev: {
    //   files: {
    //     'dist/index.html': ['src/pug/index.pug']
    //   },
    // },
    // dist: {
    //   files: {
    //     'dist/index.html': ['src/pug/index.pug']
    //   },
    // }

    dist: {
      files: [{
        expand: true, // setting to true enables the following options
        cwd: 'src/pug', // src matches are relative to this path
        //src: [',*.pug'],
        src: ['*.pug'], // matches *.pug in cwd and 1 level down
        dest: 'dist', // destination prefix
        ext: '.html' // replace existing extensions with this value
      }]
    },
    dev: {
      options: {
        pretty: true
      },
      files: [{
        expand: true, // setting to true enables the following options
        cwd: 'src/pug', // src matches are relative to this path
        //src: [',*.pug'],
        src: ['*.pug'], // matches *.pug in cwd and 1 level down
        dest: 'dist', // destination prefix
        ext: '.html' // replace existing extensions with this value
      }]
    }
  }
};