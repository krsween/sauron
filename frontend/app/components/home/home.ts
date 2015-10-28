import { Component, NgFor } from 'angular2/angular2';
//import { moment } from 'moment';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [NgFor]
})
export class HomeCmp {
  testSuites: Array<Object>;
  months: Array<string>;

  constructor () {
    this.testSuites = [
      {
        id: 1,
        suiteName: "Suite 1",
        builds: [
          {
            id: "",
            date: "Wed Oct 28 2015 15:21:39 GMT-0400 (EDT)",
            status: "pass",
            totalSpecs: 0,
            totalPasses: 0,
            totalFails: 0,
            totalSkips: 0,
            url: "http://www.jenkins.com"
          }
        ]
      },
      {
        id: 2,
        suiteName: "Suite 2",
        builds: [
          {
            id: "",
            date: "Wed Oct 28 2015 15:21:39 GMT-0400 (EDT)",
            status: "pass",
            totalSpecs: 0,
            totalPasses: 0,
            totalFails: 0,
            totalSkips: 0,
            url: "http://www.jenkins.com"
          }
        ]
      }
    ];

    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  }


  formatTime (timestamp) {

    var date = new Date(timestamp),
        day = date.getDate(),
        monthIndex = date.getMonth(),
        year = date.getFullYear();

    return day + '-' + this.months[monthIndex];
  }

}
