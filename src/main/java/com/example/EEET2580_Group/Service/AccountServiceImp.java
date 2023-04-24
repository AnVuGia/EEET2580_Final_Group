package com.example.EEET2580_Group.Service;

import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Repository.CompanyAccRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class AccountServiceImp implements AccountService{
    @Autowired
    private CompanyAccRepository companyAccRepository;
    @Override
    public void saveAccount(Account account) {
        if (account instanceof CompanyAcc) {
            companyAccRepository.save((CompanyAcc) account);
        }
    }

    @Override
    public Account getAccountById(Long id, String type) {
        if (type.equals("company")) {
            return companyAccRepository.findById(id).get();
        }
        return null;
    }
    @Override
    public List<Account> getAllAccounts() {
        System.out.println("getAllAccounts");
        List<Account> accounts = new ArrayList<>();
        accounts.addAll(companyAccRepository.findAll());
        return accounts;
    }
}
