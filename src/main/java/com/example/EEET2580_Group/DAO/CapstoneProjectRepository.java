package com.example.EEET2580_Group.DAO;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapstoneProjectRepository extends JpaRepository<CapstoneProject, Long>{
}
