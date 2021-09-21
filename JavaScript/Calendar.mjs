class Calendar {
  constructor(month, year) {
    this.days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.month = month;
    this.year = year;
  }

  returnArray() {
    let firstDay = new Date(`1 ${this.month} ${this.year}`);
    let a1 = [],
      a2 = [];
    let firstDayNumber = firstDay.getDay();
    let monthBefore, numberOfDaysInMonthBefore;

    if (this.month !== "January") {
      monthBefore = new Calendar(
        this.months[this.months.indexOf(this.month) - 1],
        this.year
      );
      numberOfDaysInMonthBefore = monthBefore.calculateNumberOfDays();
    } else {
      monthBefore = new Calendar("December", this.year - 1);
      numberOfDaysInMonthBefore = monthBefore.calculateNumberOfDays();
    }
    for (let i = 0; i < firstDayNumber; i++) {
      a1.push(numberOfDaysInMonthBefore - i);
    }
    a1 = a1.reverse();

    for (let i = 0; i < 7 - firstDayNumber; i++) {
      a1.push(i + 1);
    }
    for (
      let i = a1[a1.length - 1] + 1;
      i <= this.calculateNumberOfDays();
      i++
    ) {
      a2.push(i);
    }

    let lastDay = new Date(
      `${this.calculateNumberOfDays()} ${this.month} ${this.year}`
    );
    let lastDayNumber = lastDay.getDay();
    let a3 = [],
      j = 1;
    for (let i = lastDayNumber + 1; i < 7; i++) {
      a3.push(j);
      j++;
    }
    return [...a1, ...a2, ...a3];
  }

  calculateNumberOfDays() {
    let index = this.months.indexOf(this.month);
    if (
      index === 0 ||
      index === 2 ||
      index === 4 ||
      index === 6 ||
      index === 7 ||
      index === 9 ||
      index === 11
    ) {
      return 31;
    } else if (index === 1) {
      if (this.isLeapYear()) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 30;
    }
  }

  isLeapYear() {
    if (
      (this.year % 4 === 0 && this.year % 100 !== 0) ||
      this.year % 400 === 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  printCalendar() {
    let array = this.returnArray();
    let str = "";
    this.days.forEach((item) => {
      str += item + " ";
    });
    console.log(str);
    str = "";
    array.forEach((item, index) => {
      if (item < 10) {
        item = `0${item}`;
      }
      if ((index + 1) % 7 !== 0) {
        str += item + "  ";
      } else {
        console.log(str + item);
        str = "";
      }
    });
  }
}

export default Calendar;
