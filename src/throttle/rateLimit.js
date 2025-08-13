function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Rate limiting utility
function rateLimit(fn, maxCalls, timeWindow) {
    let calls = [];

    return function(...args) {
        const now = Date.now();
        calls = calls.filter(time => now - time < timeWindow);

        if (calls.length >= maxCalls) {
            const waitTime = timeWindow - (now - calls[0]);
            // ?? this algorithm limit only for first timeWindow. 
            // move call to second timeWindow
            return timeout(waitTime).then(() => fn.apply(this, args));
        }

        calls.push(now);
        return fn.apply(this, args);
    };
}