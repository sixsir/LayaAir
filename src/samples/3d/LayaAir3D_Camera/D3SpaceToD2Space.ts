import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Vector3 } from "laya/d3/math/Vector3";
import { Stage } from "laya/display/Stage";
import { Image } from "laya/ui/Image";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { Laya3D } from "Laya3D";

export class D3SpaceToD2Space {

	private scene: Scene3D;
	private camera: Camera;
	private layaMonkey3D: Sprite3D;
	private layaMonkey2D: Image;
	private _position: Vector3 = new Vector3();
	private _outPos: Vector3 = new Vector3();
	private scaleDelta: number = 0;
	private _translate: Vector3 = new Vector3(0, 0.35, 1);
	private _rotation: Vector3 = new Vector3(-15, 0, 0);

	constructor() {

		//初始化引擎
		Laya3D.init(0, 0);
		Laya.stage.scaleMode = Stage.SCALE_FULL;
		Laya.stage.screenMode = Stage.SCREEN_NONE;
		//显示性能面板
		Stat.show();

		//创建场景
		this.scene = (<Scene3D>Laya.stage.addChild(new Scene3D()));

		//创建相机
		this.camera = (<Camera>this.scene.addChild(new Camera(0, 0.1, 100)));
		this.camera.transform.translate(this._translate);
		this.camera.transform.rotate(this._rotation, true, false);

		//创建平行光
		var directionLight: DirectionLight = (<DirectionLight>this.scene.addChild(new DirectionLight()));

		var completeHandler: Handler = Handler.create(this, this.onComplete);

		Laya.loader.create("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", completeHandler);
	}

	onComplete(): void {
		var _this: D3SpaceToD2Space = this;
		//加载精灵
		Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function (layaMonkey3D: Sprite3D): void {
			_this.layaMonkey3D = layaMonkey3D;
			this.scene.addChild(layaMonkey3D);
			this.layaMonkey2D = (<Image>Laya.stage.addChild(new Image("res/threeDimen/monkey.png")));
			//开启时钟事件
			Laya.timer.frameLoop(1, _this, this.animate);
		}))
	}

	private animate(): void {

		this._position.x = Math.sin(this.scaleDelta += 0.01);
		//变换的精灵的位置
		this.layaMonkey3D.transform.position = this._position;
		//矩阵变换得到对应的屏幕坐标
		var outPos: Vector3 = this._outPos;
		this.camera.viewport.project(this.layaMonkey3D.transform.position, this.camera.projectionViewMatrix, outPos);
		this.layaMonkey2D.pos(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
	}

}

