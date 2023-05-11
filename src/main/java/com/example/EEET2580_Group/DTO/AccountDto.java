package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    private Long id;
    private  String name;
    private String username;
    private String password;
    private String email;
    private String role;
    private Long imageId;

    public AccountDto(Account account){
        this.name = account.getName();
        this.username = account.getUsername();
        this.password = account.getPassword();
        this.email = account.getEmail();
        this.id = account.getId();
        this.imageId = account.getImageId();
        if (account instanceof CompanyAcc){
            this.role = "company";
        }else if (account instanceof StudentAcc){
            this.role = "student";
        }else if (account instanceof SupervisorAcc){
            this.role = "supervisor";
        }else if (account instanceof AdminAcc){
            this.role = "admin";
        }
    }
}
