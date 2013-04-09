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
	$("#buttonToChangeLanguage").text("�����Ӣ��");
	$("#app_title_line").text("��������Ԥ�����ϵͳ");
	$("#dob").text("����");
	$("#age").text("����");
	$("#sex").text("�Ա�");
	$("#snp_header").html("���������̬��	    <div style='width: 17%; float: right; text-align: right; margin-right: 5px'>Ƶ��</div>	    <div style='width: 13%; float: right; text align: left;'> ���� </div>	    <div style='width: 11%; float: right; text align: left;'> ������ </div>	    <div style='width: 13%; float: right; text align: left;'> CHRM </div>	    <div style='width: 20%; float: right; text align: left; margin-left: 1px'> ������ </div>");
	$("#type1").text("  1������  ");
	$("#type2").text("  2������  ");
	$("#Hypertension_label").text("  ��Ѫѹ  ");
	$("#Coronary_Heart_Disease_label").text("  ���Ĳ�  ");
	$("#disease_info").text(" ������Ϣ ");
	$("#genomics_data").text(" ������ѧ���� ");
	$("#patient_id").html(" <b>���� ID:</b> ");
	$("#data_format").html(" <b>���ݸ�ʽ: </b> ");
	$("#Current_Medications").text("��ǰ����");
	$("#Risk_Graph").text("����ͼ��");
	$("#Radar_Graphs").text("�״�ͼ");
	$("#Drug_Advice").text("ҩ�ｨ��");
	$("#snp_subheader").html("���������̬��	    <div style='width: 68%; float: right; text align: left;' > ���� </div>	    <div style='width: 15%; float: right; text align: left; margin-left: -1px'> ������ </div>");
	if($("#radar_graph1").html()!="")
	{
		$("tspan").each(function(i){ 
			$(this).text($(this).text().replace('DM1','1������'));
			$(this).text($(this).text().replace('DM2','2������'));
			$(this).text($(this).text().replace('HYP','��Ѫѹ'));
			$(this).text($(this).text().replace('CHD','���Ĳ�'));
			$(this).text($(this).text().replace('Diabetes Mellitus Type 1','1������'));
			$(this).text($(this).text().replace('Diabetes Mellitus Type 2','2������'));
			$(this).text($(this).text().replace('Hypertension','��Ѫѹ'));
			$(this).text($(this).text().replace('Coronary Heart Disease','���Ĳ�'));
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
			$(this).text($(this).text().replace('1������','DM1'));
			$(this).text($(this).text().replace('2������','DM2'));
			$(this).text($(this).text().replace('��Ѫѹ','HYP'));
			$(this).text($(this).text().replace('���Ĳ�','CHD'));
			$(this).text($(this).text().replace('1������','Diabetes Mellitus Type 1'));
			$(this).text($(this).text().replace('2������','Diabetes Mellitus Type 2'));
			$(this).text($(this).text().replace('��Ѫѹ','Hypertension'));
			$(this).text($(this).text().replace('���Ĳ�','Coronary Heart Disease'));
		});
	}
}