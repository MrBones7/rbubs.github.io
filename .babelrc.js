module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            ">0.25%",
            "not ie 11",
            "not op_mini all"
          ]
        }     
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-transform-runtime',
    {
      "regenerator": true
    }]    
  ],

  "env": {
    "test": {
      "presets": ['@babel/preset-react', ['@babel/preset-env']],
      "plugins": ['@babel/plugin-proposal-export-default-from'],
    },
  },
};
