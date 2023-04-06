package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CapstoneProject;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CapstoneProjectRepository extends JpaRepository<CapstoneProject, Long> {
    // @Query("SELECT c.name, c.description FROM CapstoneProject c")

    // Page<CapstoneProject> findPaginated(int pageNo, int pageSize, Pageable
    // pageable);
    Page<CapstoneProject> findAll(Pageable pageable);
}
