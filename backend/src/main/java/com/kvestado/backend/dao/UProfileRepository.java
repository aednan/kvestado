package com.kvestado.backend.dao;

import com.kvestado.backend.model.UProfile;
import com.kvestado.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UProfileRepository extends JpaRepository<UProfile, String> {

    public Optional<UProfile> findByUser(User user);
}
