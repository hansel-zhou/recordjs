var _wr = function _wr(type) {
  var orig = history[type];
  return function () {
    var rv = orig.apply(this, arguments);
    var e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};

history.pushState = _wr('pushState');
history.replaceState = _wr('replaceState');
var Generate = {
  /** 操作记录列表 */
  recordArr: [],

  /** 操作开始时间点 */
  starttime: 0,

  /** 操作结束时间点 */
  endtime: 0,

  /** 操作持续时间 */
  duration: 0,

  /** 记录操作时的window.innerWidth */
  width: 0,

  /** 记录操作时的window.innerHeight */
  height: 0,
  events: [{
    id: 1,
    event: 'click',
    target: document.documentElement
  }, {
    id: 2,
    event: 'scroll',
    target: window
  }, {
    id: 3,
    event: 'touchstart',
    target: document.documentElement
  }, {
    id: 4,
    event: 'touchmove',
    target: document.documentElement
  }, {
    id: 5,
    event: 'touchend',
    target: document.documentElement
  }, {
    id: 6,
    event: 'change',
    target: document.documentElement
  }, {
    id: 7,
    event: 'input',
    target: document.documentElement
  }, {
    id: 8,
    event: 'onpopstate',
    target: window
  },, {
    id: 9,
    event: 'pushState',
    target: window
  }, {
    id: 10,
    event: 'replaceState',
    target: window
  }],

  /**
   *  收集用户操作信息
   * @date 2020-07-23
   * @returns {void}
   */
  start: function start() {
    // 记录收集信息时间
    this.starttime = new Date().getTime();
    this.width = window.innerWidth;
    this.height = window.innerHeight; // 开启事件侦听

    this.startEventListener();
  },
  stop: function stop() {
    var _this = this;

    this.endtime = new Date().getTime();
    this.duration = this.endtime - this.starttime;
    this.events.forEach(function (ele) {
      ele.target.removeEventListener(ele.event, _this.handler[ele.event]);
    });
  },
  startEventListener: function startEventListener() {
    var _this2 = this;

    // console.log(this)
    this.events.forEach(function (ele) {
      ele.target.addEventListener(ele.event, _this2.handler[ele.event]);
    });
  },
  debounce: function debounce(fn, wait) {
    var pre = Date.now();
    return function () {
      var context = this;
      var args = arguments;
      var now = Date.now();

      if (now - pre >= wait) {
        fn.apply(context, args);
        pre = Date.now();
      }
    };
  },
  generateRecord: function generateRecord(id) {
    // console.log(this)
    var now = new Date().getTime();
    var record = {
      id: id,
      time: now,
      duration: Generate.starttime - now
    };
    return record;
  },
  handler: {
    // click 处理函数
    'click': function click(e) {
      // console.log
      var record = generateRecord(1); // click 事件的信息收集
      // console.log(e)

      record.pointer = {
        left: e.clientX,
        top: e.clientY
      };
      record.domPath = Generate.getDompath(e.target);
      console.log(record);
      recordArr.push(record);
    },
    'scroll': function scroll(e) {
      var record = generateRecord(2); // scroll 事件的信息收集

      recordArr.push(record);
    },
    'touchstart': function touchstart(e) {
      var record = generateRecord(3); // touchstart 事件的信息收集

      recordArr.push(record);
    },
    'touchmove': function touchmove() {
      Generate.debounce(function () {
        var record = generateRecord(4); // touchstart 事件的信息收集

        console.log(record);
        recordArr.push(record);
      }, 100)();
    },
    'touchend': function touchend(e) {
      var record = generateRecord(5); // touchstart 事件的信息收集

      recordArr.push(record);
    },
    'change': function change(e) {
      var record = generateRecord(6); // touchstart 事件的信息收集

      recordArr.push(record);
    },
    'input': function input(e) {
      var record = generateRecord(7); // touchstart 事件的信息收集

      recordArr.push(record);
    },
    // 浏览器回退/前进等事件
    'onpopstate': function onpopstate(e) {
      var record = generateRecord(8); // touchstart 事件的信息收集

      recordArr.push(record);
    },
    // 浏览器跳入新路由事件
    'pushState': function pushState(e) {
      var record = generateRecord(9); // touchstart 事件的信息收集

      recordArr.push(record);
    },
    // 浏览器替换路由事件
    'replaceState': function replaceState(e) {
      var record = generateRecord(10); // touchstart 事件的信息收集

      recordArr.push(record);
    }
  },
  getDompath: function getDompath(ele) {
    var t = ele;

    for (var e = []; null != t.parentElement;) {
      for (var n = 0, i = 0, a = 0; a < t.parentElement.childNodes.length; a += 1) {
        var r = t.parentElement.childNodes[a];
        r === t && (i = n), n += 1;
      }

      var o = "> " + t.nodeName.toLowerCase();
      t.hasAttribute("id") && "" !== t.id ? e.unshift(o + "#" + t.id) : n > 1 ? e.unshift(o + ":nth-child(" + (i + 1) + ")") : e.unshift(o), t = t.parentElement;
    }

    return e.slice(1).join(" ").substring(2);
  }
};
var start = Generate.start;
var stop = Generate.stop;
var startEventListener = Generate.startEventListener;
var generateRecord = Generate.generateRecord;
var recordArr = Generate.recordArr;
var handler = Generate.handler;
var events = Generate.events;

export { start, stop, startEventListener, generateRecord, recordArr, handler, events };
