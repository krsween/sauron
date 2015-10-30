import { Component, NgFor, NgIf, NgClass } from 'angular2/angular2';
import { MockSuites } from '../../services/mock_suites';
import { ColumnContainer, SingleColumnTotal } from './column';

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
          totalPasses: build.totalPasses || 0,
          totalFails: build.totalFails || 0,
          status: build.status || 0,
          totalSkips: build.totalSkips || 0,
        };

        columnTotals.addTotals(build.date.toString(), totalObj);
      });
    });
    this.columnTotals = columnTotals.getColumns();
  }


}
