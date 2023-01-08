var buttons = document.querySelectorAll('button');
var _loop_1 = function (button) {
    var contentBlock = button.closest('div').nextElementSibling;
    button.onclick = function () { return (contentBlock.getBoundingClientRect().height === 0) ? contentBlock.classList.add('show') : contentBlock.classList.remove('show'); };
};
for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
    var button = buttons_1[_i];
    _loop_1(button);
}
var requests = document.querySelectorAll('.request-header');
var _loop_2 = function (request) {
    var content = request.nextElementSibling;
    request.onclick = function () { return (content.getBoundingClientRect().height === 0) ? content.classList.add('show-content') : content.classList.remove('show-content'); };
};
for (var _a = 0, requests_1 = requests; _a < requests_1.length; _a++) {
    var request = requests_1[_a];
    _loop_2(request);
}
