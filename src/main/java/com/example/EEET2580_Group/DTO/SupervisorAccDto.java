package com.example.EEET2580_Group.DTO;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupervisorAccDto{
    private Long id;
    private String name;
    private String username;
    private String email;
    private String bio;
    private Long contact;
    private Long imageId;
    public SupervisorAccDto(SupervisorAcc supervisorAcc) {
        this.id = supervisorAcc.getId();
        this.name = supervisorAcc.getName();
        this.username = supervisorAcc.getUsername();
        this.email = supervisorAcc.getEmail();
        this.bio = supervisorAcc.getBio();
        this.contact = supervisorAcc.getContact();
        this.imageId = supervisorAcc.getImageId();
    }
}
