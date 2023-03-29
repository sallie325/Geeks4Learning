function getIntegerFromString(timepart: string): number {
    return parseInt(timepart);
}

// function 

function getTimeFormattedString(hours: number, minutes: number, seconds: number): string {
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

export { getIntegerFromString, getTimeFormattedString }