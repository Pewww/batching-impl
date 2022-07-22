import type { ViewModelSource } from './ViewModel';
import ViewModel from './ViewModel';

import Watcher from './observer/Watcher';

interface AppProps extends ViewModelSource {}

export default class App {
  private vm: ViewModel;
  private watcher: Watcher;

  constructor(props: AppProps) {
    this.vm = new ViewModel(props);
    this.watcher = new Watcher();

    this.watcher.bind(this.vm);
  }
}
