package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Repository.CompanyAccRepository;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Repository.SupervisorAccRepository;
import com.example.EEET2580_Group.Service.Interface.AccountService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AccountServiceImp implements AccountService {
    @Autowired
    private CompanyAccRepository companyAccRepository;
    @Autowired
    private SupervisorAccRepository supervisorAccRepository;
    @Autowired
    private StudentAccRepository studentAccRepository;
    @Override
    public void saveAccount(Account account) {
        if (account instanceof CompanyAcc) {
            companyAccRepository.save((CompanyAcc) account);
        } else if (account instanceof SupervisorAcc) {
            supervisorAccRepository.save((SupervisorAcc) account);
        } else if (account instanceof StudentAcc) {
            studentAccRepository.save((StudentAcc) account);
        }
    }

    @Override
    public Account getAccountById(Long id, String type) {
        if (type.equals("company")) {
            return companyAccRepository.findById(id).get();
        } else if (type.equals("supervisor")) {
            return supervisorAccRepository.findById(id).get();
        } else if (type.equals("student")) {
            return studentAccRepository.findById(id).get();
        }
        return null;
    }
    @Override
    public List<Account> getAllAccounts() {
        System.out.println("getAllAccounts");
        List<Account> accounts = new ArrayList<>();
        accounts.addAll(companyAccRepository.findAll());
        accounts.addAll(supervisorAccRepository.findAll());
        accounts.addAll(studentAccRepository.findAll());
        return accounts;
    }
    @Override
    public List<Account> getAllStudentAccounts() {
        System.out.println("getAllStudentAccounts");
        List<Account> accounts = new ArrayList<>();
        accounts.addAll(studentAccRepository.findAll());
        return accounts;
    }
    @Override
    public List<Account> getAllSupervisorAccounts() {
        System.out.println("getAllSupervisorAccounts");
        List<Account> accounts = new ArrayList<>();
        accounts.addAll(supervisorAccRepository.findAll());
        return accounts;
    }
    @Override
    public List<Account> getAllCompanyAccounts() {
        System.out.println("getAllCompanyAccounts");
        List<Account> accounts = new ArrayList<>();
        accounts.addAll(companyAccRepository.findAll());
        return accounts;
    }
    @Override
    public Account getAccountByUsername(String username, String type) {
        if (type.equals("company")) {
            return companyAccRepository.findByUsername(username);
        } else if (type.equals("supervisor")) {
            return supervisorAccRepository.findByUsername(username);
        } else if (type.equals("student")) {
            return studentAccRepository.findByUsername(username);
        }
        return null;
    }

}
