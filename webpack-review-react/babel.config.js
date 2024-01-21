module.exports = {
    plugins: [],
    presets: [
        ["@babel/preset-react", {
            corejs: 3,
            useBuiltIns: 'usage',
        }],
        ["@babel/preset-typescript", {
            corejs: 3,
            useBuiltIns: 'usage',
        }],
        // ["@babel/preset-env", {
        //     corejs: 3,
        //     useBuiltIns: 'usage',
        // }]
    ]
}