"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ----------------------- Paralax Background -----------------------//
(function () {
  document.addEventListener("mousemove", parallax);
  var div = document.querySelector(".bg-animated");
  var strength = 30;
  var width = strength / window.innerWidth;
  var height = strength / window.innerHeight;

  function parallax(e) {
    var w = window.innerWidth / 2;
    var h = window.innerHeight / 2;
    var pageX = e.clientX - w;
    var pageY = e.clientY - h;
    var newValueX = width * pageX * -1;
    var newValueY = height * pageY * -1;
    div.style.backgroundPosition = "calc(50% + ".concat(newValueX, "px) calc(50% + ").concat(newValueY, "px)");
  }
})(); // ----------------------- End Paralax Background -----------------------//
// ----------------------- Add Classs To Knowledges List -----------------------//


var listKnowledges = _toConsumableArray(document.querySelectorAll('[data-option="knowledges"]'));

var showKnowledges = function showKnowledges() {
  var _loop = function _loop(i) {
    var li = listKnowledges[i];
    var ms = i * 50 + 1;

    if (i < listKnowledges.length) {
      setTimeout(function () {
        li.classList.add('show');
      }, ms);
    }
  };

  for (var i = 0; i < listKnowledges.length; i++) {
    _loop(i);
  }
};

setTimeout(showKnowledges, 600); // ----------------------- End Classs To Knowledges List -----------------------//
// ----------------------- Add Classs To Skills List -----------------------//

var skillList = _toConsumableArray(document.querySelectorAll('.percentage'));

var showSkill = function showSkill() {
  var _loop2 = function _loop2(i) {
    var li = skillList[i];
    var ms = i * 200 + 1;

    if (i < skillList.length) {
      setTimeout(function () {
        li.classList.remove('show');
      }, ms);
    }
  };

  for (var i = 0; i < skillList.length; i++) {
    _loop2(i);
  }
};

setTimeout(showSkill, 600); // ----------------------- End Classs To Skills List -----------------------//

window.addEventListener('resize', function () {
  var coverDiv = document.querySelector('.cover-div');

  if (coverDiv.clientWidth <= 800 && window.innerWidth >= 1024) {
    document.querySelector('.certificates').classList.add('min');
    document.querySelector('.contact-content').classList.add('min');
  } else {
    document.querySelector('.certificates').classList.remove('min');
    document.querySelector('.contact-content').classList.remove('min');
  }
});
""; // ----------------------- Split screen -----------------------//

var screenContainer = document.querySelector(".screen__container");
var layerBody = document.querySelectorAll(".layer__body");
var screenHandle = document.querySelector(".screen__handle");
var layerContainerTop = document.querySelector(".layer__container-top");
var layerContainerBottom = document.querySelector(".layer__container-bottom");
window.addEventListener('resize', function () {
  var screenContainerWidth = screenContainer.offsetWidth;
  layerBody.forEach(function (item) {
    item.style.width = screenContainerWidth + 'px';
  });
});
window.addEventListener('load', function () {
  var screenContainerWidth = screenContainer.offsetWidth;
  layerBody.forEach(function (item) {
    item.style.width = screenContainerWidth + 'px';
  });
});
screenContainer.addEventListener('mousemove', function (e) {
  var handlePos = e.offsetX;
  screenHandle.style.left = handlePos + 'px';
  var layerBottomWidth = screenContainer.offsetWidth - e.offsetX;
  var layerTopWidth = screenContainer.offsetWidth - layerBottomWidth;
  layerContainerBottom.style.width = layerBottomWidth + 'px';
  layerContainerTop.style.width = layerTopWidth + 'px';
}); // ----------------------- End Split screen -----------------------//
// ----------------------- Todo list -----------------------//

var todoInput = document.querySelector('.todo__input');
var todoButton = document.querySelector('.todo__button');
var todoList = document.querySelector('.todo__list');
var filterOption = document.querySelector('.todo__filter');
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(e) {
  e.preventDefault();

  if (!todoInput.value == '') {
    var todoItems = document.createElement('div');
    todoItems.classList.add('todo__items');
    var newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo__item');
    var completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('todo__button-complete');
    var trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('todo__button-trash');
    todoItems.appendChild(newTodo);
    todoItems.appendChild(completeBtn);
    todoItems.appendChild(trashBtn);
    todoList.appendChild(todoItems);
    todoInput.value = '';
  }
}

function deleteOrCheck(e) {
  var item = e.target;
  var todo = item.parentElement;

  if (item.classList.contains('todo__button-trash')) {
    todo.classList.add('todo__items-fall');
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  } else if (item.classList.contains('todo__button-complete')) {
    todo.classList.toggle('todo__items-comleted');
  }
}

function filterTodo(e) {
  var todos = _toConsumableArray(todoList.children);

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("todo__items-comleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;

      case "uncompleted":
        if (!todo.classList.contains("todo__items-comleted")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;

      default:
        break;
    }
  });
} // ----------------------- End Todo list -----------------------//


