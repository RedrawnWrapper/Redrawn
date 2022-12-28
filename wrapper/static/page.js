const sessions = require('../data/sessions');
const fUtil = require('../fileUtil');
const stuff = require('./info');
const movie = require('../movie/main'), list = movie.loadRows();
const date = new Date(), year = date.getFullYear();

function toAttrString(table) {
	return typeof (table) == 'object' ? Object.keys(table).filter(key => table[key] !== null).map(key =>
		`${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join('&') : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(' ');
}
function toObjectString(attrs, params) {
	return `<object id="obj" ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(' ')}>${toParamString(params)}</object>`;
}

module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const query = url.query;

	var attrs, params, title;
	var html = false;
	switch (url.pathname) {
		case '/cc': {
			title = 'Character Creator';
			attrs = {
				data: process.env.SWF_URL + '/cc.swf', // data: 'cc.swf',
				type: 'application/x-shockwave-flash', 
				id: 'char_creator', 
				width: '960', 
				height: '600', 
				style:'display:block;margin-left:auto;margin-right:auto;',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'storePath': process.env.STORE_URL + '/<store>',
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'original_asset_id': query['id'] || null,
					'themeId': 'family', 'ut': 60, 'bs': 'adam', 'appCode': 'go', 'page': '', 'siteId': 'go',
					'm_mode': 'school', 'isLogin': 'Y', 'isEmbed': 1, 'ctc': 'go', 'tlang': 'en_US',
				},
				allowScriptAccess: 'always',
				movie: process.env.SWF_URL + '/cc.swf', // 'http://localhost/cc.swf'
			};
			break;
		}
		
		case "/cc_browser": {
			title = "CC Browser";
			attrs = {
				data: process.env.SWF_URL + "/cc_browser.swf", // data: 'cc_browser.swf',
				type: "application/x-shockwave-flash",
				id: "char_creator",
				width: '100%', 
				height: '600', 
				style:'display:block;margin-left:auto;margin-right:auto;',
			};
			params = {
				flashvars: {
					apiserver: "/",
					storePath: process.env.STORE_URL + "/<store>",
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
					original_asset_id: query["id"] || null,
					themeId: "family",
					ut: 60,
					appCode: "go",
					page: "",
					siteId: "go",
					m_mode: "school",
					isLogin: "Y",
                                        retut: 1,
                                        goteam_draft_only: 1,
					isEmbed: 1,
					ctc: "go",
					tlang: "en_US",
					lid: 13,
				},
				allowScriptAccess: "always",
				movie: process.env.SWF_URL + "/cc_browser.swf", // 'http://localhost/cc_browser.swf'
			};
			break;
		}

		case '/go_full': {
			let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			title = 'Video Editor';
			attrs = {
				data: process.env.SWF_URL + '/go_full.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'storePath': process.env.STORE_URL + '/<store>', 'isEmbed': 1, 'ctc': 'go',
					'ut': 60, 'bs': 'default', 'appCode': 'go', 'page': '', 'siteId': 'go', 'lid': 13, 'isLogin': 'Y', 'retut': 1,
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'themeId': 'business', 'tlang': 'en_US',
					'presaveId': presave, 'goteam_draft_only': 1, 'isWide': 1, 'nextUrl': '/pages/html/list.html',
				},
				allowScriptAccess: 'always',
			};
			sessions.set({ movieId: presave }, req);
			break;
		}

		case '/player': {
			title = 'Video Player';
			attrs = {
				data: process.env.SWF_URL + '/player.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'storePath': process.env.STORE_URL + '/<store>', 'ut': 60,
					'autostart': 1, 'isWide': 1, 'clientThemePath': process.env.CLIENT_URL + '/<client_theme>',
				},
				allowScriptAccess: 'always',
				allowFullScreen: 'true',
			};
			break;
		}
			
		case '/home': {
			html = `<!DOCTYPE html>
	<html>
	<head>
	
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<link rel="dns-prefetch" href="//josephanimate2021.github.io/">
	
	<title>Home - Redrawn</title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<meta name="description" content="Make your own animation quickly and economically with GoAnimate. Reach prospects and customers with animated videos online about your business and products.">
	<meta property="og:site_name" content="GoAnimate">
	<meta property="fb:app_id" content="177116303202">
	
	<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">
	
	<link rel="canonical" href="/app/home">
	<link rel="alternate" href="http://feeds.feedburner.com/GoAnimate" type="application/rss+xml" title="GoAnimate Blog">
	<link rel="alternate" href="http://feeds.feedburner.com/GoAnimate/WhatsNew" type="application/rss+xml" title="GoAnimate - Recently Released Content">
	<link rel="alternate" href="http://feeds.feedburner.com/GoAnimate/MostWatched" type="application/rss+xml" title="GoAnimate - Most Watched">
	<link href="https://josephanimate2021.github.io/RedrawnDownload/static/a0cbfe8e1f619bcc/go/css/common_combined.css" rel="stylesheet" type="text/css">
	<link href="https://josephanimate2021.github.io/RedrawnDownload/static/a0cbfe8e1f619bcc/go/css/site_responsive.css" rel="stylesheet" type="text/css">
	
	<link href="https://josephanimate2021.github.io/RedrawnDownload/static/a0cbfe8e1f619bcc/go/css/business_video/home.css" rel="stylesheet" type="text/css">
	<!--[if lt IE 9]>
	<style text="text/css">
	.top-nav.collapse {height: auto;overflow: visible;}
	</style>
	<![endif]-->
	
	<script>
	var srv_tz_os = -5, view_name = "go", user_cookie_name = "u_info";
	</script>
	
	<script src="https://josephanimate2021.github.io/RedrawnDownload/static/a0cbfe8e1f619bcc/go/js/common_combined.js"></script>
	<script type="text/javascript" src="https://josephanimate2021.github.io/RedrawnDownload/static/a0cbfe8e1f619bcc/go/po/goserver_js-en_US.json"></script>
	<script type="text/javascript">
	var I18N_LANG = 'en_US';
	var GT = new Gettext({'locale_data': json_locale_data});
	</script>
	
	<script src="https://josephanimate2021.github.io/RedrawnDownload/static/a0cbfe8e1f619bcc/go/js/jquery/jquery.waypoints2.min.js"></script>
	
	
	<script type="text/javascript" src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script>
	
	<!-- Google Analytics -->
	<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-2516970-1']);
	_gaq.push(['_setDomainName', 'none']);
	_gaq.push(['_trackPageview']);
	(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	
	ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
	
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	</script>
	
	<!-- GoAnimate_Footer_ROS_Bottom_960x284 -->
	<script type="text/javascript" src="http://partner.googleadservices.com/gampad/google_service.js">
	</script>
	<script type="text/javascript">
	GS_googleAddAdSenseService("ca-pub-9090384317741239");
	GS_googleEnableAllServices();
	</script>
	<script type="text/javascript">
	GA_googleAddAttr("is_login", "no");
	GA_googleAddAttr("is_plus", "no");
	GA_googleAddAttr("is_creator", "no");
	</script>
	<script type="text/javascript">
	GA_googleAddSlot("ca-pub-9090384317741239", "GoAnimate_Footer_ROS_Bottom_960x284");
	</script>
	<script type="text/javascript">
	GA_googleFetchAds();
	</script>
	<!-- GoAnimate_Footer_ROS_Bottom_960x284 -->
	
	
	<link href="https://plus.google.com/+goanimate" rel="publisher">
	
	</head>
	<body class="en_US">
	<script type="text/javascript">
	if (self !== top) {
				jQuery('body').hide();
		}
	</script>
	<div id="fb-root"></div>
	<script type="text/javascript">
	  window.fbAsyncInit = function() {
		FB.init({appId: '177116303202', cookie: true, status: true, xfbml: true});
		jQuery(document).ready(function() {
		  jQuery(document).trigger('facebook.init');
		});
	  };
	  (function() {
		var e = document.createElement('script'); e.async = true;
		e.src = document.location.protocol +
		  '//connect.facebook.net/en_US/all.js';
		document.getElementById('fb-root').appendChild(e);
	  }());
	</script>
	
	<script type="text/javascript">
	  var _kmq = _kmq || [];
	  var _kmk = _kmk || 'd6e9ca5d19bda4afea55a1493af00d0b98c26240';
	  function _kms(u){
		setTimeout(function(){
		  var d = document, f = d.getElementsByTagName('script')[0],
		  s = d.createElement('script');
		  s.type = 'text/javascript'; s.async = true; s.src = u;
		  f.parentNode.insertBefore(s, f);
		}, 1);
	  }
	  _kms('//i.kissmetrics.com/i.js');
	  _kms('//doug1izaerwt3.cloudfront.net/' + _kmk + '.1.js');
	</script>
	
	<script type="text/javascript">
			jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/web.archive.org\/web\/20141204150401\/http:\/\/lightspeed.goanimate.com\/animation\/ad1b4b02721506d6\/actionshop.swf","apiserver":"https:\/\/web.archive.org\/web\/20141204150401\/http:\/\/goanimate.com\/","clientThemePath":"https:\/\/web.archive.org\/web\/20141204150401\/http:\/\/lightspeed.goanimate.com\/static\/a0cbfe8e1f619bcc\/<client_theme>","userId":""});
	</script>
	
	<div class="page-container">
	
	<!-- HEADER -->
	<div class="site-header">
		<div class="container site-header-inside clearfix">
			<a class="site-logo" href="/app/home" title="Redrawn">
				<img alt="Make a Video With Redrawn" src="https://camo.githubusercontent.com/4c449c82f308df989f508882c88ea1f2bd6aa41b8257a362e367ec9dc0199bf8/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3935393938363335383437333038343938382f3936303031373436333630373730313532352f53696e5f746974756c6f2d312e706e67">
			</a>
	
			<button type="button" class="top-nav-toggle" data-toggle="collapse" data-target="#top-nav">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
	
				<ul id="top-nav" class="top-nav collapse">
					<li><a id="upload_movie">Upload A Movie</a></li>
					<li><a href="/recorder">Anistick Recorder</a></li>
					<li class="dropdown">
						<a class="dropdown-toggle" href="/html/list.html" data-toggle="dropdown">Explore <span class="caret"></span></a>
						<ul class="dropdown-menu">
							<li><a href="https://raw.githubusercontent.com/RedrawnWrapper/Redrawn/main/changelog.md?token=GHSAT0AAAAAABT2BKZIAW7G2UINSYE3V4FAYTNYLRQ">Update Log</a></li>
							<li><a href="https://youtube.com/@josephanimate">Joseph's YouTube Channel</a></li>
							<li><a href="/html/list.html">Your Videos</a></li>
							<li><a href="https://raw.githubusercontent.com/RedrawnWrapper/Redrawn/main/faq.md?token=GHSAT0AAAAAABT2BKZIXY6CE6Y3JEHLK6LEYTNYMSQ">FAQ</a></li>
						</ul>
					</li>
					<li>
						<a class="bright" href="/app/cc?themeId=family&bs=adam">Create A Character</a>
					</li>
					<li class="top-nav-vm-btn">
						<span><a class="btn btn-blue" href="/app/go_full?tray=custom">Make a Video</a></span>
					</li>
				</ul>
	
		</div>
	</div>
	
	<!-- END OF HEADER -->
	
		<div class="hp-main">
			<div class="to-features"><a href="#features"><span class="arrow">Features</span></a></div>
			<div class="home">
				<div class="container">
					<div class="home-content">
					    <h1>A new LVM for GoAnimators...<small>Making GoAnimate simple, quick, and enjoyable.</small></h1>
					</div>
				</div>
			</div>
		</div>
	
		<div class="features" id="features">
            <div class="container">
                <h2>No Headaches, No Problems</h2>
                <div class="row">
                    <div class="span4 feature">
                        <img src="https://josephanimate2021.github.io/static/477/go/img/business_video/home/video-equipment.png" alt="Video Equipment">
                        <h3>Get started right away</h3>
                        <p>You just need flash, a browser, and Node.JS. A few clicks to run Redrawn.</p>
                    </div>
                    <div class="span4 feature">
                        <img src="https://josephanimate2021.github.io/static/477/go/img/business_video/home/team-and-budget.png" alt="Team and Budget">
                        <h3>Turn Ideas Into Videos</h3>
                        <p>Redrawn is created for people who want to turn their ideas into a real thing without issues.</p>
                    </div>
                    <div class="span4 feature">
                        <img src="https://josephanimate2021.github.io/static/477/go/img/business_video/home/animated-video.png" alt="Animated Video">
                        <h3>Free and Open Source</h3>
                        <p>Redrawn is free to contribute, download, or modify. We enjoy people using our LVM!</p>
                    </div>
                </div>
            </div>
        </div>
	
	
		<div class="sample-videos">
        <div class="container">
            <h2>Your Videos</h2>
            <div class="videos-container clearfix">${list.map(v => v.html)}</div>
			<p>Note: Your videos might not always update live here unless you restart localhost. so it's best if your view your videos in the <a href="/html/list.html">Video List</a>.</p>
        </div><form style="display:none" enctype='multipart/form-data' action='/upload_movie' method='post'>
		<input id='movie' type="file" onchange="this.form.submit()" name='import' accept=".xml" />
	</form>
        <!-- Video player container -->
        <div class="modal video-modal hide" id="sample-video-modal">
            <button class="close" data-dismiss="modal">&#215;</button>
            <div class="video-modal-content" id="sample-video-player"></div>
        </div></div>
	
		<div class="plans">
			<div class="container">
				<span>Green light your video</span>
	
				<a class="btn btn-large btn-orange" href="/app/go_full?tray=custom">Make A Video</a>
				<a class="btn btn-large btn-dark" href="/app/cc?themeId=family&bs=adam">Create A Character</a>
			</div>
		</div>
	
	<script charset="ISO-8859-1" src="http://fast.wistia.com/static/concat/E-v1.js"></script>
	<script charset="ISO-8859-1" src="http://fast.wistia.com/embed/medias/b9wtido8pl/metadata.js"></script>
	<script>
	$('.video-holder').click(function(e) {
		e.preventDefault();
		var src = $(this).data('video');
		if (!src) return;
		$('#sample-video-modal').modal({keyboard: true, backdrop: true}).on('hidden', function() {
			$('#sample-video-player').empty();
		});
		var player = $('<iframe width="800" height="450" frameborder="0" allowfullscreen></iframe>').attr('src', src);
		$('#sample-video-player').empty().append(player);
	})
	</script>
	
	
	<script type="text/javascript">
	setTimeout(function(){var a=document.createElement("script");
	var b=document.getElementsByTagName("script")[0];
	a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0017/4526.js?"+Math.floor(new Date().getTime()/3600000);
	a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
	</script><script>$('#upload_movie').click(function() { document.getElementById("movie").click(); })</script>
	
	<!-- FOOTER -->
	
	<div class="site-footer">
		<div class="container clearfix">
	
			<div class="site-footer-nav clearfix">
				<div class="col" style="border-left: none;">
					<h5><span>About Redrawn</span></h5>
					<ul>
						<li><a href="https://github.com/RedrawnWrapper/Redrawn">Who we are</a></li>
						<li><a href="https://discord.gg/BYaM76Arhx">Discord</a></li>
						<li><a href="https://raw.githubusercontent.com/RedrawnWrapper/Redrawn/main/changelog.md?token=GHSAT0AAAAAABT2BKZIAW7G2UINSYE3V4FAYTNYLRQ">Update Log</a></li>
						<li><a href="/html/list.html">Your Videos</a></li>
					</ul>
				</div>
				<div class="col">
					<h5><span>GoAnimate Solutions</span></h5>
					<ul>
						<li><a href="https://youtube.com/@josephanimate">Joseph's Channel</a></li>
						<li><a href="https://discord.io/goanimate4schools" target="_blank">Joseph's Discord Server</a></li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
					</ul>
				</div>
				<div class="col">
					<h5><span>Usage Guidelines</span></h5>
					<ul>
					    <li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
					</ul>
				</div>
				<div class="col" style="border-right: none;">
					<h5>Getting Help</h5>
					<ul>
						<li><a href="https://raw.githubusercontent.com/RedrawnWrapper/Redrawn/main/faq.md?token=GHSAT0AAAAAABT2BKZIXY6CE6Y3JEHLK6LEYTNYMSQ">FAQ</a></li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
						<li class="dummy">&nbsp;</li>
					</ul>
				</div>
			</div>
			<hr>
	
	
			<div class="clearfix">
				<div class="site-footer-socials-container">
					Follow us on:
					<ul class="site-footer-socials clearfix">
						<li><a class="youtube" href="http://www.youtube.com/@redrawnwrapper">YouTube</a></li>
					</ul>
				</div>
				<div class="site-footer-copyright">
					&nbsp;&nbsp;&nbsp;
					Redrawn &copy; ${year}
				</div>
			</div>
		</div>
	</div>
	
	
	<div id="studio_container" style="display: none;">
		<div id="studio_holder"><!-- Full Screen Studio -->
			<div style="top: 50%; position: relative;">
				This content requires the Clean Flash Player 34. <a href="https://gitlab.com/cleanflash/installer/-/releases">Get Flash</a>
			</div>
		</div>
	</div>
	
	</div>
	<!-- END OF PAGE STRUCTURE -->
	
	</body>
	</html>`;
			break;
		}
			
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	res.end(!html ? `<head>
		<script>
			document.title='${title} - Redrawn',flashvars=${JSON.stringify(params.flashvars)}
		</script>
		<script>
			if(window.location.pathname == '/player' || window.location.pathname == '/go_full') {
				function hideHeader() {
					document.getElementById("header").style.display = "none";
				}
			}
		</script>
		<link rel="stylesheet" type="text/css" href="/pages/css/modern-normalize.css">
		<link rel="stylesheet" type="text/css" href="/pages/css/global.css">
		<style>
			body {
				background: #eee;
			}
		</style>
	</head>
	
	<header id="header">
		<a href="/">
			<h1 style="margin:0"><img id="logo" src="/pages/img/list_logo.png" alt="Wrapper: Offline"/></h1>
		</a>
		<nav id="headbuttons">
			<div class="dropdown_contain button_small">
				<div class="dropdown_button upload_button">UPLOAD</div>
				<nav class="dropdown_menu">
					<a onclick="document.getElementById('file').click()">Movie</a>
					<a onclick="document.getElementById('file2').click()">Character</a>
				</nav>
			</div>	
			<div class="dropdown_contain button_small">
				<div class="dropdown_button">CREATE A CHARACTER</div>
				<nav class="dropdown_menu">
					<h2>Comedy World</h2>
					<a href="/cc?themeId=family&bs=adam">Guy (Adam)</a>
					<a href="/cc?themeId=family&bs=eve">Girl (Eve)</a>
					<a href="/cc?themeId=family&bs=bob">Fat (Bob)</a>
					<a href="/cc?themeId=family&bs=rocky">Buff (Rocky)</a>
					<hr />
					<h2>Anime</h2>
					<a href="/cc?themeId=anime&bs=guy">Guy</a>
					<a href="/cc?themeId=anime&bs=girl">Girl</a>
					<a href="/cc?themeId=ninjaanime&bs=guy">Guy (Ninja)</a>
					<a href="/cc?themeId=ninjaanime&bs=girl">Girl (Ninja)</a>
					<hr />
					<h2>Peepz</h2>
					<a href="/cc?themeId=cc2&bs=default">Lil Peepz</a>
					<a href="/cc?themeId=chibi&bs=default">Chibi Peepz</a>
					<a href="/cc?themeId=ninja&bs=default">Chibi Ninjas</a>
				</nav>
			</div>
			<div class="dropdown_contain button_small">
				<div class="dropdown_button">BROWSE CHARACTERS</div>
				<nav class="dropdown_menu">
					<h2>Comedy World</h2>
					<a href="/cc_browser?themeId=family">Comedy World</a>
					<hr />
					<h2>Anime</h2>
					<a href="/cc_browser?themeId=anime">Anime</a>
					<a href="/cc_browser?themeId=ninjaanime">Ninja Anime</a>
					<hr />
					<h2>Peepz</h2>
					<a href="/cc_browser?themeId=cc2">Lil' Peepz</a>
					<a href="/cc_browser?themeId=chibi">Chibi Peepz</a>
					<a href="/cc_browser?themeId=ninja">Chibi Ninjas</a>
				</nav>
			</div>
			<a href="/go_full" class="button_big">MAKE A VIDEO</a>
		</nav>
	</header>
	
	<body style="margin:0px" onload="hideHeader()">${toObjectString(attrs, params)
		}</body>${stuff.pages[url.pathname] || ''}
		
        <form style="display:none" enctype='multipart/form-data' action='/upload_movie' method='post'>
	         <input id='file' type="file" onchange="this.form.submit()" name='import' />
        </form>
        <form style="display:none" enctype='multipart/form-data' action='/upload_character' method='post'>
	         <input id='file2' type="file" onchange="this.form.submit()" name='import' />
        </form><footer>
	

	<nav id="foot-left">
		<a href="http://localhost:4343">Home</a>
	</nav><nav id="foot-right">
		<a>vRedrawn &copy; ${year}</a>
	</nav></footer>` : html);
	return true;
}
