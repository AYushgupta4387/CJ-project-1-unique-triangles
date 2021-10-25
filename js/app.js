"use stirct";

// sin(x)/a = sin(y)/b = sin(z)/c
// b = (a*sin(y))/sin(x))
// c = (a*sin(z))/sin(x))

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

// SAS
sasSubmit.addEventListener("click", function () {
  // Sides
  let firstSide = Number(document.querySelector(".fs").value) || undefined;
  let secondSide = Number(document.querySelector(".ss").value) || undefined;
  let thirdSide = Number(document.querySelector(".ts").value) || undefined;

  // Angles
  let firstAngle =
    (Number(document.querySelector(".fa")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  let secondAngle =
    (Number(document.querySelector(".sa")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  let thirdAngle =
    (Number(document.querySelector(".ta")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad

  thirdSide = cosineLawForSide(firstSide, secondSide, thirdAngle);

  firstAngle = Math.asin(sineLawForAngle(firstSide, thirdSide, thirdAngle));

  secondAngle = 3.1416 - (firstAngle + thirdAngle);

  document.querySelector(".answer-text").textContent = `a:${firstSide}
  b:${secondSide}
  c:${thirdSide}
  x:${Math.round(firstAngle * 57.296)}
  y:${Math.round(secondAngle * 57.296)}
  z:${Math.round(thirdAngle * 57.296)}`;
});

// ASA
asaSubmit.addEventListener("click", function () {
  // Sides
  let FirstSide = Number(document.querySelector(".fs").value) || undefined;
  let SecondSide = Number(document.querySelector(".ss").value) || undefined;
  let ThirdSide = Number(document.querySelector(".ts").value) || undefined;

  // Angles
  let FirstAngle =
    (Number(document.querySelector(".fa")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  let SecondAngle =
    (Number(document.querySelector(".sa")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  let ThirdAngle =
    (Number(document.querySelector(".ta")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
});

// SSS
sssSubmit.addEventListener("click", function () {
  // Sides
  let firstSide = Number(document.querySelector(".fs").value) || undefined;
  let secondSide = Number(document.querySelector(".ss").value) || undefined;
  let thirdSide = Number(document.querySelector(".ts").value) || undefined;

  console.log(firstSide);
  console.log(secondSide);
  console.log(thirdSide);

  // Angles
  let firstAngle =
    (Number(document.querySelector(".fa")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  let secondAngle =
    (Number(document.querySelector(".sa")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad
  let thirdAngle =
    (Number(document.querySelector(".ta")?.value) * 3.1416) / 180 || undefined; // Converting deg to Rad

  firstAngle = cosineLawForAngle(secondSide, thirdSide, firstSide);
  secondAngle = cosineLawForAngle(firstSide, thirdSide, secondSide);
  thirdAngle = cosineLawForAngle(secondSide, firstSide, thirdSide);

  document.querySelector(".answer-text").textContent = `a:${firstSide}
  b:${secondSide}
  c:${thirdSide}
  x:${Math.round(firstAngle * 57.296)}
  y:${Math.round(secondAngle * 57.296)}
  z:${Math.round(thirdAngle * 57.296)}`;
});
