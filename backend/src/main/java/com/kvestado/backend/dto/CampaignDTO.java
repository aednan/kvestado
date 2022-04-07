package com.kvestado.backend.dto;


public class CampaignDTO {

    private Long id;
    private String coverPicturePath;
    private String title;
    private String description;
    private String beneficiaryAddress;
    private Integer expireAfter;
    private Long amount;
    private Boolean minimumRaisedValueRequired;

    public CampaignDTO() {
    }

    public CampaignDTO(Long id, String coverPicturePath, String title, String description, String beneficiaryAddress, Integer expireAfter, Long amount, Boolean minimumRaisedValueRequired) {
        this.id = id;
        this.coverPicturePath = coverPicturePath;
        this.title = title;
        this.description = description;
        this.beneficiaryAddress = beneficiaryAddress;
        this.expireAfter = expireAfter;
        this.amount = amount;
        this.minimumRaisedValueRequired = minimumRaisedValueRequired;
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

    public Integer getExpireAfter() {
        return expireAfter;
    }

    public void setExpireAfter(Integer expireAfter) {
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
