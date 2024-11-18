// AFFICHE LIVING ROOM
function toggleLiving() {

    //MASQUE SOUS OPTION BEDROOM
    if ($("#flooring-bedroom").is(":visible") || $("#walling-bedroom").is(":visible") || $("#wood_texture-bedroom").is(":visible") ) {
        $("#flooring-bedroom").hide();
        $("#walling-bedroom").hide();
        $("#wood_texture-bedroom").hide();        
    }
    $("#flooring-bedroom-button, #walling-bedroom-button, #wood-bedroom-button, #furniture-bedroom-button").removeClass("button-active");

    //MASQUE SOUS OPTION BATHROOM
    if ($("#flooring-bathroom").is(":visible") || $("#walling-bathroom").is(":visible") ) {
        $("#flooring-bathroom").hide();
        $("#walling-bathroom").hide();

    }
    $("#flooring-bathroom-button, #wall-bathroom-button").removeClass("button-active");   

    //MASQUE SOUS OPTION KITCHEN
    if ($("#flooring-kitchen").is(":visible") || $("#walling-kitchen").is(":visible") || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
        $("#flooring-kitchen").hide();
        $("#walling-kitchen").hide();
        $("#door-kitchen").hide();
        $("#door_handle-kitchen").hide();        
    }
    $("#flooring-kitchen-button, #walling-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");

       //MASQUE SOUS OPTION GUEST
       if ($("#flooring-guest").is(":visible") || $("#walling-guest").is(":visible") || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
        $("#flooring-guest").hide();
        $("#walling-guest").hide();
        $("#door-guest").hide();
        $("#door_handle-guest").hide();        
    }
    $("#flooring-guest-button, #walling-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");
    
    hideAllBases();

    hideAllOption();

    $("#scene_master_bedroom").hide();
    $("#scene_kitchen").hide();
    $("#scene_master_bathroom").hide(); 
    $("#scene_guest").hide();

    document.getElementById("base-00").style.display = "block";
    document.getElementById("living-options").style.display = "block";
    $("#kitchen, #bedroom, #bathroom, #guest").removeClass("button-active");
    $("#living").toggleClass("button-active");
    
}
//FLOORING
function toggleFlooring(){
    if ($("#walling").is(":visible") || $("#wood_texture").is(":visible" ) || $("#door").is(":visible") || $("#door_handle").is(":visible")) {
        $("#walling").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();
    }

    $("#walling-button, #wood-button, #door-button, #handle-button").removeClass("button-active");

    $("#flooring").toggle();

    $("#flooring-button").toggleClass("button-active", $("#flooring").is(":visible"));
}


function setFloorCerdark(){
    $(".floor").hide();
    $("#FLOOR-CERDARK").show();
}
function setFloorCerlight(){
    $(".floor").hide();
    $("#FLOOR-CERLIGHT").show();
}
function setFloorTimberdark(){
    $(".floor").hide();
    $("#FLOOR-TIMBERDARK").show();
}
function setFloorTimberlight(){
    $(".floor").hide();
    $("#FLOOR-TIMBERLIGHT").show();
}

//WALL
function toggleWall(){
    if ($("#flooring").is(":visible") || $("#wood_texture").is(":visible" ) || $("#door").is(":visible") || $("#door_handle").is(":visible")) {
        $("#flooring").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();
    }
    $("#flooring-button, #wood-button, #door-button, #handle-button").removeClass("button-active");
    $("#walling").toggle();
    $("#walling-button").toggleClass("button-active", $("#walling").is(":visible"));
}

function setWalldark(){
    $(".wall").hide();
    $("#WF-DARK").show();
}
function setWalllight(){
    $(".wall").hide();
    $("#WF-LIGHT").show();
}
function setWallcerdark(){
    $(".wall").hide();
    $("#WF-CERDARK").show();
}

function setWallcerlight(){
    $(".wall").hide();
    $("#WF-CERLIGHT").show();
}

