const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvti5laoc",
  api_key: "616852622584911",
  api_secret: "_WxqsLcsI_YSPWMN9Nh5s8NvlEA", // Click 'View API Keys' above to copy your API secret
});

const image = "./image/test.webp";

cloudinary.uploader.upload(image).then((msg) => console.log(msg));

// {
//     asset_id: '55b9365aae5fc8407769deb8d5425bcc',
//     public_id: 'pt67nwq5ynpphpetoqbm',
//     version: 1728659530,
//     version_id: 'fa0f8e68e66ad87f6a1bdfafc0f3e61d',
//     signature: '320dfba452df9a5457e1e3cf8a672a91c74dc296',
//     width: 828,
//     height: 466,
//     format: 'webp',
//     resource_type: 'image',
//     created_at: '2024-10-11T15:12:10Z',
//     tags: [],
//     pages: 1,
//     bytes: 96724,
//     type: 'upload',
//     etag: '1edc285c99ddbd9a86aef872b0b92f2a',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/dvti5laoc/image/upload/v1728659530/pt67nwq5ynpphpetoqbm.webp',
//     secure_url: 'https://res.cloudinary.com/dvti5laoc/image/upload/v1728659530/pt67nwq5ynpphpetoqbm.webp',
//     asset_folder: '',
//     display_name: 'pt67nwq5ynpphpetoqbm',
//     original_filename: 'test',
//     api_key: '616852622584911'
//   }
