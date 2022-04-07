package com.kvestado.backend.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Campaign implements Serializable {

    // After creating a campaign, the blockchain returns the ID, to be stored in the database
    @Id
    private Long id;
    private String coverPicturePath;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String beneficiaryAddress;
    private Long expireAfter;
    private Long amount;
    private Boolean minimumRaisedValueRequired;
    // campaign url slug
    @Column(unique = true)
    private String slug;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Campaign() {
    }
    public Campaign(Long id, String coverPicturePath, String title, String description, String beneficiaryAddress, Long expireAfter, Long amount, Boolean minimumRaisedValueRequired, User user, String slug) {
        this.id = id;
        this.coverPicturePath = coverPicturePath;
        this.title = title;
        this.description = description;
        this.beneficiaryAddress = beneficiaryAddress;
        this.expireAfter = expireAfter;
        this.amount = amount;
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
        this.user = user;
        this.slug = slug;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCoverPicturePath() {
        return coverPicturePath;
    }

    public void setCoverPicturePath(String coverPicturePath) {
        this.coverPicturePath = coverPicturePath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBeneficiaryAddress() {
        return beneficiaryAddress;
    }

    public void setBeneficiaryAddress(String beneficiaryAddress) {
        this.beneficiaryAddress = beneficiaryAddress;
    }

    public Long getExpireAfter() {
        return expireAfter;
    }

    public void setExpireAfter(Long expireAfter) {
        this.expireAfter = expireAfter;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Boolean getMinimumRaisedValueRequired() {
        return minimumRaisedValueRequired;
    }

    public void setMinimumRaisedValueRequired(Boolean minimumRaisedValueRequired) {
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
    }
}
