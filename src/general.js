//function to generating mock data

function checkHistory() {

  /*if (JSON.parse(localStorage.getItem('logTable') == undefined)) return -1;

  var homeDate = JSON.parse(localStorage.getItem('logTable')).time;

  // check if homepage timestamp is = to today's date
  if (homeDate == getFormattedDate()) {

    var now = new Date();
    var timer = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;
    setTimeout(importData(), timer);
  }

  else {

    if (JSON.parse(localStorage.getItem('historyTable') == undefined)) generateTable();
    importData();
  }*/
  return 0;
}

function generateTable() {
  var backHistoryTable = [];
  localStorage.setItem('historyTable', JSON.stringify(backHistoryTable));
}

function getFormattedDate() {

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  var currentDate = new Date(year, month, day);
  return currentDate;
}




/*
function generateData() {
  var logTable = [];

  for (var i = 0; i < 3; i++) {
    var logCell = {};
    var name = 'Item ' + i.toString();
    var amountCups = i + 3;
    var amountGrams = i + 4.2;

    var date = new Date();
    var hours = date.getHours();
    var ampm = 'AM';
    if (hours > 12) {
      hours -= 12;
      ampm = 'PM';
    }
    var time = hours + ':' + date.getMinutes() + ' ' + ampm;

    //icon name, name, type, date, amount
    logCell['name'] = name;
    logCell['amountCups'] = amountCups;
    logCell['amountGrams'] = amountGrams;
    logCell['date'] = time;

    logTable.push(logCell);
  }
  localStorage.setItem('logTable', JSON.stringify(logTable));
}
function debug() {

  var logTable = JSON.parse(localStorage.getItem('logTable'));
  console.log('logTable = ' + logTable);
  console.log('logTable[0] = ' + logTable[0]);
  console.log(logTable[0]['name']);
  console.log(logTable[0]['amount']);
  console.log(logTable[0]['date']);
}

*/
