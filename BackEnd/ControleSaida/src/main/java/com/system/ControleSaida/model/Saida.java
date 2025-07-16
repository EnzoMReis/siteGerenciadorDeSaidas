package com.system.ControleSaida.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "saida")
public class Saida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codSaida;

    private LocalDate dataSolicitacao;
    private LocalTime horaSaida;
    private LocalTime horaRetorno;
    @NotBlank
    private String motivo;
    @NotBlank
    private String localDestino;
    @NotBlank
    private String status;
    @NotBlank
    private String nomeAluno;
    @NotBlank
    private String nomeProfessor;

    // Relacionamento muitos para um entre Saida e Aluno
    @ManyToOne
    @JoinColumn(name="aluno_cod",
            referencedColumnName = "codAluno", nullable = false)
//    @JsonIgnore
    private Aluno aluno;

    // Relacionamento muitos para um entre Saida e Professor
    @ManyToOne
    @JoinColumn(name="professor_cod",
            referencedColumnName = "codProfessor", nullable = false)
//    @JsonIgnore
    private Professor professor;

    public Saida() { }

    public Saida(Long codSaida, LocalDate dataSolicitacao, LocalTime horaSaida,
                 LocalTime horaRetorno, String motivo, String localDestino,
                 String status, String nomeAluno, String nomeProfessor,
                 Aluno aluno, Professor professor) {
        this.codSaida = codSaida;
        this.dataSolicitacao = dataSolicitacao;
        this.horaSaida = horaSaida;
        this.horaRetorno = horaRetorno;
        this.motivo = motivo;
        this.localDestino = localDestino;
        this.status = status;
        this.nomeAluno = nomeAluno;
        this.nomeProfessor = nomeProfessor;
        this.aluno = aluno;
        this.professor = professor;
    }

    @Override
    public String toString() {
        return "Saida{" +
                "codSaida=" + codSaida +
                ", dataSolicitacao=" + dataSolicitacao +
                ", horaSaida=" + horaSaida +
                ", horaRetorno=" + horaRetorno +
                ", motivo='" + motivo + '\'' +
                ", localDestino='" + localDestino + '\'' +
                ", status='" + status + '\'' +
                ", nomeAluno='" + nomeAluno + '\'' +
                ", nomeProfessor='" + nomeProfessor + '\'' +
                '}';
    }

    public Long getCodSaida() {
        return codSaida;
    }

    public void setCodSaida(Long codSaida) {
        this.codSaida = codSaida;
    }

    public LocalDate getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(LocalDate dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public LocalTime getHoraSaida() {
        return horaSaida;
    }

    public void setHoraSaida(LocalTime horaSaida) {
        this.horaSaida = horaSaida;
    }

    public LocalTime getHoraRetorno() {
        return horaRetorno;
    }

    public void setHoraRetorno(LocalTime horaRetorno) {
        this.horaRetorno = horaRetorno;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getLocalDestino() {
        return localDestino;
    }

    public void setLocalDestino(String localDestino) {
        this.localDestino = localDestino;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNomeAluno() {
        return nomeAluno;
    }

    public void setNomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public String getNomeProfessor() {
        return nomeProfessor;
    }

    public void setNomeProfessor(String nomeProfessor) {
        this.nomeProfessor = nomeProfessor;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }
}
