import CryptoJS from "crypto-js";
import RSAKey from "react-native-rsa";

let kyhex = generateKey();
let ivhex = generateKey();
const dft = {
  ky: CryptoJS.enc.Hex.parse(kyhex),
  iv: CryptoJS.enc.Hex.parse(ivhex)
};
const pkm =
  "8f96c4260e5623e6da46d8ddb9819fe6322b4ad647c5837071fa003d58fce4488f09dd0fe2e82a2b48c654c21dbca7e520df00fde5abc95896995a4bebc3aaa43c67a58975ef5d8a7740885cccee62cc8f48ebf104ec4cc1ce3b0f2ee4c26292a79b50bcf49c143b5cb3510a0e9277c38d0737c50cb73f3ca1f886f558c3c30ae401e6d39726e6313953ea9ba3de8e5582e0bcdcf679d153c5c8671500cd9da1417dcd67ab07fdb7e10b90f5059964989bd22b0586ea8ac8ddd76cd64392ff1735bb89b78dbccf081a366c48ef7f94b57253df63121ab9e23a0c9fb34a286591608248d4a5c4f286ad3250484a58283f9e9ad5c079f23579cd11946963907c81";
const pke = "10001";
let s = Object.assign({}, dft);

const Security = {
  encG: function(data) {
    const RK = localStorage.getItem("RK");
    if (typeof data === "object") {
      data = Object.assign(
        {},
        data,
        {
          rk: RK || "guest"
        } || {}
      );
      s = Object.assign({}, dft, data);
    }
    refreshKey();

    let encrypted = encrypt(JSON.stringify(data));
    //console.log("src : " + encrypted);
    //let decrypted = decrypt(encrypted);
    //console.log("det : " + decrypted);

    return data
      ? {
          p1: encrypted.toString(),
          p2: encrypt2(kyhex + "," + ivhex),
          p3: encrypt3(RK || "guest")
        }
      : data;
  },
  encP: function(data) {
    const RK = localStorage.getItem("RK");
    if (typeof data === "object") {
      data = Object.assign(
        {},
        data,
        {
          rk: RK || "guest"
        } || {}
      );
      s = Object.assign({}, dft, data);
    }
    refreshKey();

    let encrypted = encrypt(JSON.stringify(data));
    //console.log("src : " + encrypted);
    //let decrypted = decrypt(encrypted);
    //console.log("det : " + decrypted);

    var bodyFormData = new FormData();
    bodyFormData.set("p1", encrypted.toString());
    bodyFormData.set("p2", encrypt2(kyhex + "," + ivhex));
    bodyFormData.set("p3", encrypt3(RK || "guest"));
    //console.log("data", data);
    //console.log("bodyFormData", bodyFormData);
    return data ? bodyFormData : data;
  }
};

function encrypt(data) {
  let padData = padString(data);
  let encrypted = CryptoJS.AES.encrypt(padData, s.ky, {
    iv: s.iv,
    padding: CryptoJS.pad.NoPadding,
    mode: CryptoJS.mode.CBC
  });
  return encrypted;
}

function encrypt2(value) {
  const PKM2 = localStorage.getItem("PKM2");
  const PKE2 = localStorage.getItem("PKE2");
  if (PKM2) {
    var rsa = new RSAKey();
    rsa.setPublic(PKM2, PKE2);
    return rsa.encrypt(value);
  } else {
    return encrypt3(value);
  }
}

function encrypt3(value) {
  var rsa = new RSAKey();
  rsa.setPublic(pkm, pke);
  return rsa.encrypt(value);
}
/*
function decrypt(encrypted_str) {
  var decrypted = CryptoJS.AES.decrypt(encrypted_str, s.ky, {
    iv: s.iv,
    padding: CryptoJS.pad.NoPadding,
    mode: CryptoJS.mode.CBC
  });
  // app.log("Dncrypted: " + decrypted.toString(CryptoJS.enc.Utf8));
  return decrypted.toString(CryptoJS.enc.Utf8);
}
*/

function refreshKey() {
  kyhex = generateKey();
  ivhex = generateKey();
  s.ky = CryptoJS.enc.Hex.parse(kyhex);
  s.iv = CryptoJS.enc.Hex.parse(ivhex);
}

function generateKey() {
  var result = "";
  for (var i = 0; i < 8; i++) {
    result += Math.random()
      .toString(16)
      .slice(2, 6);
  }
  return result;
}

function padString(source) {
  var paddingChar = " ";
  var size = 16;
  var stringByteLength = (function(s, b, i, c) {
    for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    return b;
  })(source);
  // console.log("length : " + stringByteLength);
  var x = stringByteLength % size;
  var padLength = size - x;
  for (var i = 0; i < padLength; i++) {
    source += paddingChar;
  }
  return source;
}

export default Security;
