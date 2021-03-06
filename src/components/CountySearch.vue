<template>
  <div id="CountySearch">
    <div class="CountySearch__head">
      <span class="logo" v-if="!disableLogo">
        <a href="https://www.getfarmcredit.com" v-bind:style="customLogo">GetFarmCredit.com</a>
      </span>
      <h1 class="CountySearch__title">Find a Location</h1>
      <p class="CountySearch__intro">
        <span v-if="!customIntro">
          We provide loans to farmers and rural home buyers in rural counties across 18 states and Puerto Rico. Simply enter your county in the search box below to find the location that serves you. For locations outside of our 18 state territory, please visit <a href="https://farmcredit.com/" rel="external">Farmcredit.com</a>.
        </span>
        <span v-else>{{ this.config.customIntro.text }}</span>
      </p>
    </div>

    <div class="CountySearch__body">
      <div class="CountySearch__search">
        <div class="CountySearch__input">
          <v-select
            :options="counties"
            :placeholder="'Enter your County'"
            :on-change="changed"
            :value.sync="searchTerm"
            ref="searchbox"
          />
        </div>
        <div class="CountySearch__clear">
          <button @click="clearSearch" class="btn-clear">Clear Search</button>
        </div>
      </div>

      <div class="CountySearch__branchList">
        <p v-if="!branches.length">No Matching Results</p>
        <transition-group name="branchFade" tag="ul" v-if="branches.length" class="branches">
          <li v-for="(item, index) in branches" :key="index" class="branch">
            <div class="branch__position">
              <p class="branch__position-number">#{{ index + 1 }}</p>
            </div>
            <div class="branch__info">
              <h3 class="branch__title">{{ item.Branch }}</h3>
              <p>
                {{ item.Address }}<br>
                {{ item.City }}, {{ item.State }} {{ item.Zip }}
              </p>
              <p>
                <a :href="mapLink(item)" target="_blank">Directions</a>
              </p>
              <br>
              <p v-if="item['Phone 1']">
                <strong>Phone:</strong> <a :href="phoneLink(item['Phone 1'])">{{ item['Phone 1'] }}</a>
              </p>
              <p v-if="item['Phone 2']">
                <strong>Phone 2:</strong> <a :href="phoneLink(item['Phone 2'])">{{ item['Phone 2'] }}</a>
              </p>
              <p v-if="item['Fax']">
                <strong>Fax:</strong> {{ item['Fax'] }}
              </p>
              <p v-if="item['website']">
                <strong>Web:</strong> <a :href="item['website']">{{ item['website'] }}</a>
              </p>
              <p v-if="item.CountyPartial === searchTerm" class="disclaimer">
                <em>Please call to confirm that this branch serves your location.</em>
              </p>
            </div>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';

