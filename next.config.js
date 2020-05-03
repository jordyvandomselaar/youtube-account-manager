const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');

const plugins = [
    withFonts
];

const nextConfiguration = {

};

module.exports = withPlugins([...plugins], nextConfiguration);
