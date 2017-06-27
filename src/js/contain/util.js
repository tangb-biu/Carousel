let normalizeRadian = function(angle) {
    angle %= PI2;
    if (angle < 0) {
        angle += PI2;
    }
    return angle;
}
return { normalizeRadian };