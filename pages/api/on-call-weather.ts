import type { NextApiRequest, NextApiResponse } from "next";

import { Lang } from "../../models/enums.model";
import { getWeatherService } from "../../services/weather/getWeatherByOneCall.service";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { lat, lng, lang } = req.query;

    const result = await getWeatherService(+lat, +lng, lang as Lang);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
};