//FURNITURE
function toggleFurniture(){
    if ($("#walling").is(":visible") || $("#flooring").is(":visible") || $("#door").is(":visible") || $("#door_handle").is(":visible") || $("#wood_texture").is(":visible" ) ) {
        $("#walling").hide();
        $("#flooring").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();      
    }
    $("#flooring-button, #walling-button, #door-button, #handle-button, #wood-button").removeClass("button-active");
    $("#FURNITURE").toggle();
    $("#furniture-button").toggleClass("button-active", $("#FURNITURE").is(":visible"));
}

//LIGHT
function toggleLight(){
    if ($("#walling").is(":visible") || $("#flooring").is(":visible") || $("#door").is(":visible") || $("#door_handle").is(":visible") || $("#wood_texture").is(":visible" ) ) {
        $("#walling").hide();
        $("#flooring").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();      
    }
    $("#flooring-button, #walling-button, #door-button, #handle-button, #wood-button").removeClass("button-active");
    $("#LIGHT").toggle();
    $("#light-button").toggleClass("button-active", $("#LIGHT").is(":visible"));
}

//WOOD TEXTURE
function toggleWood(){
    if ($("#walling").is(":visible") || $("#flooring").is(":visible") || $("#door").is(":visible") || $("#door_handle").is(":visible") ) {
        $("#walling").hide();
        $("#flooring").hide();
        $("#door").hide();
        $("#door_handle").hide();
        
    }
    $("#flooring-button, #walling-button, #door-button, #handle-button").removeClass("button-active");
    $("#wood_texture").toggle();
    $("#wood-button").toggleClass("button-active", $("#wood_texture").is(":visible"));
}

function setWoodlight(){
    $(".wood").hide();
    $("#WT_DARK").show();
}

function setWoodlight(){
    $(".wood").hide();
    $("#WT_LIGHT").show();
}

//DOOR
function toggleDoor(){
    if ($("#walling").is(":visible") || $("#flooring").is(":visible") || $("#wood_texture").is(":visible") || $("#door_handle").is(":visible") ) {
        $("#walling").hide();
        $("#flooring").hide();
        $("#wood_texture").hide();
        $("#door_handle").hide();
    }
    $("#flooring-button, #wood-button, #wall-button, #handle-button").removeClass("button-active");
    $("#door").toggle();
    $("#door-button").toggleClass("button-active", $("#door").is(":visible"));
}

function setDoorlight(){
    $(".door").hide();
    $("#DOOR_LIGHT").show();
}

function setDoordark(){
    $(".door").hide();
    $("#DOOR_DARK").show();
}

//DOOR HANDLE
function toggleDoorhandle(){
    if ($("#walling").is(":visible") || $("#flooring").is(":visible") || $("#wood_texture").is(":visible") || $("#door").is(":visible") ) {
        $("#walling").hide();
        $("#flooring").hide();
        $("#wood_texture").hide();
        $("#door").hide();
    }
    $("#flooring-button, #wood-button, #door-button, #wall-button").removeClass("button-active");
    $("#door_handle").toggle();
    $("#handle-button").toggleClass("button-active", $("#door_handle").is(":visible"));
}

function setDoorhandledark(){
    $(".door_handle").hide();
    $("#DH_DARK").show();
}

function setDoorhandlegold(){
    $(".door_handle").hide();
    $("#DH_GOLG").show();
}

function setDoorhandlesilver(){
    $(".door_handle").hide();
    $("#DH_SILVER").show();
}

