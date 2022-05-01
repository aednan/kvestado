package com.kvestado.backend.dao;

import com.kvestado.backend.model.EmailSubscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailSubscriberRepository extends JpaRepository<EmailSubscriber,String> {
}
