import 'core-js';
// import { Observable } from 'rxjs';

// import { createEditor } from './lib/create';
import {
  CodeTemplateTranslator, codeTool,
  Editor, fontSizeTool, italicFormatter,
  italicTool, olTool, strikeThroughFormatter,
  strikeThroughTool, ulTool, underlineFormatter,
  underlineTool
} from './lib/public-api';

import './lib/assets/index.scss';

import {
  ListTemplateTranslator,
  BlockTemplateTranslator,
  SingleTemplateTranslator,
  boldFormatter,
  colorFormatter,
  historyBackTool,
  historyForwardTool,
  headingTool,
  boldTool,
  colorTool
} from './lib/public-api';


const editor = new Editor('#editor', {
  templates: [
    new ListTemplateTranslator('ul'),
    new ListTemplateTranslator('ol'),
    new BlockTemplateTranslator('div'),
    new BlockTemplateTranslator('p'),
    new SingleTemplateTranslator('br'),
    new CodeTemplateTranslator()
  ],
  formats: [
    boldFormatter,
    colorFormatter,
    italicFormatter,
    strikeThroughFormatter,
    underlineFormatter
  ],
  toolbar: [
    [historyBackTool, historyForwardTool],
    [headingTool],
    [boldTool, italicTool, strikeThroughTool, underlineTool],
    [codeTool],
    [olTool, ulTool],
    [fontSizeTool],
    [colorTool]
  ]
});

editor.setContents(`
<ul>
<li style="color: red"><strong>fdsa</strong></li>
<strong>0<em>12</em></strong><em>34</em><strong><em>5</em>6</strong>
</ul>
test
`);

// const editor = createEditor('#editor', {
//   theme: 'dark',
//   usePaperModel: true,
//   uploader(type: string): string | Promise<string> | Observable<string> {
//     const fileInput = document.createElement('input');
//     fileInput.setAttribute('type', 'file');
//     fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
//     fileInput.style.cssText = 'position: absolute; left: -9999px; top: -9999px; opacity: 0';
//     document.body.appendChild(fileInput);
//     fileInput.click();
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve('/test')
//       }, 3000)
//     })
//   },
//   content: ``
// });

// editor.updateContentHTML('<p>p1<span>p-span</span></p><span>span3</span><span>span4</span><p>p2</p><span>span1</span><span>span2</span>')
//
// const box = document.getElementById('box');
// editor.onChange.subscribe(result => {
//   console.log(result);
//   box.innerText = result;
// });

// setTimeout(() => {
//   editor.setContents(`<html><body><div>测试</div></body></html>`)
// }, 3000);
