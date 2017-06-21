let arraySlice = Array.prototype.slice;

let Eventful = function () {
	this._$handlers = {};
}

Eventful.prototype = {
	constructor: Eventful,
	/**
	 * 单次绑定事件, trigger 后销毁
	 * 
	 * @param {string} event 事件名
	 * @param {function} handler 响应函数
	 * @param {Object} context
	 */
	one: function(event, handler, context) {
		let _h = this._$handlers;

		if(!handler || !event) {
			return this;
		}

		if(!_h[event]) {
			_h[event] = [];
		}

		for(let i=0; i<_h[event].length; i++) {
			if(_h[event][i].h === handler) {
				return this;
			}
		}

		_h[event].push({
			h: handler,
			one: true,
			ctx: context || this
		});

		return this;
	},
	
	/**
	 * 单次绑定事件
	 * 
	 * @param {string} event 事件名
	 * @param {function} handler 响应函数
	 * @param {Object} context
	 */
	on: function(event, handler, context) {
		let _h = this._$handlers;

		if(!handler || !event) {
			return this;
		}

		if(!_h[event]) {
			_h[event] = [];
		}

		for(let i=0; i<_h[event].length; i++) {
			if(_h[event][i].h === handler) {
				return this;
			}
		}

		_h[event].push({
			h: handler,
			one: false,
			ctx: context || this
		});

		return this;
	},
	
	/**
	 * 是否绑定了事件
	 * 
	 * @param {string} event 事件名
	 * @return {boolean}
	 */

	isSilent: function (event) {
		let _h = this._$handlers;
		return _h[event] && _h[event].length;
	},
	/**
	 * 解绑事件
	 * 
	 * @param {string} event 
	 * @param {function} handler
	 */

	off: function(event, handler) {
		let _h = this._$handlers;

		if (!event) {
			this._$handlers = {};
			return this;
		}

		if (handler) {
			if(_h[event]) {
				let newList = [];
				for(var i = 0, l = _h[event].length; i < l; i++) {
					if (_h[event][i]['h'] != handler) {
						newList.push(_h[event][i]);
					}
				}
				_h[event] = newList;
			}

			if (_h[event] && _h[event].length === 0) {
				delete _h[event];
			}
		} else {
			delete _h[event];
		}

		return this;
	},
	/**
	 * 分发事件
	 * 
	 * @param {string} type 事件类型
	 */
	trigger: function(type) {
		if(this._$handlers[type]) {
			let args = arguments;
			let argLen = args.length;

			if (argLen > 3) {
				args = arraySlice.call(args, 1);
			}

			let _h = this._$handlers[type];

			let len = _h.length;

			for (let i=0; i < len; ) {
				switch (argLen) {
					case 1:
						_h[i]['h'].call(_h[i]['ctx']);
						break;
					case 2:
						_h[i]['h'].call(_h[i]['ctx'], args[1]);
						break;
					case 3:
						_h[i]['h'].call(_h[i]['ctx'], args[1], args[2]);
						break;
					default:
						_h[i]['h'].apply(_h[i]['ctx'], args);
						break;
				}

				if(_h[i]['one']) {
					_h.splice(i, 1);
					len --;
				} else {
					i++;
				}
			}
		}

		return this;
	},
	/**
	 * 分发事件, 有context的事件
	 * 
	 * @param {string} type 事件类型
	 */
	triggerWithContext: function (type) {
		if(this._$handlers[type]) {
			let args = arguments;
			let argLen = args.length;

			if (argLen > 4) {
				args = arraySlice.call(args, 1, args.length - 1);
			}
			let ctx = args[args.length - 1];

			let _h = this._$handlers[type];

			let len = _h.length;

			for (let i=0; i < len; ) {
				switch (argLen) {
					case 1:
						_h[i]['h'].call(ctx);
						break;
					case 2:
						_h[i]['h'].call(ctx, args[1]);
						break;
					case 3:
						_h[i]['h'].call(ctx, args[1], args[2]);
						break;
					default:
						_h[i]['h'].apply(ctx, args);
						break;
				}

				if(_h[i]['one']) {
					_h.splice(i, 1);
					len --;
				} else {
					i++;
				}
			}
		}

		return this;
	}
}

export { Eventful }