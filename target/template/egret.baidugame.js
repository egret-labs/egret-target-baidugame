var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebGeolocation = (function (_super) {
            __extends(WebGeolocation, _super);
            /**
             * @private
             */
            function WebGeolocation(option) {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.onUpdate = function (position) {
                    var event = new egret.GeolocationEvent(egret.Event.CHANGE);
                    var coords = position.coords;
                    event.altitude = coords.altitude;
                    event.heading = coords.heading;
                    event.accuracy = coords.accuracy;
                    event.latitude = coords.latitude;
                    event.longitude = coords.longitude;
                    event.speed = coords.speed;
                    event.altitudeAccuracy = coords.altitudeAccuracy;
                    _this.dispatchEvent(event);
                };
                /**
                 * @private
                 */
                _this.onError = function (error) {
                    var errorType = egret.GeolocationEvent.UNAVAILABLE;
                    if (error.code == error.PERMISSION_DENIED)
                        errorType = egret.GeolocationEvent.PERMISSION_DENIED;
                    var event = new egret.GeolocationEvent(egret.IOErrorEvent.IO_ERROR);
                    event.errorType = errorType;
                    event.errorMessage = error.message;
                    _this.dispatchEvent(event);
                };
                _this.geolocation = navigator.geolocation;
                return _this;
            }
            /**
             * @private
             *
             */
            WebGeolocation.prototype.start = function () {
                var geo = this.geolocation;
                if (geo)
                    this.watchId = geo.watchPosition(this.onUpdate, this.onError);
                else
                    this.onError({
                        code: 2,
                        message: egret.sys.tr(3004),
                        PERMISSION_DENIED: 1,
                        POSITION_UNAVAILABLE: 2
                    });
            };
            /**
             * @private
             *
             */
            WebGeolocation.prototype.stop = function () {
                var geo = this.geolocation;
                geo.clearWatch(this.watchId);
            };
            return WebGeolocation;
        }(egret.EventDispatcher));
        baidugame.WebGeolocation = WebGeolocation;
        __reflect(WebGeolocation.prototype, "egret.baidugame.WebGeolocation", ["egret.Geolocation"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebMotion = (function (_super) {
            __extends(WebMotion, _super);
            function WebMotion() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * @private
                 */
                _this.onChange = function (e) {
                    var event = new egret.MotionEvent(egret.Event.CHANGE);
                    var acceleration = {
                        x: e.acceleration.x,
                        y: e.acceleration.y,
                        z: e.acceleration.z
                    };
                    var accelerationIncludingGravity = {
                        x: e.accelerationIncludingGravity.x,
                        y: e.accelerationIncludingGravity.y,
                        z: e.accelerationIncludingGravity.z
                    };
                    var rotation = {
                        alpha: e.rotationRate.alpha,
                        beta: e.rotationRate.beta,
                        gamma: e.rotationRate.gamma
                    };
                    event.acceleration = acceleration;
                    event.accelerationIncludingGravity = accelerationIncludingGravity;
                    event.rotationRate = rotation;
                    _this.dispatchEvent(event);
                };
                return _this;
            }
            /**
             * @private
             *
             */
            WebMotion.prototype.start = function () {
                window.addEventListener("devicemotion", this.onChange);
            };
            /**
             * @private
             *
             */
            WebMotion.prototype.stop = function () {
                window.removeEventListener("devicemotion", this.onChange);
            };
            return WebMotion;
        }(egret.EventDispatcher));
        baidugame.WebMotion = WebMotion;
        __reflect(WebMotion.prototype, "egret.baidugame.WebMotion", ["egret.Motion"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebPlayer = (function (_super) {
            __extends(WebPlayer, _super);
            function WebPlayer(container, options) {
                var _this = _super.call(this) || this;
                _this.init(container, options);
                _this.initOrientation();
                return _this;
            }
            WebPlayer.prototype.init = function (container, options) {
                var option = this.readOption(container, options);
                var stage = new egret.Stage();
                stage.$screen = this;
                stage.$scaleMode = option.scaleMode;
                stage.$orientation = option.orientation;
                stage.$maxTouches = option.maxTouches;
                stage.frameRate = option.frameRate;
                stage.textureScaleFactor = option.textureScaleFactor;
                var buffer = new egret.sys.RenderBuffer(undefined, undefined, true);
                var canvas = buffer.surface;
                this.attachCanvas(container, canvas);
                var webTouch = new baidugame.WebTouchHandler(stage, canvas);
                var player = new egret.sys.Player(buffer, stage, option.entryClassName);
                egret.lifecycle.stage = stage;
                egret.lifecycle.addLifecycleListener(baidugame.WebLifeCycleHandler);
                if (option.showFPS || option.showLog) {
                    player.displayFPS(option.showFPS, option.showLog, option.logFilter, option.fpsStyles);
                }
                this.playerOption = option;
                this.container = container;
                this.canvas = canvas;
                this.stage = stage;
                this.player = player;
                this.webTouchHandler = webTouch;
                this.updateScreenSize();
                this.updateMaxTouches();
                player.start();
            };
            WebPlayer.prototype.initOrientation = function () {
                var self = this;
                window.addEventListener("orientationchange", function () {
                    window.setTimeout(function () {
                        egret.StageOrientationEvent.dispatchStageOrientationEvent(self.stage, egret.StageOrientationEvent.ORIENTATION_CHANGE);
                    }, 350);
                });
            };
            /**
             * 读取初始化参数
             */
            WebPlayer.prototype.readOption = function (container, options) {
                var option = {};
                option.entryClassName = options.entryClassName || "Main";
                option.scaleMode = options.scaleMode || egret.StageScaleMode.FIXED_WIDTH;
                if (!option.scaleMode || option.scaleMode == egret.StageScaleMode.SHOW_ALL) {
                    option.scaleMode = egret.StageScaleMode.FIXED_WIDE;
                    var message = egret.sys.tr(4500, "showAll", "fixedWidth");
                    console.warn(message);
                }
                option.frameRate = options.frameRate || 30;
                option.contentWidth = options.contentWidth || 640;
                option.contentHeight = options.contentHeight || 1136;
                option.orientation = options.orientation || egret.OrientationMode.AUTO;
                option.maxTouches = options.maxTouches;
                option.textureScaleFactor = 1;
                option.showFPS = false;
                var styleStr = "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9";
                var stylesArr = styleStr.split(",");
                var styles = {};
                for (var i = 0; i < stylesArr.length; i++) {
                    var tempStyleArr = stylesArr[i].split(":");
                    styles[tempStyleArr[0]] = tempStyleArr[1];
                }
                option.fpsStyles = styles;
                option.showLog = false;
                option.logFilter = "";
                return option;
            };
            /**
             * @private
             * 添加canvas到container。
             */
            WebPlayer.prototype.attachCanvas = function (container, canvas) {
                var style = canvas.style;
                style.cursor = "inherit";
                style.position = "absolute";
                style.top = "0";
                style.bottom = "0";
                style.left = "0";
                style.right = "0";
                // container.appendChild(canvas);
                // style = container.style;
                // style.overflow = "hidden";
                // style.position = "absolute";
            };
            /**
             * @private
             * 更新播放器视口尺寸
             */
            WebPlayer.prototype.updateScreenSize = function () {
                var canvas = this.canvas;
                if (canvas['userTyping'])
                    return;
                var option = this.playerOption;
                var top = 0;
                var res = swan.getSystemInfoSync();
                var boundingClientWidth = res.screenWidth;
                var boundingClientHeight = res.screenHeight;
                var shouldRotate = false;
                var orientation = this.stage.$orientation;
                if (orientation != egret.OrientationMode.AUTO) {
                    shouldRotate = orientation != egret.OrientationMode.PORTRAIT && boundingClientHeight > boundingClientWidth
                        || orientation == egret.OrientationMode.PORTRAIT && boundingClientWidth > boundingClientHeight;
                }
                var screenWidth = shouldRotate ? boundingClientHeight : boundingClientWidth;
                var screenHeight = shouldRotate ? boundingClientWidth : boundingClientHeight;
                egret.Capabilities["boundingClientWidth" + ""] = screenWidth;
                egret.Capabilities["boundingClientHeight" + ""] = screenHeight;
                var stageSize = egret.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, screenWidth, screenHeight, option.contentWidth, option.contentHeight);
                var stageWidth = stageSize.stageWidth;
                var stageHeight = stageSize.stageHeight;
                var displayWidth = stageSize.displayWidth;
                var displayHeight = stageSize.displayHeight;
                canvas.style[baidugame.getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
                if (canvas.width != stageWidth) {
                    canvas.width = stageWidth;
                }
                if (canvas.height != stageHeight) {
                    canvas.height = stageHeight;
                }
                var rotation = 0;
                if (shouldRotate) {
                    if (orientation == egret.OrientationMode.LANDSCAPE) {
                        rotation = 90;
                        canvas.style.top = top + (boundingClientHeight - displayWidth) / 2 + "px";
                        canvas.style.left = (boundingClientWidth + displayHeight) / 2 + "px";
                    }
                    else {
                        rotation = -90;
                        canvas.style.top = top + (boundingClientHeight + displayWidth) / 2 + "px";
                        canvas.style.left = (boundingClientWidth - displayHeight) / 2 + "px";
                    }
                }
                else {
                    canvas.style.top = top + (boundingClientHeight - displayHeight) / 2 + "px";
                    canvas.style.left = (boundingClientWidth - displayWidth) / 2 + "px";
                }
                var scalex = displayWidth / stageWidth, scaley = displayHeight / stageHeight;
                var canvasScaleX = scalex * egret.sys.DisplayList.$canvasScaleFactor;
                var canvasScaleY = scaley * egret.sys.DisplayList.$canvasScaleFactor;
                var m = new egret.Matrix();
                m.scale(scalex / canvasScaleX, scaley / canvasScaleY);
                m.rotate(rotation * Math.PI / 180);
                var transform = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.tx + "," + m.ty + ")";
                canvas.style[baidugame.getPrefixStyleName("transform")] = transform;
                egret.sys.DisplayList.$setCanvasScale(canvasScaleX, canvasScaleY);
                this.webTouchHandler.updateScaleMode(scalex, scaley, rotation);
                this.player.updateStageSize(stageWidth, stageHeight); //不要在这个方法后面修改属性
            };
            WebPlayer.prototype.setContentSize = function (width, height) {
                var option = this.playerOption;
                option.contentWidth = width;
                option.contentHeight = height;
                this.updateScreenSize();
            };
            /**
             * @private
             * 更新触摸数量
             */
            WebPlayer.prototype.updateMaxTouches = function () {
                this.webTouchHandler.$updateMaxTouches();
            };
            return WebPlayer;
        }(egret.HashObject));
        baidugame.WebPlayer = WebPlayer;
        __reflect(WebPlayer.prototype, "egret.baidugame.WebPlayer", ["egret.sys.Screen"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * @inheritDoc
         */
        var HtmlSound = (function (_super) {
            __extends(HtmlSound, _super);
            /**
             * @private
             * @inheritDoc
             */
            function HtmlSound() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.loaded = false;
                return _this;
            }
            Object.defineProperty(HtmlSound.prototype, "length", {
                get: function () {
                    if (this.originAudio) {
                        return this.originAudio.duration;
                    }
                    throw new Error("sound not loaded!");
                    //return 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            HtmlSound.prototype.load = function (url) {
                var self = this;
                this.url = url;
                if (true && !url) {
                    egret.$error(3002);
                }
                var audio = new Audio(url);
                audio.addEventListener("canplaythrough", onAudioLoaded);
                audio.addEventListener("error", onAudioError);
                // audio.load();     swan没有此接口
                this.originAudio = audio;
                if (HtmlSound.clearAudios[this.url]) {
                    delete HtmlSound.clearAudios[this.url];
                }
                HtmlSound.$recycle(this.url, audio);
                function onAudioLoaded() {
                    removeListeners();
                    self.loaded = true;
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }
                function onAudioError() {
                    removeListeners();
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }
                function removeListeners() {
                    audio.removeEventListener("canplaythrough", onAudioLoaded);
                    audio.removeEventListener("error", onAudioError);
                }
            };
            /**
             * @inheritDoc
             */
            HtmlSound.prototype.play = function (startTime, loops) {
                startTime = +startTime || 0;
                loops = +loops || 0;
                if (true && this.loaded == false) {
                    egret.$error(1049);
                }
                var audio = HtmlSound.$pop(this.url);
                if (audio == null) {
                    audio = this.originAudio.cloneNode();
                }
                else {
                    //audio.load();
                }
                audio.autoplay = true;
                var channel = new baidugame.HtmlSoundChannel(audio);
                channel.$url = this.url;
                channel.$loops = loops;
                channel.$startTime = startTime;
                channel.$play();
                egret.sys.$pushSoundChannel(channel);
                return channel;
            };
            /**
             * @inheritDoc
             */
            HtmlSound.prototype.close = function () {
                if (this.loaded == false && this.originAudio)
                    this.originAudio.src = "";
                if (this.originAudio)
                    this.originAudio = null;
                HtmlSound.$clear(this.url);
            };
            HtmlSound.$clear = function (url) {
                HtmlSound.clearAudios[url] = true;
                var array = HtmlSound.audios[url];
                if (array) {
                    array.length = 0;
                }
            };
            HtmlSound.$pop = function (url) {
                var array = HtmlSound.audios[url];
                if (array && array.length > 0) {
                    return array.pop();
                }
                return null;
            };
            HtmlSound.$recycle = function (url, audio) {
                if (HtmlSound.clearAudios[url]) {
                    return;
                }
                var array = HtmlSound.audios[url];
                if (HtmlSound.audios[url] == null) {
                    array = HtmlSound.audios[url] = [];
                }
                array.push(audio);
            };
            /**
             * Background music
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 背景音乐
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            HtmlSound.MUSIC = "music";
            /**
             * EFFECT
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 音效
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            HtmlSound.EFFECT = "effect";
            /**
             * @private
             */
            HtmlSound.audios = {};
            HtmlSound.clearAudios = {};
            return HtmlSound;
        }(egret.EventDispatcher));
        baidugame.HtmlSound = HtmlSound;
        __reflect(HtmlSound.prototype, "egret.baidugame.HtmlSound", ["egret.Sound"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * @inheritDoc
         */
        var HtmlSoundChannel = (function (_super) {
            __extends(HtmlSoundChannel, _super);
            /**
             * @private
             */
            function HtmlSoundChannel(audio) {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.$startTime = 0;
                /**
                 * @private
                 */
                _this.audio = null;
                //声音是否已经播放完成
                _this.isStopped = false;
                /**
                 * @private
                 */
                _this.onPlayEnd = function () {
                    if (_this.$loops == 1) {
                        _this.stop();
                        _this.dispatchEventWith(egret.Event.SOUND_COMPLETE);
                        return;
                    }
                    if (_this.$loops > 0) {
                        _this.$loops--;
                    }
                    /////////////
                    //this.audio.load();
                    _this.$play();
                };
                /**
                 * @private
                 */
                _this._volume = 1;
                audio.addEventListener("ended", _this.onPlayEnd);
                _this.audio = audio;
                return _this;
            }
            HtmlSoundChannel.prototype.$play = function () {
                if (this.isStopped) {
                    egret.$error(1036);
                    return;
                }
                this.audio.play();
                this.audio.volume = this._volume;
                this.audio.currentTime = this.$startTime;
            };
            /**
             * @private
             * @inheritDoc
             */
            HtmlSoundChannel.prototype.stop = function () {
                if (!this.audio)
                    return;
                if (!this.isStopped) {
                    egret.sys.$popSoundChannel(this);
                }
                this.isStopped = true;
                var audio = this.audio;
                audio.removeEventListener("ended", this.onPlayEnd);
                audio.volume = 0;
                this._volume = 0;
                this.audio = null;
                var url = this.$url;
                //延迟一定时间再停止，规避chrome报错
                window.setTimeout(function () {
                    audio.pause();
                    baidugame.HtmlSound.$recycle(url, audio);
                }, 200);
            };
            Object.defineProperty(HtmlSoundChannel.prototype, "volume", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return this._volume;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this.isStopped) {
                        egret.$error(1036);
                        return;
                    }
                    this._volume = value;
                    if (!this.audio)
                        return;
                    this.audio.volume = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HtmlSoundChannel.prototype, "position", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.audio)
                        return 0;
                    return this.audio.currentTime;
                },
                enumerable: true,
                configurable: true
            });
            return HtmlSoundChannel;
        }(egret.EventDispatcher));
        baidugame.HtmlSoundChannel = HtmlSoundChannel;
        __reflect(HtmlSoundChannel.prototype, "egret.baidugame.HtmlSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebAudioDecode = (function () {
            function WebAudioDecode() {
            }
            /**
             * @private
             *
             */
            WebAudioDecode.decodeAudios = function () {
                if (WebAudioDecode.decodeArr.length <= 0) {
                    return;
                }
                if (WebAudioDecode.isDecoding) {
                    return;
                }
                WebAudioDecode.isDecoding = true;
                var decodeInfo = WebAudioDecode.decodeArr.shift();
                WebAudioDecode.ctx.decodeAudioData(decodeInfo["buffer"], function (audioBuffer) {
                    decodeInfo["self"].audioBuffer = audioBuffer;
                    if (decodeInfo["success"]) {
                        decodeInfo["success"]();
                    }
                    WebAudioDecode.isDecoding = false;
                    WebAudioDecode.decodeAudios();
                }, function () {
                    alert("sound decode error: " + decodeInfo["url"] + "！\nsee http://edn.egret.com/cn/docs/page/156");
                    if (decodeInfo["fail"]) {
                        decodeInfo["fail"]();
                    }
                    WebAudioDecode.isDecoding = false;
                    WebAudioDecode.decodeAudios();
                });
            };
            /**
             * @private
             */
            WebAudioDecode.decodeArr = [];
            /**
             * @private
             */
            WebAudioDecode.isDecoding = false;
            return WebAudioDecode;
        }());
        baidugame.WebAudioDecode = WebAudioDecode;
        __reflect(WebAudioDecode.prototype, "egret.baidugame.WebAudioDecode");
        /**
         * @private
         * @inheritDoc
         */
        var WebAudioSound = (function (_super) {
            __extends(WebAudioSound, _super);
            /**
             * @private
             * @inheritDoc
             */
            function WebAudioSound() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.loaded = false;
                return _this;
            }
            Object.defineProperty(WebAudioSound.prototype, "length", {
                get: function () {
                    if (this.audioBuffer) {
                        return this.audioBuffer.duration;
                    }
                    throw new Error("sound not loaded!");
                    //return 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            WebAudioSound.prototype.load = function (url) {
                var self = this;
                this.url = url;
                if (true && !url) {
                    egret.$error(3002);
                }
                var request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        var ioError = (request.status >= 400 || request.status == 0);
                        if (ioError) {
                            self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                        }
                        else {
                            WebAudioDecode.decodeArr.push({
                                "buffer": request.response,
                                "success": onAudioLoaded,
                                "fail": onAudioError,
                                "self": self,
                                "url": self.url
                            });
                            WebAudioDecode.decodeAudios();
                        }
                    }
                };
                request.send();
                function onAudioLoaded() {
                    self.loaded = true;
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }
                function onAudioError() {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }
            };
            /**
             * @inheritDoc
             */
            WebAudioSound.prototype.play = function (startTime, loops) {
                startTime = +startTime || 0;
                loops = +loops || 0;
                if (true && this.loaded == false) {
                    egret.$error(1049);
                }
                var channel = new baidugame.WebAudioSoundChannel();
                channel.$url = this.url;
                channel.$loops = loops;
                channel.$audioBuffer = this.audioBuffer;
                channel.$startTime = startTime;
                channel.$play();
                egret.sys.$pushSoundChannel(channel);
                return channel;
            };
            /**
             * @inheritDoc
             */
            WebAudioSound.prototype.close = function () {
            };
            /**
             * Background music
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 背景音乐
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            WebAudioSound.MUSIC = "music";
            /**
             * EFFECT
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 音效
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            WebAudioSound.EFFECT = "effect";
            return WebAudioSound;
        }(egret.EventDispatcher));
        baidugame.WebAudioSound = WebAudioSound;
        __reflect(WebAudioSound.prototype, "egret.baidugame.WebAudioSound", ["egret.Sound"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * @inheritDoc
         */
        var WebAudioSoundChannel = (function (_super) {
            __extends(WebAudioSoundChannel, _super);
            /**
             * @private
             */
            function WebAudioSoundChannel() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.$startTime = 0;
                /**
                 * @private
                 */
                _this.bufferSource = null;
                /**
                 * @private
                 */
                _this.context = baidugame.WebAudioDecode.ctx;
                //声音是否已经播放完成
                _this.isStopped = false;
                /**
                 * @private
                 */
                _this._currentTime = 0;
                /**
                 * @private
                 */
                _this._volume = 1;
                /**
                 * @private
                 */
                _this.onPlayEnd = function () {
                    if (_this.$loops == 1) {
                        _this.stop();
                        _this.dispatchEventWith(egret.Event.SOUND_COMPLETE);
                        return;
                    }
                    if (_this.$loops > 0) {
                        _this.$loops--;
                    }
                    /////////////
                    _this.$play();
                };
                /**
                 * @private
                 */
                _this._startTime = 0;
                if (_this.context["createGain"]) {
                    _this.gain = _this.context["createGain"]();
                }
                else {
                    _this.gain = _this.context["createGainNode"]();
                }
                return _this;
            }
            WebAudioSoundChannel.prototype.$play = function () {
                if (this.isStopped) {
                    egret.$error(1036);
                    return;
                }
                if (this.bufferSource) {
                    this.bufferSource.onended = null;
                    this.bufferSource = null;
                }
                var context = this.context;
                var gain = this.gain;
                var bufferSource = context.createBufferSource();
                this.bufferSource = bufferSource;
                bufferSource.buffer = this.$audioBuffer;
                bufferSource.connect(gain);
                gain.connect(context.destination);
                bufferSource.onended = this.onPlayEnd;
                this._startTime = Date.now();
                this.gain.gain.value = this._volume;
                bufferSource.start(0, this.$startTime);
                this._currentTime = 0;
            };
            WebAudioSoundChannel.prototype.stop = function () {
                if (this.bufferSource) {
                    var sourceNode = this.bufferSource;
                    if (sourceNode.stop) {
                        sourceNode.stop(0);
                    }
                    else {
                        sourceNode.noteOff(0);
                    }
                    sourceNode.onended = null;
                    sourceNode.disconnect();
                    this.bufferSource = null;
                    this.$audioBuffer = null;
                }
                if (!this.isStopped) {
                    egret.sys.$popSoundChannel(this);
                }
                this.isStopped = true;
            };
            Object.defineProperty(WebAudioSoundChannel.prototype, "volume", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return this._volume;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this.isStopped) {
                        egret.$error(1036);
                        return;
                    }
                    this._volume = value;
                    this.gain.gain.value = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebAudioSoundChannel.prototype, "position", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    if (this.bufferSource) {
                        return (Date.now() - this._startTime) / 1000 + this.$startTime;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            return WebAudioSoundChannel;
        }(egret.EventDispatcher));
        baidugame.WebAudioSoundChannel = WebAudioSoundChannel;
        __reflect(WebAudioSoundChannel.prototype, "egret.baidugame.WebAudioSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * @inheritDoc
         */
        var WebVideo = (function (_super) {
            __extends(WebVideo, _super);
            /**
             * @inheritDoc
             */
            function WebVideo(url, cache) {
                if (cache === void 0) { cache = true; }
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.loaded = false;
                /**
                 * @private
                 */
                _this.closed = false;
                /**
                 * @private
                 */
                _this.heightSet = NaN;
                /**
                 * @private
                 */
                _this.widthSet = NaN;
                /**
                 * @private
                 * pc上视频卡住的时候不能暂停
                 */
                _this.waiting = false;
                /**
                 * @private
                 * 用户是否设置了 pause
                 */
                _this.userPause = false;
                /**
                 * @private
                 * 用户是否设置了 play
                 */
                _this.userPlay = false;
                _this.isPlayed = false;
                _this.screenChanged = function (e) {
                    var isfullscreen = document.fullscreenEnabled || document.webkitIsFullScreen;
                    if (!isfullscreen) {
                        _this.checkFullScreen(false);
                        if (!egret.Capabilities.isMobile) {
                            _this._fullscreen = isfullscreen;
                        }
                    }
                };
                _this._fullscreen = true;
                /**
                 * @private
                 *
                 */
                _this.onVideoLoaded = function () {
                    _this.video.removeEventListener("canplay", _this.onVideoLoaded);
                    var video = _this.video;
                    _this.loaded = true;
                    //video.pause();
                    if (_this.posterData) {
                        _this.posterData.width = _this.getPlayWidth();
                        _this.posterData.height = _this.getPlayHeight();
                    }
                    video.width = video.videoWidth;
                    video.height = video.videoHeight;
                    window.setTimeout(function () {
                        _this.dispatchEventWith(egret.Event.COMPLETE);
                    }, 200);
                };
                _this.$renderNode = new egret.sys.BitmapNode();
                _this.src = url;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.loadPoster, _this);
                if (url) {
                    _this.load();
                }
                return _this;
            }
            /**
             * @inheritDoc
             */
            WebVideo.prototype.load = function (url, cache) {
                var _this = this;
                if (cache === void 0) { cache = true; }
                url = url || this.src;
                this.src = url;
                if (true && !url) {
                    egret.$error(3002);
                }
                if (this.video && this.video.src == url) {
                    return;
                }
                var video;
                if (!this.video || egret.Capabilities.isMobile) {
                    video = document.createElement("video");
                    this.video = video;
                    video.controls = null;
                }
                else {
                    video = this.video;
                }
                video.src = url;
                video.setAttribute("autoplay", "autoplay");
                video.setAttribute("webkit-playsinline", "true");
                video.addEventListener("canplay", this.onVideoLoaded);
                video.addEventListener("error", function () { return _this.onVideoError(); });
                video.addEventListener("ended", function () { return _this.onVideoEnded(); });
                var firstPause = false;
                video.addEventListener("canplay", function () {
                    _this.waiting = false;
                    if (!firstPause) {
                        firstPause = true;
                        video.pause();
                    }
                    else {
                        if (_this.userPause) {
                            _this.pause();
                        }
                        else if (_this.userPlay) {
                            _this.play();
                        }
                    }
                });
                video.addEventListener("waiting", function () {
                    _this.waiting = true;
                });
                video.load();
                this.videoPlay();
                video.style.position = "absolute";
                video.style.top = "0px";
                video.style.zIndex = "-88888";
                video.style.left = "0px";
                video.height = 1;
                video.width = 1;
            };
            /**
             * @inheritDoc
             */
            WebVideo.prototype.play = function (startTime, loop) {
                var _this = this;
                if (loop === void 0) { loop = false; }
                if (this.loaded == false) {
                    this.load(this.src);
                    this.once(egret.Event.COMPLETE, function (e) { return _this.play(startTime, loop); }, this);
                    return;
                }
                this.isPlayed = true;
                var video = this.video;
                if (startTime != undefined)
                    video.currentTime = +startTime || 0;
                video.loop = !!loop;
                if (egret.Capabilities.isMobile) {
                    video.style.zIndex = "-88888"; //移动端，就算设置成最小，只要全屏，都会在最上层，而且在自动退出去后，不担心挡住canvas
                }
                else {
                    video.style.zIndex = "9999";
                }
                video.style.position = "absolute";
                video.style.top = "0px";
                video.style.left = "0px";
                video.height = video.videoHeight;
                video.width = video.videoWidth;
                if (egret.Capabilities.os != "Windows PC" && egret.Capabilities.os != "Mac OS") {
                    window.setTimeout(function () {
                        video.width = 0;
                    }, 1000);
                }
                this.checkFullScreen(this._fullscreen);
            };
            WebVideo.prototype.videoPlay = function () {
                this.userPause = false;
                if (this.waiting) {
                    this.userPlay = true;
                    return;
                }
                this.userPlay = false;
                this.video.play();
            };
            WebVideo.prototype.checkFullScreen = function (playFullScreen) {
                var video = this.video;
                if (playFullScreen) {
                    if (video.parentElement == null) {
                        video.removeAttribute("webkit-playsinline");
                        document.body.appendChild(video);
                    }
                    egret.stopTick(this.markDirty, this);
                    this.goFullscreen();
                }
                else {
                    if (video.parentElement != null) {
                        video.parentElement.removeChild(video);
                    }
                    video.setAttribute("webkit-playsinline", "true");
                    this.setFullScreenMonitor(false);
                    egret.startTick(this.markDirty, this);
                    if (egret.Capabilities.isMobile) {
                        this.video.currentTime = 0;
                        this.onVideoEnded();
                        return;
                    }
                }
                this.videoPlay();
            };
            WebVideo.prototype.goFullscreen = function () {
                var video = this.video;
                var fullscreenType;
                fullscreenType = baidugame.getPrefixStyleName('requestFullscreen', video);
                if (!video[fullscreenType]) {
                    fullscreenType = baidugame.getPrefixStyleName('requestFullScreen', video);
                    if (!video[fullscreenType]) {
                        return true;
                    }
                }
                video.removeAttribute("webkit-playsinline");
                video[fullscreenType]();
                this.setFullScreenMonitor(true);
                return true;
            };
            WebVideo.prototype.setFullScreenMonitor = function (use) {
                var video = this.video;
                if (use) {
                    video.addEventListener("mozfullscreenchange", this.screenChanged);
                    video.addEventListener("webkitfullscreenchange", this.screenChanged);
                    video.addEventListener("mozfullscreenerror", this.screenError);
                    video.addEventListener("webkitfullscreenerror", this.screenError);
                }
                else {
                    video.removeEventListener("mozfullscreenchange", this.screenChanged);
                    video.removeEventListener("webkitfullscreenchange", this.screenChanged);
                    video.removeEventListener("mozfullscreenerror", this.screenError);
                    video.removeEventListener("webkitfullscreenerror", this.screenError);
                }
            };
            WebVideo.prototype.screenError = function () {
                egret.$error(3014);
            };
            WebVideo.prototype.exitFullscreen = function () {
                //退出全屏
                if (document['exitFullscreen']) {
                    document['exitFullscreen']();
                }
                else if (document['msExitFullscreen']) {
                    document['msExitFullscreen']();
                }
                else if (document['mozCancelFullScreen']) {
                    document['mozCancelFullScreen']();
                }
                else if (document['oCancelFullScreen']) {
                    document['oCancelFullScreen']();
                }
                else if (document['webkitExitFullscreen']) {
                    document['webkitExitFullscreen']();
                }
                else {
                }
            };
            /**
             * @private
             *
             */
            WebVideo.prototype.onVideoEnded = function () {
                this.pause();
                this.isPlayed = false;
                this.dispatchEventWith(egret.Event.ENDED);
            };
            /**
             * @private
             *
             */
            WebVideo.prototype.onVideoError = function () {
                this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
            };
            /**
             * @inheritDoc
             */
            WebVideo.prototype.close = function () {
                var _this = this;
                this.closed = true;
                this.video.removeEventListener("canplay", this.onVideoLoaded);
                this.video.removeEventListener("error", function () { return _this.onVideoError(); });
                this.video.removeEventListener("ended", function () { return _this.onVideoEnded(); });
                this.pause();
                if (this.loaded == false && this.video)
                    this.video.src = "";
                if (this.video && this.video.parentElement) {
                    this.video.parentElement.removeChild(this.video);
                    this.video = null;
                }
                this.loaded = false;
            };
            /**
             * @inheritDoc
             */
            WebVideo.prototype.pause = function () {
                this.userPlay = false;
                if (this.waiting) {
                    this.userPause = true;
                    return;
                }
                this.userPause = false;
                egret.stopTick(this.markDirty, this);
            };
            Object.defineProperty(WebVideo.prototype, "volume", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.video)
                        return 1;
                    return this.video.volume;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (!this.video)
                        return;
                    this.video.volume = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebVideo.prototype, "position", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.video)
                        return 0;
                    return this.video.currentTime;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (!this.video)
                        return;
                    this.video.currentTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebVideo.prototype, "fullscreen", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._fullscreen;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (egret.Capabilities.isMobile) {
                        return;
                    }
                    this._fullscreen = !!value;
                    if (this.video && this.video.paused == false) {
                        this.checkFullScreen(this._fullscreen);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebVideo.prototype, "bitmapData", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.video || !this.loaded)
                        return null;
                    if (!this._bitmapData) {
                        this.video.width = this.video.videoWidth;
                        this.video.height = this.video.videoHeight;
                        this._bitmapData = new egret.BitmapData(this.video);
                        this._bitmapData.$deleteSource = false;
                    }
                    return this._bitmapData;
                },
                enumerable: true,
                configurable: true
            });
            WebVideo.prototype.loadPoster = function () {
                var _this = this;
                var poster = this.poster;
                if (!poster)
                    return;
                var imageLoader = new egret.ImageLoader();
                imageLoader.once(egret.Event.COMPLETE, function (e) {
                    var posterData = imageLoader.data;
                    _this.posterData = imageLoader.data;
                    _this.posterData.width = _this.getPlayWidth();
                    _this.posterData.height = _this.getPlayHeight();
                }, this);
                imageLoader.load(poster);
            };
            /**
             * @private
             */
            WebVideo.prototype.$measureContentBounds = function (bounds) {
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                if (bitmapData) {
                    bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
                }
                else if (posterData) {
                    bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
                }
                else {
                    bounds.setEmpty();
                }
            };
            WebVideo.prototype.getPlayWidth = function () {
                if (!isNaN(this.widthSet)) {
                    return this.widthSet;
                }
                if (this.bitmapData) {
                    return this.bitmapData.width;
                }
                if (this.posterData) {
                    return this.posterData.width;
                }
                return NaN;
            };
            WebVideo.prototype.getPlayHeight = function () {
                if (!isNaN(this.heightSet)) {
                    return this.heightSet;
                }
                if (this.bitmapData) {
                    return this.bitmapData.height;
                }
                if (this.posterData) {
                    return this.posterData.height;
                }
                return NaN;
            };
            /**
             * @private
             */
            WebVideo.prototype.$updateRenderNode = function () {
                var node = this.$renderNode;
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                var width = this.getPlayWidth();
                var height = this.getPlayHeight();
                if ((!this.isPlayed || egret.Capabilities.isMobile) && posterData) {
                    node.image = posterData;
                    node.imageWidth = width;
                    node.imageHeight = height;
                    node.drawImage(0, 0, posterData.width, posterData.height, 0, 0, width, height);
                }
                else if (this.isPlayed && bitmapData) {
                    node.image = bitmapData;
                    node.imageWidth = bitmapData.width;
                    node.imageHeight = bitmapData.height;
                    egret.WebGLUtils.deleteWebGLTexture(bitmapData.webGLTexture);
                    bitmapData.webGLTexture = null;
                    node.drawImage(0, 0, bitmapData.width, bitmapData.height, 0, 0, width, height);
                }
            };
            WebVideo.prototype.markDirty = function () {
                this.$renderDirty = true;
                return true;
            };
            /**
             * @private
             * 设置显示高度
             */
            WebVideo.prototype.$setHeight = function (value) {
                this.heightSet = +value || 0;
                _super.prototype.$setHeight.call(this, value);
            };
            /**
             * @private
             * 设置显示宽度
             */
            WebVideo.prototype.$setWidth = function (value) {
                this.widthSet = +value || 0;
                _super.prototype.$setWidth.call(this, value);
            };
            Object.defineProperty(WebVideo.prototype, "paused", {
                get: function () {
                    if (this.video) {
                        return this.video.paused;
                    }
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebVideo.prototype, "length", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (this.video) {
                        return this.video.duration;
                    }
                    throw new Error("Video not loaded!");
                },
                enumerable: true,
                configurable: true
            });
            return WebVideo;
        }(egret.DisplayObject));
        baidugame.WebVideo = WebVideo;
        __reflect(WebVideo.prototype, "egret.baidugame.WebVideo", ["egret.Video", "egret.DisplayObject"]);
        egret.Video = WebVideo;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebHttpRequest = (function (_super) {
            __extends(WebHttpRequest, _super);
            /**
             * @private
             */
            function WebHttpRequest() {
                var _this = _super.call(this) || this;
                _this.timeout = 0;
                /**
                 * @private
                 */
                _this._url = "";
                _this._method = "";
                return _this;
            }
            Object.defineProperty(WebHttpRequest.prototype, "response", {
                /**
                 * @private
                 * 本次请求返回的数据，数据类型根据responseType设置的值确定。
                 */
                get: function () {
                    if (!this._xhr) {
                        return null;
                    }
                    if (this._xhr.response != undefined) {
                        return this._xhr.response;
                    }
                    if (this._responseType == "text") {
                        return this._xhr.responseText;
                    }
                    if (this._responseType == "document") {
                        return this._xhr.responseXML;
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebHttpRequest.prototype, "responseType", {
                /**
                 * @private
                 * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
                 */
                get: function () {
                    return this._responseType;
                },
                set: function (value) {
                    this._responseType = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebHttpRequest.prototype, "withCredentials", {
                /**
                 * @private
                 * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
                 */
                get: function () {
                    return this._withCredentials;
                },
                set: function (value) {
                    this._withCredentials = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @private
             * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
             * @param url 该请求所要访问的URL该请求所要访问的URL
             * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
             */
            WebHttpRequest.prototype.open = function (url, method) {
                if (method === void 0) { method = "GET"; }
                this._url = url;
                this._method = method;
                if (this._xhr) {
                    this._xhr.abort();
                    this._xhr = null;
                }
                this._xhr = new XMLHttpRequest();
                this._xhr.onreadystatechange = this.onReadyStateChange.bind(this);
                this._xhr.onprogress = this.updateProgress.bind(this);
                this._xhr.ontimeout = this.onTimeout.bind(this);
                this._xhr.open(this._method, this._url, true);
            };
            /**
             * @private
             * 发送请求.
             * @param data 需要发送的数据
             */
            WebHttpRequest.prototype.send = function (data) {
                if (this._responseType != null) {
                    this._xhr.responseType = this._responseType;
                }
                if (this._withCredentials != null) {
                    this._xhr.withCredentials = this._withCredentials;
                }
                if (this.headerObj) {
                    for (var key in this.headerObj) {
                        this._xhr.setRequestHeader(key, this.headerObj[key]);
                    }
                }
                this._xhr.timeout = this.timeout;
                this._xhr.send(data);
            };
            /**
             * @private
             * 如果请求已经被发送,则立刻中止请求.
             */
            WebHttpRequest.prototype.abort = function () {
                if (this._xhr) {
                    this._xhr.abort();
                }
            };
            /**
             * @private
             * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
             */
            WebHttpRequest.prototype.getAllResponseHeaders = function () {
                if (!this._xhr) {
                    return null;
                }
                var result = this._xhr.getAllResponseHeaders();
                return result ? result : "";
            };
            /**
             * @private
             * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
             * @param header 将要被赋值的请求头名称.
             * @param value 给指定的请求头赋的值.
             */
            WebHttpRequest.prototype.setRequestHeader = function (header, value) {
                if (!this.headerObj) {
                    this.headerObj = {};
                }
                this.headerObj[header] = value;
            };
            /**
             * @private
             * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
             * @param header 要返回的响应头名称
             */
            WebHttpRequest.prototype.getResponseHeader = function (header) {
                if (!this._xhr) {
                    return null;
                }
                var result = this._xhr.getResponseHeader(header);
                return result ? result : "";
            };
            /**
             * @private
             */
            WebHttpRequest.prototype.onTimeout = function () {
                var message = egret.sys.tr(1052, this._url);
                console.warn(message);
                this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
            };
            /**
             * @private
             */
            WebHttpRequest.prototype.onReadyStateChange = function () {
                var xhr = this._xhr;
                if (xhr.readyState == 4) {
                    var ioError_1 = (xhr.status >= 400 || xhr.status == 0);
                    var url_1 = this._url;
                    var self_1 = this;
                    window.setTimeout(function () {
                        if (ioError_1) {
                            if (true && !self_1.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                                egret.$error(1011, url_1);
                            }
                            self_1.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                        }
                        else {
                            self_1.dispatchEventWith(egret.Event.COMPLETE);
                        }
                    }, 0);
                }
            };
            /**
             * @private
             */
            WebHttpRequest.prototype.updateProgress = function (event) {
                if (event.lengthComputable) {
                    egret.ProgressEvent.dispatchProgressEvent(this, egret.ProgressEvent.PROGRESS, event.loaded, event.total);
                }
            };
            return WebHttpRequest;
        }(egret.EventDispatcher));
        baidugame.WebHttpRequest = WebHttpRequest;
        __reflect(WebHttpRequest.prototype, "egret.baidugame.WebHttpRequest", ["egret.HttpRequest"]);
        egret.HttpRequest = WebHttpRequest;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        var winURL = window["URL"] || window["webkitURL"];
        /**
         * @private
         * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
         */
        var WebImageLoader = (function (_super) {
            __extends(WebImageLoader, _super);
            function WebImageLoader() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * @private
                 * 使用 load() 方法加载成功的 BitmapData 图像数据。
                 */
                _this.data = null;
                /**
                 * @private
                 * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
                 * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
                 */
                _this._crossOrigin = null;
                /**
                 * @private
                 * 标记crossOrigin有没有被设置过,设置过之后使用设置的属性
                 */
                _this._hasCrossOriginSet = false;
                /**
                 * @private
                 */
                _this.currentImage = null;
                /**
                 * @private
                 */
                _this.request = null;
                return _this;
            }
            Object.defineProperty(WebImageLoader.prototype, "crossOrigin", {
                get: function () {
                    return this._crossOrigin;
                },
                set: function (value) {
                    this._hasCrossOriginSet = true;
                    this._crossOrigin = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @private
             * 启动一次图像加载。注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
             * @param url 要加载的图像文件的地址。
             */
            WebImageLoader.prototype.load = function (url) {
                this.loadImage(url);
            };
            /**
             * @private
             */
            WebImageLoader.prototype.loadImage = function (src) {
                var image = new Image();
                this.data = null;
                this.currentImage = image;
                if (this._hasCrossOriginSet) {
                    if (this._crossOrigin) {
                        image.crossOrigin = this._crossOrigin;
                    }
                }
                else {
                    if (WebImageLoader.crossOrigin) {
                        image.crossOrigin = WebImageLoader.crossOrigin;
                    }
                }
                /*else {
                    if (image.hasAttribute("crossOrigin")) {//兼容猎豹
                        image.removeAttribute("crossOrigin");
                    }
                }*/
                image.onload = this.onImageComplete.bind(this);
                image.onerror = this.onLoadError.bind(this);
                image.src = src;
            };
            /**
             * @private
             */
            WebImageLoader.prototype.onImageComplete = function (event) {
                var image = this.getImage(event);
                if (!image) {
                    return;
                }
                this.data = new egret.BitmapData(image);
                var self = this;
                window.setTimeout(function () {
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }, 0);
            };
            /**
             * @private
             */
            WebImageLoader.prototype.onLoadError = function (event) {
                var image = this.getImage(event);
                if (!image) {
                    return;
                }
                this.dispatchIOError(image.src);
            };
            WebImageLoader.prototype.dispatchIOError = function (url) {
                var self = this;
                window.setTimeout(function () {
                    if (true && !self.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                        egret.$error(1011, url);
                    }
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }, 0);
            };
            /**
             * @private
             */
            WebImageLoader.prototype.getImage = function (event) {
                var image = event.target;
                var url = image.src;
                image.onerror = null;
                image.onload = null;
                if (this.currentImage !== image) {
                    return null;
                }
                this.currentImage = null;
                return image;
            };
            /**
             * @private
             * 指定是否启用跨域资源共享,如果ImageLoader实例有设置过crossOrigin属性将使用设置的属性
             */
            WebImageLoader.crossOrigin = null;
            return WebImageLoader;
        }(egret.EventDispatcher));
        baidugame.WebImageLoader = WebImageLoader;
        __reflect(WebImageLoader.prototype, "egret.baidugame.WebImageLoader", ["egret.ImageLoader"]);
        egret.ImageLoader = WebImageLoader;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @classdesc
         * @extends egret.StageText
         * @private
         */
        var HTML5StageText = (function (_super) {
            __extends(HTML5StageText, _super);
            /**
             * @private
             */
            function HTML5StageText() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.textValue = "";
                _this.onKeyboardComplete = _this.onKeyboardComplete.bind(_this);
                _this.onKeyboardInput = _this.onKeyboardInput.bind(_this);
                return _this;
            }
            /**
             * @private
             *
             * @param textfield
             */
            HTML5StageText.prototype.$setTextField = function (textfield) {
                this.$textfield = textfield;
                return true;
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.$addToStage = function () {
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.$show = function () {
                var info = {
                    defaultValue: this.$textfield.text,
                    multiple: this.$textfield.multiline,
                    confirmHold: true,
                    confirmType: 'done',
                    fail: function (res) {
                        console.log(res.errMsg);
                    }
                };
                if (this.$textfield.maxChars) {
                    info.maxLength = this.$textfield.maxChars;
                }
                swan.showKeyboard(info);
                swan.onKeyboardConfirm(this.onKeyboardComplete);
                swan.onKeyboardComplete(this.onKeyboardComplete);
                swan.onKeyboardInput(this.onKeyboardInput);
                this.dispatchEvent(new egret.Event("focus"));
            };
            HTML5StageText.prototype.onKeyboardInput = function (data) {
                this.textValue = data.value;
                egret.Event.dispatchEvent(this, "updateText", false);
            };
            HTML5StageText.prototype.onKeyboardComplete = function (res) {
                this.$textfield.text = res.value;
                this.$hide();
            };
            /**
             * @private
             */
            HTML5StageText.prototype.$hide = function () {
                swan.offKeyboardComplete();
                swan.offKeyboardConfirm();
                swan.offKeyboardInput();
                swan.hideKeyboard();
                this.dispatchEvent(new egret.Event("blur"));
            };
            /**
             * @private
             *
             * @returns
             */
            HTML5StageText.prototype.$getText = function () {
                if (!this.textValue) {
                    this.textValue = "";
                }
                return this.textValue;
            };
            /**
             * @private
             *
             * @param value
             */
            HTML5StageText.prototype.$setText = function (value) {
                this.textValue = value;
                // this.resetText();
                return true;
            };
            /**
             * @private
             */
            HTML5StageText.prototype.$setColor = function (value) {
                return true;
            };
            HTML5StageText.prototype.$onBlur = function () {
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.$removeFromStage = function () {
            };
            /**
             * 修改位置
             * @private
             */
            HTML5StageText.prototype.$resetStageText = function () {
            };
            return HTML5StageText;
        }(egret.EventDispatcher));
        baidugame.HTML5StageText = HTML5StageText;
        __reflect(HTML5StageText.prototype, "egret.baidugame.HTML5StageText", ["egret.StageText"]);
        egret.StageText = HTML5StageText;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var context = null;
        /**
         * @private
         */
        var fontCache = {};
        /**
         * 测量文本在指定样式下的宽度。
         * @param text 要测量的文本内容。
         * @param fontFamily 字体名称
         * @param fontSize 字体大小
         * @param bold 是否粗体
         * @param italic 是否斜体
         */
        function measureText(text, fontFamily, fontSize, bold, italic) {
            if (!context) {
                createContext();
            }
            var font = "";
            if (italic)
                font += "italic ";
            if (bold)
                font += "bold ";
            font += (fontSize || 12) + "px ";
            font += (fontFamily || "Arial");
            context.font = font;
            return egret.sys.measureTextWith(context, text);
        }
        /**
         * @private
         */
        function createContext() {
            context = egret.sys.canvasHitTestBuffer.context;
            context.textAlign = "left";
            context.textBaseline = "middle";
        }
        egret.sys.measureText = measureText;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * 创建一个canvas。
         */
        function __createCanvas__(width, height) {
            var canvas = egret.sys.createCanvas(width, height);
            var context = canvas.getContext("2d");
            if (context["imageSmoothingEnabled"] === undefined) {
                var keys = ["webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled"];
                var key_1;
                for (var i = keys.length - 1; i >= 0; i--) {
                    key_1 = keys[i];
                    if (context[key_1] !== void 0) {
                        break;
                    }
                }
                try {
                    Object.defineProperty(context, "imageSmoothingEnabled", {
                        get: function () {
                            return this[key_1];
                        },
                        set: function (value) {
                            this[key_1] = value;
                        }
                    });
                }
                catch (e) {
                    context["imageSmoothingEnabled"] = context[key_1];
                }
            }
            return canvas;
        }
        var sharedCanvas;
        /**
         * @private
         * Canvas2D渲染缓冲
         */
        var CanvasRenderBuffer = (function () {
            function CanvasRenderBuffer(width, height, root) {
                this.surface = egret.sys.createCanvasRenderBufferSurface(__createCanvas__, width, height, root);
                this.context = this.surface.getContext("2d");
                if (this.context) {
                    this.context.$offsetX = 0;
                    this.context.$offsetY = 0;
                }
                this.resize(width, height);
            }
            Object.defineProperty(CanvasRenderBuffer.prototype, "width", {
                /**
                 * 渲染缓冲的宽度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    return this.surface.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CanvasRenderBuffer.prototype, "height", {
                /**
                 * 渲染缓冲的高度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    return this.surface.height;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 改变渲染缓冲的大小并清空缓冲区
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param useMaxSize 若传入true，则将改变后的尺寸与已有尺寸对比，保留较大的尺寸。
             */
            CanvasRenderBuffer.prototype.resize = function (width, height, useMaxSize) {
                egret.sys.resizeCanvasRenderBuffer(this, width, height, useMaxSize);
            };
            /**
             * 获取指定区域的像素
             */
            CanvasRenderBuffer.prototype.getPixels = function (x, y, width, height) {
                if (width === void 0) { width = 1; }
                if (height === void 0) { height = 1; }
                return this.context.getImageData(x, y, width, height).data;
            };
            /**
             * 转换成base64字符串，如果图片（或者包含的图片）跨域，则返回null
             * @param type 转换的类型，如: "image/png","image/jpeg"
             */
            CanvasRenderBuffer.prototype.toDataURL = function (type, encoderOptions) {
                return this.surface.toDataURL(type, encoderOptions);
            };
            /**
             * 清空缓冲区数据
             */
            CanvasRenderBuffer.prototype.clear = function () {
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.clearRect(0, 0, this.surface.width, this.surface.height);
            };
            /**
             * 销毁绘制对象
             */
            CanvasRenderBuffer.prototype.destroy = function () {
                this.surface.width = this.surface.height = 0;
            };
            return CanvasRenderBuffer;
        }());
        baidugame.CanvasRenderBuffer = CanvasRenderBuffer;
        __reflect(CanvasRenderBuffer.prototype, "egret.baidugame.CanvasRenderBuffer", ["egret.sys.RenderBuffer"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided this the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebTouchHandler = (function (_super) {
            __extends(WebTouchHandler, _super);
            /**
             * @private
             */
            function WebTouchHandler(stage, canvas) {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.onTouchBegin = function (event) {
                    var location = _this.getLocation(event);
                    _this.touch.onTouchBegin(location.x, location.y, event.identifier);
                };
                /**
                 * @private
                 */
                _this.onTouchMove = function (event) {
                    var location = _this.getLocation(event);
                    _this.touch.onTouchMove(location.x, location.y, event.identifier);
                };
                /**
                 * @private
                 */
                _this.onTouchEnd = function (event) {
                    var location = _this.getLocation(event);
                    _this.touch.onTouchEnd(location.x, location.y, event.identifier);
                };
                /**
                 * @private
                 */
                _this.scaleX = 1;
                /**
                 * @private
                 */
                _this.scaleY = 1;
                /**
                 * @private
                 */
                _this.rotation = 0;
                _this.canvas = canvas;
                _this.touch = new egret.sys.TouchHandler(stage);
                _this.addTouchListener();
                return _this;
            }
            /**
             * @private
             *
             */
            WebTouchHandler.prototype.addTouchListener = function () {
                var self = this;
                self.canvas.addEventListener("touchstart", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        self.onTouchBegin(event.changedTouches[i]);
                    }
                    self.prevent(event);
                }, false);
                self.canvas.addEventListener("touchmove", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        self.onTouchMove(event.changedTouches[i]);
                    }
                    self.prevent(event);
                }, false);
                self.canvas.addEventListener("touchend", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        self.onTouchEnd(event.changedTouches[i]);
                    }
                    self.prevent(event);
                }, false);
                self.canvas.addEventListener("touchcancel", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        self.onTouchEnd(event.changedTouches[i]);
                    }
                    self.prevent(event);
                }, false);
            };
            /**
             * @private
             */
            WebTouchHandler.prototype.prevent = function (event) {
                event.stopPropagation();
                if (event["isScroll"] != true && !this.canvas['userTyping']) {
                    event.preventDefault();
                }
            };
            /**
             * @private
             */
            WebTouchHandler.prototype.getLocation = function (event) {
                var doc = document.documentElement;
                var box = this.canvas.getBoundingClientRect();
                var left = box.left;
                var top = box.top;
                var x = event.pageX - left, newx = x;
                var y = event.pageY - top, newy = y;
                if (this.rotation == 90) {
                    newx = y;
                    newy = box.width - x;
                }
                else if (this.rotation == -90) {
                    newx = box.height - y;
                    newy = x;
                }
                newx = newx / this.scaleX;
                newy = newy / this.scaleY;
                return egret.$TempPoint.setTo(Math.round(newx), Math.round(newy));
            };
            /**
             * @private
             * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
             * @param scaleX 水平方向的缩放比例。
             * @param scaleY 垂直方向的缩放比例。
             */
            WebTouchHandler.prototype.updateScaleMode = function (scaleX, scaleY, rotation) {
                this.scaleX = scaleX;
                this.scaleY = scaleY;
                this.rotation = rotation;
            };
            /**
             * @private
             * 更新同时触摸点的数量
             */
            WebTouchHandler.prototype.$updateMaxTouches = function () {
                this.touch.$initMaxTouches();
            };
            return WebTouchHandler;
        }(egret.HashObject));
        baidugame.WebTouchHandler = WebTouchHandler;
        __reflect(WebTouchHandler.prototype, "egret.baidugame.WebTouchHandler");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        var isShow = true;
        /**
         * @private
         */
        baidugame.WebLifeCycleHandler = function (context) {
            if (swan.onShow) {
                swan.onShow(function () {
                    if (!isShow) {
                        context.resume();
                        isShow = true;
                    }
                });
            }
            if (swan.onHide) {
                swan.onHide(function () {
                    if (isShow) {
                        context.pause();
                        isShow = false;
                    }
                });
            }
        };
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var AudioType = (function () {
            function AudioType() {
            }
            /**
             * @private
             */
            AudioType.WEB_AUDIO = 2;
            /**
             * @private
             */
            AudioType.HTML5_AUDIO = 3;
            return AudioType;
        }());
        baidugame.AudioType = AudioType;
        __reflect(AudioType.prototype, "egret.baidugame.AudioType");
        /**
         * html5兼容性配置
         * @private
         */
        var Html5Capatibility = (function (_super) {
            __extends(Html5Capatibility, _super);
            /**
             * @private
             */
            function Html5Capatibility() {
                return _super.call(this) || this;
            }
            /**
             * @private
             *
             */
            Html5Capatibility.$init = function () {
                Html5Capatibility._canUseBlob = false;
                var audioType = Html5Capatibility._audioType;
                Html5Capatibility.setAudioType(AudioType.HTML5_AUDIO);
                egret.Sound = Html5Capatibility._AudioClass;
            };
            Html5Capatibility.setAudioType = function (type) {
                Html5Capatibility._audioType = type;
                switch (type) {
                    case AudioType.WEB_AUDIO:
                        Html5Capatibility._AudioClass = baidugame.WebAudioSound;
                        break;
                    case AudioType.HTML5_AUDIO:
                        Html5Capatibility._AudioClass = baidugame.HtmlSound;
                        break;
                }
            };
            //当前浏览器版本是否支持blob
            Html5Capatibility._canUseBlob = false;
            //当前浏览器版本是否支持webaudio
            Html5Capatibility._audioType = 0;
            return Html5Capatibility;
        }(egret.HashObject));
        baidugame.Html5Capatibility = Html5Capatibility;
        __reflect(Html5Capatibility.prototype, "egret.baidugame.Html5Capatibility");
        /**
         * @private
         */
        var currentPrefix = null;
        /**
         * @private
         */
        function getPrefixStyleName(name, element) {
            var header = "";
            if (element != null) {
                header = getPrefix(name, element);
            }
            else {
                if (currentPrefix == null) {
                    var tempStyle = document.createElement('div').style;
                    currentPrefix = getPrefix("transform", tempStyle);
                }
                header = currentPrefix;
            }
            if (header == "") {
                return name;
            }
            return header + name.charAt(0).toUpperCase() + name.substring(1, name.length);
        }
        baidugame.getPrefixStyleName = getPrefixStyleName;
        /**
         * @private
         */
        function getPrefix(name, element) {
            if (name in element) {
                return "";
            }
            name = name.charAt(0).toUpperCase() + name.substring(1, name.length);
            var transArr = ["webkit", "ms", "Moz", "O"];
            for (var i = 0; i < transArr.length; i++) {
                var tempStyle = transArr[i] + name;
                if (tempStyle in element) {
                    return transArr[i];
                }
            }
            return "";
        }
        baidugame.getPrefix = getPrefix;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * 微信小游戏支持库版本号
         */
        baidugame.version = "0.1.7";
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * 刷新所有Egret播放器的显示区域尺寸。仅当使用外部JavaScript代码动态修改了Egret容器大小时，需要手动调用此方法刷新显示区域。
         * 当网页尺寸发生改变时此方法会自动被调用。
         */
        function updateAllScreens() {
            if (!isRunning) {
                return;
            }
            // let containerList = document.querySelectorAll(".egret-player");
            // let length = containerList.length;
            // for (let i = 0; i < length; i++) {
            //     let container = containerList[i];
            //     let player = <WebPlayer>container["egret-player"];
            window['player'].updateScreenSize();
            // }
        }
        var isRunning = false;
        /**
         * @private
         * 网页加载完成，实例化页面中定义的Egret标签
         */
        function runEgret(options) {
            if (isRunning) {
                return;
            }
            isRunning = true;
            if (!options) {
                options = {};
            }
            baidugame.Html5Capatibility._audioType = options.audioType;
            baidugame.Html5Capatibility.$init();
            // WebGL上下文参数自定义
            if (options.renderMode == "webgl") {
                // WebGL抗锯齿默认关闭，提升PC及某些平台性能
                var antialias = options.antialias;
                baidugame.WebGLRenderContext.antialias = !!antialias;
                // WebGLRenderContext.antialias = (typeof antialias == undefined) ? true : antialias;
            }
            egret.sys.CanvasRenderBuffer = baidugame.CanvasRenderBuffer;
            setRenderMode(options.renderMode);
            var canvasScaleFactor;
            if (options.canvasScaleFactor) {
                canvasScaleFactor = options.canvasScaleFactor;
            }
            else if (options.calculateCanvasScaleFactor) {
                canvasScaleFactor = options.calculateCanvasScaleFactor(egret.sys.canvasHitTestBuffer.context);
            }
            else {
                //based on : https://github.com/jondavidjohn/hidpi-canvas-polyfill
                var context = egret.sys.canvasHitTestBuffer.context;
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                canvasScaleFactor = (window.devicePixelRatio || 1) / backingStore;
            }
            egret.sys.DisplayList.$canvasScaleFactor = canvasScaleFactor;
            var ticker = egret.ticker;
            startTicker(ticker);
            if (options.screenAdapter) {
                egret.sys.screenAdapter = options.screenAdapter;
            }
            else if (!egret.sys.screenAdapter) {
                egret.sys.screenAdapter = new egret.sys.DefaultScreenAdapter();
            }
            // let list = document.querySelectorAll(".egret-player");
            // let length = list.length;
            // for (let i = 0; i < length; i++) {
            //     let container = <HTMLDivElement>list[i];
            //     let player = new WebPlayer(container, options);
            //     container["egret-player"] = player;
            // }
            var container = {};
            var player = new baidugame.WebPlayer(container, options);
            window['player'] = player;
            window.addEventListener("resize", function () {
                if (isNaN(resizeTimer)) {
                    resizeTimer = window.setTimeout(doResize, 300);
                }
            });
        }
        /**
         * 设置渲染模式。"auto","webgl","canvas"
         * @param renderMode
         */
        function setRenderMode(renderMode) {
            if (renderMode === "webgl") {
                egret.Capabilities["renderMode" + ""] = "webgl";
                egret.sys.RenderBuffer = baidugame.WebGLRenderBuffer;
                egret.sys.systemRenderer = new baidugame.WebGLRenderer();
                egret.sys.canvasRenderer = new egret.CanvasRenderer();
                egret.sys.customHitTestBuffer = new baidugame.WebGLRenderBuffer(3, 3);
                egret.sys.canvasHitTestBuffer = new baidugame.CanvasRenderBuffer(3, 3);
            }
            else {
                egret.Capabilities["renderMode" + ""] = "canvas";
                egret.sys.RenderBuffer = baidugame.CanvasRenderBuffer;
                egret.sys.systemRenderer = new egret.CanvasRenderer();
                egret.sys.canvasRenderer = egret.sys.systemRenderer;
                egret.sys.customHitTestBuffer = new baidugame.CanvasRenderBuffer(3, 3);
                egret.sys.canvasHitTestBuffer = egret.sys.customHitTestBuffer;
            }
        }
        /**
         * @private
         * 启动心跳计时器。
         */
        function startTicker(ticker) {
            var requestAnimationFrame = window["requestAnimationFrame"] ||
                window["webkitRequestAnimationFrame"] ||
                window["mozRequestAnimationFrame"] ||
                window["oRequestAnimationFrame"] ||
                window["msRequestAnimationFrame"];
            if (!requestAnimationFrame) {
                requestAnimationFrame = function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
            }
            requestAnimationFrame(onTick);
            function onTick() {
                requestAnimationFrame(onTick);
                ticker.update();
            }
        }
        egret.runEgret = runEgret;
        egret.updateAllScreens = updateAllScreens;
        var resizeTimer = NaN;
        function doResize() {
            resizeTimer = NaN;
            egret.updateAllScreens();
        }
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
if (true) {
    var systemInfo = swan.getSystemInfoSync();
    var language = systemInfo.language.toLowerCase();
    if (language.indexOf('zh') > -1) {
        language = "zh_CN";
    }
    else {
        language = "en_US";
    }
    if (language in egret.$locale_strings) {
        egret.$language = language;
    }
}
egret.Capabilities["runtimeType" + ""] = "baidugame";
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebCapability = (function () {
            function WebCapability() {
            }
            /**
             * @private
             * 检测系统属性
             */
            WebCapability.detect = function () {
                var capabilities = egret.Capabilities;
                capabilities["isMobile" + ""] = true;
                var systemInfo = swan.getSystemInfoSync();
                var systemStr = systemInfo.system.toLowerCase();
                if (systemStr.indexOf("ios") > -1) {
                    capabilities["os" + ""] = "iOS";
                }
                else if (systemStr.indexOf("android") > -1) {
                    capabilities["os" + ""] = "Android";
                }
                var language = systemInfo.language;
                if (language.indexOf('zh') > -1) {
                    language = "zh-CN";
                }
                else {
                    language = "en-US";
                }
                capabilities["language" + ""] = language;
            };
            return WebCapability;
        }());
        baidugame.WebCapability = WebCapability;
        __reflect(WebCapability.prototype, "egret.baidugame.WebCapability");
        WebCapability.detect();
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebFps = (function (_super) {
            __extends(WebFps, _super);
            function WebFps(stage, showFPS, showLog, logFilter, styles) {
                var _this = _super.call(this) || this;
                _this.showPanle = true;
                _this.fpsHeight = 0;
                _this.WIDTH = 101;
                _this.HEIGHT = 20;
                _this.bgCanvasColor = "#18304b";
                _this.fpsFrontColor = "#18fefe";
                _this.WIDTH_COST = 50;
                _this.cost1Color = "#18fefe";
                // private cost2Color = "#ffff00";
                _this.cost3Color = "#ff0000";
                _this.arrFps = [];
                _this.arrCost = [];
                _this.arrLog = [];
                if (showFPS || showLog) {
                    if (egret.Capabilities.renderMode == 'canvas') {
                        _this.renderMode = "Canvas";
                    }
                    else {
                        _this.renderMode = "WebGL";
                    }
                    _this.panelX = styles["x"] === undefined ? 0 : parseInt(styles['x']);
                    _this.panelY = styles["y"] === undefined ? 0 : parseInt(styles['y']);
                    _this.fontColor = styles["textColor"] === undefined ? '#ffffff' : styles['textColor'].replace("0x", "#");
                    _this.fontSize = styles["size"] === undefined ? 12 : parseInt(styles['size']);
                    if (egret.Capabilities.isMobile) {
                        _this.fontSize -= 2;
                    }
                    var all = document.createElement('div');
                    all.style.position = 'absolute';
                    all.style.background = "rgba(0,0,0," + styles['bgAlpha'] + ")";
                    all.style.left = _this.panelX + 'px';
                    all.style.top = _this.panelY + 'px';
                    all.style.pointerEvents = 'none';
                    document.body.appendChild(all);
                    var container = document.createElement('div');
                    container.style.color = _this.fontColor;
                    container.style.fontSize = _this.fontSize + 'px';
                    container.style.lineHeight = _this.fontSize + 'px';
                    container.style.margin = '4px 4px 4px 4px';
                    _this.container = container;
                    all.appendChild(container);
                    if (showFPS)
                        _this.addFps();
                    if (showLog)
                        _this.addLog();
                }
                return _this;
            }
            WebFps.prototype.addFps = function () {
                var div = document.createElement('div');
                div.style.display = 'inline-block';
                this.containerFps = div;
                this.container.appendChild(div);
                var fps = document.createElement('div');
                fps.style.paddingBottom = '2px';
                this.fps = fps;
                this.containerFps.appendChild(fps);
                fps.innerHTML = "0 FPS " + this.renderMode + "<br/>min0 max0 avg0";
                var canvas = document.createElement('canvas');
                this.containerFps.appendChild(canvas);
                canvas.width = this.WIDTH;
                canvas.height = this.HEIGHT;
                this.canvasFps = canvas;
                var context = canvas.getContext('2d');
                this.contextFps = context;
                context.fillStyle = this.bgCanvasColor;
                context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                var divDatas = document.createElement('div');
                this.divDatas = divDatas;
                this.containerFps.appendChild(divDatas);
                var left = document.createElement('div');
                left.style['float'] = 'left';
                left.innerHTML = "Draw<br/>Cost";
                divDatas.appendChild(left);
                var right = document.createElement('div');
                right.style.paddingLeft = left.offsetWidth + 20 + "px";
                divDatas.appendChild(right);
                var draw = document.createElement('div');
                this.divDraw = draw;
                draw.innerHTML = "0<br/>";
                right.appendChild(draw);
                var cost = document.createElement('div');
                this.divCost = cost;
                cost.innerHTML = "<font  style=\"color:" + this.cost1Color + "\">0<font/> <font  style=\"color:" + this.cost3Color + "\">0<font/>";
                right.appendChild(cost);
                canvas = document.createElement('canvas');
                this.canvasCost = canvas;
                this.containerFps.appendChild(canvas);
                canvas.width = this.WIDTH;
                canvas.height = this.HEIGHT;
                context = canvas.getContext('2d');
                this.contextCost = context;
                context.fillStyle = this.bgCanvasColor;
                context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
                context.fillStyle = "#000000";
                context.fillRect(this.WIDTH_COST, 0, 1, this.HEIGHT);
                this.fpsHeight = this.container.offsetHeight;
            };
            WebFps.prototype.addLog = function () {
                var log = document.createElement('div');
                log.style.maxWidth = document.body.clientWidth - 8 - this.panelX + 'px';
                log.style.wordWrap = "break-word";
                this.log = log;
                this.container.appendChild(log);
            };
            WebFps.prototype.update = function (datas, showLastData) {
                if (showLastData === void 0) { showLastData = false; }
                var numFps;
                var numCostTicker;
                var numCostRender;
                if (!showLastData) {
                    numFps = datas.fps;
                    numCostTicker = datas.costTicker;
                    numCostRender = datas.costRender;
                    this.lastNumDraw = datas.draw;
                    this.arrFps.push(numFps);
                    this.arrCost.push([numCostTicker, numCostRender]);
                }
                else {
                    numFps = this.arrFps[this.arrFps.length - 1];
                    numCostTicker = this.arrCost[this.arrCost.length - 1][0];
                    numCostRender = this.arrCost[this.arrCost.length - 1][1];
                }
                var fpsTotal = 0;
                var lenFps = this.arrFps.length;
                if (lenFps > 101) {
                    lenFps = 101;
                    this.arrFps.shift();
                    this.arrCost.shift();
                }
                var fpsMin = this.arrFps[0];
                var fpsMax = this.arrFps[0];
                for (var i = 0; i < lenFps; i++) {
                    var num = this.arrFps[i];
                    fpsTotal += num;
                    if (num < fpsMin)
                        fpsMin = num;
                    else if (num > fpsMax)
                        fpsMax = num;
                }
                var WIDTH = this.WIDTH;
                var HEIGHT = this.HEIGHT;
                var context = this.contextFps;
                context.drawImage(this.canvasFps, 1, 0, WIDTH - 1, HEIGHT, 0, 0, WIDTH - 1, HEIGHT);
                context.fillStyle = this.bgCanvasColor;
                context.fillRect(WIDTH - 1, 0, 1, HEIGHT);
                var lastHeight = Math.floor(numFps / 60 * 20);
                if (lastHeight < 1)
                    lastHeight = 1;
                context.fillStyle = this.fpsFrontColor;
                context.fillRect(WIDTH - 1, 20 - lastHeight, 1, lastHeight);
                var WIDTH_COST = this.WIDTH_COST;
                context = this.contextCost;
                context.drawImage(this.canvasCost, 1, 0, WIDTH_COST - 1, HEIGHT, 0, 0, WIDTH_COST - 1, HEIGHT);
                context.drawImage(this.canvasCost, WIDTH_COST + 2, 0, WIDTH_COST - 1, HEIGHT, WIDTH_COST + 1, 0, WIDTH_COST - 1, HEIGHT);
                var c1Height = Math.floor(numCostTicker / 2);
                if (c1Height < 1)
                    c1Height = 1;
                else if (c1Height > 20)
                    c1Height = 20;
                //todo lcj
                var c2Height = Math.floor(numCostRender / 2);
                if (c2Height < 1)
                    c2Height = 1;
                else if (c2Height > 20)
                    c2Height = 20;
                context.fillStyle = this.bgCanvasColor;
                context.fillRect(WIDTH_COST - 1, 0, 1, HEIGHT);
                context.fillRect(WIDTH_COST * 2, 0, 1, HEIGHT);
                context.fillRect(WIDTH_COST * 3 + 1, 0, 1, HEIGHT);
                context.fillStyle = this.cost1Color;
                context.fillRect(WIDTH_COST - 1, 20 - c1Height, 1, c1Height);
                context.fillStyle = this.cost3Color;
                context.fillRect(WIDTH_COST * 2, 20 - c2Height, 1, c2Height);
                var fpsAvg = Math.floor(fpsTotal / lenFps);
                var fpsOutput = numFps + " FPS " + this.renderMode;
                if (this.showPanle) {
                    fpsOutput += "<br/>min" + fpsMin + " max" + fpsMax + " avg" + fpsAvg;
                    this.divDraw.innerHTML = this.lastNumDraw + "<br/>";
                    this.divCost.innerHTML = "<font  style=\"color:#18fefe\">" + numCostTicker + "<font/> <font  style=\"color:#ff0000\">" + numCostRender + "<font/>";
                }
                this.fps.innerHTML = fpsOutput;
            };
            ;
            WebFps.prototype.updateInfo = function (info) {
                this.arrLog.push(info);
                this.log.innerHTML = this.arrLog.join('<br/>');
                while (document.body.clientHeight < (this.log.offsetHeight + this.fpsHeight + this.panelY + this.fontSize * 2)) {
                    this.arrLog.shift();
                    this.log.innerHTML = this.arrLog.join('<br/>');
                }
            };
            WebFps.prototype.updateWarn = function (info) {
            };
            WebFps.prototype.updateError = function (info) {
            };
            return WebFps;
        }(egret.DisplayObject));
        baidugame.WebFps = WebFps;
        __reflect(WebFps.prototype, "egret.baidugame.WebFps", ["egret.FPSDisplay"]);
        egret.FPSDisplay = WebFps;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        function getOption(key) {
            return "";
        }
        baidugame.getOption = getOption;
        egret.getOption = getOption;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebExternalInterface = (function () {
            function WebExternalInterface() {
            }
            /**
             * @private
             * @param functionName
             * @param value
             */
            WebExternalInterface.call = function (functionName, value) {
            };
            /**
             * @private
             * @param functionName
             * @param listener
             */
            WebExternalInterface.addCallback = function (functionName, listener) {
            };
            return WebExternalInterface;
        }());
        baidugame.WebExternalInterface = WebExternalInterface;
        __reflect(WebExternalInterface.prototype, "egret.baidugame.WebExternalInterface", ["egret.ExternalInterface"]);
        egret.ExternalInterface = WebExternalInterface;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        var sharedCanvas;
        var sharedContext;
        /**
         * @private
         */
        function convertImageToCanvas(texture, rect) {
            if (!sharedCanvas) {
                sharedCanvas = document.createElement("canvas");
                sharedContext = sharedCanvas.getContext("2d");
            }
            var w = texture.$getTextureWidth();
            var h = texture.$getTextureHeight();
            if (rect == null) {
                rect = egret.$TempRectangle;
                rect.x = 0;
                rect.y = 0;
                rect.width = w;
                rect.height = h;
            }
            rect.x = Math.min(rect.x, w - 1);
            rect.y = Math.min(rect.y, h - 1);
            rect.width = Math.min(rect.width, w - rect.x);
            rect.height = Math.min(rect.height, h - rect.y);
            var iWidth = Math.floor(rect.width);
            var iHeight = Math.floor(rect.height);
            var surface = sharedCanvas;
            surface["style"]["width"] = iWidth + "px";
            surface["style"]["height"] = iHeight + "px";
            sharedCanvas.width = iWidth;
            sharedCanvas.height = iHeight;
            if (egret.Capabilities.renderMode == "webgl") {
                var renderTexture = void 0;
                //webgl下非RenderTexture纹理先画到RenderTexture
                if (!texture.$renderBuffer) {
                    renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(new egret.Bitmap(texture));
                }
                else {
                    renderTexture = texture;
                }
                //从RenderTexture中读取像素数据，填入canvas
                var pixels = renderTexture.$renderBuffer.getPixels(rect.x, rect.y, iWidth, iHeight);
                var x = 0;
                var y = 0;
                for (var i = 0; i < pixels.length; i += 4) {
                    sharedContext.fillStyle =
                        'rgba(' + pixels[i]
                            + ',' + pixels[i + 1]
                            + ',' + pixels[i + 2]
                            + ',' + (pixels[i + 3] / 255) + ')';
                    sharedContext.fillRect(x, y, 1, 1);
                    x++;
                    if (x == iWidth) {
                        x = 0;
                        y++;
                    }
                }
                if (!texture.$renderBuffer) {
                    renderTexture.dispose();
                }
                return surface;
            }
            else {
                var bitmapData = texture;
                var offsetX = Math.round(bitmapData.$offsetX);
                var offsetY = Math.round(bitmapData.$offsetY);
                var bitmapWidth = bitmapData.$bitmapWidth;
                var bitmapHeight = bitmapData.$bitmapHeight;
                sharedContext.drawImage(bitmapData.$bitmapData.source, bitmapData.$bitmapX + rect.x / egret.$TextureScaleFactor, bitmapData.$bitmapY + rect.y / egret.$TextureScaleFactor, bitmapWidth * rect.width / w, bitmapHeight * rect.height / h, offsetX, offsetY, rect.width, rect.height);
                return surface;
            }
        }
        /**
         * @private
         */
        function toDataURL(type, rect, encoderOptions) {
            try {
                var surface = convertImageToCanvas(this, rect);
                var result = surface.toDataURL(type, encoderOptions);
                return result;
            }
            catch (e) {
                egret.$error(1033);
            }
            return null;
        }
        /**
         * 有些杀毒软件认为 saveToFile 可能是一个病毒文件
         */
        function eliFoTevas(type, filePath, rect, encoderOptions) {
        }
        function getPixel32(x, y) {
            egret.$warn(1041, "getPixel32", "getPixels");
            return this.getPixels(x, y);
        }
        function getPixels(x, y, width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            //webgl环境下不需要转换成canvas获取像素信息
            if (egret.Capabilities.renderMode == "webgl") {
                var renderTexture = void 0;
                //webgl下非RenderTexture纹理先画到RenderTexture
                if (!this.$renderBuffer) {
                    renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(new egret.Bitmap(this));
                }
                else {
                    renderTexture = this;
                }
                //从RenderTexture中读取像素数据
                var pixels = renderTexture.$renderBuffer.getPixels(x, y, width, height);
                return pixels;
            }
            try {
                var surface = convertImageToCanvas(this);
                var result = sharedContext.getImageData(x, y, width, height).data;
                return result;
            }
            catch (e) {
                egret.$error(1039);
            }
        }
        egret.Texture.prototype.toDataURL = toDataURL;
        egret.Texture.prototype.saveToFile = eliFoTevas;
        egret.Texture.prototype.getPixel32 = getPixel32;
        egret.Texture.prototype.getPixels = getPixels;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * XML节点基类
         */
        var XMLNode = (function () {
            /**
             * @private
             */
            function XMLNode(nodeType, parent) {
                this.nodeType = nodeType;
                this.parent = parent;
            }
            return XMLNode;
        }());
        baidugame.XMLNode = XMLNode;
        __reflect(XMLNode.prototype, "egret.baidugame.XMLNode");
        /**
         * @private
         * XML节点对象
         */
        var XML = (function (_super) {
            __extends(XML, _super);
            /**
             * @private
             */
            function XML(localName, parent, prefix, namespace, name) {
                var _this = _super.call(this, 1, parent) || this;
                /**
                 * @private
                 * 当前节点上的属性列表
                 */
                _this.attributes = {};
                /**
                 * @private
                 * 当前节点的子节点列表
                 */
                _this.children = [];
                _this.localName = localName;
                _this.prefix = prefix;
                _this.namespace = namespace;
                _this.name = name;
                return _this;
            }
            return XML;
        }(XMLNode));
        baidugame.XML = XML;
        __reflect(XML.prototype, "egret.baidugame.XML");
        /**
         * @private
         * XML文本节点
         */
        var XMLText = (function (_super) {
            __extends(XMLText, _super);
            /**
             * @private
             */
            function XMLText(text, parent) {
                var _this = _super.call(this, 3, parent) || this;
                _this.text = text;
                return _this;
            }
            return XMLText;
        }(XMLNode));
        baidugame.XMLText = XMLText;
        __reflect(XMLText.prototype, "egret.baidugame.XMLText");
        var parser;
        /**
         * @private
         * 解析字符串为XML对象
         * @param text 要解析的字符串
         */
        function parse(text) {
            if (!parser) {
                if (!window["DOMParser"]) {
                    console.error("没有 XML 支持库，请访问 http://developer.egret.com/cn/github/egret-docs/Engine2D/minigame/minigameFAQ/index.html#xml 了解详情");
                }
                else {
                    parser = new DOMParser();
                }
            }
            var xmlDoc = parser.parseFromString(text, "text/xml");
            var length = xmlDoc.childNodes.length;
            for (var i = 0; i < length; i++) {
                var node = xmlDoc.childNodes[i];
                if (node.nodeType == 1) {
                    return parseNode(node, null);
                }
            }
            return null;
        }
        /**
         * @private
         * 解析一个节点
         */
        function parseNode(node, parent) {
            if (node.localName == "parsererror") {
                throw new Error(node.textContent);
            }
            var xml = new XML(node.localName, parent, node["prefix"], node.namespaceURI, node.nodeName);
            var nodeAttributes = node.attributes;
            var attributes = xml.attributes;
            var length = nodeAttributes.length;
            for (var i = 0; i < length; i++) {
                var attributeNode = nodeAttributes[i];
                var name_1 = attributeNode.name;
                if (name_1.indexOf("xmlns:") == 0) {
                    continue;
                }
                attributes[name_1] = attributeNode.value;
                xml["$" + name_1] = attributeNode.value;
            }
            var childNodes = node.childNodes;
            length = childNodes.length;
            var children = xml.children;
            for (var i = 0; i < length; i++) {
                var childNode = childNodes[i];
                var nodeType = childNode.nodeType;
                var childXML = null;
                if (nodeType == 1) {
                    childXML = parseNode(childNode, xml);
                }
                else if (nodeType == 3) {
                    var text = childNode.textContent.trim();
                    if (text) {
                        childXML = new XMLText(text, xml);
                    }
                }
                if (childXML) {
                    children.push(childXML);
                }
            }
            return xml;
        }
        egret.XML = { parse: parse };
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WebDeviceOrientation = (function (_super) {
            __extends(WebDeviceOrientation, _super);
            function WebDeviceOrientation() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * @private
                 */
                _this.onChange = function (e) {
                    var event = new egret.OrientationEvent(egret.Event.CHANGE);
                    event.beta = e.beta;
                    event.gamma = e.gamma;
                    event.alpha = e.alpha;
                    _this.dispatchEvent(event);
                };
                return _this;
            }
            /**
             * @private
             *
             */
            WebDeviceOrientation.prototype.start = function () {
                window.addEventListener("deviceorientation", this.onChange);
            };
            /**
             * @private
             *
             */
            WebDeviceOrientation.prototype.stop = function () {
                window.removeEventListener("deviceorientation", this.onChange);
            };
            return WebDeviceOrientation;
        }(egret.EventDispatcher));
        baidugame.WebDeviceOrientation = WebDeviceOrientation;
        __reflect(WebDeviceOrientation.prototype, "egret.baidugame.WebDeviceOrientation", ["egret.DeviceOrientation"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
egret.DeviceOrientation = egret.baidugame.WebDeviceOrientation;
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    /**
     * 转换 Image，Canvas，Video 为 Egret 框架内使用的 BitmapData 对象。
     * @param data 需要转换的对象，包括HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
     * @deprecated
     */
    function $toBitmapData(data) {
        data["hashCode"] = data["$hashCode"] = egret.$hashCount++;
        return data;
    }
    egret.$toBitmapData = $toBitmapData;
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var localStorage;
    (function (localStorage) {
        var swan;
        (function (swan) {
            /**
             * @private
             *
             * @param key
             * @returns
             */
            function getItem(key) {
                return window.localStorage.getItem(key);
            }
            /**
             * @private
             *
             * @param key
             * @param value
             * @returns
             */
            function setItem(key, value) {
                try {
                    window.localStorage.setItem(key, value);
                    return true;
                }
                catch (e) {
                    egret.$warn(1047, key, value);
                    return false;
                }
            }
            /**
             * @private
             *
             * @param key
             */
            function removeItem(key) {
                window.localStorage.removeItem(key);
            }
            /**
             * @private
             *
             */
            function clear() {
                window.localStorage.clear();
            }
            localStorage.getItem = getItem;
            localStorage.setItem = setItem;
            localStorage.removeItem = removeItem;
            localStorage.clear = clear;
        })(swan = localStorage.swan || (localStorage.swan = {}));
    })(localStorage = egret.localStorage || (egret.localStorage = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        if (true) {
            var logFuncs_1;
            function setLogLevel(logType) {
                if (logFuncs_1 == null) {
                    logFuncs_1 = {
                        "error": console.error,
                        "debug": console.debug,
                        "warn": console.warn,
                        "info": console.info,
                        "log": console.log
                    };
                }
                switch (logType) {
                    case egret.Logger.OFF:
                        console.error = function () {
                        };
                    case egret.Logger.ERROR:
                        console.warn = function () {
                        };
                    case egret.Logger.WARN:
                        console.info = function () {
                        };
                        console.log = function () {
                        };
                    case egret.Logger.INFO:
                        console.debug = function () {
                        };
                    default:
                        break;
                }
                switch (logType) {
                    case egret.Logger.ALL:
                    case egret.Logger.DEBUG:
                        console.debug = logFuncs_1["debug"];
                    case egret.Logger.INFO:
                        console.log = logFuncs_1["log"];
                        console.info = logFuncs_1["info"];
                    case egret.Logger.WARN:
                        console.warn = logFuncs_1["warn"];
                    case egret.Logger.ERROR:
                        console.error = logFuncs_1["error"];
                    default:
                        break;
                }
            }
            Object.defineProperty(egret.Logger, "logLevel", {
                set: setLogLevel,
                enumerable: true,
                configurable: true
            });
        }
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * 绘制指令管理器
         * 用来维护drawData数组
         */
        var WebGLDrawCmdManager = (function () {
            function WebGLDrawCmdManager() {
                /**
                 * 用于缓存绘制命令的数组
                 */
                this.drawData = [];
                this.drawDataLen = 0;
            }
            /**
             * 压入绘制矩形指令
             */
            WebGLDrawCmdManager.prototype.pushDrawRect = function () {
                if (this.drawDataLen == 0 || this.drawData[this.drawDataLen - 1].type != 1 /* RECT */) {
                    var data = this.drawData[this.drawDataLen] || {};
                    data.type = 1 /* RECT */;
                    data.count = 0;
                    this.drawData[this.drawDataLen] = data;
                    this.drawDataLen++;
                }
                this.drawData[this.drawDataLen - 1].count += 2;
            };
            /**
             * 压入绘制texture指令
             */
            WebGLDrawCmdManager.prototype.pushDrawTexture = function (texture, count, filter, textureWidth, textureHeight) {
                if (count === void 0) { count = 2; }
                if (filter) {
                    // 目前有滤镜的情况下不会合并绘制
                    var data = this.drawData[this.drawDataLen] || {};
                    data.type = 0 /* TEXTURE */;
                    data.texture = texture;
                    data.filter = filter;
                    data.count = count;
                    data.textureWidth = textureWidth;
                    data.textureHeight = textureHeight;
                    this.drawData[this.drawDataLen] = data;
                    this.drawDataLen++;
                }
                else {
                    if (this.drawDataLen == 0 || this.drawData[this.drawDataLen - 1].type != 0 /* TEXTURE */ || texture != this.drawData[this.drawDataLen - 1].texture || this.drawData[this.drawDataLen - 1].filter) {
                        var data = this.drawData[this.drawDataLen] || {};
                        data.type = 0 /* TEXTURE */;
                        data.texture = texture;
                        data.count = 0;
                        this.drawData[this.drawDataLen] = data;
                        this.drawDataLen++;
                    }
                    this.drawData[this.drawDataLen - 1].count += count;
                }
            };
            WebGLDrawCmdManager.prototype.pushChangeSmoothing = function (texture, smoothing) {
                texture["smoothing"] = smoothing;
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 10 /* SMOOTHING */;
                data.texture = texture;
                data.smoothing = smoothing;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入pushMask指令
             */
            WebGLDrawCmdManager.prototype.pushPushMask = function (count) {
                if (count === void 0) { count = 1; }
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 2 /* PUSH_MASK */;
                data.count = count * 2;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入popMask指令
             */
            WebGLDrawCmdManager.prototype.pushPopMask = function (count) {
                if (count === void 0) { count = 1; }
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 3 /* POP_MASK */;
                data.count = count * 2;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入混色指令
             */
            WebGLDrawCmdManager.prototype.pushSetBlend = function (value) {
                var len = this.drawDataLen;
                // 有无遍历到有效绘图操作
                var drawState = false;
                for (var i = len - 1; i >= 0; i--) {
                    var data = this.drawData[i];
                    if (data) {
                        if (data.type == 0 /* TEXTURE */ || data.type == 1 /* RECT */) {
                            drawState = true;
                        }
                        // 如果与上一次blend操作之间无有效绘图，上一次操作无效
                        if (!drawState && data.type == 4 /* BLEND */) {
                            this.drawData.splice(i, 1);
                            this.drawDataLen--;
                            continue;
                        }
                        // 如果与上一次blend操作重复，本次操作无效
                        if (data.type == 4 /* BLEND */) {
                            if (data.value == value) {
                                return;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
                var _data = this.drawData[this.drawDataLen] || {};
                _data.type = 4 /* BLEND */;
                _data.value = value;
                this.drawData[this.drawDataLen] = _data;
                this.drawDataLen++;
            };
            /*
             * 压入resize render target命令
             */
            WebGLDrawCmdManager.prototype.pushResize = function (buffer, width, height) {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 5 /* RESIZE_TARGET */;
                data.buffer = buffer;
                data.width = width;
                data.height = height;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /*
             * 压入clear color命令
             */
            WebGLDrawCmdManager.prototype.pushClearColor = function () {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 6 /* CLEAR_COLOR */;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入激活buffer命令
             */
            WebGLDrawCmdManager.prototype.pushActivateBuffer = function (buffer) {
                var len = this.drawDataLen;
                // 有无遍历到有效绘图操作
                var drawState = false;
                for (var i = len - 1; i >= 0; i--) {
                    var data = this.drawData[i];
                    if (data) {
                        if (data.type != 4 /* BLEND */ && data.type != 7 /* ACT_BUFFER */) {
                            drawState = true;
                        }
                        // 如果与上一次buffer操作之间无有效绘图，上一次操作无效
                        if (!drawState && data.type == 7 /* ACT_BUFFER */) {
                            this.drawData.splice(i, 1);
                            this.drawDataLen--;
                            continue;
                        }
                        // 如果与上一次buffer操作重复，本次操作无效
                        // if(data.type == DRAWABLE_TYPE.ACT_BUFFER) {
                        //     if(data.buffer == buffer) {
                        //         return;
                        //     } else {
                        //         break;
                        //     }
                        // }
                    }
                }
                var _data = this.drawData[this.drawDataLen] || {};
                _data.type = 7 /* ACT_BUFFER */;
                _data.buffer = buffer;
                _data.width = buffer.rootRenderTarget.width;
                _data.height = buffer.rootRenderTarget.height;
                this.drawData[this.drawDataLen] = _data;
                this.drawDataLen++;
            };
            /*
             * 压入enabel scissor命令
             */
            WebGLDrawCmdManager.prototype.pushEnableScissor = function (x, y, width, height) {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 8 /* ENABLE_SCISSOR */;
                data.x = x;
                data.y = y;
                data.width = width;
                data.height = height;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /*
             * 压入disable scissor命令
             */
            WebGLDrawCmdManager.prototype.pushDisableScissor = function () {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 9 /* DISABLE_SCISSOR */;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 清空命令数组
             */
            WebGLDrawCmdManager.prototype.clear = function () {
                for (var i = 0; i < this.drawDataLen; i++) {
                    var data = this.drawData[i];
                    data.type = 0;
                    data.count = 0;
                    data.texture = null;
                    data.filter = null;
                    //data.uv = null;
                    data.value = "";
                    data.buffer = null;
                    data.width = 0;
                    data.height = 0;
                    data.textureWidth = 0;
                    data.textureHeight = 0;
                    data.smoothing = false;
                    data.x = 0;
                    data.y = 0;
                }
                this.drawDataLen = 0;
            };
            return WebGLDrawCmdManager;
        }());
        baidugame.WebGLDrawCmdManager = WebGLDrawCmdManager;
        __reflect(WebGLDrawCmdManager.prototype, "egret.baidugame.WebGLDrawCmdManager");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * 顶点数组管理对象
         * 用来维护顶点数组
         */
        var WebGLVertexArrayObject = (function () {
            function WebGLVertexArrayObject() {
                this.size = 2000;
                this.vertexMaxSize = this.size * 4;
                this.indicesMaxSize = this.size * 6;
                this.vertSize = 5;
                this.vertices = null;
                this.indices = null;
                this.indicesForMesh = null;
                this.vertexIndex = 0;
                this.indexIndex = 0;
                this.hasMesh = false;
                var numVerts = this.vertexMaxSize * this.vertSize;
                var numIndices = this.indicesMaxSize;
                this.vertices = new Float32Array(numVerts);
                this.indices = new Uint16Array(numIndices);
                this.indicesForMesh = new Uint16Array(numIndices);
                for (var i = 0, j = 0; i < numIndices; i += 6, j += 4) {
                    this.indices[i + 0] = j + 0;
                    this.indices[i + 1] = j + 1;
                    this.indices[i + 2] = j + 2;
                    this.indices[i + 3] = j + 0;
                    this.indices[i + 4] = j + 2;
                    this.indices[i + 5] = j + 3;
                }
            }
            /**
             * 是否达到最大缓存数量
             */
            WebGLVertexArrayObject.prototype.reachMaxSize = function (vertexCount, indexCount) {
                if (vertexCount === void 0) { vertexCount = 4; }
                if (indexCount === void 0) { indexCount = 6; }
                return this.vertexIndex > this.vertexMaxSize - vertexCount || this.indexIndex > this.indicesMaxSize - indexCount;
            };
            /**
             * 获取缓存完成的顶点数组
             */
            WebGLVertexArrayObject.prototype.getVertices = function () {
                var view = this.vertices.subarray(0, this.vertexIndex * this.vertSize);
                return view;
            };
            /**
             * 获取缓存完成的索引数组
             */
            WebGLVertexArrayObject.prototype.getIndices = function () {
                return this.indices;
            };
            /**
             * 获取缓存完成的mesh索引数组
             */
            WebGLVertexArrayObject.prototype.getMeshIndices = function () {
                return this.indicesForMesh;
            };
            /**
             * 切换成mesh索引缓存方式
             */
            WebGLVertexArrayObject.prototype.changeToMeshIndices = function () {
                if (!this.hasMesh) {
                    // 拷贝默认index信息到for mesh中
                    for (var i = 0, l = this.indexIndex; i < l; ++i) {
                        this.indicesForMesh[i] = this.indices[i];
                    }
                    this.hasMesh = true;
                }
            };
            WebGLVertexArrayObject.prototype.isMesh = function () {
                return this.hasMesh;
            };
            /**
             * 默认构成矩形
             */
            // private defaultMeshVertices = [0, 0, 1, 0, 1, 1, 0, 1];
            // private defaultMeshUvs = [
            //     0, 0,
            //     1, 0,
            //     1, 1,
            //     0, 1
            // ];
            // private defaultMeshIndices = [0, 1, 2, 0, 2, 3];
            /**
             * 缓存一组顶点
             */
            WebGLVertexArrayObject.prototype.cacheArrays = function (buffer, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, textureSourceWidth, textureSourceHeight, meshUVs, meshVertices, meshIndices, rotated) {
                var alpha = buffer.globalAlpha;
                //计算出绘制矩阵，之后把矩阵还原回之前的
                var locWorldTransform = buffer.globalMatrix;
                var a = locWorldTransform.a;
                var b = locWorldTransform.b;
                var c = locWorldTransform.c;
                var d = locWorldTransform.d;
                var tx = locWorldTransform.tx;
                var ty = locWorldTransform.ty;
                var offsetX = buffer.$offsetX;
                var offsetY = buffer.$offsetY;
                if (offsetX != 0 || offsetY != 0) {
                    tx = offsetX * a + offsetY * c + tx;
                    ty = offsetX * b + offsetY * d + ty;
                }
                if (!meshVertices) {
                    if (destX != 0 || destY != 0) {
                        tx = destX * a + destY * c + tx;
                        ty = destX * b + destY * d + ty;
                    }
                    var a1 = destWidth / sourceWidth;
                    if (a1 != 1) {
                        a = a1 * a;
                        b = a1 * b;
                    }
                    var d1 = destHeight / sourceHeight;
                    if (d1 != 1) {
                        c = d1 * c;
                        d = d1 * d;
                    }
                }
                if (meshVertices) {
                    // 计算索引位置与赋值
                    var vertices = this.vertices;
                    var index = this.vertexIndex * this.vertSize;
                    // 缓存顶点数组
                    var i = 0, iD = 0, l = 0;
                    var u = 0, v = 0, x = 0, y = 0;
                    for (i = 0, l = meshUVs.length; i < l; i += 2) {
                        iD = index + i * 5 / 2;
                        x = meshVertices[i];
                        y = meshVertices[i + 1];
                        u = meshUVs[i];
                        v = meshUVs[i + 1];
                        // xy
                        vertices[iD + 0] = a * x + c * y + tx;
                        vertices[iD + 1] = b * x + d * y + ty;
                        // uv
                        if (rotated) {
                            vertices[iD + 2] = (sourceX + (1.0 - v) * sourceHeight) / textureSourceWidth;
                            vertices[iD + 3] = (sourceY + u * sourceWidth) / textureSourceHeight;
                        }
                        else {
                            vertices[iD + 2] = (sourceX + u * sourceWidth) / textureSourceWidth;
                            vertices[iD + 3] = (sourceY + v * sourceHeight) / textureSourceHeight;
                        }
                        // alpha
                        vertices[iD + 4] = alpha;
                    }
                    // 缓存索引数组
                    if (this.hasMesh) {
                        for (var i_1 = 0, l_1 = meshIndices.length; i_1 < l_1; ++i_1) {
                            this.indicesForMesh[this.indexIndex + i_1] = meshIndices[i_1] + this.vertexIndex;
                        }
                    }
                    this.vertexIndex += meshUVs.length / 2;
                    this.indexIndex += meshIndices.length;
                }
                else {
                    var width = textureSourceWidth;
                    var height = textureSourceHeight;
                    var w = sourceWidth;
                    var h = sourceHeight;
                    sourceX = sourceX / width;
                    sourceY = sourceY / height;
                    var vertices = this.vertices;
                    var index = this.vertexIndex * this.vertSize;
                    if (rotated) {
                        var temp = sourceWidth;
                        sourceWidth = sourceHeight / width;
                        sourceHeight = temp / height;
                        // xy
                        vertices[index++] = tx;
                        vertices[index++] = ty;
                        // uv
                        vertices[index++] = sourceWidth + sourceX;
                        vertices[index++] = sourceY;
                        // alpha
                        vertices[index++] = alpha;
                        // xy
                        vertices[index++] = a * w + tx;
                        vertices[index++] = b * w + ty;
                        // uv
                        vertices[index++] = sourceWidth + sourceX;
                        vertices[index++] = sourceHeight + sourceY;
                        // alpha
                        vertices[index++] = alpha;
                        // xy
                        vertices[index++] = a * w + c * h + tx;
                        vertices[index++] = d * h + b * w + ty;
                        // uv
                        vertices[index++] = sourceX;
                        vertices[index++] = sourceHeight + sourceY;
                        // alpha
                        vertices[index++] = alpha;
                        // xy
                        vertices[index++] = c * h + tx;
                        vertices[index++] = d * h + ty;
                        // uv
                        vertices[index++] = sourceX;
                        vertices[index++] = sourceY;
                        // alpha
                        vertices[index++] = alpha;
                    }
                    else {
                        sourceWidth = sourceWidth / width;
                        sourceHeight = sourceHeight / height;
                        // xy
                        vertices[index++] = tx;
                        vertices[index++] = ty;
                        // uv
                        vertices[index++] = sourceX;
                        vertices[index++] = sourceY;
                        // alpha
                        vertices[index++] = alpha;
                        // xy
                        vertices[index++] = a * w + tx;
                        vertices[index++] = b * w + ty;
                        // uv
                        vertices[index++] = sourceWidth + sourceX;
                        vertices[index++] = sourceY;
                        // alpha
                        vertices[index++] = alpha;
                        // xy
                        vertices[index++] = a * w + c * h + tx;
                        vertices[index++] = d * h + b * w + ty;
                        // uv
                        vertices[index++] = sourceWidth + sourceX;
                        vertices[index++] = sourceHeight + sourceY;
                        // alpha
                        vertices[index++] = alpha;
                        // xy
                        vertices[index++] = c * h + tx;
                        vertices[index++] = d * h + ty;
                        // uv
                        vertices[index++] = sourceX;
                        vertices[index++] = sourceHeight + sourceY;
                        // alpha
                        vertices[index++] = alpha;
                    }
                    // 缓存索引数组
                    if (this.hasMesh) {
                        var indicesForMesh = this.indicesForMesh;
                        indicesForMesh[this.indexIndex + 0] = 0 + this.vertexIndex;
                        indicesForMesh[this.indexIndex + 1] = 1 + this.vertexIndex;
                        indicesForMesh[this.indexIndex + 2] = 2 + this.vertexIndex;
                        indicesForMesh[this.indexIndex + 3] = 0 + this.vertexIndex;
                        indicesForMesh[this.indexIndex + 4] = 2 + this.vertexIndex;
                        indicesForMesh[this.indexIndex + 5] = 3 + this.vertexIndex;
                    }
                    this.vertexIndex += 4;
                    this.indexIndex += 6;
                }
            };
            WebGLVertexArrayObject.prototype.clear = function () {
                this.hasMesh = false;
                this.vertexIndex = 0;
                this.indexIndex = 0;
            };
            return WebGLVertexArrayObject;
        }());
        baidugame.WebGLVertexArrayObject = WebGLVertexArrayObject;
        __reflect(WebGLVertexArrayObject.prototype, "egret.baidugame.WebGLVertexArrayObject");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * WebGLRenderTarget
         * A WebGL render target with a frame buffer and texture
         */
        var WebGLRenderTarget = (function (_super) {
            __extends(WebGLRenderTarget, _super);
            function WebGLRenderTarget(gl, width, height) {
                var _this = _super.call(this) || this;
                _this.clearColor = [0, 0, 0, 0];
                /**
                 * If frame buffer is enabled, the default is true
                 */
                _this.useFrameBuffer = true;
                _this.gl = gl;
                _this._resize(width, height);
                return _this;
            }
            WebGLRenderTarget.prototype._resize = function (width, height) {
                // Chrome alerts if the size is 0
                width = width || 1;
                height = height || 1;
                if (width < 1) {
                    if (true) {
                        egret.warn('WebGLRenderTarget _resize width = ' + width);
                    }
                    width = 1;
                }
                if (height < 1) {
                    if (true) {
                        egret.warn('WebGLRenderTarget _resize height = ' + height);
                    }
                    height = 1;
                }
                this.width = width;
                this.height = height;
            };
            WebGLRenderTarget.prototype.resize = function (width, height) {
                this._resize(width, height);
                var gl = this.gl;
                if (this.frameBuffer) {
                    gl.bindTexture(gl.TEXTURE_2D, this.texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                    // gl.bindTexture(gl.TEXTURE_2D, null);
                }
                if (this.stencilBuffer) {
                    gl.deleteRenderbuffer(this.stencilBuffer);
                    this.stencilBuffer = null;
                }
            };
            WebGLRenderTarget.prototype.activate = function () {
                var gl = this.gl;
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.getFrameBuffer());
            };
            WebGLRenderTarget.prototype.getFrameBuffer = function () {
                if (!this.useFrameBuffer) {
                    return null;
                }
                return this.frameBuffer;
            };
            WebGLRenderTarget.prototype.initFrameBuffer = function () {
                if (!this.frameBuffer) {
                    var gl = this.gl;
                    this.texture = this.createTexture();
                    this.frameBuffer = gl.createFramebuffer();
                    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
                }
            };
            WebGLRenderTarget.prototype.createTexture = function () {
                var gl = this.gl;
                var texture = gl.createTexture();
                texture[egret.glContext] = gl;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                return texture;
            };
            WebGLRenderTarget.prototype.clear = function (bind) {
                var gl = this.gl;
                if (bind) {
                    this.activate();
                }
                gl.colorMask(true, true, true, true);
                gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
                gl.clear(gl.COLOR_BUFFER_BIT);
            };
            WebGLRenderTarget.prototype.enabledStencil = function () {
                if (!this.frameBuffer || this.stencilBuffer) {
                    return;
                }
                var gl = this.gl;
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                this.stencilBuffer = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencilBuffer);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencilBuffer);
                // Is unbundling a bug here?
                // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            };
            WebGLRenderTarget.prototype.dispose = function () {
                egret.WebGLUtils.deleteWebGLTexture(this.texture);
            };
            return WebGLRenderTarget;
        }(egret.HashObject));
        baidugame.WebGLRenderTarget = WebGLRenderTarget;
        __reflect(WebGLRenderTarget.prototype, "egret.baidugame.WebGLRenderTarget");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var WEBGL_ATTRIBUTE_TYPE;
        (function (WEBGL_ATTRIBUTE_TYPE) {
            WEBGL_ATTRIBUTE_TYPE[WEBGL_ATTRIBUTE_TYPE["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
            WEBGL_ATTRIBUTE_TYPE[WEBGL_ATTRIBUTE_TYPE["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
            WEBGL_ATTRIBUTE_TYPE[WEBGL_ATTRIBUTE_TYPE["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
            WEBGL_ATTRIBUTE_TYPE[WEBGL_ATTRIBUTE_TYPE["FLOAT"] = 5126] = "FLOAT";
            WEBGL_ATTRIBUTE_TYPE[WEBGL_ATTRIBUTE_TYPE["BYTE"] = 65535] = "BYTE";
            WEBGL_ATTRIBUTE_TYPE[WEBGL_ATTRIBUTE_TYPE["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
            WEBGL_ATTRIBUTE_TYPE[WEBGL_ATTRIBUTE_TYPE["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        })(WEBGL_ATTRIBUTE_TYPE = baidugame.WEBGL_ATTRIBUTE_TYPE || (baidugame.WEBGL_ATTRIBUTE_TYPE = {}));
        /**
         * @private
         */
        var WEBGL_UNIFORM_TYPE;
        (function (WEBGL_UNIFORM_TYPE) {
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT_VEC2"] = 35667] = "INT_VEC2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT_VEC3"] = 35668] = "INT_VEC3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT_VEC4"] = 35669] = "INT_VEC4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL"] = 35670] = "BOOL";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BYTE"] = 65535] = "BYTE";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["SHORT"] = 5122] = "SHORT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT"] = 5124] = "INT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT"] = 5126] = "FLOAT";
        })(WEBGL_UNIFORM_TYPE = baidugame.WEBGL_UNIFORM_TYPE || (baidugame.WEBGL_UNIFORM_TYPE = {}));
        /*
        * 覆盖掉系统的 createCanvas
        */
        function mainCanvas(width, height) {
            return window['canvas'];
        }
        egret.sys.mainCanvas = mainCanvas;
        function createCanvas(width, height) {
            var canvas = document.createElement("canvas");
            if (!isNaN(width) && !isNaN(height)) {
                canvas.width = width;
                canvas.height = height;
            }
            return canvas;
        }
        egret.sys.createCanvas = createCanvas;
        /*
        * 覆盖掉系统的 resizeContext
        */
        function resizeContext(renderContext, width, height, useMaxSize) {
            if (!renderContext) {
                return;
            }
            var webglrendercontext = renderContext;
            var surface = webglrendercontext.surface;
            if (useMaxSize) {
                if (surface.width < width) {
                    surface.width = width;
                }
                if (surface.height < height) {
                    surface.height = height;
                }
            }
            else {
                if (surface.width !== width) {
                    surface.width = width;
                }
                if (surface.height !== height) {
                    surface.height = height;
                }
            }
            webglrendercontext.onResize();
        }
        baidugame.resizeContext = resizeContext;
        egret.sys.resizeContext = resizeContext;
        /**
         * sys.getContextWebGL
         */
        function getContextWebGL(surface) {
            return surface ? surface.getContext('webgl') : null;
        }
        egret.sys.getContextWebGL = getContextWebGL;
        /**
         * sys.getContext2d
         */
        function getContext2d(surface) {
            return surface ? surface.getContext('2d') : null;
        }
        baidugame.getContext2d = getContext2d;
        egret.sys.getContext2d = getContext2d;
        /**
         * 覆盖掉系统的createTexture
         */
        function createTexture(renderContext, bitmapData) {
            var webglrendercontext = renderContext;
            var gl = webglrendercontext.context;
            if (bitmapData.isCanvas && gl.wxBindCanvasTexture) {
                return bitmapData;
            }
            var texture = gl.createTexture();
            if (!texture) {
                //先创建texture失败,然后lost事件才发出来..
                webglrendercontext.contextLost = true;
                return null;
            }
            texture.glContext = gl;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmapData);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            if (bitmapData.source) {
                bitmapData.source.src = "";
            }
            return texture;
        }
        egret.sys.createTexture = createTexture;
        /**
         * 覆盖掉系统的createTexture
         */
        function _createTexture(renderContext, width, height, data) {
            var webglrendercontext = renderContext;
            var gl = webglrendercontext.context;
            var texture = gl.createTexture();
            if (!texture) {
                //先创建texture失败,然后lost事件才发出来..
                webglrendercontext.contextLost = true;
                return null;
            }
            //
            texture[egret.glContext] = gl;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            return texture;
        }
        egret.sys._createTexture = _createTexture;
        /**
        * 覆盖掉系统的drawTextureElements
        **/
        function drawTextureElements(renderContext, data, offset) {
            var webglrendercontext = renderContext;
            var gl = webglrendercontext.context;
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, data.texture);
            var size = data.count * 3;
            gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
            return size;
        }
        egret.sys.drawTextureElements = drawTextureElements;
        /**
         * 测量文本的宽度
         * @param context
         * @param text
         */
        function measureTextWith(context, text) {
            return context.measureText(text).width;
        }
        egret.sys.measureTextWith = measureTextWith;
        /**
         * 为CanvasRenderBuffer创建一个HTMLCanvasElement
         * @param defaultFunc
         * @param width
         * @param height
         * @param root
         */
        function createCanvasRenderBufferSurface(defaultFunc, width, height, root) {
            if (root) {
                return window["canvas"];
            }
            else {
                return defaultFunc(width, height);
            }
        }
        egret.sys.createCanvasRenderBufferSurface = createCanvasRenderBufferSurface;
        /**
         * 改变渲染缓冲的大小并清空缓冲区
         * @param renderContext
         * @param width
         * @param height
         * @param useMaxSize
         */
        function resizeCanvasRenderBuffer(renderContext, width, height, useMaxSize) {
            var canvasRenderBuffer = renderContext;
            var surface = canvasRenderBuffer.surface;
            if (useMaxSize) {
                var change = false;
                if (surface.width < width) {
                    surface.width = width;
                    change = true;
                }
                if (surface.height < height) {
                    surface.height = height;
                    change = true;
                }
                //尺寸没有变化时,将绘制属性重置
                if (!change) {
                    canvasRenderBuffer.context.globalCompositeOperation = "source-over";
                    canvasRenderBuffer.context.setTransform(1, 0, 0, 1, 0, 0);
                    canvasRenderBuffer.context.globalAlpha = 1;
                }
            }
            else {
                if (surface.width != width) {
                    surface.width = width;
                }
                if (surface.height != height) {
                    surface.height = height;
                }
            }
            canvasRenderBuffer.clear();
        }
        egret.sys.resizeCanvasRenderBuffer = resizeCanvasRenderBuffer;
        egret.Geolocation = egret.baidugame.WebGeolocation;
        egret.Motion = egret.baidugame.WebMotion;
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
// window["sharedCanvas"].isCanvas = true;
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        //TO DO
        var debugLogCompressedTextureNotSupported = {};
        /**
         * @private
         * WebGL上下文对象，提供简单的绘图接口
         * 抽象出此类，以实现共用一个context
         */
        var WebGLRenderContext = (function () {
            function WebGLRenderContext(width, height) {
                //
                this._defaultEmptyTexture = null;
                this.glID = null;
                this.projectionX = NaN;
                this.projectionY = NaN;
                this.contextLost = false;
                //refactor
                this._supportedCompressedTextureInfo = [];
                this.$scissorState = false;
                this.vertSize = 5;
                this.surface = egret.sys.mainCanvas(width, height);
                if (egret.nativeRender) {
                    return;
                }
                this.initWebGL();
                this.$bufferStack = [];
                var gl = this.context;
                this.vertexBuffer = gl.createBuffer();
                this.indexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                this.drawCmdManager = new baidugame.WebGLDrawCmdManager();
                this.vao = new baidugame.WebGLVertexArrayObject();
                this.setGlobalCompositeOperation("source-over");
            }
            WebGLRenderContext.getInstance = function (width, height) {
                if (this.instance) {
                    return this.instance;
                }
                this.instance = new WebGLRenderContext(width, height);
                return this.instance;
            };
            /**
             * 推入一个RenderBuffer并绑定
             */
            WebGLRenderContext.prototype.pushBuffer = function (buffer) {
                this.$bufferStack.push(buffer);
                if (buffer != this.currentBuffer) {
                    if (this.currentBuffer) {
                        // this.$drawWebGL();
                    }
                    this.drawCmdManager.pushActivateBuffer(buffer);
                }
                this.currentBuffer = buffer;
            };
            /**
             * 推出一个RenderBuffer并绑定上一个RenderBuffer
             */
            WebGLRenderContext.prototype.popBuffer = function () {
                // 如果只剩下一个buffer，则不执行pop操作
                // 保证舞台buffer永远在最开始
                if (this.$bufferStack.length <= 1) {
                    return;
                }
                var buffer = this.$bufferStack.pop();
                var lastBuffer = this.$bufferStack[this.$bufferStack.length - 1];
                // 重新绑定
                if (buffer != lastBuffer) {
                    // this.$drawWebGL();
                    this.drawCmdManager.pushActivateBuffer(lastBuffer);
                }
                this.currentBuffer = lastBuffer;
            };
            /**
             * 启用RenderBuffer
             */
            WebGLRenderContext.prototype.activateBuffer = function (buffer, width, height) {
                buffer.rootRenderTarget.activate();
                if (!this.bindIndices) {
                    this.uploadIndicesArray(this.vao.getIndices());
                }
                buffer.restoreStencil();
                buffer.restoreScissor();
                this.onResize(width, height);
            };
            /**
             * 上传顶点数据
             */
            WebGLRenderContext.prototype.uploadVerticesArray = function (array) {
                var gl = this.context;
                gl.bufferData(gl.ARRAY_BUFFER, array, gl.STREAM_DRAW);
                // gl.bufferSubData(gl.ARRAY_BUFFER, 0, array);
            };
            /**
             * 上传索引数据
             */
            WebGLRenderContext.prototype.uploadIndicesArray = function (array) {
                var gl = this.context;
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
                this.bindIndices = true;
            };
            /**
             * 销毁绘制对象
             */
            WebGLRenderContext.prototype.destroy = function () {
                this.surface.width = this.surface.height = 0;
            };
            WebGLRenderContext.prototype.onResize = function (width, height) {
                width = width || this.surface.width;
                height = height || this.surface.height;
                this.projectionX = width / 2;
                this.projectionY = -height / 2;
                if (this.context) {
                    this.context.viewport(0, 0, width, height);
                }
            };
            /**
             * 改变渲染缓冲的大小并清空缓冲区
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param useMaxSize 若传入true，则将改变后的尺寸与已有尺寸对比，保留较大的尺寸。
             */
            WebGLRenderContext.prototype.resize = function (width, height, useMaxSize) {
                egret.sys.resizeContext(this, width, height, useMaxSize);
                /*
                let surface = this.surface;
                if (useMaxSize) {
                    if (surface.width < width) {
                        surface.width = width;
                    }
                    if (surface.height < height) {
                        surface.height = height;
                    }
                }
                else {
                    if (surface.width != width) {
                        surface.width = width;
                    }
                    if (surface.height != height) {
                        surface.height = height;
                    }
                }
    
                this.onResize();
                */
            };
            WebGLRenderContext.prototype._buildSupportedCompressedTextureInfo = function (/*gl: WebGLRenderingContext, compressedTextureExNames: string[],*/ extensions) {
                // if (compressedTextureExNames.length === 0) {
                //     return [];
                // }
                var returnValue = [];
                // for (const exName of compressedTextureExNames) {
                //     const extension = gl.getExtension(exName);
                for (var _i = 0, extensions_1 = extensions; _i < extensions_1.length; _i++) {
                    var extension = extensions_1[_i];
                    if (!extension) {
                        continue;
                    }
                    var info = {
                        extensionName: extension.name,
                        supportedFormats: []
                    };
                    //
                    for (var key in extension) {
                        info.supportedFormats.push([key, extension[key]]);
                    }
                    //
                    if (true) {
                        if (info.supportedFormats.length === 0) {
                            console.error('buildSupportedCompressedTextureInfo failed = ' + extension.name);
                        }
                        else {
                            egret.log('support: ' + extension.name);
                            for (var key in extension) {
                                egret.log(key, extension[key], '0x' + extension[key].toString(16));
                            }
                        }
                    }
                    returnValue.push(info);
                }
                return returnValue;
            };
            WebGLRenderContext.prototype.initWebGL = function () {
                this.onResize();
                this.surface.addEventListener("webglcontextlost", this.handleContextLost.bind(this), false);
                this.surface.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), false);
                this.getWebGLContext();
                var gl = this.context;
                this.$maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
                //refactor
                // this._caps.astc = this._gl.getExtension('WEBGL_compressed_texture_astc') || this._gl.getExtension('WEBKIT_WEBGL_compressed_texture_astc');
                // this._caps.s3tc = this._gl.getExtension('WEBGL_compressed_texture_s3tc') || this._gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
                // this._caps.pvrtc = this._gl.getExtension('WEBGL_compressed_texture_pvrtc') || this._gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
                // this._caps.etc1 = this._gl.getExtension('WEBGL_compressed_texture_etc1') || this._gl.getExtension('WEBKIT_WEBGL_compressed_texture_etc1');
                // this._caps.etc2 = this._gl.getExtension('WEBGL_compressed_texture_etc') || this._gl.getExtension('WEBKIT_WEBGL_compressed_texture_etc') ||
                //     this._gl.getExtension('WEBGL_compressed_texture_es3_0'); // also a requirement of OpenGL ES 3
                // const compressedTextureExNames = [
                //     'WEBGL_compressed_texture_pvrtc', 'WEBKIT_WEBGL_compressed_texture_pvrtc',
                //     'WEBGL_compressed_texture_etc1', 'WEBKIT_WEBGL_compressed_texture_etc1',
                //     'WEBGL_compressed_texture_etc', 'WEBKIT_WEBGL_compressed_texture_etc',
                //     'WEBGL_compressed_texture_astc', 'WEBKIT_WEBGL_compressed_texture_astc',
                //     'WEBGL_compressed_texture_s3tc', 'WEBKIT_WEBGL_compressed_texture_s3tc',
                //     'WEBGL_compressed_texture_es3_0'];
                //
                this.pvrtc = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
                if (this.pvrtc) {
                    this.pvrtc.name = 'WEBGL_compressed_texture_pvrtc';
                }
                //
                this.etc1 = gl.getExtension('WEBGL_compressed_texture_etc1') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_etc1');
                if (this.etc1) {
                    this.etc1.name = 'WEBGL_compressed_texture_etc1';
                }
                //
                egret.Capabilities.supportedCompressedTexture = egret.Capabilities.supportedCompressedTexture || {};
                egret.Capabilities.supportedCompressedTexture.pvrtc = !!this.pvrtc;
                egret.Capabilities.supportedCompressedTexture.etc1 = !!this.etc1;
                //
                this._supportedCompressedTextureInfo = this._buildSupportedCompressedTextureInfo(/*this.context, compressedTextureExNames,*/ [this.etc1, this.pvrtc]);
            };
            WebGLRenderContext.prototype.handleContextLost = function () {
                this.contextLost = true;
            };
            WebGLRenderContext.prototype.handleContextRestored = function () {
                this.initWebGL();
                this.contextLost = false;
            };
            WebGLRenderContext.prototype.getWebGLContext = function () {
                /*
                let options = {
                    antialias: WebGLRenderContext.antialias,
                    stencil: true//设置可以使用模板（用于不规则遮罩）
                };
                let gl: any;
                //todo 是否使用chrome源码names
                //let contextNames = ["moz-webgl", "webkit-3d", "experimental-webgl", "webgl", "3d"];
                let names = ["webgl", "experimental-webgl"];
                for (let i = 0; i < names.length; i++) {
                    try {
                        gl = this.surface.getContext(names[i], options);
                    } catch (e) {
                    }
                    if (gl) {
                        break;
                    }
                }
                if (!gl) {
                    $error(1021);
                }
                */
                var gl = egret.sys.getContextWebGL(this.surface);
                this.setContext(gl);
            };
            WebGLRenderContext.prototype.setContext = function (gl) {
                this.context = gl;
                gl.id = WebGLRenderContext.glContextId++;
                this.glID = gl.id;
                gl.disable(gl.DEPTH_TEST);
                gl.disable(gl.CULL_FACE);
                gl.enable(gl.BLEND);
                gl.colorMask(true, true, true, true);
                // 目前只使用0号材质单元，默认开启
                gl.activeTexture(gl.TEXTURE0);
            };
            /**
             * 开启模版检测
             */
            WebGLRenderContext.prototype.enableStencilTest = function () {
                var gl = this.context;
                gl.enable(gl.STENCIL_TEST);
            };
            /**
             * 关闭模版检测
             */
            WebGLRenderContext.prototype.disableStencilTest = function () {
                var gl = this.context;
                gl.disable(gl.STENCIL_TEST);
            };
            /**
             * 开启scissor检测
             */
            WebGLRenderContext.prototype.enableScissorTest = function (rect) {
                var gl = this.context;
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(rect.x, rect.y, rect.width, rect.height);
            };
            /**
             * 关闭scissor检测
             */
            WebGLRenderContext.prototype.disableScissorTest = function () {
                var gl = this.context;
                gl.disable(gl.SCISSOR_TEST);
            };
            /**
             * 获取像素信息
             */
            WebGLRenderContext.prototype.getPixels = function (x, y, width, height, pixels) {
                var gl = this.context;
                gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            };
            /**
             * 创建一个WebGLTexture
             */
            WebGLRenderContext.prototype.createTexture = function (bitmapData) {
                return egret.sys.createTexture(this, bitmapData);
                /*
                let gl: any = this.context;
    
                let texture = gl.createTexture();
    
                if (!texture) {
                    //先创建texture失败,然后lost事件才发出来..
                    this.contextLost = true;
                    return;
                }
                texture[glContext] = gl;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmapData as any);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                return texture;
                */
            };
            /*
            * TO DO
            */
            WebGLRenderContext.prototype.checkCompressedTextureInternalFormat = function (supportedCompressedTextureInfo, internalFormat) {
                //width: number, height: number max ?
                for (var i = 0, length_1 = supportedCompressedTextureInfo.length; i < length_1; ++i) {
                    var ss = supportedCompressedTextureInfo[i];
                    // const formats = ss._COMPRESSED_TEXTURE_FORMATS_;
                    // for (let j = 0, length = formats.length; j < length; ++j) {
                    //     if (formats[j] === internalFormat) {
                    //         return true;
                    //     }
                    // }
                    var supportedFormats = ss.supportedFormats;
                    for (var j = 0, length_2 = supportedFormats.length; j < length_2; ++j) {
                        if (supportedFormats[j][1] === internalFormat) {
                            return true;
                        }
                    }
                }
                return false;
            };
            /*
            * TO DO
            */
            WebGLRenderContext.prototype.$debugLogCompressedTextureNotSupported = function (supportedCompressedTextureInfo, internalFormat) {
                if (!debugLogCompressedTextureNotSupported[internalFormat]) {
                    debugLogCompressedTextureNotSupported[internalFormat] = true;
                    egret.log('internalFormat = ' + internalFormat + ':' + ('0x' + internalFormat.toString(16)) + ', the current hardware does not support the corresponding compression format.');
                    for (var i = 0, length_3 = supportedCompressedTextureInfo.length; i < length_3; ++i) {
                        var ss = supportedCompressedTextureInfo[i];
                        if (ss.supportedFormats.length > 0) {
                            egret.log('support = ' + ss.extensionName);
                            for (var j = 0, length_4 = ss.supportedFormats.length; j < length_4; ++j) {
                                var tp = ss.supportedFormats[j];
                                egret.log(tp[0] + ' : ' + tp[1] + ' : ' + ('0x' + tp[1].toString(16)));
                            }
                        }
                    }
                }
            };
            //
            WebGLRenderContext.prototype.createCompressedTexture = function (data, width, height, levels, internalFormat) {
                var checkSupported = this.checkCompressedTextureInternalFormat(this._supportedCompressedTextureInfo, internalFormat);
                if (!checkSupported) {
                    this.$debugLogCompressedTextureNotSupported(this._supportedCompressedTextureInfo, internalFormat);
                    return this.defaultEmptyTexture;
                }
                ///
                var gl = this.context;
                var texture = gl.createTexture();
                if (!texture) {
                    this.contextLost = true;
                    return;
                }
                texture[egret.glContext] = gl;
                texture[egret.is_compressed_texture] = true;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                gl.compressedTexImage2D(gl.TEXTURE_2D, levels, internalFormat, width, height, 0, data);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.bindTexture(gl.TEXTURE_2D, null);
                return texture;
            };
            /**
             * 更新材质的bitmapData
             */
            WebGLRenderContext.prototype.updateTexture = function (texture, bitmapData) {
                var gl = this.context;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmapData);
            };
            Object.defineProperty(WebGLRenderContext.prototype, "defaultEmptyTexture", {
                get: function () {
                    if (!this._defaultEmptyTexture) {
                        var size = 16;
                        var canvas = egret.sys.createCanvas(size, size);
                        var context = egret.sys.getContext2d(canvas); //canvas.getContext('2d');
                        context.fillStyle = 'white';
                        context.fillRect(0, 0, size, size);
                        this._defaultEmptyTexture = this.createTexture(canvas);
                        this._defaultEmptyTexture[egret.engine_default_empty_texture] = true;
                    }
                    return this._defaultEmptyTexture;
                },
                enumerable: true,
                configurable: true
            });
            WebGLRenderContext.prototype.getWebGLTexture = function (bitmapData) {
                if (!bitmapData.webGLTexture) {
                    if (bitmapData.format == "image" && !bitmapData.hasCompressed2d()) {
                        bitmapData.webGLTexture = this.createTexture(bitmapData.source);
                    }
                    else if (bitmapData.hasCompressed2d()) {
                        var compressedData = bitmapData.getCompressed2dTextureData();
                        bitmapData.webGLTexture = this.createCompressedTexture(compressedData.byteArray, compressedData.width, compressedData.height, compressedData.level, compressedData.glInternalFormat);
                        ///
                        var etcAlphaMask = bitmapData.etcAlphaMask;
                        if (etcAlphaMask) {
                            var maskTexture = this.getWebGLTexture(etcAlphaMask);
                            if (maskTexture) {
                                bitmapData.webGLTexture[egret.etc_alpha_mask] = maskTexture;
                            }
                        }
                    }
                    if (bitmapData.$deleteSource && bitmapData.webGLTexture) {
                        if (bitmapData.source) {
                            // WeChat Memory leakage bug
                            bitmapData.source.src = '';
                            bitmapData.source = null;
                        }
                        bitmapData.clearCompressedTextureData();
                    }
                    if (bitmapData.webGLTexture) {
                        //todo 默认值
                        bitmapData.webGLTexture["smoothing"] = true;
                    }
                }
                return bitmapData.webGLTexture;
            };
            /**
             * 清除矩形区域
             */
            WebGLRenderContext.prototype.clearRect = function (x, y, width, height) {
                if (x != 0 || y != 0 || width != this.surface.width || height != this.surface.height) {
                    var buffer = this.currentBuffer;
                    if (buffer.$hasScissor) {
                        this.setGlobalCompositeOperation("destination-out");
                        this.drawRect(x, y, width, height);
                        this.setGlobalCompositeOperation("source-over");
                    }
                    else {
                        var m = buffer.globalMatrix;
                        if (m.b == 0 && m.c == 0) {
                            x = x * m.a + m.tx;
                            y = y * m.d + m.ty;
                            width = width * m.a;
                            height = height * m.d;
                            this.enableScissor(x, -y - height + buffer.height, width, height);
                            this.clear();
                            this.disableScissor();
                        }
                        else {
                            this.setGlobalCompositeOperation("destination-out");
                            this.drawRect(x, y, width, height);
                            this.setGlobalCompositeOperation("source-over");
                        }
                    }
                }
                else {
                    this.clear();
                }
            };
            /**
             * 设置混色
             */
            WebGLRenderContext.prototype.setGlobalCompositeOperation = function (value) {
                this.drawCmdManager.pushSetBlend(value);
            };
            /**
             * 绘制图片，image参数可以是BitmapData或者renderTarget
             */
            WebGLRenderContext.prototype.drawImage = function (image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, rotated, smoothing) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !image || !buffer) {
                    return;
                }
                var texture;
                var offsetX;
                var offsetY;
                if (image["texture"] || (image.source && image.source["texture"])) {
                    // 如果是render target
                    texture = image["texture"] || image.source["texture"];
                    buffer.saveTransform();
                    offsetX = buffer.$offsetX;
                    offsetY = buffer.$offsetY;
                    buffer.useOffset();
                    buffer.transform(1, 0, 0, -1, 0, destHeight + destY * 2); // 翻转
                }
                else if (!image.source && !image.webGLTexture) {
                    return;
                }
                else {
                    texture = this.getWebGLTexture(image);
                }
                if (!texture) {
                    return;
                }
                this.drawTexture(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, undefined, undefined, undefined, undefined, rotated, smoothing);
                if (image.source && image.source["texture"]) {
                    buffer.$offsetX = offsetX;
                    buffer.$offsetY = offsetY;
                    buffer.restoreTransform();
                }
            };
            /**
             * 绘制Mesh
             */
            WebGLRenderContext.prototype.drawMesh = function (image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, meshUVs, meshVertices, meshIndices, bounds, rotated, smoothing) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !image || !buffer) {
                    return;
                }
                var texture;
                var offsetX;
                var offsetY;
                if (image["texture"] || (image.source && image.source["texture"])) {
                    // 如果是render target
                    texture = image["texture"] || image.source["texture"];
                    buffer.saveTransform();
                    offsetX = buffer.$offsetX;
                    offsetY = buffer.$offsetY;
                    buffer.useOffset();
                    buffer.transform(1, 0, 0, -1, 0, destHeight + destY * 2); // 翻转
                }
                else if (!image.source && !image.webGLTexture) {
                    return;
                }
                else {
                    texture = this.getWebGLTexture(image);
                }
                if (!texture) {
                    return;
                }
                this.drawTexture(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, meshUVs, meshVertices, meshIndices, bounds, rotated, smoothing);
                if (image["texture"] || (image.source && image.source["texture"])) {
                    buffer.$offsetX = offsetX;
                    buffer.$offsetY = offsetY;
                    buffer.restoreTransform();
                }
            };
            /**
             * 绘制材质
             */
            WebGLRenderContext.prototype.drawTexture = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, textureWidth, textureHeight, meshUVs, meshVertices, meshIndices, bounds, rotated, smoothing) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !texture || !buffer) {
                    return;
                }
                if (meshVertices && meshIndices) {
                    if (this.vao.reachMaxSize(meshVertices.length / 2, meshIndices.length)) {
                        this.$drawWebGL();
                    }
                }
                else {
                    if (this.vao.reachMaxSize()) {
                        this.$drawWebGL();
                    }
                }
                if (smoothing != undefined && texture["smoothing"] != smoothing) {
                    this.drawCmdManager.pushChangeSmoothing(texture, smoothing);
                }
                if (meshUVs) {
                    this.vao.changeToMeshIndices();
                }
                var count = meshIndices ? meshIndices.length / 3 : 2;
                // 应用$filter，因为只可能是colorMatrixFilter，最后两个参数可不传
                this.drawCmdManager.pushDrawTexture(texture, count, this.$filter, textureWidth, textureHeight);
                this.vao.cacheArrays(buffer, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, textureWidth, textureHeight, meshUVs, meshVertices, meshIndices, rotated);
            };
            /**
             * 绘制矩形（仅用于遮罩擦除等）
             */
            WebGLRenderContext.prototype.drawRect = function (x, y, width, height) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !buffer) {
                    return;
                }
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                this.drawCmdManager.pushDrawRect();
                this.vao.cacheArrays(buffer, 0, 0, width, height, x, y, width, height, width, height);
            };
            /**
             * 绘制遮罩
             */
            WebGLRenderContext.prototype.pushMask = function (x, y, width, height) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !buffer) {
                    return;
                }
                buffer.$stencilList.push({ x: x, y: y, width: width, height: height });
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                this.drawCmdManager.pushPushMask();
                this.vao.cacheArrays(buffer, 0, 0, width, height, x, y, width, height, width, height);
            };
            /**
             * 恢复遮罩
             */
            WebGLRenderContext.prototype.popMask = function () {
                var buffer = this.currentBuffer;
                if (this.contextLost || !buffer) {
                    return;
                }
                var mask = buffer.$stencilList.pop();
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                this.drawCmdManager.pushPopMask();
                this.vao.cacheArrays(buffer, 0, 0, mask.width, mask.height, mask.x, mask.y, mask.width, mask.height, mask.width, mask.height);
            };
            /**
             * 清除颜色缓存
             */
            WebGLRenderContext.prototype.clear = function () {
                this.drawCmdManager.pushClearColor();
            };
            /**
             * 开启scissor test
             */
            WebGLRenderContext.prototype.enableScissor = function (x, y, width, height) {
                var buffer = this.currentBuffer;
                this.drawCmdManager.pushEnableScissor(x, y, width, height);
                buffer.$hasScissor = true;
            };
            /**
             * 关闭scissor test
             */
            WebGLRenderContext.prototype.disableScissor = function () {
                var buffer = this.currentBuffer;
                this.drawCmdManager.pushDisableScissor();
                buffer.$hasScissor = false;
            };
            WebGLRenderContext.prototype.$drawWebGL = function () {
                if (this.drawCmdManager.drawDataLen == 0 || this.contextLost) {
                    return;
                }
                this.uploadVerticesArray(this.vao.getVertices());
                // 有mesh，则使用indicesForMesh
                if (this.vao.isMesh()) {
                    this.uploadIndicesArray(this.vao.getMeshIndices());
                }
                var length = this.drawCmdManager.drawDataLen;
                var offset = 0;
                for (var i = 0; i < length; i++) {
                    var data = this.drawCmdManager.drawData[i];
                    offset = this.drawData(data, offset);
                    // 计算draw call
                    if (data.type == 7 /* ACT_BUFFER */) {
                        this.activatedBuffer = data.buffer;
                    }
                    if (data.type == 0 /* TEXTURE */ || data.type == 1 /* RECT */ || data.type == 2 /* PUSH_MASK */ || data.type == 3 /* POP_MASK */) {
                        if (this.activatedBuffer && this.activatedBuffer.$computeDrawCall) {
                            this.activatedBuffer.$drawCalls++;
                        }
                    }
                }
                // 切换回默认indices
                if (this.vao.isMesh()) {
                    this.uploadIndicesArray(this.vao.getIndices());
                }
                // 清空数据
                this.drawCmdManager.clear();
                this.vao.clear();
            };
            /**
             * 执行绘制命令
             */
            WebGLRenderContext.prototype.drawData = function (data, offset) {
                if (!data) {
                    return;
                }
                var gl = this.context;
                var program;
                var filter = data.filter;
                switch (data.type) {
                    case 0 /* TEXTURE */:
                        //这段的切换可以优化
                        if (filter) {
                            if (filter.type === "custom") {
                                program = baidugame.EgretWebGLProgram.getProgram(gl, filter.$vertexSrc, filter.$fragmentSrc, filter.$shaderKey);
                            }
                            else if (filter.type === "colorTransform") {
                                if (data.texture[egret.etc_alpha_mask]) {
                                    gl.activeTexture(gl.TEXTURE1);
                                    gl.bindTexture(gl.TEXTURE_2D, data.texture[egret.etc_alpha_mask]);
                                    program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.colorTransform_frag_etc_alphamask_frag, "colorTransform_frag_etc_alphamask_frag");
                                }
                                else {
                                    program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.colorTransform_frag, "colorTransform");
                                }
                            }
                            else if (filter.type === "blurX") {
                                program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.blur_frag, "blur");
                            }
                            else if (filter.type === "blurY") {
                                program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.blur_frag, "blur");
                            }
                            else if (filter.type === "glow") {
                                program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.glow_frag, "glow");
                            }
                        }
                        else {
                            if (data.texture[egret.etc_alpha_mask]) {
                                program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.texture_etc_alphamask_frag, egret.etc_alpha_mask);
                                ///need refactor
                                gl.activeTexture(gl.TEXTURE1);
                                gl.bindTexture(gl.TEXTURE_2D, data.texture[egret.etc_alpha_mask]);
                            }
                            else {
                                program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.texture_frag, "texture");
                            }
                        }
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawTextureElements(data, offset);
                        break;
                    case 1 /* RECT */:
                        program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.primitive_frag, "primitive");
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawRectElements(data, offset);
                        break;
                    case 2 /* PUSH_MASK */:
                        program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.primitive_frag, "primitive");
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawPushMaskElements(data, offset);
                        break;
                    case 3 /* POP_MASK */:
                        program = baidugame.EgretWebGLProgram.getProgram(gl, baidugame.EgretShaderLib.default_vert, baidugame.EgretShaderLib.primitive_frag, "primitive");
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawPopMaskElements(data, offset);
                        break;
                    case 4 /* BLEND */:
                        this.setBlendMode(data.value);
                        break;
                    case 5 /* RESIZE_TARGET */:
                        data.buffer.rootRenderTarget.resize(data.width, data.height);
                        this.onResize(data.width, data.height);
                        break;
                    case 6 /* CLEAR_COLOR */:
                        if (this.activatedBuffer) {
                            var target = this.activatedBuffer.rootRenderTarget;
                            if (target.width != 0 || target.height != 0) {
                                target.clear(true);
                            }
                        }
                        break;
                    case 7 /* ACT_BUFFER */:
                        this.activateBuffer(data.buffer, data.width, data.height);
                        break;
                    case 8 /* ENABLE_SCISSOR */:
                        var buffer = this.activatedBuffer;
                        if (buffer) {
                            if (buffer.rootRenderTarget) {
                                buffer.rootRenderTarget.enabledStencil();
                            }
                            buffer.enableScissor(data.x, data.y, data.width, data.height);
                        }
                        break;
                    case 9 /* DISABLE_SCISSOR */:
                        buffer = this.activatedBuffer;
                        if (buffer) {
                            buffer.disableScissor();
                        }
                        break;
                    case 10 /* SMOOTHING */:
                        gl.bindTexture(gl.TEXTURE_2D, data.texture);
                        if (data.smoothing) {
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        }
                        else {
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                        }
                        break;
                    default:
                        break;
                }
                return offset;
            };
            WebGLRenderContext.prototype.activeProgram = function (gl, program) {
                if (program != this.currentProgram) {
                    gl.useProgram(program.id);
                    // 目前所有attribute buffer的绑定方法都是一致的
                    var attribute = program.attributes;
                    for (var key in attribute) {
                        if (key === "aVertexPosition") {
                            gl.vertexAttribPointer(attribute["aVertexPosition"].location, 2, gl.FLOAT, false, 5 * 4, 0);
                            gl.enableVertexAttribArray(attribute["aVertexPosition"].location);
                        }
                        else if (key === "aTextureCoord") {
                            gl.vertexAttribPointer(attribute["aTextureCoord"].location, 2, gl.FLOAT, false, 5 * 4, 2 * 4);
                            gl.enableVertexAttribArray(attribute["aTextureCoord"].location);
                        }
                        else if (key === "aColor") {
                            gl.vertexAttribPointer(attribute["aColor"].location, 1, gl.FLOAT, false, 5 * 4, 4 * 4);
                            gl.enableVertexAttribArray(attribute["aColor"].location);
                        }
                    }
                    this.currentProgram = program;
                }
            };
            WebGLRenderContext.prototype.syncUniforms = function (program, filter, textureWidth, textureHeight) {
                var uniforms = program.uniforms;
                var isCustomFilter = filter && filter.type === "custom";
                for (var key in uniforms) {
                    if (key === "projectionVector") {
                        uniforms[key].setValue({ x: this.projectionX, y: this.projectionY });
                    }
                    else if (key === "uTextureSize") {
                        uniforms[key].setValue({ x: textureWidth, y: textureHeight });
                    }
                    else if (key === "uSampler") {
                        uniforms[key].setValue(0);
                    }
                    else if (key === "uSamplerAlphaMask") {
                        uniforms[key].setValue(1);
                    }
                    else {
                        var value = filter.$uniforms[key];
                        if (value !== undefined) {
                            uniforms[key].setValue(value);
                        }
                        else {
                            // egret.warn("filter custom: uniform " + key + " not defined!");
                        }
                    }
                }
            };
            /**
             * 画texture
             **/
            WebGLRenderContext.prototype.drawTextureElements = function (data, offset) {
                return egret.sys.drawTextureElements(this, data, offset);
                /*
                let gl: any = this.context;
                gl.activeTexture(gl.TEXTURE0); ///refactor
                gl.bindTexture(gl.TEXTURE_2D, data.texture);
                let size = data.count * 3;
                gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                return size;
                */
            };
            /**
             * @private
             * 画rect
             **/
            WebGLRenderContext.prototype.drawRectElements = function (data, offset) {
                var gl = this.context;
                // gl.bindTexture(gl.TEXTURE_2D, null);
                var size = data.count * 3;
                gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                return size;
            };
            /**
             * 画push mask
             **/
            WebGLRenderContext.prototype.drawPushMaskElements = function (data, offset) {
                var gl = this.context;
                var size = data.count * 3;
                var buffer = this.activatedBuffer;
                if (buffer) {
                    if (buffer.rootRenderTarget) {
                        buffer.rootRenderTarget.enabledStencil();
                    }
                    if (buffer.stencilHandleCount == 0) {
                        buffer.enableStencil();
                        gl.clear(gl.STENCIL_BUFFER_BIT); // clear
                    }
                    var level = buffer.stencilHandleCount;
                    buffer.stencilHandleCount++;
                    gl.colorMask(false, false, false, false);
                    gl.stencilFunc(gl.EQUAL, level, 0xFF);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
                    // gl.bindTexture(gl.TEXTURE_2D, null);
                    gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                    gl.stencilFunc(gl.EQUAL, level + 1, 0xFF);
                    gl.colorMask(true, true, true, true);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                }
                return size;
            };
            /**
             * 画pop mask
             **/
            WebGLRenderContext.prototype.drawPopMaskElements = function (data, offset) {
                var gl = this.context;
                var size = data.count * 3;
                var buffer = this.activatedBuffer;
                if (buffer) {
                    buffer.stencilHandleCount--;
                    if (buffer.stencilHandleCount == 0) {
                        buffer.disableStencil(); // skip this draw
                    }
                    else {
                        var level = buffer.stencilHandleCount;
                        gl.colorMask(false, false, false, false);
                        gl.stencilFunc(gl.EQUAL, level + 1, 0xFF);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
                        // gl.bindTexture(gl.TEXTURE_2D, null);
                        gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                        gl.stencilFunc(gl.EQUAL, level, 0xFF);
                        gl.colorMask(true, true, true, true);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                    }
                }
                return size;
            };
            /**
             * 设置混色
             */
            WebGLRenderContext.prototype.setBlendMode = function (value) {
                var gl = this.context;
                var blendModeWebGL = WebGLRenderContext.blendModesForGL[value];
                if (blendModeWebGL) {
                    gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
                }
            };
            /**
             * 应用滤镜绘制给定的render target
             * 此方法不会导致input被释放，所以如果需要释放input，需要调用此方法后手动调用release
             */
            WebGLRenderContext.prototype.drawTargetWidthFilters = function (filters, input) {
                var originInput = input, filtersLen = filters.length, output;
                // 应用前面的滤镜
                if (filtersLen > 1) {
                    for (var i = 0; i < filtersLen - 1; i++) {
                        var filter_1 = filters[i];
                        var width = input.rootRenderTarget.width;
                        var height = input.rootRenderTarget.height;
                        output = baidugame.WebGLRenderBuffer.create(width, height);
                        output.setTransform(1, 0, 0, 1, 0, 0);
                        output.globalAlpha = 1;
                        this.drawToRenderTarget(filter_1, input, output);
                        if (input != originInput) {
                            baidugame.WebGLRenderBuffer.release(input);
                        }
                        input = output;
                    }
                }
                // 应用最后一个滤镜并绘制到当前场景中
                var filter = filters[filtersLen - 1];
                this.drawToRenderTarget(filter, input, this.currentBuffer);
                // 释放掉用于交换的buffer
                if (input != originInput) {
                    baidugame.WebGLRenderBuffer.release(input);
                }
            };
            /**
             * 向一个renderTarget中绘制
             * */
            WebGLRenderContext.prototype.drawToRenderTarget = function (filter, input, output) {
                if (this.contextLost) {
                    return;
                }
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                this.pushBuffer(output);
                var originInput = input, temp, width = input.rootRenderTarget.width, height = input.rootRenderTarget.height;
                // 模糊滤镜分别处理blurX与blurY
                if (filter.type == "blur") {
                    var blurXFilter = filter.blurXFilter;
                    var blurYFilter = filter.blurYFilter;
                    if (blurXFilter.blurX != 0 && blurYFilter.blurY != 0) {
                        temp = baidugame.WebGLRenderBuffer.create(width, height);
                        temp.setTransform(1, 0, 0, 1, 0, 0);
                        temp.globalAlpha = 1;
                        this.drawToRenderTarget(filter.blurXFilter, input, temp);
                        if (input != originInput) {
                            baidugame.WebGLRenderBuffer.release(input);
                        }
                        input = temp;
                        filter = blurYFilter;
                    }
                    else {
                        filter = blurXFilter.blurX === 0 ? blurYFilter : blurXFilter;
                    }
                }
                // 绘制input结果到舞台
                output.saveTransform();
                output.transform(1, 0, 0, -1, 0, height);
                this.vao.cacheArrays(output, 0, 0, width, height, 0, 0, width, height, width, height);
                output.restoreTransform();
                this.drawCmdManager.pushDrawTexture(input.rootRenderTarget.texture, 2, filter, width, height);
                // 释放掉input
                if (input != originInput) {
                    baidugame.WebGLRenderBuffer.release(input);
                }
                this.popBuffer();
            };
            WebGLRenderContext.initBlendMode = function () {
                /*参考
                gl.ZERO = 0
                gl.ONE = 1
                gl.SRC_COLOR = 768
                gl.ONE_MINUS_SRC_COLOR = 769
                gl.DST_COLOR = 774
                gl.ONE_MINUS_DST_COLOR = 775
                gl.SRC_ALPHA = 770
                gl.ONE_MINUS_SRC_ALPHA = 771
                gl.DST_ALPHA = 772
                gl.ONE_MINUS_DST_ALPHA = 773
                gl.CONSTANT_COLOR = 32769
                gl.ONE_MINUS_CONSTANT_COLOR = 32770
                gl.CONSTANT_ALPHA = 32771
                gl.ONE_MINUS_CONSTANT_ALPHA = 32772
                gl.SRC_ALPHA_SATURATE = 776
                */
                WebGLRenderContext.blendModesForGL = {};
                WebGLRenderContext.blendModesForGL["source-over"] = [1, 771];
                WebGLRenderContext.blendModesForGL["lighter"] = [1, 1];
                WebGLRenderContext.blendModesForGL["lighter-in"] = [770, 771];
                WebGLRenderContext.blendModesForGL["destination-out"] = [0, 771];
                WebGLRenderContext.blendModesForGL["destination-in"] = [0, 770];
            };
            WebGLRenderContext.glContextId = 0;
            WebGLRenderContext.blendModesForGL = null;
            return WebGLRenderContext;
        }());
        baidugame.WebGLRenderContext = WebGLRenderContext;
        __reflect(WebGLRenderContext.prototype, "egret.baidugame.WebGLRenderContext", ["egret.sys.RenderContext"]);
        WebGLRenderContext.initBlendMode();
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         * WebGL渲染缓存
         */
        var WebGLRenderBuffer = (function (_super) {
            __extends(WebGLRenderBuffer, _super);
            function WebGLRenderBuffer(width, height, root) {
                var _this = _super.call(this) || this;
                _this.globalAlpha = 1;
                /**
                 * stencil state
                 * 模版开关状态
                 */
                _this.stencilState = false;
                _this.$stencilList = [];
                _this.stencilHandleCount = 0;
                /**
                 * scissor state
                 * scissor 开关状态
                 */
                _this.$scissorState = false;
                _this.scissorRect = new egret.Rectangle();
                _this.$hasScissor = false;
                _this.$drawCalls = 0;
                _this.$computeDrawCall = false;
                _this.globalMatrix = new egret.Matrix();
                _this.savedGlobalMatrix = new egret.Matrix();
                _this.$offsetX = 0;
                _this.$offsetY = 0;
                // 获取webglRenderContext
                _this.context = baidugame.WebGLRenderContext.getInstance(width, height);
                if (egret.nativeRender) {
                    if (root) {
                        _this.surface = _this.context.surface;
                    }
                    else {
                        _this.surface = new egret_native.NativeRenderSurface(_this, width, height, root);
                    }
                    _this.rootRenderTarget = null;
                    return _this;
                }
                // buffer 对应的 render target
                _this.rootRenderTarget = new baidugame.WebGLRenderTarget(_this.context.context, 3, 3);
                if (width && height) {
                    _this.resize(width, height);
                }
                // 如果是第一个加入的buffer，说明是舞台buffer
                _this.root = root;
                // 如果是用于舞台渲染的renderBuffer，则默认添加renderTarget到renderContext中，而且是第一个
                if (_this.root) {
                    _this.context.pushBuffer(_this);
                    // 画布
                    _this.surface = _this.context.surface;
                    _this.$computeDrawCall = true;
                }
                else {
                    // 由于创建renderTarget造成的frameBuffer绑定，这里重置绑定
                    var lastBuffer = _this.context.activatedBuffer;
                    if (lastBuffer) {
                        lastBuffer.rootRenderTarget.activate();
                    }
                    _this.rootRenderTarget.initFrameBuffer();
                    _this.surface = _this.rootRenderTarget;
                }
                return _this;
            }
            WebGLRenderBuffer.prototype.enableStencil = function () {
                if (!this.stencilState) {
                    this.context.enableStencilTest();
                    this.stencilState = true;
                }
            };
            WebGLRenderBuffer.prototype.disableStencil = function () {
                if (this.stencilState) {
                    this.context.disableStencilTest();
                    this.stencilState = false;
                }
            };
            WebGLRenderBuffer.prototype.restoreStencil = function () {
                if (this.stencilState) {
                    this.context.enableStencilTest();
                }
                else {
                    this.context.disableStencilTest();
                }
            };
            WebGLRenderBuffer.prototype.enableScissor = function (x, y, width, height) {
                if (!this.$scissorState) {
                    this.$scissorState = true;
                    this.scissorRect.setTo(x, y, width, height);
                    this.context.enableScissorTest(this.scissorRect);
                }
            };
            WebGLRenderBuffer.prototype.disableScissor = function () {
                if (this.$scissorState) {
                    this.$scissorState = false;
                    this.scissorRect.setEmpty();
                    this.context.disableScissorTest();
                }
            };
            WebGLRenderBuffer.prototype.restoreScissor = function () {
                if (this.$scissorState) {
                    this.context.enableScissorTest(this.scissorRect);
                }
                else {
                    this.context.disableScissorTest();
                }
            };
            Object.defineProperty(WebGLRenderBuffer.prototype, "width", {
                /**
                 * 渲染缓冲的宽度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    if (egret.nativeRender) {
                        return this.surface.width;
                    }
                    else {
                        return this.rootRenderTarget.width;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebGLRenderBuffer.prototype, "height", {
                /**
                 * 渲染缓冲的高度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    if (egret.nativeRender) {
                        return this.surface.height;
                    }
                    else {
                        return this.rootRenderTarget.height;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 改变渲染缓冲的大小并清空缓冲区
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param useMaxSize 若传入true，则将改变后的尺寸与已有尺寸对比，保留较大的尺寸。
             */
            WebGLRenderBuffer.prototype.resize = function (width, height, useMaxSize) {
                width = width || 1;
                height = height || 1;
                if (egret.nativeRender) {
                    this.surface.resize(width, height);
                    return;
                }
                this.context.pushBuffer(this);
                // render target 尺寸重置
                if (width != this.rootRenderTarget.width || height != this.rootRenderTarget.height) {
                    this.context.drawCmdManager.pushResize(this, width, height);
                    // 同步更改宽高
                    this.rootRenderTarget.width = width;
                    this.rootRenderTarget.height = height;
                }
                // 如果是舞台的渲染缓冲，执行resize，否则surface大小不随之改变
                if (this.root) {
                    this.context.resize(width, height, useMaxSize);
                }
                this.context.clear();
                this.context.popBuffer();
            };
            /**
             * 获取指定区域的像素
             */
            WebGLRenderBuffer.prototype.getPixels = function (x, y, width, height) {
                if (width === void 0) { width = 1; }
                if (height === void 0) { height = 1; }
                var pixels = new Uint8Array(4 * width * height);
                if (egret.nativeRender) {
                    egret_native.activateBuffer(this);
                    egret_native.nrGetPixels(x, y, width, height, pixels);
                    egret_native.activateBuffer(null);
                }
                else {
                    var useFrameBuffer = this.rootRenderTarget.useFrameBuffer;
                    this.rootRenderTarget.useFrameBuffer = true;
                    this.rootRenderTarget.activate();
                    this.context.getPixels(x, y, width, height, pixels);
                    this.rootRenderTarget.useFrameBuffer = useFrameBuffer;
                    this.rootRenderTarget.activate();
                }
                //图像反转
                var result = new Uint8Array(4 * width * height);
                for (var i = 0; i < height; i++) {
                    for (var j = 0; j < width; j++) {
                        var index1 = (width * (height - i - 1) + j) * 4;
                        var index2 = (width * i + j) * 4;
                        var a = pixels[index2 + 3];
                        result[index1] = Math.round(pixels[index2] / a * 255);
                        result[index1 + 1] = Math.round(pixels[index2 + 1] / a * 255);
                        result[index1 + 2] = Math.round(pixels[index2 + 2] / a * 255);
                        result[index1 + 3] = pixels[index2 + 3];
                    }
                }
                return result;
            };
            /**
             * 转换成base64字符串，如果图片（或者包含的图片）跨域，则返回null
             * @param type 转换的类型，如: "image/png","image/jpeg"
             */
            WebGLRenderBuffer.prototype.toDataURL = function (type, encoderOptions) {
                return this.context.surface.toDataURL(type, encoderOptions);
            };
            /**
             * 销毁绘制对象
             */
            WebGLRenderBuffer.prototype.destroy = function () {
                this.context.destroy();
            };
            WebGLRenderBuffer.prototype.onRenderFinish = function () {
                this.$drawCalls = 0;
            };
            /**
             * 交换frameBuffer中的图像到surface中
             * @param width 宽度
             * @param height 高度
             */
            WebGLRenderBuffer.prototype.drawFrameBufferToSurface = function (sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, clear) {
                if (clear === void 0) { clear = false; }
                this.rootRenderTarget.useFrameBuffer = false;
                this.rootRenderTarget.activate();
                this.context.disableStencilTest(); // 切换frameBuffer注意要禁用STENCIL_TEST
                this.context.disableScissorTest();
                this.setTransform(1, 0, 0, 1, 0, 0);
                this.globalAlpha = 1;
                this.context.setGlobalCompositeOperation("source-over");
                clear && this.context.clear();
                this.context.drawImage(this.rootRenderTarget, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, sourceWidth, sourceHeight, false);
                this.context.$drawWebGL();
                this.rootRenderTarget.useFrameBuffer = true;
                this.rootRenderTarget.activate();
                this.restoreStencil();
                this.restoreScissor();
            };
            /**
             * 交换surface的图像到frameBuffer中
             * @param width 宽度
             * @param height 高度
             */
            WebGLRenderBuffer.prototype.drawSurfaceToFrameBuffer = function (sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, clear) {
                if (clear === void 0) { clear = false; }
                this.rootRenderTarget.useFrameBuffer = true;
                this.rootRenderTarget.activate();
                this.context.disableStencilTest(); // 切换frameBuffer注意要禁用STENCIL_TEST
                this.context.disableScissorTest();
                this.setTransform(1, 0, 0, 1, 0, 0);
                this.globalAlpha = 1;
                this.context.setGlobalCompositeOperation("source-over");
                clear && this.context.clear();
                this.context.drawImage(this.context.surface, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, sourceWidth, sourceHeight, false);
                this.context.$drawWebGL();
                this.rootRenderTarget.useFrameBuffer = false;
                this.rootRenderTarget.activate();
                this.restoreStencil();
                this.restoreScissor();
            };
            /**
             * 清空缓冲区数据
             */
            WebGLRenderBuffer.prototype.clear = function () {
                this.context.pushBuffer(this);
                this.context.clear();
                this.context.popBuffer();
            };
            WebGLRenderBuffer.prototype.setTransform = function (a, b, c, d, tx, ty) {
                // this.globalMatrix.setTo(a, b, c, d, tx, ty);
                var matrix = this.globalMatrix;
                matrix.a = a;
                matrix.b = b;
                matrix.c = c;
                matrix.d = d;
                matrix.tx = tx;
                matrix.ty = ty;
            };
            WebGLRenderBuffer.prototype.transform = function (a, b, c, d, tx, ty) {
                var matrix = this.globalMatrix;
                var a1 = matrix.a;
                var b1 = matrix.b;
                var c1 = matrix.c;
                var d1 = matrix.d;
                if (a != 1 || b != 0 || c != 0 || d != 1) {
                    matrix.a = a * a1 + b * c1;
                    matrix.b = a * b1 + b * d1;
                    matrix.c = c * a1 + d * c1;
                    matrix.d = c * b1 + d * d1;
                }
                matrix.tx = tx * a1 + ty * c1 + matrix.tx;
                matrix.ty = tx * b1 + ty * d1 + matrix.ty;
            };
            WebGLRenderBuffer.prototype.useOffset = function () {
                var self = this;
                if (self.$offsetX != 0 || self.$offsetY != 0) {
                    self.globalMatrix.append(1, 0, 0, 1, self.$offsetX, self.$offsetY);
                    self.$offsetX = self.$offsetY = 0;
                }
            };
            WebGLRenderBuffer.prototype.saveTransform = function () {
                var matrix = this.globalMatrix;
                var sMatrix = this.savedGlobalMatrix;
                sMatrix.a = matrix.a;
                sMatrix.b = matrix.b;
                sMatrix.c = matrix.c;
                sMatrix.d = matrix.d;
                sMatrix.tx = matrix.tx;
                sMatrix.ty = matrix.ty;
            };
            WebGLRenderBuffer.prototype.restoreTransform = function () {
                var matrix = this.globalMatrix;
                var sMatrix = this.savedGlobalMatrix;
                matrix.a = sMatrix.a;
                matrix.b = sMatrix.b;
                matrix.c = sMatrix.c;
                matrix.d = sMatrix.d;
                matrix.tx = sMatrix.tx;
                matrix.ty = sMatrix.ty;
            };
            /**
             * 创建一个buffer实例
             */
            WebGLRenderBuffer.create = function (width, height) {
                var buffer = renderBufferPool.pop();
                // width = Math.min(width, 1024);
                // height = Math.min(height, 1024);
                if (buffer) {
                    buffer.resize(width, height);
                    var matrix = buffer.globalMatrix;
                    matrix.a = 1;
                    matrix.b = 0;
                    matrix.c = 0;
                    matrix.d = 1;
                    matrix.tx = 0;
                    matrix.ty = 0;
                    buffer.globalAlpha = 1;
                    buffer.$offsetX = 0;
                    buffer.$offsetY = 0;
                }
                else {
                    buffer = new WebGLRenderBuffer(width, height);
                    buffer.$computeDrawCall = false;
                }
                return buffer;
            };
            /**
             * 回收一个buffer实例
             */
            WebGLRenderBuffer.release = function (buffer) {
                renderBufferPool.push(buffer);
            };
            WebGLRenderBuffer.autoClear = true;
            return WebGLRenderBuffer;
        }(egret.HashObject));
        baidugame.WebGLRenderBuffer = WebGLRenderBuffer;
        __reflect(WebGLRenderBuffer.prototype, "egret.baidugame.WebGLRenderBuffer", ["egret.sys.RenderBuffer"]);
        var renderBufferPool = []; //渲染缓冲区对象池
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        var blendModes = ["source-over", "lighter", "destination-out"];
        var defaultCompositeOp = "source-over";
        var BLACK_COLOR = "#000000";
        var CAPS_STYLES = { none: 'butt', square: 'square', round: 'round' };
        var renderBufferPool = []; //渲染缓冲区对象池
        /**
         * @private
         * WebGL渲染器
         */
        var WebGLRenderer = (function () {
            function WebGLRenderer() {
                /**
                 * Do special treatment on wechat ios10
                 */
                this.wxiOS10 = false;
                this.nestLevel = 0; //渲染的嵌套层次，0表示在调用堆栈的最外层。
            }
            /**
             * 渲染一个显示对象
             * @param displayObject 要渲染的显示对象
             * @param buffer 渲染缓冲
             * @param matrix 要对显示对象整体叠加的变换矩阵
             * @param dirtyList 脏矩形列表
             * @param forRenderTexture 绘制目标是RenderTexture的标志
             * @returns drawCall触发绘制的次数
             */
            WebGLRenderer.prototype.render = function (displayObject, buffer, matrix, forRenderTexture) {
                this.nestLevel++;
                var webglBuffer = buffer;
                var webglBufferContext = webglBuffer.context;
                var root = forRenderTexture ? displayObject : null;
                webglBufferContext.pushBuffer(webglBuffer);
                //绘制显示对象
                webglBuffer.transform(matrix.a, matrix.b, matrix.c, matrix.d, 0, 0);
                this.drawDisplayObject(displayObject, webglBuffer, matrix.tx, matrix.ty, true);
                webglBufferContext.$drawWebGL();
                var drawCall = webglBuffer.$drawCalls;
                webglBuffer.onRenderFinish();
                webglBufferContext.popBuffer();
                var invert = egret.Matrix.create();
                matrix.$invertInto(invert);
                webglBuffer.transform(invert.a, invert.b, invert.c, invert.d, 0, 0);
                egret.Matrix.release(invert);
                this.nestLevel--;
                if (this.nestLevel === 0) {
                    //最大缓存6个渲染缓冲
                    if (renderBufferPool.length > 6) {
                        renderBufferPool.length = 6;
                    }
                    var length_5 = renderBufferPool.length;
                    for (var i = 0; i < length_5; i++) {
                        renderBufferPool[i].resize(0, 0);
                    }
                }
                return drawCall;
            };
            /**
             * @private
             * 绘制一个显示对象
             */
            WebGLRenderer.prototype.drawDisplayObject = function (displayObject, buffer, offsetX, offsetY, isStage) {
                var drawCalls = 0;
                var node;
                var displayList = displayObject.$displayList;
                if (displayList && !isStage) {
                    if (displayObject.$cacheDirty || displayObject.$renderDirty ||
                        displayList.$canvasScaleX != egret.sys.DisplayList.$canvasScaleX ||
                        displayList.$canvasScaleY != egret.sys.DisplayList.$canvasScaleY) {
                        drawCalls += displayList.drawToSurface();
                    }
                    node = displayList.$renderNode;
                }
                else {
                    if (displayObject.$renderDirty) {
                        node = displayObject.$getRenderNode();
                    }
                    else {
                        node = displayObject.$renderNode;
                    }
                }
                displayObject.$cacheDirty = false;
                if (node) {
                    drawCalls++;
                    buffer.$offsetX = offsetX;
                    buffer.$offsetY = offsetY;
                    switch (node.type) {
                        case 1 /* BitmapNode */:
                            this.renderBitmap(node, buffer);
                            break;
                        case 2 /* TextNode */:
                            this.renderText(node, buffer);
                            break;
                        case 3 /* GraphicsNode */:
                            this.renderGraphics(node, buffer);
                            break;
                        case 4 /* GroupNode */:
                            this.renderGroup(node, buffer);
                            break;
                        case 5 /* MeshNode */:
                            this.renderMesh(node, buffer);
                            break;
                        case 6 /* NormalBitmapNode */:
                            this.renderNormalBitmap(node, buffer);
                            break;
                    }
                    buffer.$offsetX = 0;
                    buffer.$offsetY = 0;
                }
                if (displayList && !isStage) {
                    return drawCalls;
                }
                var children = displayObject.$children;
                if (children) {
                    var length_6 = children.length;
                    for (var i = 0; i < length_6; i++) {
                        var child = children[i];
                        var offsetX2 = void 0;
                        var offsetY2 = void 0;
                        var tempAlpha = void 0;
                        if (child.$alpha != 1) {
                            tempAlpha = buffer.globalAlpha;
                            buffer.globalAlpha *= child.$alpha;
                        }
                        var savedMatrix = void 0;
                        if (child.$useTranslate) {
                            var m = child.$getMatrix();
                            offsetX2 = offsetX + child.$x;
                            offsetY2 = offsetY + child.$y;
                            var m2 = buffer.globalMatrix;
                            savedMatrix = egret.Matrix.create();
                            savedMatrix.a = m2.a;
                            savedMatrix.b = m2.b;
                            savedMatrix.c = m2.c;
                            savedMatrix.d = m2.d;
                            savedMatrix.tx = m2.tx;
                            savedMatrix.ty = m2.ty;
                            buffer.transform(m.a, m.b, m.c, m.d, offsetX2, offsetY2);
                            offsetX2 = -child.$anchorOffsetX;
                            offsetY2 = -child.$anchorOffsetY;
                        }
                        else {
                            offsetX2 = offsetX + child.$x - child.$anchorOffsetX;
                            offsetY2 = offsetY + child.$y - child.$anchorOffsetY;
                        }
                        switch (child.$renderMode) {
                            case 1 /* NONE */:
                                break;
                            case 2 /* FILTER */:
                                drawCalls += this.drawWithFilter(child, buffer, offsetX2, offsetY2);
                                break;
                            case 3 /* CLIP */:
                                drawCalls += this.drawWithClip(child, buffer, offsetX2, offsetY2);
                                break;
                            case 4 /* SCROLLRECT */:
                                drawCalls += this.drawWithScrollRect(child, buffer, offsetX2, offsetY2);
                                break;
                            default:
                                drawCalls += this.drawDisplayObject(child, buffer, offsetX2, offsetY2);
                                break;
                        }
                        if (tempAlpha) {
                            buffer.globalAlpha = tempAlpha;
                        }
                        if (savedMatrix) {
                            var m = buffer.globalMatrix;
                            m.a = savedMatrix.a;
                            m.b = savedMatrix.b;
                            m.c = savedMatrix.c;
                            m.d = savedMatrix.d;
                            m.tx = savedMatrix.tx;
                            m.ty = savedMatrix.ty;
                            egret.Matrix.release(savedMatrix);
                        }
                    }
                }
                return drawCalls;
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.drawWithFilter = function (displayObject, buffer, offsetX, offsetY) {
                var drawCalls = 0;
                if (displayObject.$children && displayObject.$children.length == 0 && (!displayObject.$renderNode || displayObject.$renderNode.$getRenderCount() == 0)) {
                    return drawCalls;
                }
                var filters = displayObject.$filters;
                var hasBlendMode = (displayObject.$blendMode !== 0);
                var compositeOp;
                if (hasBlendMode) {
                    compositeOp = blendModes[displayObject.$blendMode];
                    if (!compositeOp) {
                        compositeOp = defaultCompositeOp;
                    }
                }
                var displayBounds = displayObject.$getOriginalBounds();
                var displayBoundsX = displayBounds.x;
                var displayBoundsY = displayBounds.y;
                var displayBoundsWidth = displayBounds.width;
                var displayBoundsHeight = displayBounds.height;
                if (displayBoundsWidth <= 0 || displayBoundsHeight <= 0) {
                    return drawCalls;
                }
                if (!displayObject.mask && filters.length == 1 && (filters[0].type == "colorTransform" || (filters[0].type === "custom" && filters[0].padding === 0))) {
                    var childrenDrawCount = this.getRenderCount(displayObject);
                    if (!displayObject.$children || childrenDrawCount == 1) {
                        if (hasBlendMode) {
                            buffer.context.setGlobalCompositeOperation(compositeOp);
                        }
                        buffer.context.$filter = filters[0];
                        if (displayObject.$mask) {
                            drawCalls += this.drawWithClip(displayObject, buffer, offsetX, offsetY);
                        }
                        else if (displayObject.$scrollRect || displayObject.$maskRect) {
                            drawCalls += this.drawWithScrollRect(displayObject, buffer, offsetX, offsetY);
                        }
                        else {
                            drawCalls += this.drawDisplayObject(displayObject, buffer, offsetX, offsetY);
                        }
                        buffer.context.$filter = null;
                        if (hasBlendMode) {
                            buffer.context.setGlobalCompositeOperation(defaultCompositeOp);
                        }
                        return drawCalls;
                    }
                }
                // 为显示对象创建一个新的buffer
                var displayBuffer = this.createRenderBuffer(displayBoundsWidth, displayBoundsHeight);
                displayBuffer.context.pushBuffer(displayBuffer);
                //todo 可以优化减少draw次数
                if (displayObject.$mask) {
                    drawCalls += this.drawWithClip(displayObject, displayBuffer, -displayBoundsX, -displayBoundsY);
                }
                else if (displayObject.$scrollRect || displayObject.$maskRect) {
                    drawCalls += this.drawWithScrollRect(displayObject, displayBuffer, -displayBoundsX, -displayBoundsY);
                }
                else {
                    drawCalls += this.drawDisplayObject(displayObject, displayBuffer, -displayBoundsX, -displayBoundsY);
                }
                displayBuffer.context.popBuffer();
                //绘制结果到屏幕
                if (drawCalls > 0) {
                    if (hasBlendMode) {
                        buffer.context.setGlobalCompositeOperation(compositeOp);
                    }
                    drawCalls++;
                    // 绘制结果的时候，应用滤镜
                    buffer.$offsetX = offsetX + displayBoundsX;
                    buffer.$offsetY = offsetY + displayBoundsY;
                    var savedMatrix = egret.Matrix.create();
                    var curMatrix = buffer.globalMatrix;
                    savedMatrix.a = curMatrix.a;
                    savedMatrix.b = curMatrix.b;
                    savedMatrix.c = curMatrix.c;
                    savedMatrix.d = curMatrix.d;
                    savedMatrix.tx = curMatrix.tx;
                    savedMatrix.ty = curMatrix.ty;
                    buffer.useOffset();
                    buffer.context.drawTargetWidthFilters(filters, displayBuffer);
                    curMatrix.a = savedMatrix.a;
                    curMatrix.b = savedMatrix.b;
                    curMatrix.c = savedMatrix.c;
                    curMatrix.d = savedMatrix.d;
                    curMatrix.tx = savedMatrix.tx;
                    curMatrix.ty = savedMatrix.ty;
                    egret.Matrix.release(savedMatrix);
                    if (hasBlendMode) {
                        buffer.context.setGlobalCompositeOperation(defaultCompositeOp);
                    }
                }
                renderBufferPool.push(displayBuffer);
                return drawCalls;
            };
            WebGLRenderer.prototype.getRenderCount = function (displayObject) {
                var drawCount = 0;
                var node = displayObject.$getRenderNode();
                if (node) {
                    drawCount += node.$getRenderCount();
                }
                if (displayObject.$children) {
                    for (var _i = 0, _a = displayObject.$children; _i < _a.length; _i++) {
                        var child = _a[_i];
                        var filters = child.$filters;
                        // 特殊处理有滤镜的对象
                        if (filters && filters.length > 0) {
                            return 2;
                        }
                        else if (child.$children) {
                            drawCount += this.getRenderCount(child);
                        }
                        else {
                            var node_1 = child.$getRenderNode();
                            if (node_1) {
                                drawCount += node_1.$getRenderCount();
                            }
                        }
                    }
                }
                return drawCount;
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.drawWithClip = function (displayObject, buffer, offsetX, offsetY) {
                var drawCalls = 0;
                var hasBlendMode = (displayObject.$blendMode !== 0);
                var compositeOp;
                if (hasBlendMode) {
                    compositeOp = blendModes[displayObject.$blendMode];
                    if (!compositeOp) {
                        compositeOp = defaultCompositeOp;
                    }
                }
                var scrollRect = displayObject.$scrollRect ? displayObject.$scrollRect : displayObject.$maskRect;
                var mask = displayObject.$mask;
                if (mask) {
                    var maskRenderMatrix = mask.$getMatrix();
                    //遮罩scaleX或scaleY为0，放弃绘制
                    if ((maskRenderMatrix.a == 0 && maskRenderMatrix.b == 0) || (maskRenderMatrix.c == 0 && maskRenderMatrix.d == 0)) {
                        return drawCalls;
                    }
                }
                //没有遮罩,同时显示对象没有子项
                if (!mask && (!displayObject.$children || displayObject.$children.length == 0)) {
                    if (scrollRect) {
                        buffer.context.pushMask(scrollRect.x + offsetX, scrollRect.y + offsetY, scrollRect.width, scrollRect.height);
                    }
                    //绘制显示对象
                    if (hasBlendMode) {
                        buffer.context.setGlobalCompositeOperation(compositeOp);
                    }
                    drawCalls += this.drawDisplayObject(displayObject, buffer, offsetX, offsetY);
                    if (hasBlendMode) {
                        buffer.context.setGlobalCompositeOperation(defaultCompositeOp);
                    }
                    if (scrollRect) {
                        buffer.context.popMask();
                    }
                    return drawCalls;
                }
                else {
                    var displayBounds = displayObject.$getOriginalBounds();
                    var displayBoundsX = displayBounds.x;
                    var displayBoundsY = displayBounds.y;
                    var displayBoundsWidth = displayBounds.width;
                    var displayBoundsHeight = displayBounds.height;
                    if (displayBoundsWidth <= 0 || displayBoundsHeight <= 0) {
                        return drawCalls;
                    }
                    //绘制显示对象自身，若有scrollRect，应用clip
                    var displayBuffer = this.createRenderBuffer(displayBoundsWidth, displayBoundsHeight);
                    displayBuffer.context.pushBuffer(displayBuffer);
                    drawCalls += this.drawDisplayObject(displayObject, displayBuffer, -displayBoundsX, -displayBoundsY);
                    //绘制遮罩
                    if (mask) {
                        var maskBuffer = this.createRenderBuffer(displayBoundsWidth, displayBoundsHeight);
                        maskBuffer.context.pushBuffer(maskBuffer);
                        var maskMatrix = egret.Matrix.create();
                        maskMatrix.copyFrom(mask.$getConcatenatedMatrix());
                        mask.$getConcatenatedMatrixAt(displayObject, maskMatrix);
                        maskMatrix.translate(-displayBoundsX, -displayBoundsY);
                        maskBuffer.setTransform(maskMatrix.a, maskMatrix.b, maskMatrix.c, maskMatrix.d, maskMatrix.tx, maskMatrix.ty);
                        egret.Matrix.release(maskMatrix);
                        drawCalls += this.drawDisplayObject(mask, maskBuffer, 0, 0);
                        maskBuffer.context.popBuffer();
                        displayBuffer.context.setGlobalCompositeOperation("destination-in");
                        displayBuffer.setTransform(1, 0, 0, -1, 0, maskBuffer.height);
                        var maskBufferWidth = maskBuffer.rootRenderTarget.width;
                        var maskBufferHeight = maskBuffer.rootRenderTarget.height;
                        displayBuffer.context.drawTexture(maskBuffer.rootRenderTarget.texture, 0, 0, maskBufferWidth, maskBufferHeight, 0, 0, maskBufferWidth, maskBufferHeight, maskBufferWidth, maskBufferHeight);
                        displayBuffer.setTransform(1, 0, 0, 1, 0, 0);
                        displayBuffer.context.setGlobalCompositeOperation("source-over");
                        maskBuffer.setTransform(1, 0, 0, 1, 0, 0);
                        renderBufferPool.push(maskBuffer);
                    }
                    displayBuffer.context.setGlobalCompositeOperation(defaultCompositeOp);
                    displayBuffer.context.popBuffer();
                    //绘制结果到屏幕
                    if (drawCalls > 0) {
                        drawCalls++;
                        if (hasBlendMode) {
                            buffer.context.setGlobalCompositeOperation(compositeOp);
                        }
                        if (scrollRect) {
                            buffer.context.pushMask(scrollRect.x + offsetX, scrollRect.y + offsetY, scrollRect.width, scrollRect.height);
                        }
                        var savedMatrix = egret.Matrix.create();
                        var curMatrix = buffer.globalMatrix;
                        savedMatrix.a = curMatrix.a;
                        savedMatrix.b = curMatrix.b;
                        savedMatrix.c = curMatrix.c;
                        savedMatrix.d = curMatrix.d;
                        savedMatrix.tx = curMatrix.tx;
                        savedMatrix.ty = curMatrix.ty;
                        curMatrix.append(1, 0, 0, -1, offsetX + displayBoundsX, offsetY + displayBoundsY + displayBuffer.height);
                        var displayBufferWidth = displayBuffer.rootRenderTarget.width;
                        var displayBufferHeight = displayBuffer.rootRenderTarget.height;
                        buffer.context.drawTexture(displayBuffer.rootRenderTarget.texture, 0, 0, displayBufferWidth, displayBufferHeight, 0, 0, displayBufferWidth, displayBufferHeight, displayBufferWidth, displayBufferHeight);
                        if (scrollRect) {
                            displayBuffer.context.popMask();
                        }
                        if (hasBlendMode) {
                            buffer.context.setGlobalCompositeOperation(defaultCompositeOp);
                        }
                        var matrix = buffer.globalMatrix;
                        matrix.a = savedMatrix.a;
                        matrix.b = savedMatrix.b;
                        matrix.c = savedMatrix.c;
                        matrix.d = savedMatrix.d;
                        matrix.tx = savedMatrix.tx;
                        matrix.ty = savedMatrix.ty;
                        egret.Matrix.release(savedMatrix);
                    }
                    renderBufferPool.push(displayBuffer);
                    return drawCalls;
                }
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.drawWithScrollRect = function (displayObject, buffer, offsetX, offsetY) {
                var drawCalls = 0;
                var scrollRect = displayObject.$scrollRect ? displayObject.$scrollRect : displayObject.$maskRect;
                if (scrollRect.isEmpty()) {
                    return drawCalls;
                }
                if (displayObject.$scrollRect) {
                    offsetX -= scrollRect.x;
                    offsetY -= scrollRect.y;
                }
                var m = buffer.globalMatrix;
                var context = buffer.context;
                var scissor = false;
                if (buffer.$hasScissor || m.b != 0 || m.c != 0) {
                    buffer.context.pushMask(scrollRect.x + offsetX, scrollRect.y + offsetY, scrollRect.width, scrollRect.height);
                }
                else {
                    var a = m.a;
                    var d = m.d;
                    var tx = m.tx;
                    var ty = m.ty;
                    var x = scrollRect.x + offsetX;
                    var y = scrollRect.y + offsetY;
                    var xMax = x + scrollRect.width;
                    var yMax = y + scrollRect.height;
                    var minX = void 0, minY = void 0, maxX = void 0, maxY = void 0;
                    //优化，通常情况下不缩放的对象占多数，直接加上偏移量即可。
                    if (a == 1.0 && d == 1.0) {
                        minX = x + tx;
                        minY = y + ty;
                        maxX = xMax + tx;
                        maxY = yMax + ty;
                    }
                    else {
                        var x0 = a * x + tx;
                        var y0 = d * y + ty;
                        var x1 = a * xMax + tx;
                        var y1 = d * y + ty;
                        var x2 = a * xMax + tx;
                        var y2 = d * yMax + ty;
                        var x3 = a * x + tx;
                        var y3 = d * yMax + ty;
                        var tmp = 0;
                        if (x0 > x1) {
                            tmp = x0;
                            x0 = x1;
                            x1 = tmp;
                        }
                        if (x2 > x3) {
                            tmp = x2;
                            x2 = x3;
                            x3 = tmp;
                        }
                        minX = (x0 < x2 ? x0 : x2);
                        maxX = (x1 > x3 ? x1 : x3);
                        if (y0 > y1) {
                            tmp = y0;
                            y0 = y1;
                            y1 = tmp;
                        }
                        if (y2 > y3) {
                            tmp = y2;
                            y2 = y3;
                            y3 = tmp;
                        }
                        minY = (y0 < y2 ? y0 : y2);
                        maxY = (y1 > y3 ? y1 : y3);
                    }
                    context.enableScissor(minX, -maxY + buffer.height, maxX - minX, maxY - minY);
                    scissor = true;
                }
                drawCalls += this.drawDisplayObject(displayObject, buffer, offsetX, offsetY);
                if (scissor) {
                    context.disableScissor();
                }
                else {
                    context.popMask();
                }
                return drawCalls;
            };
            /**
             * 将一个RenderNode对象绘制到渲染缓冲
             * @param node 要绘制的节点
             * @param buffer 渲染缓冲
             * @param matrix 要叠加的矩阵
             * @param forHitTest 绘制结果是用于碰撞检测。若为true，当渲染GraphicsNode时，会忽略透明度样式设置，全都绘制为不透明的。
             */
            WebGLRenderer.prototype.drawNodeToBuffer = function (node, buffer, matrix, forHitTest) {
                var webglBuffer = buffer;
                //pushRenderTARGET
                webglBuffer.context.pushBuffer(webglBuffer);
                webglBuffer.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                this.renderNode(node, buffer, 0, 0, forHitTest);
                webglBuffer.context.$drawWebGL();
                webglBuffer.onRenderFinish();
                //popRenderTARGET
                webglBuffer.context.popBuffer();
            };
            /**
             * 将一个DisplayObject绘制到渲染缓冲，用于RenderTexture绘制
             * @param displayObject 要绘制的显示对象
             * @param buffer 渲染缓冲
             * @param matrix 要叠加的矩阵
             */
            WebGLRenderer.prototype.drawDisplayToBuffer = function (displayObject, buffer, matrix) {
                buffer.context.pushBuffer(buffer);
                if (matrix) {
                    buffer.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
                }
                var node;
                if (displayObject.$renderDirty) {
                    node = displayObject.$getRenderNode();
                }
                else {
                    node = displayObject.$renderNode;
                }
                var drawCalls = 0;
                if (node) {
                    drawCalls++;
                    switch (node.type) {
                        case 1 /* BitmapNode */:
                            this.renderBitmap(node, buffer);
                            break;
                        case 2 /* TextNode */:
                            this.renderText(node, buffer);
                            break;
                        case 3 /* GraphicsNode */:
                            this.renderGraphics(node, buffer);
                            break;
                        case 4 /* GroupNode */:
                            this.renderGroup(node, buffer);
                            break;
                        case 5 /* MeshNode */:
                            this.renderMesh(node, buffer);
                            break;
                        case 6 /* NormalBitmapNode */:
                            this.renderNormalBitmap(node, buffer);
                            break;
                    }
                }
                var children = displayObject.$children;
                if (children) {
                    var length_7 = children.length;
                    for (var i = 0; i < length_7; i++) {
                        var child = children[i];
                        switch (child.$renderMode) {
                            case 1 /* NONE */:
                                break;
                            case 2 /* FILTER */:
                                drawCalls += this.drawWithFilter(child, buffer, 0, 0);
                                break;
                            case 3 /* CLIP */:
                                drawCalls += this.drawWithClip(child, buffer, 0, 0);
                                break;
                            case 4 /* SCROLLRECT */:
                                drawCalls += this.drawWithScrollRect(child, buffer, 0, 0);
                                break;
                            default:
                                drawCalls += this.drawDisplayObject(child, buffer, 0, 0);
                                break;
                        }
                    }
                }
                buffer.context.$drawWebGL();
                buffer.onRenderFinish();
                buffer.context.popBuffer();
                return drawCalls;
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.renderNode = function (node, buffer, offsetX, offsetY, forHitTest) {
                buffer.$offsetX = offsetX;
                buffer.$offsetY = offsetY;
                switch (node.type) {
                    case 1 /* BitmapNode */:
                        this.renderBitmap(node, buffer);
                        break;
                    case 2 /* TextNode */:
                        this.renderText(node, buffer);
                        break;
                    case 3 /* GraphicsNode */:
                        this.renderGraphics(node, buffer, forHitTest);
                        break;
                    case 4 /* GroupNode */:
                        this.renderGroup(node, buffer);
                        break;
                    case 5 /* MeshNode */:
                        this.renderMesh(node, buffer);
                        break;
                    case 6 /* NormalBitmapNode */:
                        this.renderNormalBitmap(node, buffer);
                        break;
                }
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.renderNormalBitmap = function (node, buffer) {
                var image = node.image;
                if (!image) {
                    return;
                }
                buffer.context.drawImage(image, node.sourceX, node.sourceY, node.sourceW, node.sourceH, node.drawX, node.drawY, node.drawW, node.drawH, node.imageWidth, node.imageHeight, node.rotated, node.smoothing);
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.renderBitmap = function (node, buffer) {
                var image = node.image;
                if (!image) {
                    return;
                }
                //buffer.imageSmoothingEnabled = node.smoothing;
                var data = node.drawData;
                var length = data.length;
                var pos = 0;
                var m = node.matrix;
                var blendMode = node.blendMode;
                var alpha = node.alpha;
                var savedMatrix;
                var offsetX;
                var offsetY;
                if (m) {
                    savedMatrix = egret.Matrix.create();
                    var curMatrix = buffer.globalMatrix;
                    savedMatrix.a = curMatrix.a;
                    savedMatrix.b = curMatrix.b;
                    savedMatrix.c = curMatrix.c;
                    savedMatrix.d = curMatrix.d;
                    savedMatrix.tx = curMatrix.tx;
                    savedMatrix.ty = curMatrix.ty;
                    offsetX = buffer.$offsetX;
                    offsetY = buffer.$offsetY;
                    buffer.useOffset();
                    buffer.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                //这里不考虑嵌套
                if (blendMode) {
                    buffer.context.setGlobalCompositeOperation(blendModes[blendMode]);
                }
                var originAlpha;
                if (alpha == alpha) {
                    originAlpha = buffer.globalAlpha;
                    buffer.globalAlpha *= alpha;
                }
                if (node.filter) {
                    buffer.context.$filter = node.filter;
                    while (pos < length) {
                        buffer.context.drawImage(image, data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], node.imageWidth, node.imageHeight, node.rotated, node.smoothing);
                    }
                    buffer.context.$filter = null;
                }
                else {
                    while (pos < length) {
                        buffer.context.drawImage(image, data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], node.imageWidth, node.imageHeight, node.rotated, node.smoothing);
                    }
                }
                if (blendMode) {
                    buffer.context.setGlobalCompositeOperation(defaultCompositeOp);
                }
                if (alpha == alpha) {
                    buffer.globalAlpha = originAlpha;
                }
                if (m) {
                    var matrix = buffer.globalMatrix;
                    matrix.a = savedMatrix.a;
                    matrix.b = savedMatrix.b;
                    matrix.c = savedMatrix.c;
                    matrix.d = savedMatrix.d;
                    matrix.tx = savedMatrix.tx;
                    matrix.ty = savedMatrix.ty;
                    buffer.$offsetX = offsetX;
                    buffer.$offsetY = offsetY;
                    egret.Matrix.release(savedMatrix);
                }
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.renderMesh = function (node, buffer) {
                var image = node.image;
                //buffer.imageSmoothingEnabled = node.smoothing;
                var data = node.drawData;
                var length = data.length;
                var pos = 0;
                var m = node.matrix;
                var blendMode = node.blendMode;
                var alpha = node.alpha;
                var savedMatrix;
                var offsetX;
                var offsetY;
                if (m) {
                    savedMatrix = egret.Matrix.create();
                    var curMatrix = buffer.globalMatrix;
                    savedMatrix.a = curMatrix.a;
                    savedMatrix.b = curMatrix.b;
                    savedMatrix.c = curMatrix.c;
                    savedMatrix.d = curMatrix.d;
                    savedMatrix.tx = curMatrix.tx;
                    savedMatrix.ty = curMatrix.ty;
                    offsetX = buffer.$offsetX;
                    offsetY = buffer.$offsetY;
                    buffer.useOffset();
                    buffer.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                //这里不考虑嵌套
                if (blendMode) {
                    buffer.context.setGlobalCompositeOperation(blendModes[blendMode]);
                }
                var originAlpha;
                if (alpha == alpha) {
                    originAlpha = buffer.globalAlpha;
                    buffer.globalAlpha *= alpha;
                }
                if (node.filter) {
                    buffer.context.$filter = node.filter;
                    while (pos < length) {
                        buffer.context.drawMesh(image, data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], node.imageWidth, node.imageHeight, node.uvs, node.vertices, node.indices, node.bounds, node.rotated, node.smoothing);
                    }
                    buffer.context.$filter = null;
                }
                else {
                    while (pos < length) {
                        buffer.context.drawMesh(image, data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], node.imageWidth, node.imageHeight, node.uvs, node.vertices, node.indices, node.bounds, node.rotated, node.smoothing);
                    }
                }
                if (blendMode) {
                    buffer.context.setGlobalCompositeOperation(defaultCompositeOp);
                }
                if (alpha == alpha) {
                    buffer.globalAlpha = originAlpha;
                }
                if (m) {
                    var matrix = buffer.globalMatrix;
                    matrix.a = savedMatrix.a;
                    matrix.b = savedMatrix.b;
                    matrix.c = savedMatrix.c;
                    matrix.d = savedMatrix.d;
                    matrix.tx = savedMatrix.tx;
                    matrix.ty = savedMatrix.ty;
                    buffer.$offsetX = offsetX;
                    buffer.$offsetY = offsetY;
                    egret.Matrix.release(savedMatrix);
                }
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.___renderText____ = function (node, buffer) {
                var width = node.width - node.x;
                var height = node.height - node.y;
                if (width <= 0 || height <= 0 || !width || !height || node.drawData.length === 0) {
                    return;
                }
                var canvasScaleX = egret.sys.DisplayList.$canvasScaleX;
                var canvasScaleY = egret.sys.DisplayList.$canvasScaleY;
                var maxTextureSize = buffer.context.$maxTextureSize;
                if (width * canvasScaleX > maxTextureSize) {
                    canvasScaleX *= maxTextureSize / (width * canvasScaleX);
                }
                if (height * canvasScaleY > maxTextureSize) {
                    canvasScaleY *= maxTextureSize / (height * canvasScaleY);
                }
                width *= canvasScaleX;
                height *= canvasScaleY;
                var x = node.x * canvasScaleX;
                var y = node.y * canvasScaleY;
                if (node.$canvasScaleX !== canvasScaleX || node.$canvasScaleY !== canvasScaleY) {
                    node.$canvasScaleX = canvasScaleX;
                    node.$canvasScaleY = canvasScaleY;
                    node.dirtyRender = true;
                }
                if (x || y) {
                    buffer.transform(1, 0, 0, 1, x / canvasScaleX, y / canvasScaleY);
                }
                if (node.dirtyRender) {
                    baidugame.TextAtlasRender.analysisTextNodeAndFlushDrawLabel(node);
                }
                var drawCommands = node[baidugame.property_drawLabel];
                if (drawCommands && drawCommands.length > 0) {
                    //存一下
                    var saveOffsetX = buffer.$offsetX;
                    var saveOffsetY = buffer.$offsetY;
                    //开始画
                    var cmd = null;
                    var anchorX = 0;
                    var anchorY = 0;
                    var textBlocks = null;
                    var tb = null;
                    var page = null;
                    for (var i = 0, length_8 = drawCommands.length; i < length_8; ++i) {
                        cmd = drawCommands[i];
                        anchorX = cmd.anchorX;
                        anchorY = cmd.anchorY;
                        textBlocks = cmd.textBlocks;
                        buffer.$offsetX = saveOffsetX + anchorX;
                        for (var j = 0, length1 = textBlocks.length; j < length1; ++j) {
                            tb = textBlocks[j];
                            if (j > 0) {
                                buffer.$offsetX -= tb.canvasWidthOffset;
                            }
                            buffer.$offsetY = saveOffsetY + anchorY - (tb.measureHeight + (tb.stroke2 ? tb.canvasHeightOffset : 0)) / 2;
                            page = tb.line.page;
                            buffer.context.drawTexture(page.webGLTexture, tb.u, tb.v, tb.contentWidth, tb.contentHeight, 0, 0, tb.contentWidth, tb.contentHeight, page.pageWidth, page.pageHeight);
                            buffer.$offsetX += (tb.contentWidth - tb.canvasWidthOffset);
                        }
                    }
                    //还原回去
                    buffer.$offsetX = saveOffsetX;
                    buffer.$offsetY = saveOffsetY;
                }
                if (x || y) {
                    buffer.transform(1, 0, 0, 1, -x / canvasScaleX, -y / canvasScaleY);
                }
                node.dirtyRender = false;
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.renderText = function (node, buffer) {
                if (baidugame.textAtlasRenderEnable) {
                    //新的文字渲染机制
                    this.___renderText____(node, buffer);
                    return;
                }
                var width = node.width - node.x;
                var height = node.height - node.y;
                if (width <= 0 || height <= 0 || !width || !height || node.drawData.length == 0) {
                    return;
                }
                var canvasScaleX = egret.sys.DisplayList.$canvasScaleX;
                var canvasScaleY = egret.sys.DisplayList.$canvasScaleY;
                var maxTextureSize = buffer.context.$maxTextureSize;
                if (width * canvasScaleX > maxTextureSize) {
                    canvasScaleX *= maxTextureSize / (width * canvasScaleX);
                }
                if (height * canvasScaleY > maxTextureSize) {
                    canvasScaleY *= maxTextureSize / (height * canvasScaleY);
                }
                width *= canvasScaleX;
                height *= canvasScaleY;
                var x = node.x * canvasScaleX;
                var y = node.y * canvasScaleY;
                if (node.$canvasScaleX != canvasScaleX || node.$canvasScaleY != canvasScaleY) {
                    node.$canvasScaleX = canvasScaleX;
                    node.$canvasScaleY = canvasScaleY;
                    node.dirtyRender = true;
                }
                if (this.wxiOS10) {
                    if (!this.canvasRenderer) {
                        this.canvasRenderer = new egret.CanvasRenderer();
                    }
                    if (node.dirtyRender) {
                        this.canvasRenderBuffer = new baidugame.CanvasRenderBuffer(width, height);
                    }
                }
                else {
                    if (!this.canvasRenderBuffer || !this.canvasRenderBuffer.context) {
                        this.canvasRenderer = new egret.CanvasRenderer();
                        this.canvasRenderBuffer = new baidugame.CanvasRenderBuffer(width, height);
                    }
                    else if (node.dirtyRender) {
                        this.canvasRenderBuffer.resize(width, height);
                    }
                }
                if (!this.canvasRenderBuffer.context) {
                    return;
                }
                if (canvasScaleX != 1 || canvasScaleY != 1) {
                    this.canvasRenderBuffer.context.setTransform(canvasScaleX, 0, 0, canvasScaleY, 0, 0);
                }
                if (x || y) {
                    if (node.dirtyRender) {
                        this.canvasRenderBuffer.context.setTransform(canvasScaleX, 0, 0, canvasScaleY, -x, -y);
                    }
                    buffer.transform(1, 0, 0, 1, x / canvasScaleX, y / canvasScaleY);
                }
                else if (canvasScaleX != 1 || canvasScaleY != 1) {
                    this.canvasRenderBuffer.context.setTransform(canvasScaleX, 0, 0, canvasScaleY, 0, 0);
                }
                if (node.dirtyRender) {
                    var surface = this.canvasRenderBuffer.surface;
                    this.canvasRenderer.renderText(node, this.canvasRenderBuffer.context);
                    if (this.wxiOS10) {
                        surface["isCanvas"] = true;
                        node.$texture = surface;
                    }
                    else {
                        // 拷贝canvas到texture
                        var texture = node.$texture;
                        if (!texture) {
                            texture = buffer.context.createTexture(surface);
                            node.$texture = texture;
                        }
                        else {
                            // 重新拷贝新的图像
                            buffer.context.updateTexture(texture, surface);
                        }
                    }
                    // 保存材质尺寸
                    node.$textureWidth = surface.width;
                    node.$textureHeight = surface.height;
                }
                var textureWidth = node.$textureWidth;
                var textureHeight = node.$textureHeight;
                buffer.context.drawTexture(node.$texture, 0, 0, textureWidth, textureHeight, 0, 0, textureWidth / canvasScaleX, textureHeight / canvasScaleY, textureWidth, textureHeight);
                if (x || y) {
                    if (node.dirtyRender) {
                        this.canvasRenderBuffer.context.setTransform(canvasScaleX, 0, 0, canvasScaleY, 0, 0);
                    }
                    buffer.transform(1, 0, 0, 1, -x / canvasScaleX, -y / canvasScaleY);
                }
                node.dirtyRender = false;
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.renderGraphics = function (node, buffer, forHitTest) {
                var width = node.width;
                var height = node.height;
                if (width <= 0 || height <= 0 || !width || !height || node.drawData.length == 0) {
                    return;
                }
                var canvasScaleX = egret.sys.DisplayList.$canvasScaleX;
                var canvasScaleY = egret.sys.DisplayList.$canvasScaleY;
                if (width * canvasScaleX < 1 || height * canvasScaleY < 1) {
                    canvasScaleX = canvasScaleY = 1;
                }
                if (node.$canvasScaleX != canvasScaleX || node.$canvasScaleY != canvasScaleY) {
                    node.$canvasScaleX = canvasScaleX;
                    node.$canvasScaleY = canvasScaleY;
                    node.dirtyRender = true;
                }
                //缩放叠加 width2 / width 填满整个区域
                width = width * canvasScaleX;
                height = height * canvasScaleY;
                var width2 = Math.ceil(width);
                var height2 = Math.ceil(height);
                canvasScaleX *= width2 / width;
                canvasScaleY *= height2 / height;
                width = width2;
                height = height2;
                if (this.wxiOS10) {
                    if (!this.canvasRenderer) {
                        this.canvasRenderer = new egret.CanvasRenderer();
                    }
                    if (node.dirtyRender) {
                        this.canvasRenderBuffer = new baidugame.CanvasRenderBuffer(width, height);
                    }
                }
                else {
                    if (!this.canvasRenderBuffer || !this.canvasRenderBuffer.context) {
                        this.canvasRenderer = new egret.CanvasRenderer();
                        this.canvasRenderBuffer = new baidugame.CanvasRenderBuffer(width, height);
                    }
                    else if (node.dirtyRender) {
                        this.canvasRenderBuffer.resize(width, height);
                    }
                }
                if (!this.canvasRenderBuffer.context) {
                    return;
                }
                if (canvasScaleX != 1 || canvasScaleY != 1) {
                    this.canvasRenderBuffer.context.setTransform(canvasScaleX, 0, 0, canvasScaleY, 0, 0);
                }
                if (node.x || node.y) {
                    if (node.dirtyRender || forHitTest) {
                        this.canvasRenderBuffer.context.translate(-node.x, -node.y);
                    }
                    buffer.transform(1, 0, 0, 1, node.x, node.y);
                }
                var surface = this.canvasRenderBuffer.surface;
                if (forHitTest) {
                    this.canvasRenderer.renderGraphics(node, this.canvasRenderBuffer.context, true);
                    var texture = void 0;
                    if (this.wxiOS10) {
                        surface["isCanvas"] = true;
                        texture = surface;
                    }
                    else {
                        egret.WebGLUtils.deleteWebGLTexture(surface);
                        texture = buffer.context.getWebGLTexture(surface);
                    }
                    buffer.context.drawTexture(texture, 0, 0, width, height, 0, 0, width, height, surface.width, surface.height);
                }
                else {
                    if (node.dirtyRender) {
                        this.canvasRenderer.renderGraphics(node, this.canvasRenderBuffer.context);
                        if (this.wxiOS10) {
                            surface["isCanvas"] = true;
                            node.$texture = surface;
                        }
                        else {
                            // 拷贝canvas到texture
                            var texture = node.$texture;
                            if (!texture) {
                                texture = buffer.context.createTexture(surface);
                                node.$texture = texture;
                            }
                            else {
                                // 重新拷贝新的图像
                                buffer.context.updateTexture(texture, surface);
                            }
                        }
                        // 保存材质尺寸
                        node.$textureWidth = surface.width;
                        node.$textureHeight = surface.height;
                    }
                    var textureWidth = node.$textureWidth;
                    var textureHeight = node.$textureHeight;
                    buffer.context.drawTexture(node.$texture, 0, 0, textureWidth, textureHeight, 0, 0, textureWidth / canvasScaleX, textureHeight / canvasScaleY, textureWidth, textureHeight);
                }
                if (node.x || node.y) {
                    if (node.dirtyRender || forHitTest) {
                        this.canvasRenderBuffer.context.translate(node.x, node.y);
                    }
                    buffer.transform(1, 0, 0, 1, -node.x, -node.y);
                }
                if (!forHitTest) {
                    node.dirtyRender = false;
                }
            };
            WebGLRenderer.prototype.renderGroup = function (groupNode, buffer) {
                var m = groupNode.matrix;
                var savedMatrix;
                var offsetX;
                var offsetY;
                if (m) {
                    savedMatrix = egret.Matrix.create();
                    var curMatrix = buffer.globalMatrix;
                    savedMatrix.a = curMatrix.a;
                    savedMatrix.b = curMatrix.b;
                    savedMatrix.c = curMatrix.c;
                    savedMatrix.d = curMatrix.d;
                    savedMatrix.tx = curMatrix.tx;
                    savedMatrix.ty = curMatrix.ty;
                    offsetX = buffer.$offsetX;
                    offsetY = buffer.$offsetY;
                    buffer.useOffset();
                    buffer.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                var children = groupNode.drawData;
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var node = children[i];
                    this.renderNode(node, buffer, buffer.$offsetX, buffer.$offsetY);
                }
                if (m) {
                    var matrix = buffer.globalMatrix;
                    matrix.a = savedMatrix.a;
                    matrix.b = savedMatrix.b;
                    matrix.c = savedMatrix.c;
                    matrix.d = savedMatrix.d;
                    matrix.tx = savedMatrix.tx;
                    matrix.ty = savedMatrix.ty;
                    buffer.$offsetX = offsetX;
                    buffer.$offsetY = offsetY;
                    egret.Matrix.release(savedMatrix);
                }
            };
            /**
             * @private
             */
            WebGLRenderer.prototype.createRenderBuffer = function (width, height) {
                var buffer = renderBufferPool.pop();
                if (buffer) {
                    buffer.resize(width, height);
                }
                else {
                    buffer = new baidugame.WebGLRenderBuffer(width, height);
                    buffer.$computeDrawCall = false;
                }
                return buffer;
            };
            return WebGLRenderer;
        }());
        baidugame.WebGLRenderer = WebGLRenderer;
        __reflect(WebGLRenderer.prototype, "egret.baidugame.WebGLRenderer", ["egret.sys.SystemRenderer"]);
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var EgretWebGLAttribute = (function () {
            function EgretWebGLAttribute(gl, program, attributeData) {
                this.gl = gl;
                this.name = attributeData.name;
                this.type = attributeData.type;
                this.size = attributeData.size;
                this.location = gl.getAttribLocation(program, this.name);
                this.count = 0;
                this.initCount(gl);
                this.format = gl.FLOAT;
                this.initFormat(gl);
            }
            EgretWebGLAttribute.prototype.initCount = function (gl) {
                var type = this.type;
                switch (type) {
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT:
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.BYTE:
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.UNSIGNED_BYTE:
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.UNSIGNED_SHORT:
                        this.count = 1;
                        break;
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC2:
                        this.count = 2;
                        break;
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC3:
                        this.count = 3;
                        break;
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC4:
                        this.count = 4;
                        break;
                }
            };
            EgretWebGLAttribute.prototype.initFormat = function (gl) {
                var type = this.type;
                switch (type) {
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT:
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC2:
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC3:
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.FLOAT_VEC4:
                        this.format = gl.FLOAT;
                        break;
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.UNSIGNED_BYTE:
                        this.format = gl.UNSIGNED_BYTE;
                        break;
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.UNSIGNED_SHORT:
                        this.format = gl.UNSIGNED_SHORT;
                        break;
                    case baidugame.WEBGL_ATTRIBUTE_TYPE.BYTE:
                        this.format = gl.BYTE;
                        break;
                }
            };
            return EgretWebGLAttribute;
        }());
        baidugame.EgretWebGLAttribute = EgretWebGLAttribute;
        __reflect(EgretWebGLAttribute.prototype, "egret.baidugame.EgretWebGLAttribute");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        function loadShader(gl, type, source) {
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compiled) {
                console.log("shader not compiled!");
                console.log(gl.getShaderInfoLog(shader));
            }
            return shader;
        }
        function createWebGLProgram(gl, vertexShader, fragmentShader) {
            var program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            return program;
        }
        function extractAttributes(gl, program) {
            var attributes = {};
            var totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
            for (var i = 0; i < totalAttributes; i++) {
                var attribData = gl.getActiveAttrib(program, i);
                var name_2 = attribData.name;
                var attribute = new baidugame.EgretWebGLAttribute(gl, program, attribData);
                attributes[name_2] = attribute;
            }
            return attributes;
        }
        function extractUniforms(gl, program) {
            var uniforms = {};
            var totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            for (var i = 0; i < totalUniforms; i++) {
                var uniformData = gl.getActiveUniform(program, i);
                var name_3 = uniformData.name;
                var uniform = new baidugame.EgretWebGLUniform(gl, program, uniformData);
                uniforms[name_3] = uniform;
            }
            return uniforms;
        }
        /**
         * @private
         */
        var EgretWebGLProgram = (function () {
            function EgretWebGLProgram(gl, vertSource, fragSource) {
                this.vshaderSource = vertSource;
                this.fshaderSource = fragSource;
                this.vertexShader = loadShader(gl, gl.VERTEX_SHADER, this.vshaderSource);
                this.fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, this.fshaderSource);
                this.id = createWebGLProgram(gl, this.vertexShader, this.fragmentShader);
                this.uniforms = extractUniforms(gl, this.id);
                this.attributes = extractAttributes(gl, this.id);
            }
            /**
             * 获取所需的WebGL Program
             * @param key {string} 对于唯一的program程序，对应唯一的key
             */
            EgretWebGLProgram.getProgram = function (gl, vertSource, fragSource, key) {
                if (!this.programCache[key]) {
                    this.programCache[key] = new EgretWebGLProgram(gl, vertSource, fragSource);
                }
                return this.programCache[key];
            };
            EgretWebGLProgram.deleteProgram = function (gl, vertSource, fragSource, key) {
                // TODO delete
            };
            EgretWebGLProgram.programCache = {};
            return EgretWebGLProgram;
        }());
        baidugame.EgretWebGLProgram = EgretWebGLProgram;
        __reflect(EgretWebGLProgram.prototype, "egret.baidugame.EgretWebGLProgram");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        /**
         * @private
         */
        var EgretWebGLUniform = (function () {
            function EgretWebGLUniform(gl, program, uniformData) {
                this.gl = gl;
                this.name = uniformData.name;
                this.type = uniformData.type;
                this.size = uniformData.size;
                this.location = gl.getUniformLocation(program, this.name);
                this.setDefaultValue();
                this.generateSetValue();
                this.generateUpload();
            }
            EgretWebGLUniform.prototype.setDefaultValue = function () {
                var type = this.type;
                switch (type) {
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT:
                    case baidugame.WEBGL_UNIFORM_TYPE.SAMPLER_2D:
                    case baidugame.WEBGL_UNIFORM_TYPE.SAMPLER_CUBE:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT:
                        this.value = 0;
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC2:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC2:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC2:
                        this.value = [0, 0];
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC3:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC3:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC3:
                        this.value = [0, 0, 0];
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC4:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC4:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC4:
                        this.value = [0, 0, 0, 0];
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT2:
                        this.value = new Float32Array([
                            1, 0,
                            0, 1
                        ]);
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT3:
                        this.value = new Float32Array([
                            1, 0, 0,
                            0, 1, 0,
                            0, 0, 1
                        ]);
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT4:
                        this.value = new Float32Array([
                            1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1
                        ]);
                        break;
                }
            };
            EgretWebGLUniform.prototype.generateSetValue = function () {
                var type = this.type;
                switch (type) {
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT:
                    case baidugame.WEBGL_UNIFORM_TYPE.SAMPLER_2D:
                    case baidugame.WEBGL_UNIFORM_TYPE.SAMPLER_CUBE:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT:
                        this.setValue = function (value) {
                            var notEqual = this.value !== value;
                            this.value = value;
                            notEqual && this.upload();
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC2:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC2:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC2:
                        this.setValue = function (value) {
                            var notEqual = this.value[0] !== value.x || this.value[1] !== value.y;
                            this.value[0] = value.x;
                            this.value[1] = value.y;
                            notEqual && this.upload();
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC3:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC3:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC3:
                        this.setValue = function (value) {
                            this.value[0] = value.x;
                            this.value[1] = value.y;
                            this.value[2] = value.z;
                            this.upload();
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC4:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC4:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC4:
                        this.setValue = function (value) {
                            this.value[0] = value.x;
                            this.value[1] = value.y;
                            this.value[2] = value.z;
                            this.value[3] = value.w;
                            this.upload();
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT2:
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT3:
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT4:
                        this.setValue = function (value) {
                            this.value.set(value);
                            this.upload();
                        };
                        break;
                }
            };
            EgretWebGLUniform.prototype.generateUpload = function () {
                var gl = this.gl;
                var type = this.type;
                var location = this.location;
                switch (type) {
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform1f(location, value);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC2:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform2f(location, value[0], value[1]);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC3:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform3f(location, value[0], value[1], value[2]);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_VEC4:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform4f(location, value[0], value[1], value[2], value[3]);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.SAMPLER_2D:
                    case baidugame.WEBGL_UNIFORM_TYPE.SAMPLER_CUBE:
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform1i(location, value);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC2:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC2:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform2i(location, value[0], value[1]);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC3:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC3:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform3i(location, value[0], value[1], value[2]);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.BOOL_VEC4:
                    case baidugame.WEBGL_UNIFORM_TYPE.INT_VEC4:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform4i(location, value[0], value[1], value[2], value[3]);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT2:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniformMatrix2fv(location, false, value);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT3:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniformMatrix3fv(location, false, value);
                        };
                        break;
                    case baidugame.WEBGL_UNIFORM_TYPE.FLOAT_MAT4:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniformMatrix4fv(location, false, value);
                        };
                        break;
                }
            };
            return EgretWebGLUniform;
        }());
        baidugame.EgretWebGLUniform = EgretWebGLUniform;
        __reflect(EgretWebGLUniform.prototype, "egret.baidugame.EgretWebGLUniform");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        var EgretShaderLib = (function () {
            function EgretShaderLib() {
            }
            EgretShaderLib.blur_frag = "precision mediump float;\r\nuniform vec2 blur;\r\nuniform sampler2D uSampler;\r\nvarying vec2 vTextureCoord;\r\nuniform vec2 uTextureSize;\r\nvoid main()\r\n{\r\n    const int sampleRadius = 5;\r\n    const int samples = sampleRadius * 2 + 1;\r\n    vec2 blurUv = blur / uTextureSize;\r\n    vec4 color = vec4(0, 0, 0, 0);\r\n    vec2 uv = vec2(0.0, 0.0);\r\n    blurUv /= float(sampleRadius);\r\n\r\n    for (int i = -sampleRadius; i <= sampleRadius; i++) {\r\n        uv.x = vTextureCoord.x + float(i) * blurUv.x;\r\n        uv.y = vTextureCoord.y + float(i) * blurUv.y;\r\n        color += texture2D(uSampler, uv);\r\n    }\r\n\r\n    color /= float(samples);\r\n    gl_FragColor = color;\r\n}";
            EgretShaderLib.colorTransform_frag = "precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\nuniform mat4 matrix;\r\nuniform vec4 colorAdd;\r\nuniform sampler2D uSampler;\r\n\r\nvoid main(void) {\r\n    vec4 texColor = texture2D(uSampler, vTextureCoord);\r\n    if(texColor.a > 0.) {\r\n        // 抵消预乘的alpha通道\r\n        texColor = vec4(texColor.rgb / texColor.a, texColor.a);\r\n    }\r\n    vec4 locColor = clamp(texColor * matrix + colorAdd, 0., 1.);\r\n    gl_FragColor = vColor * vec4(locColor.rgb * locColor.a, locColor.a);\r\n}";
            EgretShaderLib.default_vert = "attribute vec2 aVertexPosition;\r\nattribute vec2 aTextureCoord;\r\nattribute vec2 aColor;\r\n\r\nuniform vec2 projectionVector;\r\n// uniform vec2 offsetVector;\r\n\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\n\r\nconst vec2 center = vec2(-1.0, 1.0);\r\n\r\nvoid main(void) {\r\n   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\r\n   vTextureCoord = aTextureCoord;\r\n   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\r\n}";
            EgretShaderLib.glow_frag = "precision highp float;\r\nvarying vec2 vTextureCoord;\r\n\r\nuniform sampler2D uSampler;\r\n\r\nuniform float dist;\r\nuniform float angle;\r\nuniform vec4 color;\r\nuniform float alpha;\r\nuniform float blurX;\r\nuniform float blurY;\r\n// uniform vec4 quality;\r\nuniform float strength;\r\nuniform float inner;\r\nuniform float knockout;\r\nuniform float hideObject;\r\n\r\nuniform vec2 uTextureSize;\r\n\r\nfloat random(vec2 scale)\r\n{\r\n    return fract(sin(dot(gl_FragCoord.xy, scale)) * 43758.5453);\r\n}\r\n\r\nvoid main(void) {\r\n    vec2 px = vec2(1.0 / uTextureSize.x, 1.0 / uTextureSize.y);\r\n    // TODO 自动调节采样次数？\r\n    const float linearSamplingTimes = 7.0;\r\n    const float circleSamplingTimes = 12.0;\r\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\r\n    vec4 curColor;\r\n    float totalAlpha = 0.0;\r\n    float maxTotalAlpha = 0.0;\r\n    float curDistanceX = 0.0;\r\n    float curDistanceY = 0.0;\r\n    float offsetX = dist * cos(angle) * px.x;\r\n    float offsetY = dist * sin(angle) * px.y;\r\n\r\n    const float PI = 3.14159265358979323846264;\r\n    float cosAngle;\r\n    float sinAngle;\r\n    float offset = PI * 2.0 / circleSamplingTimes * random(vec2(12.9898, 78.233));\r\n    float stepX = blurX * px.x / linearSamplingTimes;\r\n    float stepY = blurY * px.y / linearSamplingTimes;\r\n    for (float a = 0.0; a <= PI * 2.0; a += PI * 2.0 / circleSamplingTimes) {\r\n        cosAngle = cos(a + offset);\r\n        sinAngle = sin(a + offset);\r\n        for (float i = 1.0; i <= linearSamplingTimes; i++) {\r\n            curDistanceX = i * stepX * cosAngle;\r\n            curDistanceY = i * stepY * sinAngle;\r\n            if (vTextureCoord.x + curDistanceX - offsetX >= 0.0 && vTextureCoord.y + curDistanceY + offsetY <= 1.0){\r\n                curColor = texture2D(uSampler, vec2(vTextureCoord.x + curDistanceX - offsetX, vTextureCoord.y + curDistanceY + offsetY));\r\n                totalAlpha += (linearSamplingTimes - i) * curColor.a;\r\n            }\r\n            maxTotalAlpha += (linearSamplingTimes - i);\r\n        }\r\n    }\r\n\r\n    ownColor.a = max(ownColor.a, 0.0001);\r\n    ownColor.rgb = ownColor.rgb / ownColor.a;\r\n\r\n    float outerGlowAlpha = (totalAlpha / maxTotalAlpha) * strength * alpha * (1. - inner) * max(min(hideObject, knockout), 1. - ownColor.a);\r\n    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * strength * alpha * inner * ownColor.a;\r\n\r\n    ownColor.a = max(ownColor.a * knockout * (1. - hideObject), 0.0001);\r\n    vec3 mix1 = mix(ownColor.rgb, color.rgb, innerGlowAlpha / (innerGlowAlpha + ownColor.a));\r\n    vec3 mix2 = mix(mix1, color.rgb, outerGlowAlpha / (innerGlowAlpha + ownColor.a + outerGlowAlpha));\r\n    float resultAlpha = min(ownColor.a + outerGlowAlpha + innerGlowAlpha, 1.);\r\n    gl_FragColor = vec4(mix2 * resultAlpha, resultAlpha);\r\n}";
            EgretShaderLib.primitive_frag = "precision lowp float;\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\n\r\nvoid main(void) {\r\n    gl_FragColor = vColor;\r\n}";
            EgretShaderLib.texture_frag = "precision lowp float;\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\nuniform sampler2D uSampler;\r\n\r\nvoid main(void) {\r\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\r\n}";
            /*
            "precision lowp float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform sampler2D uSampler;
            uniform sampler2D uSamplerAlphaMask;
            void main(void) {
                float alpha = texture2D(uSamplerAlphaMask, vTextureCoord).r;
                if (alpha < 0.0039) { discard; }
                vec4 v4Color = texture2D(uSampler, vTextureCoord);
                v4Color.rgb = v4Color.rgb * alpha;
                v4Color.a = alpha;
                gl_FragColor = v4Color * vColor;
            }"
            */
            EgretShaderLib.texture_etc_alphamask_frag = "precision lowp float;\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\nuniform sampler2D uSampler;\r\nuniform sampler2D uSamplerAlphaMask;\r\nvoid main(void) {\r\nfloat alpha = texture2D(uSamplerAlphaMask, vTextureCoord).r;\r\nif (alpha < 0.0039) { discard; }\r\nvec4 v4Color = texture2D(uSampler, vTextureCoord);\r\nv4Color.rgb = v4Color.rgb * alpha;\r\nv4Color.a = alpha;\r\ngl_FragColor = v4Color * vColor;\r\n}";
            /*
            "precision mediump float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform mat4 matrix;
            uniform vec4 colorAdd;
            uniform sampler2D uSampler;
            uniform sampler2D uSamplerAlphaMask;
    
            void main(void){
                float alpha = texture2D(uSamplerAlphaMask, vTextureCoord);
                if (alpha < 0.0039) { discard; }
                vec4 texColor = texture2D(uSampler, vTextureCoord);
                if(texColor.a > 0.0) {
                    // 抵消预乘的alpha通道
                    texColor = vec4(texColor.rgb / texColor.a, texColor.a);
                }
                vec4 v4Color = clamp(texColor * matrix + colorAdd, 0.0, 1.0);
                v4Color.rgb = v4Color.rgb * alpha;
                v4Color.a = alpha;
                gl_FragColor = v4Color * vColor;
            }"
            */
            EgretShaderLib.colorTransform_frag_etc_alphamask_frag = "precision mediump float;\r\nvarying vec2 vTextureCoord;\r\nvarying vec4 vColor;\r\nuniform mat4 matrix;\r\nuniform vec4 colorAdd;\r\nuniform sampler2D uSampler;\r\nuniform sampler2D uSamplerAlphaMask;\r\n\r\nvoid main(void){\r\nfloat alpha = texture2D(uSamplerAlphaMask, vTextureCoord);\r\nif (alpha < 0.0039) { discard; }\r\nvec4 texColor = texture2D(uSampler, vTextureCoord);\r\nif(texColor.a > 0.0) {\r\n // 抵消预乘的alpha通道\r\ntexColor = vec4(texColor.rgb / texColor.a, texColor.a);\r\n}\r\nvec4 v4Color = clamp(texColor * matrix + colorAdd, 0.0, 1.0);\r\nv4Color.rgb = v4Color.rgb * alpha;\r\nv4Color.a = alpha;\r\ngl_FragColor = v4Color * vColor;\r\n}";
            return EgretShaderLib;
        }());
        baidugame.EgretShaderLib = EgretShaderLib;
        __reflect(EgretShaderLib.prototype, "egret.baidugame.EgretShaderLib");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
;
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/*
*** 一个管理模型，逐级包含: back -> page -> line -> textBlock
*/

(function (egret) {
    var baidugame;
    (function (baidugame) {
        var TextBlock = (function (_super) {
            __extends(TextBlock, _super);
            function TextBlock(width, height, measureWidth, measureHeight, canvasWidthOffset, canvasHeightOffset, stroke2, border) {
                var _this = _super.call(this) || this;
                _this._width = 0;
                _this._height = 0;
                _this._border = 0;
                _this.line = null;
                _this.x = 0;
                _this.y = 0;
                _this.u = 0;
                _this.v = 0;
                _this.tag = '';
                _this.measureWidth = 0;
                _this.measureHeight = 0;
                _this.canvasWidthOffset = 0;
                _this.canvasHeightOffset = 0;
                _this.stroke2 = 0;
                _this._width = width;
                _this._height = height;
                _this._border = border;
                _this.measureWidth = measureWidth;
                _this.measureHeight = measureHeight;
                _this.canvasWidthOffset = canvasWidthOffset;
                _this.canvasHeightOffset = canvasHeightOffset;
                _this.stroke2 = stroke2;
                return _this;
            }
            Object.defineProperty(TextBlock.prototype, "border", {
                get: function () {
                    return this._border;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBlock.prototype, "width", {
                get: function () {
                    return this._width + this.border * 2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBlock.prototype, "height", {
                get: function () {
                    return this._height + this.border * 2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBlock.prototype, "contentWidth", {
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBlock.prototype, "contentHeight", {
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBlock.prototype, "page", {
                get: function () {
                    return this.line ? this.line.page : null;
                },
                enumerable: true,
                configurable: true
            });
            TextBlock.prototype.updateUV = function () {
                var line = this.line;
                if (!line) {
                    return false; //不属于任何的line就是错的
                }
                this.u = line.x + this.x + this.border * 1;
                this.v = line.y + this.y + this.border * 1;
                return true;
            };
            Object.defineProperty(TextBlock.prototype, "subImageOffsetX", {
                get: function () {
                    var line = this.line;
                    if (!line) {
                        return 0;
                    }
                    return line.x + this.x + this.border;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBlock.prototype, "subImageOffsetY", {
                get: function () {
                    var line = this.line;
                    if (!line) {
                        return 0;
                    }
                    return line.y + this.y + this.border;
                },
                enumerable: true,
                configurable: true
            });
            return TextBlock;
        }(egret.HashObject));
        baidugame.TextBlock = TextBlock;
        __reflect(TextBlock.prototype, "egret.baidugame.TextBlock");
        var Line = (function (_super) {
            __extends(Line, _super);
            function Line(maxWidth) {
                var _this = _super.call(this) || this;
                _this.page = null;
                _this.textBlocks = [];
                _this.dynamicMaxHeight = 0;
                _this.maxWidth = 0;
                _this.x = 0;
                _this.y = 0;
                _this.maxWidth = maxWidth;
                return _this;
            }
            Line.prototype.isCapacityOf = function (textBlock) {
                if (!textBlock) {
                    return false;
                }
                //
                var posx = 0;
                var posy = 0;
                var lastTxtBlock = this.lastTextBlock();
                if (lastTxtBlock) {
                    posx = lastTxtBlock.x + lastTxtBlock.width;
                    posy = lastTxtBlock.y;
                }
                //
                if (posx + textBlock.width > this.maxWidth) {
                    return false; //宽度不够
                }
                //
                if (this.dynamicMaxHeight > 0) {
                    if (textBlock.height > this.dynamicMaxHeight || (textBlock.height / this.dynamicMaxHeight < 0.5)) {
                        return false; //如果有已经有动态高度，到这里，要么高度不够，要么小于动态高度的0.6差距, 就不填充
                    }
                }
                return true;
            };
            Line.prototype.lastTextBlock = function () {
                var textBlocks = this.textBlocks;
                if (textBlocks.length > 0) {
                    return textBlocks[textBlocks.length - 1];
                }
                return null;
            };
            Line.prototype.addTextBlock = function (textBlock, needCheck) {
                //
                if (!textBlock) {
                    return false;
                }
                //
                if (needCheck) {
                    if (!this.isCapacityOf(textBlock)) {
                        return false;
                    }
                }
                //
                var posx = 0;
                var posy = 0;
                var lastTxtBlock = this.lastTextBlock();
                if (lastTxtBlock) {
                    posx = lastTxtBlock.x + lastTxtBlock.width;
                    posy = lastTxtBlock.y;
                }
                //
                textBlock.x = posx;
                textBlock.y = posy;
                textBlock.line = this;
                this.textBlocks.push(textBlock);
                this.dynamicMaxHeight = Math.max(this.dynamicMaxHeight, textBlock.height);
                return true;
            };
            return Line;
        }(egret.HashObject));
        baidugame.Line = Line;
        __reflect(Line.prototype, "egret.baidugame.Line");
        var Page = (function (_super) {
            __extends(Page, _super);
            function Page(pageWidth, pageHeight) {
                var _this = _super.call(this) || this;
                _this.lines = [];
                _this.pageWidth = 0;
                _this.pageHeight = 0;
                _this.webGLTexture = null;
                _this.pageWidth = pageWidth;
                _this.pageHeight = pageHeight;
                return _this;
            }
            Page.prototype.addLine = function (line) {
                if (!line) {
                    return false;
                }
                //
                var posx = 0;
                var posy = 0;
                //
                var lines = this.lines;
                if (lines.length > 0) {
                    var lastLine = lines[lines.length - 1];
                    posx = lastLine.x;
                    posy = lastLine.y + lastLine.dynamicMaxHeight;
                }
                if (line.maxWidth > this.pageWidth) {
                    console.error('line.maxWidth = ' + line.maxWidth + ', ' + 'this.pageWidth = ' + this.pageWidth);
                    return false; //宽度不够
                }
                if (posy + line.dynamicMaxHeight > this.pageHeight) {
                    return false; //满了
                }
                //更新数据
                line.x = posx;
                line.y = posy;
                line.page = this;
                this.lines.push(line);
                return true;
            };
            return Page;
        }(egret.HashObject));
        baidugame.Page = Page;
        __reflect(Page.prototype, "egret.baidugame.Page");
        var Book = (function (_super) {
            __extends(Book, _super);
            function Book(maxSize, border) {
                var _this = _super.call(this) || this;
                _this._pages = [];
                _this._sortLines = [];
                _this._maxSize = 1024;
                _this._border = 1;
                _this._maxSize = maxSize;
                _this._border = border;
                return _this;
            }
            Book.prototype.addTextBlock = function (textBlock) {
                var result = this._addTextBlock(textBlock);
                if (!result) {
                    return false;
                }
                //更新下uv
                textBlock.updateUV();
                //没有才要添加
                var exist = false;
                var cast = result;
                var _sortLines = this._sortLines;
                for (var _i = 0, _sortLines_1 = _sortLines; _i < _sortLines_1.length; _i++) {
                    var line = _sortLines_1[_i];
                    if (line === cast[1]) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    _sortLines.push(cast[1]);
                }
                //重新排序
                this.sort();
                return true;
            };
            Book.prototype._addTextBlock = function (textBlock) {
                if (!textBlock) {
                    return null;
                }
                if (textBlock.width > this._maxSize || textBlock.height > this._maxSize) {
                    //console.log('this._maxSize = ' + this._maxSize + ', textBlock.width = ' + textBlock.width + ', textBlock.height = ' + textBlock.height);
                    return null;
                }
                //找到最合适的
                var _sortLines = this._sortLines;
                for (var i = 0, length_9 = _sortLines.length; i < length_9; ++i) {
                    var line = _sortLines[i];
                    if (!line.isCapacityOf(textBlock)) {
                        continue;
                    }
                    if (line.addTextBlock(textBlock, false)) {
                        return [line.page, line];
                    }
                }
                //做新的行
                var newLine = new Line(this._maxSize);
                if (!newLine.addTextBlock(textBlock, true)) {
                    console.error('_addTextBlock !newLine.addTextBlock(textBlock, true)');
                    return null;
                }
                //现有的page中插入
                var _pages = this._pages;
                for (var i = 0, length_10 = _pages.length; i < length_10; ++i) {
                    var page = _pages[i];
                    if (page.addLine(newLine)) {
                        return [page, newLine];
                    }
                }
                //都没有，就做新的page
                //添加目标行
                var newPage = this.createPage(this._maxSize, this._maxSize);
                if (!newPage.addLine(newLine)) {
                    console.error('_addText newPage.addLine failed');
                    return null;
                }
                return [newPage, newLine];
            };
            Book.prototype.createPage = function (pageWidth, pageHeight) {
                var newPage = new Page(pageWidth, pageHeight);
                this._pages.push(newPage);
                return newPage;
            };
            Book.prototype.sort = function () {
                if (this._sortLines.length <= 1) {
                    return;
                }
                var sortFunc = function (a, b) {
                    return (a.dynamicMaxHeight < b.dynamicMaxHeight) ? -1 : 1;
                };
                this._sortLines = this._sortLines.sort(sortFunc);
            };
            Book.prototype.createTextBlock = function (tag, width, height, measureWidth, measureHeight, canvasWidthOffset, canvasHeightOffset, stroke2) {
                var txtBlock = new TextBlock(width, height, measureWidth, measureHeight, canvasWidthOffset, canvasHeightOffset, stroke2, this._border);
                if (!this.addTextBlock(txtBlock)) {
                    //走到这里几乎是不可能的，除非内存分配没了
                    //暂时还没有到提交纹理的地步，现在都是虚拟的
                    return null;
                }
                txtBlock.tag = tag;
                return txtBlock;
            };
            return Book;
        }(egret.HashObject));
        baidugame.Book = Book;
        __reflect(Book.prototype, "egret.baidugame.Book");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

(function (egret) {
    var baidugame;
    (function (baidugame) {
        //测试开关,打开会截住老的字体渲染
        baidugame.textAtlasRenderEnable = false;
        //测试对象, 先不用singleton的，后续整理代码，就new一个，放在全局的context上做成员变量
        baidugame.__textAtlasRender__ = null;
        //不想改TextNode的代码了，先用这种方式实现，以后稳了再改
        baidugame.property_drawLabel = 'DrawLabel';
        //开启这个，用textAtlas渲染出来的，都是红字，而且加黑框
        var textAtlasDebug = false;
        //画一行
        var DrawLabel = (function (_super) {
            __extends(DrawLabel, _super);
            function DrawLabel() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //记录初始位置
                _this.anchorX = 0;
                _this.anchorY = 0;
                //要画的字块
                _this.textBlocks = [];
                return _this;
            }
            //清除数据，回池
            DrawLabel.prototype.clear = function () {
                this.anchorX = 0;
                this.anchorY = 0;
                this.textBlocks.length = 0; //这个没事,实体在book里面存着
            };
            //池子创建
            DrawLabel.create = function () {
                var pool = DrawLabel.pool;
                if (pool.length === 0) {
                    pool.push(new DrawLabel);
                }
                return pool.pop();
            };
            //回池
            DrawLabel.back = function (drawLabel, checkRepeat) {
                if (!drawLabel) {
                    return;
                }
                var pool = DrawLabel.pool;
                if (checkRepeat && pool.indexOf(drawLabel) >= 0) {
                    console.error('DrawLabel.back repeat');
                    return;
                }
                drawLabel.clear();
                pool.push(drawLabel);
            };
            //池子，防止反复创建
            DrawLabel.pool = [];
            return DrawLabel;
        }(egret.HashObject));
        baidugame.DrawLabel = DrawLabel;
        __reflect(DrawLabel.prototype, "egret.baidugame.DrawLabel");
        //记录样式的
        var StyleInfo = (function (_super) {
            __extends(StyleInfo, _super);
            //
            function StyleInfo(textNode, format) {
                var _this = _super.call(this) || this;
                _this.format = null;
                //debug强制红色
                var saveTextColorForDebug = 0;
                if (textAtlasDebug) {
                    saveTextColorForDebug = textNode.textColor;
                    textNode.textColor = 0xff0000;
                }
                //存上
                _this.textColor = textNode.textColor;
                _this.strokeColor = textNode.strokeColor;
                _this.size = textNode.size;
                _this.stroke = textNode.stroke;
                _this.bold = textNode.bold;
                _this.italic = textNode.italic;
                _this.fontFamily = textNode.fontFamily;
                _this.format = format;
                _this.font = egret.getFontString(textNode, _this.format);
                //描述用于生成hashcode
                var textColor = (!format.textColor ? textNode.textColor : format.textColor);
                var strokeColor = (!format.strokeColor ? textNode.strokeColor : format.strokeColor);
                var stroke = (!format.stroke ? textNode.stroke : format.stroke);
                var size = (!format.size ? textNode.size : format.size);
                //
                _this.description = '' + _this.font + '-' + size;
                _this.description += '-' + egret.toColorString(textColor);
                _this.description += '-' + egret.toColorString(strokeColor);
                if (stroke) {
                    _this.description += '-' + stroke * 2;
                }
                //还原
                if (textAtlasDebug) {
                    textNode.textColor = saveTextColorForDebug;
                }
                return _this;
            }
            return StyleInfo;
        }(egret.HashObject));
        __reflect(StyleInfo.prototype, "StyleInfo");
        //测量字体和绘制的
        var CharImageRender = (function (_super) {
            __extends(CharImageRender, _super);
            function CharImageRender() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                //要渲染的字符串
                _this.char = '';
                //StyleInfo
                _this.styleInfo = null;
                //生成hashcode的字符串
                _this.hashCodeString = '';
                //字母：style设置行程唯一值
                _this.charWithStyleHashCode = 0;
                //测量实际的size
                _this.measureWidth = 0;
                _this.measureHeight = 0;
                //边缘放大之后的偏移
                _this.canvasWidthOffset = 0;
                _this.canvasHeightOffset = 0;
                //描边的记录
                _this.stroke2 = 0;
                return _this;
            }
            CharImageRender.prototype.reset = function (char, styleKey) {
                this.char = char;
                this.styleInfo = styleKey;
                this.hashCodeString = char + ':' + styleKey.description;
                this.charWithStyleHashCode = egret.NumberUtils.convertStringToHashCode(this.hashCodeString);
                this.canvasWidthOffset = 0;
                this.canvasHeightOffset = 0;
                this.stroke2 = 0;
                return this;
            };
            CharImageRender.prototype.measureAndDraw = function (targetCanvas) {
                var canvas = targetCanvas;
                if (!canvas) {
                    return;
                }
                //读取设置
                var text = this.char;
                var format = this.styleInfo.format;
                var textColor = (!format.textColor ? this.styleInfo.textColor : format.textColor);
                var strokeColor = (!format.strokeColor ? this.styleInfo.strokeColor : format.strokeColor);
                var stroke = (!format.stroke ? this.styleInfo.stroke : format.stroke);
                var size = (!format.size ? this.styleInfo.size : format.size);
                //开始测量---------------------------------------
                this.measureWidth = this.measure(text, this.styleInfo, size);
                this.measureHeight = size; //this.styleInfo.size;
                //调整 参考TextField: $getRenderBounds(): Rectangle {
                var canvasWidth = this.measureWidth;
                var canvasHeight = this.measureHeight;
                var _strokeDouble = stroke * 2;
                if (_strokeDouble > 0) {
                    canvasWidth += _strokeDouble * 2;
                    canvasHeight += _strokeDouble * 2;
                }
                this.stroke2 = _strokeDouble;
                //赋值
                canvas.width = canvasWidth = Math.ceil(canvasWidth) + 2 * 2;
                canvas.height = canvasHeight = Math.ceil(canvasHeight) + 2 * 2;
                this.canvasWidthOffset = (canvas.width - this.measureWidth) / 2;
                this.canvasHeightOffset = (canvas.height - this.measureHeight) / 2;
                //全部保留numberOfPrecision位小数
                var numberOfPrecision = 3;
                var precision = Math.pow(10, numberOfPrecision);
                this.canvasWidthOffset = Math.floor(this.canvasWidthOffset * precision) / precision;
                this.canvasHeightOffset = Math.floor(this.canvasHeightOffset * precision) / precision;
                //再开始绘制---------------------------------------
                var context = egret.sys.getContext2d(canvas);
                context.save();
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.lineJoin = 'round';
                context.font = this.styleInfo.font;
                context.fillStyle = egret.toColorString(textColor);
                context.strokeStyle = egret.toColorString(strokeColor);
                context.clearRect(0, 0, canvas.width, canvas.height);
                if (stroke) {
                    context.lineWidth = stroke * 2;
                    context.strokeText(text, canvas.width / 2, canvas.height / 2);
                }
                context.fillText(text, canvas.width / 2, canvas.height / 2);
                context.restore();
            };
            CharImageRender.prototype.measure = function (text, styleKey, textFlowSize) {
                var isChinese = CharImageRender.chineseCharactersRegExp.test(text);
                if (isChinese) {
                    if (CharImageRender.chineseCharacterMeasureFastMap[styleKey.font]) {
                        return CharImageRender.chineseCharacterMeasureFastMap[styleKey.font];
                    }
                }
                var measureTextWidth = egret.sys.measureText(text, styleKey.fontFamily, textFlowSize || styleKey.size, styleKey.bold, styleKey.italic);
                if (isChinese) {
                    CharImageRender.chineseCharacterMeasureFastMap[styleKey.font] = measureTextWidth;
                }
                return measureTextWidth;
            };
            //针对中文的加速查找
            CharImageRender.chineseCharactersRegExp = new RegExp("^[\u4E00-\u9FA5]$");
            CharImageRender.chineseCharacterMeasureFastMap = {};
            return CharImageRender;
        }(egret.HashObject));
        __reflect(CharImageRender.prototype, "CharImageRender");
        //对外的类
        var TextAtlasRender = (function (_super) {
            __extends(TextAtlasRender, _super);
            //
            function TextAtlasRender(webglRenderContext, maxSize, border) {
                var _this = _super.call(this) || this;
                _this.book = null;
                _this.charImageRender = new CharImageRender;
                _this.textBlockMap = {};
                _this._canvas = null;
                _this.textAtlasTextureCache = [];
                _this.webglRenderContext = null;
                _this.webglRenderContext = webglRenderContext;
                _this.book = new baidugame.Book(maxSize, border);
                return _this;
            }
            //分析textNode，把数据提取出来，然后给textNode挂上渲染的信息
            TextAtlasRender.analysisTextNodeAndFlushDrawLabel = function (textNode) {
                if (!textNode) {
                    return;
                }
                if (!baidugame.__textAtlasRender__) {
                    //创建，后续会转移给WebGLRenderContext
                    var webglcontext = egret.baidugame.WebGLRenderContext.getInstance(0, 0);
                    //初期先512，因为不会大规模batch, 老项目最好不要直接使用这个，少数几个总变内容的TextField可以用，所以先不用$maxTextureSize
                    baidugame.__textAtlasRender__ = new TextAtlasRender(webglcontext, textAtlasDebug ? 512 : 512 /*webglcontext.$maxTextureSize*/, textAtlasDebug ? 12 : 1);
                }
                //清除命令
                textNode[baidugame.property_drawLabel] = textNode[baidugame.property_drawLabel] || [];
                var drawLabels = textNode[baidugame.property_drawLabel];
                for (var _i = 0, drawLabels_1 = drawLabels; _i < drawLabels_1.length; _i++) {
                    var drawLabel = drawLabels_1[_i];
                    //还回去
                    DrawLabel.back(drawLabel, false);
                }
                drawLabels.length = 0;
                //重新装填
                var offset = 4;
                var drawData = textNode.drawData;
                var anchorX = 0;
                var anchorY = 0;
                var labelString = '';
                var labelFormat = {};
                var resultAsRenderTextBlocks = [];
                for (var i = 0, length_11 = drawData.length; i < length_11; i += offset) {
                    anchorX = drawData[i + 0];
                    anchorY = drawData[i + 1];
                    labelString = drawData[i + 2];
                    labelFormat = drawData[i + 3] || {};
                    resultAsRenderTextBlocks.length = 0;
                    //提取数据
                    baidugame.__textAtlasRender__.convertLabelStringToTextAtlas(labelString, new StyleInfo(textNode, labelFormat), resultAsRenderTextBlocks);
                    //pool创建 + 添加命令
                    var drawLabel = DrawLabel.create();
                    drawLabel.anchorX = anchorX;
                    drawLabel.anchorY = anchorY;
                    drawLabel.textBlocks = [].concat(resultAsRenderTextBlocks);
                    drawLabels.push(drawLabel);
                }
            };
            //字符串转化成为TextBlock
            TextAtlasRender.prototype.convertLabelStringToTextAtlas = function (labelstring, styleKey, resultAsRenderTextBlocks) {
                var canvas = this.canvas;
                var charImageRender = this.charImageRender;
                var textBlockMap = this.textBlockMap;
                for (var _i = 0, labelstring_1 = labelstring; _i < labelstring_1.length; _i++) {
                    var char = labelstring_1[_i];
                    //不反复创建
                    charImageRender.reset(char, styleKey);
                    if (textBlockMap[charImageRender.charWithStyleHashCode]) {
                        //检查重复
                        resultAsRenderTextBlocks.push(textBlockMap[charImageRender.charWithStyleHashCode]);
                        continue;
                    }
                    //画到到canvas
                    charImageRender.measureAndDraw(canvas);
                    //创建新的文字块
                    var txtBlock = this.book.createTextBlock(char, canvas.width, canvas.height, charImageRender.measureWidth, charImageRender.measureHeight, charImageRender.canvasWidthOffset, charImageRender.canvasHeightOffset, charImageRender.stroke2);
                    if (!txtBlock) {
                        continue;
                    }
                    //需要绘制
                    resultAsRenderTextBlocks.push(txtBlock);
                    //记录快速查找
                    textBlockMap[charImageRender.charWithStyleHashCode] = txtBlock;
                    //生成纹理
                    var page = txtBlock.page;
                    if (!page.webGLTexture) {
                        page.webGLTexture = this.createTextTextureAtlas(page.pageWidth, page.pageHeight, textAtlasDebug);
                    }
                    var gl = this.webglRenderContext.context;
                    gl.bindTexture(gl.TEXTURE_2D, page.webGLTexture);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                    gl.texSubImage2D(gl.TEXTURE_2D, 0, txtBlock.subImageOffsetX, txtBlock.subImageOffsetY, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                }
            };
            //给一个page创建一个纹理
            TextAtlasRender.prototype.createTextTextureAtlas = function (width, height, debug) {
                var texture = null;
                if (debug) {
                    //做一个黑底子的，方便调试代码
                    var canvas = egret.sys.createCanvas(width, width);
                    var context = egret.sys.getContext2d(canvas);
                    context.fillStyle = 'black';
                    context.fillRect(0, 0, width, width);
                    texture = egret.sys.createTexture(this.webglRenderContext, canvas);
                }
                else {
                    //真的
                    texture = egret.sys._createTexture(this.webglRenderContext, width, height, null);
                }
                if (texture) {
                    //存起来，未来可以删除，或者查看
                    this.textAtlasTextureCache.push(texture);
                }
                return texture;
            };
            Object.defineProperty(TextAtlasRender.prototype, "canvas", {
                //给CharImageRender用的canvas
                get: function () {
                    if (!this._canvas) {
                        //就用默认体积24
                        this._canvas = egret.sys.createCanvas(24, 24);
                    }
                    return this._canvas;
                },
                enumerable: true,
                configurable: true
            });
            return TextAtlasRender;
        }(egret.HashObject));
        baidugame.TextAtlasRender = TextAtlasRender;
        __reflect(TextAtlasRender.prototype, "egret.baidugame.TextAtlasRender");
    })(baidugame = egret.baidugame || (egret.baidugame = {}));
})(egret || (egret = {}));
