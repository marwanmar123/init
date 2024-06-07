const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dgnyzbd6j',
    api_key: '854618649918817',
    api_secret: '1Zf1DHpIVasNMJ5d1eE0tFf6RKU'
});

module.exports = cloudinary;