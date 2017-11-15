if (localStorage.getItem('historyTable') == undefined) generateHistoryTable();
var timeoutMap = {};
function importAtMidnight() {
  var currentDate = getFormattedDate();
  if (currentDate in timeoutMap) {
    clearTimeout(timeoutMap[currentDate]);
  }
  var now = new Date();
  var night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0, 0, 0 // ...at 00:00:00 hours
  );
  var msToMidnight = night.getTime() - now.getTime();

  timeoutMap[currentDate] = setTimeout(function () {
                              importData();              //      <-- Import log data to history
                              importAtMidnight();    //      Then, reset again next midnight.
                            }, msToMidnight);
}

function getFormattedDate() {

  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  var currentDate = month + '/' + day + '/' + year;
  return currentDate;
}

function getFormattedTime() {
  var date = new Date();
  var hours = date.getHours();
  if (hours < 10) {
    if (hours == '0') {
      hours = '12';
    }
    else {
      hours = '0' + hours;
    }
  }

  var minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  var ampm = 'AM';
  if (hours > 12) {
    hours -= 12;
    ampm = 'PM';
  }
  var time = hours + ':' + minutes + ' ' + ampm;
  return time;
}


//function to create tr and td according to the stored information
function setHistoryTable() {

  var backHistoryTable = JSON.parse(localStorage.getItem('historyTable'));
  var frontHistoryTable = document.getElementById('historyTable');
  var historyMessage = document.getElementById('historyMessage');

  if (backHistoryTable.length == 0) {

    historyMessage.innerHTML = 'There are currently no history available';
    return 0;
  }

  var tr = document.createElement('tr');
  var tdDate = document.createElement('td');
  var tdFiber = document.createElement('td');
  var tdWater = document.createElement('td');
  var table = document.getElementById('historyTable');

  var historyIndex = backHistoryTable.length - 1;
  var date = backHistoryTable[historyIndex].date;
  tdDate.innerHTML = backHistoryTable[historyIndex].date;
  tdFiber.innerHTML = backHistoryTable[historyIndex].fiber + ' g';
  tdWater.innerHTML = backHistoryTable[historyIndex].water + ' L';

  tr.appendChild(tdDate);
  tr.appendChild(tdFiber);
  tr.appendChild(tdWater);

  frontHistoryTable.appendChild(tr);
  historyMessage.innerHTML = '';
}

function importData() {
  console.log('timeout occured');
  var backHistoryTable = JSON.parse(localStorage.getItem('historyTable'));
  var homeTimeStamp = localStorage.getItem('homeTimeStamp');
  var homeFiber = localStorage.getItem('fiberProgressbar');
  var homeWater = localStorage.getItem('waterProgressbar');

  var historyCell = {
    'date': homeTimeStamp,
    'fiber': homeFiber,
    'water': homeWater
  }
  /* Needed only for button
  for (var i = 0; i < backHistoryTable.length; ++i) {
    if (homeTimeStamp == undefined || homeTimeStamp == backHistoryTable[i].date) {
      alert('You cannot add multiple history entries for the same day (Wizard of Oz)');
      return 0;
    }
  }*/

  backHistoryTable.push(historyCell);
  localStorage.setItem('historyTable', JSON.stringify(backHistoryTable));
  localStorage.removeItem('logTable');
  localStorage.removeItem('fiberProgressbar');
  localStorage.removeItem('waterProgressbar');
  localStorage.removeItem('homeTimeStamp');
  localStorage.setItem('homeTimeStamp', getFormattedDate());
  if (location.href.indexOf('homepage.html') > 0) {
    location.reload();
  }
  else if (location.href.indexOf('history.html') > 0) {
    setHistoryTable();
  }
}
/*
function checkHistory() {

  if (JSON.parse(localStorage.getItem('logTable') == undefined)) return -1;

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
  }
  return 0;
}*/

function generateHistoryTable() {
  var backHistoryTable = [];
  localStorage.setItem('historyTable', JSON.stringify(backHistoryTable));
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
