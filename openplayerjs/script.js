var player = new OpenPlayerJS('video', {
	ads: {
		src: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
	},
});

function newPlayer() {
	player.destroy();
	player = new OpenPlayerJS('video');
	player.src = { type: 'video/x-youtube', src: 'https://www.youtube.com/watch?v=xcJtL7QggTI'};
	player.init();
}

player.getElement().addEventListener('adsskipped', function(e) {
	newPlayer();
});

player.getElement().addEventListener('adscomplete', function(e) {
	newPlayer();
});

player.init();