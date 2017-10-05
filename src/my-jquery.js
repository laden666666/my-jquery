(function (global, factory) {
	"use strict"

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = factory;
	} else {
		global.$ = factory(global.document);
	}
})(typeof window !== "undefined" ? window : this, function (document) {

	//用于使用innerHTML生成dom的div
	var div = document.createElement("DIV");
	//用于插入使用的DocumentFragment
	var fragment = document.createDocumentFragment();

	//将html解析为my-jquery对象
	function buildHTML(selector) {
		selector = selector.trim();
		//如果是构建字符串，需要判断是否是<>格式，如果不是表示是选择器
		if(selector.startsWith("<")){
			div.innerHTML = selector;
			return $(div.children);
		} else {
			return $([]);
		}
	}

	//将html解析为fragment对象
	function buildFragment(dom) {
		var dom = $(dom);
		fragment.textContent = "";
		dom.each(function (i, item) {
			fragment.appendChild(item);
		})
		return fragment;
	}

	//将各种要插入对象做成一个buildFragment,根据fn插入
	function insertDom(targets, dom, fn) {
		//如果插入到的元素是多个,克隆之后再插入
		targets.each(function (i, item) {
			if(i != targets.length-1){
				fn(this, buildFragment(dom.clone()));
			} else {
				fn(this, buildFragment(dom));
			}
		});
	}

	//一个模板,用于生成setter和getter重载函数
	function access(myjq, setter, getter, key, value) {
		//是否是setter方法,如果是setter方法,value不能是undefined
		return value === undefined ? (myjq.length ? getter(myjq[0], key) : undefined) : myjq.each(function (index, item) {
			return setter(item, key, value)
		})
	}

    //短横线隔开式命名转驼峰命名
    function toCamelCase(name) {
        return name.replace(/-\S/g, function (splitChar) {
            return splitChar[1].toUpperCase();
        });
    }

    //克隆dom
	function domClone(item, hasSystem) {
		var dom = item.cloneNode(true);
		hasSystem && item[dataKey] && (dom[dataKey] = item[dataKey]);

		return dom;
	}

	//删除dom时候使用
	function clearData(item) {
		var arr;
		if(item.nodeType == 1){
			delete item[dataKey];
			arr = item.children;
		} else if(item && item.length != null){
			arr = item;
		} else {
			return;
		}

		for(var i; i < arr.length; i++){
			clearData(arr[i]);
		}
	}

	//防止冲突的id
	var $$mjid = ("" + Date.now() +  Math.random()).replace('.', '');
	//dom缓存的key
	var dataKey = "$$mjid" + $$mjid

	var $ = function(selector){
		return new $.fn.init(selector);
	}

	$.fn = $.prototype = {
		//唯一id
		$$mjid : $$mjid,

		//jquery对象原型
		init : function(selector){

			//如果没有选择器，直接返回
			if(!selector){
				return this;
			}

			if(typeof selector == "string"){
				//如果是字符串，表示可能是选择器，或者是构建字符串
				selector = selector.trim();
				//如果是构建字符串，需要判断是否是<>格式，如果不是表示是选择器
				if(selector.startsWith("<")){
					return $(buildHTML(selector));
				} else {
					//如果不是，说明是选择器，直接选择
					var doms = document.querySelectorAll(selector);

					//递归调用$，从新封装一次
					return $(doms);
				}
			} else if(typeof selector == "object" && !isNaN(selector["length"])){
				//类似数组就表示是数组。遍历数组或者是$.init对象，如果里面是dom元素封装返回
				for(var i = 0,length = 0; i < selector.length; i++){
					var dom = selector[i];
					if(dom && dom.nodeType == 1){
						this[length] = dom;
						length++;
					}
				}
				this.length = length;
				return this;
			} else if(selector.nodeType){
				//如果本身就是一个dom元素，直接封装返回
				this.length = 1;
				this[0] = selector;
				return this;
			}
		},

		//使init变为类数组对象
		length : 0,

		//模仿each
		each : function (fn) {
			for(var i =0; i < this.length; i++){
				if(typeof fn == 'function' && fn.call(this[i], i, this[i]) === false){
					break;
				};
			}
			return this;
		},

		eq: function(i){
			return $(this[i]);
		},

		//往集合增加一个dom
		add: function (item) {
			if(item && item.nodeType == 1){
				this[this.length++] = item;
			}
			return this;
		},

		//在某个节点下面找div
		find: function(selector){
			return access(this,null,function (dom, selector) {
				return $(dom.querySelectorAll(selector));
			},selector)
		},

		//用于将文档增添于
		append : function(child){
			insertDom(this, $(child), function ( parent,child) {
				parent.appendChild(child);
			})
			return this;
		},
		appendTo: function(parent){
			$(parent).append(this);
			return this;
		},
		prepend: function(child){
			insertDom(this, $(child), function ( parent,child) {
				parent.childNodes.length ?  parent.insertBefore(child, parent.childNodes[0]) : parent.appendChild(child);
			})
			return this;
		},
		prependTo: function(parent){
			$(parent).prepend(this);
			return this;
		},
		after: function(child){
			insertDom(this, $(child), function ( parent,child) {
				if(parent.parentNode.lastChild == parent){
					parent.parentNode.appendChild(child);
				} else {
					parent.parentNode.insertBefore(child, parent.nextSibling);
				}
			})
			return this;
		},
		insertAfter: function(parent){
			$(parent).after(this);
			return this;
		},
		before: function(child){
			insertDom(this, $(child), function ( parent,child) {
				parent.parentNode.insertBefore(child, parent);
			})
			return this;
		},
		insertBefore: function(parent){
			$(parent).before(this);
			return $(this[0]);
		},
		
		clone: function () {
			var arr = [];
			this.each(function (i, item) {
				arr.push(domClone(item, true));
			})
			return $(arr);
		},

		/**
		 * 删除dom
		 */
		remove: function () {
			this.each(function (i, item) {
				item.parentElement && item.parentElement.removeChild(item)
			})
			return this;
		},
				
		data: function (key, value) {
			return access(this, function (item, key, value) {
				if(!item[dataKey]){
					item[dataKey] = {};
				}
				item[dataKey][key] = value;
			}, function (item, key) {
				return item[dataKey] && item[dataKey][key];
			}, key, value);
		},

		attr: function (key, value) {
			return access(this, function (item, key, value) {
				item.setAttribute(key, value)
			}, function (item, key) {
				return item.getAttribute(key);
			}, key, value)
		},

		removeAttr: function (key) {
			return this.each(function (i, item) {
				if(key) {
					item.removeAttr(key);
				}
			})
		},

		addClass: function (className) {
			return this.each(function (i, item) {
				if(className) {
					item.classList.add(className)
				}
			});
		},

		removeClass: function (className) {
			return this.each(function (i, item) {
				if(className) {
					item.classList.remove(className)
				}
			});
		},

		hasClass: function (className) {
			return this.length ? this[0].classList.contains(className) : false;
		},

		toggleClass: function (className) {
			return this.each(function (i, item) {
				if(className) {
					if(item.classList.contains(className)){
						item.classList.remove(className);
					} else {
						item.classList.add(className);
					}
				}
			});
		},

		prop: function (key, value) {
			return access(this, function (item, key, value) {
				item[key] = value;
			}, function (item, key) {
				return item[key];
			}, key, value)
		},


		html: function(value) {
			return access(this, function (item, key, value) {
				clearData(item.children || {length : 0});
				item.innerHTML = value;
			}, function (item, key) {
				return item.innerHTML;
			}, "-", value)
		},
		text: function(value) {
			return access(this, function (item, key, value) {
				item.textContent = value;
			}, function (item, key) {
				return item.textContent;
			}, "-", value)
		},
		val: function(value) {
			return access(this, function (item, key, value) {
				item.value = value;
			}, function (item, key) {
				return item.value;
			}, "-", value)
		},
		hide: function() {
			return this.each(function (i, item) {
				if(item.style.display){
					$(item).data("my-jquery-style-display",item.style.display);
				}
				item.style.display="none";
			})
		},
		show: function() {
			return this.each(function (i, item) {
				item.style.display= $(item).data("my-jquery-style-display") || "";
			})
		},
		css: function (key, value) {
			return access(this, function (item, key, value) {
				item.style[toCamelCase(key)] = value;
			}, function (item, key) {
				return item.style[toCamelCase(key)];
			}, key, value)
		},

		on: function(eventName, fn){
            return this.each(function (i, item) {
                if(typeof fn != 'function'){
                	return;
                }

            	//注册的函数
            	var cacheFn = function (event) {
					if(fn.call(this, event) === false){
						event.preventDefault();
						event.stopPropagation();
					}
                }
                cacheFn.fn = fn;

                //缓存该函数
                var cacheEvent = $(item).data("my-jquery-event-cache") || {};
                cacheEvent[eventName] = cacheEvent[eventName] || [];
                cacheEvent[eventName].push(cacheFn)

                this.addEventListener(eventName, cacheFn, false);
                $(this).data("my-jquery-event-cache", cacheEvent)
            })
		},
		off: function(eventName, fn){
            return this.each(function (i, item) {
                var cacheEvent = $(this).data("my-jquery-event-cache");

                if(!cacheEvent)
                	return;

                var self = this;
                if(cacheEvent[eventName] instanceof Array){
                	var tempArr = [];
                    cacheEvent[eventName].forEach(function (cacheFn) {
                        if(typeof fn == 'function'){
                        	if( fn == cacheFn.fn){
                                self.removeEventListener(eventName, cacheFn, false);
                            } else {
                                tempArr.push(cacheFn)
                            }
                        } else {
                            self.removeEventListener(eventName, cacheFn, false);
						}
                    })

                    cacheEvent[eventName] = tempArr;
                    $(this).data("my-jquery-event-cache", cacheEvent)
                }
            })

		},
		toggle: function(eventName){
            return this.each(function (i, item) {
            	if(typeof this[eventName] == 'function'){
                    this[eventName]();
				}
            })
		}

	}

	$.fn.init.prototype = $.fn;

	return $;
})