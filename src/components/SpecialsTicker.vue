<template>
		<div v-if="thereIsSpace && fullScreen" class="ticker-wrap">
			<ul class="ticker">
				<li v-for="(special, i) in currentSpecials" :key="special.id" class="ticker__item" :class="{noMargin: i === 0}">
					<h1>{{ special.title.toUpperCase() }} - {{ special.description }}</h1>
				</li>
			</ul>
	</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { mapGetters } from 'vuex'

export default {
	setup() {
		const windowHeight = ref(window.innerHeight)
		onMounted(() => {
				window.addEventListener('resize', () => {windowHeight.value = window.innerHeight} )
		})
		onUnmounted(() => {
				window.removeEventListener('resize', () => {windowHeight.value = window.innerHeight})
		})
		return { 
				windowHeight,
		}
	},
	data() {
		return {
			appendedSpecials: '',
		}
	},
  computed: {
    ...mapGetters(['headerHeight','columnHeight','currentSpecials']),
		fullScreen() {return window.innerWidth > 1080},
		thereIsSpace() {return this.windowHeight - this.headerHeight - this.columnHeight > 110},
  },
	methods: {
		fetchSpecials() { 
      this.$store.dispatch({
        type: 'fetchSpecials',
				location: this.$route.params.store,
      }) 
    },
    fetchLooper() {
      this.fetchSpecials()
      this.fetchLoop = setInterval(() => {
        console.log('refreshing specials...')
        this.fetchSpecials()
      }, 120000)
    }
	},
	mounted() {
		this.fetchLooper()
	},
  unmounted() {
    clearInterval(this.fetchLoop)
  }
}
</script>

<style lang="scss" scoped>

ul {
	// display: flex;
	// flex-direction: row;
	// white-space: nowrap;
	list-style: none;
	// overflow-x: hidden;
	// margin: 0;
}

h1 {
  color: var(--highlight-text-color);
	margin: 9px;
	height: 100%;
	font-size: 2rem;
}

/* Ticker from https://codepen.io/lewismcarey/pen/GJZVoG */
* { box-sizing: border-box; }
$duration: 25s;

@-webkit-keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

.ticker-wrap {
	// margin-top: 10px;
	height: 80px;
	border-top-width: 3px;
	border-top-style: solid;
  
  position: fixed;
  bottom: 0;
  width: 100%;
  // overflow: hidden;
  // height: 4rem;
  padding-left: 100%;
  box-sizing: content-box;

  .ticker {

		// font-size: 100%;
    display: inline-block;
		margin: 0px;
    height: 100%;
    line-height: 4rem;  
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;

    -webkit-animation-iteration-count: infinite; 
            animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
   -webkit-animation-name: ticker;
           animation-name: ticker;
    -webkit-animation-duration: $duration;
            animation-duration: $duration;

    &__item {
      display: inline-block;
			margin-left: 50vw;
      // padding: 0 2rem;
      // font-size: 2rem;

			&.noMargin {
				margin-left: 0;
			}
    }
  }
}



// body { padding-bottom: 5rem; }
// h1,h2,p {padding: 0 5%;}

</style>