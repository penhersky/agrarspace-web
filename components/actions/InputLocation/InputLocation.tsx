import { Button } from "antd";
import { useTranslation } from "next-i18next";
import React from "react";

import { ILocation } from "../../../models/entity.model";
import { MapIcon } from "../../../utils/icons";
import { Message } from "../../shared";

interface ILocationInputProps {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onLocated: (location: ILocation) => void;
}

const InputLocation: React.FC<ILocationInputProps> = ({
  className,
  onLocated,
}) => {
  const { t } = useTranslation("location");

  const onGetLocationHandler = () => {
    onLocated({ lat: 49.807991, lng: 23.31867 }); // TODO: add location input model with map
  };

  return (
    <Button className={className} onClick={onGetLocationHandler} type="text">
      <Message
        title={t("selectLocation")}
        icon={MapIcon}
        description={t("selectWeatherLocationDescription")}
        size="medium"
        className="hover-opacity"
      />
    </Button>
  );
};

export default InputLocation;
