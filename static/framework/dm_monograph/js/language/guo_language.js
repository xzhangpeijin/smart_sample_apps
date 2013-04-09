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
	var str='[{"#buttonToChangeLanguage":"翻译成英文","#connectWithGenomicsServer":"连接到基因服务器","#reconnect":"重新连接","#cleanData":"清除用户数据","#app_title_line":"智能糖尿病分析预测系统",';
	str=str+'"#DateOfBirth":"生日","#age":"年龄","#sex":"性别","#Genomics_Advisor_FirstCol":"基因组学顾问","#Patient_ID":"病人 ID:","#Data_format":"数据格式:",';
	str=str+'"#Last_Known_Values":"最后测试值","#urTp":"尿总蛋白","#SGOT":"血清谷草转氨酶","#chol":"胆固醇","#tri":"甘油三酯","#hdl":"高密度脂蛋白","#ldl":"低密度脂蛋白","#bun":"尿素氮","#cre_label":"肌氨酸酐","#glu_label":"葡萄糖","#a1c_label":"糖化血红蛋白",';
	str=str+'"#show_pt_summary_overlay":"病人信息摘要","#show_explainer_overlay":"应用说明书","#show_timeline_overlay":"时间轴","#show_genomics_overlay":"基因组学顾问",';	
	str=str+'"#weight_label":"体重","#height_label":"身高","#last_foot_exam":"上一次足部测试","#last_eye_exam":"上一次眼部测试","#smoking":"吸烟","#aspirin_label":"阿司匹林耐受性","#ace_arb":"血管紧张素转换酶抑制剂/血管紧张素受体阻断剂","#last_pneumovax":"上一次肺炎疫苗","#last_flu_shot":"上一次流感疫苗","#Problems_label":"问题","#Major_CV":"主要心血管合并症","#Others":"其他",';
	str=str+'"#GenomicsVisualization":"基因组学可视化","#reminders_label":"提醒","#Allergies_label":"过敏","#Medications_label":"处方","#Genomics_Data":"基因组数据","#Relative_Risks":"相关风险","#Drug_Info":" 药物信息 "}]';
	var jsonList=eval("("+str+")");	
	for(var key in jsonList[0]){ 
　　		$(key).text(jsonList[0][key]);
	}
	$("#BP_Graph_header").html("血压 <span class='normal smaller' id='goal'>目标 <span class='medium'>&lt; 130/80</span>&thinsp;mm/hg</span>");
	$("#ldl_header").html("低密度脂蛋白 <span class='normal smaller' id='goal'>目标 <span class='medium'>&lt; 100</span>&thinsp;mg/dL</span>");
	$("#A1C_header").html("糖化血红蛋白  <span class='normal smaller'>目标 <span class='medium'>&lt; 7%</span></span>");
	$("#alb_cre").html("&micro;微量白蛋白/肌酐比值");
	$("#DiabetesMellitus1").html("<b> 1型糖尿病: </b> ");
	$("#DiabetesMellitus2").html("<b> 2型糖尿病: </b> ");
	$("#Hypertension").html("<b> 高血压: </b> ");
	$("#Coronary_Heart_Disease").html("<b> 冠心病: </b> ");
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
　　		$(key).text(jsonList[0][key]);
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
	$("#Lab_Graphs").text("智能糖尿病预测分析实验室图表");
	$("#dob_2").text("生日");
	$("#age_2").text("年龄");
	$("#sex_2").text("性别");
	$("#UTP").text("尿蛋白");
	$("#alb_cre_label").html("&micro;微量白蛋白/肌酐比值");
	$("#SGOT_1").text("血清谷草转氨酶");
	$("#Cholesterol").text("胆固醇");
	$("#tri_1").text("甘油三酯");
	$("#hdl_1").text("高密度脂蛋白");
	$("#ldl_1").text("低密度脂蛋白");
	$("#bun_1").text("尿素氮");
	$("#Creatinine_label").text("肌氨酸酐");
	$("#Glucose_label").text("葡萄糖");
	$("#a1c_header_1").text("糖化血红蛋白");
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
	var str='[{"#genomics_title":"智能糖尿病预测分析系统 基因组学顾问","#genomics_close":"[Close]",';
	str=str+'"#type1":" 1型糖尿病  ","#type2":" 2型糖尿病  ","#hyper_label":" 高血压  ","#CoronaryHeartDisease":" 冠心病  ","#advice":" 基因组学建议 ","#disease_info":" 疾病信息 ","#drug_advice":" 药物建议 ","#radar_graphs_2":"雷达图"}]';
	var jsonList=eval("("+str+")");	
	for(var key in jsonList[0]){ 
　　		$(key).text(jsonList[0][key]);
	}
	$("#genomic_snp").html("单核苷酸多态性   <div style='width: 17%; float: right; text-align: right; margin-right: 5px'>频率</div>	    <div style='width: 13%; float: right; text align: left;'> 风险 </div>	    <div style='width: 11%; float: right; text align: left;'> 基因型 </div>	    <div style='width: 13%; float: right; text align: left;'> CHRM </div>	    <div style='width: 20%; float: right; text align: left; margin-left: 1px'> 基因座 </div>         ");
	$("#snp_sub_title").html("	    SNP	    <div style='width: 68%; float: right; text align: left;'> 建议 </div>	   <div style='width: 15%; float: right; text align: left; margin-left: -4px'> 基因型 </div>");	
	
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
function _changeGenomicsAdvisorToEnglish()
{
	var str='[{"#genomics_title":"SMART Diabetes Monograph Genomics Advisor","#genomics_close":"[close]",';
	str=str+'"#type1":" Type 1 Diabetes  ","#type2":" Type 2 Diabetes  ","#hyper_label":" Hypertension  ","#CoronaryHeartDisease":" Coronary Heart Disease  ","#advice":" Genomics Advice ","#disease_info":" Disease Info ","#drug_advice":" Drug Advice","#radar_graphs_2":" Radar Graphs "}]';
	var jsonList=eval("("+str+")");	
	for(var key in jsonList[0]){ 
　　		$(key).text(jsonList[0][key]);
	}
	$("#genomic_snp").html("	    SNP	    <div style='width: 17%; float: right; text-align: right; margin-right: 5px'>Frequency</div>	    <div style='width: 13%; float: right; text align: left;'> Risk </div>	    <div style='width: 11%; float: right; text align: left;'> Code </div>	    <div style='width: 13%; float: right; text align: left;'> CHRM </div>	    <div style='width: 20%; float: right; text align: left; margin-left: 1px'> Locus </div>");
	$("#snp_sub_title").html("	    SNP	    <div style='width: 68%; float: right; text align: left;'> Advice </div>	   <div style='width: 15%; float: right; text align: left; margin-left: -4px'> Genotype </div>");	
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
function _changePatientSummaryToChinese()
{
	$("#Patient_Summary").text("     智能糖尿病预测分析系统病人信息摘要     ");
	$("#dob_patient").text("生日");
	$("#age_patient").text("年龄");
	$("#sex_patient").text("性别");
	$("#about").html("<span class='section_header_number'>&#10122;</span> 关于本摘要");
	$("#total").text("        本报告总结了关于您的2型糖尿病测试的相关结果      ");
	$("#about").html("<span class='section_header_number'>&#10123;</span> 您的测试结果");
	$("#bp_patient").text("血压");
	$("#last_test").text("最近测试");
	$("#SYSTOLIC_VALUE").text("收缩压");
	$("#DIASTOLIC_VALUE").text("舒张压");
	$("#ldl_label").text("低密度脂蛋白");
	$("#ldl_explanation_ps").text("低密度脂蛋白 测量低密度脂蛋白（坏胆固醇）");
	$("#last_test_2").text("最近测试");
	$("#a1cHeader").text("糖化血红蛋白");
	$("#a1c_explanation_ps").text("糖化血红蛋白测试：测量平均血糖浓度");
	$("#last_test_3").text("最近测试");
	$("#Your_Allergies").html("<span class='section_header_number'>&#10124;</span>            您的过敏史");
	$("#Your_Medications").html("<span class='section_header_number'>&#10125;</span>            您的处方");
	$("#what").html("<span class='section_header_number'>&#10126;</span> 现在您应该做什么？");
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
	$("#explainer").html("<div id='explainer_title_line'>        <div style='width: 78%; float: left; margin-left: 10%'>          <img class='smart_bug' src='./assets/smart_bug.png' />          智能糖尿病分析预测系统解释器        </div>        <div style='width: 20%; float: left; text-align: right; margin-left: -10%; font-size: smaller'>          <a class='close' href='#'>[Close]</a>        </div>      </div>      <div class='clear'></div>      <div class='container container_12'>        <div class='grid_3'>          <p class='first'><span style='color:#0088CC;'>病人信息摘要</span></p>          <p><span style='color:#0088CC;'>应用说明书</span></p>          <p><span style='color:#0088CC;'>时间轴</span></p>          <p><span style='color:#0088CC;'>基因组学顾问</span></p>        </div>        <div class='grid_8 prefix_1'>          <p class='first'>连接到 <strong>糖尿病分析预测系统病人信息摘要</strong> 版面</p>          <p>连接到 <strong>糖尿病分析预测系统解释器</strong> 版面</p>          <p>连接到 <strong>糖尿病分析预测系统时间轴</strong> 问题/处方 版面</p>          <p>连接到 <strong>糖尿病分析预测系统基因组学顾问</strong> 版面</p>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3'>          <img style='width: 80px' src='./assets/alpha_mode.png'>        </div>        <div class='grid_8 prefix_1'>          <div class='button_text_align'>            <p>单击 CHRONO 按时间的前后顺序看 问题，过敏，和处方</p></div>          <div class='button_text_align'><p>单击 ALPHA 按照字母顺序排列 看 问题，过敏，和处方</p></div>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''><img src='./assets/explainer/explainer-charts.png' width='220' height='350'></div>        <div class='grid_8 prefix_1'>          <p class='first'>该图描绘了一个重要信号和两个测试以跟踪糖尿病人健康:</p>          <ul>            <li>有效的值为当前和前两年的数据</li>            <li>理想值在非阴影区范围内</li>            <li>超出理想值范围在灰色的阴影区内</li>          </ul>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''>        <img src='./assets/explainer/explainer-LKV-nocircle.png' width='220' height='391'></div>        <div class='grid_8 prefix_1'>          <p class='first'><strong>最后测试值</strong>代表了用于跟踪糖尿病健康的实验室检查:</p>          <ul>            <li>列出的检查有：&ldquo;血清谷草转氨酶&rdquo;, 紧跟着的是计量单位, &ldquo;U/L&rdquo;, 以及类型名称下面的正常范围, &ldquo;10-40&rdquo;</li>            <li>列出的是第一和第二次最近的测试 <em>从左到右</em>, &ldquo;27&rdquo; 和 &ldquo;33&rdquo;</li>            <li>MM/DD/YY 测试日期显示在该测试结果的下面, &ldquo;10/24/11&rdquo;</li>            <li>无效的结果显示成一个破折号, &ldquo;&ndash;&rdquo;</li>            <li><em>超出范围</em> 的结果会被高亮显示, &ldquo;<strong style='color:#E46C0A'>232</strong>&rdquo;</li></ul>              <p><strong>[Graph]</strong> 单击链接以显示 <strong>糖尿病预测分析实验室</strong> 版面查看当前和前两年实验结果</p>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_3' style=''>          <img src='./assets/explainer/explainer-other.png' width='220' height='169'></div>          <div class='grid_8 prefix_1'>            <p class='first'><strong>其他信息</strong> 代表了其他可以用于追踪糖尿病健康的数据:</p>            <ul>              <li><strong>体重</strong> 和 <strong>身高</strong> 显示他们最近的测量结果，公制单位（灰色的），以及时间</li>              <li><strong>上一次足部测试</strong>, <strong>上一次眼部测试</strong>, <strong>上一次肺炎疫苗</strong>, 和 <strong>上一次流感疫苗</strong> 显示他们最近一次测试的时间</li>              <li><strong>吸烟</strong>, <strong>阿司匹林耐受性</strong>, 和 <strong>血管紧张素转换酶抑制剂/血管紧张素受体阻断剂</strong> 显示它们各自的状态</li>              <li>信息中 MM/DD/YY 日期是<em>旧的</em> 会被高亮显示, &ldquo;<span style='color:#E46C0A'>09/28/07</span>&rdquo;</li>              <li>不可用的结果会被显示成 &ldquo;未知&rdquo;</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_7'>             <div class='probs' style='margin-right:10px;'>          <img src='./assets/explainer/explainer-problems-alpha-label-t2.png' width='220' height='319'><br>          </div>             <div class='probs'>          <img src='./assets/explainer/explainer-problems-chrono-label-t2.png' width='220' height='319'><br>          </div>              <div class='clear'></div>          </div>          <div class='grid_5'>            <p class='first'><strong>问题 </strong>列出了当前和过去的医疗问题.  MM/DD/YY 最近有改变的问题会显示在第一位.</p>            <p>问题列表会被布局成 <em>单独的</em> 种类:</p>            <ul>              <li><strong>主要心血管合并症</strong> &ndash; 任何目前已知的主要心血管问题 (CV) 合并症糖尿病 类型 2</li>              <li><strong>其他</strong> &ndash; 剩余的 <u>现在的</u> 问题, 包括突出显示当前情况 <span style='color:#E46C0A'>2型糖尿病</span></li>              <li><strong>关闭着的 </strong>(on date) &ndash; 任何已经关闭（结束）了的问题，会在右边以更小的文字显示结束时间, &ldquo;08/29/08&rdquo;</li>            </ul>            <p>问题会被 <em>分类别</em> 以两种形式排列:</p>            <ul>              <li><strong>Alpha</strong> &ndash; 问题会被按照字母顺序排列，如果出现多于一次，问题的右边会有计数, &ldquo;Coronary arteriosclerosis (2)&rdquo;</li>              <li><strong>Chrono</strong> &ndash; 问题会被按照时间顺序排列，根据最近的结果时间  MM/DD/YY , &ldquo;01/04/08 Coronary arteriosclerosis (冠状动脉粥样硬化症) (2)&rdquo;</li>          </ul></div>            <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-reminders.png' width='310' height='139'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>提醒 </strong>提出为了糖尿病监测管理的推荐测试.</p>            <p>建议会被提出  <em>当且仅当</em>:</p>            <ul>              <li>找不到该测试的结果值</li>              <li>对于当前的指导方案来说测试的值过于老旧</li>              <li>一个测试的结果超出了理想值</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-allergies.png' width='310' height='62'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>过敏</strong>列出了当前和过去的过敏原.</p>            <ul>              <li>过敏原是根据字母顺序列出的</li>              <li>如果有的话，反应会被列出在每个过敏原后面      </li>              <li>不可用的结果会被显示成 &quot;No known allergies&quot;    </li>            </ul>          </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_6'>             <div style='width:418px;padding-bottom:5px;margin-bottom:10px;border-bottom:1px dotted #666;'><img src='./assets/explainer/explainer-meds-alpha-t2.png' width='418' height='104'></div>             <div><img src='./assets/explainer/explainer-meds-chrono-label-t2.png' width='418' height='71'></div>          </div>          <div class='grid_5 prefix_1'>            <p class='first'><strong>处方 </strong>列出了当前和过去的处方药物。最新的处方药物显示在第一位.</p>      <p>处方可以按照两种方式排列:</p>            <ul>              <li><strong>Alpha</strong> &ndash; 按字母顺序列出药物，如果药物出现多于一次且有相同的剂量和用药频率，会在右方显示计数 </li>              <li><strong>Chrono</strong> &ndash; 药物会根据时间顺序排列，先列出最近的 MM/DD/YY , &ldquo;04/25/09 Nitroglycerin&rdquo;</li>            </ul>          </div>      </div>");
}

function _changeAppExplainerToEnglish()
{
	$("#explainer").html("<div id='explainer_title_line'>        <div style='width: 78%; float: left; margin-left: 10%'>          <img class='smart_bug' src='./assets/smart_bug.png' />          SMART Diabetes Monograph App Explainer        </div>        <div style='width: 20%; float: left; text-align: right; margin-left: -10%; font-size: smaller'>          <a class='close' href='#'>[Close]</a>        </div>      </div>      <div class='clear'></div>      <div class='container container_12'>        <div class='grid_3'>          <p class='first'><span style='color:#0088CC;'>Patient Summary</span></p>          <p><span style='color:#0088CC;'>App Explainer</span></p>          <p><span style='color:#0088CC;'>Time Line</span></p>          <p><span style='color:#0088CC;'>Genomics Advisor</span></p>        </div>        <div class='grid_8 prefix_1'>          <p class='first'>Link to <strong>Diabetes Monograph Patient Summary</strong> panel</p>          <p>Link to <strong>Diabetes Monograph App Explainer</strong> panel</p>          <p>Link to <strong>Diabetes Monograph Time Line</strong> Problems/Medications panel</p>          <p>Link to <strong>Diabetes Monograph Genomics Advisor</strong> panel</p>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3'>          <img style='width: 80px' src='./assets/alpha_mode.png'>        </div>        <div class='grid_8 prefix_1'>          <div class='button_text_align'>            <p>Click CHRONO to see Problems, Allergies, and Medications chronologically</p></div>          <div class='button_text_align'><p>Click ALPHA to see Problems, Allergies, and Medications alphabetically</p></div>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''><img src='./assets/explainer/explainer-charts.png' width='220' height='350'></div>        <div class='grid_8 prefix_1'>          <p class='first'>The graphs depict a vital sign and two tests for tracking diabetes health:</p>          <ul>            <li>Available values are shown for the current and two prior years</li>            <li>Values in range of a goal are in the unshaded area</li>            <li>Values out-of-range of a goal are in the gray-shaded area</li>          </ul>        </div>        <div class='clear'></div>        <div class='grid_12 row-border'></div>        <div class='grid_3' style=''>        <img src='./assets/explainer/explainer-LKV-nocircle.png' width='220' height='391'></div>        <div class='grid_8 prefix_1'>          <p class='first'><strong>Last Known Values</strong> presents  laboratory tests used to track diabetes health:</p>          <ul>            <li>Test types are listed, &ldquo;SGOT&rdquo;, followed by units of measurement, &ldquo;U/L&rdquo;, with the normal range below the type name, &ldquo;10-40&rdquo;</li>            <li>First and second most recent test results appear <em>left-to-right</em>, &ldquo;27&rdquo; and &ldquo;33&rdquo;</li>            <li>MM/DD/YY dates for a test result appears below it, &ldquo;10/24/11&rdquo;</li>            <li>Unavailable results are presented with a dash, &ldquo;&ndash;&rdquo;</li>            <li><em>Out-of-range</em> results are highlighted, &ldquo;<strong style='color:#E46C0A'>232</strong>&rdquo;</li></ul>              <p><strong>[Graph]</strong> Click link to see <strong>Diabetes Monograph Labs</strong> panel  to view lab results for the current and two prior years</p>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_3' style=''>          <img src='./assets/explainer/explainer-other.png' width='220' height='169'></div>          <div class='grid_8 prefix_1'>            <p class='first'><strong>Other Info</strong> presents heterogeneous data elements used to track diabetes health:</p>            <ul>              <li><strong>weight</strong> and <strong>height</strong> show their most recent value in English and metric units (grayed out) and the date of measurement</li>              <li><strong>last foot exam</strong>, <strong>last eye exam</strong>, <strong>last pneumovax</strong>, and <strong>last flu shot</strong> show their date of last examination</li>              <li><strong>smoking</strong>, <strong>aspirin</strong>, and <strong>ACE/ARB</strong> show their respective status</li>              <li>Information MM/DD/YY dates which are <em>stale</em> are highlighted, &ldquo;<span style='color:#E46C0A'>09/28/07</span>&rdquo;</li>              <li>Unavailable results are presented as &ldquo;Unknown&rdquo;</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_7'>             <div class='probs' style='margin-right:10px;'>          <img src='./assets/explainer/explainer-problems-alpha-label-t2.png' width='220' height='319'><br>          </div>             <div class='probs'>          <img src='./assets/explainer/explainer-problems-chrono-label-t2.png' width='220' height='319'><br>          </div>              <div class='clear'></div>          </div>          <div class='grid_5'>            <p class='first'><strong>Problems </strong>presents a list of current and past medical problems. The MM/DD/YY date of the most recent problem change is shown in the banner.</p>            <p>Problems are organized into <em>exclusive</em> categories:</p>            <ul>              <li><strong>Major CV Comorbidities</strong> &ndash; any current problem known to be a major cardiovascular (CV) comorbidity of diabetes mellitus type 2</li>              <li><strong>Other</strong> &ndash; any remaining <u>current</u> problem, including highlighting a current case of <span style='color:#E46C0A'>Diabetes mellitus type 2</span></li>              <li><strong>Closed </strong>(on date) &ndash; any instance of a problem that has been closed with end MM/DD/YY date shown to the right in smaller text, &ldquo;08/29/08&rdquo;</li>            </ul>            <p>Problems are listed <em>within category</em> in two views:</p>            <ul>              <li><strong>Alpha</strong> &ndash; problems are listed alphabetically with an instance count to the right of the problem if it occurs more than once, &ldquo;Coronary arteriosclerosis (2)&rdquo;</li>              <li><strong>Chrono</strong> &ndash; problems are listed chronologically  by most recent inception MM/DD/YY date, &ldquo;01/04/08 Coronary arteriosclerosis (2)&rdquo;</li>          </ul></div>            <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-reminders.png' width='310' height='139'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>Reminders </strong>presents suggested tests to order for diabetes management.</p>            <p>Suggestions are made  <em>if and only if</em>:</p>            <ul>              <li>No test values are found</li>              <li>A  test value is too old relative to current guidelines</li>              <li>A  test result is out of range relative to its goals</li>            </ul>      </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>          <div class='grid_5'>          <img src='./assets/explainer/explainer-allergies.png' width='310' height='62'></div>          <div class='grid_6 prefix_1'>            <p class='first'><strong>Allergies </strong>presents a list of current and past allergies.</p>            <ul>              <li>Allergies are listed alphabetically</li>              <li>Reactions are listed after each allergy name if available      </li>              <li>Unavailable results are presented as &quot;No known allergies&quot;    </li>            </ul>          </div>          <div class='clear'></div>          <div class='grid_12 row-border'></div>      <div class='grid_6'>             <div style='width:418px;padding-bottom:5px;margin-bottom:10px;border-bottom:1px dotted #666;'><img src='./assets/explainer/explainer-meds-alpha-t2.png' width='418' height='104'></div>             <div><img src='./assets/explainer/explainer-meds-chrono-label-t2.png' width='418' height='71'></div>          </div>          <div class='grid_5 prefix_1'>            <p class='first'><strong>Medications </strong>presents a list of current and past medications. The MM/DD/YY date of the most recent medication date is shown in the banner.</p>      <p>Medications are listed in two views:</p>            <ul>              <li><strong>Alpha</strong> &ndash; medications are listed alphabetically with an instance count  to the right of the medication if it occurs more than once in the same dose and frequency </li>              <li><strong>Chrono</strong> &ndash; medications are  listed chronologically by most recent inception MM/DD/YY date, &ldquo;04/25/09 Nitroglycerin&rdquo;</li>            </ul>          </div>      </div>");
}
function _changeToChineseLogic()
{	
	if($("#gender_sex").text()=="m"||$("#gender_sex").text()=="M")
	{
		$("#gender_sex").text("男");
	}
	if($("#gender_sex").text()=="f"||$("#gender_sex").text()=="F")
	{
		$("#gender_sex").text("女");
	}	
	if($("#diabetic_info_label").text()=="Diabetic")
	{
		$("#diabetic_info_label").text("糖尿病");
	}
	if($("#diabetic_how_long_text_label").text()!=""){
		$("#diabetic_how_long_text_label").text($("#diabetic_how_long_text_label").text().replace(/[^\d]/g,'')+" 年");
	}
	//alert($("#cv_comorbidities").html());
	if($("#cv_comorbidities").text()!=","){		
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('Chest pain','胸部疼痛'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('Essential hypertension','原发性高血压'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('Benign essential hypertension','良性高血压'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('No current CV comorbidities','现在没有心血管合并症'));
	}	
	_changeOtherProblemsToChinese();
	if($("#resolved_problems").text()!=",")
	{
		$("#resolved_problems").html($("#resolved_problems").html().replace('None known','没有'));
	}	
}
function _changeOtherProblemsToChinese()
{
	if($("#other_problems").text()!=","){	
		var str='[{"Acute respiratory failure":"急性呼吸衰竭","Chronic asthmatic bronchitis":"慢性喘息性支气管炎","Dehydration":"脱水","Otitis media":"中耳炎","otitis media":"中耳炎","foreign body in larynx":"在喉异物","Diabetes mellitus type 2":"2型糖尿病","Paralytic ileus":"麻痹性肠梗阻","Abdominal pain":"腹痛","Absence of menstruation":"无月经","Acidosis":"酸中毒","Constipation":"便秘","Dyspepsia and other specified disorders of function of stomach":"消化不良及其他胃功能紊乱","Gastroesophageal reflux disease":"胃食管反流病","Headache":"头痛","Hypokalemia":"低钾血症","Other and unspecified noninfectious gastroenteritis and colitis":"其他和未知的非感染性胃肠炎和结肠炎","Peptic ulcer without hemorrhage, without perforation AND without obstruction":"消化性溃疡:无出血，无穿孔和无梗阻","Pure hypercholesterolemia":"纯高胆固醇血症","Right upper quadrant pain":"右上腹痛","Acute frontal sinusitis":"急性额窦炎","Attention deficit hyperactivity disorder":"注意力缺陷多动障碍","Child attention deficit disorder":"儿童注意力缺陷障碍","Chronic sinusitis":"慢性鼻窦炎","Depressive disorder":"抑郁症","Disruptive behavior disorder":"破坏性行为障碍","Hyperlipidemia":"高脂血症","Oppositional defiant disorder":"对立违抗性障碍","Poliomyelitis vaccination":"脊髓灰质炎疫苗接种","Recurrent major depressive episodes: moderate":"复发性抑郁症发作，中度","Single major depressive episode, mild":"单重性抑郁发作，轻度","Single major depressive episode: moderate":"单重性抑郁发作，中度","Acute sinusitis":"急性鼻窦炎","Acute upper respiratory infection":"急性上呼吸道感染","Common cold":"普通感冒","Cough":"咳嗽","Croup":"哮吼咳嗽","Hypertrophy of tonsils":"扁桃体肿大","Needs influenza immunization":"需要接种流感疫苗","Otalgia":"耳痛","Other dyspnea and respiratory abnormality":"其他呼吸困难和呼吸异常","Abnormal weight loss":"不正常的体重减少"';
		str=str+'}]';	
		var jsonList=eval("("+str+")");	
		for(var key in jsonList[0]){ 
　　			$("#other_problems").html($("#other_problems").html().replace(key,jsonList[0][key]));
		}
		
	}
}
function _changeOtherProblemsToEnglish()
{
	if($("#other_problems").text()!=","){	
		var str='[{"急性呼吸衰竭":"Acute respiratory failure","慢性喘息性支气管炎":"Chronic asthmatic bronchitis","脱水":"Dehydration","中耳炎":"otitis media","在喉异物":"foreign body in larynx","2型糖尿病":"Diabetes mellitus type 2","麻痹性肠梗阻":"Paralytic ileus","腹痛":"Abdominal pain","无月经":"Absence of menstruation","酸中毒":"Acidosis","便秘":"Constipation","消化不良及其他胃功能紊乱":"Dyspepsia and other specified disorders of function of stomach","胃食管反流病":"Gastroesophageal reflux disease","头痛":"Headache","低钾血症":"Hypokalemia","其他和未知的非感染性胃肠炎和结肠炎":"Other and unspecified noninfectious gastroenteritis and colitis","消化性溃疡:无出血，无穿孔和无梗阻":"Peptic ulcer without hemorrhage, without perforation AND without obstruction","纯高胆固醇血症":"Pure hypercholesterolemia","右上腹痛":"Right upper quadrant pain","急性额窦炎":"Acute frontal sinusitis","注意力缺陷多动障碍":"Attention deficit hyperactivity disorder","儿童注意力缺陷障碍":"Child attention deficit disorder","慢性鼻窦炎":"Chronic sinusitis","抑郁症":"Depressive disorder","破坏性行为障碍":"Disruptive behavior disorder","高脂血症":"Hyperlipidemia","对立违抗性障碍":"Oppositional defiant disorder","脊髓灰质炎疫苗接种":"Poliomyelitis vaccination","复发性抑郁症发作，中度":"Recurrent major depressive episodes: moderate","单重性抑郁发作，轻度":"Single major depressive episode,mild","单重性抑郁发作，中度":"Single major depressive episode, moderate","急性鼻窦炎":"Acute sinusitis","急性上呼吸道感染":"Acute upper respiratory infection","普通感冒":"Common cold","咳嗽":"Cough","哮吼咳嗽":"Croup","扁桃体肿大":"Hypertrophy of tonsils","需要接种流感疫苗":"Needs influenza immunization","耳痛":"Otalgia","其他呼吸困难和呼吸异常":"Other dyspnea and respiratory abnormality","不正常的体重减少":"Abnormal weight loss"';
		str=str+'}]';	
		var jsonList=eval("("+str+")");	
		for(var key in jsonList[0]){ 
　　			$("#other_problems").html($("#other_problems").html().replace(key,jsonList[0][key]));
		}
		
	}
}
function _changeToEnglishLogic()
{
	if($("#gender_sex").text()=="男")
	{
		$("#gender_sex").text("m");
	}
	if($("#gender_sex").text()=="女")
	{
		$("#gender_sex").text("f");
	}
	if($("#diabetic_info_label").text()=="糖尿病")
	{
		$("#diabetic_info_label").text("Diabetic");
	}
	if($("#diabetic_how_long_text_label").text()!=","){
		$("#diabetic_how_long_text_label").text("for "+$("#diabetic_how_long_text_label").text().replace(/[^\d]/g,'')+" years");
	}
	if($("#cv_comorbidities").text()!=","){
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('胸部疼痛','Chest pain'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('原发性高血压','Essential hypertension'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('良性高血压','Benign essential hypertension'));
		$("#cv_comorbidities").html($("#cv_comorbidities").html().replace('现在没有心血管合并症','No current CV comorbidities'));
	}
	_changeOtherProblemsToEnglish();
	if($("#resolved_problems").text()!=",")
	{
		$("#resolved_problems").html($("#resolved_problems").html().replace('没有','None known'));
	}	
}