package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Service.Interface.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private String type = "company";
    @Autowired
    private AccountService accountService;

    @GetMapping("/company/all")
    List<Account> getAllAccounts() {
        System.out.println("getAllAccounts in AccountController");
        List<Account> accounts = accountService.getAllAccounts();
        return accounts;
    }

    @GetMapping("/company/id/{id}")
    Account getAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, type);
        return account;
    }
    @PostMapping("/{type}/add")
    public Account addAccount(@RequestBody Account request, @PathVariable String type) {
        Account account = new Account();
        account.setName(request.getName());
        account.setUsername(request.getUsername());
        account.setPassword(request.getPassword());
        account.setEmail(request.getEmail());

        if (type.equals("company")) {
            CompanyAcc companyAcc = new CompanyAcc();
            companyAcc.setAccount(account);
            accountService.saveAccount(companyAcc);
            return companyAcc;
        } else if (type.equals("supervisor")) {
            SupervisorAcc supervisorAcc = new SupervisorAcc();
            supervisorAcc.setAccount(account);
            accountService.saveAccount(supervisorAcc);
            return supervisorAcc;
        } else if (type.equals("student")) {
            StudentAcc studentAcc = new StudentAcc();
            studentAcc.setAccount(account);
            accountService.saveAccount(studentAcc);
            return studentAcc;
        }
        return null; // handle invalid type
    }


}
