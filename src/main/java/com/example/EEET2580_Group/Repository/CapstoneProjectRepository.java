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
    enum Status{
        PENDING,
        APPROVED,
        REJECT
    }
    Status currentStatus = null;
    String status[] = {"pending","approved","reject"};

    <Optional> CapstoneProject findByProjectTitle(String title);

    @Query("SELECT c FROM CapstoneProject c WHERE c.capstoneStatus = :status ORDER BY c.projectTitle ASC")
    Page<CapstoneProject> findByStatus (@Param("status") String status,Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.company.name = :companyName AND c.capstoneStatus = :status")
    Page<CapstoneProject> findByCompanyName (@Param("companyName") String companyName,
                                             @Param("status") String status,
                                             Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.supervisor.name = :supervisorName AND c.capstoneStatus = :status")
    Page<CapstoneProject> findBySupervisorName (@Param("supervisorName") String supervisorName,
                                                @Param("status") String status,
                                                Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.projectTitle LIKE %:capstoneName% AND c.capstoneStatus = :status")
    Page<CapstoneProject> findByCapstoneName (@Param("capstoneName") String capstoneName,
                                              @Param("status") String status,
                                              Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.projectTitle = :capstoneName AND c.company.name = :companyName AND c.capstoneStatus = :status")
    Page<CapstoneProject> findByCapstoneNameAndCompanyName (@Param("capstoneName") String capstoneName,
                                                            @Param("companyName") String companyName,
                                                            @Param("status") String status,
                                                            Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.company.name = :companyName AND c.supervisor.name = :supervisorName AND c.capstoneStatus = :status")
    Page<CapstoneProject> findByCompanyNameAndSupervisorName (  @Param("companyName") String companyName,
                                                                @Param("supervisorName") String supervisorName,
                                                                @Param("status") String status,
                                                                Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.projectTitle = :capstoneName AND c.supervisor.name = :supervisorName AND c.capstoneStatus = :status")
    Page<CapstoneProject> findByCapstoneNameAndSupervisorName ( @Param("capstoneName") String capstoneName,
                                                                @Param("supervisorName") String supervisorName,
                                                                @Param("status") String status,
                                                                Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.supervisor.username = :supervisorName AND  c.company.name = " +
            ":companyName AND c.projectTitle = :capstoneName AND c.capstoneStatus = :status")
    Page<CapstoneProject> filterAll ( @Param("capstoneName") String capstoneName,
                                      @Param("companyName") String companyName,
                                      @Param("supervisorName") String supervisorName,
                                      @Param("status") String status, Pageable page);

    @Query("SELECT c FROM CapstoneProject c WHERE c.company.username = :company_name AND c.capstoneStatus = :status")
    List<CapstoneProject> findAllProjectByCompanyName(@Param("company_name") String company_name,
                                                      @Param("status") String status);

    @Query("SELECT c FROM CapstoneProject c WHERE c.company.username = :company_name AND c.capstoneStatus = :status")
    Page<CapstoneProject> findByCompanyNameAndStatus(@Param("company_name") String company_name,
                                                         @Param("status") String status,
                                                         Pageable page);

}
