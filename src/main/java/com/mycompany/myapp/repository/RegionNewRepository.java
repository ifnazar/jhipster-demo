package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.RegionNew;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the RegionNew entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegionNewRepository extends JpaRepository<RegionNew, Long> {}
