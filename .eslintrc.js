module.exports = {
    "plugins": ["sonarjs"],
    "extends": [
        "google",
        "plugin:sonarjs/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 8
    },
    "env": {
        "node": true,
        "es6": true,
    },
    "rules": {
        "indent": [
            "error",
            4,
        ],
        "max-len": [
            "error",
            100,
        ],
        "linebreak-style": "off",
        "no-multi-spaces": [
            "error", {
                "exceptions": {
                    "VariableDeclarator": true,
                }
            }
        ],
        "brace-style": [
            "error",
            "stroustrup",
        ]
    },
    "overrides": [{
        "files": ["test/**/*.js"],
        "rules": {
            "sonarjs/no-identical-functions": "off",
            "no-invalid-this": "off",
        }
    }],
};