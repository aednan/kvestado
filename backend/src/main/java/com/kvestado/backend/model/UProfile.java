package com.kvestado.backend.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class UProfile {

    // username is a placeholder instead of the wallet address
    @Id
    private String username;
    @Column(columnDefinition = "TEXT")
    private String email;
    @Column(columnDefinition = "TEXT")
    private String about;
    private LocalDate joined;
    private String pictureUrl;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public UProfile() {
    }

    public UProfile(String username, String email, String about, LocalDate joined, String pictureUrl, User user) {
        this.username = username;
        this.email = email;
        this.about = about;
        this.joined = joined;
        this.pictureUrl = pictureUrl;
        this.user = user;
    }

    public LocalDate getJoined() {
        return joined;
    }

    public void setJoined(LocalDate joined) {
        this.joined = joined;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
