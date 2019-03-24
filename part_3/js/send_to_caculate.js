/*
*  Purpose: this js script is used to launch ajax to pass the modified data to the server
*  Authors: Hui, Debora, Jihye, Xiong, Jane
*  Date: March 21, 2019
*
* */

$(document).ready(function(){
    $("#formSelPathAndCurv").submit(function(e){
        $.post("../includes/path_loss_cal.php",$(this).serialize(),onPathLossCal);
        e.preventDefault();
    })
})

const onPathLossCal = function(response){
    console.log(response.midpoints);

    var pd = response.pathData;
    // First table
    var table = "<h4>Path_General</h4><table class='table table-striped table-hover'><tr><th>Path Name</th><th>Path length</th><th>Description</th><th>Note</th></tr>";

    table+="<tr><td>"+pd.name + "</td><td>" + pd.length + "</td><td>" + pd.description + "</td><td>" + pd.note +"</td></tr>";
    table+="</table><br><br>";

    //Second Table
    var td = response.endpoints;
    table += "<h4>Path_EndPoints</h4><table class='table table-striped table-hover'><tr><th>Distance from start</th><th>Ground Height</th><th>Atn Height</th></tr>";
    for (var j = 0; j < response.endpoints.length; j++) {

        table+="<tr><td>"+td[j].distance+"</td><td>"+td[j].groundHeight+"</td><td>"+td[j].atnHeight+"</td></tr>";
    }
    table+="</table><br><br>";

    //Third Table
    var sd = response.midpoints;

    table += "<h4>Path_MidPoints</h4><table class='table table-striped table-hover'><tr><th>Distance from start</th><th>Ground Height</th><th>Terrain Type</th><th>Obstruction Height</th><th>Obstruction Type</th></th><th>Curvature Height</th><th>Apparent Ground and Obstruction Height</th><th>1st Freznel Zone</th><th>Toatl Clearance Height</th></tr>";

    for (var i = 0; i < sd.length; i++) {
        table+="<tr><td>"+sd[i].distance + "</td><td>" + sd[i].groundHeight + "</td><td>" + sd[i].trnType
            + "</td><td>" + sd[i].obstrHeight +"</td><td>"+sd[i].obstrType+"</td><td>"+sd[i].curHeight+"</td><td>"+sd[i].AptGrdHeight+"</td><td>"+sd[i].FistFreZone + "</td><td>" + sd[i].totClrHeight + "</td></tr>";
    }

    table+="</table>";
    $("#pa_output").html(table);
}
