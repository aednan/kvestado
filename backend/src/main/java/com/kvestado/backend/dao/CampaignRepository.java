package com.kvestado.backend.dao;

import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign,String> {

    public Optional<Campaign> findBySlug(String slug);
    public Page<Campaign> findByUser(User user, Pageable pageable);
    public Page<Campaign> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    public Page<Campaign> findByCampaignId(Long CampaignId, Pageable pageable);
    public Page<Campaign> findByBeneficiaryAddressIgnoreCase(String beneficiaryAddress, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE Campaign campaign set campaign.valid = :valid, campaign.campaignId= :campaignId where campaign.transactionHash = :transactionHash")
    void updateCampaignValueAndIdValues(@Param("valid") boolean valid, @Param("campaignId") Long campaignId, @Param("transactionHash") String transactionHash);
    // int to return id
}
