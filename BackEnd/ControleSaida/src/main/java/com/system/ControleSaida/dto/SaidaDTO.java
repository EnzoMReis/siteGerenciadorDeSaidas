package com.system.ControleSaida.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.time.LocalTime;

public class SaidaDTO {

    private LocalDate dataSolicitacao;
    private LocalTime horaSaida;
    private LocalTime horaRetorno;
    private String motivo;
    private String localDestino;
    private String status;
    private String nomeAluno;
    private String nomeProfessor;
    private Long aluno_cod;
    private Long professor_cod;

    public SaidaDTO() { }

    public SaidaDTO(LocalDate dataSolicitacao, LocalTime horaSaida,
                    LocalTime horaRetorno, String motivo, String localDestino,
                    String status, String nomeAluno, String nomeProfessor,
                    Long aluno_cod, Long professor_cod) {
        this.dataSolicitacao = dataSolicitacao;
        this.horaSaida = horaSaida;
        this.horaRetorno = horaRetorno;
        this.motivo = motivo;
        this.localDestino = localDestino;
        this.status = status;
        this.nomeAluno = nomeAluno;
        this.nomeProfessor = nomeProfessor;
        this.aluno_cod = aluno_cod;
        this.professor_cod = professor_cod;
    }

    @Override
    public String toString() {
        return "SaidaDTO{" +
                "dataSolicitacao=" + dataSolicitacao +
                ", horaSaida=" + horaSaida +
                ", horaRetorno=" + horaRetorno +
                ", motivo='" + motivo + '\'' +
                ", localDestino='" + localDestino + '\'' +
                ", status='" + status + '\'' +
                ", nomeAluno='" + nomeAluno + '\'' +
                ", nomeProfessor='" + nomeProfessor + '\'' +
                ", aluno_cod=" + aluno_cod +
                ", professor_cod=" + professor_cod +
                '}';
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

    public Long getAluno_cod() {
        return aluno_cod;
    }

    public void setAluno_cod(Long aluno_cod) {
        this.aluno_cod = aluno_cod;
    }

    public Long getProfessor_cod() {
        return professor_cod;
    }

    public void setProfessor_cod(Long professor_cod) {
        this.professor_cod = professor_cod;
    }
}
