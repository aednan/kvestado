package com.kvestado.backend.dao;

import com.kvestado.backend.model.Campaign;
import com.kvestado.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    public Optional<Campaign> findBySlug(String slug);
}
