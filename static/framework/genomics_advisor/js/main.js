//
// main.js for Diabetes Monograph App
//
// Arjun Sanyal <arjun.sanyal@childrens.harvard.edu>
//
// Note: A good pt with a lot of data: p967332 William Robinson
//
// for tables: http://www.datatables.net/index

// Notes
// for ASA / Aspirin allergies
//
// Salicylic Acids [Chemical/Ingredient]
// http://purl.bioontology.org/ontology/NDFRT/N0000007582
// Aspirin [Chemical/Ingredient]
// http://purl.bioontology.org/ontology/NDFRT/N0000006582
// Salicylates [Chemical/Ingredient]
// http://purl.bioontology.org/ontology/NDFRT/N0000006035
// Acetylsalicylate
// http://purl.bioontology.org/ontology/LNC/LP16020-7
//
// for NSAID allergies
//
// Analgesics, nsaids
// http://purl.bioontology.org/ontology/LNC/LP31430-9
//
// for ACE/ARB
// ACE Inhibitors
// benazepril (Lotensin)
// captopril (Capoten)
// enalapril (Vasotec)
// fosinopril (Monopril)
// lisinopril (Prinivil, Zestril)
// perindopril (Aceon)
// quinapril (Accupril)
// ramipril (Altace)
// trandolapril (Mavik)
//
// Angiotensin II Receptor Blockers (ARBs)
// candesartan (Atacand)
// eprosartan (Tevetan)
// irbesartan (Avapro)
// losartan (Cozaar)
// olmesartan (Benicar)
// telmisartan (Micardis)
// valsartan (Diovan)

// global options
DM_DEBUG = false;
DM_PUSH_DATES = true;

// default flot options
var _flot_opts = {
  xaxis: {
    mode: 'time',
    timeformat: '%y',
    min: new XDate(2009, 11).valueOf(),
    max: new XDate().valueOf(),
    tickSize: [1, 'year'],
    minTickSize: [1, 'year']
  },
  series: {
    lines: { show: false },
    points: { show: true }
  },
  grid: {
    backgroundColor: 'white',
    borderWidth: 1
  }
}

//
// Patient Object
//
// Plain lab name implies latest result
pt = {};
pt.a1c = null;
pt.a1c_arr = [];
pt.a1c_next = null;
pt.a1c_flot_opts = {};
pt.allergies_arr = [];
pt.bday = null;
pt.bp_flot_opts = {};
pt.bun = null;
pt.bun_arr = [];
pt.bun_next = null;
pt.bun_flot_opts = {};
pt.chol_total = null;
pt.chol_total_arr = [];
pt.chol_total_next = null;
pt.chol_total_flot_opts = {};
pt.creatinine = null;
pt.creatinine_arr = [];
pt.creatinine_next = null;
pt.creatinine_flot_opts = {};
pt.current_sort = '';
pt.dbp = null;
pt.dbp_arr = [];
pt.dbp_next = null;
pt.family_name = null;
pt.flu_shot_date = null;
pt.fulfillment = null;
pt.fulfillments_arr = [];
pt.gender = null;
pt.given_name = null;
pt.glucose = null;
pt.glucose_arr = [];
pt.glucose_next = null;
pt.glucose_flot_opts = {};
pt.hdl = null;
pt.hdl_arr = [];
pt.hdl_next = null;
pt.hdl_flot_opts = {};
pt.height = null;
pt.height_arr = [];
pt.ldl = null;
pt.ldl_arr = [];
pt.ldl_next = null;
pt.ldl_flot_opts = {};
pt.m_alb_cre_ratio = null;
pt.m_alb_cre_ratio_arr = [];
pt.m_alb_cre_ratio_next = null;
pt.m_alb_cre_ratio_flot_opts = {};
pt.meds_arr = [];
pt.pneumovax_date = null;
pt.problems_arr = [];
pt.reminders_arr = [];
pt.sbp = null;
pt.sbp_arr = [];
pt.sbp_next = null;
pt.sgot = null;
pt.sgot_arr = [];
pt.sgot_next = null;
pt.sgot_flot_opts = {};
pt.triglyceride = null;
pt.triglyceride_arr = [];
pt.triglyceride_next = null;
pt.triglyceride_flot_opts = {};
pt.ur_tp = null;
pt.ur_tp_arr = [];
pt.ur_tp_next = null;
pt.ur_tp_flot_opts = {};
pt.weight = null;
pt.weight_arr = [];

