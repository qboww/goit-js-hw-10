import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const dateInput = document.querySelector('.datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

iziToast.settings({ position: 'topRight' });

let countdownInterval;

const flatpickrInstance = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
});

function convertMs(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return {
    days: days % 24,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

function updateTimer(days, hours, minutes, seconds) {
  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
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

startButton.addEventListener('click', () => {
  const selectedDate = flatpickrInstance.selectedDates[0];
  const currentDate = Date.now();
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
