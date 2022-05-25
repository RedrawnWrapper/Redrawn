const sessions = require('../data/sessions');
const fUtil = require('../fileUtil');
const stuff = require('./info');

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

	var attrs, params, server, ut, redirectUrl;
	if (process.env.DEBUG_MODE == "Y") {
		ut = "60";
	} else {
		ut = "23";
	}
	if (process.env.OFFLINE_SERVER == "Y") {
		server = "https://localhost:4664";
		redirectUrl = "https://localhost:8043/player?movieId=";
	} else {
		server = "https://josephanimate2021.github.io";
		redirectUrl = `${server}/lvm-static/offline-player?movieId=`;
	}
	switch (url.pathname) {
		case '/videomaker/full/editcheck/': {
                        let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			attrs = {
				data: process.env.SWF_URL + '/go_full.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'storePath': process.env.STORE_URL + '/<store>', 'isEmbed': 1, 'ctc': 'go',
					'ut': ut, 'bs': 'default', 'appCode': 'go', 'page': '', 'siteId': 'go', 'lid': 13, 'isLogin': 'Y', 'retut': 1,
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'themeId': 'business', 'tray': 'business', 'tlang': 'en_US',
					'presaveId': presave, 'goteam_draft_only': 1, 'isWide': 1, 'animationPath': process.env.SWF_URL + '/',
					'movieId': '',
				},
				allowScriptAccess: 'always',
			};
			sessions.set({ movieId: presave }, req);
			break;
                }
		case '/videomaker/full/': {
			let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			attrs = {
				data: process.env.SWF_URL + '/go_full.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': '/', 'storePath': process.env.STORE_URL + '/<store>', 'isEmbed': 1, 'ctc': 'go',
					'ut': ut, 'bs': 'default', 'appCode': 'go', 'page': '', 'siteId': 'go', 'lid': 13, 'isLogin': 'Y', 'retut': 1,
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'themeId': 'business', 'tlang': 'en_US',
					'presaveId': presave, 'goteam_draft_only': 1, 'isWide': 1, 'movieId': '',
					'animationPath': process.env.SWF_URL + '/',
				},
				allowScriptAccess: 'always',
			};
			sessions.set({ movieId: presave }, req);
			break;
		}

		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	if (url.pathname == "/yourvideos") {
		res.end(`${stuff.pages[url.pathname] || ""}`);
	} else {
		res.end(`<html><head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="dns-prefetch" href="https://d2bm7x1jqouzel.cloudfront.net">
<link rel="dns-prefetch" href="//d3v4eglovri8yt.cloudfront.net">

<title>The Video Maker from Vyond - Make a Video for YouTube!</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="description" content="The Video Maker lets You make a video for YouTube for free! Drag &amp; drop or type &amp; go.  It's Fast, Fun, Easy and Free -  Vyond!">
<meta property="og:site_name" content="Vyond">
<meta property="fb:app_id" content="177116303202">

<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">


<link href="https://josephanimate2021.github.io/fonts/1/sailec.css" rel="stylesheet" type="text/css">
<link href="${server}/static/55910a7cd204c37c/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">

<link href="${server}/static/55910a7cd204c37c/go/css/studio.css.gz.css" rel="stylesheet" type="text/css">
<link href="${server}/static/55910a7cd204c37c/go/css/video_voice_vendor.css.gz.css" rel="stylesheet" type="text/css">
<link href="${server}/static/55910a7cd204c37c/go/css/worknote.css.gz.css" rel="stylesheet" type="text/css">
<link href="${server}/static/55910a7cd204c37c/go/css/importer.css.gz.css" rel="stylesheet" type="text/css">
<link href="${server}/static/55910a7cd204c37c/go/css/importer_share.css.gz.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
<style text="text/css">
.top-nav.collapse {height: auto;overflow: visible;}
</style>
<![endif]-->

<script type="text/javascript" src="https://pi.pardot.com/pd.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/155/munchkin.js"></script><script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script><script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script><script async="" src="//connect.facebook.net/en_US/fbevents.js"></script><script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script><script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script><script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script><script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script><script>
var srv_tz_os = -5, view_name = "go", user_cookie_name = "u_info";
var user_role = 9;
</script>

<script src="${server}/static/55910a7cd204c37c/go/js/jquery/jquery-1.11.0.min.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/bootstrap3/bootstrap.min.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/bootstrap3/bootstrap-switch.min.js.gz.js"></script>

<script src="${server}/static/55910a7cd204c37c/go/js/go2.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/jquery/jquery.swfobject.min.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/jquery/jquery.blockUI-2.66.0.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/jquery/jquery.scrollTo.min.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/app.js.gz.js"></script>

<script src="${server}/static/55910a7cd204c37c/go/js/cookie.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/Gettext.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/email.js.gz.js"></script>

<script type="text/javascript" src="${server}/static/55910a7cd204c37cc/go/js/../po/goserver_js-en_US.json.gz.json"></script>
<script type="text/javascript">
var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>

<script src="${server}/static/55910a7cd204c37c/go/js/movie.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/cookie.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/studio.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/jquery/jquery.tmpl.min.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/lib/pako.min.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/amplitude/go_amp.js.gz.js"></script>

<!-- Vyond Cookie Consent -->
<script>(function(v,y,o,n){v[n]=v[n]||[];
var f=y.getElementsByTagName(o)[0],d=y.createElement(o);
d.type='text/javascript';d.async=true;d.src=
'https://ga.vyond.com/ajax/cookie_policy';
f.parentNode.insertBefore(d,f);
})(window,document,'script','_vyccq');</script>
<!-- End Vyond Cookie Consent -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV7MD');

dataLayer.push({"userId":"0cf4CMw1ZNCk"});
</script>
<!-- Google Tag Manager -->

<script>

</script>


        <script src="${server}/static/55910a7cd204c37c/go/js/h5preview/media-controller.js.gz.js"></script>
        <script src="${server}/static/55910a7cd204c37c/go/js/h5preview/preview-player.js.gz.js"></script>

<script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script><script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1576454337808&amp;cv=9&amp;fst=1576454337808&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=900&amp;u_w=1600&amp;u_ah=870&amp;u_aw=1600&amp;u_cd=24&amp;u_his=7&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fga.vyond.com%2Fvideomaker%2Ffull%2Fbusiness-friendly&amp;ref=https%3A%2F%2Fga.vyond.com%2Fvideomaker&amp;tiba=The%20Video%20Maker%20from%20Vyond%20-%20Make%20a%20Video%20for%20YouTube!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script><script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script></head>
<body class="en_US has-user full_screen_studio studio-locked" style="">
<script type="text/javascript">
if (self !== top) {
            jQuery('body').hide();
    }
</script>

<!-- Google Tag Manager (noscript) -->
<noscript>&lt;iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXV7MD"
height="0" width="0" style="display:none;visibility:hidden"&gt;&lt;/iframe&gt;</noscript>
<!-- End Google Tag Manager (noscript) -->

<script type="text/javascript">
        jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/d3v4eglovri8yt.cloudfront.net\/animation\/66453a3ba2cc5e1b\/actionshop.swf","apiserver":"http:\/\/ga.vyond.com\/","clientThemePath":"https:\/\/d3v4eglovri8yt.cloudfront.net\/static\/019b83797158fc0c\/<client_theme>","userId":"0cf4CMw1ZNCk"});
</script>

<div class="page-container">


<!-- END OF HEADER -->

<div style="position:relative;">
    <div id="studioBlock" style="height: 0px;"><!-- --></div>

    <div id="playerBlock"></div>

    <div style="display: none;">
    <div class="templates">
        <div class="studiotemplatebrowser">
            <div class="close"><a href="javascript:hideCCWidget()" onclick="javascript:return hideCCWidget()">X</a></div>
            <h1>Latest Releases</h1>
            <div class="thumbcontainer">
                <!-- All thumbcells here -->
            </div>
            <div class="more">
                <a href="#">More Characters &gt;</a>
            </div>
        </div>
        <div class="thumbcell">
            <a href="" class="buttonlink">
                <span class="button">
                    <span class="buynow">Buy now</span><br>
                    <span class="bucks">%d GoBucks</span>
                </span>
            </a>
            <p class="gotit">Got It!</p>
        </div>
    </div>
</div>
    <div class="templates" style="display: none;">
    <div class="voice-vendor-ad" style="display: none;">
        <div class="close"><a href="javascript:hideVoiceAdWidget()" onclick="javascript:return hideVoiceAdWidget()">×</a></div>
        <div id="studio-voice-vendor-container">
            <ul>
                <li><a class="gtm-ga-pageview-t2" id="voice-vendor-vb" target="_blank" href="https://voicebunny.com/?p=vyond" data-gtmv-page="/pageTracker/voicebanner/VoiceBunny" onclick="setvoicebannercookie();"><img src="${server}/static/55910a7cd204c37c/go/img/video_voice/btn_vb.png"></a></li>
                <li><a class="gtm-ga-pageview-t2" id="voice-vendor-iw" target="_blank" href="https://www.inwhatlanguage.com/goanimate-translations/" data-gtmv-page="/pageTracker/voicebanner/InWhatLanguage" onclick="setvoicebannercookie();"><img src="${server}/static/55910a7cd204c37c/go/img/video_voice/btn_iw.png"></a></li>
                <li>
                    <hr class="sperator">
                    <a class="voiceover-tips gtm-ga-pageview-t2" target="_blank" href="http://goanimate.com/video-maker-tips/tutorial-why-you-should-break-up-your-dialogue-audio-into-small-pieces-before-importing/" data-gtmv-page="/pageTracker/voicebanner/VoiceoverTips" onclick="setvoicebannercookie();"><span><i class="lightbulb"></i>Voiceover Tips &gt;</span></a>
                </li>
            </ul>
        </div>
    </div>
</div>
<script type="text/javascript">
function setvoicebannercookie() { SetCookie('vbcdt','1576454336', 31, '/'); }
function voiceBanner(bannerId) {
    var banner = $('#voice-vendor-' + bannerId);
    if (banner.length) {
        banner.click();

        window.open(banner.attr('href'), '_blank');
    }
}
</script>

    <div id="previewPlayerContainer" style="display: none;">
        <div class="preview-player" id="previewPlayer">
            <h2>Preview Video</h2>
            <div id="playerdiv"></div>
            <div id="h5-playerdiv">
                <video class="hidden" id="h5-preview-player" width="100%" height="100%"></video>
                <div class="player-overlay loading">
                    <div class="loading-icon">
                        <div class="loading-message"></div>
                    </div>
                    <div class="replay-button"></div>
                </div>
                <div class="video-controls">
                    <div class="playback-button">
                        <div class="icon-image"></div>
                    </div>
                    <div class="seek-bar">
                        <div class="value-bar total-bar"></div>
                        <div class="value-bar buffered-bar"></div>
                        <div class="value-bar played-bar"></div>
                        <div class="slider-thumb"></div>
                        <div class="time-tooltip">00:00</div>
                    </div>
                    <div class="time-display">
                        <div class="text">00:00 / 00:00</div>
                    </div>
                    <div class="volume-control">
                        <div class="volume-icon">
                            <div class="icon-image"></div>
                        </div>
                        <div class="volume-slider">
                            <div class="slider-track">
                                <div class="track-value-bar"></div>
                            </div>
                            <div class="slider-thumb"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="preview-alert-block" class="preview-alert-block clearfix">Auto-pause at end of scenes is not supported in our web video player.<br>The auto-pause feature is supported once you download the video as presentation in the "Share/Export" overlay.</div>
            <div class="buttons clearfix">
                <button class="preview-button edit" type="button" onclick="switchBackToStudio();">Back to editing</button>
                <button class="preview-button save" type="button" onclick="publishStudio();">Save Now</button>            </div>

            <a class="close_btn" href="#" onclick="switchBackToStudio(); return false;">×</a>
        </div>
    </div>

    <div class="video-tutorial" id="video-tutorial" style="display: none;">
        <div class="video-tutorial-body">
            <h2>&nbsp;</h2>
            <div class="video-tutorial-player">
                <div id="wistia_player" class="wistia_embed" style="width:860px;height:445px">&nbsp;</div>
            </div>
            <a class="close_btn" href="#" onclick="return false;">×</a>
        </div>
        <div class="video-tutorial-footer clearfix">
            <button class="tutorial-button" type="button">
                Close            </button>
        </div>
    </div>
</div>

<div style="display:none">

</div>

    <script>
    function peformANextUrlRedirect() {
    window.location = "${redirectUrl}${params.flashvars.presaveId}";
    }
        interactiveTutorial.isShowTutorial = false;

        var hideHTMLBox = function() {
            window.close();
        };

        function tutorialStarted() {
        }
        function tutorialStep(sn) {
        }
        function tutorialCompleted() {
            $.ajax({
                type: 'POST',
                url: '/ajax/tutorialStatus/completed'
            });
        }

        var enable_full_screen = true;

        var studio_data = {
            id: "Studio",
            swf: "${attrs.data}",
            width: "100%",
            height: "100%",

            align: "middle",
            allowScriptAccess: "always",
            allowFullScreen: "true",
            wmode: "window",

            hasVersion: "10.3"
        };

        if (!enable_full_screen) {
            studio_data.width  = 960;
            studio_data.height  = 630;
            resize_studio = false;
        }

        studio_data.flashvars = {"presaveId":"${params.flashvars.presaveId}","movieId":"${params.flashvars.movieId}","loadas":0,"asId":"","originalId":"","apiserver":"\/","storePath":"${params.flashvars.storePath}","clientThemePath":"${params.flashvars.clientThemePath}","animationPath":"${params.flashvars.animationPath}","userId":"0cf4CMw1ZNCk","username":"bakeryb40488","uemail":"bakeryb40488@gmail.com","numContact":"0","ut":${params.flashvars.ut},"ve":false,"isEmbed":0,"nextUrl":"javascript:peformANextUrlRedirect()","bgload":"${attrs.data}","lid":"13","ctc":"go","themeColor":"silver","tlang":"en_US","siteId":"13","templateshow":"false","forceshow":"false","appCode":"go","lang":"en","tmcc":4048901,"fb_app_url":"https:\/\/ga.vyond.com\/","is_published":"0","is_private_shared":"1","is_password_protected":false,"upl":1,"hb":"1","pts":"1","msg_index":"","ad":0,"has_asset_bg":1,"has_asset_char":0,"initcb":"studioLoaded","retut":0,"featured_categories":null,"s3base":"https:\/\/s3.amazonaws.com\/fs.goanimate.com\/,https:\/\/assets.vyond.com\/","st":"","uisa":0,"u_info":"OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ","tm":"FIN","tray":"${params.flashvars.tray}","isWide":1,"newusr":1,"goteam_draft_only":0};

        var _ccad = null;

        function proceedWithFullscreenStudio() {
            // These should be executed only when we are really ready to show the studio
            window.onbeforeunload = function(e) {
                var e = e || window.event;
                var msg = null;
                if (loadedFullscreenStudio && studioApiReady) {
                    msg = 'You are about to lose all your unsaved changes in the studio.';
                }
                if (e && msg != null) {
                    e.returnValue = msg;
                }

                if (msg != null) {
                    return msg;
                }
            };

            show_cc_ad = false;
            // CC template studio widget
            if (show_cc_ad) {
                _ccad = new CCBannerAd("business");
                (function() {
                    var ccId = undefined;
                    _ccad
                        .onBuyCCInsufficientBalance(function() {
                            $('#Studio').get(0).showBuyGoBuckPopUp();
                        })
                        .onBuyCCComplete(function(aid, trackInfo, templateId) {
                            if (trackInfo) {
                            var logger = CCStandaloneBannerAdUI.gaLogTx.createCCPartLogger(aid);
                            if (templateId) {
                                logger.setTemplateId(templateId);
                            }
                            $.grep(trackInfo.parts, function(n, i) {
                                return $.inArray(n.ctype, [ 'GoUpper', 'GoLower', 'upper_body', 'lower_body', 'hair' ]) >= 0;
                            }).each(function(n) {
                                logger.addItem(n);
                            });
                            logger.submit();
                            }

                            ccId = aid;
                            if (typeof ccId != undefined) {
                                try {
                                    $('#Studio').get(0).reloadAllCC(ccId);
                                } catch (e) {
                                }
                                ccId = undefined;
                            }
                        });
                })();
            }

            show_voice_ad = true;
            $('#studio_container').append($('div.templates div.voice-vendor-ad').clone());
            if (show_voice_ad) {
                showVoiceAdWidget();
            }


            $('div#studioBlock').css('height', '0px');
            $('#studio_holder').flash(studio_data);
            full_screen_studio();

            ajust_studio();
        }

        function hideCCWidget() {
            show_cc_ad = false;
            $('div.studiotemplatebrowser').css('display', 'none');
            var widget_right = 0;
            if (show_voice_ad) {
                $('#studio_container div.voice-vendor-ad').css('right', widget_right);
                widget_right += $('#studio_container div.voice-vendor-ad').css('width');
            }
            if (show_worknote) {
                $('#studio_container div.studio-worknote').css('right', widget_right);
            }
            ajust_studio();
            return false;
        }

        function showVoiceAdWidget() {
            show_voice_ad = true;
            $('#studio_container div.voice-vendor-ad').css('display', 'block');
            var widget_right = 0;
            if (show_cc_ad) {
                widget_right += $('div.studiotemplatebrowser').css('width');
            }
            $('#studio_container div.voice-vendor-ad').css('right', widget_right);
            widget_right += $('#studio_container div.voice-vendor-ad').css('width');
            if (show_worknote) {
                $('#studio_container div.studio-worknote').css('right', widget_right);
            }
            ajust_studio();
            return false;
        }

        function hideVoiceAdWidget() {
            show_voice_ad = false;
            $('#studio_container div.voice-vendor-ad').css('display', 'none');
            var widget_right = 0;
            if (show_cc_ad) {
                widget_right += $('div.studiotemplatebrowser').css('width');
            }
            if (show_worknote) {
                $('#studio_container div.studio-worknote').css('right', widget_right);
            }
            ajust_studio();
            return false;
        }

        function showWorknoteWidget() {
            show_worknote = true;
            $('#studio_container div.studio-worknote').css('display', 'block');
            var widget_right = 0;
            if (show_cc_ad) {
                widget_right += $('div.studiotemplatebrowser').css('width');
            }
            if (show_voice_ad) {
                widget_right += $('#studio_container div.voice-vendor-ad').css('width');
            }
            $('#studio_container div.studio-worknote').css('right', widget_right);
            ajust_studio();
            return false;
        }

        function hideWorknoteWidget() {
            show_worknote = false;
            $('#studio_container div.studio-worknote').css('display', 'none');
            ajust_studio();
            return false;
        }

        function toggleWorknoteContent() {
            $('#studio_container .studio-worknote').toggleClass('collapsed expand');
            ajust_studio();
            return false;
        }

        var studioApiReady = false;
        function studioLoaded() {
            studioApiReady = true;
            $(document).trigger('studioApiReady');
        };

        var studioWorknoteModule = null;

        var studioModule = null;

        var videoTutorial = null;

        $(document).ready(function() {
            if (enable_full_screen) {

                if (!false) {
                    $('#studio_container').css('top', '0px');
                }
                $('#studio_container').show();
                $('.site-footer').hide();
                $('#studioBlock').css('height', '1800px');

                if (false) {
                    checkCopyMovie('javascript:proceedWithFullscreenStudio()', '');
                } else if (false) {
                    checkEditMovie('');
                } else {
                    proceedWithFullscreenStudio();
                }

                $(window).on('resize', function() {
                    ajust_studio();
                });
                $(window).on('studio_resized', function() {
                    if (show_cc_ad) {
                        _ccad.refreshThumbs();
                    }
                });

                if (studioApiReady) {
                    var api = studioApi($('#studio_holder'));
                    api.bindStudioEvents();
                    studioModule = new StudioModule();
                }

                $('.ga-importer').prependTo($('#studio_container'));
            } else {
                $('#studioBlock').flash(studio_data);
            }

            // Video Tutorial
            videoTutorial = new VideoTutorial($("#video-tutorial"));
        })
        // restore studio when upsell overlay hidden
        .on('hidden.bs.modal', '#upsell-modal', function(e) {
            if ($(e.target).attr('id') == 'upsell-modal') {
                restoreStudio();
            }
        })
        .on('studioApiReady', function() {
            var api = studioApi($('#studio_holder'));
            api.bindStudioEvents();
            studioModule = new StudioModule();
        })

    var previewPlayer = new PreviewPlayer("wss://preview.vyond.com", true),
        previewPlayerRetryCount = 5;

    previewPlayer.setVideoElement(document.getElementById('h5-preview-player'));
    previewPlayer.setMovieId('');
    previewPlayer.setUserAuthenticationToken('1:760a913514c85f012a4977b79b920687c0b33a7b268c26340021d6720a6ea026:y8X5juI1C+TKXDaGsW/6CLASVlqRtMZyE2rJVx2aUzc=');
    previewPlayer.setFromPptConversion(false);
    previewPlayer.connect();

</script>
<script>
$("#previewPlayerContainer, #video-tutorial").hide();

var movieDataXmlStr = null,
    filmXmlStr = null,
    previewStartFrame = 0;

function checkBrowser() {
    return window.WebSocket && window.MediaSource;
}

function checkTheme(themeList) {
    if (themeList === undefined) {
        return true;
    }

    var themeCount = themeList.length,
        h5Themes = {
            'common' : true,
            'infographics': true,
            'business': true,
            'whiteboard': true,
            'commoncraft': true
        };

    for (var i = 0; i < themeCount; i++) {
        if (h5Themes[themeList[i]] === undefined) {
            return false;
        }
    }

    return true;
}

function checkPreviewServer() {
    return previewPlayer._connectionState === PreviewPlayerConstants.STATE_READY;
}

function loadH5Preview() {
    if (filmXmlStr === null) {
        return;
    }

    $('#h5-playerdiv').data('previewPlayerControl').reset();
    previewPlayer.preview(filmXmlStr, previewStartFrame);
    $('#previewPlayer').addClass('using-h5');
}

function loadLegacyPreview() {
    if (movieDataXmlStr === null) {
        return;
    }

    pauseH5PreviewPlayer();

    savePreviewData(movieDataXmlStr);
    createPreviewPlayer("playerdiv", {
        height: 360,
        width: 640,
        player_url: "${server}/animation/930/player.swf",
        quality: "high"
    }, {
        movieOwner: "", movieOwnerId: "", movieId: "${params.flashvars.presaveId}", ut: "-1",
        movieLid: "8", movieTitle: "", movieDesc: "", userId: "", username: "", uemail: "",
        apiserver: "/", thumbnailURL: "", copyable: "0", isPublished: "0", ctc: "go", tlang: "en_US", is_private_shared: "0",
        autostart: "1", appCode: "go", is_slideshow: "0", originalId: "0", is_emessage: "0", isEmbed: "0", refuser: "",
        utm_source: "", uid: "", isTemplate: "1", showButtons: "0", chain_mids: "", showshare: "0", averageRating: "",
                    s3base: "https://s3.amazonaws.com/fs.goanimate.com/,https://assets.vyond.com/",
                ratingCount: "", fb_app_url: "https://ga.vyond.com/", numContact: 0, isInitFromExternal: 1, storePath: "${params.flashvars.storePath}", clientThemePath: "${params.flashvars.clientThemePath}", animationPath: "${params.flashvars.animationPath}",
        startFrame: previewStartFrame
    });
    $('#previewPlayer').removeClass('using-h5');
}

function initPreviewPlayer(dataXmlStr, startFrame, containsChapter, themeList) {
    movieDataXmlStr = dataXmlStr;
    previewStartFrame = startFrame;

    filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];

    if (typeof startFrame == 'undefined') {
        startFrame = 1;
    } else {
        startFrame = Math.max(1, parseInt(startFrame));
    }

    if (containsChapter) {
        $("#preview-alert-block").show();
    } else {
        $("#preview-alert-block").hide();
    }

    previewSceen();

    $("#previewPlayerContainer").show();

    var isThemeSupport = checkTheme(themeList);

    if (checkBrowser() && isThemeSupport && checkPreviewServer()) { // Preview with next
        loadH5Preview();
    } else {
        // fallback to legacy preview
        loadLegacyPreview();

        if (!checkPreviewServer() && (previewPlayerRetryCount > 0)) { // Retry on WebSocket connection problem
            previewPlayer.connect();
            previewPlayerRetryCount--;
        }
    }
}

function pauseH5PreviewPlayer() {
    $("#h5-preview-player").get(0).pause();
}

function switchBackToStudio() {
    try {
        ($("#previewPlayerContainer #Player").get(0) || {pause:function(){}}).pause();
    } catch (err) {};

    pauseH5PreviewPlayer();

    $("#previewPlayerContainer").hide();
    restoreStudio();
    document.getElementById("Studio").onExternalPreviewPlayerCancel();
}
function publishStudio() {
    try {
        ($("#previewPlayerContainer #Player").get(0) || {pause:function(){}}).pause();
    } catch (err) {};

    pauseH5PreviewPlayer();

    $("#previewPlayerContainer").hide();
    restoreStudio();
    document.getElementById("Studio").onExternalPreviewPlayerPublish();
}
function exitStudio(share) {
    loadedFullscreenStudio = false;
    location.href = 'javascript:peformANextUrlRedirect()';
}

function studioUpsellUpgrade() {
    $('#upsell-modal').modal('hide');
    restoreStudio();
    document.getElementById("Studio").onUpsellUpgrade();
}

function customFontBanner() {
    var plansAndPricingUrl = 'https://www.vyond.com/pricing';
    window.open(plansAndPricingUrl, '_blank');
}

window.addEventListener(PreviewPlayerEvent.ANIMATION_INCOMPATIBLE, function() {
    loadLegacyPreview();
});

VideoTutorial.tutorials.composition = {
    title: 'Composition Tutorial',
    wistiaId: 'nuy96pslyp',
};
VideoTutorial.tutorials.enterexit = {
    title: 'Enter and Exit Effects Tutorial',
    wistiaId: 'fvjsa3jnzc',
}
</script>

<script id="importer-share-asset-tmpl" type="text/x-jquery-tmpl">
<li class="share-asset clearfix">
    <div class="share-asset-selection">
        <input type="checkbox" checked>
    </div>
    <div class="share-asset-icon"></div>
    <div class="share-asset-body">
        <div class="filename"></div>
        <div class="actions clearfix">
            <span class="category small"></span>
            <div class="share-type none">
                <span class="none" title="Not shared" data-placement="left"><span class="glyph-pro glyph-lock"></span></span>
                <span class="team" title="All members" data-placement="left"><span class="glyph-pro glyph-group"></span></span>
                <span class="shared" title="Custom..." data-placement="left"><span class="glyph-pro glyph-parents"></span></span>
            </div>
        </div>
    </div>
</li>
</script>

<script id="importer-file-tmpl" type="text/x-jquery-tmpl">
<li class="ga-importer-file clearfix fade">
    <div class="ga-importer-file-icon"><div class="ga-importer-file-progress-bar"><div class="upload-progress"></div></div></div>
    <div class="ga-importer-file-body">
        <div class="filename"></div>
        <div class="actions clearfix">
            <span class="menu"></span>
            <span class="category"></span>
            <a class="cancel" href="#" data-action="cancel-upload" title="Cancel">&times;</a>
            <a class="clear" href="#" data-action="clear-file" title="Clear">&times;</a>
            <a class="add-to-scene" href="#" data-action="add-to-scene">Add to scene</a>
            <a class="add-to-frame" href="#" data-action="add-to-frame">Add to frame</a>
            <span class="processing">
                <span class="processing-video">Processing. Please wait...</span>
                <span class="processing-font">Processing time: ~3 mins</span>
            </span>
            <span class="error"></span>
        </div>
    </div>
</li>
</script>

<script id="importer-select-sound-tmpl" type="text/x-jquery-tmpl">
<div class="dropdown">
<a class="import-as-btn dropdown-toggle" data-toggle="dropdown" href="#">Import as <span class="caret"></span></a>
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
    <li><a tabindex="-1" href="#" data-subtype="bgmusic">Music</a></li>
    <li><a tabindex="-1" href="#" data-subtype="soundeffect">Sound Effect</a></li>
    <li><a tabindex="-1" href="#" data-subtype="voiceover">Voice-Over</a></li>
</ul>
</div>
</script>

<script id="importer-select-prop-tmpl" type="text/x-jquery-tmpl">
<div class="dropdown">
<a class="import-as-btn dropdown-toggle" data-toggle="dropdown" href="#">Import as <span class="caret"></span></a>
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
    <li><a tabindex="-1" href="#" data-subtype="prop">Prop</a></li>
    <li><a tabindex="-1" href="#" data-subtype="bg">Backdrop</a></li>
</ul>
</div>
</script>
<script src="${server}/static/55910a7cd204c37c//go/js/importer_share.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c//go/js/importer.js.gz.js"></script>
<script>window.searchTermsDataUrl = '${server}/store/3a981f5cb2739137/common/terms.json';</script>
<script src="${server}/static/55910a7cd204c37c/go/js/search-suggestion.js.gz.js"></script>
<script src="${server}/static/55910a7cd204c37c/go/js/preview-player-control.js.gz.js"></script>
<script>
ImporterFile.defaults.options.accept_mime = ["image\/png","image\/jpeg","image\/gif","image\/bmp","audio\/mpeg","audio\/wav","audio\/x-wav","audio\/vnd.wave","audio\/wave","audio\/mp3","audio\/mp4","audio\/ogg","audio\/vorbis","audio\/aac","audio\/m4a","audio\/x-m4a","video\/mp4","video\/mpeg4","video\/x-flv","video\/x-ms-wmv","application\/mp4"];
ImporterFile.defaults.options.restricted_mime = ["font\/x-font-ttf","font\/vnd.ms-opentype"];
</script>

<script charset="ISO-8859-1" src="//fast.wistia.com/assets/external/E-v1.js" async=""></script>

<script>
    (function() {

        'use strict';

        var studioMode = 'full',
            themeName = 'business',
            copiedId = '',
            editType = null;

        switch (studioMode) {
            case 'full':
                editType = AMPLITUDE_EVENT_PROPERTIES.VM_NEW;
                break;
            case 'edit':
                editType = AMPLITUDE_EVENT_PROPERTIES.VM_EDIT;
                break;
            case 'copy':
                editType = AMPLITUDE_EVENT_PROPERTIES.VM_COPY;
                break;
            case 'remix':
                editType = AMPLITUDE_EVENT_PROPERTIES.VM_REMIX;
                break;
            default:
                break;
        }
        if (editType !== null) {
            $(window).on('amplitude_loaded', function() {
                logAmplitudeEvent(AMPLITUDE_EVENT.LAUNCH_VM, {
                    theme: themeName,
                    edit_type: editType,
                    video_id: '',
                    copied_id: copiedId
                }, {
                    latest_vm_launched: AMPLITUDE_EVENT_PROPERTIES.LEGACY_VM,
                    latest_vm_launched_legacy_date: '2019-12-15 18:58:56'
                });
            });
        }
    }());

    // Amplitude interface for Flash player.
    function logAmplitudeEvent(eventName, eventProperties, userData) {
        if (typeof amplitude === 'object') {
            if (eventName === AMPLITUDE_EVENT.PLAYS_VIDEO) {
                eventProperties["referral"] = document.referrer;
            }
            if (userData !== undefined) {
                amplitude.getInstance().setUserProperties(userData);
            }
            amplitude.getInstance().logEvent(eventName, eventProperties);
        }
    }
</script>


<!-- FOOTER -->


<div id="studio_container" style="top: 0px; width: 2238px; height: 1586px;"><div class="ga-importer">
    <div class="ga-importer-header">
        <form class="ga-importer-base-form" action="/ajax/saveUserProp" method="post">
            <a class="ga-importer-collapse" href="#" title="Collapse" onclick="hideImporter(); return false;">×</a>

            <div class="fileinputs">
                <div class="importer-button file-trigger">SELECT FILES</div>
                <input class="ga-importer-file-input" type="file" name="file" multiple="">
            </div>

            <span class="hints">
                <i class="glyph-pro glyph-circle-question_mark"></i>
                <div class="tooltip in" style="display:none;">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                        <ul>
                            <li>Maximum file size: 15MB</li>
                            <li>Images: JPG, PNG<br>To cover the whole stage in a 1080p video, use an image at least 1920px x 1080px.</li>
                            <li>Audio: MP3, WAV, M4A</li>
                            <li>Video: MP4.</li>
                            <li>Fonts: TTF, OTF (Professional only)</li>
                        </ul>
                    </div>
                </div>
            </span>

            <input type="hidden" name="subtype" value="">
        </form>
    </div>
    <div class="ga-importer-content" style="height: 1536px;">
        <div class="ga-importer-start">
            <div class="ga-importer-start-draghere">Drag files here</div>

            <div class="ga-importer-instruction general">
                <ul>
                    <li><strong>Maximum file size:</strong> 15MB</li>
                    <li><strong>Images:</strong> JPG, PNG<br>To cover the whole stage in a 1080p video, use an image at least 1920px x 1080px.</li>
                    <li><strong>Audio:</strong> MP3, WAV, M4A</li>
                    <li><strong>Video:</strong> MP4.</li>
                    <li><strong>Fonts:</strong> TTF, OTF (Professional only)</li>
                </ul>
            </div>
        </div>
        <div class="ga-importer-results">
            <div class="ga-importer-notice clearfix">
                <div class="ga-importer-notice-count">
                    Files added. <a class="open-your-library">View Library</a>
                </div>
            </div>
            <ul class="ga-importer-files"></ul>
        </div>
        <div class="ga-importer-queue-message">
            Assign a category to start importing
            <span class="hints pull-right">
                <i class="i-help"></i>
                <div class="tooltip in" style="display:none;">
                    <div class="tooltip-arrow"></div>
                    <div class="tooltip-inner">
                        <p>Imported files are categorized to simplify browsing.</p>
                        <p>Use the "IMPORT AS" drop down to see the available categories based on the format of the file you import.</p>
                    </div>
                </div>
            </span>
        </div>
        <ul class="ga-importer-queue"></ul>
    </div>
    <div class="ga-import-dnd-hint">
        Release to start uploading    </div>
</div>
    <div id="studio_holder" style="width: 2108px;"><object data="https://josephanimate2021.github.io/animation/66453a3ba2cc5e1b/go_full.swf" type="application/x-shockwave-flash" id="Studio" width="100%" height="100%"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieId=&amp;loadas=0&amp;asId=&amp;originalId=&amp;apiserver=https%3A%2F%2Fga.vyond.com%2F&amp;storePath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fstatic%2F019b83797158fc0c%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2F&amp;userId=0cf4CMw1ZNCk&amp;username=bakeryb40488&amp;uemail=bakeryb40488%40gmail.com&amp;numContact=0&amp;ut=23&amp;ve=false&amp;isEmbed=0&amp;nextUrl=%2Fgo%2FsavedMovie%2F%3CmovieId%3E%2F0%2F1&amp;bgload=https%3A%2F%2Fd3v4eglovri8yt.cloudfront.net%2Fanimation%2F66453a3ba2cc5e1b%2Fgo_full.swf&amp;lid=0&amp;ctc=go&amp;themeColor=silver&amp;tlang=en_US&amp;siteId=13&amp;templateshow=false&amp;forceshow=false&amp;appCode=go&amp;lang=en&amp;tmcc=4048901&amp;fb_app_url=https%3A%2F%2Fga.vyond.com%2F&amp;is_published=0&amp;is_private_shared=1&amp;is_password_protected=false&amp;upl=1&amp;hb=1&amp;pts=1&amp;msg_index=&amp;ad=0&amp;has_asset_bg=1&amp;has_asset_char=0&amp;initcb=studioLoaded&amp;retut=0&amp;&amp;s3base=https%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate.com%2F%2Chttps%3A%2F%2Fassets.vyond.com%2F&amp;st=&amp;uisa=0&amp;u_info=OjI6elg5SnZCOUEyTHZiY2lhZGRXTm9Nd0ljVWhNbEpGaXJFdkpEdkltdEp6RWhrQ0VIbXZIVTBjRTlhUGZKMjJoVHVTUE5vZk1XYnFtSE1vZG5TeldyQVJNcDFmUFB2NDVtR0FTSlZZ&amp;tm=FIN&amp;tray=business&amp;isWide=1&amp;newusr=1&amp;goteam_draft_only=0"><param name="movie" value="https://d3v4eglovri8yt.cloudfront.net/animation/66453a3ba2cc5e1b/go_full.swf"></object></div>
<div class="voice-vendor-ad" style="display: block; right: 0px;">
        <div class="close"><a href="javascript:hideVoiceAdWidget()" onclick="javascript:return hideVoiceAdWidget()">×</a></div>
        <div id="studio-voice-vendor-container">
            <ul>
                <li><a class="gtm-ga-pageview-t2" id="voice-vendor-vb" target="_blank" href="https://voicebunny.com/?p=vyond" data-gtmv-page="/pageTracker/voicebanner/VoiceBunny" onclick="setvoicebannercookie();"><img src="${server}/static/55910a7cd204c37c/go/img/video_voice/btn_vb.png"></a></li>
                <li><a class="gtm-ga-pageview-t2" id="voice-vendor-iw" target="_blank" href="https://www.inwhatlanguage.com/goanimate-translations/" data-gtmv-page="/pageTracker/voicebanner/InWhatLanguage" onclick="setvoicebannercookie();"><img src="${server}/static/55910a7cd204c37c/go/img/video_voice/btn_iw.png"></a></li>
                <li>
                    <hr class="sperator">
                    <a class="voiceover-tips gtm-ga-pageview-t2" target="_blank" href="http://goanimate.com/video-maker-tips/tutorial-why-you-should-break-up-your-dialogue-audio-into-small-pieces-before-importing/" data-gtmv-page="/pageTracker/voicebanner/VoiceoverTips" onclick="setvoicebannercookie();"><span><i class="lightbulb"></i>Voiceover Tips &gt;</span></a>
                </li>
            </ul>
        </div>
    </div><div class="voice-vendor-ad" style="display: block; right: 0px;">
        <div class="close"><a href="javascript:hideVoiceAdWidget()" onclick="javascript:return hideVoiceAdWidget()">×</a></div>
        <div id="studio-voice-vendor-container">
            <ul>
                <li><a class="gtm-ga-pageview-t2" id="voice-vendor-vb" target="_blank" href="https://voicebunny.com/?p=vyond" data-gtmv-page="/pageTracker/voicebanner/VoiceBunny" onclick="setvoicebannercookie();"><img src="${server}/static/55910a7cd204c37c/go/img/video_voice/btn_vb.png"></a></li>
                <li><a class="gtm-ga-pageview-t2" id="voice-vendor-iw" target="_blank" href="https://www.inwhatlanguage.com/goanimate-translations/" data-gtmv-page="/pageTracker/voicebanner/InWhatLanguage" onclick="setvoicebannercookie();"><img src="${server}/static/55910a7cd204c37c/go/img/video_voice/btn_iw.png"></a></li>
                <li>
                    <hr class="sperator">
                    <a class="voiceover-tips gtm-ga-pageview-t2" target="_blank" href="http://goanimate.com/video-maker-tips/tutorial-why-you-should-break-up-your-dialogue-audio-into-small-pieces-before-importing/" data-gtmv-page="/pageTracker/voicebanner/VoiceoverTips" onclick="setvoicebannercookie();"><span><i class="lightbulb"></i>Voiceover Tips &gt;</span></a>
                </li>
            </ul>
        </div>
    </div></div>

</div>




<div id="offer_container">
</div>
<script type="text/javascript">
    </script>

<script type="text/javascript">

</script>



<style id="wistia_18_style" type="text/css" class="wistia_injected_style">
@font-face {
font-family: 'WistiaPlayerOverpassNumbers';
src: url(data:application/x-font-ttf;charset=utf-8;base64,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);
}
</style><script type="text/javascript" id="">var _vyccq=window._vyccq||[];</script>
<script type="text/javascript" id="" src="https://ga.vyond.com/ajax/cookie_policy"></script><style id="wistia_18_style" type="text/css" class="wistia_injected_style">
@font-face {
font-family: 'WistiaPlayerOverpassNumbers';
src: url(data:application/x-font-ttf;charset=utf-8;base64,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);
}
</style>
<script type="text/javascript" id="">!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version="2.0",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,"script","//connect.facebook.net/en_US/fbevents.js");fbq("init","784667875001149");fbq("track","PageView");</script>
<noscript>&lt;img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=784667875001149&amp;amp;ev=PageView&amp;amp;noscript=1"&gt;</noscript>
</body></html>`);
	}
	return true;
}
