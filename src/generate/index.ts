

var _wr = function(type) {
  var orig = history[type];
  return function() {
      var rv = orig.apply(this, arguments);
     var e :any = new Event(type);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
  };
};
history.pushState = _wr('pushState');
history.replaceState = _wr('replaceState');

const Generate = {
  /** 操作记录列表 */
recordArr:[],
/** 操作开始时间点 */
starttime:0,
/** 操作结束时间点 */
endtime:0,
/** 操作持续时间 */
duration:0,
/** 记录操作时的window.innerWidth */
width:0,
/** 记录操作时的window.innerHeight */
height:0,
events:[{id:1,event:'click',target:document.documentElement},{id:2,event:'scroll',target:window},{id:3,event:'touchstart',target:document.documentElement},{id:4,event:'touchmove',target:document.documentElement},{id:5,event:'touchend',target:document.documentElement},{id:6,event:'change',target:document.documentElement},{id:7,event:'input',target:document.documentElement},{id:8,event:'onpopstate',target:window},
,{id:9,event:'pushState',target:window},{id:10,event:'replaceState',target:window},
],
  /**
   *  收集用户操作信息
   * @date 2020-07-23
   * @returns {void}
   */
  start():void{
    // 记录收集信息时间
    this.starttime = new Date().getTime();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // 开启事件侦听
    this.startEventListener();
  },
  stop():void{
    this.endtime = new Date().getTime();
    this.duration = this.endtime - this.starttime;
  },
  startEventListener():void {
    console.log(this)
    this.events.forEach(ele =>{
      ele.target.addEventListener(ele.event,this.handler[ele.event]);
    })
  },
  generateRecord():Record{
    // console.log(this)
    const now = new Date().getTime();
    let record = <Record>{
      id:1,
      time:now,
      duration: Generate.starttime-now
    }
    return record;
  },
  handler:{
    // click 处理函数
    'click':function(e:any){
      // console.log
      const record = generateRecord();
      // click 事件的信息收集
      console.log(e)
      recordArr.push(record)
    },
    'scroll':function(e:any){
      const record = generateRecord();
      // scroll 事件的信息收集
      recordArr.push(record)
  
    },
    'touchstart':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
  
    },
    'touchmove':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
    },
    'touchend':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
    },
    'change':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
    },
    'input':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
    },
    // 浏览器回退/前进等事件
    'onpopstate':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
    },
    // 浏览器跳入新路由事件
    'pushState':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
    },
    // 浏览器替换路由事件
    'replaceState':function(e:any){
      const record = generateRecord();
      // touchstart 事件的信息收集
      recordArr.push(record)
    }
  }
}


interface EventType{
  id?:number,
  event:string,
  target:Element|Window
}

interface Record{
  /** 触发记录事件的id */
  id:number,
  /** 事件戳 */
  time:number,
  /** 距离记录开始时间 */
  duration:number,
  /** 触发事件的元素路径，如果有 */
  domPath?:string,
  /** 触发的事件信息 */
  event?:any
  /** 触发事件引起的值改变 */
  value?:any,
  /** 事件触发时鼠标/标记所在位置 */
  pointer?:{
    left:number,
    top:number
  }
}

export default Generate
export const start = Generate.start;
export const stop = Generate.stop;
export const startEventListener = Generate.startEventListener;
export const generateRecord = Generate.generateRecord;
export const recordArr = Generate.recordArr;
export const handler = Generate.handler;
export const events = Generate.events;