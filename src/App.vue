<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Stopwatch&nbsp;<span class="font-weight-light">23</span></span>
	  
      <v-card
			width="600"
			style="top: 55px; left: 200px;"
			tile
		  >
			<v-list>
			  <v-subheader>TASK NAME</v-subheader>
			  <v-list-item-group color="primary">
				<v-list-item @click="editable = true">
				  <v-list-item-icon>
					<v-icon>mdi-alarm</v-icon>
				  </v-list-item-icon>
				  <v-list-item-content>
					<v-list-item-title class="display-1">
						<v-text-field
							v-if="editable"
							solo-inverted
							flat
							v-model="title"
						  ></v-text-field>
						<div v-else class="display-1">{{ title }}</div>
					</v-list-item-title>
					<v-list-item-subtitle>{{ min }}:{{ sec }}:{{ ms }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			  </v-list-item-group>
			</v-list>
		  </v-card>
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
	
	<!--
	<v-card
      elevation="12"
      width="256"
    >
		<v-navigation-drawer
		  fixed
		  right
		  app
		  floating
		  permanent
		  color="grey lighten-4"
		>
		  
		  <v-list>
				<v-list-item
				  v-for="item in items.filter(i => i.text)"
				  :key="item.text"
				  link
				>
				  <v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				  </v-list-item-icon>

				  <v-list-item-content>
					<v-list-item-title>{{ item.text }}</v-list-item-title>
				  </v-list-item-content>
				</v-list-item>
			  </v-list>
		</v-navigation-drawer>
	</v-card>
	-->
	
	<!--
	<v-card
    width="256"
	  >
		<v-navigation-drawer
		  class="deep-purple accent-4"
		  v-model="drawer2"
		  app
		  dark
		  clipped
		  absolute
		  permanent
		  right
		>
			<template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
	  
	  <v-divider></v-divider>
	  
		  <v-list>
			<v-list-item
			  v-for="item in items.filter(i => i.text)"
			  :key="item.text"
			  link
			>
			  <v-list-item-icon>
				<v-icon>{{ item.icon }}</v-icon>
			  </v-list-item-icon>

			  <v-list-item-content>
				<v-list-item-title>{{ item.text }}</v-list-item-title>
			  </v-list-item-content>
			</v-list-item>
		  </v-list>

		  <template v-slot:append>
			<div class="pa-2">
			  <v-btn block>Logout</v-btn>
			</div>
		  </template>
		</v-navigation-drawer>
	  </v-card>
	  -->

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
            <v-tooltip v-if="timer === 0" top>
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
				
				<v-btn v-if="timer === 0 && (time.min + time.sec) > 0" small class="ml-5" @click.prevent="reset">Reset</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
	  
	  <v-container
        fluid
        class="grey lighten-4"
      >
	  <v-card
				max-width="600"
				class="mx-auto"
			  >
				<h2>{{ title }}</h2>
			  </v-card>
			  </v-container>
    </v-content>
  </v-app>
</template>

<script>
const STORAGE = localStorage;
const ITEM_KEY = 'TIME';

export default {
data: () => ({

title: 'Title',

editable: false,

autoSaveDelay: 1000,

timer: 0,

time: {
	min: 0,
	sec: 0,
	ms: 0,
},
  drawer: null,
  drawer2: null,
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
	
	reset() {
		this.time = {
			min: 0,
			sec: 0,
			ms: 0,
		};
		
		STORAGE.clear();
	},
},
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>