export default {
  name: 'ag-county-search',
  components: {
    vSelect
  },
  props: {
    branches: {
      type: Array
    },
    counties: {
      type: Array
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      searchTerm: null,
      suggestionAttribute: 'countyName'
    };
  },
  methods: {
    clearSearch () {
      this.$refs.searchbox.mutableValue = null;
    },
    changed (val) {
      this.searchTerm = val
      this.$emit('searchedCounty', val);
    },
    phoneLink (phoneNum) {
      return `tel:${phoneNum.replace(' ', '-')}`;
    },
    mapLink (branch) {
      const address = branch.Address.split(' ').join('+').split('-').join('--');
      const city = branch.City.split(' ').join('+');
      const state = branch.State;
      const zip = branch.Zip;

      let googMapLink = `https://www.google.com/maps/search/?api=1&query=${address}+${city}+${state}+${zip}`;

      // Sometimes we need to use a specific Google Maps url
      // to find the right location (see Jay, FL branch)
      if (branch.google_maps_url) {
        googMapLink = branch.google_maps_url;
      }

      return googMapLink;
    }
  },
  computed: {
    customLogo () {
      if (this.config.customLogo) {
        if (this.config.customLogo.useCustomLogo) {
          return {
            'background-image': `url('${this.config.customLogo.url}')`
          }
        }
      }
    },
    customIntro () {
      if (this.config.customIntro) {
        return this.config.customIntro.useCustomIntro
      }
    },
    disableLogo () {
      if (this.config.disableLogo) {
        return this.config.disableLogo
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  padding: 16px;

  a {
    display: block;
    background: url('./../../static/img/logo-getfarm.png') center center no-repeat;
    background-size: contain;
    margin: 0 auto;
    text-indent: -9999px;
    width: 230px;
    height: 70px;
    max-width: 100%;
  }
}

.searchbox {
  width: 100%;
}

.CountySearch {
  &__title {
    font-family: 'futura-pt', sans-serif;
    background: #5B8F22;
    color: #fff;
    padding: 12px 24px;
    text-transform: uppercase;
    margin: 0;
    font-size: 32px;
  }

  &__intro {
    margin: 0;
    padding: 24px;
    background: #494949;
    color: #fff;
    font-size: 15px;
    line-height: 1.4;

    a {
      color: #5B8F22;

      &:hover {
        color: #fff;
        text-decoration: none;
      }
    }
  }

  &__body {
    padding: 16px;
  }

  &__search {
    justify-content: space-between;
    align-items: center;
    padding: 0 8px 16px;

    @media only screen and (min-width: 480px) {
      display: flex;
    }

    @media only screen and (min-width: 768px) {
      display: block;
    }

    @media only screen and (min-width: 1024px) {
      display: flex;
    }
  }

  &__input {
    flex: 1 0 auto;
    padding-right: 16px;

    // `/deep/` makes this scoped style available to child components
    // in this case, overriding the 3rd party child component `v-select`
    & /deep/ .v-select {
      &,
      input {
        font-family: 'Georgia', 'Times New Roman', Times, serif;
      }

      input[type="search"],
      input[type="search"]:focus {
        padding-left: 20px;
        padding-right: 20px;
      }

      .open-indicator {
        &:before {
          border-width: 1px 1px 0 0;
        }
      }

      .dropdown-toggle {
        border-radius: 3px;
        background: #eff1ed;
        border: 0;
      }

      .dropdown-menu {
        background: #eff1ed;
        border: 0;

        li.no-options {
          margin: 0 8px;
        }
      }

      .selected-tag {
        position: absolute;
        left: 0;
        padding-left: 16px;
      }
    }
  }

  &__clear {
    flex: 0 0 auto;
    margin: 16px 0 0;

    @media only screen and (min-width: 480px) {
      margin: 0 auto;
    }

    @media only screen and (min-width: 768px) {
      margin: 16px 0 0;
    }

    @media only screen and (min-width: 1024px) {
      margin: 0 auto;
    }

    .btn-clear {
      appearance: none;
      border: 0;
      background: transparent;
      text-decoration: underline;
      color: #5B8F22;
      font-family: "futura-pt", sans-serif;
      font-size: 16px;
      cursor: pointer;
      margin: 0 auto;
      display: block;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

.branches {
  list-style: none;
  padding: 0;
  margin: 0 auto 40px;

  li {
    border-bottom: 1px solid #e0e0e0;
    &:last-child {
      border: 0;
    }

    a {
      color: #2c3e50;
      text-decoration: none;
      border-bottom: 1px dotted #9e9e9e;
    }
  }
}

.branch {
  padding: 16px 0;
  display: flex;
  align-items: center;

  &__position-number {
    font-size: 32px;
    font-family: 'futura-pt-bold', sans-serif;
    color: #989898;
  }

  &__title {
    color: #5B8F22;
    font-family: 'futura-pt-bold', sans-serif;
    text-transform: uppercase;
    margin: 0;
    font-size: 18px;
  }

  &__info {
    margin-left: 16px;
  }

  p {
    margin: 0;
    line-height: 1.4;

    &.disclaimer {
      margin: 16px auto 0;
      font-size: 12px;
    }
  }
}

// animation
.branchFade-enter-active, .branchFade-leave-active {
  transition: all 0.25s ease-out;
}

.branchFade-enter {
  // transform: translate(-50%);
  opacity: 0;
}

.branchFade-leave-to {
  // transform: translate(50%);
  opacity: 0;
}
</style>
