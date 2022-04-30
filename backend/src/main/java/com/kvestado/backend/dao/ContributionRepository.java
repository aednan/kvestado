package com.kvestado.backend.dao;

import com.kvestado.backend.model.Contribution;
import com.kvestado.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {

    public Page<Contribution> findByUser(User user, Pageable pageable);

    @Transactional
    @Modifying
    @Query("UPDATE Contribution c set c.valid = :valid where c.campaignId= :campaignId")
    void updateValidValue(@Param("valid") boolean valid, @Param("campaignId") Long campaignId);

}
