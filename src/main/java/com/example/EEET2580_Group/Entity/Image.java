package com.example.EEET2580_Group.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @Column(name = "image_name")
    private String name;


    @Lob
    @Column(name = "data")
    private byte[] data;
}
