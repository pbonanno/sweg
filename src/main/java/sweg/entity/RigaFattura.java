package sweg.entity;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
public class RigaFattura {
	
	private Long id;
	private int riga;
	private String descrizione;
	private int quantita;
	private BigDecimal prezzoUnitario;
	private BigDecimal iva;
	private TestataFattura testata;
	
	public RigaFattura() {}
	
	
	public RigaFattura(int riga, String descrizione, int quantita,
			BigDecimal prezzoUnitario, BigDecimal iva) {
		super();
		this.riga = riga;
		this.descrizione = descrizione;
		this.quantita = quantita;
		this.prezzoUnitario = prezzoUnitario;
		this.iva = iva;
		
	}


	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@NotNull
	public int getRiga() {
		return riga;
	}
	public void setRiga(int riga) {
		this.riga = riga;
	}
	@NotEmpty
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	@NotNull
	public int getQuantita() {
		return quantita;
	}
	public void setQuantita(int quantita) {
		this.quantita = quantita;
	}
	@NotNull
	public BigDecimal getPrezzoUnitario() {
		return prezzoUnitario;
	}
	public void setPrezzoUnitario(BigDecimal prezzoUnitario) {
		this.prezzoUnitario = prezzoUnitario;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	public TestataFattura getTestata() {
		return testata;
	}

	public void setTestata(TestataFattura testata) {
		this.testata = testata;
	}

	@NotNull
	@DecimalMin("0.0")
	@DecimalMax("100.0")
	public BigDecimal getIva() {
		return iva;
	}


	public void setIva(BigDecimal iva) {
		this.iva = iva;
	}
	
}
