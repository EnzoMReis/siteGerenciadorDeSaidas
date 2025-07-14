package com.system.ControleSaida.controller;

import com.system.ControleSaida.model.Professor;
import com.system.ControleSaida.repository.ProfessorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professor")
@CrossOrigin("*")
public class ProfessorController {

    private final ProfessorRepository repositorioProfessor;

    public ProfessorController(ProfessorRepository repositorioProfessor) {
        this.repositorioProfessor = repositorioProfessor;
    }

    @PostMapping
    public ResponseEntity<Professor> cadastrarProfessor(@RequestBody Professor novoProfessor){
        try{
            Professor dadosProfessor = repositorioProfessor.save(novoProfessor);
            System.out.println(dadosProfessor.toString());
            return ResponseEntity.ok(dadosProfessor);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Professor>> listarProfessor(){
        try{
            List<Professor> dadosProfessor = repositorioProfessor.findAll();
            dadosProfessor.forEach(dados -> System.out.println(dados.toString()));
            return ResponseEntity.ok(dadosProfessor);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> consultarProfessor(@PathVariable Long id){
        try{
            Optional<Professor> professorOptional = repositorioProfessor.findById(id);
            if(professorOptional.isPresent()){
                Professor professor = professorOptional.get();
                System.out.println(professor.toString());
                return ResponseEntity.ok(professor);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Professor> apagarProfessor(@PathVariable Long id){
        try{
            Optional<Professor> professorOptional = repositorioProfessor.findById(id);
            if(professorOptional.isPresent()){
                repositorioProfessor.deleteById(id);
                return ResponseEntity.noContent().build();
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> atualizarProfessor(@PathVariable Long id, @RequestBody Professor professorAtualizado){
        try{
            Optional<Professor> professor = repositorioProfessor.findById(id);

            if(professor.isPresent()){
                Professor prof = professor.get();
                prof.setNome(professorAtualizado.getNome());
                prof.setSobrenome(professorAtualizado.getSobrenome());
                prof.setMatricula(professorAtualizado.getMatricula());
                prof.setTelefone(professorAtualizado.getTelefone());
                prof.setEmail(professorAtualizado.getEmail());


                Professor atualizado = repositorioProfessor.save(prof);
                return ResponseEntity.ok(atualizado);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
