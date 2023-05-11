package com.example.EEET2580_Group.DTO;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupervisorAccDto extends AccountDto {

    private String bio;
    private Long contact;
    public SupervisorAccDto(SupervisorAcc supervisorAcc) {
        super(supervisorAcc);
        this.bio = supervisorAcc.getBio();
        this.contact = supervisorAcc.getContact();

    }
}
