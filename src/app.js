/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var moment = require('moment');
function toLocalTime(dateString){
  var value = dateString.replace(/T/, " ");
  var localTime = moment.utc(value.slice(0, 16)).toDate();
  localTime = moment(localTime).format("MM/DD HH:mm (Z)");
  return localTime;
}

var main = new UI.Card({
  title: 'Markets',
  icon: 'images/menu_icon.png',
  subtitle: '',
  body: 'loading...'
});
main.show();

var window = new UI.Window();

/*
// Create a background Rect
var bgRect = new UI.Rect({
  position: new Vector2(10, 20),
  size: new Vector2(124, 60),
  backgroundColor: 'black'
});

// Add Rect to Window
window.add(bgRect);
*/

var sourceURL = 'http://marketsapi.appspot.com/api/Markets';
ajax({url: sourceURL, type: 'json'},
  function(data) {      
    var titleText = new UI.Text({
      position: new Vector2(0, 20),
      size: new Vector2(144, 20),
      text: data.results[0].Title,
      font: 'gothic-28-bold',
      color: 'white',
      textAlign: 'center'
    });
    var priceText = new UI.Text({
      position: new Vector2(0, 50),
      size: new Vector2(144, 30),
      text: data.results[0].Price,
      font: 'bitham-34-medium-numbers',
      color: 'white',
      textAlign: 'center'
    });    
    var diffText = new UI.Text({
      position: new Vector2(0, 90),
      size: new Vector2(144, 20),
      text: data.results[0].Diff+data.results[0].DiffPercent,
      font: 'gothic-18-bold',
      color: 'white',
      textAlign: 'center'
    });
    var timeText = new UI.Text({
      position: new Vector2(0, 110),
      size: new Vector2(144, 20),
      text: toLocalTime(data.results[0].PriceTime),
      font: 'gothic-14-bold',
      color: 'white',
      textAlign: 'center'
    });
    // Add the TimeText
    window.add(titleText);
    window.add(priceText);
    window.add(diffText);
    window.add(timeText);
    window.show();
    main.hide();
  },
  function(error) {
    console.log('Ajax failed: ' + error);
  }
);

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
