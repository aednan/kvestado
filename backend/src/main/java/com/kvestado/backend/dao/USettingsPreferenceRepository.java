package com.kvestado.backend.dao;

import com.kvestado.backend.model.USettingsPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface USettingsPreferenceRepository extends JpaRepository<USettingsPreference, String> {
}
