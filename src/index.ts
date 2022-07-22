import App from './app';

import { runNext } from './observer/scheduler';

new App({
  el: '#app',
  data: {
    name: '우영우',
    names: ['기러기', '토마토', '스위스', '인도인', '별똥별']
  },
  options: {
    methods: {
      changeName() {
        const names = this.data.names;
        const namesLeng = names.length;

        this.setData({
          name: names[
            Math.floor(Math.random() * namesLeng)
          ]
        });
        this.setData({
          name: names[
            Math.floor(Math.random() * namesLeng)
          ]
        });
        this.setData({
          name: names[
            Math.floor(Math.random() * namesLeng)
          ]
        });

        (() => {
          const nameEl = this.el.querySelector('#name');
          console.log('DOM 갱신 전', nameEl.textContent);
        })();

        runNext(() => {
          const nameEl = this.el.querySelector('#name');
          console.log('DOM 갱신 후', nameEl.textContent);
        });
      }
    }
  }
});
