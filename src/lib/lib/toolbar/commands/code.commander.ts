import {
  Commander,
  Fragment,
  Parser,
  Renderer,
  TBSelection
} from '../../core/_api';
import { CodeTemplate, SingleTemplate } from '../../templates/_api';



export class CodeCommander implements Commander<string> {
  recordHistory = true;
  private lang = '';

  updateValue(value: string) {
    this.lang = value;
  }

  command(selection: TBSelection, overlap: boolean, renderer: Renderer, rootFragment: Fragment, parser: Parser): void {
    if (overlap) {
      selection.ranges.forEach(range => {
        const context = renderer.getContext(range.startFragment, CodeTemplate);
        context.lang = this.lang;
      });
    } else {
      selection.ranges.forEach(range => {
        const context = range.commonAncestorTemplate;
        const parentFragment = renderer.getParentFragmentByTemplate(context);
        const t = new CodeTemplate(this.lang);
        const f = new Fragment();
        f.append(new SingleTemplate('br'));
        t.childSlots.push(f);
        parentFragment.insertAfter(t, context);
      })
    }
  }
}
