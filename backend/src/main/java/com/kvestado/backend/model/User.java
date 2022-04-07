package com.kvestado.backend.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "w3user")
public class User implements UserDetails, Serializable {


    @Id
    private String walletAddress;
    // password isn't needed, challengeCode is generated after each Auth request
    // after a successful authentication the challengeCode should be updated with a random one
    // for the next authentication attempt
    private String challengeMessage;
    private Boolean accountNonExpired = true;
    private Boolean accountNonLocked = true;
    private Boolean credentialsNonExpired = true;
    private Boolean enabled = true;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<UAuthority> authorities = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "user")
    private List<Contribution> contributions = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "user")
    private List<Campaign> campaigns;

    // User Authorities and Roles
    public enum Role {
        ROLE_USER,
        ROLE_ADMIN,
        WRITE,
        READ,
    }
    ///////////////////////////////

    public User() { }

    public User(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public User(String walletAddress, String challengeMessage, Boolean accountNonExpired, Boolean accountNonLocked, Boolean credentialsNonExpired, Boolean enabled, List<UAuthority> authorities, List<Contribution> contributions,List<Campaign> campaigns) {
        this.walletAddress = walletAddress;
        this.challengeMessage = challengeMessage;
        this.accountNonExpired = accountNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
        this.authorities = authorities;
        this.contributions = contributions;
        this.campaigns = campaigns;
    }

    public List<Contribution> getContributions() {
        return contributions;
    }

    public void setContributions(List<Contribution> contributions) {
        this.contributions = contributions;
    }

    public List<Campaign> getCampaigns() {
        return campaigns;
    }

    public void setCampaigns(List<Campaign> campaigns) {
        this.campaigns = campaigns;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.challengeMessage;
    }

    @Override
    public String getUsername() {
        return this.walletAddress;
    }

    @Override
    public boolean isAccountNonExpired() {
        if(this.accountNonExpired == null) return false;
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        if(this.accountNonLocked == null) return false;
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        if(this.accountNonLocked == null) return false;
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        if(this.enabled == null) return false;
        return this.enabled;
    }

//---

    public void setUsername(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public void setPassword(String challengeMessage) {
        this.challengeMessage = challengeMessage;
    }

    public void setAccountNonExpired(Boolean accountNonExpired) {
        if(accountNonExpired == null) accountNonExpired = false;
        this.accountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(Boolean accountNonLocked) {
        if(accountNonLocked == null) accountNonLocked = false;
        this.accountNonLocked = accountNonLocked;
    }

    public void setCredentialsNonExpired(Boolean credentialsNonExpired) {
        if(credentialsNonExpired == null) credentialsNonExpired = false;
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(Boolean enabled) {
        if(enabled == null) enabled = false;
        this.enabled = enabled;
    }

    public void setAuthorities(List<UAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(walletAddress, user.walletAddress);
    }

    @Override
    public int hashCode() {
        return Objects.hash(walletAddress);
    }
}


