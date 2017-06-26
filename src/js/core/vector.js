let  ArrayCtor = typeof Float32Array === 'undefined' ? Array : Float32Array;

let vector = {
	create: function (x, y) {
		let out = new ArrayCtor(2);
		if (x == null) {
			x = 0;
		}
		if (y == null) {
			y = 0;
		}

		out[0] = x;
		out[1] = y;
		return out;
	},

	copy: function (out, v) {
		out[0] = v[0];
		out[1] = v[1];
		return out;
	},

	clone: function (v) {
		let out = new ArrayCtor(2);
		out[0] = v[0];
		out[1] = v[1];
		return out;
	},

	set: function(out, a, b) {
		out[0] = a;
		out[1] = b;
		return out;
	},

	add: function (out, v1, v2) {
		out[0] = v1[0] + v2[0];
		out[1] = v1[1] + v2[1];
		return out;
	},

	scaleAndAdd: function(out, v1, v2, a){
		out[0] = v1[0] + v2[0] * a;
		out[1] = v1[1] + v2[1] * a;
		return out;
	},

	sub: function (out, v1, v2) {
		out[0] = v1[0] - v2[0];
		out[1] = v1[1] - v2[1];
		return out;
	},

	len: function (v) {
		return Math.sqrt(this.lenSquare(v));
	},

	lenSquare: function (v) {
		return v[0] * v[0] + v[1] * v[1];
	},

	mul: function(out, v1, v2) {
		out[0] = v1[0] * v2[0];
		out[1] = v1[1] * v2[1];
		return out;
	},

	div: function (out, v1, v2) {
		out[0] = v1[0] / v2[0];
		out[1] = v1[1] / v2[1];
		return out;
	},
	dot: function (v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    },

    /**
     * 向量缩放
     * @param {Vector2} out
     * @param {Vector2} v
     * @param {number} s
     */
    scale: function (out, v, s) {
        out[0] = v[0] * s;
        out[1] = v[1] * s;
        return out;
    },

    /**
     * 向量归一化
     * @param {Vector2} out
     * @param {Vector2} v
     */
    normalize: function (out, v) {
        var d = vector.len(v);
        if (d === 0) {
            out[0] = 0;
            out[1] = 0;
        }
        else {
            out[0] = v[0] / d;
            out[1] = v[1] / d;
        }
        return out;
    },

    /**
     * 计算向量间距离
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @return {number}
     */
    distance: function (v1, v2) {
        return Math.sqrt(
            (v1[0] - v2[0]) * (v1[0] - v2[0])
            + (v1[1] - v2[1]) * (v1[1] - v2[1])
        );
    },

    /**
     * 向量距离平方
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @return {number}
     */
    distanceSquare: function (v1, v2) {
        return (v1[0] - v2[0]) * (v1[0] - v2[0])
            + (v1[1] - v2[1]) * (v1[1] - v2[1]);
    },

    /**
     * 求负向量
     * @param {Vector2} out
     * @param {Vector2} v
     */
    negate: function (out, v) {
        out[0] = -v[0];
        out[1] = -v[1];
        return out;
    },

    /**
     * 插值两个点
     * @param {Vector2} out
     * @param {Vector2} v1
     * @param {Vector2} v2
     * @param {number} t
     */
    lerp: function (out, v1, v2, t) {
        out[0] = v1[0] + t * (v2[0] - v1[0]);
        out[1] = v1[1] + t * (v2[1] - v1[1]);
        return out;
    },

    /**
     * 矩阵左乘向量
     * @param {Vector2} out
     * @param {Vector2} v
     * @param {Vector2} m
     */
    applyTransform: function (out, v, m) {
        var x = v[0];
        var y = v[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
    },
    /**
     * 求两个向量最小值
     * @param  {Vector2} out
     * @param  {Vector2} v1
     * @param  {Vector2} v2
     */
    min: function (out, v1, v2) {
        out[0] = Math.min(v1[0], v2[0]);
        out[1] = Math.min(v1[1], v2[1]);
        return out;
    },
    /**
     * 求两个向量最大值
     * @param  {Vector2} out
     * @param  {Vector2} v1
     * @param  {Vector2} v2
     */
    max: function (out, v1, v2) {
        out[0] = Math.max(v1[0], v2[0]);
        out[1] = Math.max(v1[1], v2[1]);
        return out;
    }
};

vector.length = vector.len;
vector.lengthSquare = vector.lenSquare;
vector.dist = vector.distance;
vector.distSquare = vector.distanceSquare;

export { vector }