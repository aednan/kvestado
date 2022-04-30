package com.kvestado.backend.dto;

public class CampaignDTO {

    // Transaction receipt
    private String transactionHash;
    private String coverPicturePath;
    private String campaignOwner;
    private String title;
    private String description;
    private String beneficiaryAddress;
    private Long expireAfter;
    // raised amount
    private Double amount;
    private Boolean minimumRaisedValueRequired;
    private String slug;
    private String createdAt;

    public CampaignDTO() {
    }

    public CampaignDTO(String transactionHash,String campaignOwner,String coverPicturePath, String title, String description, String beneficiaryAddress, Long expireAfter, Double amount, Boolean minimumRaisedValueRequired,String slug, String createdAt) {
        this.transactionHash = transactionHash;
        this.campaignOwner = campaignOwner;
        this.coverPicturePath = coverPicturePath;
        this.title = title;
        this.description = description;
        this.beneficiaryAddress = beneficiaryAddress;
        this.expireAfter = expireAfter;
        this.amount = amount;
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
        this.slug = slug;
        this.createdAt = createdAt;
    }

    public String getCampaignOwner() {
        return campaignOwner;
    }

    public void setCampaignOwner(String campaignOwner) {
        this.campaignOwner = campaignOwner;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        if(slug == null) slug = "";
        this.slug = slug;
    }

    public String getTransactionHash() {
        return transactionHash;
    }

    public void setTransactionHash(String transactionHash) {
        this.transactionHash = transactionHash;
    }

    public String getCoverPicturePath() {
        return coverPicturePath;
    }

    public void setCoverPicturePath(String coverPicturePath) {
        if(coverPicturePath == null) coverPicturePath = "";
        this.coverPicturePath = coverPicturePath;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        if(title == null) title = "";
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if(description == null) description = "";
        this.description = description;
    }

    public String getBeneficiaryAddress() {
        return beneficiaryAddress;
    }

    public void setBeneficiaryAddress(String beneficiaryAddress) {
        if(beneficiaryAddress == null) beneficiaryAddress = "";
        this.beneficiaryAddress = beneficiaryAddress;
    }

    public Long getExpireAfter() {
        return expireAfter;
    }

    public void setExpireAfter(Long expireAfter) {
        if(expireAfter == null) expireAfter = 0l;
        this.expireAfter = expireAfter;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        if(amount == null) amount = 0d;
        this.amount = amount;
    }

    public Boolean getMinimumRaisedValueRequired() {
        return minimumRaisedValueRequired;
    }

    public void setMinimumRaisedValueRequired(Boolean minimumRaisedValueRequired) {
        if(minimumRaisedValueRequired == null) minimumRaisedValueRequired = false;
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
    }
}
