package com.system.ControleSaida.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codAluno;
    @NotBlank
    private String nome;
    @NotBlank
    private String sobrenome;
    @NotNull
    private Integer matricula;
    @NotBlank
    private String telefone;
    @NotBlank
    private String email;

    // relacionamento  um para muitos entre Aluno e Saida
    @OneToMany(mappedBy = "aluno",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Saida> saidaAluno;


    public Aluno() { }

    public Aluno(Long codAluno, String nome, String sobrenome,
                 Integer matricula, String telefone, String email,
                 List<Saida> saidaAluno) {
        this.codAluno = codAluno;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.matricula = matricula;
        this.telefone = telefone;
        this.email = email;
        this.saidaAluno = saidaAluno;
    }

    @Override
    public String toString() {
        return "Aluno{" +
                "codAluno=" + codAluno +
                ", nome='" + nome + '\'' +
                ", sobrenome='" + sobrenome + '\'' +
                ", matricula=" + matricula +
                ", telefone='" + telefone + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public Long getCodAluno() {
        return codAluno;
    }

    public void setCodAluno(Long codAluno) {
        this.codAluno = codAluno;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public Integer getMatricula() {
        return matricula;
    }

    public void setMatricula(Integer matricula) {
        this.matricula = matricula;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Saida> getSaidaAluno() {
        return saidaAluno;
    }

    public void setSaidaAluno(List<Saida> saidaAluno) {
        this.saidaAluno = saidaAluno;
    }
}
