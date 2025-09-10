const fs = require('fs');

function convertToDecimal(value, base) {
  return parseInt(value, base);
}

function multiplyPolynomials(poly1, poly2) {
  const result = new Array(poly1.length + poly2.length - 1).fill(0);
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) {
      result[i + j] += poly1[i] * poly2[j];
    }
  }
  return result;
}

function findCoefficients(input) {
  const n = input.keys.n;
  const k = input.keys.k;

  let roots = [];
  for (let i = 1; i <= n; i++) {
    if (!input[i]) continue;
    const base = parseInt(input[i].base);
    const value = input[i].value.toLowerCase();
    const decimalValue = convertToDecimal(value, base);
    roots.push(decimalValue);
  }

  roots = roots.slice(0, k);

  let poly = [1];

  for (const r of roots) {
    poly = multiplyPolynomials(poly, [-r, 1]);
  }

  // The constant term is the first element (without reversing)
  return poly[0];
}

const filename = process.argv[2];
if (!filename) {
  console.error("Please provide input JSON filename as argument.");
  process.exit(1);
}

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    process.exit(1);
  }
  try {
    const jsonInput = JSON.parse(data);
    const constant = findCoefficients(jsonInput);
    console.log(constant); 
  } catch (e) {
    console.error("Invalid JSON format:", e);
    process.exit(1);
  }
});
