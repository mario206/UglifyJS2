var fs = require("fs");
var info = require("../package.json");
var path = require("path");
var program = require("commander");
var UglifyJS = require("../tools/node");
var U2 = UglifyJS;

function read_file(path, default_value) {
    try {
        return fs.readFileSync(path, "utf8");
    } catch (ex) {
        if (ex.code == "ENOENT" && default_value != null) return default_value;
        fatal(ex);
    }
}
var str = read_file("./test.js");

var ast = UglifyJS.parse(str);
ast.figure_out_scope();
//ast.expand_names();

var varNodes = [];

ast.walk(new UglifyJS.TreeWalker(function(node) {
    if (node instanceof U2.AST_Var) {
        varNodes.push(node);
    }
}));

for(var i = 0;i < varNodes.length;++i) {
    var varDef = varNodes[i];
    for(var j = 0;j < varDef.definitions.length;++j) {
        var def = varDef.definitions[j];

    }
}

/*console.log(ast);

console.log(ast);
console.log(ast.print_to_string());*/
