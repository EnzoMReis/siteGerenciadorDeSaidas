package com.system.ControleSaida.repository;

import com.system.ControleSaida.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
}
