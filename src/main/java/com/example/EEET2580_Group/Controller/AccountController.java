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
    public Account addAccount(@RequestBody Account account, @PathVariable String type) {
        if (type.equals("company")) {
            accountService.saveAccount((CompanyAcc) account);
        } else if (type.equals("supervisor")) {
            accountService.saveAccount((SupervisorAcc) account);
        } else if (type.equals("student")) {
            accountService.saveAccount((StudentAcc) account);
        }
        return account;
    }

}
