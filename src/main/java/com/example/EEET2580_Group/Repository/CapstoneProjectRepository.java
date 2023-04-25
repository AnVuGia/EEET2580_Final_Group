package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CapstoneProject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
// CapstoneProjectRepository is a JPA repository
public interface CapstoneProjectRepository extends JpaRepository<CapstoneProject, Long> {
    // Find all capstone projects and return a page with pagination
    Page<CapstoneProject> findAll(Pageable pageable);
    <Optional> CapstoneProject findByProjectTitle(String title);

    @Query("SELECT c FROM CapstoneProject c WHERE c.company.companyName = :companyName")
    Page<CapstoneProject> findByCompanyName (@Param("companyName") String companyName, Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.supervisor.supervisorName = :supervisorName")
    Page<CapstoneProject> findBySupervisorName (@Param("supervisorName") String supervisorName, Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.projectTitle LIKE %:capstoneName%")
    Page<CapstoneProject> findByCapstoneName (@Param("capstoneName") String capstoneName, Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.projectTitle = :capstoneName AND c.company.companyName = :companyName")
    Page<CapstoneProject> findByCapstoneNameAndCompanyName (@Param("capstoneName") String capstoneName,
                                                            @Param("companyName") String companyName,
                                                            Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.company.companyName = :companyName AND c.supervisor.supervisorName = :supervisorName")
    Page<CapstoneProject> findByCompanyNameAndSupervisorName (@Param("companyName") String companyName,
                                                            @Param("supervisorName") String supervisorName,
                                                            Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.projectTitle = :capstoneName AND c.supervisor.supervisorName = :supervisorName")
    Page<CapstoneProject> findByCapstoneNameAndSupervisorName (@Param("capstoneName") String capstoneName,
                                                            @Param("supervisorName") String supervisorName,
                                                            Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.supervisor.supervisorName = :supervisorName AND  c.company.companyName = :companyName AND c.projectTitle = :capstoneName")
    Page<CapstoneProject> filterAll ( @Param("capstoneName") String capstoneName,
                                    @Param("companyName") String companyName,
                                    @Param("supervisorName") String supervisorName,
                                    Pageable page);

}
