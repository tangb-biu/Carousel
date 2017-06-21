import { HandlerDomProxy } from './core/handlerProxy'
import { createDom } from './core/dom'

let el = document.getElementById('main');
let width = +getComputedStyle(el)['width'].slice(0, -2);
let height = +getComputedStyle(el)['height'].slice(0, -2);
let canvas  = createDom(1234, 'canvas', {width, height}, 1)

var eve = new HandlerDomProxy(canvas)
el.appendChild(canvas);

eve.on('click', function(){
	console.log('aaaaa');
})
eve.on('mousemove', function(e){
	console.log(e);
})
export var name = 'Hello world';