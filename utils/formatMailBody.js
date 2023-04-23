const convertToHTML = (sgToMySeatCheck, myToSgSeatCheck, departureOption1, departureOption2) => {
  // if both seats available
  if (typeof sgToMySeatCheck !== 'string' && typeof myToSgSeatCheck !== 'string') {
    let mailBody1 = `<table><tr><th>${departureOption1}</th></tr>`
    sgToMySeatCheck.forEach((date) => {
      mailBody1 += `<tr><td>${Object.keys(date)[0]}</td></tr>`
    })
    mailBody1 += `</table>`

    let mailBody2 = `<table><tr><th>${departureOption2}</th></tr>`
    myToSgSeatCheck.forEach((date) => {
      mailBody2 += `<tr><td>${Object.keys(date)[0]}</td></tr>`
    })
    mailBody2 += `</table>`

    return {
      success: true,
      data: mailBody1.concat('<br>', mailBody2),
    }
  } else if (typeof sgToMySeatCheck !== 'string' || typeof myToSgSeatCheck !== 'string') {
    const seatResult = typeof sgToMySeatCheck !== 'string' ? sgToMySeatCheck : myToSgSeatCheck
    let mailBody = `<table><tr><th>${
      typeof sgToMySeatCheck !== 'string' ? departureOption1 : departureOption2
    }</th></tr>`
    seatResult.forEach((date) => {
      mailBody += `<tr><td>${Object.keys(date)[0]}</td></tr>`
    })
    mailBody += `</table>`

    return {
      success: true,
      data: mailBody,
    }
  } else {
    return {
      success: false,
      data: 'No seats available',
    }
  }
}

module.exports = convertToHTML
