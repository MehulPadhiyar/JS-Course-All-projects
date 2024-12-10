//data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-27T17:01:17.194Z',
    '2019-07-11T23:36:17.929Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-03-08T14:11:59.604Z',
    '2020-03-12T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-01-25T14:18:46.235Z',
    '2019-02-05T16:33:06.386Z',
    '2019-03-10T14:43:26.374Z',
    '2019-04-25T18:49:59.371Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-02-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-01-28T09:15:04.904Z',
    '2019-04-01T10:17:24.185Z',
    '2019-05-27T17:01:17.194Z',
    '2019-07-11T23:36:17.929Z',
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-03-08T14:11:59.604Z',
    '2020-03-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-01-25T14:18:46.235Z',
    '2019-02-05T16:33:06.386Z',
    '2019-03-10T14:43:26.374Z',
    '2019-04-25T18:49:59.371Z',
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-02-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

accounts.forEach((cur) => {
  cur.user = cur.owner.split(' ')[0].toLowerCase();
});

//Elements

const loginBtn = document.querySelector('.login__btn');
const inputUserName = document.querySelector('.login__input--user');
const inputUserPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmt = document.querySelector('.form__input--amount');
const inputLoanAmt = document.querySelector('.form__input--loan-amount');
const inputCloseUser = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const containerApp = document.querySelector('.app');
const ContainerMovements = document.querySelector('.movements');
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const transferWarningMsg = document.querySelector('.transfer--msg');
const loanWarningMsg = document.querySelector('.loan--msg');
const sortBtn = document.querySelector('.btn--sort');
const transferBtn = document.querySelector('.form__btn--transfer');
const loanBtn = document.querySelector('.form__btn--loan');
const closeBtn = document.querySelector('.form__btn--close');

let currentUser, timer;

loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  currentUser = accounts.find(({ user, pin }) => user === inputUserName.value && pin === +inputUserPin.value);

  if (!currentUser) return;

  if (timer) clearInterval(timer);

  timer = startLogOutTimer();

  printWelcome(currentUser.owner.split(' ')[0]);

  displayUI();
  containerApp.style.opacity = 1;
  clearInputs(inputUserName, inputUserPin);
});

const startLogOutTimer = function () {
  // 3.
  // There is always this 1s delay after the app loads and the start of the timer. And also between logins. So let's export the timer callback into its own function, and run it right away
  const tick = function () {
    let minutes = String(parseInt(time / 60, 10)).padStart(2, '0');
    let seconds = String(parseInt(time % 60, 10)).padStart(2, '0');
    // console.log(minutes, seconds);

    // Displaying time in element and clock
    labelTimer.textContent = `${minutes}:${seconds}`;

    // Finish timer
    if (time === 0) {
      // We need to finish the timer, otherwise it will run forever
      clearInterval(timer);

      // We log out the user, which means to fade out the app
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }

    // Subtract 1 second from time for the next iteration
    time--;
  };

  // Setting time to 5 minutes in seconds
  let time = 10 * 60;
  // let time = 10;

  tick();
  const timer = setInterval(tick, 1000);

  // LATER
  return timer;
};

//Bubble Sort
const sortArray = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
};

const formatCur = function (movement, locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(movement);
};

const formatDate = function (date, locale) {
  const date2 = Date.now();
  const daysPassed = Math.round((date2 - date) / (1000 * 60 * 60 * 24));

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} DAYS AGO`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const printWelcome = function (name) {
  const now = new Date();
  const greetings = new Map([
    [[6, 7, 8, 9, 10], 'Good Morning'],
    [[11, 12, 13, 14], 'Good Day'],
    [[15, 16, 17, 18], 'Good Afternoon'],
    [[19, 20, 21, 22], 'Good Evening'],
    [[23, 0, 1, 2, 3, 4, 5], 'Good Night'],
  ]);
  const arr = [...greetings.keys()].find((key) => key.includes(now.getHours()));
  labelWelcome.textContent = `${greetings.get(arr)}, ${name}!`;
};

const calcDisplayBal = function (movements) {
  const totalBal = movements.reduce((acc, cur) => acc + cur, 0);
  currentUser.totalBalance = totalBal;
  labelBalance.textContent = `${formatCur(totalBal, currentUser.locale, currentUser.currency)}`;
};

const calcDisplaySummary = function (movements) {
  const totalDeposit = movements.filter((cur) => cur > 0).reduce((acc, cur) => acc + cur);

  const totalWithdraw = -movements.filter((cur) => cur < 0).reduce((acc, cur) => acc + cur);
  const interest = currentUser.movements
    //.filter((mov) => mov > 0)
    .map((mov) => (mov * currentUser.interestRate) / 100)
    //.filter((int) => int > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${formatCur(totalDeposit, currentUser.locale, currentUser.currency)}`;
  labelSumOut.textContent = `${formatCur(totalWithdraw, currentUser.locale, currentUser.currency)}`;
  labelInterest.textContent = `${formatCur(interest, currentUser.locale, currentUser.currency)}`;
};

const displayMovements = function (movements, sort = false) {
  ContainerMovements.textContent = '';
  const mov = sort ? sortArray(movements.slice()) : movements;
  mov.forEach((cur, i) => {
    const type = cur > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${formatDate(Date.parse(currentUser.movementsDates[i]), currentUser.locale)}</div>
      <div class="movements__value">${formatCur(cur, currentUser.locale, currentUser.currency)}</div>
    </div>`;
    ContainerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const clearInputs = function (...inputs) {
  inputs.map((input) => (input.value = ''));
};

const displayUI = function () {
  displayMovements(currentUser.movements);
  calcDisplayBal(currentUser.movements);
  calcDisplaySummary(currentUser.movements);
};

let sorted = false;
sortBtn.addEventListener('click', function () {
  displayMovements(currentUser.movements, !sorted);
  sorted = !sorted;
});

transferBtn.addEventListener('click', function (e) {
  e.preventDefault();
  transferWarningMsg.textContent = '';
  const receiver = inputTransferTo.value;
  const amount = Number(inputTransferAmt.value);

  if (!receiver || !amount || amount <= 0) return;

  if (amount > currentUser.totalBalance) {
    clearInputs(inputTransferTo, inputTransferAmt);
    transferWarningMsg.textContent = 'insufficient balance!';
    return;
  }

  userAccount = accounts.find((cur) => receiver === cur.user);
  if (!userAccount) {
    clearInputs(inputTransferTo, inputTransferAmt);
    transferWarningMsg.textContent = 'user not found!';
    return;
  }

  currentUser.movements.push(-amount);
  currentUser.movementsDates.push(new Date());
  userAccount.movements.push(amount);
  userAccount.movementsDates.push(new Date());
  displayUI();
  clearInputs(inputTransferTo, inputTransferAmt);
});

loanBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmt = Number(inputLoanAmt.value);
  if (currentUser.movements.find((cur) => cur > loanAmt * 0.1)) {
    currentUser.movements.push(loanAmt);
    currentUser.movementsDates.push(new Date());
    displayUI();
  } else {
    loanWarningMsg.textContent = 'You are not eligible for loan!';
  }
  clearInputs(inputLoanAmt);
});

closeBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const closeAccount = accounts.find(({ user, pin }) => user === inputCloseUser.value && pin === +inputClosePin.value);
  if (!closeAccount) return;
  accounts.splice(accounts.indexOf(closeAccount), 1);
  clearInputs(inputCloseUser, inputClosePin);
  containerApp.style.opacity = 0;
});
