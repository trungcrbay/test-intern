

export const callFetchAirQuality = async (dataCountry: any, lat: any, lon: any) => {
    if (dataCountry) {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`)
        const data = await res.json()
        return data;
    }
}

export const callFetchDataCurrent = async (dataCountry: any, lat: any, lon: any, degreeUnit: any) => {
    if (dataCountry) {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${degreeUnit}&exclude=hourly&appid=${process.env.API_KEY}`)
        const data = await res.json()
        return data;
    }
}

export const callFetchDataCountry = async (cityValue: any) => {
    try {
        if (cityValue) {
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=1c5da32bd6a0d1c4c017b21b49833c7f`)
            const data = await res.json()
            return data;
        }
    } catch (e) {
        alert(e)
    }
}