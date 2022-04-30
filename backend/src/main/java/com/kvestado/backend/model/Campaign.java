package com.kvestado.backend.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
public class Campaign implements Serializable {

    // After creating a campaign, the blockchain returns the ID, to be stored in the database
    @Id
    private String transactionHash;
    private Long campaignId;
    private String coverPicturePath;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String beneficiaryAddress;
    private Long expireAfter;
    private Double amount;
    private Boolean minimumRaisedValueRequired;
    // campaign url slug
    @Column(unique = true)
    private String slug;
    private LocalDate createdAt;
    // valid if and only if the transaction status = success and confirmed
    private Boolean valid = false;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Campaign() {
    }
    public Campaign(String transactionHash,Long campaignId, String coverPicturePath,
                    String title, String description, String beneficiaryAddress,
                    Long expireAfter, Double amount, Boolean minimumRaisedValueRequired,
                    User user, String slug,LocalDate createdAt, Boolean valid) {
        this.transactionHash = transactionHash;
        this.campaignId = campaignId;
        this.coverPicturePath = coverPicturePath;
        this.title = title;
        this.description = description;
        this.beneficiaryAddress = beneficiaryAddress;
        this.expireAfter = expireAfter;
        this.amount = amount;
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
        this.user = user;
        this.slug = slug;
        this.createdAt = createdAt;
        this.valid = valid;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTransactionHash() {
        return transactionHash;
    }

    public void setTransactionHash(String transactionHash) {
        this.transactionHash = transactionHash;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Boolean getMinimumRaisedValueRequired() {
        return minimumRaisedValueRequired;
    }

    public void setMinimumRaisedValueRequired(Boolean minimumRaisedValueRequired) {
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
    }

    public Boolean getValid() {
        if(valid == null) return false;
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }
}
