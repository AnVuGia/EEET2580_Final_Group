package com.example.EEET2580_Group.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    protected String name;
    protected String username;
    protected String password;
    protected String email;
    protected Long id;
    protected Long imageId;
}
