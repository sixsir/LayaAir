import { BMiniAdapter } from "././BMiniAdapter";
import { MiniFileMgr } from "./../../../../../../openData/src/laya/wx/mini/MiniFileMgr";
import { MiniSoundChannel } from "././MiniSoundChannel";
import { Event } from "../../../../../../core/src/laya/events/Event"
	import { EventDispatcher } from "../../../../../../core/src/laya/events/EventDispatcher"
	import { SoundManager } from "../../../../../../core/src/laya/media/SoundManager"
	import { URL } from "../../../../../../core/src/laya/net/URL"
	import { Handler } from "../../../../../../core/src/laya/utils/Handler"
	
	/** @private **/
	export class MiniSound extends EventDispatcher {
		/**@private **/
		private static _musicAudio:any;
		/**@private **/
		private static _id:number = 0;
		/**@private **/
		private _sound:any;
		/**
		 * @private
		 * 声音URL
		 */
		 url:string;
		/**
		 * @private
		 * 是否已加载完成
		 */
		 loaded:boolean = false;
		/**@private **/
		 readyUrl:string;
		/**@private **/
		 static _audioCache:any = {};
		
		constructor(){super();

		}
		
		/** @private **/
		private static _createSound():any {
			MiniSound._id++;
			return BMiniAdapter.window.swan.createInnerAudioContext();
		}
		
		/**
		 * @private
		 * 加载声音。
		 * @param url 地址。
		 *
		 */
		 load(url:string):void {
			url = URL.formatURL(url);
			this.url = url;
			this.readyUrl = url;
			if (MiniSound._audioCache[this.readyUrl]) {
				this.event(Event.COMPLETE);
				return;
			}
			if(BMiniAdapter.autoCacheFile&&MiniFileMgr.getFileInfo(url))
			{
				this.onDownLoadCallBack(url,0);
			}else
			{
				if(!BMiniAdapter.autoCacheFile)
				{
					this.onDownLoadCallBack(url,0);
				}else
				{
                    if (MiniFileMgr.isLocalNativeFile(url))
					{
                        var tempStr:string = URL.rootPath != "" ? URL.rootPath : URL.basePath;
                        var tempUrl:string = url;
                        if(tempStr != "")
                            url = url.split(tempStr)[1];//去掉http头
                        if (!url){
                            url = tempUrl;
                        }
                        this.onDownLoadCallBack(url,0);
					}else
					{
						if (!MiniFileMgr.isLocalNativeFile(url) &&  (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) || (url.indexOf("http://usr/") != -1)) {
							this.onDownLoadCallBack(url, 0);
						}else
						{
							MiniFileMgr.downOtherFiles(url,Handler.create(this,this.onDownLoadCallBack,[url]),url);
						}
					}
				}
			}
		}
		
		/**@private **/
		private onDownLoadCallBack(sourceUrl:string,errorCode:number):void
		{
			if (!errorCode)
			{
				var fileNativeUrl:string;
				if(BMiniAdapter.autoCacheFile)
				{
					if (MiniFileMgr.isLocalNativeFile(sourceUrl)) {
						var tempStr:string = URL.rootPath != "" ? URL.rootPath : URL.basePath;
						var tempUrl:string = sourceUrl;
						if(tempStr != "" && (sourceUrl.indexOf("http://") != -1 || sourceUrl.indexOf("https://") != -1))
							fileNativeUrl = sourceUrl.split(tempStr)[1];//去掉http头
						if(!fileNativeUrl)
						{
							fileNativeUrl = tempUrl;
						}
					}else
					{
						var fileObj:any = MiniFileMgr.getFileInfo(sourceUrl);
						if(fileObj && fileObj.md5)
						{
							var fileMd5Name:string = fileObj.md5;
							fileNativeUrl = MiniFileMgr.getFileNativePath(fileMd5Name);
						}else
						{
							fileNativeUrl = sourceUrl;
						}
					}
					this._sound = MiniSound._createSound();
					this._sound.src = this.url =  fileNativeUrl;
				}else
				{
					this._sound = MiniSound._createSound();
					this._sound.src = sourceUrl;
				}
				
				this._sound.onCanplay(MiniSound.bindToThis(this.onCanPlay,this));
				this._sound.onError(MiniSound.bindToThis(this.onError,this));
			}else
			{
				this.event(Event.ERROR);
			}
		}
		
		/**@private **/
		private onError(error:any):void
		{
			try
			{
				console.log("-----1---------------minisound-----id:" + MiniSound._id);
				console.log(error);
			} 
			catch(error) 
			{
				console.log("-----2---------------minisound-----id:" + MiniSound._id);
				console.log(error);
			}
			this.event(Event.ERROR);
			this._sound.offError(null);
		}
			
		/**@private **/
		private onCanPlay():void
		{
			this.loaded = true;
			this.event(Event.COMPLETE);
			this._sound.offCanplay(null);
		}
		
		/**
		 * @private
		 * 给传入的函数绑定作用域，返回绑定后的函数。
		 * @param	fun 函数对象。
		 * @param	scope 函数作用域。
		 * @return 绑定后的函数。
		 */
		 static bindToThis(fun:Function, scope:any):Function {
			var rst:Function = fun;
			rst=fun.bind(scope);;
			return rst;
		}
		
		/**
		 * @private
		 * 播放声音。
		 * @param startTime 开始时间,单位秒
		 * @param loops 循环次数,0表示一直循环
		 * @return 声道 SoundChannel 对象。
		 *
		 */
		 play(startTime:number = 0, loops:number = 0):MiniSoundChannel {
			var tSound:any;
			if (this.url == SoundManager._bgMusic) {
				if (!MiniSound._musicAudio) MiniSound._musicAudio = MiniSound._createSound();
				tSound = MiniSound._musicAudio;
			} else {
				if(MiniSound._audioCache[this.readyUrl])
				{
					tSound = MiniSound._audioCache[this.readyUrl]._sound;
				}else
				{
					tSound = MiniSound._createSound();
				}
			}
			if(BMiniAdapter.autoCacheFile&&MiniFileMgr.getFileInfo(this.url))
			{
				var fileNativeUrl:string;
				var fileObj:any = MiniFileMgr.getFileInfo(this.url);
				var fileMd5Name:string = fileObj.md5;
				tSound.src = this.url =MiniFileMgr.getFileNativePath(fileMd5Name);
			}else
			{
				tSound.src = this.url;
			}
			if(!tSound)
				return null;
			var channel:MiniSoundChannel = new MiniSoundChannel(tSound,this);
			channel.url = this.url;
			channel.loops = loops;
			channel.loop = (loops === 0 ? true : false);
			channel.startTime = startTime;
			channel.play();
			SoundManager.addChannel(channel);
			return channel;
		}
		
		/**
		 * @private
		 * 获取总时间。
		 */
		 get duration():number {
			return this._sound.duration;
		}
		
		/**
		 * @private
		 * 释放声音资源。
		 *
		 */
		 dispose():void {
			var ad:any = MiniSound._audioCache[this.readyUrl];
			if (ad) {
				ad.src = "";
				if(ad._sound)
				{
					ad._sound.destroy();	
					ad._sound =null;
					ad =null;
				}
				delete MiniSound._audioCache[this.readyUrl];
			}
		}
	}

