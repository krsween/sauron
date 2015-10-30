import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'http/http';

import { HomeCmp } from '../home/home';
//import { AboutCmp } from '../about/about';
import { NameList } from '../../services/name_list';
import { MockSuites } from '../../services/mock_suites';

@Component({
  selector: 'app',
  viewProviders: [NameList, MockSuites],
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' }
])
export class AppCmp {}
