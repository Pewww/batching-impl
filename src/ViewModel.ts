import type Watcher from './observer/Watcher';

import Parser from './parser';

type Data = Record<string, any>;

interface Options {
  methods?: {
    [key: string]: Function;
  };
}

export interface ViewModelSource {
  el: string;
  data: Data;
  options?: Options;
}

export default class ViewModel {
  private _el: HTMLElement;
  private _data: Data;
  private _options?: Options;

  private listeners: Watcher[];

  private parser: Parser;

  constructor(props: ViewModelSource) {
    this._el = document.querySelector(props.el)
      ?? document.body;
    this._data = this.getProxy(props.data);
    this._options = props.options;

    this.listeners = [];

    this.parser = new Parser(this._el);
  }

  public get el() {
    return this._el;
  }

  public get data() {
    return this._data;
  }

  public get options() {
    return this._options;
  }

  public setData(newData: Data) {
    Object.keys(newData).forEach(key => {
      this._data[key] = newData[key];
    });
  }

  public render() {
    // v-dom 적용 안 됨
    this.parser.parse(this);
  }

  public subscribe(watcher: Watcher) {
    if (this.listeners.includes(watcher)) {
      return;
    }

    this.listeners.push(watcher);
  }

  public unsubscribe(watcher: Watcher) {
    this.listeners = this.listeners.filter(
      _watcher => watcher !== _watcher
    );
  }

  public notify() {
    this.listeners.forEach(watcher => {
      watcher.update();
    });
  }

  private getProxy(data: Data) {
    const handler = {
      set: (obj, key, value) => {
        obj[key] = value;
        this.notify();

        return true;
      }
    };

    const proxyObj = new Proxy(data, handler);

    // 객체를 밀봉함
    // Ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
    Object.seal(proxyObj);

    return proxyObj;
  }
}
