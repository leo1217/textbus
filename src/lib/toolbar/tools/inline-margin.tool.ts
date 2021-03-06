import { Form, FormTextField } from '../../uikit/forms/_api';
import { FormatMatcher } from '../matcher/format.matcher';
import { DropdownToolConfig, Toolkit } from '../toolkit/_api';
import { PreComponent } from '../../components/pre.component';
import { InlineMarginCommander } from '../commands/inline-margin.commander';
import { inlineMarginFormatter } from '../../formatter/margin.formatter';

export const inlineMarginToolConfig: DropdownToolConfig = {
  // iconClasses: ['textbus-icon-link'],
  label: '行内边距',
  tooltip: '行内边距',
  menuFactory() {
    return new Form({
      mini: true,
      editProperty: 'styles',
      items: [
        new FormTextField({
          label: '上边距',
          name: 'marginTop',
          placeholder: '请输入上边距'
        }),
        new FormTextField({
          label: '右边距',
          name: 'marginRight',
          placeholder: '请输入右边距'
        }),
        new FormTextField({
          label: '下边距',
          name: 'marginBottom',
          placeholder: '请输入下边距'
        }),
        new FormTextField({
          label: '左边距',
          name: 'marginLeft',
          placeholder: '请输入左边距'
        }),
      ]
    });
  },
  matcher: new FormatMatcher(inlineMarginFormatter, [PreComponent]),
  commanderFactory() {
    return new InlineMarginCommander(inlineMarginFormatter)
  }
};
export const inlineMarginTool = Toolkit.makeDropdownTool(inlineMarginToolConfig);
