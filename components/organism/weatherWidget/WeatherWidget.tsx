import { Typography } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { OZ_PAGES } from "../../../constants/navigation";
import { WEATHER } from "../../../constants/units";
import useRouting from "../../../hooks/organizationNavigator.hook";
import { ILocation } from "../../../models/entity.model";
import { Lang } from "../../../models/enums.model";
import { getWeatherService } from "../../../services/weather/getWether.service";
import { setWeather, setWeatherCoordinates } from "../../../store/actions";
import { StateType } from "../../../store/store";
import {
  ArrowStickRight,
  CloudsIcon,
  HumidityIcon,
  PressureIcon,
  TemperatureIcon,
  VisibilityIcon,
} from "../../../utils/icons";
import { getWeatherIconPathById, WeatherIds } from "../../../utils/weatherIcon";
import { InputLocation } from "../../actions";
import { DynamicSvgImage, Loading } from "../../shared";
import styles from "./weather-widget.module.less";

interface IWeatherWidget {
  className?: string;
}

const WeatherWidget: React.FC<IWeatherWidget> = ({ className }) => {
  const dispatch = useDispatch();
  const { createPath } = useRouting();
  const { i18n } = useTranslation();
  const { weather, location } = useSelector(
    (state: StateType) => state.weather
  );

  useEffect(() => {
    if (!weather && location) {
      (async () => {
        const data = await getWeatherService(
          "on-call-weather",
          location.lat,
          location.lng,
          i18n.language as Lang
        );
        dispatch(setWeather(data.data));
      })();
    }
  }, [i18n.language, dispatch, weather, location]);

  const visibility = useMemo(() => {
    if (!weather) return styles.none;
    if (weather?.current.visibility < 9000) return styles.info;
    if (weather?.current.visibility < 4000) return styles.warn;
    if (weather?.current.visibility < 2000) return styles.error;
    return styles.none;
  }, [weather]);

  const locationHandler = (data: ILocation) => {
    dispatch(setWeatherCoordinates(data));
  };

  if (!location)
    return <InputLocation className={className} onLocated={locationHandler} />;
  if (!weather) return <Loading className={clsx(className, styles.widget)} />;

  return (
    <Link
      className={clsx(className, styles.widget)}
      to={createPath(OZ_PAGES.weather)}
    >
      <DynamicSvgImage
        className={styles.mainImage}
        url={getWeatherIconPathById({
          id: weather.current.weather[0].id as WeatherIds,
          sunrise: weather.current.sunrise,
          current: weather.current.dt,
          sunset: weather.current.sunset,
        })}
      />
      <div className={styles.main}>
        <div className={styles.group}>
          <Typography.Title level={5} className={styles.mainTemperature}>
            {weather.current.temp.toFixed(1)}
            {WEATHER.DEGREES}
          </Typography.Title>
          <TemperatureIcon size={32} className="icons" />
        </div>
        <div className={styles.group}>
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.pressure}
            {WEATHER.PRESSURE}
          </Typography.Title>
          <PressureIcon size={24} className="icons" />
        </div>
        <div className={styles.group}>
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.humidity}
            {WEATHER.HUMIDITY}
          </Typography.Title>
          <HumidityIcon size={24} className="icons" />
        </div>
        <div className={styles.group}>
          <ArrowStickRight
            size={24}
            style={{ transform: `rotate(${weather.current.wind_deg}deg)` }}
          />
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.wind_speed} {WEATHER.WIND}
          </Typography.Title>
        </div>
        <div
          className={clsx(
            styles.group,
            weather.current.clouds > 0 === styles.none
          )}
        >
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.clouds}
            {WEATHER.CLOUDS}
          </Typography.Title>
          <CloudsIcon size={24} className="icons" />
        </div>

        <div className={clsx(styles.group, visibility)}>
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.visibility}
            {WEATHER.VISIBILITY}
          </Typography.Title>
          <VisibilityIcon size={24} className="icons" />
        </div>
      </div>
    </Link>
  );
};

export default WeatherWidget;
