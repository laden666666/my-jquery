/**
 * Created by njz on 17/2/23.
 */
/**
 * Created by njz on 17/1/22.
 */
var jsdom = require("jsdom");
var fs = require("fs");
var assert = require('chai').assert;
var myjquery = fs.readFileSync("./src/my-jquery.js", "utf-8");
//使用jquery测试，用于做对比试验时候使用
// var myjquery = fs.readFileSync("./test/jquery.js", "utf-8");

describe('myjquery选择器', function () {

    var htmlTemplate =
        `<html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <h1 id="h1" class="h1">h1</h1>
            <div id="div"> <h2 id="h2"class="h2">h2</h2></div>
        </body>
    </html>`;

    it('myjquery的$函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                assert.equal($("#h1").text(), 'h1');
                assert.equal($(".h1").text(), 'h1');
                assert.equal($("h1").text(), 'h1');
                assert.equal($("#div #h2").text(), 'h2');
                done();
            }
        });
    });

    it('myjquery的find函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                var div = $("#div");
                assert.equal(div.find("#h2").text(), 'h2');
                assert.equal(div.find("h2").text(), 'h2');
                assert.equal(div.find(".h2").text(), 'h2');
                done();
            }
        });
    });
});


describe('样式相关操作', function () {

    var htmlTemplate =
        `<html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <h1 id="h1" class="h1">h1</h1>
            <h1 id="h2" class="h1">h1</h1>
        </body>
    </html>`;

    it('myjquery的addClass函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $(".h1").addClass("h2");
                assert.equal($("#h1")[0].classList.contains('h2'), true);
                assert.equal($("#h2")[0].classList.contains('h2'), true);
                done();
            }
        });
    });

    it('myjquery的hasClass函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                assert.equal($("#h1").hasClass('h1'), true);
                assert.equal($("#h2").hasClass('h2'), false);
                done();
            }
        });
    });

    it('myjquery的removeClass函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $(".h1").removeClass("h1");
                assert.equal($("#h1")[0].classList.contains('h1'), false);
                assert.equal($("#h2")[0].classList.contains('h1'), false);
                done();
            }
        });
    });

    it('myjquery的toggleClass函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $(".h1").css("color", 'red');
                assert.equal($(".h1").css("color"), 'red');
                $(".h1").css("font-size", '18px');
                assert.equal($(".h1")[0].style["fontSize"], '18px');
                done();
            }
        });
    });

    it('myjquery的css函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $(".h1").toggleClass("h2");
                assert.equal($("#h1")[0].classList.contains('h2'), true);
                $(".h1").toggleClass("h2");
                assert.equal($("#h2")[0].classList.contains('h2'), false);
                done();
            }
        });
    });


});

