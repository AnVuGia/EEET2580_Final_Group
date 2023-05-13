package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.DTO.SupervisorAccDto;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Repository.SupervisorAccRepository;
import com.example.EEET2580_Group.Service.Interface.SupervisorAccService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SupervisorAccServiceImp implements SupervisorAccService {
    @Autowired
    SupervisorAccRepository supervisorAccRepository;

    public void updateSupervisor(SupervisorAcc oldSupervisor, SupervisorAccDto newSupervisor){
        System.out.println("Inside update supervisor");
        oldSupervisor.setName(newSupervisor.getName());
        oldSupervisor.setContact(newSupervisor.getContact());
        oldSupervisor.setEmail(newSupervisor.getEmail());
        oldSupervisor.setBio(newSupervisor.getBio());
        oldSupervisor.setPassword(newSupervisor.getPassword());
    }
    @Override
    public List<SupervisorAcc> getAllSupervisor() {
        return supervisorAccRepository.getAllSupervisor();
    }

    @Override
    public void updateSupervisorById(Long id, SupervisorAccDto supervisorAccDto) {
        SupervisorAcc supervisorAccToUpdate = supervisorAccRepository.findById(id).get();
        this.updateSupervisor(supervisorAccToUpdate, supervisorAccDto);
        supervisorAccRepository.save(supervisorAccToUpdate);
        System.out.println("Supervisor updated");
    }
}
