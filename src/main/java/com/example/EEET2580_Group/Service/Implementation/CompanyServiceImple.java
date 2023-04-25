package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Repository.CompanyAccRepository;
import com.example.EEET2580_Group.Service.Interface.CompanyService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CompanyServiceImple implements CompanyService {
    @Autowired
    CompanyAccRepository companyAccRepository;

    @Override
    public Page<CompanyAcc> getAllCompany(String companyName, Pageable page) {
        return companyName.isEmpty()?companyAccRepository.findAll(page):
                                    companyAccRepository.findByCompanyName(companyName,page);
    }

    //do not delete it is for display the selection element.
    @Override
    public List<CompanyAcc> findAll() {
        return companyAccRepository.findAll();
    }
}
