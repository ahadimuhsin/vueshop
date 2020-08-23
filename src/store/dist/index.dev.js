"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _cart = _interopRequireDefault(require("@/store/cart"));

var _alert = _interopRequireDefault(require("@/store/alert"));

var _auth = _interopRequireDefault(require("@/store/auth"));

var _dialog = _interopRequireDefault(require("@/store/dialog"));

var _region = _interopRequireDefault(require("@/store/region"));

var _vuexPersist = _interopRequireDefault(require("vuex-persist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import modul cart
//modul auth
//modul auth
//modul dialog
//modul region
//untuk menyimpan state
var vuexPersist = new _vuexPersist["default"]({
  key: 'my-app',
  storage: localStorage
});

_vue["default"].use(_vuex["default"]); //penerapan Vuex (State Management)


var _default = new _vuex["default"].Store({
  plugins: [vuexPersist.plugin],
  state: {
    //data yang ingin ditransfer
    carts: [],
    prevUrl: '',
    payment: []
  },
  mutations: {
    setPrevUrl: function setPrevUrl(state, value) {
      state.prevUrl = value;
    },
    setPayment: function setPayment(state, value) {
      state.payment = value;
    }
  },
  actions: {
    setPrevUrl: function setPrevUrl(_ref, value) {
      var commit = _ref.commit;
      commit('setPrevUrl', value);
    },
    setPayment: function setPayment(_ref2, value) {
      var commit = _ref2.commit;
      commit('setPayment', value);
    }
  },
  //import modul di sini
  modules: {
    cart: _cart["default"],
    alert: _alert["default"],
    auth: _auth["default"],
    dialog: _dialog["default"],
    region: _region["default"]
  },
  //untuk mendapatkan state carts
  getters: {
    prevUrl: function prevUrl(state) {
      return state.prevUrl;
    },
    payment: function payment(state) {
      return state.payment;
    }
  }
});

exports["default"] = _default;