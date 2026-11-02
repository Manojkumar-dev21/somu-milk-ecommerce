package com.somu.milk.order;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="order_lines")
public class OrderLine {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="order_id", nullable=false)
    private CustomerOrder order;
    @Column(nullable=false) private Long productId;
    @Column(nullable=false) private String productName;
    @Column(nullable=false) private Integer quantity;
    @Column(nullable=false, precision=10, scale=2) private BigDecimal unitPrice;
    @Column(nullable=false, precision=10, scale=2) private BigDecimal lineTotal;
    public Long getId(){return id;} public CustomerOrder getOrder(){return order;} public void setOrder(CustomerOrder v){order=v;}
    public Long getProductId(){return productId;} public void setProductId(Long v){productId=v;}
    public String getProductName(){return productName;} public void setProductName(String v){productName=v;}
    public Integer getQuantity(){return quantity;} public void setQuantity(Integer v){quantity=v;}
    public BigDecimal getUnitPrice(){return unitPrice;} public void setUnitPrice(BigDecimal v){unitPrice=v;}
    public BigDecimal getLineTotal(){return lineTotal;} public void setLineTotal(BigDecimal v){lineTotal=v;}
}
