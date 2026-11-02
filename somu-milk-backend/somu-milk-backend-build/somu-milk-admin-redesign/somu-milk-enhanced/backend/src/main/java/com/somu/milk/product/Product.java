package com.somu.milk.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank @Size(max = 140)
    private String name;
    @NotBlank @Size(max = 80)
    private String category;
    @Size(max = 1000)
    private String description;
    @NotNull @DecimalMin("0.01")
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;
    @NotNull @Min(0)
    private Integer stockQuantity;
    @Size(max = 500)
    private String imageUrl;
    private boolean active = true;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    @PreUpdate void preUpdate() { updatedAt = Instant.now(); }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getName(){return name;} public void setName(String name){this.name=name;}
    public String getCategory(){return category;} public void setCategory(String category){this.category=category;}
    public String getDescription(){return description;} public void setDescription(String description){this.description=description;}
    public BigDecimal getPrice(){return price;} public void setPrice(BigDecimal price){this.price=price;}
    public Integer getStockQuantity(){return stockQuantity;} public void setStockQuantity(Integer stockQuantity){this.stockQuantity=stockQuantity;}
    public String getImageUrl(){return imageUrl;} public void setImageUrl(String imageUrl){this.imageUrl=imageUrl;}
    public boolean isActive(){return active;} public void setActive(boolean active){this.active=active;}
    public Instant getCreatedAt(){return createdAt;} public Instant getUpdatedAt(){return updatedAt;}
}
