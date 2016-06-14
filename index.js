/*!
 * Permissive JSON parser
 * (c) 2016 Lapo Luchini <lapo@lapo.it>
 *
 * I find there "relaxed rules" very useful for manually edited JSON configuration files.
 */
/*jshint node: true, strict: true, globalstrict: true, indent: 4, immed: true, undef: true, sub: true, newcap: false */
'use strict';

var fs = require('fs'),
    pjson = {};

pjson.parse = function (str) {
    return JSON.parse(
        str
        .replace(/^\uFEFF/, '') // remove leading BOM
        .replace(/^((?:[^"\n\/]|\/[^\/]|"[^"\n]*")*)\/\/.*$/mg, '$1') // remove C-style comments
        .replace(/,(\s*[}])/g, '$1') // remove extra commas
    );
};

pjson.string = function (obj) {
    return '\uFEFF' + JSON.stringify(obj, null, 4) + '\n';
};

module.exports = pjson;