var _round = function(val, dec){ return Math.round(val*Math.pow(10,dec))/Math.pow(10,dec); }

//
// Data Queries
//


var MEDICATIONS_get = function(){
  return $.Deferred(function(dfd){
    SMART.MEDICATIONS_get().then(function(r){
      _(r.object.of_type.Medication).each(function(m){
        // caution: fulfillments are optional
        pt.fulfillments_arr = m.fulfillment ? pt.fulfillments_arr.concat(m.fulfillment) : pt.fulfillments_arr
        pt.meds_arr.push([
          new XDate(m.startDate).valueOf(),
          m.drugName.dcterms__title,
          m.instructions
        ])
      })

      // get the latest fulfillment
      pt.fulfillment = _(pt.fulfillments_arr).chain()
        .sortBy(function(f){ return f.dcterms__date; })
        .reverse()
        .first()
        .value()

      dfd.resolve();
    })
  }).promise();
};

var DEMOGRAPHICS_get = function(){
  return $.Deferred(function(dfd){
    SMART.DEMOGRAPHICS_get().then(function(r){
      var name = r.object.of_type.v__Name[0];
      var demos = r.object.of_type.Demographics[0];
      pt.family_name = name.v__family_name;
      pt.given_name  = name.v__given_name;
      pt.gender = demos.foaf__gender;
      pt.bday = demos.v__bday;
      dfd.resolve();
    })
  }).promise();
};

var genomics_risks = [1,1,1,1];
var genomics_arr= new Array(4);
    genomics_arr[0] = new Array();
    genomics_arr[1] = new Array();
    genomics_arr[2] = new Array();
    genomics_arr[3] = new Array();
var genomics_array = new Array(4);
var hasGenomics = false;
var revSNP = new Array(4);

