package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.*;
import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Service.Interface.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/companies")
    List<CompanyAccDto> getAllCompanies() {
        System.out.println("getAllAccounts in AccountController");
        List<CompanyAcc> companies = accountService.getAllCompanyAccounts();
        List<CompanyAccDto> dtoConvert = companies.stream()
                .map(account -> new CompanyAccDto(account)).collect(Collectors.toList());
        return dtoConvert;
    }

    @GetMapping("/supervisors")
    List<AccountDto> getAllSupervisor() {
        System.out.println("getAllAccounts in AccountController");
        List<SupervisorAcc> supervisors = accountService.getAllSupervisorAccounts();
        List<AccountDto> dtoConvert = supervisors.stream()
                .map(account -> new AccountDto(account)).collect(Collectors.toList());
        return dtoConvert;
    }

    @GetMapping("/students")
    List<StudentAccDto> getAllStudents() {
        System.out.println("getAllAccounts in AccountController");
        List<StudentAcc> students = accountService.getAllStudentAccounts();
        List<StudentAccDto> dtoConvert = students.stream()
                .map(account -> new StudentAccDto(account)).collect(Collectors.toList());
        return dtoConvert;
    }

    @GetMapping("/company/{id}")
    Account getAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, "company");
        return account;
    }

    @GetMapping("/company/username/{username}")
    public Account getAccountByUsername(@PathVariable String username) {
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

        if (!accountService.isValidUsername(request.getUsername())) {
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

    @GetMapping("/student/id/{id}")
    StudentAccDto getStudentAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, "student");
        return new StudentAccDto((StudentAcc) account);
    }

    @GetMapping("/student/username/{username}")
    Account getStudentAccountByUsername(@PathVariable String username) {
        Account account = accountService.getAccountByUsername(username, "student");
        return account;
    }

    @GetMapping("/supervisor/all")
    List<SupervisorAccDto> getAllSupervisorAccounts() {
        System.out.println("getAllSupervisorAccounts in AccountController");
        List<SupervisorAcc> accounts = accountService.getAllSupervisorAccounts();
        List<SupervisorAccDto> dtoConvert = accounts.stream()
                .map(account-> new SupervisorAccDto(account)).collect(Collectors.toList());

        return dtoConvert;
    }

    @GetMapping("/supervisor/username/{username}")
    SupervisorAccDto getSupervisorAccountByUsername(@PathVariable String username) {
        Account account = accountService.getAccountByUsername(username, "supervisor");
        return new SupervisorAccDto((SupervisorAcc) account);
    }

    @GetMapping("/supervisor/id/{id}")
    SupervisorAccDto getSupervisorAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, "supervisor");
        return new SupervisorAccDto((SupervisorAcc) account);
    }
}
