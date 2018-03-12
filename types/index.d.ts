declare function factory(doc: Document): JQueryStatic

declare module 'my-jquery' {
    export = factory
}

type JQuerySeletor = string | {length: number} | Element

declare const $: JQueryStatic

interface JQueryStatic {
    (html: JQuerySeletor): JQueryStatic;
    length : number;
    each(i:number, item: any): this;
    eq(i: number): this;
    add(item: Element): this;
    find(selector: string): this;
    append(child: JQuerySeletor): this;
    appendTo(parent: JQuerySeletor): this;
    prepend(child: JQuerySeletor): this;
    prependTo(parent: JQuerySeletor): this;
    after(child: JQuerySeletor): this;
    insertAfter(parent: JQuerySeletor): this;
    before(child: JQuerySeletor): this;
    insertBefore(parent: JQuerySeletor): this;
    clone(): this;
    remove(): this;
    data(key: string, value: any): this;
    data(key: string): any;
    attr(key: string, value: string | number | null): this;
    attr(key: string): string | number | null;
    removeAttr(key: string): this;
    addClass(className: string): this;
    removeClass(className: string): this;
    hasClass(className: string): boolean;
    toggleClass(className: string): this;
    prop(key: string, value: string): this;
    prop(key): any;
    html(value: string): this;
    html(): string;
    text(value: string): this;
    text(): string;
    val(value: string): this;
    val(): string;
    hide(): this;
    show(): this;
    css(key: string, value: string): this;
    css(key: string): string;
    on(eventName: string, fn: Function): this;
    off(eventName: string, fn: Function): this;
    toggle(eventName: string): this;
}


export default factory