import "./css/index.css"
import IMask from "imask"

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

// Tipos de cartão
function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    amex: ["#00ACEC", "#FFFFFF"],
    default: ["black", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  cclogo.setAttribute("src", `cc-${type}.svg`)
}

// IMask config
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000"
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice("2"),
      to: String(new Date().getFullYear() + 10).slice("2")
    },

    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPatter = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa"
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47][0-9]{13}/,
      cardtype: "amex"
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
      cardtype: "dinersClub"
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  }
}
const cardNumberMasked = IMask(cardNumber, cardNumberPatter)

const formulario = document.querySelector("form")
formulario.addEventListener("submit", e => {
  e.preventDefault()
})

const addButton = document.querySelector("#addCard")
addButton.addEventListener("click", e => {
  console.log("adicionei cartão!")
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

const cardNumberHolder = document.querySelector("#card-number")

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecutiry = document.querySelector(".cc-security .value")
  ccSecutiry.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
  updateCardNumber(cardNumberHolder.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}
