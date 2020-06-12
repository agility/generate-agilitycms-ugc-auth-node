const sha1 = require('sha1');

const UGCCREDENTIALS = {
    key: "XXXXXXX-XXXXX-XXXX-XXXX-XXXXXXX",
    pass: "XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX"
}
const generateUGSettings = (UGCCREDENTIALS) => {
    // SHA 1 of Seconds.ProfileID.SecretKey.AccessKey.Random
    const jan12001 = new Date("Jan 1 2001");
    const now = new Date();
    const msecondsSinceJan12001 = now.getTime() - jan12001.getTime();
    const secondsSinceJan12001 = Math.round(msecondsSinceJan12001 / 1000);
    const random = Math.floor((Math.random() * 1000));
    return {
        'Url': 'https://ugc-ca.agilitycms.com/Agility-UGC-API-JSONP.svc',
        'AccessKey': UGCCREDENTIALS.key, //the website API Access Key provided to you
        'Seconds': secondsSinceJan12001, //is the number of seconds that have elapsed since Jan 1/2001.
        'RandomNumber': random, //just a random number between 1-1000
        'ProfileRecordID': '-1', //the profile record ID of the logged-in website user, -1 is anonymous
        'AccessHash': sha1(`${secondsSinceJan12001}.-1.${UGCCREDENTIALS.pass}.${UGCCREDENTIALS.key}.${random}`)  //The SHA hash of all the above variables (Seconds.ProfileID.SecretKey.AccessKey.Random)
    };
}

console.log(generateUGSettings(UGCCREDENTIALS));