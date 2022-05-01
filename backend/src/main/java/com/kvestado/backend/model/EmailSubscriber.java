package com.kvestado.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class EmailSubscriber {

    @Id
    private String email;

    public EmailSubscriber() {
    }

    public EmailSubscriber(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
