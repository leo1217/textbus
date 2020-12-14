TextBus 开发者规范
==============================


一段时间以来，有很多小伙伴跟我提到想参与 TextBus 的开发，我本人是持非常欢迎的态度的。但同时，也有小伙伴们也问我，要怎么参与？从何着手？等一系列问题。因为不同的开发者有不同的习惯，为了统一大家的代码风格及其它约定，特在此说明。

## 参与贡献前提

我始终认为开源项目的本质是大家交流和学习的一种方式，不同的人都会有自己的见解和经验，且不会因为年龄、性别、能力等客观因素而区分出高下。而且往往经验丰富的人会有思维定势，所以相对经验比较少的人，或者不懂的人才能更容易以使用者的角度去思考问题。这也是我一直追求的目标——所有的代码设计都是为了满足需求的前提下更简单易用。
基于以上思考，我欢迎任何人来参与或提出自己的见解。当然，你最好能先熟悉 TextBus 现在的设计思路和架构！

## 参与方式

你可以先 fork 一份代码到自己的仓库，然后拉出自己功能的分支。

如果是增加功能，分支名为 `feature/{name}`;

如果是修改 bug，分支名为 `fix/{name}`;

待功能实现或 bug 修复后，先提交到自己的仓库，然后通过 github 的 pull request 方式申请合并。我会在收到合并请求后审核，并根据审核结果决定是否合并你的请求。如果，你提交的 pull request 审核不能通过，我也会及时给你予反馈。

## 代码提交规范

为了方便从 commit message 上直观的获取此次变更信息，TextBus 的 commit message 需遵循以下规范（参考自 google Angular 项目），这也是现在大部分开源项目所遵循的规范：

+ feat：新功能（feature）
+ fix：修补bug
+ docs：文档（documentation）
+ style： 格式（不影响代码运行的变动）
+ refactor：重构（即不是新增功能，也不是修改bug的代码变动）
+ test：增加测试
+ chore：构建过程或辅助工具的变动

如果没有遵守上面的提交规范，你的代码可能不会被合并。