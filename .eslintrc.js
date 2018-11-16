module.exports = {
    
        "rules": {
        "array-bracket-spacing": [2, "never"],
        "block-spacing": [2, "always"],
        "brace-style": [2, "stroustrup", {"allowSingleLine": true}],
        "comma-spacing": 2,
        "curly": 2,
        "eqeqeq": 2,
        "guard-for-in": 2,
        "indent": [2, "tab", {"SwitchCase": 1}],
        "key-spacing": [1, {"beforeColon": false, "afterColon": true, "mode": "minimum"}],
        "linebreak-style": [2, "unix"],
        "new-cap": 2,
        "no-caller": 2,
        "no-console": 0,
        "no-eval": 2,
        "no-multiple-empty-lines": [1, {"max": 1}],
        "no-trailing-spaces": 2,
        "no-use-before-define": [2, "nofunc"],
        "object-curly-spacing": 2,
        "one-var": [2, "never"],
        "quotes": [2, "single"],
        "semi": [2, "always"],
        "space-before-blocks": 2,
        "space-before-function-paren": [2, "always"],
        "space-in-parens": 2,
        "space-infix-ops": 2,
        "space-unary-ops": 2,
        "strict": [2, "function"],
        "wrap-iife": 2,
        "yoda": 2
        },
        "parserOptions": {
            "ecmaVersion": 6
        },
        "env": {
        "browser": true,
        "jquery": true,
        "node": true,
            "amd": true
        },
        "extends": "eslint:recommended",
        "globals": {
        "requirejs": true
        }
        
};