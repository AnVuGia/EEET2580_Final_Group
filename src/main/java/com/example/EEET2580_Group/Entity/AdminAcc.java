package com.example.EEET2580_Group.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "admin_acc")
public class AdminAcc extends Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long id;

    @Column(name = "admin_name")
    private String name;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;



    public void setAccount(Account account) {
        name = account.getName();
        username = account.getUsername();
        password = account.getPassword();
    }
}
