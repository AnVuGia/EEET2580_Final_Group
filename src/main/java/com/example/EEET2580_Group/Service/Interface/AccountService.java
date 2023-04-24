package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.Entity.Account;
import org.springframework.stereotype.Service;

import java.util.List;


public interface AccountService {
    // AccountService interface
    void saveAccount(Account account);
    Account getAccountById(Long id, String type);
    List<Account> getAllAccounts();
}
