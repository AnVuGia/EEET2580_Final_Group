package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    private String type = "company";
    @Autowired
    private AccountService accountService;

    @GetMapping("/company/all")
    ResponseEntity<List<Account>> getAllAccounts() {
        System.out.println("getAllAccounts in AccountController");
        List<Account> accounts = accountService.getAllAccounts();
        return accounts.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(accounts);
    }

    @GetMapping("/company/id/{id}")
    ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, type);
        return ResponseEntity.ok(account);
    }
}