describe('dom相关操作', function () {

    var htmlTemplate =
        `<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <ul><li id="li1">1</li><li id="li2">2</li></ul>
            </body>
        </html>`;

    it('myjquery的append函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("ul").append("<li>3</li>")
                assert.equal($("ul li").eq(2).text(), "3");
                done();
            }
        });
    });

    it('myjquery的appendTo函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("<li>3</li>").appendTo("ul")
                assert.equal($("ul li").eq(2).text(), "3");
                done();
            }
        });
    });

    it('myjquery的prepend函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("ul").prepend("<li>0</li>")
                assert.equal($("ul li").eq(0).text(), "0");
                done();
            }
        });
    });

    it('myjquery的prependTo函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("<li>0</li>").prependTo("ul")
                assert.equal($("ul li").eq(0).text(), "0");
                done();
            }
        });
    });
    it('myjquery的after函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("#li2").after("<li>3</li>")
                assert.equal($("ul li").eq(2).text(), "3");
                done();
            }
        });
    });

    it('myjquery的insertAfter函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("<li>3</li>").insertAfter("#li2")
                assert.equal($("ul li").eq(2).text(), "3");
                done();
            }
        });
    });

    it('myjquery的before函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("#li1").before("<li>0</li>")
                assert.equal($("ul li").eq(0).text(), "0");
                done();
            }
        });
    });

    it('myjquery的insertBefore函数', function (done) {
        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("<li>0</li>").insertBefore("#li1")
                assert.equal($("ul li").eq(0).text(), "0");
                done();
            }
        });
    });

    it('myjquery的插入到多个对象时克隆测试', function (done) {

        var htmlTemplate =
            `<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <ul id="ul1"><li id="li1">1</li><li id="li2">2</li></ul>
                <ul id="ul2"><li id="li3">3</li></ul>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("#li3").data("test","111").insertBefore("#ul1 li");

                assert.equal($("#ul1 li").length, 4);
                assert.equal($("#ul2 li").length, 0);
                assert.equal($("#ul1 li").eq(0).text(), "3");
                assert.equal($("#ul1 li").eq(2).text(), "3");
                done();
            }
        });
    });

    it('myjquery的html函数', function (done) {

        var htmlTemplate =
            `<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="div"></div>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("#div").html("<span id='span'></span>")
                assert.equal($("#span").length, 1);
                $("#div").html("")
                assert.equal($("#span").length, 0);
                done();
            }
        });
    });

    it('myjquery的remove函数', function (done) {
        
        var htmlTemplate =
            `<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="div">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("#div span").remove()
                assert.equal($("#div span").length, 0);
                done();
            }
        });
    });

    it('对DocumentFragment的支持', function (done) {
        
        var htmlTemplate =
            `<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="div">
                </div>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                var document = window.document;
                assert.equal($("#div span").length, 0);
                var docFragment = $(document.createDocumentFragment())
                docFragment.append('<span>1</span>')
                docFragment.append('<span>2</span>')
                $('#div').append(docFragment)
                assert.equal($("#div span").length, 2);
                done();
            }
        });
    });
});


describe('事件相关操作', function () {

    it('myjquery的on函数', function (done) {

        var htmlTemplate =
            `<html>
            <body>
                <button id="button"></button>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                $("#button").on("click", function () {
                    done();
                });

                $("#button")[0].click();
            }
        });
    });

    it('myjquery的事件冒泡阻止', function (done) {

        var htmlTemplate =
            `<html>
            <body>
                <button id="button"></button>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;

                var timer = setTimeout(function () {
                    done();
                }, 100)

                $("body").on("click", function () {
                    clearTimeout(timer)
                });

                $("#button").on("click", function () {
                    return false;
                });

                $("#button")[0].click();
            }
        });
    });


    it('myjquery的off函数，解除事件', function (done) {

        var htmlTemplate =
            `<html>
            <body>
                <button id="button"></button>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;

                var timer = setTimeout(function () {
                    done();
                }, 100)

                $("#button").on("click", function () {
                    clearTimeout(timer)
                });

                $("#button").off("click");

                $("#button")[0].click();
            }
        });
    });

    it('myjquery的局部解除事件', function (done) {

        var htmlTemplate =
            `<html>
            <body>
                <button id="button"></button>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;
                var arr = []

                var fn1 = function () {
                    arr.push(1)
                }
                var fn2 = function () {
                    arr.push(2)
                }

                $("#button").on("click", fn1);
                $("#button").on("click", fn2);

                $("#button").off("click", fn1);

                $("#button")[0].click();

                assert.equal(arr[0], 2);

                done()
            }
        });
    });


    it('myjquery的toggle函数', function (done) {

        var htmlTemplate =
            `<html>
            <body>
                <button id="button"></button>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;

                $("#button").on("click", function () {
                    done()
                });

                $("#button").toggle('click');
            }
        });
    });


    it('myjquery的事件克隆', function (done) {

        var htmlTemplate =
            `<html>
            <body>
                <div class="div"></div>
                <div class="div"></div>
            </body>
        </html>`;

        var jsdom = require('jsdom');
        jsdom.env({
            html: htmlTemplate,
            src: [myjquery],
            done: function (error, window) {
                var $ = window.$;

                $(".div").append($("<button>").on('click', function () {
                    done()
                }))

                $("button").eq(1).toggle('click');
            }
        });
    });
});