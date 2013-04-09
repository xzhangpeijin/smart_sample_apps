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
    ((expiredays==null) ? "," : ";expires="+exdate.toGMTString())
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
    return ","
}

function _changeToChinese()
{
	setCookie('language', 'Chinese',30)
	_changeMainPageToChinese();
	_changeLabGraphsToChinese();
	_changePatientSummaryToChinese();
	_changeAppExplainerToChinese();
	_changeGenomicsAdvisorToChinese();
}
function _changeToEnglish()
{
	setCookie('language', 'English',30);
	_changeToEnglishMainPage();
	_changeLabGraphsToEnglish()
	_changePatientSummaryToEnglish();
	_changeAppExplainerToEnglish();
	_changeGenomicsAdvisorToEnglish();
}
function _changeMainPageToChinese()
{
	var str='[{"#buttonToChangeLanguage":"�����Ӣ��","#connectWithGenomicsServer":"���ӵ����������","#reconnect":"��������","#cleanData":"����û�����","#app_title_line":"�������򲡷���Ԥ��ϵͳ",';
	str=str+'"#DateOfBirth":"����","#age":"����","#sex":"�Ա�","#Genomics_Advisor_FirstCol":"������ѧ����","#Patient_ID":"���� ID:","#Data_format":"���ݸ�ʽ:",';
	str=str+'"#Last_Known_Values":"������ֵ","#urTp":"���ܵ���","#SGOT":"Ѫ��Ȳ�ת��ø","#chol":"���̴�","#tri":"��������","#hdl":"���ܶ�֬����","#ldl":"���ܶ�֬����","#bun":"���ص�","#cre_label":"��������","#glu_label":"������","#a1c_label":"�ǻ�Ѫ�쵰��",';
	str=str+'"#show_pt_summary_overlay":"������ϢժҪ","#show_explainer_overlay":"Ӧ��˵����","#show_timeline_overlay":"ʱ����","#show_genomics_overlay":"������ѧ����",';	
	str=str+'"#weight_label":"����","#height_label":"���","#last_foot_exam":"��һ���㲿����","#last_eye_exam":"��һ���۲�����","#smoking":"����","#aspirin_label":"��˾ƥ��������","#ace_arb":"Ѫ�ܽ�����ת��ø���Ƽ�/Ѫ�ܽ�����������ϼ�","#last_pneumovax":"��һ�η�������","#last_flu_shot":"��һ����������","#Problems_label":"����","#Major_CV":"��Ҫ��Ѫ�ܺϲ�֢","#Others":"����",';
	str=str+'"#GenomicsVisualization":"������ѧ���ӻ�","#reminders_label":"����","#Allergies_label":"����","#Medications_label":"����","#Genomics_Data":"����������","#Relative_Risks":"��ط���","#Drug_Info":" ҩ����Ϣ "}]';
	var jsonList=eval("("+str+")");	
	for(var key in jsonList[0]){ 
����		$(key).text(jsonList[0][key]);
	}
	$("#BP_Graph_header").html("Ѫѹ <span class='normal smaller' id='goal'>Ŀ�� <span class='medium'>&lt; 130/80</span>&thinsp;mm/hg</span>");
	$("#ldl_header").html("���ܶ�֬���� <span class='normal smaller' id='goal'>Ŀ�� <span class='medium'>&lt; 100</span>&thinsp;mg/dL</span>");
	$("#A1C_header").html("�ǻ�Ѫ�쵰��  <span class='normal smaller'>Ŀ�� <span class='medium'>&lt; 7%</span></span>");
	$("#alb_cre").html("&micro;΢���׵���/������ֵ");
	$("#DiabetesMellitus1").html("<b> 1������: </b> ");
	$("#DiabetesMellitus2").html("<b> 2������: </b> ");
	$("#Hypertension").html("<b> ��Ѫѹ: </b> ");
	$("#Coronary_Heart_Disease").html("<b> ���Ĳ�: </b> ");
	_changeToChineseLogic();
}
function _changeToEnglishMainPage()
{
	var str='[{"#buttonToChangeLanguage":"Translate to Chinese","#connectWithGenomicsServer":"Connect with Genomics Server","#reconnect":"Reconnect","#cleanData":"Clean patient data","#app_title_line":"SMART Diabetes Monograph",';
	str=str+'"#DateOfBirth":"DOB","#age":"AGE","#sex":"SEX","#Genomics_Advisor_FirstCol":"Genomics Advisor","#Patient_ID":"Patient ID:","#Data_format":"Data format:",';
	str=str+'"#Last_Known_Values":"Last Known Values","#urTp":"Ur tp","#SGOT":"SGOT","#chol":"Chol","#tri":"Tri","#hdl":"HDL","#ldl":"LDL","#bun":"BUN","#cre_label":"Cre","#glu_label":"Glu","#a1c_label":"A1C",';
	str=str+'"#show_pt_summary_overlay":"Patient Summary","#show_explainer_overlay":"App Explainer","#show_timeline_overlay":"Time Line","#show_genomics_overlay":"Genomics Advisor",';	
	str=str+'"#weight_label":"weight","#height_label":"height","#last_foot_exam":"last foot exam","#last_eye_exam":"last eye exam","#smoking":"smoking","#aspirin_label":"aspirin","#ace_arb":"ACE/ARB","#last_pneumovax":"last pneumovax","#last_flu_shot":"last flu shot","#Problems_label":"Problems ","#Major_CV":"Major CV Comorbidities","#Others":"Others",';
	str=str+'"#GenomicsVisualization":"Genomics Visualization","#reminders_label":"Reminders","#Allergies_label":"Allergies","#Medications_label":"Medications","#Genomics_Data":"Genomics Data","#Relative_Risks":" Relative Risks ","#Drug_Info":" Drug Information "}]';
	var jsonList=eval("("+str+")");	
	for(var key in jsonList[0]){ 
����		$(key).text(jsonList[0][key]);
	}	
	$("#BP_Graph_header").html("BP <span class='normal smaller' id='goal'>goal <span class='medium'>&lt; 130/80</span>&thinsp;mm/hg</span>");
	$("#ldl_header").html("LDL <span class='normal smaller' id='goal'>goal <span class='medium'>&lt; 100</span>&thinsp;mg/dL</span>");
	$("#A1C_header").html(" A1C <span class='normal smaller'>goal <span class='medium'>&lt; 7%</span></span>");
	$("#alb_cre").html("&micro;alb/cre");
	$("#DiabetesMellitus1").html("<b> Diabetes Mellitus 1: </b> ");
	$("#DiabetesMellitus2").html("<b> Diabetes Mellitus 2: </b> ");
	$("#Hypertension").html("<b> Hypertension: </b> ");
	$("#Coronary_Heart_Disease").html("<b> Coronary Heart Disease: </b> ");
	_changeToEnglishLogic();
}
function _changeLabGraphsToChinese()
{
	$("#Lab_Graphs").text("��������Ԥ�����ʵ����ͼ��");
	$("#dob_2").text("����");
	$("#age_2").text("����");
	$("#sex_2").text("�Ա�");
	$("#UTP").text("�򵰰�");
	$("#alb_cre_label").html("&micro;΢���׵���/������ֵ");
	$("#SGOT_1").text("Ѫ��Ȳ�ת��ø");
	$("#Cholesterol").text("���̴�");
	$("#tri_1").text("��������");
	$("#hdl_1").text("���ܶ�֬����");
	$("#ldl_1").text("���ܶ�֬����");
	$("#bun_1").text("���ص�");
	$("#Creatinine_label").text("��������");
	$("#Glucose_label").text("������");
	$("#a1c_header_1").text("�ǻ�Ѫ�쵰��");
}
function _changeLabGraphsToEnglish()
{
	$("#Lab_Graphs").text("SMART Diabetes Monograph Lab Graphs");
	$("#dob_2").text("DOB");
	$("#age_2").text("AGE");
	$("#sex_2").text("SEX");
	$("#UTP").text("Urine Total Protein");
	$("#alb_cre_label").html("&micro;alb/cre");
	$("#SGOT_1").text("SGOT");
	$("#Cholesterol").text("Cholesterol");
	$("#tri_1").text("Tri");
	$("#hdl_1").text("HDL");
	$("#ldl_1").text("LDL");
	$("#bun_1").text("BUN");
	$("#Creatinine_label").text("Creatinine");
	$("#Glucose_label").text("Glucose");
	$("#a1c_header_1").text("A1C");
}
function _changeGenomicsAdvisorToChinese()
{
	var str='[{"#genomics_title":"��������Ԥ�����ϵͳ ������ѧ����","#genomics_close":"[Close]",';
	str=str+'"#type1":" 1������  ","#type2":" 2������  ","#hyper_label":" ��Ѫѹ  ","#CoronaryHeartDisease":" ���Ĳ�  ","#advice":" ������ѧ���� ","#disease_info":" ������Ϣ ","#drug_advice":" ҩ�ｨ�� ","#radar_graphs_2":"�״�ͼ"}]';
	var jsonList=eval("("+str+")");	
	for(var key in jsonList[0]){ 
����		$(key).text(jsonList[0][key]);
	}
	$("#genomic_snp").html("���������̬��   <div style='width: 17%; float: right; text-align: right; margin-right: 5px'>Ƶ��</div>	    <div style='width: 13%; float: right; text align: left;'> ���� </div>	    <div style='width: 11%; float: right; text align: left;'> ������ </div>	    <div style='width: 13%; float: right; text align: left;'> CHRM </div>	    <div style='width: 20%; float: right; text align: left; margin-left: 1px'> ������ </div>         ");
	$("#snp_sub_title").html("	    SNP	    <div style='width: 68%; float: right; text align: left;'> ���� </div>	   <div style='width: 15%; float: right; text align: left; margin-left: -4px'> ������ </div>");	
	
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
function _changeGenomicsAdvisorToEnglish()
{
	var str='[{"#genomics_title":"SMART Diabetes Monograph Genomics Advisor","#genomics_close":"[close]",';
	str=str+'"#type1":" Type 1 Diabetes  ","#type2":" Type 2 Diabetes  ","#hyper_label":" Hypertension  ","#CoronaryHeartDisease":" Coronary Heart Disease  ","#advice":" Genomics Advice ","#disease_info":" Disease Info ","#drug_advice":" Drug Advice","#radar_graphs_2":" Radar Graphs "}]';
	var jsonList=eval("("+str+")");	
	for(var key in jsonList[0]){ 
����		$(key).text(jsonList[0][key]);
	}
	$("#genomic_snp").html("	    SNP	    <div style='width: 17%; float: right; text-align: right; margin-right: 5px'>Frequency</div>	    <div style='width: 13%; float: right; text align: left;'> Risk </div>	    <div style='width: 11%; float: right; text align: left;'> Code </div>	    <div style='width: 13%; float: right; text align: left;'> CHRM </div>	    <div style='width: 20%; float: right; text align: left; margin-left: 1px'> Locus </div>");
	$("#snp_sub_title").html("	    SNP	    <div style='width: 68%; float: right; text align: left;'> Advice </div>	   <div style='width: 15%; float: right; text align: left; margin-left: -4px'> Genotype </div>");	
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
function _changePatientSummaryToChinese()
{
	$("#Patient_Summary").text("     ��������Ԥ�����ϵͳ������ϢժҪ     ");
	$("#dob_patient").text("����");
	$("#age_patient").text("����");
	$("#sex_patient").text("�Ա�");
	$("#about").html("<span class='section_header_number'>&#10122;</span> ���ڱ�ժҪ");
	$("#total").text("        �������ܽ��˹�������2�����򲡲��Ե���ؽ��      ");
	$("#about").html("<span class='section_header_number'>&#10123;</span> ���Ĳ��Խ��");
	$("#bp_patient").text("Ѫѹ");
	$("#last_test").text("�������");
	$("#SYSTOLIC_VALUE").text("����ѹ");
	$("#DIASTOLIC_VALUE").text("����ѹ");
	$("#ldl_label").text("���ܶ�֬����");
	$("#ldl_explanation_ps").text("���ܶ�֬���� �������ܶ�֬���ף������̴���");
	$("#last_test_2").text("�������");
	$("#a1cHeader").text("�ǻ�Ѫ�쵰��");
	$("#a1c_explanation_ps").text("�ǻ�Ѫ�쵰�ײ��ԣ�����ƽ��Ѫ��Ũ��");
	$("#last_test_3").text("�������");
	$("#Your_Allergies").html("<span class='section_header_number'>&#10124;</span>            ���Ĺ���ʷ");
	$("#Your_Medications").html("<span class='section_header_number'>&#10125;</span>            ���Ĵ���");
	$("#what").html("<span class='section_header_number'>&#10126;</span> ������Ӧ����ʲô��");
}
function _changePatientSummaryToEnglish()
{
	$("#Patient_Summary").text("          SMART Diabetes Patient Summary        ");
	$("#dob_patient").text("DOB");
	$("#age_patient").text("AGE");
	$("#sex_patient").text("SEX");
	$("#about").html("<span class='section_header_number'>&#10122;</span> About This Summary");
	$("#total").text("        This report summarizes information about your diagnosis of diabetes type 2      ");
	$("#about").html("<span class='section_header_number'>&#10123;</span> Your Test Results");
	$("#bp_patient").text("Blood Pressure");
	$("#last_test").text("LAST TEST");
	$("#SYSTOLIC_VALUE").text("SYSTOLIC VALUE");
	$("#DIASTOLIC_VALUE").text("DIASTOLIC VALUE");
	$("#ldl_label").text("LDL");
	$("#ldl_explanation_ps").text('LDL measures low density lipoproteins (the "bad cholesterol")');
	$("#last_test_2").text("LAST TEST");
	$("#a1cHeader").text("A1C");
	$("#a1c_explanation_ps").text("The A1C test measures average blood sugar concentration");
	$("#last_test_3").text("LAST TEST");
	$("#Your_Allergies").html("<span class='section_header_number'>&#10124;</span>            Your Allergies");
	$("#Your_Medications").html("<span class='section_header_number'>&#10125;</span>            Your Medications");
	$("#what").html("<span class='section_header_number'>&#10126;</span> What Should You Do Now?");
}
function _changeAppExplainerToChinese()
{
	$("#explainer").html("<div id='explainer_title_line'>        <div style='width: 78%; float: left; margin-left: 10%'>          <img class='smart_bug' src='./assets/smart_bug.png' />          �������򲡷���Ԥ��ϵͳ������        </div>        <div style='width: 20%; float: left; text-align: right; margin-left: -10%; font-size: smaller'>          <a class='close' href='#'>[Close]</a>        </div>      </div>      <div class='clear'></div>      <div class='container container_12'>        <div class='grid_3'>          <p class='first'><span style='color:#0088CC;'>������ϢժҪ</span></p>          <p><span style='color:#0088CC;'>Ӧ��˵����</span></p>          <p><span style='color:#0088CC;'>ʱ����</span></p>          <p><span style='color:#0088CC;'>������ѧ����</span></p>        </div>        <div class='grid_8 prefix_1'>          <p class='first'>���ӵ� <strong>���򲡷���Ԥ��ϵͳ������ϢժҪ</strong> ����</p>          <p>���ӵ� <strong>���򲡷���Ԥ��ϵͳ������</strong> ����</p>          <p>���ӵ� <strong>���򲡷���Ԥ��ϵͳʱ����</strong> ����/���� ����</p>          <p>���ӵ� <strong>���򲡷���Ԥ��ϵͳ������ѧ����</strong> ����</p>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3'>          <img style='width: 80px' src='./assets/alpha_mode.png'>        </div>        <div class='grid_8 prefix_1'>          <div class='button_text_align'>            <p>���� CHRONO ��ʱ���ǰ��˳�� ���⣬�������ʹ���</p></div>          <div class='button_text_align'><p>���� ALPHA ������ĸ˳������ �� ���⣬�������ʹ���</p></div>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''><img src='./assets/explainer/explainer-charts.png' width='220' height='350'></div>        <div class='grid_8 prefix_1'>          <p class='first'>��ͼ�����һ����Ҫ�źź����������Ը��������˽���:</p>          <ul>            <li>��Ч��ֵΪ��ǰ��ǰ���������</li>            <li>����ֵ�ڷ���Ӱ����Χ��</li>            <li>��������ֵ��Χ�ڻ�ɫ����Ӱ����</li>          </ul>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''>        <img src='./assets/explainer/explainer-LKV-nocircle.png' width='220' height='391'></div>        <div class='grid_8 prefix_1'>          <p class='first'><strong>������ֵ</strong>���������ڸ������򲡽�����ʵ���Ҽ��:</p>          <ul>            <li>�г��ļ���У�&ldquo;Ѫ��Ȳ�ת��ø&rdquo;, �����ŵ��Ǽ�����λ, &ldquo;U/L&rdquo;, �Լ��������������������Χ, &ldquo;10-40&rdquo;</li>            <li>�г����ǵ�һ�͵ڶ�������Ĳ��� <em>������</em>, &ldquo;27&rdquo; �� &ldquo;33&rdquo;</li>            <li>MM/DD/YY ����������ʾ�ڸò��Խ��������, &ldquo;10/24/11&rdquo;</li>            <li>��Ч�Ľ����ʾ��һ�����ۺ�, &ldquo;&ndash;&rdquo;</li>            <li><em>������Χ</em> �Ľ���ᱻ������ʾ, &ldquo;<strong style='color:#E46C0A'>232</strong>&rdquo;</li></ul>              <p><strong>[Graph]</strong> ������������ʾ <strong>����Ԥ�����ʵ����</strong> ����鿴��ǰ��ǰ����ʵ����</p>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_3' style=''>          <img src='./assets/explainer/explainer-other.png' width='220' height='169'></div>          <div class='grid_8 prefix_1'>            <p class='first'><strong>������Ϣ</strong> ������������������׷�����򲡽���������:</p>            <ul>              <li><strong>����</strong> �� <strong>���</strong> ��ʾ��������Ĳ�����������Ƶ�λ����ɫ�ģ����Լ�ʱ��</li>              <li><strong>��һ���㲿����</strong>, <strong>��һ���۲�����</strong>, <strong>��һ�η�������</strong>, �� <strong>��һ����������</strong> ��ʾ�������һ�β��Ե�ʱ��</li>              <li><strong>����</strong>, <strong>��˾ƥ��������</strong>, �� <strong>Ѫ�ܽ�����ת��ø���Ƽ�/Ѫ�ܽ�����������ϼ�</strong> ��ʾ���Ǹ��Ե�״̬</li>              <li>��Ϣ�� MM/DD/YY ������<em>�ɵ�</em> �ᱻ������ʾ, &ldquo;<span style='color:#E46C0A'>09/28/07</span>&rdquo;</li>              <li>�����õĽ���ᱻ��ʾ�� &ldquo;δ֪&rdquo;</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_7'>             <div class='probs' style='margin-right:10px;'>          <img src='./assets/explainer/explainer-problems-alpha-label-t2.png' width='220' height='319'><br>          </div>             <div class='probs'>          <img src='./assets/explainer/explainer-problems-chrono-label-t2.png' width='220' height='319'><br>          </div>              <div class='clear'></div>          </div>          <div class='grid_5'>            <p class='first'><strong>���� </strong>�г��˵�ǰ�͹�ȥ��ҽ������.  MM/DD/YY ����иı���������ʾ�ڵ�һλ.</p>            <p>�����б�ᱻ���ֳ� <em>������</em> ����:</p>            <ul>              <li><strong>��Ҫ��Ѫ�ܺϲ�֢</strong> &ndash; �κ�Ŀǰ��֪����Ҫ��Ѫ������ (CV) �ϲ�֢���� ���� 2</li>              <li><strong>����</strong> &ndash; ʣ��� <u>���ڵ�</u> ����, ����ͻ����ʾ��ǰ��� <span style='color:#E46C0A'>2������</span></li>              <li><strong>�ر��ŵ� </strong>(on date) &ndash; �κ��Ѿ��رգ��������˵����⣬�����ұ��Ը�С��������ʾ����ʱ��, &ldquo;08/29/08&rdquo;</li>            </ul>            <p>����ᱻ <em>�����</em> ��������ʽ����:</p>            <ul>              <li><strong>Alpha</strong> &ndash; ����ᱻ������ĸ˳�����У�������ֶ���һ�Σ�������ұ߻��м���, &ldquo;Coronary arteriosclerosis (2)&rdquo;</li>              <li><strong>Chrono</strong> &ndash; ����ᱻ����ʱ��˳�����У���������Ľ��ʱ��  MM/DD/YY , &ldquo;01/04/08 Coronary arteriosclerosis (��״��������Ӳ��֢) (2)&rdquo;</li>          </ul></div>            <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-reminders.png' width='310' height='139'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>���� </strong>���Ϊ�����򲡼�������Ƽ�����.</p>            <p>����ᱻ���  <em>���ҽ���</em>:</p>            <ul>              <li>�Ҳ����ò��ԵĽ��ֵ</li>              <li>���ڵ�ǰ��ָ��������˵���Ե�ֵ�����Ͼ�</li>              <li>һ�����ԵĽ������������ֵ</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-allergies.png' width='310' height='62'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>����</strong>�г��˵�ǰ�͹�ȥ�Ĺ���ԭ.</p>            <ul>              <li>����ԭ�Ǹ�����ĸ˳���г���</li>              <li>����еĻ�����Ӧ�ᱻ�г���ÿ������ԭ����      </li>              <li>�����õĽ���ᱻ��ʾ�� &quot;No known allergies&quot;    </li>            </ul>          </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_6'>             <div style='width:418px;padding-bottom:5px;margin-bottom:10px;border-bottom:1px dotted #666;'><img src='./assets/explainer/explainer-meds-alpha-t2.png' width='418' height='104'></div>             <div><img src='./assets/explainer/explainer-meds-chrono-label-t2.png' width='418' height='71'></div>          </div>          <div class='grid_5 prefix_1'>            <p class='first'><strong>���� </strong>�г��˵�ǰ�͹�ȥ�Ĵ���ҩ����µĴ���ҩ����ʾ�ڵ�һλ.</p>      <p>�������԰������ַ�ʽ����:</p>            <ul>              <li><strong>Alpha</strong> &ndash; ����ĸ˳���г�ҩ����ҩ����ֶ���һ��������ͬ�ļ�������ҩƵ�ʣ������ҷ���ʾ���� </li>              <li><strong>Chrono</strong> &ndash; ҩ������ʱ��˳�����У����г������ MM/DD/YY , &ldquo;04/25/09 Nitroglycerin&rdquo;</li>            </ul>          </div>      </div>");
}

function _changeAppExplainerToEnglish()
{
	$("#explainer").html("<div id='explainer_title_line'>        <div style='width: 78%; float: left; margin-left: 10%'>          <img class='smart_bug' src='./assets/smart_bug.png' />          SMART Diabetes Monograph App Explainer        </div>        <div style='width: 20%; float: left; text-align: right; margin-left: -10%; font-size: smaller'>          <a class='close' href='#'>[Close]</a>        </div>      </div>      <div class='clear'></div>      <div class='container container_12'>        <div class='grid_3'>          <p class='first'><span style='color:#0088CC;'>Patient Summary</span></p>          <p><span style='color:#0088CC;'>App Explainer</span></p>          <p><span style='color:#0088CC;'>Time Line</span></p>          <p><span style='color:#0088CC;'>Genomics Advisor</span></p>        </div>        <div class='grid_8 prefix_1'>          <p class='first'>Link to <strong>Diabetes Monograph Patient Summary</strong> panel</p>          <p>Link to <strong>Diabetes Monograph App Explainer</strong> panel</p>          <p>Link to <strong>Diabetes Monograph Time Line</strong> Problems/Medications panel</p>          <p>Link to <strong>Diabetes Monograph Genomics Advisor</strong> panel</p>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3'>          <img style='width: 80px' src='./assets/alpha_mode.png'>        </div>        <div class='grid_8 prefix_1'>          <div class='button_text_align'>            <p>Click CHRONO to see Problems, Allergies, and Medications chronologically</p></div>          <div class='button_text_align'><p>Click ALPHA to see Problems, Allergies, and Medications alphabetically</p></div>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''><img src='./assets/explainer/explainer-charts.png' width='220' height='350'></div>        <div class='grid_8 prefix_1'>          <p class='first'>The graphs depict a vital sign and two tests for tracking diabetes health:</p>          <ul>            <li>Available values are shown for the current and two prior years</li>            <li>Values in range of a goal are in the unshaded area</li>            <li>Values out-of-range of a goal are in the gray-shaded area</li>          </ul>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''>        <img src='./assets/explainer/explainer-LKV-nocircle.png' width='220' height='391'></div>        <div class='grid_8 prefix_1'>          <p class='first'><strong>Last Known Values</strong> presents  laboratory tests used to track diabetes health:</p>          <ul>            <li>Test types are listed, &ldquo;SGOT&rdquo;, followed by units of measurement, &ldquo;U/L&rdquo;, with the normal range below the type name, &ldquo;10-40&rdquo;</li>            <li>First and second most recent test results appear <em>left-to-right</em>, &ldquo;27&rdquo; and &ldquo;33&rdquo;</li>            <li>MM/DD/YY dates for a test result appears below it, &ldquo;10/24/11&rdquo;</li>            <li>Unavailable results are presented with a dash, &ldquo;&ndash;&rdquo;</li>            <li><em>Out-of-range</em> results are highlighted, &ldquo;<strong style='color:#E46C0A'>232</strong>&rdquo;</li></ul>              <p><strong>[Graph]</strong> Click link to see <strong>Diabetes Monograph Labs</strong> panel  to view lab results for the current and two prior years</p>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_3' style=''>          <img src='./assets/explainer/explainer-other.png' width='220' height='169'></div>          <div class='grid_8 prefix_1'>            <p class='first'><strong>Other Info</strong> presents heterogeneous data elements used to track diabetes health:</p>            <ul>              <li><strong>weight</strong> and <strong>height</strong> show their most recent value in English and metric units (grayed out) and the date of measurement</li>              <li><strong>last foot exam</strong>, <strong>last eye exam</strong>, <strong>last pneumovax</strong>, and <strong>last flu shot</strong> show their date of last examination</li>              <li><strong>smoking</strong>, <strong>aspirin</strong>, and <strong>ACE/ARB</strong> show their respective status</li>              <li>Information MM/DD/YY dates which are <em>stale</em> are highlighted, &ldquo;<span style='color:#E46C0A'>09/28/07</span>&rdquo;</li>              <li>Unavailable results are presented as &ldquo;Unknown&rdquo;</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_7'>             <div class='probs' style='margin-right:10px;'>          <img src='./assets/explainer/explainer-problems-alpha-label-t2.png' width='220' height='319'><br>          </div>             <div class='probs'>          <img src='./assets/explainer/explainer-problems-chrono-label-t2.png' width='220' height='319'><br>          </div>              <div class='clear'></div>          </div>          <div class='grid_5'>            <p class='first'><strong>Problems </strong>presents a list of current and past medical problems. The MM/DD/YY date of the most recent problem change is shown in the banner.</p>            <p>Problems are organized into <em>exclusive</em> categories:</p>            <ul>              <li><strong>Major CV Comorbidities</strong> &ndash; any current problem known to be a major cardiovascular (CV) comorbidity of diabetes mellitus type 2</li>              <li><strong>Other</strong> &ndash; any remaining <u>current</u> problem, including highlighting a current case of <span style='color:#E46C0A'>Diabetes mellitus type 2</span></li>              <li><strong>Closed </strong>(on date) &ndash; any instance of a problem that has been closed with end MM/DD/YY date shown to the right in smaller text, &ldquo;08/29/08&rdquo;</li>            </ul>            <p>Problems are listed <em>within category</em> in two views:</p>            <ul>              <li><strong>Alpha</strong> &ndash; problems are listed alphabetically with an instance count to the right of the problem if it occurs more than once, &ldquo;Coronary arteriosclerosis (2)&rdquo;</li>              <li><strong>Chrono</strong> &ndash; problems are listed chronologically  by most recent inception MM/DD/YY date, &ldquo;01/04/08 Coronary arteriosclerosis (2)&rdquo;</li>          </ul></div>            <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-reminders.png' width='310' height='139'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>Reminders </strong>presents suggested tests to order for diabetes management.</p>            <p>Suggestions are made  <em>if and only if</em>:</p>            <ul>              <li>No test values are found</li>              <li>A  test value is too old relative to current guidelines</li>              <li>A  test result is out of range relative to its goals</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-allergies.png' width='310' height='62'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>Allergies </strong>presents a list of current and past allergies.</p>            <ul>              <li>Allergies are listed alphabetically</li>              <li>Reactions are listed after each allergy name if available      </li>              <li>Unavailable results are presented as &quot;No known allergies&quot;    </li>            </ul>          </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_6'>             <div style='width:418px;padding-bottom:5px;margin-bottom:10px;border-bottom:1px dotted #666;'><img src='./assets/explainer/explainer-meds-alpha-t2.png' width='418' height='104'></div>             <div><img src='./assets/explainer/explainer-meds-chrono-label-t2.png' width='418' height='71'></div>          </div>          <div class='grid_5 prefix_1'>            <p class='first'><strong>Medications </strong>presents a list of current and past medications. The MM/DD/YY date of the most recent medication date is shown in the banner.</p>      <p>Medications are listed in two views:</p>            <ul>              <li><strong>Alpha</strong> &ndash; medications are listed alphabetically with an instance count  to the right of the medication if it occurs more than once in the same dose and frequency </li>              <li><strong>Chrono</strong> &ndash; medications are  listed chronologically by most recent inception MM/DD/YY date, &ldquo;04/25/09 Nitroglycerin&rdquo;</li>            </ul>          </div>      </div>");
}
function _changeToChineseLogic()
{	
	if($("#gender_sex").text()=="m"||$("#gender_sex").text()=="M")
	{
		$("#gender_sex").text("��");
	}
	if($("#gender_sex").text()=="f"||$("#gender_sex").text()=="F")
	{
		$("#gender_sex").text("Ů");
	}	
	if($("#diabetic_info_label").text()=="Diabetic")
	{
		$("#diabetic_info_label").text("����");
	}
	if($("#diabetic_how_long_text_label").text()!=""){
		$("#diabetic_how_long_text_label").text($("#diabetic_how_long_text_label").text().replace(/[^\d]/g,'')+" ��");
	}
	//alert($("#cv_comorbidities").html());
	if($("#cv_comorbidities").text()!=","){		
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('Chest pain','�ز���ʹ'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('Essential hypertension','ԭ���Ը�Ѫѹ'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('Benign essential hypertension','���Ը�Ѫѹ'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('No current CV comorbidities','����û����Ѫ�ܺϲ�֢'));
	}	
	_changeOtherProblemsToChinese();
	if($("#resolved_problems").text()!=",")
	{
		$("#resolved_problems").html($("#resolved_problems").html().replace('None known','û��'));
	}	
}
function _changeOtherProblemsToChinese()
{
	if($("#other_problems").text()!=","){	
		var str='[{"Acute respiratory failure":"���Ժ���˥��","Chronic asthmatic bronchitis":"���Դ�Ϣ��֧������","Dehydration":"��ˮ","Otitis media":"�ж���","otitis media":"�ж���","foreign body in larynx":"�ں�����","Diabetes mellitus type 2":"2������","Paralytic ileus":"����Գ�����","Abdominal pain":"��ʹ","Absence of menstruation":"���¾�","Acidosis":"���ж�","Constipation":"����","Dyspepsia and other specified disorders of function of stomach":"��������������θ��������","Gastroesophageal reflux disease":"θʳ�ܷ�����","Headache":"ͷʹ","Hypokalemia":"�ͼ�Ѫ֢","Other and unspecified noninfectious gastroenteritis and colitis":"������δ֪�ķǸ�Ⱦ��θ���׺ͽ᳦��","Peptic ulcer without hemorrhage, without perforation AND without obstruction":"����������:�޳�Ѫ���޴��׺��޹���","Pure hypercholesterolemia":"���ߵ��̴�Ѫ֢","Right upper quadrant pain":"���ϸ�ʹ","Acute frontal sinusitis":"���Զ����","Attention deficit hyperactivity disorder":"ע����ȱ�ݶද�ϰ�","Child attention deficit disorder":"��ͯע����ȱ���ϰ�","Chronic sinusitis":"���Ա����","Depressive disorder":"����֢","Disruptive behavior disorder":"�ƻ�����Ϊ�ϰ�","Hyperlipidemia":"��֬Ѫ֢","Oppositional defiant disorder":"����Υ�����ϰ�","Poliomyelitis vaccination":"����������������","Recurrent major depressive episodes: moderate":"����������֢�������ж�","Single major depressive episode, mild":"�������������������","Single major depressive episode: moderate":"�����������������ж�","Acute sinusitis":"���Ա����","Acute upper respiratory infection":"�����Ϻ�������Ⱦ","Common cold":"��ͨ��ð","Cough":"����","Croup":"�������","Hypertrophy of tonsils":"�������״�","Needs influenza immunization":"��Ҫ������������","Otalgia":"��ʹ","Other dyspnea and respiratory abnormality":"�����������Ѻͺ����쳣","Abnormal weight loss":"�����������ؼ���"';
		str=str+'}]';	
		var jsonList=eval("("+str+")");	
		for(var key in jsonList[0]){ 
����			$("#other_problems").html($("#other_problems").html().replace(key,jsonList[0][key]));
		}
		
	}
}
function _changeOtherProblemsToEnglish()
{
	if($("#other_problems").text()!=","){	
		var str='[{"���Ժ���˥��":"Acute respiratory failure","���Դ�Ϣ��֧������":"Chronic asthmatic bronchitis","��ˮ":"Dehydration","�ж���":"otitis media","�ں�����":"foreign body in larynx","2������":"Diabetes mellitus type 2","����Գ�����":"Paralytic ileus","��ʹ":"Abdominal pain","���¾�":"Absence of menstruation","���ж�":"Acidosis","����":"Constipation","��������������θ��������":"Dyspepsia and other specified disorders of function of stomach","θʳ�ܷ�����":"Gastroesophageal reflux disease","ͷʹ":"Headache","�ͼ�Ѫ֢":"Hypokalemia","������δ֪�ķǸ�Ⱦ��θ���׺ͽ᳦��":"Other and unspecified noninfectious gastroenteritis and colitis","����������:�޳�Ѫ���޴��׺��޹���":"Peptic ulcer without hemorrhage, without perforation AND without obstruction","���ߵ��̴�Ѫ֢":"Pure hypercholesterolemia","���ϸ�ʹ":"Right upper quadrant pain","���Զ����":"Acute frontal sinusitis","ע����ȱ�ݶද�ϰ�":"Attention deficit hyperactivity disorder","��ͯע����ȱ���ϰ�":"Child attention deficit disorder","���Ա����":"Chronic sinusitis","����֢":"Depressive disorder","�ƻ�����Ϊ�ϰ�":"Disruptive behavior disorder","��֬Ѫ֢":"Hyperlipidemia","����Υ�����ϰ�":"Oppositional defiant disorder","����������������":"Poliomyelitis vaccination","����������֢�������ж�":"Recurrent major depressive episodes: moderate","�������������������":"Single major depressive episode,mild","�����������������ж�":"Single major depressive episode, moderate","���Ա����":"Acute sinusitis","�����Ϻ�������Ⱦ":"Acute upper respiratory infection","��ͨ��ð":"Common cold","����":"Cough","�������":"Croup","�������״�":"Hypertrophy of tonsils","��Ҫ������������":"Needs influenza immunization","��ʹ":"Otalgia","�����������Ѻͺ����쳣":"Other dyspnea and respiratory abnormality","�����������ؼ���":"Abnormal weight loss"';
		str=str+'}]';	
		var jsonList=eval("("+str+")");	
		for(var key in jsonList[0]){ 
����			$("#other_problems").html($("#other_problems").html().replace(key,jsonList[0][key]));
		}
		
	}
}
function _changeToEnglishLogic()
{
	if($("#gender_sex").text()=="��")
	{
		$("#gender_sex").text("m");
	}
	if($("#gender_sex").text()=="Ů")
	{
		$("#gender_sex").text("f");
	}
	if($("#diabetic_info_label").text()=="����")
	{
		$("#diabetic_info_label").text("Diabetic");
	}
	if($("#diabetic_how_long_text_label").text()!=","){
		$("#diabetic_how_long_text_label").text("for "+$("#diabetic_how_long_text_label").text().replace(/[^\d]/g,'')+" years");
	}
	if($("#cv_comorbidities").text()!=","){
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('�ز���ʹ','Chest pain'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('ԭ���Ը�Ѫѹ','Essential hypertension'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('���Ը�Ѫѹ','Benign essential hypertension'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('����û����Ѫ�ܺϲ�֢','No current CV comorbidities'));
	}
	_changeOtherProblemsToEnglish();
	if($("#resolved_problems").text()!=",")
	{
		$("#resolved_problems").html($("#resolved_problems").html().replace('û��','None known'));
	}	
}