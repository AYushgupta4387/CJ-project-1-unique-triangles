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

// FUNCTIONS
sasBtn.addEventListener("click", function () {
  sasContainer.classList.toggle("hidden");

  if (!asaContainer.classList.contains("hidden")) {
    asaContainer.classList.add("hidden");
  }

  if (!sssContainer.classList.contains("hidden")) {
    sssContainer.classList.add("hidden");
  }
});

asaBtn.addEventListener("click", function () {
  asaContainer.classList.toggle("hidden");

  if (!sasContainer.classList.contains("hidden")) {
    sasContainer.classList.add("hidden");
  }

  if (!sssContainer.classList.contains("hidden")) {
    sssContainer.classList.add("hidden");
  }
});

sssBtn.addEventListener("click", function () {
  sssContainer.classList.toggle("hidden");

  if (!asaContainer.classList.contains("hidden")) {
    asaContainer.classList.add("hidden");
  }

  if (!sasContainer.classList.contains("hidden")) {
    sasContainer.classList.add("hidden");
  }
});

const answers = function (a, b, c, x, y, z) {
  document.querySelector(".a").textContent = `First Side (a) = ${a}`;
  document.querySelector(".b").textContent = `Second Side (b) = ${b}`;
  document.querySelector(".c").textContent = `Third Side (c) = ${c}`;
  document.querySelector(".x").textContent = `First Angle (x) = ${x}`;
  document.querySelector(".y").textContent = `Second Angle (y) = ${y}`;
  document.querySelector(".z").textContent = `Third Angle (z) = ${z}`;
};

// LOGIC

// Cosine rule to calculate a side when 2 sides and 1 angle is known
const cosineLawForSide = function (sideA, sideB, angleC) {
  let sideC = Math.sqrt(
    Math.pow(sideA, 2) +
      Math.pow(sideB, 2) -
      2 * sideA * sideB * Math.cos(angleC)
  );
  return sideC;
};

// Cosine rule to calculate an angle when 3 sides are known
// NOTE - This outputs cosine of angle, not the angle in rad.
const cosineLawForAngle = function (sideA, sideB, sideC) {
  let cosineAngleC =
    (Math.pow(sideA, 2) + Math.pow(sideB, 2) - Math.pow(sideC, 2)) /
    (2 * sideA * sideB);

  return cosineAngleC;
};

// Sine rule to calculate an angle
// NOTE - This outputs sine of angle, not the angle in rad.
const sineLawForAngle = function (sideA, sideB, angleB) {
  let sineAngleA = (sideA * Math.sin(angleB)) / sideB;

  return sineAngleA;
};

// Sine rule to calculate a side
const sineLawForSide = function (sideA, angleA, angleB) {
  let sideB = (sideA * Math.sin(angleB)) / Math.sin(angleA);

  return sideB;
};

