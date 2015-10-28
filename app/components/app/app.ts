import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_BINDINGS} from 'http/http';

import {HomeCmp} from '../home/home';
import {InfoCmp} from '../info/info';
import {NameList} from '../../services/name_list';

@Component({
  selector: 'app',
  viewBindings: [NameList],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/info/:suiteId', component: InfoCmp, as: 'Info' }
])
export class AppCmp {}
