const getTextContent = (money: number, state: string): string => {
  return state === "ADD" ? `+${money}` : `-${money}`;
};

export const CreateEffect = (
  bodyRef: any,
  money: number,
  state: string,
  x: string,
  y: string
) => {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  styleElement.sheet &&
    styleElement.sheet.insertRule(
      "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
      0
    );

  const newDiv = document.createElement("div");
  newDiv.textContent = getTextContent(money, state);
  newDiv.style.backgroundImage = "url('image/dollar-symbol.png')";
  newDiv.style.backgroundRepeat = "no-repeat";
  newDiv.style.backgroundPosition = "center";
  newDiv.style.fontSize = "30px";
  newDiv.style.paddingLeft = "30px";
  newDiv.style.display = "flex";
  newDiv.style.justifyContent = "center";
  newDiv.style.alignItems = "center";
  newDiv.style.backgroundSize = "cover";
  newDiv.style.width = "50px";
  newDiv.style.height = "50px";
  newDiv.style.position = "absolute";
  newDiv.style.left = x;
  newDiv.style.top = y;
  newDiv.style.color = state === "ADD" ? "#22ff00" : "red";
  newDiv.className =
    "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

  bodyRef.current && bodyRef.current.appendChild(newDiv);
  const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

  return () => clearTimeout(interval);
};

export const CreateEffectForMine = (
  bodyRef: any,
  state: string,
  x: string,
  y: string
) => {
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  styleElement.sheet &&
    styleElement.sheet.insertRule(
      "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-200px);}}",
      0
    );

  const newDiv = document.createElement("div");
  newDiv.style.backgroundImage = "url('image/dollar.png')";
  newDiv.style.backgroundRepeat = "no-repeat";
  newDiv.style.backgroundPosition = "center";
  newDiv.style.display = "flex";
  newDiv.style.justifyContent = "center";
  newDiv.style.alignItems = "center";
  newDiv.style.backgroundSize = "cover";
  newDiv.style.width = "30px";
  newDiv.style.height = "30px";
  newDiv.style.position = "absolute";
  newDiv.style.left = x;
  newDiv.style.top = y;
  newDiv.style.color = state === "ADD" ? "#22ff00" : "red";
  newDiv.className =
    "dynamic-div animate-fadeouttoprightmine transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

  bodyRef.current && bodyRef.current.appendChild(newDiv);
  const interval = setTimeout(() => newDiv && newDiv.remove(), 700);

  return () => clearTimeout(interval);
};
