package com.system.ControleSaida.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "professor")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codProfessor;
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

    // relacionamento um para muitos entre Professor e Saída
    @OneToMany(mappedBy = "professor",
            cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Saida> saidaProfessor;

    public Professor() { }

    public Professor(Long codProfessor, String nome, String sobrenome,
                     Integer matricula, String telefone, String email,
                     List<Saida> saidaProfessor) {
        this.codProfessor = codProfessor;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.matricula = matricula;
        this.telefone = telefone;
        this.email = email;
        this.saidaProfessor = saidaProfessor;
    }

    @Override
    public String toString() {
        return "Professor{" +
                "codProfessor=" + codProfessor +
                ", nome='" + nome + '\'' +
                ", sobrenome='" + sobrenome + '\'' +
                ", matricula=" + matricula +
                ", telefone='" + telefone + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public Long getCodProfessor() {
        return codProfessor;
    }

    public void setCodProfessor(Long codProfessor) {
        this.codProfessor = codProfessor;
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

    public List<Saida> getSaidaProfessor() {
        return saidaProfessor;
    }

    public void setSaidaProfessor(List<Saida> saidaProfessor) {
        this.saidaProfessor = saidaProfessor;
    }
}
