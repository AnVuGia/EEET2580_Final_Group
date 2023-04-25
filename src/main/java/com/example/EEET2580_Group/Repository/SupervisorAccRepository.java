package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.SupervisorAcc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SupervisorAccRepository extends JpaRepository<SupervisorAcc, Long> {
    @Query("SELECT s FROM SupervisorAcc s WHERE s.username = :username")
    SupervisorAcc findByUsername(@Param("username") String username);
}
