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

function main() {
    setInterval(getDate, 1000)
}