var DrawAnimation = /*#__PURE__*/function () {
  function DrawAnimation() {
    _classCallCheck(this, DrawAnimation);

    this.animIn = null;
    this.animOut = null;
    this.newAnimation = {
      "in": ['top-to-center', 'bottom-to-center', 'left-to-center', 'right-to-center'],
      out: ['center-to-top', 'center-to-bottom', 'center-to-left', 'center-to-right']
    };

    var _result = this.drawAnimation();

    this.getAnimation = function () {
      return _result;
    };
  }

  _createClass(DrawAnimation, [{
    key: "drawAnimation",
    value: function drawAnimation() {
      var numbers = [];
      var keys = Object.keys(this.newAnimation).length;

      for (var i = 0; i < keys; i++) {
        var number = Math.floor(this.newAnimation["in"].length * Math.random());
        numbers.push(number);
      }

      ;
      this.animIn = numbers[0];
      this.animOut = numbers[1];
      return numbers;
    }
  }, {
    key: "resetAnim",
    value: function resetAnim(outS) {
      for (var i = 0; i < this.newAnimation["in"].length; i++) {
        var inAnim = this.newAnimation["in"][i];
        var outAnim = this.newAnimation.out[i];
        animation.sectionMenu[outS].classList.remove(inAnim, outAnim);
      }
    }
  }]);

  return DrawAnimation;
}();

;

var Animation = /*#__PURE__*/function () {
  function Animation() {
    _classCallCheck(this, Animation);

    this.navIcon = _toConsumableArray(document.querySelectorAll("[data-option='nav-icon']"));
    this.sectionMenu = _toConsumableArray(document.querySelectorAll('[data-id]'));
    this.menuToggle = document.querySelector('.menu-toggle');
    this.headerS = document.querySelector('.header-section');
    this["switch"] = true;
    this.render();
  }

  _createClass(Animation, [{
    key: "clearActiveClass",
    value: function clearActiveClass(i) {
      this.navIcon[i].classList.remove('active');
      this.sectionMenu[i].classList.remove('active-section');
    }
  }, {
    key: "addActiveClass",
    value: function addActiveClass(i) {
      this.navIcon[i].classList.add('active');
      this.sectionMenu[i].classList.add('active-section');
    }
  }, {
    key: "getActiveSection",
    value: function getActiveSection() {
      return this.sectionMenu.findIndex(function (menu) {
        return menu.classList.contains("active-section");
      });
    }
  }, {
    key: "addAnimation",
    value: function addAnimation(indexI, indexS) {
      var _this = this;

      if (window.innerWidth <= 1024) {
        this.headerS.classList.toggle('open');
        this.menuToggle.classList.toggle('open');
      }

      if (this["switch"]) {
        this["switch"] = !this["switch"];
        var draw = new DrawAnimation();
        this.sectionMenu[indexS].classList.add(draw.newAnimation.out[draw.animOut]);
        setTimeout(function () {
          _this.sectionMenu[indexI].classList.add(draw.newAnimation["in"][draw.animIn]);

          _this.addActiveClass(indexI);

          setTimeout(function () {
            _this.clearActiveClass(indexS);

            draw.resetAnim(indexS);
            _this["switch"] = !_this["switch"];
          }, 600);
        }, 600);
      }
    }
  }, {
    key: "checkIndex",
    value: function checkIndex(indexI) {
      var indexS = this.getActiveSection();
      if (indexI === indexS) return;
      this.addAnimation(indexI, indexS);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.navIcon.forEach(function (nav, indexI) {
        return nav.addEventListener('click', _this2.checkIndex.bind(_this2, indexI));
      });
      this.menuToggle.addEventListener('click', function () {
        _this2.menuToggle.classList.toggle('open');

        _this2.headerS.classList.toggle('open');
      });
    }
  }]);

  return Animation;
}();

var animation = new Animation();
var styles = [{
  "elementType": "geometry",
  "stylers": [{
    "color": "#242f3e"
  }]
}, {
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#746855"
  }]
}, {
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#242f3e"
  }]
}, {
  "featureType": "administrative.land_parcel",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative.locality",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#999999"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#575757"
  }]
}, {
  "featureType": "poi.business",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [{
    "color": "#263c3f"
  }]
}, {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#6b9a76"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [{
    "color": "#38414e"
  }]
}, {
  "featureType": "road",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#212a37"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#9ca5b3"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [{
    "color": "#746855"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#1f2835"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#f3d19c"
  }]
}, {
  "featureType": "road.local",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "geometry",
  "stylers": [{
    "color": "#2f3948"
  }]
}, {
  "featureType": "transit.station",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#999999"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#17263c"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#515c6d"
  }]
}, {
  "featureType": "water",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "color": "#17263c"
  }]
}];

function initMap() {
  var mapContainer = document.getElementById('map');
  var centerMap = new google.maps.LatLng(52.2898134, 21.05239829893248);
  var image = "img/map-marker-alt-solid.svg";
  var map = new google.maps.Map(mapContainer, {
    center: centerMap,
    zoom: 9,
    styles: styles
  });
  var marker = new google.maps.Marker({
    map: map,
    position: centerMap,
    icon: image
  });
  marker.setMap(map);
}