var GENOMICS_get = function(){
  return $.Deferred(function(dfd){
  
        var patientData = [];
        var snp_url = "psql/patient/" + (SMART.record.id % 252).toString();
        $('#genomics_id').html(SMART.record.id % 252);
        
        // t1d, t2d, hyp, chd
        genomics_array[0] = new Array(27);
        genomics_array[1] = new Array(17);
        genomics_array[2] = new Array(6);
        genomics_array[3] = new Array(8);
        
        $.ajax({
            type: "GET",
            url: "SNPData.csv",
            dataType: "text",
            success: function(csvdata) {
                    var allLines = csvdata.split(/\r\n|\n/)
                    var count = 0;
                    var snpcount = 0;
                    for(var x = 2; x < allLines.length; x++)
                    {
                        var temp = allLines[x].split(',');
                        if(temp.length < 6)
                        {
                            count++;
                            snpcount = 0;
                        }
                        else
                        {
                            genomics_array[count][snpcount] = temp;
                            snpcount++;
                        }
                    }
                    
            $.ajax({
                url: snp_url,
                dataType: "json",
                success: function(snpdata) {
                    hasGenomics = true;
                    var snp;
                    var genotype;
                    var maxrisk = 0;
                    for(var x = 0; x < 27; x++)
                    {
                        snp = genomics_array[0][x][0];
                        genotype = snpdata[snp];
                        if(genotype == genomics_array[0][x][1])
                        {
                            if(genomics_array[0][x][2] > maxrisk)
                            {
                                revSNP[0] = snp;
                                maxrisk = genomics_array[0][x][2];
                            }
                            genomics_risks[0] *= genomics_array[0][x][2]
                            genomics_arr[0].push(new Array(genomics_array[0][x][0], genomics_array[0][x][4], genomics_array[0][x][5], genomics_array[0][x][1], genomics_array[0][x][2], genomics_array[0][x][3]))
                        }
                    }
                    maxrisk = 0;
                    for(var x = 0; x < 17; x++)
                    {
                        snp = genomics_array[1][x][0];
                        genotype = snpdata[snp];
                        if(genotype == genomics_array[1][x][1])
                        {
                            if(genomics_array[1][x][2] > maxrisk)
                            {
                                revSNP[1] = snp;
                                maxrisk = genomics_array[1][x][2];
                            }
                            genomics_risks[1] *= genomics_array[1][x][2]
                            genomics_arr[1].push(new Array(genomics_array[1][x][0], genomics_array[1][x][4], genomics_array[1][x][5], genomics_array[1][x][1], genomics_array[1][x][2], genomics_array[1][x][3]))
                        }
                    }
                    maxrisk = 0;
                    for(var x = 0; x < 6; x++)
                    {
                        snp = genomics_array[2][x][0];
                        genotype = snpdata[snp];
                        if(genotype == genomics_array[2][x][1])
                        {
                            if(genomics_array[2][x][2] > maxrisk)
                            {
                                revSNP[2] = snp;
                                maxrisk = genomics_array[2][x][2];
                            }
                            genomics_risks[2] *= genomics_array[2][x][2]
                            genomics_arr[2].push(new Array(genomics_array[2][x][0], genomics_array[2][x][4], genomics_array[2][x][5], genomics_array[2][x][1], genomics_array[2][x][2], genomics_array[2][x][3]))
                        }
                    }
                    maxrisk = 0;
                    for(var x = 0; x < 8; x++)
                    {
                        snp = genomics_array[3][x][0];
                        genotype = snpdata[snp];
                        if(genotype == genomics_array[3][x][1])
                        {
                            if(genomics_array[3][x][2] > maxrisk)
                            {
                                revSNP[3] = snp;
                                maxrisk = genomics_array[3][x][2];
                            }
                            genomics_risks[3] *= genomics_array[3][x][2]
                            genomics_arr[3].push(new Array(genomics_array[3][x][0], genomics_array[3][x][4], genomics_array[3][x][5], genomics_array[3][x][1], genomics_array[3][x][2], genomics_array[3][x][3]))
                        }
                    }
                    $('#genomics_format').html(snpdata['filetype']);
                    var advicetext = new Array(4);
                    // set advice
                    
                    for(var x = 0; x < 4; x++)
                    {
                        genomics_risks[x] = (Math.round(genomics_risks[x] * 100) / 100);
                        advicetext[x] = "<font color='";
                        
                        if(genomics_risks[x] <= 0.80)
                            advicetext[x] += "green'";
                        else if(genomics_risks[x] >= 1.50 && genomics_risks[x] < 2.00)
                            advicetext[x] += "orange'";
                        else if(genomics_risks[x] >= 2.00)
                            advicetext[x] += "red'";
                        else    
                            advicetext[x] += "black'";
                        
                        advicetext[x] += ">" + genomics_risks[x].toString() + "</font>";
                    }
                    
                    $('#DM1Risk').html(advicetext[0]); 
                    $('#DM2Risk').html(advicetext[1]); 
                    $('#HYPRisk').html(advicetext[2]); 
                    $('#CHDRisk').html(advicetext[3]); 
                    
                    var graphdata = new Array(4);
        for(var x = 0; x < 4; x++)
        {
            if(genomics_risks[x] > 1)
                graphdata[x] = [genomics_risks[x] - 1, 0, 1];
            else        
                graphdata[x] = [0, 1 - genomics_risks[x], genomics_risks[x]];
        }
        
        var gechart = new Highcharts.Chart({
            chart: {
                renderTo: 'genomics_graph',
                type: 'column'
            },
	    legend: {
	    	enabled: false
	    },
	    colors: [
	        '#AA4643','#89A54E','#4572A7',
        ],
	    exporting: {
	    	enabled: false
	    },
	    credits: {
	    	enabled: false
	    },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['DM1', 'DM2', 'HYP', 'CHD']
            },
            yAxis: {
                labels: {
                    enabled: false
                },
                title: {
                    text: ''
                }
            },
            tooltip: {
                bordercolor: '#4572A7',
                formatter: function() {
                    var index = 0;
                    var disease;
                    switch(this.x){
                        case 'DM1': index = 0; disease = '<b>Diabetes Type 1 </b><br>'; break; 
                        case 'DM2': index = 1; disease = '<b>Diabetes Type 2 </b><br>'; break; 
                        case 'HYP': index = 2; disease = '<b>Hypertension </b><br>'; break; 
                        case 'CHD': index = 3; disease = '<b>Coronary Heart Disease </b><br>'; break; 
                    }
                    return disease + 'Relative Risk: ' + genomics_risks[index] +'<br/>' + 'Highest Risk SNP: ' + revSNP[index];
                },
		style: {
		    fontSize: '8pt'		
		}
            },
            plotOptions: {
		column: {
		    animation: false,
		},
                series: {
                    stacking: 'normal',
		            shadow: false
                }
            },
                series: [{
                name: 'Above',
                data: [graphdata[0][0], graphdata[1][0], graphdata[2][0], graphdata[3][0]]
            },{
                name: 'Below',
                data: [graphdata[0][1], graphdata[1][1], graphdata[2][1], graphdata[3][1]]
            },{
                name: 'Normal',
                data: [graphdata[0][2], graphdata[1][2], graphdata[2][2], graphdata[3][2]]
            }]
        });
        
        var radardata1 = new Array(genomics_arr[1].length);
        for(var x = 0; x < radardata1.length; x++)
                radardata1[x] = parseFloat(genomics_arr[1][x][4]);
        var radarchart1 = new Highcharts.Chart({
            
    chart: {
        renderTo: 'radar_graph1',
        polar: 1
    },
    
    title: {
        text: 'Diabetes Mellitus Type 2',
	margin: 0,
	y: 5
    },
    
    pane: {
        size: '98%',
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        tickInterval: 360/genomics_arr[1].length,
        min: 0,
        max: Math.round(360/genomics_arr[1].length) * genomics_arr[1].length,
        labels: { enabled: false },
    },
        
    yAxis: {
        min: 0.5,
        max: 1.5,
        tickInterval: 0.5,
        labels: { enabled: false }
    },
    
    legend: {
        enabled: false
    },
    
    exporting: {
	    	enabled: false
	    },
	    credits: {
	    	enabled: false
	    },
	    
	    tooltip: {
                bordercolor: '#4572A7',
                formatter: function() {
                    return "<b>SNP: </b>" + genomics_arr[1][Math.round(this.x * genomics_arr[1].length / 360)][0] + "<br><b>Relative Risk: </b>" + genomics_arr[1][Math.round(this.x * genomics_arr[1].length / 360)][4];
                },
		style: {
		    fontSize: '8pt'		
		}
            },
        
    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 360/genomics_arr[1].length
        },
        column: {
            pointRange: 0,
            stacking: 'normal',
            pointPadding: 0,
            groupPadding: 0
        }
    },

    series: [{
        type: 'area',
        data: radardata1
    }]
    });

var radardata2 = new Array(genomics_arr[0].length);
        for(var x = 0; x < radardata2.length; x++)
                radardata2[x] = parseFloat(genomics_arr[0][x][4]);
        var radarchart2 = new Highcharts.Chart({
            
    chart: {
        renderTo: 'radar_graph2',
        polar: 1
    },
colors: [
	'#AA4643',
],
    
    title: {
        text: ''
	
    },
    
    pane: {
        size: '98%',
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        tickInterval: 360/genomics_arr[0].length,
        min: 0,
        max: Math.round(360/genomics_arr[0].length) * genomics_arr[0].length,
        labels: { enabled: false },
    },
        
    yAxis: {
        min: 0.5,
        max: 1.5,
        tickInterval: 0.5,
        labels: { enabled: false }
    },
    
    legend: {
        enabled: false
    },
    
    exporting: {
	    	enabled: false
	    },
	    credits: {
	    	enabled: false
	    },
	    
	    tooltip: {
                bordercolor: '#4572A7',
                formatter: function() {
                    return "<b>Type 1 Diabetes</b>" + "<br><b>SNP: </b>" + genomics_arr[0][Math.round(this.x * genomics_arr[0].length / 360)][0] + "<br><b>Relative Risk: </b>" + genomics_arr[0][Math.round(this.x * genomics_arr[0].length / 360)][4];
                },
		style: {
		    fontSize: '8pt'		
		}
            },
        
    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 360/genomics_arr[0].length
        },
        column: {
            pointRange: 0,
            stacking: 'normal',
            pointPadding: 0,
            groupPadding: 0
        }
    },

    series: [{
        type: 'area',
        data: radardata2
    }]
    });

var radardata3 = new Array(genomics_arr[2].length);
        for(var x = 0; x < radardata3.length; x++)
                radardata3[x] = parseFloat(genomics_arr[2][x][4]);
        var radarchart3 = new Highcharts.Chart({
            
    chart: {
        renderTo: 'radar_graph3',
        polar: 1
    },
colors: [
	'#89A54E', 
],
    
    title: {
        text: ''
    },
    
    pane: {
        size: '98%',
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        tickInterval: 360/genomics_arr[2].length,
        min: 0,
        max: Math.round(360/genomics_arr[2].length) * genomics_arr[2].length,
        labels: { enabled: false },
    },
        
    yAxis: {
        min: 0.5,
        max: 1.5,
        tickInterval: 0.5,
        labels: { enabled: false }
    },
    
    legend: {
        enabled: false
    },
    
    exporting: {
	    	enabled: false
	    },
	    credits: {
	    	enabled: false
	    },
	    
	    tooltip: {
                bordercolor: '#4572A7',
                formatter: function() {
                    return "<b>Hypertension</b>" + "<br><b>SNP: </b>" + genomics_arr[1][Math.round(this.x * genomics_arr[2].length / 360)][0] + "<br><b>Relative Risk: </b>" + genomics_arr[2][Math.round(this.x * genomics_arr[2].length / 360)][4];
                },
		style: {
		    fontSize: '8pt'		
		}
            },
        
    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 360/genomics_arr[2].length
        },
        column: {
            pointRange: 0,
            stacking: 'normal',
            pointPadding: 0,
            groupPadding: 0
        }
    },

    series: [{
        type: 'area',
        data: radardata3
    }]
    });

var radardata4 = new Array(genomics_arr[3].length);
        for(var x = 0; x < radardata4.length; x++)
                radardata4[x] = parseFloat(genomics_arr[3][x][4]);
        var radarchart4 = new Highcharts.Chart({
            
    chart: {
        renderTo: 'radar_graph4',
        polar: 1
    },

colors: [
	'#80699B', 
],
    
    title: {
        text: ''
    },
    
    pane: {
        size: '98%',
        startAngle: 0,
        endAngle: 360
    },

    xAxis: {
        tickInterval: 360/genomics_arr[3].length,
        min: 0,
        max: Math.round(360/genomics_arr[3].length) * genomics_arr[3].length,
        labels: { enabled: false },
    },
        
    yAxis: {
        min: 0.5,
        max: 1.5,
        tickInterval: 0.5,
        labels: { enabled: false }
    },
    
    legend: {
        enabled: false
    },
    
    exporting: {
	    	enabled: false
	    },
	    credits: {
	    	enabled: false
	    },
	    
	    tooltip: {
                bordercolor: '#4572A7',
                formatter: function() {
                    return "<b>Coronary Heart Disease</b>" + "<br><b>SNP: </b>" + genomics_arr[3][Math.round(this.x * genomics_arr[3].length / 360)][0] + "<br><b>Relative Risk: </b>" + genomics_arr[3][Math.round(this.x * genomics_arr[3].length / 360)][4];
                },
		style: {
		    fontSize: '8pt'		
		}
            },
        
    plotOptions: {
        series: {
            pointStart: 0,
            pointInterval: 360/genomics_arr[3].length
        },
        column: {
            pointRange: 0,
            stacking: 'normal',
            pointPadding: 0,
            groupPadding: 0
        }
    },

    series: [{
        type: 'area',
        data: radardata4
    }]
    });   
         
       var SNPs = ["","","",""];
       
       for(var x = 0; x < 4; x++)
       {
            for(var y = 0; y < genomics_arr[x].length; y++)
            {
                if(y % 2 == 0)
                    SNPs[x] += "<div> <div style='width: 26%; float: left; text align: left; margin-left: 2px'>";
                else
                    SNPs[x] += "<div class='gray'> <div style='width: 26%; float: left; text align: left; margin-left: 2px'>";
                SNPs[x] += genomics_arr[x][y][0];
                SNPs[x] += "</div> <div style='width: 20%; float: left; text align: left; margin-left: -2px'>";
                SNPs[x] += genomics_arr[x][y][1];
                SNPs[x] += "</div> <div style='width: 13%; float: left; text align: left;'>"
                SNPs[x] += genomics_arr[x][y][2];
                SNPs[x] += "</div> <div style='width: 11%; float: left; text align: left;'>"
                SNPs[x] += genomics_arr[x][y][3];
                SNPs[x] += "</div> <div style='width: 13%; float: left; text align: left;'>"
                SNPs[x] += genomics_arr[x][y][4];
                SNPs[x] += "</div> <div style='width: 15%; float: right; text-align: right; margin-right: 5px'>"
                SNPs[x] += genomics_arr[x][y][5];
                SNPs[x] += "</div> <div class='clear'></div></div>";
            }
            SNPs[x] += "<div style='float: right; text-align: right; margin-right: 10px;'><b> Total Relative Risk: " + genomics_risks[x] + " </b></div>"
       }

       
       $('#DM1Span').html(SNPs[0]);
       $('#DM2Span').html(SNPs[1]);
       $('#HYPSpan').html(SNPs[2]);
       $('#CHDSpan').html(SNPs[3]);
	alert(SNPs[0]);
                },
                error: function() {
			$('#DM1Span').html("No genomic Data Available");
       $('#DM2Span').html("No genomic Data Available");
       $('#HYPSpan').html("No genomic Data Available");
       $('#CHDSpan').html("No genomic Data Available");
                    $('#genomics_format').html("No Data");
                    $('#DM1Risk').html("No Genomics Data Available"); 
                    $('#DM2Risk').html("No Genomics Data Available"); 
                    $('#HYPRisk').html("No Genomics Data Available"); 
                    $('#CHDRisk').html("No Genomics Data Available"); 
                    $('#genomics_graph').html("<img src='./assets/Empty.png' />");
		    $('#show_genomics_overlay').html("");
                }
            });
            }
           
        }); 
           
        dfd.resolve();
  }).promise();
};

// On SMART.ready, do all the data api calls and synchronize
// when they are all complete.
SMART.ready(function(){
  $.when(
   DEMOGRAPHICS_get(),
   MEDICATIONS_get()
  )
  .then(function(){ 
  
        GENOMICS_get();
        
     
    // main demo info
    $('.family_name').text(pt.family_name)
    $('.given_name').text(pt.given_name)
    $('.record_id').text(SMART.record.id)
    $('.birthday').text(pt.bday)
    var b = new XDate(pt.bday)
    $('.age').text(Math.round(b.diffYears(new XDate())));
    $('.gender').text(pt.gender[0]) 

   
  });
});
