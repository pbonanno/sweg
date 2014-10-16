package sweg.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

@Entity
public class TestataFattura {
	private Long id;
	private String emittente;
	private String intestatario;
	private String numero;
	private Date data;
	
	private List<RigaFattura> righe = new ArrayList<RigaFattura>();
	
	public TestataFattura() {}

	public TestataFattura(String emittente, String intestatario, String numero,
			Date data) {
		super();
		this.emittente = emittente;
		this.intestatario = intestatario;
		this.numero = numero;
		this.data = data;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Lob
	public String getEmittente() {
		return emittente;
	}

	public void setEmittente(String emittente) {
		this.emittente = emittente;
	}

	public String getIntestatario() {
		return intestatario;
	}

	public void setIntestatario(String intestatario) {
		this.intestatario = intestatario;
	}

	@NotBlank
	@Column(unique=true)
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
	
	@Temporal(TemporalType.DATE)
	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "testata", fetch=FetchType.LAZY)
	public List<RigaFattura> getRighe() {
		return righe;
	}
	
	public void addRiga(RigaFattura riga) {
		this.righe.add(riga);
		riga.setTestata(this);
	}

	public void setRighe(List<RigaFattura> righe) {
		this.righe = righe;
	}
	
	@Transient
	public BigDecimal getTotaleImponibile() {
		BigDecimal tot = BigDecimal.ZERO;
		for (RigaFattura rigaFattura : righe) {
			tot = tot.add(rigaFattura.calcolaImponibile());
		}
		return tot;
	}

	@Transient
	public BigDecimal getTotaleIva() {
		BigDecimal tot = BigDecimal.ZERO;
		for (RigaFattura rigaFattura : righe) {
			tot = tot.add(rigaFattura.calcolaIva());
		}
		return tot;
	}
	
	@Transient
	public BigDecimal getTotale() {
		return getTotaleImponibile().add(getTotaleIva());
	}

}
