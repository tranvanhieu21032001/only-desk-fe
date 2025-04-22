import React, { useEffect } from "react";
import { Card, Switch, Select, Divider, Typography, Space } from "antd";
import { BulbOutlined, GlobalOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../core/store";
import {
  useLanguage,
  LANGUAGES,
} from "../../../shared/contexts/LanguageContext";
import { useTheme } from "../../../shared/contexts/ThemeContext";
import {
  selectTheme,
  selectLanguage,
  toggleThemeWithSideEffects,
  setThemeWithSideEffects,
  setLanguageWithSideEffects,
  setLanguage,
} from "../store";

const { Title } = Typography;
const { Option } = Select;

const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const reduxTheme = useAppSelector(selectTheme);
  const reduxLanguage = useAppSelector(selectLanguage);

  // Get theme and language from context
  const { theme: contextTheme, setTheme: setContextTheme } = useTheme();
  const { language: contextLanguage, changeLanguage, t } = useLanguage();

  // Synchronize Redux store with context on component mount
  useEffect(() => {
    if (reduxTheme !== contextTheme) {
      dispatch(setThemeWithSideEffects(contextTheme));
    }

    if (reduxLanguage !== contextLanguage) {
      dispatch(setLanguage(contextLanguage));
    }
  }, [dispatch, reduxTheme, contextTheme, reduxLanguage, contextLanguage]);

  const handleToggleTheme = () => {
    dispatch(toggleThemeWithSideEffects());
    // Also update context theme (will be redundant but ensures both systems stay in sync)
    setContextTheme(reduxTheme === "light" ? "dark" : "light");
  };

  const handleChangeLanguage = (value: string) => {
    // Update both Redux store and context directly
    dispatch(setLanguageWithSideEffects(value));
    // Use the context's changeLanguage function directly
    changeLanguage(value);
  };

  return (
    <SettingsContainer>
      <Title level={2}>{t("settings.title")}</Title>

      <Card>
        <SettingItem>
          <SettingLabel>
            <BulbOutlined />
            <span>{t("settings.theme.title")}</span>
          </SettingLabel>
          <Switch
            checked={reduxTheme === "dark"}
            onChange={handleToggleTheme}
            checkedChildren={t("settings.theme.dark")}
            unCheckedChildren={t("settings.theme.light")}
          />
        </SettingItem>

        <Divider />

        <SettingItem>
          <SettingLabel>
            <GlobalOutlined />
            <span>{t("settings.language.title")}</span>
          </SettingLabel>
          <Select
            value={contextLanguage} // Use context language directly
            style={{ width: 150 }}
            onChange={handleChangeLanguage}
          >
            <Option value={LANGUAGES.EN}>{t("settings.language.en")}</Option>
            <Option value={LANGUAGES.VI}>{t("settings.language.vi")}</Option>
          </Select>
        </SettingItem>
      </Card>

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card
          title={t("settings.plugins.title")}
          extra={<a href="/settings/plugins">{t("settings.plugins.manage")}</a>}
        >
          <p>{t("settings.plugins.all")}</p>
        </Card>
      </Space>
    </SettingsContainer>
  );
};

export default Settings;
