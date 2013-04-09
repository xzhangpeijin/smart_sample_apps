$(document).ready(function()
{	 
	if(getCookie('language')=='Chinese')
	{
		_changeToChinese();
	}else
	{		
		_changeToEnglish();
	}
  	$("#buttonToChangeLanguage").click(function()
  	{
  		if(getCookie('language')=='Chinese')
		{
			_changeToEnglish();
		}else
		{
			_changeToChinese();
		}
  	});
});
/*
*The function to set a cookie
*/
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
/*
*The function to get a cookie
*/
function getCookie(c_name)
{
    if (document.cookie.length>0)
      {
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        { 
        c_start=c_start + c_name.length+1 
        c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        } 
      }
    return ""
}
function _changeToChinese()
{
	setCookie('language', 'Chinese',30);
	$("#buttonToChangeLanguage").text("翻译成英文");
	$("#app_title_line").text("智能糖尿病预测分析系统");
	$("#dob").text("生日");
	$("#age").text("年龄");
	$("#sex").text("性别");
	$("#snp_header").html("单核苷酸多态性	    <div style='width: 17%; float: right; text-align: right; margin-right: 5px'>频率</div>	    <div style='width: 13%; float: right; text align: left;'> 风险 </div>	    <div style='width: 11%; float: right; text align: left;'> 基因型 </div>	    <div style='width: 13%; float: right; text align: left;'> CHRM </div>	    <div style='width: 20%; float: right; text align: left; margin-left: 1px'> 基因座 </div>");
	$("#type1").text("  1型糖尿病  ");
	$("#type2").text("  2型糖尿病  ");
	$("#Hypertension_label").text("  高血压  ");
	$("#Coronary_Heart_Disease_label").text("  冠心病  ");
	$("#disease_info").text(" 疾病信息 ");
	$("#genomics_data").text(" 基因组学数据 ");
	$("#patient_id").html(" <b>病人 ID:</b> ");
	$("#data_format").html(" <b>数据格式: </b> ");
	$("#Current_Medications").text("当前处方");
	$("#Risk_Graph").text("风险图表");
	$("#Radar_Graphs").text("雷达图");
	$("#Drug_Advice").text("药物建议");
	$("#snp_subheader").html("单核苷酸多态性	    <div style='width: 68%; float: right; text align: left;' > 建议 </div>	    <div style='width: 15%; float: right; text align: left; margin-left: -1px'> 基因型 </div>");
	if($("#radar_graph1").html()!="")
	{
		$("tspan").each(function(i){ 
			$(this).text($(this).text().replace('DM1','1型糖尿病'));
			$(this).text($(this).text().replace('DM2','2型糖尿病'));
			$(this).text($(this).text().replace('HYP','高血压'));
			$(this).text($(this).text().replace('CHD','冠心病'));
			$(this).text($(this).text().replace('Diabetes Mellitus Type 1','1型糖尿病'));
			$(this).text($(this).text().replace('Diabetes Mellitus Type 2','2型糖尿病'));
			$(this).text($(this).text().replace('Hypertension','高血压'));
			$(this).text($(this).text().replace('Coronary Heart Disease','冠心病'));
		});
	}
}
function _changeToEnglish()
{
	setCookie('language', 'English',30);
	$("#buttonToChangeLanguage").text("Translate to Chinese");
	$("#app_title_line").text("SMART Diabetes Monograph");
	$("#dob").text("DOB");
	$("#age").text("AGE");
	$("#sex").text("SEX");
	$("#snp_header").html("SNP	    <div style='width: 17%; float: right; text-align: right; margin-right: 5px'>Frequency</div>	    <div style='width: 13%; float: right; text align: left;'> Risk </div>	    <div style='width: 11%; float: right; text align: left;'> Code </div>	    <div style='width: 13%; float: right; text align: left;'> CHRM </div>	    <div style='width: 20%; float: right; text align: left; margin-left: 1px'> Locus </div>");
	$("#type1").text(" Type 1 Diabetes  ");
	$("#type2").text(" Type 2 Diabetes  ");
	$("#Hypertension_label").text(" Hypertension  ");
	$("#Coronary_Heart_Disease_label").text(" Coronary Heart Disease  ");
	$("#disease_info").text(" Disease Information ");
	$("#genomics_data").text(" Genomics Data ");
	$("#patient_id").html(" <b>Patient ID:</b> ");
	$("#data_format").html(" <b>Data format: </b> ");
	$("#Current_Medications").text(" Current Medications ");
	$("#Risk_Graph").text("Risk Graph");
	$("#Radar_Graphs").text(" Radar Graphs ");
	$("#Drug_Advice").text(" Drug Advice ");
	$("#snp_subheader").html("	    SNP	    <div style='width: 68%; float: right; text align: left;' > Advice </div>	    <div style='width: 15%; float: right; text align: left; margin-left: -1px'> Genotype </div>");
	if($("#radar_graph1").html()!="")
	{
		$("tspan").each(function(i){ 
			$(this).text($(this).text().replace('1型糖尿病','DM1'));
			$(this).text($(this).text().replace('2型糖尿病','DM2'));
			$(this).text($(this).text().replace('高血压','HYP'));
			$(this).text($(this).text().replace('冠心病','CHD'));
			$(this).text($(this).text().replace('1型糖尿病','Diabetes Mellitus Type 1'));
			$(this).text($(this).text().replace('2型糖尿病','Diabetes Mellitus Type 2'));
			$(this).text($(this).text().replace('高血压','Hypertension'));
			$(this).text($(this).text().replace('冠心病','Coronary Heart Disease'));
		});
	}
}