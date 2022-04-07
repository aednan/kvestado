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
    private String campaignOwnerWalletAddress;
    private Long amount;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Contribution() {
    }

    public Contribution(Long campaignId,String campaignOwnerWalletAddress, Long amount, User user) {
        this.campaignId = campaignId;
        this.campaignOwnerWalletAddress = campaignOwnerWalletAddress;
        this.amount = amount;
        this.user = user;
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

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
