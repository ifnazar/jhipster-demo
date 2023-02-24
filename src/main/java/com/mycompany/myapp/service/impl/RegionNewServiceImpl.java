package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.RegionNew;
import com.mycompany.myapp.repository.RegionNewRepository;
import com.mycompany.myapp.service.RegionNewService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link RegionNew}.
 */
@Service
@Transactional
public class RegionNewServiceImpl implements RegionNewService {

    private final Logger log = LoggerFactory.getLogger(RegionNewServiceImpl.class);

    private final RegionNewRepository regionNewRepository;

    public RegionNewServiceImpl(RegionNewRepository regionNewRepository) {
        this.regionNewRepository = regionNewRepository;
    }

    @Override
    public RegionNew save(RegionNew regionNew) {
        log.debug("Request to save RegionNew : {}", regionNew);
        return regionNewRepository.save(regionNew);
    }

    @Override
    public RegionNew update(RegionNew regionNew) {
        log.debug("Request to update RegionNew : {}", regionNew);
        return regionNewRepository.save(regionNew);
    }

    @Override
    public Optional<RegionNew> partialUpdate(RegionNew regionNew) {
        log.debug("Request to partially update RegionNew : {}", regionNew);

        return regionNewRepository
            .findById(regionNew.getId())
            .map(existingRegionNew -> {
                if (regionNew.getRegionName() != null) {
                    existingRegionNew.setRegionName(regionNew.getRegionName());
                }

                return existingRegionNew;
            })
            .map(regionNewRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RegionNew> findAll() {
        log.debug("Request to get all RegionNews");
        return regionNewRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RegionNew> findOne(Long id) {
        log.debug("Request to get RegionNew : {}", id);
        return regionNewRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete RegionNew : {}", id);
        regionNewRepository.deleteById(id);
    }
}
