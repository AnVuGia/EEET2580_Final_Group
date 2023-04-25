package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.SupervisorAcc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupervisorAccRepository extends JpaRepository<SupervisorAcc, Long> {

    @Query("SELECT s FROM SupervisorAcc s ORDER BY s.supervisorName ASC")
    List<SupervisorAcc> getAllSupervisor();
}
