import "./css/index.css"

const ccBgColor01 = document.querySelector(
  "#app > section > div.cc-bg > svg > g > g:nth-child(1) > path"
)

const ccBgColor02 = document.querySelector(
  "#app > section > div.cc-bg > svg > g > g:nth-child(2) > path"
)

const cclogo = document.querySelector(
  "#app > section > div.cc-logo > span:nth-child(1) > img"
)

globalThis.setCardType = setCardType


function setCardType(type) {
const colors = {
  visa: ["#436D99", "#2D57F2"],
  mastercard: ["#DF6F29", "#C69347"],
  amex: ["#00ACEC", "#FFFFFF"],
  default: ["black", "gray"]
}

ccBgColor01.setAttribute("fill",colors[type][0]);
ccBgColor02.setAttribute("fill",colors[type][1]);
cclogo.setAttribute("src", `cc-${type}.svg`)

}

setCardType('mastercard');