//KITCHEN
function toggleKitchen(){
     //MASQUE SOUS OPTION LIVING
     if ($("#flooring").is(":visible") || $("#walling").is(":visible") || $("#wood_texture").is(":visible" ) || $("#door").is(":visible") || $("#door_handle").is(":visible")) {
        $("#flooring").hide();
        $("#walling").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();
    }
    $("#flooring-button, #walling-button, #wood-button, #door-button, #handle-button").removeClass("button-active");

    //MASQUE SOUS OPTION BEDROOM
    if ($("#flooring-bedroom").is(":visible") || $("#walling-bedroom").is(":visible") || $("#wood_texture-bedroom").is(":visible") ) {
        $("#flooring-bedroom").hide();
        $("#walling-bedroom").hide();
        $("#wood_texture-bedroom").hide();

    }
    $("#flooring-bedroom-button, #walling-bedroom-button, #wood-bedroom-button, #furniture-bedroom-button").removeClass("button-active");

     //MASQUE SOUS OPTION BATHROOM
    if ($("#flooring-bathroom").is(":visible") || $("#walling-bathroom").is(":visible") ) {
        $("#flooring-bathroom").hide();
        $("#walling-bathroom").hide();

    }
    $("#flooring-bathroom-button, #wall-bathroom-button").removeClass("button-active");

        //MASQUE SOUS OPTION GUEST
        if ($("#flooring-guest").is(":visible") || $("#walling-guest").is(":visible") || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
            $("#flooring-guest").hide();
            $("#walling-guest").hide();
            $("#door-guest").hide();
            $("#door_handle-guest").hide();        
        }
        $("#flooring-guest-button, #walling-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");
    
    hideAllBases();

    hideAllOption();

    $("#scene_master_bedroom").hide();
    $("#scene_master_bathroom").hide(); 
    $("#scene_kitchen").show();
    $("#scene_guest").hide();


    document.getElementById("base-kitchen").style.display = "block";
    document.getElementById("kitchen-options").style.display = "block";
    $("#bedroom, #living, #bathroom, #guest").removeClass("button-active");
    $("#kitchen").toggleClass("button-active");
}

//FLOORING KITCHEN
function toggleFlooringKitchen(){
    
    if ($("#walling-kitchen").is(":visible")  || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
        $("#walling-kitchen").hide();
        $("#wood_texture-kitchen").hide();
        $("#door-kitchen").hide();
        $("#door_handle-kitchen").hide();
    }

    $("#walling-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");

    $("#flooring-kitchen").toggle();

    $("#flooring-kitchen-button").toggleClass("button-active", $("#flooring-kitchen").is(":visible"));
}

function setFloorTimberdarkKitchen(){
    $(".floor-kitchen").hide();
    $("#FLOOR-TIMBERDARK-KITCHEN").show();
}

function setFloorTimberlightKitchen(){
    $(".floor-kitchen").hide();
    $("#FLOOR-TIMBERLIGHT-KITCHEN").show();
}

function setFloorCerlightKitchen(){
    $(".floor-kitchen").hide();
    $("#FLOOR-CERLIGHT-KITCHEN").show();
}

function setFloorCerdarkKitchen(){
    $(".floor-kitchen").hide();
    $("#FLOOR-CERDARK-KITCHEN").show();
}

