package com.kvestado.backend.dao;

import com.kvestado.backend.model.PendingTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PendingTransactionRepository extends JpaRepository<PendingTransaction,String> {
}
