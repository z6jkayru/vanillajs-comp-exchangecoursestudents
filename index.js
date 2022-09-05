var _selecteds = [];
var _deselecteds = [];
var _toSave = [];

window.addEventListener("load", function(event) {
  _toSave = [1, 2];
  _selecteds = _toSave.map((id) => `assoc--user--${id}`);
}, false);

$(document).on('click', '.assoc--item', function (e) {
  var id = e.target.id;
  var color = '#ededed';

  var items = [];
  if (id.includes('assoc--user--')) items = _selecteds;
  if (id.includes('deassoc--user--')) items = _deselecteds;

  var idx = items.findIndex((sel) => sel === id)
  if (idx >= 0) {
    color = 'white';
    items.splice(idx, 1);
  } else {
    items.push(id);
  }

  if (id.includes('assoc--user--')) _selecteds = items;
  if (id.includes('deassoc--user--')) _deselecteds = items;

  $(`#${id}`).css('background-color', color);
});

$('#btnAdd').on('click', () => {
  var cmpHtml = $('#association--courseusers').html();
  _selecteds.forEach((id) => {
    var text = $(`#${id}`).text();
    cmpHtml += `<span class="assoc--item" id="de${id}">${text}</span>`;
  })
  $('#association--courseusers').html(cmpHtml);

  _selecteds.forEach((id) => $(`#${id}`).remove());
  _toSave = _selecteds.map((id) => id.replace('assoc--user--', ''));

  $('#association--courseusers').scrollTop($('#association--courseusers')[0].scrollHeight);
});

$('#btnLess').on('click', () => {
  var usrHtml = $('#association--users').html();
  _deselecteds.forEach((id) => {
    var text = $(`#${id}`).text();
    var _id = id.replace('deassoc--user--', 'assoc--user--');
    usrHtml += `<span class="assoc--item" id="${_id}">${text}</span>`;
  })

  $('#association--users').html(usrHtml);

  _deselecteds.forEach((id) => $(`#${id}`).remove());
  var aux = _deselecteds.map((id) => id.replace('deassoc--user--', ''));
  aux.forEach((ax) => {
    var idx = _toSave.findIndex((cid) => `${cid}` === `${ax}`)
    if (idx >= 0) _toSave.splice(idx, 1);
  })

  $('#association--users').scrollTop($('#association--users')[0].scrollHeight);
});

$('#btnSaveAssociations').on('click', () => {
  console.log(_toSave)
})