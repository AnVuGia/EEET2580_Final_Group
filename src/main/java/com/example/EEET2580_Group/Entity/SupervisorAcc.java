package com.example.EEET2580_Group.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "supervisor_acc")
public class SupervisorAcc extends Account{
    @OneToMany
    @JsonBackReference
    private List<GroupEntity> group;
}
