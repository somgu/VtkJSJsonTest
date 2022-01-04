module.exports = {
   parser: "babel-eslint",
   env: {
      es6: true,
      node: true,
      browser: true,
   },
   parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
         jsx: true,
      },
   },
   extends: [
      "airbnb",
      "prettier",
      "eslint:recommended",
      "plugin:prettier/recommended",
   ],
   "settings": {
      "import/resolver": {
         "node": {
            "paths": [
               "."
            ],
            "extensions": [
               ".js",
               ".jsx"
            ]
         }
      }
   },
   plugins: ["react", "prettier", "react-hooks"],
   rules: {
      "react/jsx-filename-extension": [
         "error",
         {
            extensions: [".js", ".jsx"],
         },
      ],
      "import/no-unresolved": [2, { caseSensitive: true }],
      indent: ["error", 3, { SwitchCase: 1 }],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      "space-before-function-paren": [0],
      "key-spacing": [0],
      "quote-props": 0,
      "no-console": 0,
      "new-cap": [0],
      "no-multi-spaces": [0],
      "no-shadow": [0],
      "no-unused-vars": [1],
      "no-use-before-define": [2, "nofunc"],
      "no-empty": [0],
      camelcase: [0],
      "no-plusplus": [0],
      "no-underscore-dangle": [0],
      "dot-notation": [0],
      "no-template-curly-in-string": [1],
      "consistent-return": [1],
      "import/no-duplicates": [1],
      "import/prefer-default-export": [1],
      "class-methods-use-this": [0],
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
      "default-case": ["error", { commentPattern: "^skip\\sdefault" }],
      "react/self-closing-comp": [
         "error",
         {
            component: true,
            html: true,
         },
      ],
      "prettier/prettier": [
         "error",
         {
            endOfLine: "auto",
         },
      ],
      "jsx-a11y/anchor-is-valid": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": "off",
      "react/destructuring-assignment": "off",
      "react/jsx-curly-brace-presence": "off",
   },
};
