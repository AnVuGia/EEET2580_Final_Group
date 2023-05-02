package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Service.Interface.AccountService;
import com.example.EEET2580_Group.Service.Interface.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/companies")
    List<Account> getAllAccounts() {
        System.out.println("getAllAccounts in AccountController");
        List<Account> accounts = accountService.getAllAccounts();
        return accounts;
    }

    @GetMapping("/company/{id}")
    Account getAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, "company");
        return account;
    }
    @GetMapping("/company/{username}")
    public  Account getAccountByUsername(@PathVariable String username) {
        Account account = accountService.getAccountByUsername(username, "company");
        return account;
    }
    @PostMapping("/{type}/add")
    public Account addAccount(@RequestBody Account request, @PathVariable String type) {
        Account account = new Account();
        account.setName(request.getName());
        account.setUsername(request.getUsername());
        account.setPassword(request.getPassword());
        account.setEmail(request.getEmail());

        if(!accountService.isValidUsername(request.getUsername())){
            System.out.println("user name is already taken");
            return null;
        }

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
    //Student Controller
    @GetMapping("/students")
    List<Account> getAllStudentAccounts() {
        System.out.println("getAllStudentAccounts in AccountController");
        List<Account> accounts = accountService.getAllStudentAccounts();
        return accounts;
    }

    @GetMapping("/student/{id}")
    Account getStudentAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, "student");
        return account;
    }
    @GetMapping("/student/{username}")
    Account getStudentAccountByUsername(@PathVariable String username) {
        Account account = accountService.getAccountByUsername(username, "student");
        return account;
    }

}
