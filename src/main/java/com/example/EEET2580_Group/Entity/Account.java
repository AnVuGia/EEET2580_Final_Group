package com.example.EEET2580_Group.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
public class Account {
    protected String name;
    protected String username;
    protected String password;
    protected String email;
}
