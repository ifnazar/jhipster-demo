package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RegionNewTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegionNew.class);
        RegionNew regionNew1 = new RegionNew();
        regionNew1.setId(1L);
        RegionNew regionNew2 = new RegionNew();
        regionNew2.setId(regionNew1.getId());
        assertThat(regionNew1).isEqualTo(regionNew2);
        regionNew2.setId(2L);
        assertThat(regionNew1).isNotEqualTo(regionNew2);
        regionNew1.setId(null);
        assertThat(regionNew1).isNotEqualTo(regionNew2);
    }
}
