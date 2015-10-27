import {
  TestComponentBuilder,
  describe,
  expect,
  injectAsync,
  it
} from 'angular2/testing';
import {Component, View} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {AboutCmp} from './about';
import {NameList} from '../../services/name_list';

export function main() {
  describe('About component', () => {
    it('should work', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        return tcb.overrideTemplate(TestComponent, '<div><about></about></div>')
          .createAsync(TestComponent)
          .then((rootTC) => {
            rootTC.detectChanges();

            let aboutInstance = rootTC.debugElement.componentViewChildren[0].componentInstance,
                aboutDOMEl = rootTC.debugElement.componentViewChildren[0].nativeElement,
                nameListLen = function () {
                  return aboutInstance.list.names.length;
                };

            expect(aboutInstance.list).toEqual(jasmine.any(NameList));
            expect(nameListLen()).toEqual(4);
            expect(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            aboutInstance.addName({value: 'Minko'});
            rootTC.detectChanges();

            expect(nameListLen()).toEqual(5);
            expect(DOM.querySelectorAll(aboutDOMEl, 'li').length).toEqual(nameListLen());

            expect(DOM.querySelectorAll(aboutDOMEl, 'li')[4].textContent).toEqual('Minko');
          });
      }));

    describe('Method: addName(name: string)', () => {

      var abt,
          nameList;

      beforeEach(() => {
        nameList = new NameList;
        abt = new AboutCmp(nameList);
      });

      it('should be defined.', () => {
        expect(abt.addName).toBeDefined();
      });

      it('should add a new name to the list.', () => {

        var //preLength = nameList.get().length,
            name = 'Greg';

        console.log('Before: ');

        console.log(nameList.names);

        console.log(abt.list.names);

        nameList.add(name);
        //abt.addName(name);

        console.log('After: ');

        console.log(nameList.names);

        console.log(abt.list.names);

        //expect(nameList.get().length).toBe(preLength + 1);

        //expect(nameList.get()[preLength]).toBe(name);

      });

    });


  });
}

@Component({bindings: [NameList], selector: 'test-cmp'})
@View({directives: [AboutCmp]})
class TestComponent {}
