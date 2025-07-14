package com.system.ControleSaida.controller;

import com.system.ControleSaida.model.Aluno;
import com.system.ControleSaida.repository.AlunoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/aluno")
@CrossOrigin("*")
public class AlunoController {

    private final AlunoRepository repositorioAluno;

    public AlunoController(AlunoRepository repositorioAluno) {
        this.repositorioAluno = repositorioAluno;
    }

    @PostMapping
    public ResponseEntity<Aluno> cadastrarAluno(@RequestBody Aluno novoAluno){
        try{
            Aluno dadosAluno = repositorioAluno.save(novoAluno);
            System.out.println(dadosAluno.toString());
            return ResponseEntity.ok(dadosAluno);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> listarAluno(){
        try{
            List<Aluno> dadosAluno = repositorioAluno.findAll();
            dadosAluno.forEach(dados -> System.out.println(dados.toString()));
            return ResponseEntity.ok(dadosAluno);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> consultarAluno(@PathVariable Long id){
        try{
            Optional<Aluno> alunoOptional = repositorioAluno.findById(id);
            if(alunoOptional.isPresent()){
                Aluno aluno = alunoOptional.get();
                System.out.println(aluno.toString());
                return ResponseEntity.ok(aluno);
            }else{
                return ResponseEntity.notFound().build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Aluno> apagarAluno(@PathVariable Long id){
        try{
            Optional<Aluno> alunoOptional = repositorioAluno.findById(id);
            if(alunoOptional.isPresent()){
                repositorioAluno.deleteById(id);
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
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable Long id, @RequestBody Aluno alunoAtualizado){
        try{
            Optional<Aluno> aluno = repositorioAluno.findById(id);

            if(aluno.isPresent()){
                Aluno alun = aluno.get();
                alun.setNome(alunoAtualizado.getNome());
                alun.setSobrenome(alunoAtualizado.getSobrenome());
                alun.setMatricula(alunoAtualizado.getMatricula());
                alun.setTelefone(alunoAtualizado.getTelefone());
                alun.setEmail(alunoAtualizado.getEmail());


                Aluno atualizado = repositorioAluno.save(alun);
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
