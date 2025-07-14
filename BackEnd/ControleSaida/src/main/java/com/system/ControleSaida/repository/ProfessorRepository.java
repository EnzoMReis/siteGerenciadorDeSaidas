package com.system.ControleSaida.repository;

import com.system.ControleSaida.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
}
