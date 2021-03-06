export default {
  version: 1,
  fields: [
    { name: "cookieVersion", type: "int", numBits: 6 },
    { name: "created", type: "date", numBits: 36 },
    { name: "lastUpdated", type: "date", numBits: 36 },
    { name: "cmpId", type: "int", numBits: 12 },
    { name: "cmpVersion", type: "int", numBits: 12 },
    { name: "consentScreen", type: "int", numBits: 6 },
    { name: "consentLanguage", type: "6bitchar", numBits: 12 },
    { name: "vendorListVersion", type: "int", numBits: 12 },
    { name: "publisherPurposesVersion", type: "int", numBits: 12 },
    { name: "standardPurposeIdBitString", type: "bits", numBits: 24 },
    { name: "numCustomPurposes", type: "int", numBits: 6 },
    {
      name: "customPurposeIdBitString",
      type: "bits",
      numBits: decodedObject => decodedObject.numCustomPurposes
    }
  ]
};
