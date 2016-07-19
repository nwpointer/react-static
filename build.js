'use strict'

const path = require('path');
const chokidar = require('chokidar');
const exec = require('child_process').exec;
const filesystem = require("fs");
const staticReact = './node_modules/static-react/bin/static-react.js';
const outDirectory = './static';
const pagesDirectory= './pages';
const componentsDirectory= './components';

const pageWatcher = chokidar.watch(pagesDirectory);
const componentsWatcher = chokidar.watch(componentsDirectory);

const _getAllFilesFromFolder = function(dir) {

    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);

    });

    return results;

};

const render = (p)=>{
	let filename = path.basename(p, '.js');
	let destination = `${outDirectory}/${filename}.html`
	let cmd = `${staticReact} ${p} > ${destination} --no-doctype`
	console.log(cmd)
	exec(cmd)
}

pageWatcher
	.on('change', render)

componentsWatcher
	.on('change', p=>{
		_getAllFilesFromFolder(pagesDirectory).forEach(render)
	})

console.log('watching...')