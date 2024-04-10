import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({ position: 'topRight' });
let countdownInterval;

const startButton = document.querySelector('[data-start]');
const dateInput = document.querySelector('.datetime-picker');

startButton.addEventListener('click', function () {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = Date.now(); // Using Date.now() instead of new Date()
  if (!selectedDate || selectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a future date and time.',
    });
    return;
  }
  const msUntilSelectedDate = selectedDate.getTime() - currentDate;
  const { days, hours, minutes, seconds } = convertMs(msUntilSelectedDate);
  updateTimer(days, hours, minutes, seconds);
  startCountdown(msUntilSelectedDate);
  startButton.disabled = true;
});

const flatpickrInstance = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
  document.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
  document.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
  document.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
  document.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0');
}

function startCountdown(ms) {
  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    ms -= 1000;
    if (ms < 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
      iziToast.success({
        title: 'Finish',
        message: 'The countdown has finished!',
      });
      startButton.classList.remove('btn-disabled');
      startButton.disabled = false;
      dateInput.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(ms);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);

  startButton.disabled = true;
  dateInput.disabled = true;
  startButton.classList.add('btn-disabled');
}
