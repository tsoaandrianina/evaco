        /*******************************************************/
        var canvas = document.getElementById("renderCanvas");

        var startRenderLoop = function (engine, canvas) {
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
            });
        }

        var engine = null;
        var sceneToRender = null;
        var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        function delayCreateScene() {
            var scene = new BABYLON.Scene(engine);
        
            // Load the model
            BABYLON.SceneLoader.Append("scene/", "CM _AQUAMARINE_BLD_EXT_W 2 (1).glb", scene, function (meshes) {

                //verifier si le modele est charge
                console.log("Le modèle a été chargé avec succès :", meshes);


                setMaterialsTransparency();

                // Cacher certains meshes spécifiés dès le chargement
                const meshesToHide = ["TEXTURE_OPENING_FRAME_BLACK", "TEXTURE_Pool_Beach_Ceramica_Mayor_Crosscut_Cloud",
                "TEXTURE_Pool _beach_Halcon_Ceramicas_White", "TEXTURE_Eco_Deck_Composite_Timber", "TEXTURE_Pool _beach_Halcon_Ceramicas_White", "TEXTURE_Pool_Beach_Eco Ceramic_Rebel_Taupe_Lappato", "TEXTURE_Timber_Balau", 
                 "TEXTURE_Timber_BAMBOO", "TEXTURE_Wall_Paint_Sofap_Almost_White_Ref:8002/1", "TEXTURE_Wall Paint - Elmwood", 
                 "TEXTURE_WATERFALL_BASALT_STONE", "TEXTURE_Text 001","TEXTURE_Text 002","TEXTURE_Text001", "TEXTURE_Text002","TEXTURE_Text003","TEXTURE_Text004","TEXTURE_Text005","TEXTURE_Text006","TEXTURE_Text007","TEXTURE_Text008", "TEXTURE_Text010","TEXTURE_Text011","TEXTURE_Text012","TEXTURE_Text013","TEXTURE_Text014", "TEXTURE_Text015","TEXTURE_Text017", "TEXTURE_TEXTURE__TEXT012",
                "TEXTURE_OPENING_FRAME_DARK_GREY_primitive0","TEXTURE_OPENING_FRAME_DARK_GREY_primitive1", "TEXTURE_Wall paint  - Italian Stone_primitive0", "TEXTURE_Wall paint  - Italian Stone_primitive1", "TEXTURE_Wall paint  - Italian Stone_primitive2", "TERRAIN POOL"];

                meshesToHide.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.setEnabled(false); 
                    } else {
                        console.log(`Le mesh ${meshName} n'a pas été trouvé.`);
                    }
                });

                // Create a camera pointing at your model.
                scene.createDefaultCameraOrLight(true, true, true);
                scene.activeCamera.useAutoRotationBehavior = true;
                // scene.activeCamera.beta -= 0.2;

                // Limiter la rotation verticale (Beta) pour empêcher de regarder en haut et en bas
                scene.activeCamera.lowerBetaLimit = Math.PI / 2 - 0.3;
                scene.activeCamera.upperBetaLimit = Math.PI / 2 - 0.2; 

                // Optionnel : Ajuster légèrement la position initiale de la caméra
                scene.activeCamera.beta = Math.PI / 2;
                scene.activeCamera.alpha = 0;
        
                // Désactiver la lumière par défaut et créer une nouvelle lumière
                scene.lights[0].dispose();
                var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-2, -3, 1), scene);
                light.position = new BABYLON.Vector3(6, 9, 3);


                // Désactiver la génération d'ombres
                var generator = new BABYLON.ShadowGenerator(512, light);
                generator.useBlurExponentialShadowMap = true;
                generator.blurKernel = 32;                
        
                for (var i = 0; i < scene.meshes.length; i++) {
                    generator.addShadowCaster(scene.meshes[i]);    
                }
                
                // Créer l'environnement par défaut
                var helper = scene.createDefaultEnvironment({
                    enableGroundMirror: true,
                    groundShadowLevel: 0.6,
                    // groundShadowLevel: 0,
                });       
        
                helper.setMainColor(BABYLON.Color3.White());
            });
        
            return scene;
        }
        
                window.initFunction = async function() {
                                                         
                    var asyncEngineCreation = async function() {
                        try {
                        return createDefaultEngine();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngine();
                        }
                    }

                    window.engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        startRenderLoop(engine, canvas);
        window.scene = delayCreateScene();};
        initFunction().then(() => {sceneToRender = scene                    
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });


        function setMaterialsTransparency() {
            // Trouver le matériau pour l'eau et rendre complètement transparent
            const waterMaterial = scene.getMaterialByName("water");
            if (waterMaterial) {
                waterMaterial.alpha = 0;
            } else {
                console.warn("Le matériau MaterialWater n'a pas été trouvé.");
            }
        
            // Trouver le matériau pour le verre et le rendre complètement transparent
            const glassMaterial = scene.getMaterialByName("glass");
            if (glassMaterial) {
                glassMaterial.alpha = 0;
            } else {
                console.warn("Le matériau MaterialGlass n'a pas été trouvé.");
            }

            const terrainMesh = scene.getMeshByName("TERRAIN");
            if (terrainMesh && terrainMesh.material) {
            
                terrainMesh.material.alpha = 1;
                terrainMesh.material.transparencyMode = BABYLON.Material.MATERIAL_ALPHABLEND; 

                console.log("Terrain rendu transparent.");
            }

            //supprimer ombre
            const groundMesh = scene.getMeshByName("TERRAIN");
            if (groundMesh) {
                groundMesh.receiveShadows = false;
            }

        }

        function togglePergolas(){

            scene.getMeshByName("PERGOLAS_FRAME_FIX").setEnabled((scene.getMeshByName("PERGOLAS_FRAME_FIX").isEnabled() ? false : true));
            scene.getMeshByName("PERGOLAS_TIMBER_FIX").setEnabled((scene.getMeshByName("PERGOLAS_TIMBER_FIX").isEnabled() ? false : true));

            scene.getMeshByName("PERGOLAS_TIMBERS_FIX").setEnabled((scene.getMeshByName("PERGOLAS_TIMBERS_FIX").isEnabled() ? false : true));

            scene.getMeshByName("PERGOLAS_FRAME OPTION").setEnabled((scene.getMeshByName("PERGOLAS_FRAME OPTION").isEnabled() ? false : true));
            scene.getMeshByName("PERGOLAS_TIMBER_OPTION").setEnabled((scene.getMeshByName("PERGOLAS_TIMBER_OPTION").isEnabled() ? false : true));

        }

        /* 
           Start Scene Paint
        */

        function togglePaint(){

            if ($("#aluminium").is(":visible") || $("#pergolas").is(":visible") || $("#pool").is(":visible") || $("#pool_beach").is(":visible") || $("#opening").is(":visible") || $("#decking").is(":visible") || $("#cladding").is(":visible") || $("#garage").is(":visible") || $("#storage").is(":visible")) {
                $("#aluminium").hide();
                $("#pergolas").hide();
                $("#opening").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#decking").hide();
                $("#cladding").hide();
                $("#garage").hide();
                $("#storage").hide();
            }

            $("#paint").toggle();    
            $("#aluminium-button, #pergolas-button,  #pool-button, #beach-button,#opening-button, #decking-button,#cladding-button, #garage-button,  #storage-button").removeClass("button-active"); 
            $("#paint-button").toggleClass("button-active", $("#paint").is(":visible"));         
        }

        function PaintWhite(){

             // Récupérer le matériau
             let materialWallAlmostWhite = scene.getMaterialByName("Wall_Paint_Sofap_Almost_White_Ref:8002/1");
            
             // Liste des meshes à modifier
             const meshesToUpdate = [
                 "WALL_EXT_OPTION",
                 "WALL_EXT_GARAGE_OPTION",
               
             ];
             
             // Vérifier si le matériau existe
             if (materialWallAlmostWhite) {
                 // Appliquer le matériau à chaque mesh de la liste
                 meshesToUpdate.forEach(meshName => {
                     const mesh = scene.getMeshByName(meshName);
                     if (mesh) {
                         mesh.material = materialWallAlmostWhite;                        
                     } else {
                         console.log(`Mesh ${meshName} introuvable.`);
                     }
                 });
             } else {
                 console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
             }
        }

        function PaintWallItalian(){
           
             // Récupérer le matériau
             let materialWallItalian = scene.getMaterialByName("Wall paint  - Italian Stone");
            
             // Liste des meshes à modifier
             const meshesToUpdate = [
                 "WALL_EXT_OPTION",
                 "WALL_EXT_GARAGE_OPTION",
               
             ];
             
             // Vérifier si le matériau existe
             if (materialWallItalian) {
                 // Appliquer le matériau à chaque mesh de la liste
                 meshesToUpdate.forEach(meshName => {
                     const mesh = scene.getMeshByName(meshName);
                     if (mesh) {
                         mesh.material = materialWallItalian;                        
                     } else {
                         console.log(`Mesh ${meshName} introuvable.`);
                     }
                 });
             } else {
                 console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
             }
        }

        function PaintEmlwood(){
             // Récupérer le matériau
             let materialEmlawood = scene.getMaterialByName("WALL_PAINT_EMLWOOD");
            
             // Liste des meshes à modifier
             const meshesToUpdate = [
                 "WALL_EXT_OPTION",
                 "WALL_EXT_GARAGE_OPTION",
               
             ];
             
             // Vérifier si le matériau existe
             if (materialEmlawood) {
                 // Appliquer le matériau à chaque mesh de la liste
                 meshesToUpdate.forEach(meshName => {
                     const mesh = scene.getMeshByName(meshName);
                     if (mesh) {
                         mesh.material = materialEmlawood;                        
                     } else {
                         console.log(`Mesh ${meshName} introuvable.`);
                     }
                 });
             } else {
                 console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
             }
        }

        /* 
           End Scene Paint
        */

            /* 
           Start Scene Pergolas
           */ 
           
           function togglePergolas(){
               if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#opening").is(":visible") || $("#decking").is(":visible") || $("#cladding").is(":visible")|| $("#garage").is(":visible") || $("#storage").is(":visible")) {
                   $("#paint").hide();
                   $("#aluminium").hide();
                   $("#opening").hide();
                   $("#pool").hide();
                   $("#pool_beach").hide();                  
                   $("#decking").hide();
                   $("#cladding").hide();
                   $("#garage").hide();
                   $("#storage").hide();
                 
               }
               $("#pergolas").toggle();   
               $("#paint-button, #aluminium-button, #pool-button, #beach-button, #opening-button, #decking-button, #cladding-button, #garage-button,  #storage-button").removeClass("button-active"); 
               $("#pergolas-button").toggleClass("button-active", $("#pergolas").is(":visible"));       
           }
   
           function whithoutPergolas() {
               // Récupérer les meshes
            //    const pergolasTimber = scene.getMeshByName("PERGOLAS_TIMBER_OPTION");
            //    const pergolasFrame = scene.getMeshByName("PERGOLAS_FRAME OPTION");
               
            //    // Vérifier si les meshes existent
            //    if (pergolasTimber && pergolasFrame) {
            //        // Basculer l'état des meshes
            //        const isEnabled = pergolasTimber.isEnabled() && pergolasFrame.isEnabled();
            //        pergolasTimber.setEnabled(!isEnabled);
            //        pergolasFrame.setEnabled(!isEnabled);
                   
            //        // Récupérer les boutons concernés
            //        const buttons = [
            //            document.querySelector('button[onclick="PergolasTimberBamboo()"]'),
            //            document.querySelector('button[onclick="PergolasTimberBalau()"]'),
            //            document.querySelector('button[onclick="PergolasFrameDark()"]'),
            //            document.querySelector('button[onclick="PergolasFrameGrey()"]'),
            //        ];
           
            //        // Basculer l'affichage des boutons
            //        buttons.forEach(button => {
            //            if (button) {
            //                button.style.display = isEnabled ? "none" : "inline-block";
            //                // button.disabled = !isEnabled;
            //            }
            //        });
            //    } else {
            //        console.error("Les meshes PERGOLAS_TIMBER_OPTION ou PERGOLAS_FRAME OPTION sont introuvables.");
            //    }

            
             const pergolasMeshes = [
                "PERGOLAS_TIMBER_OPTION",
                "PERGOLAS_FRAME OPTION",
            ];
        
            // Basculer l'état de chaque mesh de la liste
            pergolasMeshes.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.setEnabled(!mesh.isEnabled()); // Basculer entre activé et désactivé
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });
           }
                    
           function PergolasTimberBalau(){
           
            let TimberBalau = scene.getMaterialByName("Timber_Balau");
            
            // Liste des meshes à modifier
            const meshesToUpdate = [
                "PERGOLAS_TIMBER_OPTION",
                "PERGOLAS_TIMBER_FIX",
                "PERGOLAS_TIMBERS_FIX",
                "DECKING_PERGOLA _ENTRANCE",
              
            ];
            
            // Vérifier si le matériau existe
            if (TimberBalau) {
                // Appliquer le matériau à chaque mesh de la liste
                meshesToUpdate.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.material = TimberBalau;                        
                    } else {
                        console.log(`Mesh ${meshName} introuvable.`);
                    }
                });
            } else {
                console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
            }
           }
   
           function PergolasTimberBamboo(){          

                let TimberBAMBOO = scene.getMaterialByName("Timber_BAMBOO");
            
                // Liste des meshes à modifier
                const meshesToUpdate = [
                    "PERGOLAS_TIMBER_OPTION",
                    "PERGOLAS_TIMBER_FIX",
                    "PERGOLAS_TIMBERS_FIX",
                    "DECKING_PERGOLA _ENTRANCE",
                  
                ];
                
                // Vérifier si le matériau existe
                if (TimberBAMBOO) {
                    // Appliquer le matériau à chaque mesh de la liste
                    meshesToUpdate.forEach(meshName => {
                        const mesh = scene.getMeshByName(meshName);
                        if (mesh) {
                            mesh.material = TimberBAMBOO;                        
                        } else {
                            console.log(`Mesh ${meshName} introuvable.`);
                        }
                    });
                } else {
                    console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
                }
           }
   
           function PergolasFrameDark(){

                // let TimberBalau = scene.getMaterialByName("Timber_Balau");
                let Black = scene.getMaterialByName("OPENING_FRAME_BLACK");
            
                // Liste des meshes à modifier
                const meshesToUpdate = [
                    "PERGOLAS_FRAME OPTION",
                    "PERGOLAS_FRAME_FIX",
                  
                  
                ];
                
                // Vérifier si le matériau existe
                if (Black) {
                    // Appliquer le matériau à chaque mesh de la liste
                    meshesToUpdate.forEach(meshName => {
                        const mesh = scene.getMeshByName(meshName);
                        if (mesh) {
                            mesh.material = Black;                        
                        } else {
                            console.log(`Mesh ${meshName} introuvable.`);
                        }
                    });
                } else {
                    console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
                }
   
           }
   
           function PergolasFrameGrey(){
              
                let DarkGrey = scene.getMaterialByName("OPENING_FRAME_DARK_GREY");
            
                // Liste des meshes à modifier
                const meshesToUpdate = [
                    "PERGOLAS_FRAME OPTION",
                    "PERGOLAS_FRAME_FIX",
                  
                  
                ];
                
                // Vérifier si le matériau existe
                if (DarkGrey) {
                    // Appliquer le matériau à chaque mesh de la liste
                    meshesToUpdate.forEach(meshName => {
                        const mesh = scene.getMeshByName(meshName);
                        if (mesh) {
                            mesh.material = DarkGrey;                        
                        } else {
                            console.log(`Mesh ${meshName} introuvable.`);
                        }
                    });
                } else {
                    console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
                }
               
           }
   
           /* 
              End Scene Pergolas
           */ 

        /* 
           Start Scene Pool
        */ 
      
        function togglePool(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") ||  $("#decking").is(":visible") || $("#cladding").is(":visible") || $("#garage").is(":visible") || $("#storage").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool_beach").hide();
                $("#opening").hide();
                $("#pergolas").hide();               
                $("#decking").hide();  
                $("#cladding").hide();
                $("#garage").hide();
                $("#storage").hide();         
            }
            $("#pool").toggle();    
            $("#paint-button, #aluminium-button, #beach-button, #pergolas-button, #opening-button, #decking-button, #cladding-button, #garage-button,  #storage-button").removeClass("button-active"); 
            $("#pool-button").toggleClass("button-active", $("#pool").is(":visible"));                   
        }

        // function  whithoutPool() {
        //     scene.getMeshByName("POOL_CONCRETE_BASE").setEnabled((scene.getMeshByName("POOL_CONCRETE_BASE").isEnabled() ? false : true));
        //     scene.getMeshByName("POOL_KIOSK").setEnabled((scene.getMeshByName("POOL_KIOSK").isEnabled() ? false : true));
        //     scene.getMeshByName("POOL_PUMP_DECKING").setEnabled((scene.getMeshByName("POOL_PUMP_DECKING").isEnabled() ? false : true));
        //     scene.getMeshByName("POOL_TILES_OPTION").setEnabled((scene.getMeshByName("POOL_TILES_OPTION").isEnabled() ? false : true)); 
        //     scene.getMeshByName("POOL_WALL").setEnabled((scene.getMeshByName("POOL_WALL").isEnabled() ? false : true)); 
        //     scene.getMeshByName("Pool_wall").setEnabled((scene.getMeshByName("Pool_wall").isEnabled() ? false : true));
        //     scene.getMeshByName("POOL_SHADES_OPTION_primitive0").setEnabled((scene.getMeshByName("POOL_SHADES_OPTION_primitive0").isEnabled() ? false : true));
        //     scene.getMeshByName("POOL_SHADES_OPTION_primitive1").setEnabled((scene.getMeshByName("POOL_SHADES_OPTION_primitive1").isEnabled() ? false : true));
        //     scene.getMeshByName("POOL_WATER").setEnabled((scene.getMeshByName("POOL_WATER").isEnabled() ? false : true));
        //     scene.getMeshByName("POOL_WALL_OPTION_KIOSK").setEnabled((scene.getMeshByName("POOL_WALL_OPTION_KIOSK").isEnabled() ? false : true));
        //     scene.getMeshByName("PERGOLAS_FRAME OPTION").setEnabled((scene.getMeshByName("PERGOLAS_FRAME OPTION").isEnabled() ? false : true));
        //     scene.getMeshByName("PERGOLAS_TIMBER_OPTION").setEnabled((scene.getMeshByName("PERGOLAS_TIMBER_OPTION").isEnabled() ? false : true));

        //     const terrainPool = scene.getMeshByName("TERRAIN POOL");
        //     if (terrainPool) {
        //         terrainPool.setEnabled(true); // Afficher le mesh
        //         console.log("Le mesh TERRAIN POOL est maintenant visible.");
        //     } else {
        //         console.log("Le mesh TERRAIN POOL est introuvable.");
        //     }
        // }

        function whithoutPool() {
            // Liste des noms de meshes liés au pool
            const poolMeshes = [
                "POOL_CONCRETE_BASE",
                "POOL_KIOSK",
                "POOL_PUMP_DECKING",
                "POOL_TILES_OPTION",
                "POOL_WALL",
                "Pool_wall",
                "POOL_SHADES_OPTION_primitive0",
                "POOL_SHADES_OPTION_primitive1",
                "POOL_WATER",
                "POOL_WALL_OPTION_KIOSK"
                // "PERGOLAS_FRAME OPTION",
                // "PERGOLAS_TIMBER_OPTION"
            ];
        
            // Basculer l'état de chaque mesh de la liste
            poolMeshes.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.setEnabled(!mesh.isEnabled());
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });
        
            // Vérifier si tous les meshes sont cachés
            const allHidden = poolMeshes.every(meshName => {
                const mesh = scene.getMeshByName(meshName);
                return mesh && !mesh.isEnabled();
            });
        
            // Gérer le mesh "TERRAIN POOL"
            const terrainPool = scene.getMeshByName("TERRAIN POOL");
            if (terrainPool) {
                if (allHidden) {
                    terrainPool.setEnabled(true); 
                 
                } else {
                    terrainPool.setEnabled(false); 
                   
                }
            } else {
                console.log("Le mesh TERRAIN POOL est introuvable.");
            }

            

             // Gérer la visibilité des boutons
            const beachButton = document.getElementById("beach-button");
            const aluminiumButton = document.getElementById("aluminium-button");

            if (allHidden) {
                if (beachButton) beachButton.style.visibility = "hidden";
                if (aluminiumButton) aluminiumButton.style.visibility = "hidden";
                
            } else {
                if (beachButton) beachButton.style.visibility = "visible";
                if (aluminiumButton) aluminiumButton.style.visibility = "visible";
            }

            
            // if (allHidden) {
            //     // Cacher les boutons si tous les meshes sont désactivés
            //     if (beachButton) beachButton.style.display = "none";
            //     if (aluminiumButton) aluminiumButton.style.display = "none";
            // } else {
            //     // Afficher les boutons si au moins un mesh est actif
            //     if (beachButton) beachButton.style.display = "block";
            //     if (aluminiumButton) aluminiumButton.style.display = "block";
            // }
        }
        

        function withPoolKioskBalau() { 
            const poolKioskMesh = scene.getMeshByName("POOL_KIOSK");    
            // Vérifie si le mesh existe et est activé avant de changer sa couleur
            if (poolKioskMesh && poolKioskMesh.isEnabled()) {
                
                if (poolKioskMesh) {
                   
                    if (poolKioskMesh.material) {
                        poolKioskMesh.material = poolKioskMesh.material.clone("uniqueMaterialForPoolKioskMesh");
                    } else {                        
                        poolKioskMesh.material = new BABYLON.StandardMaterial("uniqueMaterialForPoolKioskMesh", scene);
                    }           
                
                    poolKioskMesh.material.albedoColor = new BABYLON.Color3.FromHexString('#412617').toGammaSpace();
                }

            } else {
                console.log("Le mesh POOL_KIOSK n'est pas activé, la couleur n'a pas été modifiée.");
            }
        }

        function withPoolKioskDasso(){
            const poolKioskMesh = scene.getMeshByName("POOL_KIOSK");    
            // Vérifie si le mesh existe et est activé avant de changer sa couleur
            if (poolKioskMesh && poolKioskMesh.isEnabled()) {
                if (poolKioskMesh) {
                   
                    if (poolKioskMesh.material) {
                        poolKioskMesh.material = poolKioskMesh.material.clone("uniqueMaterialForPoolKioskMesh");
                    } else {                        
                        poolKioskMesh.material = new BABYLON.StandardMaterial("uniqueMaterialForPoolKioskMesh", scene);
                    }          
                
                    poolKioskMesh.material.albedoColor = new BABYLON.Color3.FromHexString('#C4A589').toGammaSpace();
                }

            } else {
                console.log("Le mesh POOL_KIOSK n'est pas activé, la couleur n'a pas été modifiée.");
            }
        }

        /* 
           End Scene Pool
        */ 

        
        /* 
           Start Scene Pool Beach
        */ 
        function togglePoolBeach(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") || $("#decking").is(":visible") || $("#cladding").is(":visible") || $("#garage").is(":visible") || $("#storage").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#opening").hide();
                $("#pergolas").hide();  
                $("#decking").hide();
                $("#cladding").hide();
                $("#garage").hide();
                $("#storage").hide();          
            }
            $("#pool_beach").toggle();    
            $("#paint-button, #aluminium-button, #pool-button, #pergolas-button,#opening-button, #decking-button,#cladding-button, #garage-button,  #storage-button").removeClass("button-active"); 
            $("#beach-button").toggleClass("button-active", $("#pool_beach").is(":visible"));  
        }

        function poolBeachCeramicLappato(){
            scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#9A9183').toGammaSpace(); 
             // Récupérer le matériau
            //  let CeramicLappato = scene.getMaterialByName("Pool_Beach_Eco Ceramic_Rebel_Taupe_Lappato");
            
        }

        function poolBeachCrosscut(){
            scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#C8C4B9').toGammaSpace(); 
            // let Crosscut = scene.getMaterialByName("Pool_Beach_Ceramica_Mayor_Crosscut_Cloud");
            
        }

        function poolBeachCeramicLight(){
            scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#F2F2F2').toGammaSpace(); 
            // let CeramicLight = scene.getMaterialByName("Pool _beach_Halcon_Ceramicas_White");
            
            // // Vérifier si le matériau et la mesh existent
            // if (CeramicLight && scene.getMeshByName("TIMBER_DECKING_OPTION")) {
            //     // Appliquer le matériau à la mesh
            //     scene.getMeshByName("POOL_TILES_OPTION").material = CeramicLight;
            //     console.log('33333');
            // } else {
            //     console.log("Le matériau ou la mesh est introuvable.");
            // }
        }

        /* 
           End Scene Pool Beach
        */ 

        /* 
           start Scene kiosk
        */ 

           function toggleAlminium(){
            if ($("#pergolas").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#paint").is(":visible") || $("#opening").is(":visible") || $("#decking").is(":visible") || $("#cladding").is(":visible") || $("#garage").is(":visible") || $("#storage").is(":visible")) {
                $("#pergolas").hide();
                $("#paint").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#opening").hide();
                $("#decking").hide();
                $("#cladding").hide();
                $("#garage").hide(); 
                $("#storage").hide();   
            }
            $("#aluminium").toggle();    
            $("#paint-button, #pergolas-button, #pool-button, #beach-button, #opening-button, #decking-button, #cladding-button, #garage-button,#storage-button").removeClass("button-active"); 
            $("#aluminium-button").toggleClass("button-active", $("#aluminium").is(":visible"));     
        }

        function whithoutKios(){
            
            const poolMeshes = [                
                "POOL_KIOSK",
                "POOL_PUMP_DECKING",
                "POOL_WALL_OPTION_KIOSK"
            ];
        
            // Basculer l'état de chaque mesh de la liste
            poolMeshes.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.setEnabled(!mesh.isEnabled());
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });

            // Vérifier si tous les meshes sont cachés
            const allHidden = poolMeshes.every(meshName => {
                const mesh = scene.getMeshByName(meshName);
                return mesh && !mesh.isEnabled();
            });

             // Gérer la visibilité des boutons
             const beachButton = document.getElementById("kiosk-bamboo");
             const aluminiumButton = document.getElementById("kiosk-balau");
 
             if (allHidden) {
                 if (beachButton) beachButton.style.visibility = "hidden";
                 if (aluminiumButton) aluminiumButton.style.visibility = "hidden";
             } else {
                 if (beachButton) beachButton.style.visibility = "visible";
                 if (aluminiumButton) aluminiumButton.style.visibility = "visible";
             }

        }

        function PoolKioskBalau(){
            // Récupérer le matériau
            let KioskBalau = scene.getMaterialByName("Timber_Balau");
            
            // Liste des meshes à modifier
            const meshesToUpdate = [
                "POOL_KIOSK",
                "POOL_PUMP_DECKING",
              
            ];
            
            // Vérifier si le matériau existe
            if (KioskBalau) {
                // Appliquer le matériau à chaque mesh de la liste
                meshesToUpdate.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.material = KioskBalau;                        
                    } else {
                        console.log(`Mesh ${meshName} introuvable.`);
                    }
                });
            } else {
                console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
            }

        }

        function PoolKioskBamboo() {
               // Récupérer le matériau
               let KioskBamboo = scene.getMaterialByName("Timber_BAMBOO");
            
               // Liste des meshes à modifier
               const meshesToUpdate = [
                   "POOL_KIOSK",
                   "POOL_PUMP_DECKING",
                 
               ];
               
               // Vérifier si le matériau existe
               if (KioskBamboo) {
                   // Appliquer le matériau à chaque mesh de la liste
                   meshesToUpdate.forEach(meshName => {
                       const mesh = scene.getMeshByName(meshName);
                       if (mesh) {
                           mesh.material = KioskBamboo;                        
                       } else {
                           console.log(`Mesh ${meshName} introuvable.`);
                       }
                   });
               } else {
                   console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
               }
        }
   
        /* 
           start Scene openning
        */ 

        function toggleOpenings(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#decking").is(":visible") || $("#cladding").is(":visible") || $("#garage").is(":visible") || $("#storage").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();       
                $("#decking").hide();   
                $("#cladding").hide();
                $("#garage").hide();
                $("#storage").hide(); 
            }
            $("#opening").toggle(); 

            $("#paint-button, #aluminium-button, #pergolas-button, #pool-button, #beach-button, #decking-button,#cladding-button, #garage-button,  #storage-button").removeClass("button-active"); 
            $("#opening-button").toggleClass("button-active"); 
            
        }

        function AluBlack() {
            // Récupérer le matériau
            let Black = scene.getMaterialByName("OPENING_FRAME_BLACK");
            
            // Liste des meshes à modifier
            const meshesToUpdate = [
                "OPENING_WINDOW_FRAME",
                "OPENING_SCREEN_FRAME",
                "OPENING_SCREEN_TIMBER"
            ];
            
            // Vérifier si le matériau existe
            if (Black) {
                // Appliquer le matériau à chaque mesh de la liste
                meshesToUpdate.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.material = Black;                        
                    } else {
                        console.log(`Mesh ${meshName} introuvable.`);
                    }
                });
            } else {
                console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
            }
        }
        

        function AluGrey(){
                         
               // Récupérer le matériau
               let Black = scene.getMaterialByName("OPENING_FRAME_DARK_GREY");
            
               // Liste des meshes à modifier
               const meshesToUpdate = [
                   "OPENING_WINDOW_FRAME",
                   "OPENING_SCREEN_FRAME",
                   "OPENING_SCREEN_TIMBER"
               ];
               
               // Vérifier si le matériau existe
               if (Black) {
                   // Appliquer le matériau à chaque mesh de la liste
                   meshesToUpdate.forEach(meshName => {
                       const mesh = scene.getMeshByName(meshName);
                       if (mesh) {
                           mesh.material = Black;
                       } else {
                           console.log(`Mesh ${meshName} introuvable.`);
                       }
                   });
               } else {
                   console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
               }
            
        }
      
        /* 
           start Scene decking
        */ 
        function toggleDecking(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")|| $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") || $("#cladding").is(":visible") || $("#garage").is(":visible") || $("#storage").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();  
                $("#opening").hide();
                $("#cladding").hide();
                $("#garage").hide();
                $("#storage").hide();              
            }
            $("#decking").toggle();   
            $("#paint-button, #aluminium-button, #pool-button, #beach-button, #pergolas-button,#opening-button,#cladding-button, #garage-button,  #storage-button").removeClass("button-active"); 
            $("#decking-button").toggleClass("button-active", $("#decking").is(":visible"));  
        }

        function DeckingTimberBalau(){

                 // Récupérer le matériau
                 let TimberBalau = scene.getMaterialByName("Timber_Balau");
            
                 // Vérifier si le matériau et la mesh existent
                 if (TimberBalau && scene.getMeshByName("TIMBER_DECKING_OPTION")) {
                     // Appliquer le matériau à la mesh
                     scene.getMeshByName("TIMBER_DECKING_OPTION").material = TimberBalau;
                 } else {
                     console.log("Le matériau ou la mesh est introuvable.");
                 }

        }

        function DeckingTimberBamboo(){ 

              // Récupérer le matériau
              let TimberBAMBOO = scene.getMaterialByName("Timber_BAMBOO");
            
              // Vérifier si le matériau et la mesh existent
              if (TimberBAMBOO && scene.getMeshByName("TIMBER_DECKING_OPTION")) {
                  // Appliquer le matériau à la mesh
                  scene.getMeshByName("TIMBER_DECKING_OPTION").material = TimberBAMBOO;
              } else {
                  console.log("Le matériau ou la mesh est introuvable.");
              }

        }

        /* 
           Start Scene wall Cladding
        */

        //WALL CLADDING
        function toggleWallCladding() {
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")|| $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") || $("#decking").is(":visible") || $("#garage").is(":visible") || $("#storage").is(":visible") ) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();     
                $("#opening").hide();
                $("#decking").hide();
                $("#garage").hide();
                $("#storage").hide();        
            }
            $("#cladding").toggle();   
            $("#paint-button, #aluminium-button, #pool-button, #beach-button, #pergolas-button,#opening-button, #decking-button, #garage-button,  #storage-button").removeClass("button-active"); 
            $("#cladding-button").toggleClass("button-active", $("#cladding").is(":visible"));     
        
        }

        function claddingBasalt(){
             // Récupérer le matériau
             let claddingBasaltstone = scene.getMaterialByName("WATERFALL_BASALT_STONE");
            
             // Vérifier si le matériau et la mesh existent
             if (claddingBasaltstone && scene.getMeshByName("STONE_CLADDING_OPTION")) {
                 // Appliquer le matériau à la mesh
                 scene.getMeshByName("STONE_CLADDING_OPTION").material = claddingBasaltstone;
             } else {
                 console.log("Le matériau ou la mesh est introuvable.");
             }
        }

        function claddingVolcanic(){
            // Récupérer le matériau
            let claddingVolcanicstone = scene.getMaterialByName("STONE_CLADDING_VOLCANIC_STONE");
           
            // Vérifier si le matériau et la mesh existent
            if (claddingVolcanicstone && scene.getMeshByName("STONE_CLADDING_OPTION")) {
                // Appliquer le matériau à la mesh
                scene.getMeshByName("STONE_CLADDING_OPTION").material = claddingVolcanicstone;
            } else {
                console.log("Le matériau ou la mesh est introuvable.");
            }
       }

        /* 
           End Scene wall Cladding
        */
         
        /* 
           start Scene garage
        */ 
        function toggleGarage(){
         
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") || $("#decking").is(":visible") || $("#storage").is(":visible") || $("#cladding").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();
                $("#opening").hide();
                $("#decking").hide(); 
                $("#cladding").hide();  
                $("#storage").hide();             
            }
            $("#garage").toggle(); 
            $("#paint-button, #aluminium-button, #pergolas-button, #pool-button, #beach-button,#opening-button, #decking-button, #cladding-button, #storage-button").removeClass("button-active");
            $("#garage-button").toggleClass("button-active"); 

            
        }

        function whithoutGarage(){
            scene.getMeshByName("ROLLER_SHUTTER_OPTION").setEnabled((scene.getMeshByName("ROLLER_SHUTTER_OPTION").isEnabled() ? false : true));
            scene.getMeshByName("WALL_EXT_GARAGE_OPTION").setEnabled((scene.getMeshByName("WALL_EXT_GARAGE_OPTION").isEnabled() ? false : true));
        }

        /* 
           start Scene storage
        */ 
        function toggleStorage(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")|| $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") || $("#decking").is(":visible") || $("#cladding").is(":visible") || $("#garage").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();  
                $("#opening").hide();
                $("#decking").hide();
                $("#cladding").hide();
                $("#garage").hide(); 
                               
            }
            $("#storage").toggle(); 
            $("#paint-button, #aluminium-button, #pergolas-button, #pool-button, #beach-button,#opening-button, #decking-button, #cladding-button, #garage-button").removeClass("button-active");
            $("#storage-button").toggleClass("button-active"); 

            // scene.getMeshByName("Storage_Door").setEnabled((scene.getMeshByName("Storage_Door").isEnabled() ? false : true));
        }

        function whithoutStorage(){
            scene.getMeshByName("Storage_Door").setEnabled((scene.getMeshByName("Storage_Door").isEnabled() ? false : true));
        }


       

       

      

     