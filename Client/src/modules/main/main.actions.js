import fetching from '../../_global/helpers/fetching';

function method1(...args) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log('run method1', ...args);
      res('result1');
    }, 3000);
  });
}

function method2(...args) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('run method2', ...args);
      res('result2');
      // rej('ошибка!!!');
    }, 3000);
  });
}

//последовательно
export function loadData(...args) {
  return fetching('loadData',
    async () => {
      const res1 = await method1(...args);
      console.log('end method1', res1);

      const res2 = await method2(...args);
      console.log('end method2', res2);
    }
  );
}

//параллельно
export function loadData2(...args) {
  return fetching('loadData2',
    async dispatch => {
      const promise1 = method1(...args);
      const promise2 = method2(...args);

      // const res1 = await promise1;
      // console.log('end method1!', res1);
      // const res2 = await promise2;
      // console.log('end method2!', res2);
      const res = await Promise.all([promise1, promise2]);
      console.log('end methods!', res, dispatch);
    },
    (dispatch, err) => {
      console.log('error: ', err, dispatch);
    }
  );
}
