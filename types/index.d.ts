import {MyJQuery} from './MyJQuery'

declare function factory(doc: Document): MyJQuery

declare const $: MyJQuery


export = factory