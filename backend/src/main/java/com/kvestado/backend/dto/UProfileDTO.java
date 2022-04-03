package com.kvestado.backend.dto;

import java.time.LocalDate;

public class UProfileDTO {

    private String username;
    private String email;
    private String about;
    private String pictureUrl;

    public UProfileDTO(String username, String email, String about, String pictureUrl) {
        this.username = username;
        this.email = email;
        this.about = about;
        this.pictureUrl = pictureUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }
}
