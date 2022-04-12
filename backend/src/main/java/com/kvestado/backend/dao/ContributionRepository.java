package com.kvestado.backend.dao;

import com.kvestado.backend.model.Contribution;
import com.kvestado.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {

    public Page<Contribution> findByUser(User user, Pageable pageable);

}
