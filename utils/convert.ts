
export const convertToDayOfWeekAndTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); //*1000 convert to miliseconds
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); //weekday:long => get full name of day
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); //lấy giờ và phút dưới dạng số
    return `${dayOfWeek} ${time}`;
}

export const convertToDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000); //*1000 convert to miliseconds
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); //weekday:short => get 1 part  name of day
    return dayOfWeek;
}

export const degreeToWindDirection = (degree: number) => {
    const val = Math.floor((degree / 22.5) + 0.5);
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return directions[(val % 16)];
}

export const pickAirQuality = (airQuality: number) => {
    switch (airQuality) {
        case 1:
            return "Good";
            break;
        case 2:
            return "Fair";
            break;
        case 3:
            return "Moderate";
            break;
        case 4:
            return "Poor";
            break;

        default:
            return "Very Poor"
    }
}