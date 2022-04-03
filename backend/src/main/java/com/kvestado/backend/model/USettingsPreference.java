package com.kvestado.backend.model;

import org.springframework.security.core.Authentication;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;

@Entity
public class USettingsPreference implements Serializable {

    @Id
    private String walletAddress;
    private Boolean nightMode;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public USettingsPreference(Boolean nightMode, User user) {
        this.nightMode = nightMode;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
