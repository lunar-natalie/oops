const { execSync } = require("child_process");

let parcelArgs = process.argv.slice(2);

if (parcelArgs.length > 0
    && parcelArgs[0] === "serve"
    && parcelArgs.indexOf("--port") === -1) {
    parcelArgs.push("--port", process.env.PORT || 8080);
}

if (process.env.PUBLIC_PREFIX) {
    parcelArgs.push(`--public-url '${process.env.PUBLIC_PREFIX}'`);
}

let argString = parcelArgs.reduce(
    (previousValue, currentValue, _currentIndex, _array) =>
    `${previousValue} ${currentValue}`);

execSync(`yarn parcel ${argString}`, { stdio: "inherit" });
