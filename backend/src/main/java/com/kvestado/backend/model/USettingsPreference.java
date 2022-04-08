package com.kvestado.backend.model;

import org.springframework.security.core.Authentication;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class USettingsPreference implements Serializable {

    @Id
    // user_id
    private String walletAddress;
    private Boolean nightMode;

    public USettingsPreference() {
    }

    public USettingsPreference(Boolean nightMode) {
        this.nightMode = nightMode;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    // The id is the same as the authenticated user wallet address
    public void setWalletAddress(Authentication authentication) {
        if(authentication!=null)
        this.walletAddress = authentication.getName();
    }

    public Boolean getNightMode() {
        if(nightMode == null) return false;
        return nightMode;
    }

    public void setNightMode(Boolean nightMode) {
        this.nightMode = nightMode;
    }

}
