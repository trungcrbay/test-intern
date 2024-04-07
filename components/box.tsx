"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

const TemperatureCurrent = (props: any) => {
    const { dataCountry } = props;
    const [currentWeather, setCurrentWeather] = useState<any>([]);
    const [currentAirQuality, setCurrentAirQuality] = useState<any>([]);
    const [isCelcius, setIsCelsius] = useState<boolean>(false);
    //metric: độ C, imperial: độ F
    const [degreeUnit, setDegreeUnit] = useState("metric");
    const [indexSelectDay, setIndexSelectDay] = useState(0)

    const fetchDataCurrent = async () => {
        if (dataCountry) {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${dataCountry.lat}&lon=${dataCountry.lon}&units=${degreeUnit}&exclude=hourly&appid=${process.env.API_KEY}`)
            const data = await res.json()
            setCurrentWeather(data);
        }
    }

    const fetchAirQuality = async () => {
        if (dataCountry) {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${dataCountry.lat}&lon=${dataCountry.lon}&appid=${process.env.API_KEY}`)
            const data = await res.json()
            setCurrentAirQuality(data);
        }
    }

    useEffect(() => {
        fetchAirQuality();
        fetchDataCurrent();
    }, [dataCountry, degreeUnit])

    const convertToDayOfWeekAndTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000); //*1000 convert to miliseconds
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }); //weekday:long => get full name of day
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); //lấy giờ và phút dưới dạng số
        return `${dayOfWeek} ${time}`;
    }

    const convertToDay = (timestamp: number) => {
        const date = new Date(timestamp * 1000); //*1000 convert to miliseconds
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); //weekday:short => get 1 part  name of day
        return dayOfWeek;
    }

    const degreeToWindDirection = (degree: number) => {
        const val = Math.floor((degree / 22.5) + 0.5);
        const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return directions[(val % 16)];
    }

    const pickAirQuality = (airQuality: number) => {
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

    return (
        <>
            <div className=" mt-4 p-6">
                {dataCountry &&
                    <h2 className="font-bold text-[20px]">{dataCountry.name}, {dataCountry.country}</h2>
                }
                {indexSelectDay === 0 && currentWeather && currentWeather.current ? (
                    <>
                        <p className="text-[14px] text-gray-500">{convertToDayOfWeekAndTime(currentWeather.daily[0].dt)} • <span className="capitalize">
                            {currentWeather.current.weather[0].description}
                        </span></p>
                        <div className="flex justify-between items-center text-[14px]">
                            <div className="flex gap-4 items-center ">
                                <img src={`https://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@2x.png`} />
                                <p className="font-bold text-[44px]">
                                    {currentWeather.current.temp.toFixed()}°
                                    <span className="ml-2 align-text-top text-[14px]">
                                        <span className={clsx("cursor-pointer",{
                                            "text-gray-300": degreeUnit === 'metric'
                                        })}
                                         onClick={() => setDegreeUnit('imperial')}>F</span> /
                                        <span className={clsx("cursor-pointer",{
                                             "text-gray-300": degreeUnit === 'imperial'
                                        })}
                                        onClick={() => setDegreeUnit('metric')}>C</span>
                                    </span>
                                </p>

                            </div>
                            <div>
                                <p>Humidity: {currentWeather.current.humidity}%</p>
                                <p>Wind: {currentWeather.current.wind_speed} {degreeUnit === 'metric' ? 'KPH' : 'MPH'} {degreeToWindDirection(currentWeather.current.wind_deg)}</p>
                                <p>Air Quality: {currentAirQuality && currentAirQuality.list && currentAirQuality.list.length > 0 && pickAirQuality(currentAirQuality.list[0].main.aqi)}</p>
                            </div>

                        </div>
                    </>
                ) : <>
                    {
                        currentWeather.daily && <>
                            <p className="text-[14px] text-gray-500">{convertToDayOfWeekAndTime(currentWeather.daily[indexSelectDay].dt)} • <span className="capitalize">
                                {currentWeather.daily[indexSelectDay].weather[0].description}
                            </span></p>
                            <div className="flex justify-between items-center text-[14px]">
                                <div className="flex gap-4 items-center ">
                                    <img src={`https://openweathermap.org/img/wn/${currentWeather.daily[indexSelectDay].weather[0].icon}@2x.png`} />
                                    <p className="font-bold text-[44px]">
                                        {currentWeather.daily[indexSelectDay].temp.max.toFixed()}°
                                        <span className="ml-2 align-text-top text-[14px]">
                                            <span className="cursor-pointer">F</span> / <span className="cursor-pointer">C</span>
                                        </span>
                                    </p>

                                </div>
                                <div>
                                    <p>Humidity: {currentWeather.daily[indexSelectDay].humidity}%</p>
                                    <p>Wind: {currentWeather.daily[indexSelectDay].wind_speed} {degreeUnit === 'metric' ? 'KPH' : 'MPH'} {degreeToWindDirection(currentWeather.daily[indexSelectDay].wind_deg)}</p>
                                    <p>Air Quality: {currentAirQuality && currentAirQuality.list && currentAirQuality.list.length > 0 && pickAirQuality(currentAirQuality.list[0].main.aqi)}</p>
                                </div>

                            </div>
                        </>
                    }
                </>
                }
            </div>

            <div className=" mt-4">
                <div className="grid grid-rows-1 grid-flow-col">
                    {currentWeather && currentWeather.daily && currentWeather.daily.map((day: any, index: number) => {
                        return (
                            <>
                                <div
                                    onClick={() => setIndexSelectDay(index)}
                                    className={clsx("border w-[73.8px] flex flex-col items-center cursor-pointer",
                                        {
                                            " bg-gray-100": indexSelectDay === index
                                        }
                                    )}>
                                    <h3>{convertToDay(day.dt)}</h3>
                                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                                    <h3 className="font-bold">{day.temp.max.toFixed()}°</h3>
                                    <h4 className="text-[12px]">{day.temp.min.toFixed()}°</h4>
                                </div>
                            </>
                        )
                    })}

                </div>

            </div>
        </>
    );
}

export default TemperatureCurrent;