// WALL KITCHEN
function toggleWallKitchen(){

    if ($("#flooring-kitchen").is(":visible")  || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
        $("#flooring-kitchen").hide();
        $("#wood_texture-kitchen").hide();
        $("#door-kitchen").hide();
        $("#door_handle-kitchen").hide();
    }

    $("#flooring-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");

    $("#walling-kitchen").toggle();

    $("#walling-kitchen-button").toggleClass("button-active", $("#walling-kitchen").is(":visible"));
    }

    function setWalllightKitchen(){
        $(".wall-kitchen").hide();
        $("#WF-LIGHT-KITCHEN").show();
    }

    function setWallcerlightKitchen(){
        $(".wall-kitchen").hide();
        $("#WF-CERLIGHT-KITCHEN").show();
    }

    function setWallcerdarkKitchen(){
        $(".wall-kitchen").hide();
        $("#WF-CERDARK-KITCHEN").show();
    }

    function setWalldarkkitchen(){
        $(".wall-kitchen").hide();
        $("#WF-DARK-KITCHEN").show();
    }

    //FURNITURE KITCHEN
    function toggleFurnitureKitchen() {
        if ($("#walling-kitchen").is(":visible") || $("#flooring-kitchen").is(":visible") || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
            $("#walling-kitchen").hide();
            $("#flooring-kitchen").hide();
            $("#door-kitchen").hide();
            $("#door_handle-kitchen").hide();
        }
    
        $("#flooring-kitchen-button, #walling-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");
    
     
        $("#FURNITURE-KITCHEN").toggle();
        $("#furniture-kitchen-button").toggleClass("button-active", $("#FURNITURE-KITCHEN").is(":visible"));
    }

      //LIGHT KITCHEN
      function toggleLightKitchen() {
        if ($("#walling-kitchen").is(":visible") || $("#flooring-kitchen").is(":visible") || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
            $("#walling-kitchen").hide();
            $("#flooring-kitchen").hide();
            $("#door-kitchen").hide();
            $("#door_handle-kitchen").hide();
        }
    
        $("#flooring-kitchen-button, #walling-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");
    
     
        $("#LIGHT-KITCHEN").toggle();
        $("#light-kitchen-button").toggleClass("button-active", $("#LIGHT-KITCHEN").is(":visible"));
    }

     //DOOR KITCHEN
     function toggleDoorKitchen() {
        if ($("#walling-kitchen").is(":visible") || $("#flooring-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
            $("#walling-kitchen").hide();
            $("#flooring-kitchen").hide();
            $("#door_handle-kitchen").hide();
        }
    
        $("#flooring-kitchen-button, #walling-kitchen-button,#handle-kitchen-button").removeClass("button-active");
    
     
        $("#door-kitchen").toggle();
        $("#door-kitchen-button").toggleClass("button-active", $("#door-kitchen").is(":visible"));
    }

    function setDoorlightKitchen(){
        $(".door-kitchen").hide();
        $("#DOOR_LIGHT-KITCHEN").show();
    }

    function setDoordarkKitchen(){
        $(".door-kitchen").hide();
        $("#DOOR_DARK-KITCHEN").show();
    }

    //DOOR HANDLE KITCHEN
    function toggleDoorhandleKitchen() {
        if ($("#walling-kitchen").is(":visible") || $("#flooring-kitchen").is(":visible") || $("#door-kitchen").is(":visible")) {
            $("#walling-kitchen").hide();
            $("#flooring-kitchen").hide();
            $("#door-kitchen").hide();
        }
    
        $("#flooring-kitchen-button, #walling-kitchen-button,#door-kitchen-button").removeClass("button-active");
    
     
        $("#door_handle-kitchen").toggle();
        $("#handle-kitchen-button").toggleClass("button-active", $("#door_handle-kitchen").is(":visible"));
    }

    function setDoorhandledarkKitchen(){
        $(".door_handle-kitchen").hide();
        $("#DH_DARK-KITCHEN").show();
    }

    function setDoorhandlegoldKitchen(){
        $(".door_handle-kitchen").hide();
        $("#DH_GOLG-KITCHEN").show();
    }

    function setDoorhandlesilverKitchen(){
        $(".door_handle-kitchen").hide();
        $("#DH_SILVER-KITCHEN").show();
    }

//MASTER BATHROOM
function toggleMasterbathroom() {

    //MASQUE SOUS OPTION LIVING
    if ($("#flooring").is(":visible") || $("#walling").is(":visible") || $("#wood_texture").is(":visible" ) || $("#door").is(":visible") || $("#door_handle").is(":visible")) {
        $("#flooring").hide();
        $("#walling").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();
    }
    $("#flooring-button, #walling-button, #wood-button, #door-button, #handle-button").removeClass("button-active");

    //MASQUE SOUS OPTION BEDROOM
    if ($("#flooring-bedroom").is(":visible") || $("#walling-bedroom").is(":visible") || $("#wood_texture-bedroom").is(":visible") ) {
        $("#flooring-bedroom").hide();
        $("#walling-bedroom").hide();
        $("#wood_texture-bedroom").hide();

    }
    $("#flooring-bedroom-button, #walling-bedroom-button, #wood-bedroom-button, #furniture-bedroom-button").removeClass("button-active");

    //MASQUE SOUS OPTION KITCHEN
    if ($("#flooring-kitchen").is(":visible") || $("#walling-kitchen").is(":visible") || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
        $("#flooring-kitchen").hide();
        $("#walling-kitchen").hide();
        $("#door-kitchen").hide();
        $("#door_handle-kitchen").hide();        
    }
    $("#flooring-kitchen-button, #walling-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");

        //MASQUE SOUS OPTION GUEST
        if ($("#flooring-guest").is(":visible") || $("#walling-guest").is(":visible") || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
            $("#flooring-guest").hide();
            $("#walling-guest").hide();
            $("#door-guest").hide();
            $("#door_handle-guest").hide();        
        }
        $("#flooring-guest-button, #walling-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");
    
    hideAllBases();

    hideAllOption();

    $("#scene_master_bedroom").hide();
    $("#scene_guest").hide();
    $("#scene_master_bathroom").show(); 

    document.getElementById("base-bathroom").style.display = "block";
    document.getElementById("bathroom-options").style.display = "block";
    $("#bedroom, #living, #kitchen, #guest").removeClass("button-active");
    $("#bathroom").toggleClass("button-active");
    
}

function toggleFlooringBathroom() {
    if ($("#walling-bathroom").is(":visible")) {
        $("#walling-bathroom").hide();
    }
    $("#wall-bathroom-button").removeClass("button-active");
    $("#flooring-bathroom").toggle();    
    $("#flooring-bathroom-button").toggleClass("button-active", $("#flooring-bathroom").is(":visible"));
}

function setFloorTimberdarkbathroom(){
    $(".floor-bathroom").hide();
    $("#FLOOR-TIMBERDARK-BATHROOM").show();
}

function setFloorTimberlightbathroom(){
    $(".floor-bathroom").hide();
    $("#FLOOR-TIMBERLIGHT-BATHROOM").show();
}

function toggleWallBathroom() {
    if ($("#flooring-bathroom").is(":visible")) {
        $("#flooring-bathroom").hide();
    }
    $("#flooring-bathroom-button").removeClass("button-active");
    $("#walling-bathroom").toggle();    
    $("#wall-bathroom-button").toggleClass("button-active", $("#walling-bathroom").is(":visible"));
}

function setWalllightbathroom(){
    $(".wall-bathroom").hide();
    $("#WF-LIGHT-BATHROOM").show();
}

function setWallcerlightbathroom(){
    $(".wall-bathroom").hide();
    $("#WF-CERLIGHT-BATHROOM").show();
}

function setWallcerdarkbathroom(){
    $(".wall-bathroom").hide();
    $("#WF-CERDARK-BATHROOM").show();
}

function setWalldarkbathroom(){
    $(".wall-bathroom").hide();
    $("#WF-DARK-BATHROOM").show();
}


//MASTER BETHROOM
function toggleMasterBedroom() {

    if ($("#flooring").is(":visible") || $("#walling").is(":visible") || $("#wood_texture").is(":visible" ) || $("#door").is(":visible") || $("#door_handle").is(":visible")) {
        $("#flooring").hide();
        $("#walling").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();
    }
    $("#flooring-button, #walling-button, #wood-button, #door-button, #handle-button").removeClass("button-active");

    if ($("#flooring-bathroom").is(":visible") || $("#walling-bathroom").is(":visible") ) {
        $("#flooring-bathroom").hide();
        $("#walling-bathroom").hide();

    }
    $("#flooring-bathroom-button, #wall-bathroom-button").removeClass("button-active");

    
    //MASQUE SOUS OPTION KITCHEN
    if ($("#flooring-kitchen").is(":visible") || $("#walling-kitchen").is(":visible") || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
        $("#flooring-kitchen").hide();
        $("#walling-kitchen").hide();
        $("#door-kitchen").hide();
        $("#door_handle-kitchen").hide();        
    }
    $("#flooring-kitchen-button, #walling-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");

        //MASQUE SOUS OPTION GUEST
        if ($("#flooring-guest").is(":visible") || $("#walling-guest").is(":visible") || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
            $("#flooring-guest").hide();
            $("#walling-guest").hide();
            $("#door-guest").hide();
            $("#door_handle-guest").hide();        
        }
        $("#flooring-guest-button, #walling-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");

    $("#scene_master_bedroom").show();
    $("#scene_guest").hide();
          
    hideAllBases();
    hideAllOption();
   
    document.getElementById("base-bedroom").style.display = "block";
    document.getElementById("bedroom-options").style.display = "block";
    $("#bathroom, #living, #kitchen, #guest").removeClass("button-active");
    $("#bedroom").toggleClass("button-active");
}

function toggleFlooringBedroom(){
    if ($("#walling-bedroom").is(":visible") || $("#wood_texture-bedroom").is(":visible")) {
        $("#walling-bedroom, #wood_texture-bedroom").hide();
    }
    $("#walling-bedroom-button, #wood-bedroom-button").removeClass("button-active");
    $("#flooring-bedroom").toggle(); 
    $("#flooring-bedroom-button").toggleClass("button-active", $("#flooring-bedroom").is(":visible"));
}

function setFloorTimberdarkbedroom(){
    $(".floor-bedroom").hide();
    $("#FLOOR-TIMBERDARK-BEDROOM").show();
}

function setFloorTimberlightbedroom(){
    $(".floor-bedroom").hide();
    $("#FLOOR-TIMBERLIGHT-BEDROOM").show();
}

function setFloorCerlightbedroom(){
    $(".floor-bedroom").hide();
    $("#FLOOR-CERLIGHT-BEDROOM").show();
}

function setFloorCerdarkbedroom(){
    $(".floor-bedroom").hide();
    $("#FLOOR-CERDARK-BEDROOM").show();
}

function toggleWallBedroom() {
    if ($("#flooring-bedroom").is(":visible") || $("#wood_texture-bedroom").is(":visible")) {
        $("#flooring-bedroom, #wood_texture-bedroom").hide();
    }
    $("#flooring-bedroom-button, #wood-bedroom-button").removeClass("button-active");
    $("#walling-bedroom").toggle(); 
    $("#walling-bedroom-button").toggleClass("button-active", $("#walling-bedroom").is(":visible"));
}

function setWalllightbedroom(){
    $(".wall-bedroom").hide();
    $("#WF-LIGHT-BEDROOM").show();
}

function setWallcerlightbedroom(){
    $(".wall-bedroom").hide();
    $("#WF-CERLIGHT-BEDROOM").show();
}

function setWallcerdarkbedroom(){
    $(".wall-bedroom").hide();
    $("#WF-CERDARK-BEDROOM").show();
}

function setWalldarkbedroom(){
    $(".wall-bedroom").hide();
    $("#WF-DARK-BEDROOM").show();
}

function toggleWoodBedroom() {
    if ($("#walling-bedroom").is(":visible") || $("#flooring-bedroom").is(":visible")) {
        $("#walling-bedroom, #flooring-bedroom" ).hide();
    }
    $("#walling-bedroom-button, #flooring-bedroom-button ").removeClass("button-active");
    $("#wood_texture-bedroom").toggle(); 
    $("#wood-bedroom-button").toggleClass("button-active", $("#wood_texture-bedroom").is(":visible"));
}

function setWoodlightbedroom(){
    $(".wood-bedroom").hide();
    $("#WT_LIGHT-BEDROOM").show();
}

function setWooddarkbedroom(){
    $(".wood-bedroom").hide();
    $("#WT_DARK-BEDROOM").show();
}

function toggleFurnitureBedroom() {
    if ($("#walling-bedroom").is(":visible") || $("#flooring-bedroom").is(":visible") || $("#wood_texture-bedroom").is(":visible")) {
        $("#walling-bedroom, #flooring-bedroom,  #wood_texture-bedroom" ).hide();
    }

    $("#walling-bedroom-button, #flooring-bedroom-button,#wood-bedroom-button ").removeClass("button-active");
    $("#FURNITURE-BEDROOM").toggle();
    $("#furniture-bedroom-button").toggleClass("button-active", $("#FURNITURE-BEDROOM").is(":visible"));
}

//GUEST BEDROOM
function toggleGuestBedroom(){
      //MASQUE SOUS OPTION LIVING
      if ($("#flooring").is(":visible") || $("#walling").is(":visible") || $("#wood_texture").is(":visible" ) || $("#door").is(":visible") || $("#door_handle").is(":visible")) {
        $("#flooring").hide();
        $("#walling").hide();
        $("#wood_texture").hide();
        $("#door").hide();
        $("#door_handle").hide();
    }
    $("#flooring-button, #walling-button, #wood-button, #door-button, #handle-button").removeClass("button-active");

    //MASQUE SOUS OPTION BEDROOM
    if ($("#flooring-bedroom").is(":visible") || $("#walling-bedroom").is(":visible") || $("#wood_texture-bedroom").is(":visible") ) {
        $("#flooring-bedroom").hide();
        $("#walling-bedroom").hide();
        $("#wood_texture-bedroom").hide();        
    }
    $("#flooring-bedroom-button, #walling-bedroom-button, #wood-bedroom-button, #furniture-bedroom-button").removeClass("button-active");

    //MASQUE SOUS OPTION BATHROOM
    if ($("#flooring-bathroom").is(":visible") || $("#walling-bathroom").is(":visible") ) {
        $("#flooring-bathroom").hide();
        $("#walling-bathroom").hide();

    }
    $("#flooring-bathroom-button, #wall-bathroom-button").removeClass("button-active");   

    //MASQUE SOUS OPTION KITCHEN
    if ($("#flooring-kitchen").is(":visible") || $("#walling-kitchen").is(":visible") || $("#door-kitchen").is(":visible") || $("#door_handle-kitchen").is(":visible")) {
        $("#flooring-kitchen").hide();
        $("#walling-kitchen").hide();
        $("#door-kitchen").hide();
        $("#door_handle-kitchen").hide();        
    }
    $("#flooring-kitchen-button, #walling-kitchen-button, #door-kitchen-button, #handle-kitchen-button").removeClass("button-active");

    hideAllBases();

    hideAllOption();

    $("#scene_master_bedroom").hide();
    $("#scene_master_bathroom").hide(); 
    $("#scene_kitchen").hide();
    $("#scene_guest").show();

    document.getElementById("base-guest").style.display = "block";
    document.getElementById("guest-options").style.display = "block";
    $("#bedroom, #living, #bathroom, #kitchen").removeClass("button-active");
    $("#guest").toggleClass("button-active");
}

//FLOORING GUEST
function toggleFlooringGuest(){
    if ($("#walling-guest").is(":visible")  || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
        $("#walling-guest").hide();      
        $("#door-guest").hide();
        $("#door_handle-guest").hide();
    }

    $("#walling-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");

    $("#flooring-guest").toggle();

    $("#flooring-guest-button").toggleClass("button-active", $("#flooring-guest").is(":visible"));
}

function setFloorTimberdarkGuest(){
    $(".floor-guest").hide();
    $("#FLOOR-TIMBERDARK-GUEST").show();
}

function setFloorTimberlightGuest(){
    $(".floor-guest").hide();
    $("#FLOOR-TIMBERLIGHT-GUEST").show();
}

function setFloorCerlightGuest(){
    $(".floor-guest").hide();
    $("#FLOOR-CERLIGHT-GUEST").show();
}

function setFloorCerdarkGuest(){
    $(".floor-guest").hide();
    $("#FLOOR-CERDARK-GUEST").show();
}


//WALL GUEST
function toggleWallGuest(){
    if ($("#flooring-guest").is(":visible")  || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
        $("#flooring-guest").hide();      
        $("#door-guest").hide();
        $("#door_handle-guest").hide();
    }

    $("#flooring-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");

    $("#walling-guest").toggle();

    $("#walling-guest-button").toggleClass("button-active", $("#walling-guest").is(":visible"));
}

function setWalllightGuest(){
    $(".wall-guest").hide();
    $("#WF-LIGHT-GUEST").show();
}

function setWallcerlightGuest(){
    $(".wall-guest").hide();
    $("#WF-CERLIGHT-GUEST").show();
}

function setWallcerdarkGuest(){
    $(".wall-guest").hide();
    $("#WF-CERDARK-GUEST").show();
}

function setWalldarkGuest(){
    $(".wall-guest").hide();
    $("#WF-DARK-GUEST").show();
}

//FURNITURE GUEST
function toggleFurnitureGuest(){
    if ($("#walling-guest").is(":visible") || $("#flooring-guest").is(":visible") || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
        $("#walling-guest").hide();
        $("#flooring-guest").hide();
        $("#door-guest").hide();
        $("#door_handle-guest").hide();
    }

    $("#flooring-guest-button, #walling-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");

 
    $("#FURNITURE-GUEST").toggle();
    $("#furniture-guest-button").toggleClass("button-active", $("#FURNITURE-GUEST").is(":visible"));
}

//LIGHT GUEST
function toggleLightGuest(){
    if ($("#walling-guest").is(":visible") || $("#flooring-guest").is(":visible") || $("#door-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
        $("#walling-guest").hide();
        $("#flooring-guest").hide();
        $("#door-guest").hide();
        $("#door_handle-guest").hide();
    }

    $("#flooring-guest-button, #walling-guest-button, #door-guest-button, #handle-guest-button").removeClass("button-active");

 
    $("#LIGHT-GUEST").toggle();
    $("#light-guest-button").toggleClass("button-active", $("#LIGHT-GUEST").is(":visible"));
}


//DOOR GUEST
function toggleDoorGuest(){
    if ($("#walling-guest").is(":visible")  || $("#flooring-guest").is(":visible") || $("#door_handle-guest").is(":visible")) {
        $("#walling-guest").hide();      
        $("#flooring-guest").hide();
        $("#door_handle-guest").hide();
    }

    $("#walling-guest-button, #flooring-guest-button, #handle-guest-button").removeClass("button-active");

    $("#door-guest").toggle();

    $("#door-guest-button").toggleClass("button-active", $("#door-guest").is(":visible"));
}

function setDoorlightGuest(){
    $(".door-guest").hide();
    $("#DOOR_LIGHT-GUEST").show();
}

function setDoordarkGuest(){
    $(".door-guest").hide();
    $("#DOOR_DARK-GUEST").show();
}

//DOOR HANDLE GUEST
function toggleDoorhandleGuest(){
    console.log('ljshdkfj');
    if ($("#walling-guest").is(":visible")  || $("#flooring-guest").is(":visible") || $("#door-guest").is(":visible")) {
        $("#walling-guest").hide();      
        $("#flooring-guest").hide();
        $("#door-guest").hide();
    }

    $("#walling-guest-button, #flooring-guest-button, #door-guest-button").removeClass("button-active");

    $("#door_handle-guest").toggle();

    $("#handle-guest-button").toggleClass("button-active", $("#door_handle-guest").is(":visible"));
}

function setDoorhandledarkGuest(){
    $(".door_handle-guest").hide();
    $("#DH_DARK-GUEST").show();
}

function setDoorhandlegoldGuest(){
    $(".door_handle-guest").hide();
    $("#DH_GOLG-GUEST").show();
}

function setDoorhandlesilverGuest(){
    $(".door_handle-guest").hide();
    $("#DH_SILVER-GUEST").show();
}


// Fonction pour masquer tous les fonds
function hideAllBases() {
    
    document.getElementById("base-00").style.display = "none";
    document.getElementById("base-kitchen").style.display = "none";
    document.getElementById("base-bathroom").style.display = "none";
    document.getElementById("base-bedroom").style.display = "none";
    document.getElementById("base-guest").style.display = "none";

}

//function pour masque tous les options
function hideAllOption() {

    document.getElementById("living-options").style.display = "none";
    document.getElementById("kitchen-options").style.display = "none";
    document.getElementById("bathroom-options").style.display = "none";
    document.getElementById("bedroom-options").style.display = "none";
    document.getElementById("guest-options").style.display = "none";

}

//Function pour masque touos les sous options
function hideAllSousOptions() {

    // Masquer sous option living 
    var sousOptionLiving = document.getElementById("sous-options");
    if (sousOptionLiving) {
       sousOptionLiving.style.display = "none";
    }

    // Masquer sous option bathroom
    var sousOptionBathroom = document.getElementById("sous-options-bathroom");
    if (sousOptionBathroom) {
        sousOptionBathroom.style.display = "none";
    }
}


