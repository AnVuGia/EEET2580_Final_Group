package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CompanyAcc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyAccRepository extends JpaRepository<CompanyAcc, Long> {
    @Query("SELECT c FROM CompanyAcc c WHERE c.username = :username")
    CompanyAcc findByUsername(@Param("username") String username);

}
