package com.kvestado.backend.dao;

import com.kvestado.backend.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign,Long> {

    public Optional<Campaign> findBySlug(String slug);
}
