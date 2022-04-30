package com.kvestado.backend.model;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Entity
public class Contribution implements Serializable {

    @Id
    private Long campaignId;
    private String transactionHash;
    private String campaignOwnerWalletAddress;
    private Double amount;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    // valid if and only if the transaction status = success and confirmed
    private Boolean valid = false;

    public Contribution() {
    }

    public Contribution(Long campaignId,String transactionHash,String campaignOwnerWalletAddress, Double amount, User user, Boolean valid) {
        this.campaignId = campaignId;
        this.transactionHash = transactionHash;
        this.campaignOwnerWalletAddress = campaignOwnerWalletAddress;
        this.amount = amount;
        this.user = user;
        this.valid = valid;
    }

    public String getCampaignOwnerWalletAddress() {
        return campaignOwnerWalletAddress;
    }

    public void setCampaignOwnerWalletAddress(String campaignOwnerWalletAddress) {
        this.campaignOwnerWalletAddress = campaignOwnerWalletAddress;
    }

    public Long getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(Long campaignId) {
        this.campaignId = campaignId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Boolean getValid() {
        if(valid == null) return false;
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public String getTransactionHash() {
        return transactionHash;
    }

    public void setTransactionHash(String transactionHash) {
        this.transactionHash = transactionHash;
    }
}
