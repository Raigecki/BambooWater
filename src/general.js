//function to generating mock data
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
      
      logCell['name'] = name;
            logCell['amountCups'] = amountCups;
      logCell['amountGrams'] = amountGrams;
            logCell['date'] = time;

      logTable.push(logCell);
    }
    localStorage.setItem('logTable', JSON.stringify(logTable));
  }
