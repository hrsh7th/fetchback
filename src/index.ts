export type FetchState<R, E> = {
  state: 'loading';
} | {
  state: 'success';
  response: R;
} | {
  state: 'failure';
  error: E;
};

export const fetch = <R>(
  runner: () => Promise<R>,
)=> {
  return <E>(callback: (s: FetchState<R, E>) => void) => {
    const p = runner();
    callback({
      state: 'loading',
    });
    p.then(response => {
      callback({
        state: 'success',
        response: response
      });
    }, (error) => {
      callback({
        state: 'failure',
        error: error,
      });
    });
  }
};