// SAS
sasSubmit.addEventListener("click", function () {
  // Sides
  let firstSide = Number(document.querySelector(".sas-fs")?.value) || undefined;
  let secondSide =
    Number(document.querySelector(".sas-ss")?.value) || undefined;
  let thirdSide = Number(document.querySelector(".sas-ts")?.value) || undefined;

  // Angles
  let firstAngle =
    (Number(document.querySelector(".sas-fa")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad
  let secondAngle =
    (Number(document.querySelector(".sas-sa")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad
  let thirdAngle =
    (Number(document.querySelector(".sas-ta")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad

  thirdSide = cosineLawForSide(firstSide, secondSide, thirdAngle);

  firstAngle = Math.asin(sineLawForAngle(firstSide, thirdSide, thirdAngle));

  secondAngle = 3.1416 - (firstAngle + thirdAngle);

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
      (firstAngle * 57.296).toFixed(0),
      (secondAngle * 57.296).toFixed(0),
      (thirdAngle * 57.296).toFixed(0)
    );

    let typeOfTriangle1; // isosceles or scalene or equilateral
    let typeOfTriangle2; // acute or obtuse or RHS

    if (
      // This checks if the triangle is isosceles
      firstSide === secondSide ||
      secondSide === thirdSide ||
      firstSide === thirdSide
    ) {
      typeOfTriangle1 = "isosceles";

      if (firstSide === secondSide && firstSide === thirdSide) {
        // This checks if the triangle is equilateral
        typeOfTriangle1 = "equilateral";
      }
    } else {
      typeOfTriangle1 = "scalene";
    }

    if (
      Math.round(firstAngle) == 90 ||
      Math.round(secondAngle) == 90 ||
      Math.round(thirdAngle) == 90
    ) {
      // This checks if the triangle has an angle = 90
      typeOfTriangle2 = "RHS";
    } else if (firstAngle > 90 || secondAngle > 90 || thirdAngle > 90) {
      // This checks if the triangle has an angle > 90
      typeOfTriangle2 = "obtuse";
    } else {
      typeOfTriangle2 = "acute";
    }

    if (typeOfTriangle1 === "equilateral") {
      typeOfTriangle2 = "";
    }

    triangleImage.setAttribute(
      "src",
      `images/${typeOfTriangle2}-${typeOfTriangle1}.png`
    );

    answerContainer.classList.toggle("hidden");
    triangleImageContainer.classList.toggle("hidden");
  } else {
    errorText.classList.toggle("hidden");
  }
});

// ASA
asaSubmit.addEventListener("click", function () {
  // Sides
  let firstSide = Number(document.querySelector(".asa-fs")?.value) || undefined;
  let secondSide =
    Number(document.querySelector(".asa-ss")?.value) || undefined;
  let thirdSide = Number(document.querySelector(".asa-ts")?.value) || undefined;

  // Angles
  let firstAngle =
    (Number(document.querySelector(".asa-fa")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad
  let secondAngle =
    (Number(document.querySelector(".asa-sa")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad
  let thirdAngle =
    (Number(document.querySelector(".asa-ta")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad

  thirdAngle = 3.1416 - (firstAngle + secondAngle);

  firstSide = sineLawForSide(thirdSide, thirdAngle, firstAngle);
  secondSide = sineLawForSide(thirdSide, thirdAngle, secondAngle);

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
      (firstAngle * 57.296).toFixed(0),
      (secondAngle * 57.296).toFixed(0),
      (thirdAngle * 57.296).toFixed(0)
    );

    let typeOfTriangle1; // isosceles or scalene or equilateral
    let typeOfTriangle2; // acute or obtuse or RHS

    if (
      // This checks if the triangle is isosceles
      firstSide === secondSide ||
      secondSide === thirdSide ||
      firstSide === thirdSide
    ) {
      typeOfTriangle1 = "isosceles";

      if (firstSide === secondSide && firstSide === thirdSide) {
        // This checks if the triangle is equilateral
        typeOfTriangle1 = "equilateral";
      }
    } else {
      typeOfTriangle1 = "scalene";
    }

    if (firstAngle === 90 || secondAngle === 90 || thirdAngle === 90) {
      // This checks if the triangle has an angle = 90
      typeOfTriangle2 = "RHS";
    } else if (firstAngle > 90 || secondAngle > 90 || thirdAngle > 90) {
      // This checks if the triangle has an angle > 90
      typeOfTriangle2 = "obtuse";
    } else {
      typeOfTriangle2 = "acute";
    }

    if (typeOfTriangle1 === "equilateral") {
      typeOfTriangle2 = "";
    }

    triangleImage.setAttribute(
      "src",
      `images/${typeOfTriangle2}-${typeOfTriangle1}.png`
    );

    answerContainer.classList.toggle("hidden");
    triangleImageContainer.classList.toggle("hidden");
  } else {
    errorText.classList.toggle("hidden");
  }
});

// SSS
sssSubmit.addEventListener("click", function () {
  // Sides
  let firstSide = Number(document.querySelector(".sss-fs")?.value) || undefined;
  let secondSide =
    Number(document.querySelector(".sss-ss")?.value) || undefined;
  let thirdSide = Number(document.querySelector(".sss-ts")?.value) || undefined;

  // Angles
  let firstAngle =
    (Number(document.querySelector(".sss-fa")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad
  let secondAngle =
    (Number(document.querySelector(".sss-sa")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad
  let thirdAngle =
    (Number(document.querySelector(".sss-ta")?.value) * 3.1416) / 180 ||
    undefined; // Converting deg to Rad

  firstAngle = Math.acos(cosineLawForAngle(secondSide, thirdSide, firstSide));
  secondAngle = Math.acos(cosineLawForAngle(firstSide, thirdSide, secondSide));
  thirdAngle = Math.acos(cosineLawForAngle(secondSide, firstSide, thirdSide));

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
      (firstAngle * 57.296).toFixed(0),
      (secondAngle * 57.296).toFixed(0),
      (thirdAngle * 57.296).toFixed(0)
    );

    let typeOfTriangle1; // isosceles or scalene or equilateral
    let typeOfTriangle2; // acute or obtuse or RHS

    if (
      // This checks if the triangle is isosceles
      firstSide === secondSide ||
      secondSide === thirdSide ||
      firstSide === thirdSide
    ) {
      typeOfTriangle1 = "isosceles";

      if (firstSide === secondSide && firstSide === thirdSide) {
        // This checks if the triangle is equilateral
        typeOfTriangle1 = "equilateral";
      }
    } else {
      typeOfTriangle1 = "scalene";
    }

    if (firstAngle === 90 || secondAngle === 90 || thirdAngle === 90) {
      // This checks if the triangle has an angle = 90
      typeOfTriangle2 = "RHS";
    } else if (firstAngle > 90 || secondAngle > 90 || thirdAngle > 90) {
      // This checks if the triangle has an angle > 90
      typeOfTriangle2 = "obtuse";
    } else {
      typeOfTriangle2 = "acute";
    }

    if (typeOfTriangle1 === "equilateral") {
      typeOfTriangle2 = "";
    }

    triangleImage.setAttribute(
      "src",
      `images/${typeOfTriangle2}-${typeOfTriangle1}.png`
    );

    answerContainer.classList.toggle("hidden");
    triangleImageContainer.classList.toggle("hidden");
  } else {
    errorText.classList.toggle("hidden");
  }
});
