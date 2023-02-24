package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.RegionNew;
import com.mycompany.myapp.repository.RegionNewRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RegionNewResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RegionNewResourceIT {

    private static final String DEFAULT_REGION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_REGION_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/region-news";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RegionNewRepository regionNewRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRegionNewMockMvc;

    private RegionNew regionNew;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RegionNew createEntity(EntityManager em) {
        RegionNew regionNew = new RegionNew().regionName(DEFAULT_REGION_NAME);
        return regionNew;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RegionNew createUpdatedEntity(EntityManager em) {
        RegionNew regionNew = new RegionNew().regionName(UPDATED_REGION_NAME);
        return regionNew;
    }

    @BeforeEach
    public void initTest() {
        regionNew = createEntity(em);
    }

    @Test
    @Transactional
    void createRegionNew() throws Exception {
        int databaseSizeBeforeCreate = regionNewRepository.findAll().size();
        // Create the RegionNew
        restRegionNewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(regionNew)))
            .andExpect(status().isCreated());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeCreate + 1);
        RegionNew testRegionNew = regionNewList.get(regionNewList.size() - 1);
        assertThat(testRegionNew.getRegionName()).isEqualTo(DEFAULT_REGION_NAME);
    }

    @Test
    @Transactional
    void createRegionNewWithExistingId() throws Exception {
        // Create the RegionNew with an existing ID
        regionNew.setId(1L);

        int databaseSizeBeforeCreate = regionNewRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegionNewMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(regionNew)))
            .andExpect(status().isBadRequest());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRegionNews() throws Exception {
        // Initialize the database
        regionNewRepository.saveAndFlush(regionNew);

        // Get all the regionNewList
        restRegionNewMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(regionNew.getId().intValue())))
            .andExpect(jsonPath("$.[*].regionName").value(hasItem(DEFAULT_REGION_NAME)));
    }

    @Test
    @Transactional
    void getRegionNew() throws Exception {
        // Initialize the database
        regionNewRepository.saveAndFlush(regionNew);

        // Get the regionNew
        restRegionNewMockMvc
            .perform(get(ENTITY_API_URL_ID, regionNew.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(regionNew.getId().intValue()))
            .andExpect(jsonPath("$.regionName").value(DEFAULT_REGION_NAME));
    }

    @Test
    @Transactional
    void getNonExistingRegionNew() throws Exception {
        // Get the regionNew
        restRegionNewMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRegionNew() throws Exception {
        // Initialize the database
        regionNewRepository.saveAndFlush(regionNew);

        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();

        // Update the regionNew
        RegionNew updatedRegionNew = regionNewRepository.findById(regionNew.getId()).get();
        // Disconnect from session so that the updates on updatedRegionNew are not directly saved in db
        em.detach(updatedRegionNew);
        updatedRegionNew.regionName(UPDATED_REGION_NAME);

        restRegionNewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRegionNew.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRegionNew))
            )
            .andExpect(status().isOk());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
        RegionNew testRegionNew = regionNewList.get(regionNewList.size() - 1);
        assertThat(testRegionNew.getRegionName()).isEqualTo(UPDATED_REGION_NAME);
    }

    @Test
    @Transactional
    void putNonExistingRegionNew() throws Exception {
        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();
        regionNew.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegionNewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, regionNew.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(regionNew))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRegionNew() throws Exception {
        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();
        regionNew.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegionNewMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(regionNew))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRegionNew() throws Exception {
        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();
        regionNew.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegionNewMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(regionNew)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRegionNewWithPatch() throws Exception {
        // Initialize the database
        regionNewRepository.saveAndFlush(regionNew);

        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();

        // Update the regionNew using partial update
        RegionNew partialUpdatedRegionNew = new RegionNew();
        partialUpdatedRegionNew.setId(regionNew.getId());

        partialUpdatedRegionNew.regionName(UPDATED_REGION_NAME);

        restRegionNewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRegionNew.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRegionNew))
            )
            .andExpect(status().isOk());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
        RegionNew testRegionNew = regionNewList.get(regionNewList.size() - 1);
        assertThat(testRegionNew.getRegionName()).isEqualTo(UPDATED_REGION_NAME);
    }

    @Test
    @Transactional
    void fullUpdateRegionNewWithPatch() throws Exception {
        // Initialize the database
        regionNewRepository.saveAndFlush(regionNew);

        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();

        // Update the regionNew using partial update
        RegionNew partialUpdatedRegionNew = new RegionNew();
        partialUpdatedRegionNew.setId(regionNew.getId());

        partialUpdatedRegionNew.regionName(UPDATED_REGION_NAME);

        restRegionNewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRegionNew.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRegionNew))
            )
            .andExpect(status().isOk());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
        RegionNew testRegionNew = regionNewList.get(regionNewList.size() - 1);
        assertThat(testRegionNew.getRegionName()).isEqualTo(UPDATED_REGION_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingRegionNew() throws Exception {
        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();
        regionNew.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRegionNewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, regionNew.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(regionNew))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRegionNew() throws Exception {
        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();
        regionNew.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegionNewMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(regionNew))
            )
            .andExpect(status().isBadRequest());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRegionNew() throws Exception {
        int databaseSizeBeforeUpdate = regionNewRepository.findAll().size();
        regionNew.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRegionNewMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(regionNew))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the RegionNew in the database
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRegionNew() throws Exception {
        // Initialize the database
        regionNewRepository.saveAndFlush(regionNew);

        int databaseSizeBeforeDelete = regionNewRepository.findAll().size();

        // Delete the regionNew
        restRegionNewMockMvc
            .perform(delete(ENTITY_API_URL_ID, regionNew.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RegionNew> regionNewList = regionNewRepository.findAll();
        assertThat(regionNewList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
