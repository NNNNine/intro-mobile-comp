// let demo = new Promise((resolve, reject) => {
//     // Math.random() > 0.5 ? resolve(1) : reject('Error')
//     // resolve(1)
//     reject(1)
// })

// let call = demo.then(
//     (reason) => {
//         console.log('ERROR: ', reason)
//         return 'Error'
//     },
//     (value) => {
//         console.log('Value: ', value)
//         return value
//     }
// )

// console.log('Call: 1 ', call)
// setTimeout(() => {
//     console.log('Call: 2 ', call)
// }, 0)

setTimeout(() => {
    fetch('https://learningportal.ocsc.go.th/learningspaceapi/localdatetime').then((response) => {
        fetchDate = response.headers.get('date')
        console.log('fetchDate: ', fetchDate)
        return fetchDate
    })
    .catch((error) => {
        console.log('ERROR: ', 'ระบบเครือข่ายล้มเหลว')
        return 'Error: ระบบเครือข่ายล้มเหลว'
    })
    .finally(() => {
        console.log('End of fetch')
        return 'End of fetch'
    })
}, 1000)