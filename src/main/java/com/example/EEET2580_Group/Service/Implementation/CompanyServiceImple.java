package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.DTO.CompanyAccDto;
import com.example.EEET2580_Group.DTO.StudentDto;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
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

    public void updateCompany(CompanyAcc oldCompany, CompanyAccDto newCompany){
        System.out.println("INside update student");
        oldCompany.setName(newCompany.getName());
        oldCompany.setContact(newCompany.getContact());
        oldCompany.setEmail(newCompany.getEmail());
        oldCompany.setCompanyDescription(newCompany.getCompanyDescription());

    }

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

    @Override
    public void updateCompanyById(Long id, CompanyAccDto companyAccDto) {
        CompanyAcc companyAccToUpdate = companyAccRepository.findById(id).get();
        this.updateCompany(companyAccToUpdate,companyAccDto);
        companyAccRepository.save(companyAccToUpdate);
        System.out.println("Student updated");
    }

}
