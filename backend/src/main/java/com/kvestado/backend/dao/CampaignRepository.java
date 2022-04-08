package com.kvestado.backend.dao;

import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign,Long> {

    public Optional<Campaign> findBySlug(String slug);
    public Page<Campaign> findByUser(User user, Pageable pageable);
}
