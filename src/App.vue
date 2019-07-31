<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Stopwatch&nbsp;<span class="font-weight-light">23</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex
              xs6
              class="text-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item
            v-else
            :key="i"
            @click=""
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>


      <v-container
        fluid
        fill-height
        class="grey lighten-4"
      >
	  
	  
        <v-layout
          justify-center
          align-center
        >
			<v-flex shrink mr-5 pr-5>
				<v-layout row>
					<div class="d-flex shrink display-4">{{ min }}</div>
					<div class="d-flex shrink my-auto display-2 font-weight-medium">:</div>
					<div class="d-flex shrink display-4">{{ sec }}</div>
					<div class="d-flex shrink my-auto display-2 font-weight-medium">:</div>
					<div class="d-flex shrink display-4">{{ ms }}</div>
				</v-layout>
			</v-flex>
          <v-flex shrink>
            <v-tooltip v-if="timer === 0" right>
			  <template v-slot:activator="{ on }">      
				<v-btn
				  color="error" 
				  fab dark large
				  v-on="on"
				  @click.prevent="start"
				>
				  <v-icon dark>mdi-alarm</v-icon>
				</v-btn>
              </template>
				  <span>Start!</span>
				</v-tooltip>
				
				<v-btn v-else color="success" @click.prevent="pause">Pause</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const STORAGE = localStorage;
const ITEM_KEY = 'TIME';

export default {
data: () => ({

autoSaveDelay: 1000,

timer: 0,

time: {
	min: 0,
	sec: 0,
	ms: 0,
},
  drawer: null,
  items: [
	{ icon: 'lightbulb_outline', text: 'Notes' },
	{ icon: 'touch_app', text: 'Reminders' },
	{ divider: true },
	{ heading: 'Labels' },
	{ icon: 'add', text: 'Create new label' },
	{ divider: true },
	{ icon: 'archive', text: 'Archive' },
	{ icon: 'delete', text: 'Trash' },
	{ divider: true },
	{ icon: 'settings', text: 'Settings' },
	{ icon: 'chat_bubble', text: 'Trash' },
	{ icon: 'help', text: 'Help' },
	{ icon: 'phonelink', text: 'App downloads' },
	{ icon: 'keyboard', text: 'Keyboard shortcuts' },
  ],
}),
created() {
	this.time = { ...this.storageTime };
	
	window.addEventListener('beforeunload', (e) => {
		this.pause();
	});
},
computed: {
	min() {
		const { min } = this.time; 
		return (min < 10 ? '0':'') + min;
	},
	
	sec() {
		const { sec } = this.time; 
		return (sec < 10 ? '0':'') + sec;
	},
	
	ms() {
		const { ms } = this.time; 
		const res = ms / 10;
		return (res < 10 ? '0':'') + res;
	},
	
	storageTime() {
		const item = STORAGE.getItem(ITEM_KEY);
		return { ...this.time, ...JSON.parse(item) };
	}
},
methods: {
	start() {			
		this.timer = setInterval(() => {
			this.time.ms += 10;
			
			if (this.time.ms >= 999) {
				this.time.ms = 0;
				this.time.sec++;

				this.save();
			} 
			
			if (this.time.sec >= 60) {
				this.time.sec = 0;
				this.time.min++;
			}
		}, 10);
	},
	
	pause() {
		clearInterval(this.timer);
		this.timer = 0;
		
		this.save();
	},
	
	save() {
		STORAGE.setItem(ITEM_KEY, JSON.stringify(this.time));
	},
},
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>