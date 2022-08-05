const axios = require('axios');

export const postJSONBody = async (api, secret, name, artist, image, width) => {
    const JSONBody = {
      name: name,
      image:image, 
      artist:artist,
      width:width
    };
    const params = {
      headers: {
        'pinata_api_key': api,
        'pinata_secret_api_key': secret
      }
    };
  
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    return axios.post(url, JSONBody, params)
      .catch((err) => {
        console.log(err)
      });
  }

  export default postJSONBody;