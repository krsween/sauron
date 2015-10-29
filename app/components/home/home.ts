import { Component, NgFor, NgIf } from 'angular2/angular2';
//import { moment } from 'moment';

import { MockSuites } from '../../services/mock_suites';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [NgFor, NgIf]
})
export class HomeCmp {

  testSuites: any;

  months: Array<string>;


  constructor (public mockSuites: MockSuites) {
    this.testSuites = mockSuites.get();
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }


  formatTime(timestamp: string) {
    var date = new Date(timestamp),
        day = date.getDate(),
        monthIndex = date.getMonth();
    return day + '-' + this.months[monthIndex];
  }


}
