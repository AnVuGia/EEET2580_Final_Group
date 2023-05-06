package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountDto {
    private  String name;
    private String username;
    private String email;
    private String role;
    private Long id;

    public AccountDto(Account account){
        this.name = account.getName();
        this.username = account.getUsername();
        this.email = account.getEmail();
        this.id = account.getId();

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
