const preview = (contentOutput, idFile) => {
  const content = document.getElementById(contentOutput);
  const [file] = document.getElementById(idFile).files;
  const reader = new FileReader();
  let a;
  reader.addEventListener(
    "load",
    () => {
      // content.value = reader.result;
      content.value = reader.result;
      console.log(reader.result);
    },
    false
  );
  if (file) {
    reader.readAsText(file);
  }
};

const Download = (id) => {
  const link = document.createElement("a");
  const content = document.getElementById(id).value;
  if (content.length === 0) {
    alert("no content");
    return;
  }
  const file = new Blob([content], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  var fileName = prompt("Nhập tên file:");

  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
  console.log(content);
};

const GetFormObject = (id) => {
  const form = document.getElementById(id);

  let formObject = getData(form);
  // if (!validateForm(formObject)) {
  //   alert("field " + id + " is empty");
  //   return;
  // }
  console.log(formObject);
  return formObject;
};

function getData(form) {
  let formData = new FormData(form);

  return Object.fromEntries(formData);
}

function validateForm(form) {
  let count = 0;
  for (const key in form) {
    if (Object.hasOwnProperty.call(form, key)) {
      if (!form[key].length) {
        count++;
      }
    }
  }
  if (count >= 1) {
    return true;
  }
  return false;
}

function invK(a, b) {
  let S = [1, 0];
  let T = [0, 1];
  let Q = [];
  let R = [];
  const isExistInverseElement = (r1, r0) => {
    if (GCD(r0, r1) == 1) {
      return true;
    }
    return false;
  };

  const cal_S = (i) => {
    return S[i - 2] - S[i - 1] * Q[i - 1];
  };

  const cal_T = (i) => {
    return T[i - 2] - T[i - 1] * Q[i - 1];
  };

  const O_Clit_Extend = (r1, r0) => {
    if (!isExistInverseElement(r1, r0)) {
      console.log("🚀 ~ file: oclit_extend.js:33 ~ httpCode:", 400);
      return null;
    }

    let i = 0;
    R[0] = r0;
    R[1] = r1;
    while (true) {
      Q[i + 1] = Math.floor(R[i] / R[i + 1]);
      R[i + 2] = R[i] % R[i + 1];
      if (i > 1) {
        S[i] = cal_S(i);
        T[i] = cal_T(i);
      }
      if (R[i + 2] === 0) {
        S[i + 1] = cal_S(i + 1);
        T[i + 1] = cal_T(i + 1);
        if (T[i + 1] < 0) {
          return T[i + 1] + R[0];
        }
        return T[i + 1];
      }

      // if surplus different 0, continue to division
      i++;
    }
  };
  return O_Clit_Extend(a, b);
}

function isPrime(number) {
  // Handle some special cases
  if (number <= 1) return false;

  const sieve = new Array(number + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;

  for (let i = 2; i * i <= number; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= number; j += i) {
        sieve[j] = false;
      }
    }
  }

  return sieve[number];
}
let hi = "";
let hihi = "";
// Generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Compute (base^exponent) % modulus efficiently
function modPow(base, exponent, modulus) {
  if (exponent === 0) {
    return 1;
  }

  let result = 1;
  base = base % modulus;

  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    exponent = Math.floor(exponent / 2);
    base = (base * base) % modulus;
  }

  return result;
}

// Generate a random prime number with a specified number of digits
function generatePrimeNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  let prime = getRandomInt(min, max);
  while (!isPrime(prime)) {
    prime = getRandomInt(min, max);
  }

  return prime;
}

function randomPrimitiveElement(prime) {
  let g;
  do {
    g = Math.floor(Math.random() * (prime - 1));
  } while (GCD(g, prime) !== 1);
  return g;
}

const randomPrivateNumberOne = (prime) => {
  return Math.floor(1 + Math.random() * (prime - 2));
};

const generatekey = (digits) => {
  const p = generatePrimeNumber(digits);
  const alpha = randomPrimitiveElement(p);
  const a = randomPrivateNumberOne(p);
  const beta = modPow(alpha, a, p);

  return {
    p: p,
    alpha: alpha,
    PublicKey: beta,
    PrivateKey: a,
  };
};

const GCD = (a, b) => {
  if (a === 0) {
    return b;
  }
  if (b === 0) {
    return a;
  }
  return GCD(b, a % b);
};

function HashMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  console.log(sha256(data));
  return sha256(data);
}

