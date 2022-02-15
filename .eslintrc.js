// {
//   "env": {
//     "browser": true,
//     "es2021": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:@next/next/recommended",
//     "next/core-web-vitals",
//     "prettier"
//   ],
//   "parserOptions": {
//     "ecmaFeatures": {
//       "jsx": true
//     },
//     "ecmaVersion": 12,
//     "sourceType": "module"
//   },
//   "plugins": [
//     "react",
//     "@next/eslint-plugin-next"
//   ],
//   "rules": {
//     "arrow-body-style": 1,
//     "react/prop-types": 1,
//     "react/display-name": 0,
//     "import/no-unresolved": 2,
//     "react/no-children-prop": 0,
//     "react/self-closing-comp": 2,
//     "react/react-in-jsx-scope": 0,
//     "@next/next/no-img-element": 0,
//     "react/no-unescaped-entities": 0,
//     "import/no-useless-path-segments": 1,
//     "no-unused-vars": [
//       1,
//       {
//         "ignoreRestSiblings": false
//       }
//     ]
//   }
// }
// module.exports = {
//   root: true,
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   env: {
//     browser: true,
//     node: true,
//     es6: true,
//   },
//   settings: {
//     'import/resolver': {
//       node: {
//         paths: ['.', 'components', 'styles'],
//         extensions: ['.js', '.jsx'],
//       },
//     },
//     react: {
//       version: 'detect',
//     },
//   },
//   extends: ['plugin:react/recommended', 'next', 'airbnb', 'prettier'],
//   plugins: ['react', 'prettier'],
//   rules: {
//     'react/react-in-jsx-scope': 'off',
//     'react/prop-types': 'off',
//     'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
//     'react/jsx-props-no-spreading': 'off',
//     '@next/next/no-page-custom-font': 'off',
//     'no-plusplus': 'off',
//   },
// };

module.exports = {
  extends: ['wesbos'],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // 'prettier/prettier': 'off',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.', 'components', 'styles'],
        extensions: ['.js', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  root: true,
};
