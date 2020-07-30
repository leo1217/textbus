import { fromEvent, Observable, Subject } from 'rxjs';

import { Toolkit } from '../toolkit/toolkit';
import { AdditionalViewer } from '../toolkit/_api';
import { FindCommander } from '../commands/find.commander';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface FindAndReplaceRule {
  findValue: string;
  next: boolean;
  replaceValue: string;
  replace: boolean;
  replaceAll: boolean;
}

class FindForm implements AdditionalViewer {
  onAction: Observable<FindAndReplaceRule>;
  onDestroy: Observable<void>;
  elementRef = document.createElement('form');
  private actionEvent = new Subject<FindAndReplaceRule>();
  private destroyEvent = new Subject<void>();

  constructor() {
    this.onAction = this.actionEvent.asObservable();
    this.onDestroy = this.destroyEvent.asObservable();
    this.elementRef.classList.add('tbus-form', 'tbus-form-inline', 'tbus-form-tool');
    this.elementRef.innerHTML = `
<div class="tbus-form-group">
  <label class="tbus-control-label">查找</label>
  <div class="tbus-control-value">
    <input type="text" class="tbus-form-control" placeholder="请输入查找内容">
  </div>
  <div>
    &nbsp;<button class="tbus-btn tbus-btn-default" type="button">下一个</button>   
  </div>
</div>
<div class="tbus-form-group">
  <label class="tbus-control-label">替换</label>
  <div class="tbus-control-value">
    <div class="tbus-input-group">
      <input type="text" class="tbus-form-control" placeholder="替换成">
      <button class="tbus-btn tbus-btn-default" type="button">替换</button>
    </div>
  </div>
  <div>
    &nbsp;<button class="tbus-btn tbus-btn-default" type="button">全部替换</button>
  </div>
</div>
`;
    const [findInput, replaceInput] = Array.from(this.elementRef.querySelectorAll('input'));
    const [nextBtn, replaceBtn, replaceAllBtn] = Array.from(this.elementRef.querySelectorAll('button'));

    fromEvent(findInput, 'input').pipe(distinctUntilChanged(), debounceTime(200)).subscribe(() => {
      this.actionEvent.next({
        findValue: findInput.value,
        next: false,
        replaceAll: false,
        replace: false,
        replaceValue: ''
      })
    })
    nextBtn.addEventListener('click', () => {
      this.actionEvent.next({
        findValue: findInput.value,
        next: true,
        replaceAll: false,
        replace: false,
        replaceValue: ''
      })
    })
    replaceBtn.addEventListener('click', () => {
      this.actionEvent.next({
        findValue: findInput.value,
        next: false,
        replaceAll: false,
        replace: true,
        replaceValue: replaceInput.value
      })
    })
    replaceAllBtn.addEventListener('click', () => {
      this.actionEvent.next({
        findValue: findInput.value,
        next: false,
        replaceAll: true,
        replace: false,
        replaceValue: replaceInput.value
      })
    })
  }

  destroy() {
    this.actionEvent.next({
      findValue: '',
      next: false,
      replaceAll: false,
      replace: false,
      replaceValue: ''
    });
    this.destroyEvent.next();
    this.destroyEvent.complete();
  }
}

export const findTool = Toolkit.makeAdditionalTool({
  tooltip: '查找与替换',
  classes: ['tbus-icon-search'],
  menuFactory(): AdditionalViewer {
    return new FindForm();
  },
  commanderFactory() {
    return new FindCommander()
  }
})