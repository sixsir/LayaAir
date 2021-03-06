{
	"version":"LAYASCENE3D:01",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"scene",
			"ambientColor":[
				0.212,
				0.227,
				0.259
			],
			"lightmaps":[],
			"enableFog":false,
			"fogStart":0,
			"fogRange":300,
			"fogColor":[
				0.5,
				0.5,
				0.5
			]
		},
		"child":[
			{
				"type":"Camera",
				"props":{
					"name":"Main Camera",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						1,
						-10
					],
					"rotation":[
						0,
						1,
						0,
						0
					],
					"scale":[
						1,
						1,
						1
					],
					"clearFlag":1,
					"orthographic":false,
					"fieldOfView":60,
					"nearPlane":0.3,
					"farPlane":1000,
					"viewport":[
						0,
						0,
						1,
						1
					],
					"clearColor":[
						0.1921569,
						0.3019608,
						0.4745098,
						0
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"DirectionLight",
				"props":{
					"name":"Directional Light",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						3,
						0
					],
					"rotation":[
						0.1093816,
						0.8754261,
						0.4082179,
						-0.2345697
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":1,
					"lightmapBakedType":0,
					"color":[
						1,
						0.9568627,
						0.8392157
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"MeshSprite3D",
				"props":{
					"name":"Cube",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"meshPath":"Library/unity default resources-Cube.lm",
					"enableRender":true,
					"materials":[
						{
							"path":"Assets/LayaAir3D/Materials/timg.lmat"
						}
					]
				},
				"components":[
					{
						"type":"PhysicsCollider",
						"restitution":0,
						"friction":0.5,
						"rollingFriction":0,
						"shapes":[
							{
								"type":"BoxColliderShape",
								"center":[
									0,
									0,
									0
								],
								"size":[
									1,
									1,
									1
								]
							}
						],
						"isTrigger":false
					},
					{
						"type":"Animator",
						"layers":[
							{
								"name":"Base Layer",
								"weight":0,
								"blendingMode":0,
								"states":[
									{
										"name":"New Animation",
										"clipPath":"Assets/New Animation-New Animation.lani"
									}
								]
							}
						],
						"cullingMode":0,
						"playOnWake":true
					}
				],
				"child":[]
			},
			{
				"type":"ShuriKenParticle3D",
				"props":{
					"name":"GameObject",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						1.3375,
						0.89112,
						0.7137098
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					],
					"isPerformanceMode":true,
					"duration":5,
					"looping":true,
					"prewarm":false,
					"startDelayType":0,
					"startDelay":0,
					"startDelayMin":0,
					"startDelayMax":0,
					"startLifetimeType":0,
					"startLifetimeConstant":5,
					"startLifetimeConstantMin":0,
					"startLifetimeConstantMax":5,
					"startLifetimeGradient":{
						"startLifetimes":[]
					},
					"startLifetimeGradientMin":{
						"startLifetimes":[]
					},
					"startLifetimeGradientMax":{
						"startLifetimes":[]
					},
					"startSpeedType":0,
					"startSpeedConstant":5,
					"startSpeedConstantMin":0,
					"startSpeedConstantMax":5,
					"threeDStartSize":false,
					"startSizeType":0,
					"startSizeConstant":1,
					"startSizeConstantMin":0,
					"startSizeConstantMax":1,
					"startSizeConstantSeparate":[
						1,
						1,
						1
					],
					"startSizeConstantMinSeparate":[
						0,
						0,
						0
					],
					"startSizeConstantMaxSeparate":[
						1,
						1,
						1
					],
					"threeDStartRotation":false,
					"startRotationType":0,
					"startRotationConstant":0,
					"startRotationConstantMin":0,
					"startRotationConstantMax":0,
					"startRotationConstantSeparate":[
						0,
						0,
						0
					],
					"startRotationConstantMinSeparate":[
						0,
						0,
						0
					],
					"startRotationConstantMaxSeparate":[
						0,
						0,
						0
					],
					"randomizeRotationDirection":0,
					"startColorType":0,
					"startColorConstant":[
						1,
						1,
						1,
						1
					],
					"startColorConstantMin":[
						0,
						0,
						0,
						0
					],
					"startColorConstantMax":[
						1,
						1,
						1,
						1
					],
					"gravity":[
						0,
						-9.81,
						0
					],
					"gravityModifier":0,
					"simulationSpace":1,
					"scaleMode":1,
					"playOnAwake":true,
					"maxParticles":1000,
					"autoRandomSeed":true,
					"randomSeed":1.194945E+09,
					"emission":{
						"enable":true,
						"emissionRate":10,
						"emissionRateTip":"Time",
						"bursts":[]
					},
					"shape":{
						"enable":true,
						"shapeType":2,
						"sphereRadius":1,
						"sphereEmitFromShell":false,
						"sphereRandomDirection":0,
						"hemiSphereRadius":1,
						"hemiSphereEmitFromShell":false,
						"hemiSphereRandomDirection":0,
						"coneAngle":25,
						"coneRadius":1,
						"coneLength":5,
						"coneEmitType":0,
						"coneRandomDirection":0,
						"boxX":1,
						"boxY":1,
						"boxZ":1,
						"boxRandomDirection":0,
						"circleRadius":1,
						"circleArc":360,
						"circleEmitFromEdge":false,
						"circleRandomDirection":0
					},
					"renderMode":0,
					"stretchedBillboardCameraSpeedScale":0,
					"stretchedBillboardSpeedScale":0,
					"stretchedBillboardLengthScale":2,
					"sortingFudge":0,
					"material":{
						"type":"Laya.ShurikenParticleMaterial",
						"path":"Assets/LayaAir3D/Materials/timg.lmat"
					}
				},
				"components":[],
				"child":[]
			}
		]
	}
}