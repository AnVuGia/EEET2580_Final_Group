package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.Entity.Account;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService {
    // AccountService interface
    void saveAccount(Account account);
    Account getAccountById(Long id, String type);
    List<Account> getAllAccounts();
    List<Account> getAllStudentAccounts();
    List<Account> getAllSupervisorAccounts();
    List<Account> getAllCompanyAccounts();
    Account getAccountByUsername(String username, String type);

    boolean isValidUsername(String username);

}
