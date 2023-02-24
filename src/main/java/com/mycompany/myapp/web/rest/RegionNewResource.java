package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.RegionNew;
import com.mycompany.myapp.repository.RegionNewRepository;
import com.mycompany.myapp.service.RegionNewService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.RegionNew}.
 */
@RestController
@RequestMapping("/api")
public class RegionNewResource {

    private final Logger log = LoggerFactory.getLogger(RegionNewResource.class);

    private static final String ENTITY_NAME = "regionNew";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RegionNewService regionNewService;

    private final RegionNewRepository regionNewRepository;

    public RegionNewResource(RegionNewService regionNewService, RegionNewRepository regionNewRepository) {
        this.regionNewService = regionNewService;
        this.regionNewRepository = regionNewRepository;
    }

    /**
     * {@code POST  /region-news} : Create a new regionNew.
     *
     * @param regionNew the regionNew to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new regionNew, or with status {@code 400 (Bad Request)} if the regionNew has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/region-news")
    public ResponseEntity<RegionNew> createRegionNew(@RequestBody RegionNew regionNew) throws URISyntaxException {
        log.debug("REST request to save RegionNew : {}", regionNew);
        if (regionNew.getId() != null) {
            throw new BadRequestAlertException("A new regionNew cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RegionNew result = regionNewService.save(regionNew);
        return ResponseEntity
            .created(new URI("/api/region-news/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /region-news/:id} : Updates an existing regionNew.
     *
     * @param id the id of the regionNew to save.
     * @param regionNew the regionNew to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regionNew,
     * or with status {@code 400 (Bad Request)} if the regionNew is not valid,
     * or with status {@code 500 (Internal Server Error)} if the regionNew couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/region-news/{id}")
    public ResponseEntity<RegionNew> updateRegionNew(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RegionNew regionNew
    ) throws URISyntaxException {
        log.debug("REST request to update RegionNew : {}, {}", id, regionNew);
        if (regionNew.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, regionNew.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!regionNewRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RegionNew result = regionNewService.update(regionNew);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, regionNew.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /region-news/:id} : Partial updates given fields of an existing regionNew, field will ignore if it is null
     *
     * @param id the id of the regionNew to save.
     * @param regionNew the regionNew to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated regionNew,
     * or with status {@code 400 (Bad Request)} if the regionNew is not valid,
     * or with status {@code 404 (Not Found)} if the regionNew is not found,
     * or with status {@code 500 (Internal Server Error)} if the regionNew couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/region-news/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RegionNew> partialUpdateRegionNew(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody RegionNew regionNew
    ) throws URISyntaxException {
        log.debug("REST request to partial update RegionNew partially : {}, {}", id, regionNew);
        if (regionNew.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, regionNew.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!regionNewRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RegionNew> result = regionNewService.partialUpdate(regionNew);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, regionNew.getId().toString())
        );
    }

    /**
     * {@code GET  /region-news} : get all the regionNews.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of regionNews in body.
     */
    @GetMapping("/region-news")
    public List<RegionNew> getAllRegionNews() {
        log.debug("REST request to get all RegionNews");
        return regionNewService.findAll();
    }

    /**
     * {@code GET  /region-news/:id} : get the "id" regionNew.
     *
     * @param id the id of the regionNew to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the regionNew, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/region-news/{id}")
    public ResponseEntity<RegionNew> getRegionNew(@PathVariable Long id) {
        log.debug("REST request to get RegionNew : {}", id);
        Optional<RegionNew> regionNew = regionNewService.findOne(id);
        return ResponseUtil.wrapOrNotFound(regionNew);
    }

    /**
     * {@code DELETE  /region-news/:id} : delete the "id" regionNew.
     *
     * @param id the id of the regionNew to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/region-news/{id}")
    public ResponseEntity<Void> deleteRegionNew(@PathVariable Long id) {
        log.debug("REST request to delete RegionNew : {}", id);
        regionNewService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
