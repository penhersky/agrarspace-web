import { Avatar, Divider, Typography } from "antd";
import { useTranslation } from "next-i18next";
import React from "react";
import { useDispatch } from "react-redux";

import usOrganizationNavigator from "../../../hooks/organizationNavigator.hook";
import { UserTypes } from "../../../models/enums.model";
import { clearUserData } from "../../../store/actions";
import { clearStorage } from "../../../utils/storage";
import { Menu } from "../../shared";
import styles from "./app-header.module.less";

interface IUserMenu {
  type: UserTypes;
  name: string;
}

const UserMenu: React.FC<IUserMenu> = ({ name, type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { goToOrganizationSingIn } = usOrganizationNavigator();

  const handleOnSignOut = () => {
    dispatch(clearUserData());
    clearStorage();
    if (type === UserTypes.Employee) goToOrganizationSingIn();
    // TODO: add regular user sign out
  };

  return (
    <div className={styles.menu}>
      <div className={styles.hat}>
        <Avatar size={45}>{name.substring(0, 1)}</Avatar>
        <Typography.Title level={4} className={styles.name}>
          {name}
        </Typography.Title>
      </div>
      <Divider className={styles.divider} />
      <Menu>
        <Menu.Item label={t("user:profile")} />
        {/* DODO: add action for user profile */}
        <Menu.Item label={t("auth:singOut")} onClick={handleOnSignOut} />
      </Menu>
    </div>
  );
};

export default UserMenu;
