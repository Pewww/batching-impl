import type ViewModel from '../ViewModel';

import { queueWatcher } from './scheduler';

export default class Watcher {
  private vm: ViewModel;

  private _id: string;

  constructor() {
    this._id = this.generateId();
  }

  public get id() {
    return this._id;
  }

  public bind(viewModel: ViewModel) {
    this.vm = viewModel;

    this.vm.subscribe(this);
    this.vm.render();
  }

  public update() {
    queueWatcher(this);
  }

  public run() {
    this.vm.render();
  }

  private generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}
