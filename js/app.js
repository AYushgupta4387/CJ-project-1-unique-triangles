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

// FUNCTIONS
sasBtn.addEventListener("click", function () {
  if (!answerContainer.classList.contains("hidden")) {
    answerContainer.classList.add("hidden");
    triangleImageContainer.classList.add("hidden");
  }

  sasContainer.classList.toggle("hidden");

  if (!asaContainer.classList.contains("hidden")) {
    asaContainer.classList.add("hidden");
  }

  if (!sssContainer.classList.contains("hidden")) {
    sssContainer.classList.add("hidden");
  }
});

asaBtn.addEventListener("click", function () {
  if (!answerContainer.classList.contains("hidden")) {
    answerContainer.classList.add("hidden");
    triangleImageContainer.classList.add("hidden");
  }

  asaContainer.classList.toggle("hidden");

  if (!sasContainer.classList.contains("hidden")) {
    sasContainer.classList.add("hidden");
  }

  if (!sssContainer.classList.contains("hidden")) {
    sssContainer.classList.add("hidden");
  }
});

sssBtn.addEventListener("click", function () {
  if (!answerContainer.classList.contains("hidden")) {
    answerContainer.classList.add("hidden");
    triangleImageContainer.classList.add("hidden");
  }

  sssContainer.classList.toggle("hidden");

  if (!asaContainer.classList.contains("hidden")) {
    asaContainer.classList.add("hidden");
  }

  if (!sasContainer.classList.contains("hidden")) {
    sasContainer.classList.add("hidden");
  }
});

const answers = function (a, b, c, x, y, z) {
  document.querySelector(".a").textContent = a;
  document.querySelector(".b").textContent = b;
  document.querySelector(".c").textContent = c;
  document.querySelector(".x").textContent = x;
  document.querySelector(".y").textContent = y;
  document.querySelector(".z").textContent = z;
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

  let firstAngleInDeg = (firstAngle * 57.296).toFixed(0);
  let secondAngleInDeg = (secondAngle * 57.296).toFixed(0);
  let thirdAngleInDeg = (thirdAngle * 57.296).toFixed(0);

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
      Math.round(firstAngleInDeg) == 90 ||
      Math.round(secondAngleInDeg) == 90 ||
      Math.round(thirdAngleInDeg) == 90
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

  let firstAngleInDeg = (firstAngle * 57.296).toFixed(0);
  let secondAngleInDeg = (secondAngle * 57.296).toFixed(0);
  let thirdAngleInDeg = (thirdAngle * 57.296).toFixed(0);

  console.log(firstAngleInDeg);
  console.log(secondAngleInDeg);
  console.log(thirdAngleInDeg);

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

  let firstAngleInDeg = (firstAngle * 57.296).toFixed(0);
  let secondAngleInDeg = (secondAngle * 57.296).toFixed(0);
  let thirdAngleInDeg = (thirdAngle * 57.296).toFixed(0);

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
});
