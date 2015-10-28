import { Component, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/angular2';

import { RouteParams } from 'angular2/router';

@Component({
  selector: 'info',
  templateUrl: './components/info/info.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class InfoCmp {
  suiteId: number;

  constructor(params:RouteParams) {
    this.suiteId = parseInt(params.get('suiteId'));
  }



}
