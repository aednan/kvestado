package com.kvestado.backend.dto;

public class UserInfo {
    private String username;
    private String email;
    private String about;
    private String pictureUrl;
    private String joined;
    private boolean nightMode;

    public UserInfo() {
    }

    public UserInfo(String username, String email, String about, String pictureUrl, String joined, boolean nightMode) {
        this.username = username;
        this.email = email;
        this.about = about;
        this.pictureUrl = pictureUrl;
        this.joined = joined;
        this.nightMode = nightMode;
    }

    public String getJoined() {
        if(joined == null) return "";
        return joined;
    }

    public void setJoined(String joined) {
        this.joined = joined;
    }

    public String getUsername() {
        if(username == null) return "";
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        if(email == null) return "";
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAbout() {
        if(about == null) return "";
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getPictureUrl() {
        if(pictureUrl == null) return "";
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public boolean isNightMode() {
        return nightMode;
    }

    public void setNightMode(boolean nightMode) {
        this.nightMode = nightMode;
    }
}
