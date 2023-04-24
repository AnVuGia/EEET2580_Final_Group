package com.example.EEET2580_Group.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "supervisor_acc")
public class SupervisorAcc extends Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supervisor_id")
    private Long id;
    @OneToMany
    @JsonBackReference
    private List<GroupEntity> group;
    public void setAccount(Account account) {
        this.setUsername(account.getUsername());
        this.setPassword(account.getPassword());
        this.setEmail(account.getEmail());
        this.setName(account.getName());
    }
}
