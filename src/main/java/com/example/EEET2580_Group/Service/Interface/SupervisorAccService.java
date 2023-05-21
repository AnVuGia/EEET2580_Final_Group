package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.SupervisorAccDto;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SupervisorAccService {
    List<SupervisorAcc> getAllSupervisor();

    Page<SupervisorAcc> getAllSupervisor (String supervisorName, Pageable page);

    void updateSupervisorById(Long id, SupervisorAccDto supervisorAccDto);
}
