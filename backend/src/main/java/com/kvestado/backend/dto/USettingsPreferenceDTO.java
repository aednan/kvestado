package com.kvestado.backend.dto;

// to be used in case of additional settings needed
public class USettingsPreferenceDTO {
    private Boolean nightMode;

    public USettingsPreferenceDTO(Boolean nightMode) {
        this.nightMode = nightMode;
    }

    public Boolean getNightMode() {
        return nightMode;
    }

    public void setNightMode(Boolean nightMode) {
        this.nightMode = nightMode;
    }
}
