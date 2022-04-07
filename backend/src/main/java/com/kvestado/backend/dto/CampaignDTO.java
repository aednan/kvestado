package com.kvestado.backend.dto;


public class CampaignDTO {

    private Long id;
    private String coverPicturePath;
    private String title;
    private String description;
    private String beneficiaryAddress;
    private Long expireAfter;
    private Long amount;
    private Boolean minimumRaisedValueRequired;
    private String slug;

    public CampaignDTO() {
    }

    public CampaignDTO(Long id, String coverPicturePath, String title, String description, String beneficiaryAddress, Long expireAfter, Long amount, Boolean minimumRaisedValueRequired,String slug) {
        this.id = id;
        this.coverPicturePath = coverPicturePath;
        this.title = title;
        this.description = description;
        this.beneficiaryAddress = beneficiaryAddress;
        this.expireAfter = expireAfter;
        this.amount = amount;
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
        this.slug = slug;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        if(slug == null) slug = "";
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

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        if(amount == null) amount = 0l;
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
