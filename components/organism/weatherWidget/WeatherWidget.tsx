import { Typography } from "antd";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { OZ_PAGES } from "../../../constants/navigation";
import useRouting from "../../../hooks/organizationNavigator.hook";
import { Lang } from "../../../models/enums.model";
import { getWeatherService } from "../../../services/weather/getWether.service";
import { setWeather } from "../../../store/actions";
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
import { DynamicSvgImage, Loading } from "../../shared";
import styles from "./weather-widget.module.less";

const WeatherWidget = () => {
  const dispatch = useDispatch();
  const { createPath } = useRouting();
  const { i18n } = useTranslation();
  const { weather } = useSelector((state: StateType) => state.weather);

  useEffect(() => {
    (async () => {
      const data = await getWeatherService(
        "on-call-weather",
        49.816115,
        23.331091,
        i18n.language as Lang
      );
      dispatch(setWeather(data.data));
    })();
  }, [i18n.language, dispatch]);

  const visibility = useMemo(() => {
    if (!weather) return styles.none;
    if (weather?.current.visibility < 9000) return styles.info;
    if (weather?.current.visibility < 4000) return styles.warn;
    if (weather?.current.visibility < 2000) return styles.error;
    return styles.none;
  }, [weather]);

  if (!weather) return <Loading />;

  return (
    <Link className={styles.widget} to={createPath(OZ_PAGES.weather)}>
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
            {weather.current.temp.toFixed(1)}°C
          </Typography.Title>
          <TemperatureIcon size={32} className="icons" />
        </div>
        <div className={styles.group}>
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.pressure}mm
          </Typography.Title>
          <PressureIcon size={24} className="icons" />
        </div>
        <div className={styles.group}>
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.humidity}%
          </Typography.Title>
          <HumidityIcon size={24} className="icons" />
        </div>
        <div className={styles.group}>
          <ArrowStickRight
            size={24}
            style={{ transform: `rotate(${weather.current.wind_deg}deg)` }}
          />
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.wind_speed} m/s
          </Typography.Title>
        </div>
        <div
          className={clsx(
            styles.group,
            weather.current.clouds > 0 === styles.none
          )}
        >
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.clouds}%
          </Typography.Title>
          <CloudsIcon size={24} className="icons" />
        </div>

        <div className={clsx(styles.group, visibility)}>
          <Typography.Title level={5} className={styles.mainSub}>
            {weather.current.visibility}km
          </Typography.Title>
          <VisibilityIcon size={24} className="icons" />
        </div>
      </div>
    </Link>
  );
};

export default WeatherWidget;
