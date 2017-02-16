var div = document.createElement("DIV");
function buildHTML(selector) {
	selector = selector.trim();
	//如果是构建字符串，需要判断是否是<>格式，如果不是表示是选择器
	if(selector.startsWith("<")){
		div.innerHTML = selector;
		return $(div.children);
	} else {
		return $();
	}
}

function access(myjq, setter, getter, key, value) {
	//是否是setter方法,如果是setter方法,value不能是undefined
	return value === undefined ? getter(myjq[0], key) : myjq.each(function (item) {
		return setter(key, value)
	})
}

var $ = function(selector){
	return new $.fn.init(selector);
}

$.fn = $.prototype = {
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
				return $(buildHTML(div.children));
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
				if(dom && dom.nodeType){
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
			typeof fn == 'function' && fn.call(this[i], i, this[i]);
		}
		return this;
	},

	//在某个节点下面找div
	find: function(selector){
		return access(this,null,function (dom, selector) {
			return $(dom.querySelectorAll(selector));
		},selector)
	},

	append : function(child){
		this[0].appendChild($(child)[0]);
		return $(this[0])
	},
	appendTo: function(parent){
		$(parent)[0].appendChild(this[0]);
		return $(this[0])
	},
	prepend: function(child){
		this[0].insertBefore($(child)[0], this[0].firstChild);
		return $(this[0])
	},
	prependTo: function(parent){
		var parent = $(parent)[0];
		parent.insertBefore(this[0], parent.firstChild);
		return $(this[0])
	},
	after: function(parent){
		$(parent)[0].insertBefore(this[0]);
		return $(this[0])
	},
	before: function(parent){
		$(parent)[0].insertBefore(this[0]);
		return $(this[0])
	},
	insertAfter: function(parent){
		$(parent)[0].insertBefore(this[0]);
		return $(this[0])
	},
	insertBefore: function(parent){
		$(parent)[0].insertBefore(this[0]);
		return $(this[0])
	},


// attr(name|pro|key,val|fn)
// removeAttr(name)
//
// addClass(class|fn)
// removeClass([class|fn])
// toggleClass(class|fn[,sw])
//
// on(eve,[sel],[data],fn)1.7+
// off(eve,[sel],[fn])
//
// html([val|fn])
// text([val|fn])
// val([val|fn|arr])
}



$.fn.init.prototype = $.fn;