var textBoxCount = 0

function formatMonth(month) {
    switch (month) {
        case "Jan":
            return 'มกราคม'
        case "Feb":
            return 'กุมภาพันธ์'
        case "Mar":
            return 'มีนาคม'
        case "Apr":
            return 'เมษายน'
        case "May":
            return 'พฤษภาคม'
        case "Jun":
            return 'มิถุนายน'
        case "Jul":
            return 'กรกฎาคม'
        case "Aug":
            return 'สิงหาคม'
        case "Sep":
            return 'กันยายน'
        case "Oct":
            return 'ตุลาคม'
        case "Nov":
            return 'พฤศจิกายน'
        case "Dec":
            return 'ธันวาคม'
        default:
            return 'Error'
    }
}

async function getDate() {
    let date = await fetch('https://learningportal.ocsc.go.th/learningspaceapi/localdatetime')
    .then((response) => {
        let res = response.json().then((data) => {
            console.log('fetchDate: ', data.datetime)
            return data.datetime
        })

        return res
    })
    .catch((error) => {
        console.log('ERROR: ', 'ระบบเครือข่ายล้มเหลว')
        return 'Error: ระบบเครือข่ายล้มเหลว'
    })
    .finally(() => {
        console.log('End of fetch')
    })
    let dateObject = new Date(date)

    let formatDate = dateObject.toDateString().split(' ').slice(1)
    let month = formatMonth(formatDate[0])
    let day = formatDate[1]
    let year = formatDate[2]

    let formatTime = dateObject.toTimeString().split(' ')[0]
    console.log('formatDate: ', formatDate)
    document.getElementById('demo').innerHTML = 'วันที่ ' + day + ' ' + month + ' ' + year + ' เวลา ' + formatTime + ' น.'
}

function fetchDate() {
    setInterval(getDate, 1000)
}

function changeColor() {
    let element = document.body
    element.classList.toggle('dark-mode')
}

function addTextBox() {
    switch (textBoxCount) {
        case 0:
            let textBox = document.createElement('input')
            let space = document.createElement('br')
            textBox.type = 'number'
            textBox.id = 'addedIncome'
            textBox.onchange = sumAddedIncome
            space.id = 'space'
            document.getElementById('incomeDiv').appendChild(space)
            document.getElementById('incomeDiv').appendChild(textBox)
            textBoxCount++
            break
        case 1:
            let textBox2 = document.createElement('input')
            let space2 = document.createElement('br')
            textBox2.type = 'number'
            textBox2.id = 'addedIncome2'
            textBox2.onchange = sumAddedIncome2
            space2.id = 'space2'
            document.getElementById('incomeDiv').appendChild(space2)
            document.getElementById('incomeDiv').appendChild(textBox2)
            textBoxCount++
            break
        default:
            break
    }
}

function removeTextBox() {
    switch (textBoxCount) {
        case 1:
            let textBox = document.getElementById('addedIncome')
            let space = document.getElementById('space')
            space.remove()
            textBox.remove()
            textBoxCount--
            break
        case 2:
            let textBox2 = document.getElementById('addedIncome2')
            let space2 = document.getElementById('space2')
            space2.remove()
            textBox2.remove()
            textBoxCount--
            break
        default:
            break
    }
}

function sumIncome() {
    let income = document.getElementById('income').value
    let totalIncome = document.getElementById('totalIncome')

    let ans = parseInt(totalIncome.value) ? parseInt(totalIncome.value) : 0

    totalIncome.value = ans + parseInt(income)
}

function sumAddedIncome() {
    let addedIncome = document.getElementById('addedIncome').value
    let totalIncome = document.getElementById('totalIncome')

    let ans = parseInt(totalIncome.value) ? parseInt(totalIncome.value) : 0

    console.log('ans: ', addedIncome)

    if (addedIncome) {
        ans += parseInt(addedIncome)
    }

    totalIncome.value = ans
}

function sumAddedIncome2() {
    let addedIncome = document.getElementById('addedIncome2').value
    let totalIncome = document.getElementById('totalIncome')

    let ans = parseInt(totalIncome.value) ? parseInt(totalIncome.value) : 0

    console.log('ans: ', addedIncome)

    if (addedIncome) {
        ans += parseInt(addedIncome)
    }

    totalIncome.value = ans
}

function calculateTax() {
    let income = parseInt(document.getElementById('totalIncome').value)
    let tax = 0
    if (income <= 150000) {
        tax = 0
    } else if (income <= 300000) {
        tax = (income - 150000) * 0.05
    } else if (income <= 500000) {
        tax = 7500 + (income - 300000) * 0.1
    } else if (income <= 750000) {
        tax = 27500 + (income - 500000) * 0.15
    } else if (income <= 1000000) {
        tax = 65000 + (income - 750000) * 0.2
    } else if (income <= 2000000) {
        tax = 115000 + (income - 1000000) * 0.25
    } else if (income <= 5000000) {
        tax = 365000 + (income - 2000000) * 0.3
    } else {
        tax = 1265000 + (income - 5000000) * 0.35
    }

    let taxElement = document.getElementById('tax')
    taxElement.innerHTML = 'ภาษีที่ต้องจ่าย: ' + tax + ' บาท'
}