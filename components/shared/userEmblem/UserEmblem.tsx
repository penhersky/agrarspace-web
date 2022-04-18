import { Avatar, Typography } from "antd";
import React from "react";

import { IUser } from "../../../models/entity";
import styles from "./user-emblem.module.less";

interface IUserEmblem {
  user: IUser;
}

const UserEmblem: React.FC<IUserEmblem> = ({ user }) => (
  <div className={styles.emblem}>
    <Avatar size={27}>
      {user.firstName.substring(0, 1) + user.lastName.substring(0, 1)}
    </Avatar>
    <Typography className={styles.name}>
      {user.firstName} {user.lastName}
    </Typography>
  </div>
);

export default UserEmblem;
