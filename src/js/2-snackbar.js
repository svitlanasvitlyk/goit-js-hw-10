import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//html
const fulfilledRadio = document.querySelector('input[value="fulfilled"]');
const rejectedRadio = document.querySelector('input[value="rejected"]');
const submitButton = document.querySelector('button');
const inputNumber = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(inputNumber.value);
  const isFulfilled = fulfilledRadio.checked;

  const createPromise = delay => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isFulfilled) {
          resolve(`Fulfilled promise in ${delay}ms`);
        } else {
          reject(`Rejected promise in ${delay}ms`);
        }
      }, delay);
    });
  };

  //promise
  Promise.allSettled([createPromise(delay)]).then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        iziToast.success({
          title: 'OK',
          message: result.value,
        });
      } else if (result.status === 'rejected') {
        iziToast.error({
          title: 'Error',
          message: result.reason,
        });
      }
    });
  });

  form.reset();
});
//izi
iziToast.settings({
  timeout: 4000,
  resetOnHover: true,
  //   icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
  onOpening: function () {},
  onClosing: function () {},
});
