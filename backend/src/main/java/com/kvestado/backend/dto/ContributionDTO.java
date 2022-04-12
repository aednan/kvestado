package com.kvestado.backend.dto;

public class ContributionDTO {

    private Long campaignId;
    private String campaignOwnerWalletAddress;
    private Double amount;

    public ContributionDTO() {
    }

    public ContributionDTO(Long campaignId, String campaignOwnerWalletAddress, Double amount) {
        this.campaignId = campaignId;
        this.campaignOwnerWalletAddress = campaignOwnerWalletAddress;
        this.amount = amount;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        if(campaignId == null) campaignId = 0l;
        this.campaignId = campaignId;
    }

    public String getCampaignOwnerWalletAddress() {
        return campaignOwnerWalletAddress;
    }

    public void setCampaignOwnerWalletAddress(String campaignOwnerWalletAddress) {
        this.campaignOwnerWalletAddress = campaignOwnerWalletAddress;
    }

    public Double getAmount() {
        if(amount == null) amount = 0d;
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
