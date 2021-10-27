"use stirct";

// VARIABLES
const sasBtn = document.querySelector(".sas");
const asaBtn = document.querySelector(".asa");
const sssBtn = document.querySelector(".sss");

const sasContainer = document.querySelector(".sas-container");
const asaContainer = document.querySelector(".asa-container");
const sssContainer = document.querySelector(".sss-container");

const sasSubmit = document.querySelector(".sas-submit");
const asaSubmit = document.querySelector(".asa-submit");
const sssSubmit = document.querySelector(".sss-submit");

const answerContainer = document.querySelector(".final-answer-container");
const triangleImageContainer = document.querySelector(".image-container");
const triangleImage = document.querySelector(".image");
const errorText = document.querySelector(".error-text");
const triangleType = document.querySelector(".triangle-type");

let firstSide;
let secondSide;
let thirdSide;
let firstAngle;
let secondAngle;
let thirdAngle;

let firstAngleInDeg;
let secondAngleInDeg;
let thirdAngleInDeg;

// FUNCTIONS
function hideResult() {
  // This hides the results, if someone switches from one triangle input type to another (eg - from SAS to ASA)
  if (!answerContainer.classList.contains("hidden")) {
    answerContainer.classList.add("hidden");
    triangleImageContainer.classList.add("hidden");
  }

  errorText.classList.add("hidden");
}

function hideContainer(containerType) {
  // This hides other containers, once a container is clicked
  if (!containerType.classList.contains("hidden")) {
    containerType.classList.add("hidden");
  }
}

function answers(a, b, c, x, y, z) {
  document.querySelector(".a").textContent = a;
  document.querySelector(".b").textContent = b;
  document.querySelector(".c").textContent = c;
  document.querySelector(".x").textContent = x;
  document.querySelector(".y").textContent = y;
  document.querySelector(".z").textContent = z;
}

// Cosine rule to calculate a side when 2 sides and 1 angle is known
function cosineLawForSide(sideA, sideB, angleC) {
  let sideC = Math.sqrt(
    Math.pow(sideA, 2) +
      Math.pow(sideB, 2) -
      2 * sideA * sideB * Math.cos(angleC)
  );
  return sideC;
}

// Cosine rule to calculate an angle when 3 sides are known
// NOTE - This outputs cosine of angle, not the angle in rad.
function cosineLawForAngle(sideA, sideB, sideC) {
  let cosineAngleC =
    (Math.pow(sideA, 2) + Math.pow(sideB, 2) - Math.pow(sideC, 2)) /
    (2 * sideA * sideB);

  return cosineAngleC;
}

// Sine rule to calculate an angle
// NOTE - This outputs sine of angle, not the angle in rad.
function sineLawForAngle(sideA, sideB, angleB) {
  let sineAngleA = (sideA * Math.sin(angleB)) / sideB;

  return sineAngleA;
}

// Sine rule to calculate a side
function sineLawForSide(sideA, angleA, angleB) {
  let sideB = (sideA * Math.sin(angleB)) / Math.sin(angleA);

  return sideB;
}

