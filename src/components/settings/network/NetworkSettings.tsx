import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { SettingContainer } from "../../ui/SettingContainer";
import { Input } from "../../ui/Input";
import { useSettings } from "../../../hooks/useSettings";

export const NetworkSettings: React.FC = () => {
  const { t } = useTranslation();
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const proxyUrl = getSetting("proxy_url") ?? "";
  const [localValue, setLocalValue] = useState(proxyUrl);

  useEffect(() => {
    setLocalValue(proxyUrl);
  }, [proxyUrl]);

  const handleBlur = () => {
    const trimmed = localValue.trim();
    const newValue = trimmed === "" ? null : trimmed;
    const currentValue = proxyUrl === "" ? null : proxyUrl;
    if (newValue !== currentValue) {
      updateSetting("proxy_url", newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <SettingsGroup title={t("settings.network.groups.proxy")}>
        <SettingContainer
          title={t("settings.network.proxy.label")}
          description={t("settings.network.proxy.description")}
          descriptionMode="tooltip"
          grouped={true}
          layout="stacked"
        >
          <Input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={t("settings.network.proxy.placeholder")}
            disabled={isUpdating("proxy_url")}
            className="w-full font-mono"
          />
        </SettingContainer>
      </SettingsGroup>
    </div>
  );
};
