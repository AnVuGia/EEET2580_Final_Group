package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyAccDto extends AccountDto{
//    private String companyName;
    private String companyDescription;

    private String password;

    private String email;

    private String name;

    private Long contact;
    private Long imageId;

    private String manager;
    private Long manager_contact;

    public CompanyAccDto(CompanyAcc account){
        super(account);
        this.companyDescription = account.getCompanyDescription();

        this.password = account.getPassword();

        this.email = account.getEmail();

        this.name = account.getName();

        this.contact = account.getContact();
        this.imageId = account.getImageId();
    }
}
