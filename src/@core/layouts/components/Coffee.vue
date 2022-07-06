<template>
  <div>
    <b-card-title class="d-non d-sm-block">
      <span>Donation Addresses. Testnet Addresses begin with 't'</span>
    </b-card-title>
    <b-row>
      <b-col
        v-for="(item, i) in chains"
        :key="`coffee-${item.addr}-${i}`"
        md="4"
      >
        <b-input-group
          size="sm"
          class="input-group-merge mb-10"
        >
          <b-input-group-prepend is-text>
            <b-avatar
              :src="item.icon"
              variant="light-primary"
              size="16"
            />
          </b-input-group-prepend>
          <b-form-input :value="item.addr" />
        </b-input-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol,
  BAvatar, BFormInput, BInputGroupPrepend, BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import {
  addressEnCode, addressDecode,
} from '@/libs/utils'

export default {
  name: 'AppFooter',
  components: {
    BCol,
    BRow,
    BAvatar,
    BFormInput,
    BInputGroupPrepend,
    BInputGroup,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selectedAddress: 'cosmos1mv8zeqes72e7cjd8nzp5gzy5zkqr4rnhd8enn7',
    }
  },
  computed: {
    chains() {
      const { data } = addressDecode('cosmos1mv8zeqes72e7cjd8nzp5gzy5zkqr4rnhd8enn7')
      const config = Object.values(JSON.parse(localStorage.getItem('chains')))
        .map(x => ({
          addr: addressEnCode(x.addr_prefix, data),
          icon: x.logo,
        }))
      return config
    },
  },
  methods: {
    transfer(addr) {
      this.selectedAddress = addr
      this.$bvModal.show('transfer-window')
    },
  },
}
</script>
