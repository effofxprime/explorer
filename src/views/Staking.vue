<template>
  <div>
    <b-card
      v-if="erialosVals && erialosVals.length > 0"
      title="🦊 Help Decentralize your delegation! After choosing me, pick at least 2-4 more different validators 🦊"
      class="overflow-auto"
    >
      <b-table
        :items="erialosVals"
        :fields="validator_fields"
        :sort-desc="true"
        sort-by="tokens"
        striped
        hover
        responsive="sm"
      >
        <!-- A virtual column -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <!-- Column: Validator -->
        <template #cell(description)="data">
          <b-media
            vertical-align="center"
            class="text-truncate"
            style="max-width:320px;"
          >
            <template #aside>
              <b-avatar
                v-if="data.item.avatar"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.hover.right="data.item.description.details"
                size="32"
                variant="light-primary"
                :src="data.item.avatar"
              />
              <b-avatar
                v-if="!data.item.avatar"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.hover.right="data.item.description.details"
              >
                <feather-icon icon="ServerIcon" />
              </b-avatar>
            </template>
            <span class="font-weight-bolder d-block text-nowrap">
              <router-link
                :to="`./staking/${data.item.operator_address}`"
              >
                {{ data.item.description.moniker }}
              </router-link>
            </span>
            <small
              class="text-muted"
            >{{ data.item.description.website || data.item.description.identity }}</small>
          </b-media>
        </template>
        <!-- Token -->
        <template #cell(tokens)="data">
          <div
            v-if="data.item.tokens > 0"
            class="d-flex flex-column"
          >
            <span class="font-weight-bold mb-0">{{ tokenFormatter(data.item.tokens, stakingParameters.bond_denom) }}</span>
            <span class="font-small-2 text-muted text-nowrap d-none d-lg-block">{{ percent(data.item.tokens/stakingPool) }}%</span>
          </div>
          <span v-else>{{ data.item.delegator_shares }}</span>
        </template>
        <!-- Token -->
        <template #cell(changes)="data">
          <small
            v-if="data.item.changes>0"
            class="text-success"
          >+{{ data.item.changes }}</small>
          <small v-else-if="data.item.changes===0">-</small>
          <small
            v-else
            class="text-danger"
          >{{ data.item.changes }}</small>
        </template>
        <template #cell(operation)="data">
          <b-button
            v-b-modal.operation-modal
            :name="data.item.operator_address"
            variant="primary"
            size="sm"
            @click="selectValidator(data.item.operator_address)"
          >
            Delegate
          </b-button>
        </template>
      </b-table>
    </b-card>
    <b-card
      v-if="recVals && recVals.length > 0"
      title="🦊 Help Decentralize your delegation! Here's a list of recommended Validators with vote power < 1% 🦊"
      class="overflow-auto"
    >
      <b-table
        :items="recVals"
        :fields="validator_fields"
        :sort-desc="true"
        sort-by="tokens"
        striped
        hover
        responsive="sm"
      >
        <!-- A virtual column -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <!-- Column: Validator -->
        <template #cell(description)="data">
          <b-media
            vertical-align="center"
            class="text-truncate"
            style="max-width:320px;"
          >
            <template #aside>
              <b-avatar
                v-if="data.item.avatar"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.hover.right="data.item.description.details"
                size="32"
                variant="light-primary"
                :src="data.item.avatar"
              />
              <b-avatar
                v-if="!data.item.avatar"
                v-b-tooltip.hover.v-primary
                v-b-tooltip.hover.right="data.item.description.details"
              >
                <feather-icon icon="ServerIcon" />
              </b-avatar>
            </template>
            <span class="font-weight-bolder d-block text-nowrap">
              <router-link
                :to="`./staking/${data.item.operator_address}`"
              >
                {{ data.item.description.moniker }}
              </router-link>
            </span>
            <small
              class="text-muted"
            >{{ data.item.description.website || data.item.description.identity }}</small>
          </b-media>
        </template>
        <!-- Token -->
        <template #cell(tokens)="data">
          <div
            v-if="data.item.tokens > 0"
            class="d-flex flex-column"
          >
            <span class="font-weight-bold mb-0">{{ tokenFormatter(data.item.tokens, stakingParameters.bond_denom) }}</span>
            <span class="font-small-2 text-muted text-nowrap d-none d-lg-block">{{ percent(data.item.tokens/stakingPool)
            }}%</span>
          </div>
          <span v-else>{{ data.item.delegator_shares }}</span>
        </template>
        <!-- Token -->
        <template #cell(changes)="data">
          <small
            v-if="data.item.changes > 0"
            class="text-success"
          >+{{ data.item.changes }}</small>
          <small
            v-else-if="data.item.changes===0"
          >-</small>
          <small
            v-else
            class="text-danger"
          >{{ data.item.changes }}</small>
        </template>
        <template #cell(operation)="data">
          <b-button
            v-b-modal.operation-modal
            :name="data.item.operator_address"
            variant="primary"
            size="sm"
            @click="selectValidator(data.item.operator_address)"
          >
            Delegate
          </b-button>
        </template>
      </b-table>
    </b-card>
    <b-card
      no-body
      class="overflow-auto"
    >
      <b-card-header class="d-flex justify-content-between">
        <b-form-group class="mb-0">
          <b-form-radio-group
            id="btn-radios-1"
            v-model="selectedStatus"
            button-variant="outline-primary"
            :options="statusOptions"
            buttons
            name="radios-btn-default"
            @change="getValidatorListByStatus"
          />
        </b-form-group>
        <b-card-title class="d-none d-sm-block">
          <span>Validators {{ validators.length }}/{{ stakingParameters.max_validators }} </span>
        </b-card-title>
      </b-card-header>
      <b-card-body class="pl-0 pr-0 pb-0">
        <b-table
          class="mb-0"
          :items="list"
          :fields="validator_fields"
          :sort-desc="true"
          sort-by="tokens"
          striped
          hover
          responsive="sm"
        >
          <!-- A virtual column -->
          <template #cell(index)="data">
            <b-badge :variant="rankBadge(data)">
              {{ data.index + 1 }}
            </b-badge>
          </template>
          <!-- Column: Validator -->
          <template #cell(description)="data">
            <b-media
              vertical-align="center"
              class="text-truncate"
              style="max-width:320px;"
            >
              <template #aside>
                <b-avatar
                  v-if="data.item.avatar"
                  v-b-tooltip.hover.v-primary
                  v-b-tooltip.hover.right="data.item.description.details"
                  size="32"
                  variant="light-primary"
                  :src="data.item.avatar"
                />
                <b-avatar
                  v-if="!data.item.avatar"
                  v-b-tooltip.hover.v-primary
                  v-b-tooltip.hover.right="data.item.description.details"
                >
                  <feather-icon icon="ServerIcon" />
                </b-avatar>
              </template>
              <span class="font-weight-bolder d-block text-nowrap">
                <router-link
                  :to="`./staking/${data.item.operator_address}`"
                >
                  {{ data.item.description.moniker }}
                </router-link>
              </span>
              <small
                class="text-muted"
              >{{ data.item.description.website || data.item.description.identity }}</small>
            </b-media>
          </template>
          <!-- Token -->
          <template #cell(tokens)="data">
            <div
              v-if="data.item.tokens > 0"
              class="d-flex flex-column"
            >
              <span class="font-weight-bold mb-0">{{ tokenFormatter(data.item.tokens, stakingParameters.bond_denom) }}</span>
              <span class="font-small-2 text-muted text-nowrap d-none d-lg-block">{{ percent(data.item.tokens/stakingPool) }}%</span>
            </div>
            <span v-else>{{ data.item.delegator_shares }}</span>
          </template>
          <!-- Token -->
          <template #cell(changes)="data">
            <small
              v-if="data.item.changes>0"
              class="text-success"
            >+{{ data.item.changes }}</small>
            <small v-else-if="data.item.changes===0">-</small>
            <small
              v-else
              class="text-danger"
            >{{ data.item.changes }}</small>
          </template>
          <template #cell(operation)="data">
            <b-button
              v-b-modal.operation-modal
              :name="data.item.operator_address"
              variant="primary"
              size="sm"
              @click="selectValidator(data.item.operator_address)"
            >
              Delegate
            </b-button>
          </template>
        </b-table>
      </b-card-body>
      <b-card-footer class="d-none d-md-block d-md-flex justify-content-between">
        <small>
          <b-badge variant="danger">
              &nbsp;
          </b-badge>
          Top 33%
          <b-badge variant="warning">
              &nbsp;
          </b-badge>
          Top 67% of Voting Power
        </small>
        <download-excel
          :fields="excelCols"
          :data="list"
          type="csv"
          worksheet="Validators"
          name="validators.xls"
        >
          <b-button
            variant="primary"
            size="sm"
          >
            Export to Excel
          </b-button>
        </download-excel>
      </b-card-footer>
    </b-card>
    <operation-modal
      type="Delegate"
      :validator-address="validator_address"
    />
    <div id="txevent" />
  </div>
