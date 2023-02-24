package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.RegionNew;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link RegionNew}.
 */
public interface RegionNewService {
    /**
     * Save a regionNew.
     *
     * @param regionNew the entity to save.
     * @return the persisted entity.
     */
    RegionNew save(RegionNew regionNew);

    /**
     * Updates a regionNew.
     *
     * @param regionNew the entity to update.
     * @return the persisted entity.
     */
    RegionNew update(RegionNew regionNew);

    /**
     * Partially updates a regionNew.
     *
     * @param regionNew the entity to update partially.
     * @return the persisted entity.
     */
    Optional<RegionNew> partialUpdate(RegionNew regionNew);

    /**
     * Get all the regionNews.
     *
     * @return the list of entities.
     */
    List<RegionNew> findAll();

    /**
     * Get the "id" regionNew.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RegionNew> findOne(Long id);

    /**
     * Delete the "id" regionNew.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
