const player = new OpenPlayerJS('video', {
	ads: {
		src: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
	},
});

function newPlayer() {
	const player2 = new OpenPlayerJS('video');
	player2.src = { type: 'video/x-youtube', src: 'https://www.youtube.com/watch?v=xcJtL7QggTI'};
	player2.init();
	console.log('player2', player2);
}

player.getElement().addEventListener('adsskipped', function(e) {
	console.log('adsskipped', e);
	newPlayer();
});

player.getElement().addEventListener('adscomplete', function(e) {
	console.log('adscomplete', e);
	newPlayer();
});

player.init();