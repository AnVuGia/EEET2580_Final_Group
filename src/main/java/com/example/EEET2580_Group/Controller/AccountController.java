package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("api/account")
public class AccountController {
    private String type = "company";
    @Autowired
    private AccountService accountService;

    @GetMapping("/company/all")
    ResponseEntity<List<Account>> getAllAccounts() {
        List<Account> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }
    @GetMapping("/company/id")
    ResponseEntity<Account> getAccountById(@RequestParam("id") Long id) {
        Account account = accountService.getAccountById(id, type);
        return ResponseEntity.ok(account);
    }
}
