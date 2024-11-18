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
            // BABYLON.SceneLoader.Append("scene/", "Aquamarine%20T8%20.glb", scene, function (meshes) { 
            // BABYLON.SceneLoader.Append("scene/", "CM%20_AQUAMARINE_BLD_EXT.glb", scene, function (meshes) {
            BABYLON.SceneLoader.Append("scene/", "CM _AQUAMARINE_BLD_EXT_W 2 (1).glb", scene, function (meshes) {

                //verifier si le modele est charge
                console.log("Le modèle a été chargé avec succès :", meshes);

                setMaterialsTransparency();


                //Affiche les nom du meshes
                // scene.meshes.forEach(mesh => {
                //     if (mesh.name) {
                //         console.log("Nom du mesh:", mesh.name);
                //     } else {
                //         console.log("Mesh sans nom:", mesh);
                //     }
                // });

                // Cacher certains meshes spécifiés dès le chargement
                const meshesToHide = ["TEXTURE_OPENING_FRAME_BLACK", "TEXTURE_Pool_Beach_Ceramica_Mayor_Crosscut_Cloud ",
                "TEXTURE_Pool _beach_Halcon_Ceramicas_White", "TEXTURE_Eco_Deck_Composite_Timber", "TEXTURE_Pool _beach_Halcon_Ceramicas_White", "TEXTURE_Pool_Beach_Eco Ceramic_Rebel_Taupe_Lappato", "TEXTURE_Timber_Balau", 
                 "TEXTURE_Timber_BAMBOO", "TEXTURE_Wall_Paint_Sofap_Almost_White_Ref:8002/1", "TEXTURE_Wall Paint-Elmwood", 
                 "TEXTURE_WATERFALL_BASALT_STONE", "TEXTURE_Text 001","TEXTURE_Text 002","TEXTURE_Text001", "TEXTURE_Text002","TEXTURE_Text003","TEXTURE_Text004","TEXTURE_Text005","TEXTURE_Text006","TEXTURE_Text007","TEXTURE_Text008", "TEXTURE_Text010","TEXTURE_Text011","TEXTURE_Text012","TEXTURE_Text013","TEXTURE_Text014", "TEXTURE_Text015","TEXTURE_Text017", "TEXTURE_TEXTURE__TEXT012",
                "TEXTURE_OPENING_FRAME_DARK_GREY_primitive0","TEXTURE_OPENING_FRAME_DARK_GREY_primitive1", "TEXTURE_Wall paint  - Italian Stone_primitive0", "TEXTURE_Wall paint  - Italian Stone_primitive1", "TEXTURE_Wall paint  - Italian Stone_primitive2", "TEXTURE_Wall Paint -Elmwood"];

                meshesToHide.forEach(meshName => {
                    const mesh = scene.getMeshByName(meshName);
                    if (mesh) {
                        mesh.setEnabled(false); // Cela cache le mesh
                        // console.log(`Mesh ${meshName} caché.`);
                    } else {
                        console.log(`Le mesh ${meshName} n'a pas été trouvé.`);
                    }
                });

                // Create a camera pointing at your model.
                scene.createDefaultCameraOrLight(true, true, true);
                scene.activeCamera.useAutoRotationBehavior = true;
                scene.activeCamera.beta -= 0.2;
        
                scene.lights[0].dispose();
                var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-2, -3, 1), scene);
                light.position = new BABYLON.Vector3(6, 9, 3);
                var generator = new BABYLON.ShadowGenerator(512, light);
                generator.useBlurExponentialShadowMap = true;
                generator.blurKernel = 32;
        
                for (var i = 0; i < scene.meshes.length; i++) {
                    generator.addShadowCaster(scene.meshes[i]);    
                }
        
                var helper = scene.createDefaultEnvironment({
                    enableGroundMirror: true,
                    groundShadowLevel: 0.6,
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
        }

        function togglePergolas(){

            scene.getMeshByName("PERGOLAS_FRAME_FIX").setEnabled((scene.getMeshByName("PERGOLAS_FRAME_FIX").isEnabled() ? false : true));
            scene.getMeshByName("PERGOLAS_TIMBER_FIX").setEnabled((scene.getMeshByName("PERGOLAS_TIMBER_FIX").isEnabled() ? false : true));

            scene.getMeshByName("PERGOLAS_TIMBERS_FIX").setEnabled((scene.getMeshByName("PERGOLAS_TIMBERS_FIX").isEnabled() ? false : true));

            scene.getMeshByName("PERGOLAS_FRAME OPTION").setEnabled((scene.getMeshByName("PERGOLAS_FRAME OPTION").isEnabled() ? false : true));
            scene.getMeshByName("PERGOLAS_TIMBER_OPTION").setEnabled((scene.getMeshByName("PERGOLAS_TIMBER_OPTION").isEnabled() ? false : true));

        }

        //AFFICHER DIFFERENTE COULEURS
        function togglePaint(){

            if ($("#aluminium").is(":visible") || $("#pergolas").is(":visible") || $("#pool").is(":visible") || $("#pool_beach").is(":visible") || $("#opening").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#aluminium").hide();
                $("#pergolas").hide();
                $("#opening").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#Terracepergolas").hide();
                $("#decking").hide();
            }

            $("#paint").toggle();    
            $("#aluminium-button, #pergolas-button,  #pool-button, #beach-button, #Terracepergolas-button, #decking-button").removeClass("button-active"); 
            $("#paint-button").toggleClass("button-active", $("#paint").is(":visible"));         
        }

        function PaintWhite(){
            console.log(scene.getMeshByName("WALL_EXT_OPTION").material);
            scene.getMeshByName("WALL_EXT_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#ECECE4').toGammaSpace(); 
        }

        function Paint2(){
            console.log(scene.getMeshByName("WALL_EXT_OPTION").material);
            scene.getMeshByName("WALL_EXT_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#CCC6B8').toGammaSpace();

        }

        function Paint3(){
            console.log(scene.getMeshByName("WALL_EXT_OPTION").material);
            scene.getMeshByName("WALL_EXT_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#F8981D').toGammaSpace(); 

        }

        //ALUMINIUM
        function toggleAlminium(){
            if ($("#pergolas").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#paint").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#pergolas").hide();
                $("#paint").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#Terracepergolas").hide();
                $("#decking").hide();
            }
            $("#aluminium").toggle();    
            $("#paint-button, #pergolas-button, #pool-button, #beach-button, #Terracepergolas-button, #decking-button").removeClass("button-active"); 
            $("#aluminium-button").toggleClass("button-active", $("#aluminium").is(":visible"));     
        }

        function AluBlack(){
          
            const openingWindowFrame = scene.getMeshByName("OPENING_WINDOW_FRAME");

            // Vérifie si le mesh existe
            if (openingWindowFrame) {
                // Si le matériau est déjà partagé, crée une copie pour ce mesh seulement
                if (openingWindowFrame.material) {
                    openingWindowFrame.material = openingWindowFrame.material.clone("uniqueMaterialForOpeningWindowFrame");
                } else {
                    // Crée un matériau si aucun n'existe
                    openingWindowFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForOpeningWindowFrame", scene);
                }
        
                // Change la couleur uniquement pour ce matériau
                openingWindowFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#000000').toGammaSpace();
            } else {
                console.warn("Le mesh OPENING_WINDOW_FRAME n'a pas été trouvé.");
            }
        }

        function AluGrey(){
      
            const openingWindowFrame = scene.getMeshByName("OPENING_WINDOW_FRAME");

            // Vérifie si le mesh existe
            if (openingWindowFrame) {
                // Si le matériau est déjà partagé, crée une copie pour ce mesh seulement
                if (openingWindowFrame.material) {
                    openingWindowFrame.material = openingWindowFrame.material.clone("uniqueMaterialForOpeningWindowFrame");
                } else {
                    // Crée un matériau si aucun n'existe
                    openingWindowFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForOpeningWindowFrame", scene);
                }
        
                // Change la couleur uniquement pour ce matériau
                openingWindowFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#595959').toGammaSpace();
            } else {
                console.warn("Le mesh OPENING_WINDOW_FRAME n'a pas été trouvé.");
            }
        }


        //Scene pool
        function togglePool(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool_beach").hide();
                $("#opening").hide();
                $("#pergolas").hide();  
                $("#Terracepergolas").hide(); 
                $("#decking").hide();           
            }
            $("#pool").toggle();    
            $("#paint-button, #aluminium-button, #beach-button, #pergolas-button, #Terracepergolas-button, #decking-button").removeClass("button-active"); 
            $("#pool-button").toggleClass("button-active", $("#pool").is(":visible"));                   
        }

        function  whithoutPool() {
            scene.getMeshByName("POOL_CONCRETE_BASE").setEnabled((scene.getMeshByName("POOL_CONCRETE_BASE").isEnabled() ? false : true));
            scene.getMeshByName("POOL_KIOSK").setEnabled((scene.getMeshByName("POOL_KIOSK").isEnabled() ? false : true));
            scene.getMeshByName("POOL_PUMP_DECKING").setEnabled((scene.getMeshByName("POOL_PUMP_DECKING").isEnabled() ? false : true));
            scene.getMeshByName("POOL_TILES_OPTION").setEnabled((scene.getMeshByName("POOL_TILES_OPTION").isEnabled() ? false : true)); 
            scene.getMeshByName("POOL_WALL").setEnabled((scene.getMeshByName("POOL_WALL").isEnabled() ? false : true)); 
            scene.getMeshByName("Pool_wall").setEnabled((scene.getMeshByName("Pool_wall").isEnabled() ? false : true));
            scene.getMeshByName("POOL_SHADES_OPTION_primitive0").setEnabled((scene.getMeshByName("POOL_SHADES_OPTION_primitive0").isEnabled() ? false : true));
            scene.getMeshByName("POOL_SHADES_OPTION_primitive1").setEnabled((scene.getMeshByName("POOL_SHADES_OPTION_primitive1").isEnabled() ? false : true));
            scene.getMeshByName("POOL_WATER").setEnabled((scene.getMeshByName("POOL_WATER").isEnabled() ? false : true));
            scene.getMeshByName("POOL_WALL_OPTION_KIOSK").setEnabled((scene.getMeshByName("POOL_WALL_OPTION_KIOSK").isEnabled() ? false : true));
            scene.getMeshByName("PERGOLAS_FRAME OPTION").setEnabled((scene.getMeshByName("PERGOLAS_FRAME OPTION").isEnabled() ? false : true));
            scene.getMeshByName("PERGOLAS_TIMBER_OPTION").setEnabled((scene.getMeshByName("PERGOLAS_TIMBER_OPTION").isEnabled() ? false : true));
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

        //SCENE POOL BEACH
        function togglePoolBeach(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible") || $("#pergolas").is(":visible") || $("#opening").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#opening").hide();
                $("#pergolas").hide(); 
                $("#Terracepergolas").hide();   
                $("#decking").hide();          
            }
            $("#pool_beach").toggle();    
            $("#paint-button, #aluminium-button, #pool-button, #pergolas-button, #Terracepergolas-button, #decking-button").removeClass("button-active"); 
            $("#beach-button").toggleClass("button-active", $("#pool_beach").is(":visible"));  
        }

        function poolBeachCeramicLappato(){
            scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#A49B8D').toGammaSpace(); 
        }

        function poolBeachCrosscut(){
            scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#DCD8D4').toGammaSpace(); 
        }

        function poolBeachCeramicLight(){
            scene.getMeshByName("POOL_TILES_OPTION").material.albedoColor = new BABYLON.Color3.FromHexString('#F2F2F2').toGammaSpace(); 
        }


        //PERGOLAS
        function togglePergolas(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#opening").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#opening").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#Terracepergolas").hide();
                $("#decking").hide();
              
            }
            $("#pergolas").toggle();   
            $("#paint-button, #aluminium-button, #pool-button, #beach-button, #Terracepergolas-button, #decking-button").removeClass("button-active"); 
            $("#pergolas-button").toggleClass("button-active", $("#pergolas").is(":visible"));       
        }

        
        function PergolasTimberBalau(){

            const pergolasOption = scene.getMeshByName("PERGOLAS_TIMBER_OPTION");
            const openingWindowFrame = scene.getMeshByName("PERGOLAS_TIMBER_FIX");
            const entrangePergolasFrame = scene.getMeshByName("PERGOLAS_TIMBERS_FIX");
        
            // Vérifie si les deux meshes existent
            if (pergolasOption && openingWindowFrame && entrangePergolasFrame) {
                // Applique les modifications sur pergolasOption
                if (pergolasOption.material) {
                    pergolasOption.material = pergolasOption.material.clone("uniqueMaterialForPergolasOption");
                } else {
                    pergolasOption.material = new BABYLON.StandardMaterial("uniqueMaterialForPergolasOption", scene);
                }
                pergolasOption.material.albedoColor = new BABYLON.Color3.FromHexString('#4D2F1B').toGammaSpace();
        
                // Applique les modifications sur openingWindowFrame
                if (openingWindowFrame.material) {
                    openingWindowFrame.material = openingWindowFrame.material.clone("uniqueMaterialForOpeningWindowFrame");
                } else {
                    openingWindowFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForOpeningWindowFrame", scene);
                }
                openingWindowFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#4D2F1B').toGammaSpace();

                // Applique les modifications sur openingWindowFrame
                if (entrangePergolasFrame.material) {
                    entrangePergolasFrame.material = entrangePergolasFrame.material.clone("uniqueMaterialForentrangePergolasFrame");
                } else {
                    entrangePergolasFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForentrangePergolasFrame", scene);
                }
                entrangePergolasFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#4D2F1B').toGammaSpace();
            } 

        }

        function PergolasTimberBamboo(){             

            const pergolasOption = scene.getMeshByName("PERGOLAS_TIMBER_OPTION");
            const openingWindowFrame = scene.getMeshByName("PERGOLAS_TIMBER_FIX");
            const entrangePergolasFrame = scene.getMeshByName("PERGOLAS_TIMBERS_FIX");
        
            // Vérifie si les deux meshes existent
            if (pergolasOption && openingWindowFrame && entrangePergolasFrame) {

                // Applique les modifications sur pergolasOption
                if (pergolasOption.material) {
                    pergolasOption.material = pergolasOption.material.clone("uniqueMaterialForPergolasOption");
                } else {
                    pergolasOption.material = new BABYLON.StandardMaterial("uniqueMaterialForPergolasOption", scene);
                }
                pergolasOption.material.albedoColor = new BABYLON.Color3.FromHexString('#BA9A7E').toGammaSpace();
        
                // Applique les modifications sur openingWindowFrame
                if (openingWindowFrame.material) {
                    openingWindowFrame.material = openingWindowFrame.material.clone("uniqueMaterialForOpeningWindowFrame");
                } else {
                    openingWindowFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForOpeningWindowFrame", scene);
                }
                openingWindowFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#BA9A7E').toGammaSpace();

                // Applique les modifications sur openingWindowFrame
                if (entrangePergolasFrame.material) {
                    entrangePergolasFrame.material = entrangePergolasFrame.material.clone("uniqueMaterialForentrangePergolasFrame");
                } else {
                    entrangePergolasFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForentrangePergolasFrame", scene);
                }
                entrangePergolasFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#BA9A7E').toGammaSpace();
            } 
        }


        //OPENING
        function toggleOpenings(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();
                $("#Terracepergolas").hide();          
                $("#decking").hide();    
            }
            // $("#opening").toggle(); 

            $("#paint-button, #aluminium-button, #pergolas-button, #pool-button, #beach-button, #Terracepergolas-button, #decking-button").removeClass("button-active"); 
            $("#opening-button").toggleClass("button-active"); 
            
            scene.getMeshByName("MAIN_DOOR_TIMBER").setEnabled((scene.getMeshByName("MAIN_DOOR_TIMBER").isEnabled() ? false : true));
            scene.getMeshByName("MAIN_GATE_ALU_TIMBER").setEnabled((scene.getMeshByName("MAIN_GATE_ALU_TIMBER").isEnabled() ? false : true));
            scene.getMeshByName("MAIN_GATE_SIGNAGE").setEnabled((scene.getMeshByName("MAIN_GATE_SIGNAGE").isEnabled() ? false : true));
            scene.getMeshByName("OPENING_WINDOW_GLAZING").setEnabled((scene.getMeshByName("OPENING_WINDOW_GLAZING").isEnabled() ? false : true));
            scene.getMeshByName("OPNG_SERVICEDOOR_003").setEnabled((scene.getMeshByName("OPNG_SERVICEDOOR_003").isEnabled() ? false : true));
            scene.getMeshByName("OPNG_SERVICEDOOR_02").setEnabled((scene.getMeshByName("OPNG_SERVICEDOOR_02").isEnabled() ? false : true));
            // scene.getMeshByName("ROLLER_SHUTTER_OPTION").setEnabled((scene.getMeshByName("ROLLER_SHUTTER_OPTION").isEnabled() ? false : true));
            
        }

        //GARAGE
        function toggleGarage(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible") || $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();
                $("#Terracepergolas").hide(); 
                $("#decking").hide();             
            }
            $("#paint-button, #aluminium-button, #pergolas-button, #pool-button, #beach-button, #Terracepergolas-button, #decking-button").removeClass("button-active");
            $("#garage-button").toggleClass("button-active"); 

            scene.getMeshByName("ROLLER_SHUTTER_OPTION").setEnabled((scene.getMeshByName("ROLLER_SHUTTER_OPTION").isEnabled() ? false : true));
            scene.getMeshByName("WALL_EXT_GARAGE_OPTION").setEnabled((scene.getMeshByName("WALL_EXT_GARAGE_OPTION").isEnabled() ? false : true));
        }

        //STORAGE
        function toggleStorage(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")|| $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#Terracepergolas").is(":visible") || $("#decking").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();  
                $("#Terracepergolas").hide(); 
                $("#decking").hide();              
            }
            $("#paint-button, #aluminium-button, #pergolas-button, #pool-button, #beach-button, #Terracepergolas-button, #decking-button").removeClass("button-active");
            $("#storage-button").toggleClass("button-active"); 

            scene.getMeshByName("Storage_Door").setEnabled((scene.getMeshByName("Storage_Door").isEnabled() ? false : true));
        }

        //DECKING
        function toggleDecking(){
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")|| $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#Terracepergolas").is(":visible")) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();  
                $("#Terracepergolas").hide();               
            }
            $("#decking").toggle();   
            $("#paint-button, #aluminium-button, #pool-button, #beach-button, #pergolas-button,#Terracepergolas-button").removeClass("button-active"); 
            $("#decking-button").toggleClass("button-active", $("#decking").is(":visible"));  
        }

        function DeckingTimberBalau(){

            const decking = scene.getMeshByName("TIMBER_DECKING_OPTION");
           
        
            // Vérifie si les deux meshes existent
            if (decking) {
                // Applique les modifications sur decking
                if (decking.material) {
                    decking.material = decking.material.clone("uniqueMaterialFordecking");
                } else {
                    decking.material = new BABYLON.StandardMaterial("uniqueMaterialFordecking", scene);
                }
                decking.material.albedoColor = new BABYLON.Color3.FromHexString('#4D2F1B').toGammaSpace();

            } 

        }

        function DeckingTimberBamboo(){

            const decking = scene.getMeshByName("TIMBER_DECKING_OPTION");
           
        
            // Vérifie si les deux meshes existent
            if (decking) {
                // Applique les modifications sur decking
                if (decking.material) {
                    decking.material = decking.material.clone("uniqueMaterialFordecking");
                } else {
                    decking.material = new BABYLON.StandardMaterial("uniqueMaterialFordecking", scene);
                }
                decking.material.albedoColor = new BABYLON.Color3.FromHexString('#BA9A7E').toGammaSpace();

            } 

        }

        //Terrace Pergolas
        function toggleTerracePergolas() {
            if ($("#paint").is(":visible") || $("#aluminium").is(":visible")|| $("#pool").is(":visible")  || $("#pool_beach").is(":visible") || $("#pergolas").is(":visible") || $("#decking").is(":visible") ) {
                $("#paint").hide();
                $("#aluminium").hide();
                $("#pool").hide();
                $("#pool_beach").hide();
                $("#pergolas").hide();     
                $("#decking").hide();         
            }
            $("#Terracepergolas").toggle();   
            $("#paint-button, #aluminium-button, #pool-button, #beach-button, #pergolas-button, #decking-button").removeClass("button-active"); 
            $("#Terracepergolas-button").toggleClass("button-active", $("#Terracepergolas").is(":visible"));     
        }

        function PergolasFrameDark(){
           
            const pergolasOption = scene.getMeshByName("PERGOLAS_FRAME OPTION");
            const openingWindowFrame = scene.getMeshByName("PERGOLAS_FRAME_FIX");
            const entrangePergolasFrame = scene.getMeshByName("ENTRANCE_PERGOLAS_FRAME");
        
            // Vérifie si les deux meshes existent
            if (pergolasOption && openingWindowFrame && entrangePergolasFrame) {
                // Applique les modifications sur pergolasOption
                if (pergolasOption.material) {
                    pergolasOption.material = pergolasOption.material.clone("uniqueMaterialForPergolasOption");
                } else {
                    pergolasOption.material = new BABYLON.StandardMaterial("uniqueMaterialForPergolasOption", scene);
                }
                pergolasOption.material.albedoColor = new BABYLON.Color3.FromHexString('#000000').toGammaSpace();
        
                // Applique les modifications sur openingWindowFrame
                if (openingWindowFrame.material) {
                    openingWindowFrame.material = openingWindowFrame.material.clone("uniqueMaterialForOpeningWindowFrame");
                } else {
                    openingWindowFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForOpeningWindowFrame", scene);
                }
                openingWindowFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#000000').toGammaSpace();

                // Applique les modifications sur openingWindowFrame
                if (entrangePergolasFrame.material) {
                    entrangePergolasFrame.material = entrangePergolasFrame.material.clone("uniqueMaterialForentrangePergolasFrame");
                } else {
                    entrangePergolasFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForentrangePergolasFrame", scene);
                }
                entrangePergolasFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#000000').toGammaSpace();
            } 

        }

        function PergolasFrameGrey(){
           
            const pergolasOption = scene.getMeshByName("PERGOLAS_FRAME OPTION");
            const openingWindowFrame = scene.getMeshByName("PERGOLAS_FRAME_FIX");
            const entrangePergolasFrame = scene.getMeshByName("ENTRANCE_PERGOLAS_FRAME");
        
            // Vérifie si les deux meshes existent
            if (pergolasOption && openingWindowFrame && entrangePergolasFrame) {
                // Applique les modifications sur pergolasOption
                if (pergolasOption.material) {
                    pergolasOption.material = pergolasOption.material.clone("uniqueMaterialForPergolasOption");
                } else {
                    pergolasOption.material = new BABYLON.StandardMaterial("uniqueMaterialForPergolasOption", scene);
                }
                pergolasOption.material.albedoColor = new BABYLON.Color3.FromHexString('#595959').toGammaSpace();
        
                // Applique les modifications sur openingWindowFrame
                if (openingWindowFrame.material) {
                    openingWindowFrame.material = openingWindowFrame.material.clone("uniqueMaterialForOpeningWindowFrame");
                } else {
                    openingWindowFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForOpeningWindowFrame", scene);
                }
                openingWindowFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#595959').toGammaSpace();

                // Applique les modifications sur openingWindowFrame
                if (entrangePergolasFrame.material) {
                    entrangePergolasFrame.material = entrangePergolasFrame.material.clone("uniqueMaterialForentrangePergolasFrame");
                } else {
                    entrangePergolasFrame.material = new BABYLON.StandardMaterial("uniqueMaterialForentrangePergolasFrame", scene);
                }
                entrangePergolasFrame.material.albedoColor = new BABYLON.Color3.FromHexString('#595959').toGammaSpace();
            } 

        }



     