// ==UserScript==
// @name         youtube自动切换中文字幕
// @namespace    https://github.com/crud-boy/Youtube-Automatic-Translation
// @version      0.1.1
// @description  油管自动跳广告,自动打开翻译字幕,如果打开失败，请手动点击一下字幕按钮
// @author       wlpha
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// @run-at       document-end


// ==/UserScript==

(function() {
    'use strict';
    function open_subtitle(){
        var lang_btns = document.querySelectorAll('.ytp-menuitem[aria-haspopup]');
        for(var l=0; l<lang_btns.length; l++) {
            var lang_btn = lang_btns[l];
            if(lang_btn) {
                // Find the keyword "subtitle" and click
                if(lang_btn.innerText.indexOf('字幕') > -1) {
                    lang_btn.click();
                    var auto_trans_btns = document.querySelectorAll('.ytp-panel-menu .ytp-menuitem[role="menuitemradio"]');
                    for(var i=0; i<auto_trans_btns.length; i++) {
                        //Find the keyword "automatic translation" and click
                        if(auto_trans_btns[i] && auto_trans_btns[i].innerText.indexOf('自动翻译') > -1) {
                            auto_trans_btns[i].click();
                            
                            var btns = document.querySelectorAll('.ytp-panel-menu .ytp-menuitem[role="menuitemradio"]');
                            for(var k=0; i<btns.length; k++) {
                                // Find "Simplified Chinese" and click
                                if(btns[k] && btns[k].innerText.indexOf('简体') > -1) {
                                    btns[k].click();
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    break;
                // Select if you have built-in subtitles
                } else if (lang_btn.innerText.indexOf('简体') > -1 || lang_btn.innerText.indexOf('中文') > -1) {
                    lang_btn.click();
                    break;
                }
                
            }
        }
    }

    function open_settings(){
        // 点击打开字幕
        var subtitle = document.querySelector('.ytp-subtitles-button.ytp-button[aria-pressed="false"]');
        
        if(subtitle && subtitle.style.display != 'none') {
            subtitle.click();
            // 点击菜单按钮
            var menu = document.querySelector('.ytp-settings-menu');
            var menu_btn = document.querySelector('.ytp-settings-button');

            if(menu && menu.style.display == 'none') {
                menu_btn.click();
            }


            // 检测是否有字幕，如果有就切换
            open_subtitle();
            
            // 关闭设置菜单
            setTimeout(function(){
                if(menu && menu_btn && menu.style.display != 'none') {
                    
                    menu_btn.click();
                }
            }, 500);

        }
    }


    setInterval(function(){
        // 删除广告
        // Delete advertisements
        var ads_string = ['.video-ads', '#player-ads'];
        for(x in ads_string) {
            var ads = document.querySelectorAll(ads_string[x]);
            for(var i=0; i<ads.length; i++) {
                try{
                    var child = ads[i];
                    child.parentNode.removeChild(child);
                    console.log('youtube自动清除广告');
                }catch(e) {
        
                }
            }
        }

        // 跳过播放器广告
        // Skip Player Advertising
        var ad_show = document.querySelector('.ad-showing');
        if(ad_show) {
            var player = document.querySelector('.html5-main-video');
            if(player) {
                player.currentTime  = 1e10;
                console.log('youtube自动清除片头片尾广告');
            }
        }

        // 检测是否打开过设置
        open_settings();
    }, 1000);


    setTimeout(function(){
        // 防止系统自动打开的字幕，导致点击翻译失败
        var subtitle = document.querySelector('.ytp-subtitles-button.ytp-button[aria-pressed="true"]');
        if(subtitle) {
            subtitle.click();
        }
    }, 3000);

})();