function calculateGivenParameters(fs, ss, ts, fa, sa, ta) {
  // Sides
  firstSide = Number(document.querySelector(fs)?.value) || undefined;
  secondSide = Number(document.querySelector(ss)?.value) || undefined;
  thirdSide = Number(document.querySelector(ts)?.value) || undefined;

  // Angles
  firstAngle =
    (Number(document.querySelector(fa)?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  secondAngle =
    (Number(document.querySelector(sa)?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  thirdAngle =
    (Number(document.querySelector(ta)?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
}

function calculateResults() {
  if (
    // This checks the basic property of the triangle
    firstSide + secondSide > thirdSide &&
    secondSide + thirdSide > firstSide &&
    firstSide + thirdSide > secondSide
  ) {
    answers(
      firstSide.toFixed(2),
      secondSide.toFixed(2),
      thirdSide.toFixed(2),
      firstAngleInDeg,
      secondAngleInDeg,
      thirdAngleInDeg
    );

    let typeOfTriangle1; // isosceles or scalene or equilateral
    let typeOfTriangle2; // acute or obtuse or RHS

    if (
      // This checks if the triangle is isosceles
      firstSide == secondSide ||
      secondSide == thirdSide ||
      firstSide == thirdSide
    ) {
      typeOfTriangle1 = "isosceles";

      if (firstSide == secondSide && firstSide == thirdSide) {
        // This checks if the triangle is equilateral
        typeOfTriangle1 = "equilateral";
      }
    } else {
      typeOfTriangle1 = "scalene";
    }

    if (
      firstAngleInDeg == 90 ||
      secondAngleInDeg == 90 ||
      thirdAngleInDeg == 90
    ) {
      // This checks if the triangle has an angle = 90
      typeOfTriangle2 = "RHS";
    } else if (
      firstAngleInDeg > 90 ||
      secondAngleInDeg > 90 ||
      thirdAngleInDeg > 90
    ) {
      // This checks if the triangle has an angle > 90
      typeOfTriangle2 = "obtuse";
    } else {
      typeOfTriangle2 = "acute";
    }

    if (typeOfTriangle1 == "equilateral") {
      typeOfTriangle2 = "";
    }

    triangleType.textContent = `${typeOfTriangle2} ${typeOfTriangle1}`;

    triangleImage.setAttribute(
      "src",
      `images/${typeOfTriangle2}-${typeOfTriangle1}.png`
    );

    answerContainer.classList.remove("hidden");
    triangleImageContainer.classList.remove("hidden");

    if (!errorText.classList.contains("hidden")) {
      errorText.classList.add("hidden");
    }
  } else {
    errorText.classList.remove("hidden");
    answerContainer.classList.add("hidden");
    triangleImageContainer.classList.add("hidden");
  }
}

function calculateAnglesInDeg() {
  firstAngleInDeg = (firstAngle * 57.296).toFixed(0);
  secondAngleInDeg = (secondAngle * 57.296).toFixed(0);
  thirdAngleInDeg = (thirdAngle * 57.296).toFixed(0);
}

// LOGIC
sasBtn.addEventListener("click", function () {
  hideResult();

  sasContainer.classList.toggle("hidden");

  hideContainer(asaContainer);
  hideContainer(sssContainer);
});

asaBtn.addEventListener("click", function () {
  hideResult();

  asaContainer.classList.toggle("hidden");

  hideContainer(sasContainer);
  hideContainer(sssContainer);
});

sssBtn.addEventListener("click", function () {
  hideResult();

  sssContainer.classList.toggle("hidden");

  hideContainer(asaContainer);
  hideContainer(sasContainer);
});

// SAS
sasSubmit.addEventListener("click", function () {
  calculateGivenParameters(
    ".sas-fs",
    ".sas-ss",
    ".sas-ts",
    ".sas-fa",
    ".sas-sa",
    ".sas-ta"
  );

  thirdSide = cosineLawForSide(firstSide, secondSide, thirdAngle);

  firstAngle = Math.asin(sineLawForAngle(firstSide, thirdSide, thirdAngle));

  secondAngle = 3.1416 - (firstAngle + thirdAngle);

  calculateAnglesInDeg();

  calculateResults();
});

// ASA
asaSubmit.addEventListener("click", function () {
  calculateGivenParameters(
    ".asa-fs",
    ".asa-ss",
    ".asa-ts",
    ".asa-fa",
    ".asa-sa",
    ".asa-ta"
  );

  thirdAngle = 3.1416 - (firstAngle + secondAngle);

  firstSide = sineLawForSide(thirdSide, thirdAngle, firstAngle);
  secondSide = sineLawForSide(thirdSide, thirdAngle, secondAngle);

  calculateAnglesInDeg();

  calculateResults();
});

// SSS
sssSubmit.addEventListener("click", function () {
  calculateGivenParameters(
    ".sss-fs",
    ".sss-ss",
    ".sss-ts",
    ".sss-fa",
    ".sss-sa",
    ".sss-ta"
  );

  firstAngle = Math.acos(cosineLawForAngle(secondSide, thirdSide, firstSide));
  secondAngle = Math.acos(cosineLawForAngle(firstSide, thirdSide, secondSide));
  thirdAngle = Math.acos(cosineLawForAngle(secondSide, firstSide, thirdSide));

  calculateAnglesInDeg();

  calculateResults();
});
