import { Component, NgFor, NgIf, NgClass } from 'angular2/angular2';
//import { moment } from 'moment';

import { MockSuites } from '../../services/mock_suites';



@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [NgFor, NgIf, NgClass]
})
export class HomeCmp {

  testSuites: Array<Object>;
  public columnTotals: Array<SingleColumnTotal>;
  months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  constructor (public mockSuites: MockSuites) {
    this.updateSuites();
  }

  updateSuites(): void {
    this.mockSuites.getSuites()
      .then((newSuites) => {
        this.testSuites = newSuites;
        this.getDatesAndTotals(newSuites);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDatesAndTotals(suites): void {
    let columnTotals = new ColumnContainer;
    suites.map((suite) => {
      // Iterate through the builds
      suite.builds.map((build) => {
        // Get dates of the builds

        var totalObj = {
          totalSpecs: build.totalSpecs || 0,
          specPasses: build.totalPasses || 0,
          specFails: build.totalFails || 0,
          status: build.status || 0,
          skips: build.totalSkips || 0,
        };

        columnTotals.addTotals(build.date.toString(), totalObj);
      });
    });
    this.columnTotals = columnTotals.getColumns();

    console.log(this.columnTotals);
  }


}































class SingleColumnTotal {
  date: string;
  specPasses: number;
  specFails: number;
  buildFails: number;
  totalSpecs: number;
  runs: number;
  skips: number;

  constructor (date: string, totals: any) {
    this.date = date;
    this.specPasses = totals.specPasses || 0;
    this.specFails = totals.specFails || 0;
    this.buildFails = totals.status === 'fail' ? 1 : 0;
    this.runs = totals.runs || 0;
    this.skips = totals.skips || 0;
    this.totalSpecs = totals.totalSpecs || (totals.specPasses + totals.specFails);
  }

  updateTotal (newTotals: any) {
    this.totalSpecs = newTotals.totalSpecs || (newTotals.specPasses + newTotals.specFails);
    this.specPasses += newTotals.specPasses || 0;
    this.specFails += newTotals.specFails || 0;
    this.buildFails += newTotals.status === 'fail' ? this.buildFails += 1 : null;
    this.skips += newTotals.skips || 0;
    this.runs += 1;
  }

  getName () : string {
    return this.date;
  }
}


class ColumnContainer {
  columns: Array<SingleColumnTotal> = [];
  constructor () {}

  getColumnIndex(key: string): number {
    let indexOfKey: number = -1;

    this.columns.forEach((column, index) => {
      if(column.getName() === key) {
        indexOfKey = index;
      }
    });

    return indexOfKey;
  }

  addTotals(date: string,  totals: any): void {
    var columnIndex = this.getColumnIndex(date),

      newTotals = {
        totalSpecs: totals.totalSpecs || (totals.specPasses + totals.specFails),
        specPasses: totals.specPasses || 0,
        specFails: totals.specFails || 0,
        status: totals.status || '',
        skips: totals.skips || 0
      };

    if(columnIndex === -1) {
      var column = new SingleColumnTotal(date, newTotals);
      this.columns.push(column);
    } else {
      this.columns[columnIndex].updateTotal(newTotals);
    }
  }

  deleteColumn(key:string): void {
    this.columns.forEach((column, index) => {
      if(column.getName() === key) {
        this.columns.splice(index, 1);
      }
    });
  }

  getColumns(): Array<SingleColumnTotal> {
    return this.columns;
  }
}
