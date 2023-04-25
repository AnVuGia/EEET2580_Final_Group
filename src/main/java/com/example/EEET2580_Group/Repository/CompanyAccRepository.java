package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CompanyAcc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyAccRepository extends JpaRepository<CompanyAcc, Long> {
    @Query("SELECT c FROM CompanyAcc c ORDER BY c.companyName ASC ")
    Page<CompanyAcc> findAll(Pageable page);

    @Query("SELECT c FROM CompanyAcc c WHERE c.companyName LIKE %:companyName%")
    Page<CompanyAcc> findByCompanyName(@Param("companyName") String companyName, Pageable page);
}
