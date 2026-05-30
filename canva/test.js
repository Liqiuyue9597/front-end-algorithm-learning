class Scheduler {
  constructor(num) {
    this.maxNum = num;
    this.taskArr = [];
    this.runingNum = 0;
  }

  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.taskArr.push(() => promiseCreator().then(resolve, reject));
      this._run();
    })
  }

  _run() {
    while (this.runingNum < this.maxNum && this.taskArr.length > 0) {
      const task = this.taskArr.shift();
      this.runingNum++
      task()
        .finally(() => {
          this.runingNum--
          this._run()
        })
    }
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time);
});

const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// 输出顺序是：2 3 1 4

// 实现一个链式调用的串行Queue类
new Queue()
  .task(1000, () => {
    console.log(1)
  })
  .task(2000, () => {
    console.log(2)
  })
  .task(1000, () => {
    console.log(3)
  })
  .start() //调用start后才可以开始

class Queue {
  constructor() {
    this.queue = [];
  }

  task(time, fn) {
    this.queue.push(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fn()
          resolve()
        }, time)
      })
    })
    return this;
  }

  start() {
    this.queue.reduce((prev, curTask) => {
      prev.then(() => curTask())
    }, Promise.resolve())
  }
}

chain().eat().sleep(5).work().eat().work().sleep(10);

function chain() {
  this.eat = function () {
    console.log("eat");
    return this;
  };

  this.work = function () {
    console.log("work");
    return this;
  };

  this.sleep = function (time) {

    return this;
  };
  return this; //实现函数不是类，类会自动return，函数需要手动
}



Array.prototype.myMap = function (fn, thisArg) {
  const res = [];
  for (let index = 0; index < this.length; index++) {
    res.push(fn.call(thisArg, this[index], index, this))
  }

  return res;
}

function mapWithReduce(arr, fn) {
  return arr.reduce((prev, cur, i) => {
    prev.push(fn(cur));
    return prev;
  }, [])
}

Array.prototype.myReduce = function (fn, initialValue) {
  let res;
  let startIdx = 0;
  if (arguments.length >= 2) {
    res = initialValue
  } else {
    startIdx = 1;
    res = this[0]
  }
  for (let i = startIdx; i < this.length; i++) {
    res = fn(res, this[i], i, this)
  }

  return res;
}

class EventEmitter {
  constructor() {
    this.eventList = {};
  }

  on(eventName, callback) {
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = []
    }

    this.eventList[eventName].push(callback)
  }
  emit(eventName, ...args) {
    const events = this.eventList[eventName];
    if (events) {
      events.forEach(event => event(...args));
    }
  }
  off(eventName, callback) {
    const events = this.eventList[eventName];
    if (events) {
      this.eventList[eventName] = events.filter(event => event !== callback)
    }
  }
  once(eventName, callback) {
    const fn = (...args) => {
      callback(...args);
      this.off(eventName, fn);
    }
    this.on(eventName, fn)
  }
}



function flatten(arr, depth = Infinity) {
  let res = [];
  arr.forEach(item => {
    if (Array.isArray(item) && depth > 0) {
      res.push(...flatten(item, depth - 1))
    } else {
      res.push(item);
    }
  })

  return res;
}

function flatten(arr, depth = Infinity) {
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      return prev.concat(flatten(cur, depth - 1))
    } else {
      return prev.concat(cur);
    }
  }, [])
}

function flatten(arr, depth = Infinity) {
  const stack = [...arr];
  const res = []
  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      res.push(...item);
    } else {
      res.unshift(item);
    }
  }

  return res;
}

function groupBy(arr, keyFn) {
  let res = {}
  const isFn = typeof keyFn === 'function';
  arr.forEach((item) => {
    const key = isFn ? keyFn(item) : item[keyFn];
    if (!res[key]) {
      res[key] = []
    }
    res[key].push(item)
  })

  return res
}


var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const p = target - nums[i];
    if (!map.has(p)) {
      map.set(p, i);
    } else{
      return [map.get(p), i]
    }
  }
  return []
};
function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

