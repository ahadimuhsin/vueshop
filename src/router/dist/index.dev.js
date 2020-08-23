"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _store = _interopRequireDefault(require("../store/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { nextTick } from 'vue/types/umd'
_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'Home',
    component: _Home["default"]
  }, {
    path: '/categories',
    name: 'categories',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Categories.vue'));
      });
    }
  }, {
    path: '/books',
    name: 'books',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Books.vue'));
      });
    }
  }, {
    path: '/category/:slug',
    name: 'category',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Category.vue'));
      });
    }
  }, {
    path: '/book/:slug',
    name: 'book',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Book.vue'));
      });
    }
  }, {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/About.vue'));
      });
    }
  }, {
    path: '/checkout',
    name: 'checkout',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Checkout.vue'));
      });
    },
    meta: {
      auth: true
    } //mengatur sifatnya provate, agar hanya user yg sudah login yg boleh mengaksesnya

  }, {
    path: '/payment',
    name: 'payment',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Payment.vue'));
      });
    },
    meta: {
      auth: true
    }
  }, {
    path: '/profile',
    name: 'profile',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Profile.vue'));
      });
    },
    meta: {
      auth: true
    }
  }, {
    path: '/my-order',
    name: 'my-order',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/MyOrder.vue'));
      });
    },
    meta: {
      auth: true
    }
  }]
}); //Navigation Guard : untuk mengecek routing yang private
//Jika routing private dan user belum login, tampilkan form login

router.beforeEach(function (to, from, next) {
  // Jika routing ada meta auth-nya
  if (to.matched.some(function (record) {
    return record.meta.auth;
  })) {
    // jika user belum login atau guest
    if (_store["default"].getters['auth/guest']) {
      //tampilkan pesan bahwa harus login dahulu
      _store["default"].dispatch('alert/set', {
        status: true,
        text: 'Mohon Login Dulu',
        color: 'error'
      });

      _store["default"].dispatch('setPrevUrl', to.path); //tampilkan form login


      _store["default"].dispatch('dialog/setComponent', 'login');

      _store["default"].dispatch('dialog/setStatus', true);
    } else {
      next();
    }
  } else {
    next();
  }
});
var _default = router;
exports["default"] = _default;