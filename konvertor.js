var exchangeRates = {
    'EUR': 1
}

var lastDirection = 'forward'


function ratesReceived(data, status) {
    exchangeRates = data['rates']
    for (var key in exchangeRates) {
        console.log(key, exchangeRates[key])
        $("#currency1").append('<option>' + key + '</option>')
        $("#currency2").append('<option>' + key + '</option>')
    }
    exchangeRates['EUR'] = 1
}

function convert() {
    lastDirection = 'forward'
    var sourceAmount = parseFloat($('#value1').val()) // type: number
    var targetAmountInput = $('#value2')   // type: HTML element
    var sourceCurrency = $('#currency1').val()   // type: string 
    var targetCurrency = $('#currency2').val()   // type: string
    var result = convertEquation(sourceAmount, sourceCurrency, targetCurrency)
    targetAmountInput.val(result)
    $("#box2").addClass("target")
    $("#box1").removeClass("target")
}

function reverseConvert() {
    lastDirection = 'reverse'
    var sourceAmount = parseFloat($('#value2').val()) 
    var targetAmountInput = $('#value1')
    var sourceCurrency = $('#currency2').val()   
    var targetCurrency = $('#currency1').val()
    var result = convertEquation(sourceAmount, sourceCurrency, targetCurrency)
    targetAmountInput.val(result)
    $("#box1").addClass("target")
    $("#box2").removeClass("target")
}

function convertEquation(sourceAmount, sourceCurrency, targetCurrency) {
    var sourceExchangeRate = exchangeRates[sourceCurrency]
    var targetExchangeRate = exchangeRates[targetCurrency]
    var result = (sourceAmount / sourceExchangeRate) * targetExchangeRate

    if (isNaN(result)) {
        return ""
    } else {
        return result.toFixed(2)
    }
}

function convertInLastDirection() {
    switch (lastDirection) {
    case 'forward':
        convert()
        break
    case 'reverse':
        reverseConvert()
        break
    }
    // if (lastDirection == 'forward') {
    //     convert()
    // } else if (lastDirection == 'reverse') {
    //     reverseConvert()
    // }
}


$( document ).ready(function() {
    $.getJSON("http://api.fixer.io/latest", ratesReceived)

    $('#value1').on('input', convert)

    $('#currency2').on('change', convertInLastDirection)

    $('#currency1').on('change', convertInLastDirection)

    $('#value2').on('input', reverseConvert)

})
    