</template>

<script>
import {
  BTable, BMedia, BAvatar, BBadge, BCard, BCardHeader, BCardTitle, VBTooltip, BCardBody, BButton, BFormRadioGroup, BFormGroup,
  BCardFooter,
} from 'bootstrap-vue'
import {
  percent, StakingParameters, formatToken,
} from '@/libs/utils'
import { keybase } from '@/libs/fetch'
import OperationModal from '@/views/components/OperationModal/index.vue'
import DownloadExcel from 'vue-json-excel'

export default {
  components: {
    BCard,
    BTable,
    BMedia,
    BAvatar,
    BBadge,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BButton,
    BFormRadioGroup,
    BFormGroup,
    BCardFooter,
    OperationModal,
    DownloadExcel,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      islive: true,
      validator_address: null,
      mintInflation: 0,
      stakingPool: 1,
      stakingParameters: new StakingParameters(),
      validators: [],
      delegations: [],
      changes: {},
      latestPower: {},
      previousPower: {},
      excelCols: {
        Validator: 'description.moniker',
        Identity: 'description.identity',
        Website: 'description.website',
        'Operator Address': 'operator_address',
        Status: 'status',
        'Bonded Tokens': 'tokens',
        'Formated Bonded Tokens': {
          field: 'tokens',
          callback: value => this.tokenFormatter(value, this.stakingParameters.bond_denom),
        },
        Percent: {
          field: 'tokens',
          callback: value => this.percent(value / this.stakingPool),
        },
        '24h Changes': 'changes',
        'Unbonding Height': 'unbonding_height',
        'Unbonding Time': 'unbonding_time',
      },
      validator_fields: [
        {
          key: 'index',
          label: '#',
          tdClass: 'd-none d-md-block',
          thClass: 'd-none d-md-block',
        },
        { key: 'description', label: 'Validator' },
        {
          key: 'tokens',
          label: 'Voting Power',
          sortable: true,
          tdClass: 'text-right',
          thClass: 'text-right',
          sortByFormatted: true,
        },
        {
          key: 'changes',
          label: '24H Changes',
        },
        {
          key: 'commission',
          formatter: value => `${percent(value.rate)}%`,
          tdClass: 'text-right',
          thClass: 'text-right',
        },
        {
          key: 'operation',
          label: '',
          tdClass: 'text-right',
          thClass: 'text-right',
        },
      ],
      statusOptions: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      selectedStatus: 'active',
      isInactiveLoaded: false,
      inactiveValidators: [],
    }
  },
  computed: {
    erialosVals() {
      return this.list.filter(x => x.description.identity === '46C9F0926FB78AF6')
    },
    // Consensus One 38172502B043D302
    // Block Pane D75509198CE782A6
    // Deep Fields (VDL) 9795DFCC54A8F79F
    // Interbloc B74BDDE339591690
    // Golden Ratio 1C32EF4035953E8B
    // Jabbey FA260EE7A0113432
    // KJINC (Small Validator) E294DFEB5B016EE2
    // lavender Five F87ADDB700C0CC94
    // Notional 0E480E2B83B23D80
    // Oni 5A8AB49CF5CAAF3C
    // OtterSync DA0FA424D0059E3D
    // Pace 168237257EE5F3AD
    // PFC 86AC709C230079D0
    // Ping 6783E9F948541962
    // Polkachu 0A6AF02D1557E5B4
    // Silk Nodes 1326A75B9148A214
    // Stakecito D16E26E5C8154E17
    // Tedcrypto 6D5F63F1DDCF0404
    recVals() {
      const recommended = ['38172502B043D302', 'D75509198CE782A6', '9795DFCC54A8F79F', 'B74BDDE339591690', '1C32EF4035953E8B', 'FA260EE7A0113432', 'E294DFEB5B016EE2', 'F87ADDB700C0CC94', '0E480E2B83B23D80', '5A8AB49CF5CAAF3C', 'DA0FA424D0059E3D', '168237257EE5F3AD', '86AC709C230079D0', '6783E9F948541962', '0A6AF02D1557E5B4', '1326A75B9148A214', 'D16E26E5C8154E17', '6D5F63F1DDCF0404']
      const recFiltered = []
      return this.list.filter(x => {
        if (recommended.includes(x.description.identity) && x.commission.rate >= 0.05 && x.commission.rate <= 0.1 && x.tokens / this.stakingPool < 0.01) {
          recFiltered.push(x.description.identity)
        }
        return recFiltered.includes(x.description.identity)
      })
    },
    list() {
      const tab = this.selectedStatus === 'active' ? this.validators : this.inactiveValidators
      return tab.map(x => {
        const xh = x
        if (Object.keys(this.latestPower).length > 0 && Object.keys(this.previousPower).length > 0) {
          const latest = this.latestPower[x.consensus_pubkey.key] || 0
          const previous = this.previousPower[x.consensus_pubkey.key] || 0
          xh.changes = latest - previous
        }
        return xh
      })
    },
  },
  created() {
    this.$http.getStakingPool().then(pool => {
      this.stakingPool = pool.bondedToken
    })
    // set
    this.$http.getStakingParameters().then(res => {
      this.stakingParameters = res
    })
    this.initial()
  },
  beforeDestroy() {
    this.islive = false
  },
  mounted() {
    const elem = document.getElementById('txevent')
    elem.addEventListener('txcompleted', () => {
      this.initial()
    })
  },
  methods: {
    initial() {
      this.$http.getValidatorList().then(res => {
        const identities = []
        const temp = res
        for (let i = 0; i < temp.length; i += 1) {
          const { identity } = temp[i].description
          const url = this.$store.getters['chains/getAvatarById'](identity)
          if (url) {
            temp[i].avatar = url
          } else if (identity && identity !== '') {
            identities.push(identity)
          }
        }

        // fetch avatar from keybase
        let promise = Promise.resolve()
        identities.forEach(item => {
          promise = promise.then(() => new Promise(resolve => {
            this.avatar(item, resolve)
          }))
        })
        this.validators = temp
        this.getPreviousPower(this.validators.length)
      })
    },
    getPreviousPower(length) {
      this.$http.getValidatorListByHeight('latest', 0).then(data => {
        let height = Number(data.block_height)
        if (height > 14400) {
          height -= 14400
        } else {
          height = 1
        }
        data.validators.forEach(x => {
          this.$set(this.latestPower, x.pub_key.key, Number(x.voting_power))
        })
        for (let offset = 100; offset < length; offset += 100) {
          this.$http.getValidatorListByHeight('latest', offset).then(latest => {
            latest.validators.forEach(x => {
              this.$set(this.latestPower, x.pub_key.key, Number(x.voting_power))
            })
          })
        }
        for (let offset = 0; offset < length; offset += 100) {
          this.$http.getValidatorListByHeight(height, offset).then(previous => {
            previous.validators.forEach(x => {
              this.$set(this.previousPower, x.pub_key.key, Number(x.voting_power))
            })
          })
        }
      })
    },
    getValidatorListByStatus() {
      if (this.isInactiveLoaded) return
      const statusList = ['BOND_STATUS_UNBONDED', 'BOND_STATUS_UNBONDING']
      statusList.forEach(status => {
        this.$http.getValidatorListByStatus(status).then(res => {
          const identities = []
          const temp = res
          for (let i = 0; i < temp.length; i += 1) {
            const { identity } = temp[i].description
            const url = this.$store.getters['chains/getAvatarById'](identity)
            if (url) {
              temp[i].avatar = url
            } else if (identity && identity !== '') {
              identities.push(identity)
            }
          }

          // fetch avatar from keybase
          let promise = Promise.resolve()
          identities.forEach(item => {
            promise = promise.then(() => new Promise(resolve => {
              this.avatar(item, resolve)
            }))
          })
          this.inactiveValidators = this.inactiveValidators.concat(res)
        })
      })
      this.isInactiveLoaded = true
    },
    selectValidator(da) {
      this.validator_address = da
    },
    percent,
    tokenFormatter(amount, denom) {
      return formatToken({ amount, denom }, {}, 0)
    },
    rankBadge(data) {
      if (this.selectedStatus === 'inactive') return 'primary'
      const { index, item } = data
      if (index === 0) {
        window.sum = 0
      }
      const rank = window.sum / this.stakingPool
      window.sum += item.tokens // sum up after the calculating.
      if (rank < 0.333) {
        return 'danger'
      }
      if (rank < 0.67) {
        return 'warning'
      }
      return 'primary'
    },
    avatar(identity, resolve) {
      if (this.islive) {
        keybase(identity).then(d => {
          resolve()
          if (Array.isArray(d.them) && d.them.length > 0) {
            const pic = d.them[0].pictures
            if (pic) {
              const list = this.selectedStatus === 'active' ? this.validators : this.inactiveValidators
              const validator = list.find(u => u.description.identity === identity)
              this.$set(validator, 'avatar', pic.primary.url)
              this.$store.commit('cacheAvatar', { identity, url: pic.primary.url })
            }
          }
        })
      }
    },
  },
}
</script>
