package com.kvestado.backend.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class PendingTransaction {

    @Id
    private String hash;
    // If a transaction remains pending for more than 30 days, it should be removed.
    private LocalDate dateOfCreation;

    public PendingTransaction() {
    }

    public PendingTransaction(String hash) {
        this.hash = hash;
    }
    public PendingTransaction(String hash, LocalDate dateOfCreation) {
        this.hash = hash;
        this.dateOfCreation = dateOfCreation;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public LocalDate getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(LocalDate dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }
}
