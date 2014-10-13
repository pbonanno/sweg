package sweg.entity;

import java.math.BigDecimal;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@DiscriminatorValue("IVAESENTE")
public class RigaFatturaIvaesente extends RigaFatturaBase {
	private int quantita;
	private BigDecimal prezzoUnitario;
	private BigDecimal iva;

	public RigaFatturaIvaesente() {
		super();
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
	@NotNull
	public BigDecimal getIva() {
		return iva;
	}
	public void setIva(BigDecimal iva) {
		this.iva = iva;
	}
	
	
}
