<p align="center">
    <a href="https://www.npmjs.com/package/my-jquery"><img src="https://img.shields.io/npm/dm/my-jquery.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/my-jquery"><img src="https://img.shields.io/npm/v/my-jquery.svg" alt="Version"></a>
    <a href="https://www.npmjs.com/package/my-jquery"><img src="https://img.shields.io/npm/l/my-jquery.svg" alt="License"></a>
</p>

# my-jquery
一个jquery的模拟实现,计划不超过8k实现jquery的一些核心功能。与jQuery不同，my-jquery设计的目的不是解决浏览器兼容问题，而是致力于实现一个现代浏览器的轻量级dom操作库。my-jquery的api取自jQuery，但去除了如ajax、动画等功能，专注于dom处理。主要包括功能有：

A jquery interface to achieve the plan not to achieve more than 8k jquery some of the core functions, and jQuery different. my-jquery design is not designed to solve the browser compatibility issues, but is committed to implementing a modern browser lightweight dom operating library. my-jquery api from jQuery, but removed such as ajax, animation and other functions, focusing on dom processing. Mainly include functions:

+ 选择器（对document.querySelectorAll封装）
Selector (wrapper for document.querySelectorAll)
+ 样式相关操作（对Element.classList封装）
Style-related operations (for Element.classList encapsulation)
+ 事件相关操作，my-jquery可以像jQuery一些，克隆事件
Event related operations,  my-jquery can clone events like jQuery
+ Element的DOM相关操作
Element DOM related operations
+ 与jQuery不同，my-jquery并不打算支持扩展，而是嵌入到具体项目中，相当于一些项目的DOMHelper
Unlike jQuery, my-jquery does not intend to support extensions, but is embedded in a specific project, which is equivalent to some of the project's DOMHelper
+ 未来还会增加表单相关操作，目前暂未支持(T.T)
Will also increase the form of related operations, but currently no support (T.T)

# api
my-jquery的api和jQuery基本相同，但是它比jQuery的api要少很多，主要是为了my-jquery能够更小，以后会视情况继续增加jQuery的api。
目前支持的jQueryAPi：

my-jquery api and jQuery are basically the same, but it is much less than the api, mainly for my-jquery to be smaller, as the case will continue to increase jQuery api.
Currently supported by jQueryAPi

## 系统相关 system
each

## 选择器相关 selector
eq、add、find

## DOM操作相关 DOM operation
append、appendTo、prepend、prependTo、after、insertAfter、before、insertBefore、clone、remove

## 数据相关 data
data

## 属性相关 attribute
attr、removeAttr、prop、html、text、val

## 样式相关 style
addClass、removeClass、hasClass、toggleClass、hide、show、css

## 事件相关 event
on、off、toggle

# 兼容性
兼容ie9-11，及其他现代浏览器

Compatible with ie9-11, and other modern browsers