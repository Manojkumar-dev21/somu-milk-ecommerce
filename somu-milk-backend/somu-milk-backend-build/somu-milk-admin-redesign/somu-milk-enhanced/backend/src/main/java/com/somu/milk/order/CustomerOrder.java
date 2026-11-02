package com.somu.milk.order;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer_orders")
public class CustomerOrder {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false, unique=true)
    private String orderNumber;
    @Column(nullable=false)
    private String customerName;
    @Column(nullable=false)
    private String phone;
    @Column(nullable=false, length=600)
    private String deliveryAddress;
    @Column(nullable=false, length=10)
    private String pinCode;
    @Column(nullable=false)
    private String paymentMethod;
    @Column(nullable=false)
    private String paymentStatus = "PENDING";
    @Column(nullable=false)
    private String status = "PLACED";
    @Column(nullable=false, precision=10, scale=2)
    private BigDecimal total;
    @Column(nullable=false)
    private Instant createdAt = Instant.now();
    @OneToMany(mappedBy="order", cascade=CascadeType.ALL, orphanRemoval=true, fetch=FetchType.EAGER)
    private List<OrderLine> items = new ArrayList<>();

    public Long getId(){return id;} public String getOrderNumber(){return orderNumber;} public void setOrderNumber(String v){orderNumber=v;}
    public String getCustomerName(){return customerName;} public void setCustomerName(String v){customerName=v;}
    public String getPhone(){return phone;} public void setPhone(String v){phone=v;}
    public String getDeliveryAddress(){return deliveryAddress;} public void setDeliveryAddress(String v){deliveryAddress=v;}
    public String getPinCode(){return pinCode;} public void setPinCode(String v){pinCode=v;}
    public String getPaymentMethod(){return paymentMethod;} public void setPaymentMethod(String v){paymentMethod=v;}
    public String getPaymentStatus(){return paymentStatus;} public void setPaymentStatus(String v){paymentStatus=v;}
    public String getStatus(){return status;} public void setStatus(String v){status=v;}
    public BigDecimal getTotal(){return total;} public void setTotal(BigDecimal v){total=v;}
    public Instant getCreatedAt(){return createdAt;} public List<OrderLine> getItems(){return items;}
}