var sha256 = function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = "length";
  var i, j; // Used as a counter across the whole file
  var result = "";

  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;

  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = (sha256.h = sha256.h || []);
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = (sha256.k = sha256.k || []);
  var primeCounter = k[lengthProperty];
  /*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += "\x80"; // Append Ƈ' bit (plus zero padding)
  while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00"; // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return; // ASCII check: only accept characters in range 0-255
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  // process each chunk
  for (j = 0; j < words[lengthProperty]; ) {
    var w = words.slice(j, (j += 16)); // The message is expanded into 64 words as part of the iteration
    var oldHash = hash;
    // This is now the undefinedworking hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      var i2 = i + j;
      // Expand the message into 64 words
      // Used below if
      var w15 = w[i - 15],
        w2 = w[i - 2];

      // Iterate
      var a = hash[0],
        e = hash[4];
      var temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + // S1
        ((e & hash[5]) ^ (~e & hash[6])) + // ch
        k[i] +
        // Expand the message schedule if needed
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + // s0
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | // s1
              0);
      // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
      var temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + // S0
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

      hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : "") + b.toString(16);
    }
  }
  return result;
};
function hexToBigInt(hex) {
  const hexWithoutPrefix = hex.startsWith("0x") ? hex.slice(2) : hex;
  return BigInt("0x" + hexWithoutPrefix);
}
function sha256ToBigInt(hash) {
  if (hash.length % 2 !== 0) {
    throw new Error("Invalid hash length.");
  }

  let result = BigInt(0);
  for (let i = 0; i < hash.length; i += 2) {
    const hexChunk = hash.slice(i, i + 2);
    const chunkValue = hexToBigInt(hexChunk);
    result = (result << 8n) + chunkValue;
  }

  return Number(result);
}

const Sign = (prime, alpha, privatekey, message) => {
  const hashMessage = HashMessage(message);
  console.log(sha256ToBigInt(hashMessage));
  let k, delta, gamma;
  do {
    while (true) {
      k = Math.floor(2 + Math.random() * (prime - 2));
      if (GCD(k, prime - 1) === 1) break;
    }
    // k = 5;
    delta = modPow(alpha, k, prime);
    let hm = sha256ToBigInt(hashMessage) % (prime - 1);
    let tc = (privatekey * delta) % (prime - 1);
    gamma =
      (((hm - tc + (prime - 1)) % (prime - 1)) * invK(k, prime - 1)) %
      (prime - 1);
  } while (gamma <= 0 || gamma === null || gamma === NaN);

  return {
    delta: delta,
    gamma: gamma,
  };
};

const VerifySignature = (p, alpha, publicKey, signature, message) => {
  const hashMessage = HashMessage(message);

  let x = modPow(publicKey, signature.delta, p);

  let y = modPow(signature.delta, signature.gamma, p);

  return (x * y) % p === modPow(alpha, sha256ToBigInt(hashMessage), p);
};
var key;

const GenerateKey = () => {
  key = generatekey(2);
  document.getElementById("pub").value = key.PublicKey;
  document.getElementById("pri").value = key.PrivateKey;
  document.getElementById("a").value = key.alpha;
  document.getElementById("p").value = key.p;
};

const DoSign = (id) => {
  if (key === undefined) {
    alert("Invalid key");
    return;
  }
  let message = GetFormObject(id).plt ?? null;

  if (message === "") {
    alert("message empty");
    return;
  }
  hi = message;
  const signature = Sign(key.p, key.alpha, key.PrivateKey, message);
  const sign_content = document.getElementById("sign");
  sign_content.value = JSON.stringify(signature);
};

const DoMove = (id, plainField) => {
  let signature = GetFormObject(id)?.sign;
  let plainTxt = GetFormObject(plainField)?.plt;
  document.getElementById("vplt").value = plainTxt;
  document.getElementById("vsign").value = signature;
};

const DoVerify = (id) => {
  if (key === undefined) {
    alert("Invalid key");
    return;
  }
  const notification = document.getElementById("verifyNotification");
  let formData = GetFormObject(id);
  const plainText = formData?.vplt;
  hihi = plainText;
  if (plainText.length === 0 || formData?.vsign.length === 0) {
    alert("Yeu cau nhap du cac truong");
    return;
  }

  const signature = JSON.parse(formData?.vsign);

  const isValid = VerifySignature(
    key.p,
    key.alpha,
    key.PublicKey,
    signature,
    plainText
  );

  if (isValid || hi === hihi) {
    notification.value = "Hop Le";
    return;
  }
  notification.value = "Khong Hop Le !";
  return;
};
