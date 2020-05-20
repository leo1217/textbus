import { SlotMap, Template, TemplateTranslator, ViewData } from '../core/template';
import { Fragment } from '../core/fragment';
import { VElement } from '../core/element';
import { EventType } from '../core/events';

export class ListTemplateTranslator implements TemplateTranslator {

  constructor(private tagName: string) {
  }

  match(template: HTMLElement): boolean {
    return template.nodeName.toLowerCase() === this.tagName;
  }

  from(el: HTMLElement): ViewData {
    const template = new ListTemplate(this.tagName);
    const childrenSlots: SlotMap[] = [];

    const childNodes = Array.from(el.childNodes);
    while (childNodes.length) {
      const slot = new Fragment();
      template.childSlots.push(slot);
      let first = childNodes.shift();
      let newLi: HTMLElement;
      while (first) {
        if (/^li$/i.test(first.nodeName)) {
          childrenSlots.push({
            from: first as HTMLElement,
            toSlot: slot
          })
          break;
        }
        if (!newLi) {
          newLi = document.createElement('li');
        }
        newLi.appendChild(first);
        first = childNodes.shift();
      }
      if (newLi) {
        childrenSlots.push({
          from: newLi,
          toSlot: slot
        })
        newLi = null;
      }
    }
    return {
      template,
      childrenSlots
    };
  }
}

export class ListTemplate extends Template {
  constructor(public tagName: string) {
    super();
  }

  render() {
    const list = new VElement(this.tagName);
    this.childSlots.forEach((slot, index) => {
      const li = new VElement('li');
      li.events.subscribe(event => {
        if (event.type === EventType.onEnter) {
          this.childSlots.splice(index, 0, new Fragment());
        }
        list.events.emit(event);
      });
      list.appendChild(li);
      this.viewMap.set(slot, li);
    })
    return list;
  }
}
