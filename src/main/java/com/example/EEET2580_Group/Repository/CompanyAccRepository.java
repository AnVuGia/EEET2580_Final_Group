package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyAccRepository extends JpaRepository<CompanyAcc, Long> {

    @Query("SELECT c FROM CompanyAcc c ORDER BY c.name ASC ")
    Page<CompanyAcc> findAll(Pageable page);

    @Query("SELECT c FROM CompanyAcc c WHERE c.name LIKE %:companyName%")
    Page<CompanyAcc> findByCompanyName(@Param("companyName") String companyName, Pageable page);

    @Query("SELECT c FROM CompanyAcc c WHERE c.username = :username")
    CompanyAcc findByUsername(@Param("username") String username);

    @Query("SELECT c FROM CompanyAcc c WHERE c.username = :username AND c.password = :password ")
    CompanyAcc findByUsernameAndPassword(@Param("username") String username,
                                         @Param("password") String password);

}
