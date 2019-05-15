// 包装函数
module.exports = function(grunt) {
    
    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        // 获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        
        // uglify插件的配置信息(压缩js)
        uglify: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %>-<%= pkg.version %>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            // 按原文件结构压缩js文件夹内所有js文件
            // buildall: {
            //     files: [{
            //         expand: true,
            //         cwd:'src/js',//js目录下
            //         src:'*.js',//所有js文件
            //         dest:'build/',//输出到此目录下
            //         ext: '.min.js',
            //     }],
            // },
            build: {//压缩合并后的js
                src: 'dist/*.js',
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js.min.js'
            },
        },
        // 压缩css
        cssmin:{
            options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            buildall: {
                files: [{
                    expand: true,
                    cwd:'src/css',//css目录下
                    src:'*.css',//所有css文件
                    dest:'build/',//输出到此目录下
                    ext: '.min.css'
                }],
            },
        },
        // jshint插件的配置信息
        jshint:{
            build: ['Gruntfile.js','src/js/*.js'],
            options: {
                jshintrc: '.jshintrc'
            },
        },
        // csslint插件的配置信息
        csslint:{
            build: ['src/css/*.css'],
            options: {
                csslintrc: '.csslintrc'
            },
        },
        // 合并
        concat: {
            options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */'
            },
            css: {
              // 源文件，数组，
                src: ['src/css/*.css'],
                // 目标文件, pkg.name 是定义在 package.json 文件中的 name
                dest: 'dist/<%= pkg.name %>.css'
            },
            js: { 
                options: {
                  // js 文件合并用 ';'分隔
                  separator: ';',
                 },
                src: ['src/js/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
        },
        // watch自动化
        watch:{
            build:{
                files:['src/js/*.js','src/css/*.css'],
                tasks:['jshint','csslint','cssmin','concat','uglify'],
                options:{
                    spawn:false,
                },
            },
        },
        
    });
    
    // 告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
    grunt.registerTask('default',['csslint','cssmin','jshint','concat','uglify','watch']);
};
