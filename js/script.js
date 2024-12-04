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
            // BABYLON.SceneLoader.Append("scene/", "CM _AQUAMARINE_BLD_EXT_W 2 (1).glb", scene, function (meshes) {
            BABYLON.SceneLoader.Append("scene/", "CM _AQUAMARINE_BLD_EXT_04.glb", scene, function (meshes) {

                //verifier si le modele est charge
                console.log("Le modèle a été chargé avec succès :", meshes);

                const meshesToHide = ["Text001","Text002","Text003","Text004","Text005","Text006","Text007","Text008","Text010","Text011","Text012","Text013","Text014","Text015","Text017","TEXT0012","Text 001","Text 002","TERRAIN POOL", "TERRAIN","Box010Pool_Beach_Eco Ceramic_Rebel_Taupe_Lappato","Eco_Deck_Composite_Timber","OPENING_FRAME_BLACK","OPENING_FRAME_DARK_GREY_primitive0","OPENING_FRAME_DARK_GREY_primitive1","Pool _beach_Halcon_Ceramicas_White","Pool_Beach_Ceramica_Mayor_Crosscut_Cloud\n","Timber_Balau","Timber_BAMBOO","Wall Paint_Elmwood","Wall paint_Italian Stone_primitive0", "Wall paint_Italian Stone_primitive1", "Wall paint_Italian Stone_primitive2","STONE_CLADDING_VOLCANIC_STONE_primitive0","STONE_CLADDING_VOLCANIC_STONE_primitive1","Wall_Paint_Sofap_Almost_White_Ref:8002/1","WATERFALL_BASALT_STONE"]

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
                scene.activeCamera.useAutoRotationBehavior = false;

                // Limiter la rotation verticale (Beta) pour empêcher de regarder en haut et en bas
                scene.activeCamera.lowerBetaLimit = Math.PI / 2 - 0.3;
                scene.activeCamera.upperBetaLimit = Math.PI / 2 - 0.2; 

                // Optionnel : Ajuster légèrement la position initiale de la caméra
                scene.activeCamera.beta = Math.PI / 2;
                scene.activeCamera.alpha = 0;
                scene.activeCamera.fov = 0.6;

                // Limiter le zoom
                scene.activeCamera.lowerRadiusLimit = 35;
                scene.activeCamera.upperRadiusLimit = 100;
        
                // Désactiver la lumière par défaut et créer une nouvelle lumière
                scene.lights[0].dispose();
                var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-2, -3, 1), scene);
                light.position = new BABYLON.Vector3(6, 9, 3);


                // Désactiver la génération d'ombres
                var generator = new BABYLON.ShadowGenerator(512, light);
                generator.useBlurExponentialShadowMap = true;
                generator.blurKernel = 32;                
        
                // Créer l'environnement par défaut
                var helper = scene.createDefaultEnvironment({
                    enableGroundMirror: false,
                    groundShadowLevel: 0.1,
                });       
        
                // helper.setMainColor(BABYLON.Color3.White());
                helper.setMainColor(new BABYLON.Color3.FromHexString("#ffffff"));
                
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
            const waterMaterial = scene.getMaterialByName("Water");
            if (waterMaterial) {
                waterMaterial.alpha = 0.2;
            } else {
                console.warn("Le matériau MaterialWater n'a pas été trouvé.");
            }
        
            // Trouver le matériau pour le verre et le rendre complètement transparent
            const glassMaterial = scene.getMaterialByName("Glass");
            if (glassMaterial) {
                glassMaterial.alpha = 0.1;
            } else {
                console.warn("Le matériau MaterialGlass n'a pas été trouvé.");
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
             let materialWallItalian = scene.getMaterialByName("Wall_paint_Italian_Stone");
            
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

            // Vérifier si le matériau existe
            if (TimberBalau) {
                TimberBalau = TimberBalau.clone("Timber_Balau_Clone");
            }

            // Ajouter une couleur émissive au matériau
            TimberBalau.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

             // Vérifier si le GlowLayer existe, sinon le créer
            if (!scene.glowLayer) {                
                scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);                
            }
            
            // Liste des meshes à modifier
            const meshesToUpdate = [
                "PERGOLAS_TIMBER_OPTION",
                "PERGOLAS_TIMBER_FIX",
                "PERGOLAS_TIMBERS_FIX",
                "DECKING_PERGOLA _ENTRANCE",               
              
            ];

            meshesToUpdate.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.material = TimberBalau;
        
                    // Ajouter le mesh au GlowLayer
                    scene.glowLayer.addIncludedOnlyMesh(mesh);
                    scene.glowLayer.intensity = 0.8;
        
                    // Retirer l'effet Glow après 0,2 seconde
                    setTimeout(() => {
                        scene.glowLayer.removeIncludedOnlyMesh(mesh);
        
                        // Réinitialiser la couleur émissive
                        TimberBalau.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }, 200);
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });
           }
   
           function PergolasTimberBamboo(){          

                let TimberBAMBOO = scene.getMaterialByName("Timber_BAMBOO");

                  // Vérifier si le matériau existe
                if (TimberBAMBOO) {
                    TimberBAMBOO = TimberBAMBOO.clone("Timber_BAMBOO_Clone");
                }

                // Ajouter une couleur émissive au matériau
                TimberBAMBOO.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

                // Vérifier si le GlowLayer existe, sinon le créer
                if (!scene.glowLayer) {                
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);                
                }
            
                // Liste des meshes à modifier
                const meshesToUpdate = [
                    "PERGOLAS_TIMBER_OPTION",
                    "PERGOLAS_TIMBER_FIX",
                    "PERGOLAS_TIMBERS_FIX",
                    "DECKING_PERGOLA _ENTRANCE",                  
                  
                ];

                meshesToUpdate.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.material = TimberBAMBOO;
            
                        // Ajouter le mesh au GlowLayer
                        scene.glowLayer.addIncludedOnlyMesh(mesh);
                        scene.glowLayer.intensity = 0.8;
            
                        // Retirer l'effet Glow après 0,2 seconde
                        setTimeout(() => {
                            scene.glowLayer.removeIncludedOnlyMesh(mesh);
            
                            // Réinitialiser la couleur émissive
                            TimberBAMBOO.emissiveColor = new BABYLON.Color3(0, 0, 0);
                        }, 200);
                    } else {
                        console.log(`Mesh ${meshName} introuvable.`);
                    }
                });
           }
   
           function PergolasFrameDark(){

                // let TimberBalau = scene.getMaterialByName("Timber_Balau");
                let Black = scene.getMaterialByName("OPENING_FRAME_BLACK");

                   // Vérifier si le matériau existe
                   if (Black) {
                    Black = Black.clone("OPENING_FRAME_BLACK_Clone");
                }

                // Ajouter une couleur émissive au matériau
                Black.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

                // Vérifier si le GlowLayer existe, sinon le créer
                if (!scene.glowLayer) {                
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);                
                }
            
                // Liste des meshes à modifier
                const meshesToUpdate = [
                    "PERGOLAS_FRAME OPTION",
                    "PERGOLAS_FRAME_FIX",
                    "ENTRANCE_PERGOLAS_FRAME",
                  
                ];
                
                meshesToUpdate.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.material = Black;
            
                        // Ajouter le mesh au GlowLayer
                        scene.glowLayer.addIncludedOnlyMesh(mesh);
                        scene.glowLayer.intensity = 0.8;
            
                        // Retirer l'effet Glow après 0,2 seconde
                        setTimeout(() => {
                            scene.glowLayer.removeIncludedOnlyMesh(mesh);
            
                            // Réinitialiser la couleur émissive
                            Black.emissiveColor = new BABYLON.Color3(0, 0, 0);
                        }, 200);
                    } else {
                        console.log(`Mesh ${meshName} introuvable.`);
                    }
                });
   
           }
   
           function PergolasFrameGrey(){
              
                let DarkGrey = scene.getMaterialByName("OPENING_FRAME_DARK_GREY");

                   // Vérifier si le matériau existe
                if (DarkGrey) {
                    DarkGrey = DarkGrey.clone("OPENING_FRAME_BLACK_Clone");
                }

                // Ajouter une couleur émissive au matériau
                DarkGrey.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

                // Vérifier si le GlowLayer existe, sinon le créer
                if (!scene.glowLayer) {                
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);                
                }
            
                // Liste des meshes à modifier
                const meshesToUpdate = [
                    "PERGOLAS_FRAME OPTION",
                    "PERGOLAS_FRAME_FIX",
                    "ENTRANCE_PERGOLAS_FRAME",
                  
                ];
                
                meshesToUpdate.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.material = DarkGrey;
            
                        // Ajouter le mesh au GlowLayer
                        scene.glowLayer.addIncludedOnlyMesh(mesh);
                        scene.glowLayer.intensity = 0.8;
            
                        // Retirer l'effet Glow après 0,2 seconde
                        setTimeout(() => {
                            scene.glowLayer.removeIncludedOnlyMesh(mesh);
            
                            // Réinitialiser la couleur émissive
                            DarkGrey.emissiveColor = new BABYLON.Color3(0, 0, 0);
                        }, 200);
                    } else {
                        console.log(`Mesh ${meshName} introuvable.`);
                    }
                });
               
           }
  
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

        const meshesState = {
            poolMeshes: false, 
            kiosMeshes: false 
        };


        function whithoutPool() {
            const poolMeshes = [
                "POOL_CONCRETE_BASE",
                "POOL_KIOSK",
                "POOL_PUMP_DECKING",
                "POOL_TILES_OPTION",
                "POOL_WALL",
                "POOL_SHADES_OPTION_primitive0",
                "POOL_SHADES_OPTION_primitive1",
                "POOL_WATER",
                "POOL_WALL_OPTION_KIOSK",
                "Object001"
            ];
        
            // Déterminer l'état cible
            const newState = !meshesState.poolMeshes;
        
            // Mettre à jour l'état des meshes
            poolMeshes.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.setEnabled(newState);
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });
        
            // Mettre à jour l'état global
            meshesState.poolMeshes = newState;
        
            // Gérer la visibilité des boutons
            const beachButton = document.getElementById("beach-button");
            const aluminiumButton = document.getElementById("aluminium-button");
        
            if (!newState) {
                if (beachButton) {
                    beachButton.disabled = true;
                    beachButton.classList.add("disabled-button");
                }
                if (aluminiumButton) {
                    aluminiumButton.disabled = true;
                    aluminiumButton.classList.add("disabled-button");
                }
            } else {
                if (beachButton) {
                    beachButton.disabled = false;
                    beachButton.classList.remove("disabled-button");
                }
                if (aluminiumButton) {
                    aluminiumButton.disabled = false;
                    aluminiumButton.classList.remove("disabled-button");
                }
            }
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
            // scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#9A9183').toGammaSpace(); 

            const claddingBasaltstone = scene.getMaterialByName("Pool_Beach_Eco Ceramic_Rebel_Taupe_Lappato");

            if (claddingBasaltstone) {                   
                claddingBasaltstone.clone("Pool_Beach_Eco Ceramic_Rebel_Taupe_Lappato_Clone");
            }
            
            const claddingMesh = scene.getMeshByName("POOL_TILES_OPTION");
            
            if (claddingMesh) {
                // Vérifier si le matériau existe déjà
                if (claddingMesh.material) {
                    // Appliquer la couleur directement à albedoColor
                    claddingMesh.material.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);
                    claddingMesh.material.albedoColor = BABYLON.Color3.FromHexString('#9A9183').toGammaSpace();
                } else {
                    console.log("La mesh n'a pas de matériau assigné.");
                }
            
                // Activer l'effet Glow
                if (!scene.glowLayer) {
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
                }
                scene.glowLayer.addIncludedOnlyMesh(claddingMesh);
                scene.glowLayer.intensity = 0.8;
            
                // Supprimer l'effet Glow après 1 seconde
                setTimeout(() => {
                    scene.glowLayer.removeIncludedOnlyMesh(claddingMesh);
                    if (claddingMesh.material) {
                        claddingMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }
                }, 200); 
            } else {
                console.log("La mesh POOL_TILES_OPTION est introuvable.");
            }
            
        }

        function poolBeachCrosscut(){
            // scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#C8C4B9').toGammaSpace(); 
            const claddingBasaltstone = scene.getMaterialByName("Pool_Beach_Ceramica_Mayor_Crosscut_Cloud");

            if (claddingBasaltstone) {                   
                claddingBasaltstone.clone("Pool_Beach_Ceramica_Mayor_Crosscut_Cloud_Clone");
            }
            
            const claddingMesh = scene.getMeshByName("POOL_TILES_OPTION");
            
            if (claddingMesh) {
                // Vérifier si le matériau existe déjà
                if (claddingMesh.material) {
                    // Appliquer la couleur directement à albedoColor
                    claddingMesh.material.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);
                    claddingMesh.material.albedoColor = BABYLON.Color3.FromHexString('#C8C4B9').toGammaSpace();
                } else {
                    console.log("La mesh n'a pas de matériau assigné.");
                }
            
                // Activer l'effet Glow
                if (!scene.glowLayer) {
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
                }
                scene.glowLayer.addIncludedOnlyMesh(claddingMesh);
                scene.glowLayer.intensity = 0.8;
            
                // Supprimer l'effet Glow après 1 seconde
                setTimeout(() => {
                    scene.glowLayer.removeIncludedOnlyMesh(claddingMesh);
                    if (claddingMesh.material) {
                        claddingMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }
                }, 200); 
            } else {
                console.log("La mesh POOL_TILES_OPTION est introuvable.");
            }   
           
        }

        function poolBeachCeramicLight(){
            // scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#F2F2F2').toGammaSpace(); 

            const claddingBasaltstone = scene.getMaterialByName("Pool _beach_Halcon_Ceramicas_White");

            if (claddingBasaltstone) {                   
                claddingBasaltstone.clone("Pool _beach_Halcon_Ceramicas_White_Clone");
            }
            
            const claddingMesh = scene.getMeshByName("POOL_TILES_OPTION");
            
            if (claddingMesh) {
                // Vérifier si le matériau existe déjà
                if (claddingMesh.material) {
                    // Appliquer la couleur directement à albedoColor
                    claddingMesh.material.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);
                    claddingMesh.material.albedoColor = BABYLON.Color3.FromHexString('#F2F2F2').toGammaSpace();
                } else {
                    console.log("La mesh n'a pas de matériau assigné.");
                }
            
                // Activer l'effet Glow
                if (!scene.glowLayer) {
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
                }
                scene.glowLayer.addIncludedOnlyMesh(claddingMesh);
                scene.glowLayer.intensity = 0.8;
            
                // Supprimer l'effet Glow après 1 seconde
                setTimeout(() => {
                    scene.glowLayer.removeIncludedOnlyMesh(claddingMesh);
                    if (claddingMesh.material) {
                        claddingMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }
                }, 200); 
            } else {
                console.log("La mesh POOL_TILES_OPTION est introuvable.");
            }
        }

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


        function whithoutKios() {
            const kiosMeshes = [
                "POOL_KIOSK",
                "POOL_PUMP_DECKING",
                "POOL_WALL_OPTION_KIOSK"
            ];
        
            // Déterminer l'état cible
            const newState = !meshesState.kiosMeshes;
        
            // Mettre à jour l'état des meshes
            kiosMeshes.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.setEnabled(newState);
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });
        
            // Mettre à jour l'état global
            meshesState.kiosMeshes = newState;
        
            // Gérer la visibilité des boutons
            const beachButton = document.getElementById("kiosk-bamboo");
            const aluminiumButton = document.getElementById("kiosk-balau");
        
            if (!newState) {
                if (beachButton) beachButton.style.visibility = "hidden";
                if (aluminiumButton) aluminiumButton.style.visibility = "hidden";
            } else {
                if (beachButton) beachButton.style.visibility = "visible";
                if (aluminiumButton) aluminiumButton.style.visibility = "visible";
            }
        }

        function PoolKioskBalau() {           
            // Récupérer le matériau
            let KioskBalau = scene.getMaterialByName("Timber_Balau");
        
            // Vérifier si le matériau existe
            if (KioskBalau) {
                KioskBalau = KioskBalau.clone("Timber_BAMBOO_Clone");
            }

               // Ajouter une couleur émissive au matériau
            KioskBalau.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);
            // Liste des meshes à modifier
            const meshesToUpdate = [
                "POOL_KIOSK",
                "POOL_PUMP_DECKING",
            ];
        
            // Vérifier si le GlowLayer existe, sinon le créer
            if (!scene.glowLayer) {
                
                scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
                // console.log("Glow.");
            }

             // Appliquer le matériau et ajouter l'effet Glow temporaire
            meshesToUpdate.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.material = KioskBalau;

                    // Ajouter le mesh au GlowLayer
                    scene.glowLayer.addIncludedOnlyMesh(mesh);
                    scene.glowLayer.intensity = 0.8;

                    // Retirer l'effet Glow après 0,2 seconde
                    setTimeout(() => {
                        scene.glowLayer.removeIncludedOnlyMesh(mesh);

                        // Réinitialiser la couleur émissive
                        KioskBalau.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }, 200);
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });
        }
        

        function PoolKioskBamboo() {           
            // Récupérer le matériau
            let KioskBamboo = scene.getMaterialByName("Timber_BAMBOO");
        
            if (KioskBamboo) {
                KioskBamboo = KioskBamboo.clone("Timber_BAMBOO_Clone");
            }
        
            // Ajouter une couleur émissive temporaire
            KioskBamboo.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);
        
            // Liste des meshes à modifier
            const meshesToUpdate = [
                "POOL_KIOSK",
                "POOL_PUMP_DECKING",
            ];
        
            // Vérifier si le GlowLayer existe, sinon le créer
            if (!scene.glowLayer) {
                scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
            }

             // Supprimer les meshes précédents du GlowLayer
            // scene.glowLayer.removeAllMeshes();
        
            // Appliquer le matériau et ajouter l'effet Glow temporaire
            // meshesToUpdate.forEach(meshName => {
            //     const mesh = scene.getMeshByName(meshName);
            //     if (mesh) {
            //         mesh.material = KioskBamboo;
        
            //         // Ajouter le mesh au GlowLayer
            //         scene.glowLayer.addIncludedOnlyMesh(mesh);
            //         scene.glowLayer.intensity = 0.8;
        
            //         // Diminuer progressivement l'intensité du Glow
            //         let fadeDuration = 500; // Durée totale du fondu en ms
            //         let steps = 1; // Nombre d'étapes du fondu
            //         let stepDuration = fadeDuration / steps; // Durée de chaque étape
            //         let intensityStep = scene.glowLayer.intensity / steps; // Intensité à réduire à chaque étape
                    
            //         let currentStep = 0;
            //         let fadeInterval = setInterval(() => {
            //             if (currentStep < steps) {
            //                 scene.glowLayer.intensity -= intensityStep;
            //                 currentStep++;
            //             } else {
            //                 // Arrêter le fondu et réinitialiser le matériau
            //                 clearInterval(fadeInterval);
            //                 scene.glowLayer.removeIncludedOnlyMesh(mesh);
            //                 KioskBamboo.emissiveColor = new BABYLON.Color3(0, 0, 0); // Réinitialiser la couleur émissive
            //             }
            //         }, stepDuration);
            //     } else {
            //         console.log(`Mesh ${meshName} introuvable.`);
            //     }
            // });
            meshesToUpdate.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.material = KioskBamboo;

                    // Ajouter le mesh au GlowLayer
                    scene.glowLayer.addIncludedOnlyMesh(mesh);
                    scene.glowLayer.intensity = 0.8;

                    // Retirer l'effet Glow après 0,2 seconde
                    setTimeout(() => {
                        scene.glowLayer.removeIncludedOnlyMesh(mesh);

                        // Réinitialiser la couleur émissive
                        KioskBamboo.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }, 200); 
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });
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

            if (Black) {
                Black = Black.clone("OPENING_FRAME_BLACK_Clone");
            }
            Black.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);
            if (!scene.glowLayer) {
                
                scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
            }
            
            // Liste des meshes à modifier
            const meshesToUpdate = [
                "OPENING_WINDOW_FRAME",
                "OPENING_SCREEN_FRAME",
                "OPENING_SCREEN_TIMBER",
                "BED2_SCREEN"
            ];

            
            meshesToUpdate.forEach(meshName => {
                const mesh = scene.getMeshByName(meshName);
                if (mesh) {
                    mesh.material = Black;

                    // Ajouter le mesh au GlowLayer
                    scene.glowLayer.addIncludedOnlyMesh(mesh);
                    scene.glowLayer.intensity = 0.4;

                    // Retirer l'effet Glow après 0,2 seconde
                    setTimeout(() => {
                        scene.glowLayer.removeIncludedOnlyMesh(mesh);

                        // Réinitialiser la couleur émissive
                        Black.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }, 200);
                } else {
                    console.log(`Mesh ${meshName} introuvable.`);
                }
            });


            
            // Vérifier si le matériau existe
            // if (Black) {
            //     // Appliquer le matériau à chaque mesh de la liste
            //     meshesToUpdate.forEach(meshName => {
            //         const mesh = scene.getMeshByName(meshName);
            //         if (mesh) {
            //             mesh.material = Black;                        
            //         } else {
            //             console.log(`Mesh ${meshName} introuvable.`);
            //         }
            //     });
            // } else {
            //     console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
            // }
        }
        

        function AluGrey(){
                         
               // Récupérer le matériau
               let Black = scene.getMaterialByName("OPENING_FRAME_DARK_GREY");
            
               // Liste des meshes à modifier
               const meshesToUpdate = [
                   "OPENING_WINDOW_FRAME",
                   "OPENING_SCREEN_FRAME",
                   "OPENING_SCREEN_TIMBER",
                   "BED2_SCREEN"
               ];

               if (Black) {
                Black = Black.clone("OPENING_FRAME_DARK_GREY_Clone");
                }
                Black.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);
                if (!scene.glowLayer) {
                    
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
                }

                meshesToUpdate.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.material = Black;
    
                        // Ajouter le mesh au GlowLayer
                        scene.glowLayer.addIncludedOnlyMesh(mesh);
                        scene.glowLayer.intensity = 0.4;
    
                        // Retirer l'effet Glow après 0,2 seconde
                        setTimeout(() => {
                            scene.glowLayer.removeIncludedOnlyMesh(mesh);
    
                            // Réinitialiser la couleur émissive
                            Black.emissiveColor = new BABYLON.Color3(0, 0, 0);
                        }, 200);
                    } else {
                        console.log(`Mesh ${meshName} introuvable.`);
                    }
                });


            
               
               // Vérifier si le matériau existe
            //    if (Black) {
            //        // Appliquer le matériau à chaque mesh de la liste
            //        meshesToUpdate.forEach(meshName => {
            //            const mesh = scene.getMeshByName(meshName);
            //            if (mesh) {
            //                mesh.material = Black;
            //            } else {
            //                console.log(`Mesh ${meshName} introuvable.`);
            //            }
            //        });
            //    } else {
            //        console.log("Le matériau OPENING_FRAME_BLACK est introuvable.");
            //    }
            
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

                 if (TimberBalau) {                   
                    TimberBalau = TimberBalau.clone("Timber_BAMBOO_Clone");
                }

                TimberBalau.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

                if (!scene.glowLayer) {
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
                }

                   // Vérifier si la mesh existe
                   const deckingMesh = scene.getMeshByName("TIMBER_DECKING_OPTION");
                   if (deckingMesh) {
                       // Appliquer le matériau à la mesh
                       deckingMesh.material = TimberBalau;
   
                       // Ajouter la mesh au GlowLayer
                       scene.glowLayer.addIncludedOnlyMesh(deckingMesh);
                       scene.glowLayer.intensity = 0.8;
   
                       // Supprimer l'effet Glowaprès 1 seconde
                       setTimeout(() => {
                           scene.glowLayer.removeIncludedOnlyMesh(deckingMesh);
                           TimberBalau.emissiveColor = new BABYLON.Color3(0, 0, 0);
                       }, 200); 
                   } else {
                       console.log("La mesh TIMBER_DECKING_OPTION est introuvable.");
                   }
            
                 // Vérifier si le matériau et la mesh existent
                //  if (TimberBalau && scene.getMeshByName("TIMBER_DECKING_OPTION")) {
                //      // Appliquer le matériau à la mesh
                //      scene.getMeshByName("TIMBER_DECKING_OPTION").material = TimberBalau;
                //  } else {
                //      console.log("Le matériau ou la mesh est introuvable.");
                //  }

        }

        function DeckingTimberBamboo(){ 

              // Récupérer le matériau
              let TimberBAMBOO = scene.getMaterialByName("Timber_BAMBOO");

                 // Vérifier si le matériau existe
                if (TimberBAMBOO) {
                    // Cloner le matériau pour éviter des modifications globales
                    TimberBAMBOO = TimberBAMBOO.clone("Timber_BAMBOO_Clone");
                }

                TimberBAMBOO.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

                if (!scene.glowLayer) {
                    scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
                }

                // Vérifier si la mesh existe
                const deckingMesh = scene.getMeshByName("TIMBER_DECKING_OPTION");
                if (deckingMesh) {
                    // Appliquer le matériau à la mesh
                    deckingMesh.material = TimberBAMBOO;

                    // Ajouter la mesh au GlowLayer
                    scene.glowLayer.addIncludedOnlyMesh(deckingMesh);
                    scene.glowLayer.intensity = 0.8;

                    // Supprimer l'effet Glowaprès 1 seconde
                    setTimeout(() => {
                        scene.glowLayer.removeIncludedOnlyMesh(deckingMesh);
                        TimberBAMBOO.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    }, 200); 
                } else {
                    console.log("La mesh TIMBER_DECKING_OPTION est introuvable.");
                }
            
              // Vérifier si le matériau et la mesh existent
            //   if (TimberBAMBOO && scene.getMeshByName("TIMBER_DECKING_OPTION")) {
            //       // Appliquer le matériau à la mesh
            //       scene.getMeshByName("TIMBER_DECKING_OPTION").material = TimberBAMBOO;
            //   } else {
            //       console.log("Le matériau ou la mesh est introuvable.");
            //   }

        }

        /* 
           Start Scene wall Cladding
        */

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
            //  let claddingBasaltstone = scene.getMaterialByName("WATERFALL_BASALT_STONE");
            
            //  // Vérifier si le matériau et la mesh existent
            //  if (claddingBasaltstone && scene.getMeshByName("STONE_CLADDING_OPTION")) {
            //      // Appliquer le matériau à la mesh
            //      scene.getMeshByName("STONE_CLADDING_OPTION").material = claddingBasaltstone;
            //  } else {
            //      console.log("Le matériau ou la mesh est introuvable.");
            //  }

            // Récupérer le matériau
            let claddingBasaltstone = scene.getMaterialByName("WATERFALL_BASALT_STONE");

            if (claddingBasaltstone) {                   
                claddingBasaltstone = claddingBasaltstone.clone("WATERFALL_BASALT_STONE_Clone");
           }

           claddingBasaltstone.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

           if (!scene.glowLayer) {
               scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
           }

              // Vérifier si la mesh existe
              const claddingMesh = scene.getMeshByName("STONE_CLADDING_OPTION");
              if (claddingMesh) {
                  // Appliquer le matériau à la mesh
                  claddingMesh.material = claddingBasaltstone;

                  // Ajouter la mesh au GlowLayer
                  scene.glowLayer.addIncludedOnlyMesh(claddingMesh);
                  scene.glowLayer.intensity = 0.8;

                  // Supprimer l'effet Glowaprès 1 seconde
                  setTimeout(() => {
                      scene.glowLayer.removeIncludedOnlyMesh(claddingMesh);
                      claddingBasaltstone.emissiveColor = new BABYLON.Color3(0, 0, 0);
                  }, 200); 
              } else {
                  console.log("La mesh STONE_CLADDING_OPTION est introuvable.");
              }
        }

        function claddingVolcanic(){
            // Récupérer le matériau
            let claddingVolcanicstone = scene.getMaterialByName("STONE_CLADDING_VOLCANIC_STONE");

            if (claddingVolcanicstone) {                   
                claddingVolcanicstone = claddingVolcanicstone.clone("STONE_CLADDING_VOLCANIC_STONE_Clone");
           }

           claddingVolcanicstone.emissiveColor = new BABYLON.Color3(0.6, 0.5, 0.4);

           if (!scene.glowLayer) {
               scene.glowLayer = new BABYLON.GlowLayer("glowLayer", scene);
           }

           const claddingMesh = scene.getMeshByName("STONE_CLADDING_OPTION");
           if (claddingMesh) {
               // Appliquer le matériau à la mesh
               claddingMesh.material = claddingVolcanicstone;

               // Ajouter la mesh au GlowLayer
               scene.glowLayer.addIncludedOnlyMesh(claddingMesh);
               scene.glowLayer.intensity = 0.8;

               // Supprimer l'effet Glowaprès 1 seconde
               setTimeout(() => {
                   scene.glowLayer.removeIncludedOnlyMesh(claddingMesh);
                   claddingVolcanicstone.emissiveColor = new BABYLON.Color3(0, 0, 0);
               }, 200); 
           } else {
               console.log("La mesh STONE_CLADDING_OPTION est introuvable.");
           }           

            // Vérifier si le matériau et la mesh existent
            // if (claddingVolcanicstone && scene.getMeshByName("STONE_CLADDING_OPTION")) {
            //     // Appliquer le matériau à la mesh
            //     scene.getMeshByName("STONE_CLADDING_OPTION").material = claddingVolcanicstone;
            // } else {
            //     console.log("Le matériau ou la mesh est introuvable.");
            // }
       }

         
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

        function setActiveButton(button) {
            // Retirer la classe active de tous les boutons
            document.querySelectorAll('#actif-paint').forEach(btn => {
                btn.classList.remove('active');
            });
    
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
        }

        function setActiveButtonPergolas(button){
            document.querySelectorAll('#actif-pergolas').forEach(btn => {
                btn.classList.remove('active');
            });
    
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
        }

        function setActiveButtonBeach(button){
            document.querySelectorAll('#actif-beach').forEach(btn => {
                btn.classList.remove('active');
            });
    
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
        }

        function setActiveButtonOpening(button){
            document.querySelectorAll('#actif-opening').forEach(btn => {
                btn.classList.remove('active');
            });
    
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
        }

        function setActiveButtonDecking(button){
            document.querySelectorAll('#actif-decking').forEach(btn => {
                btn.classList.remove('active');
            });
    
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
        }

        function setActiveButtonCladding(button){
            document.querySelectorAll('#actif-cladding').forEach(btn => {
                btn.classList.remove('active');
            });
    
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
        }