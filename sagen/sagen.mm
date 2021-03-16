<map version="freeplane 1.8.0">
<!--To view this file, download free mind mapping software Freeplane from http://freeplane.sourceforge.net -->
<node TEXT="Sagen" FOLDED="false" ID="ID_439065380" CREATED="1614014997412" MODIFIED="1614015019205" STYLE="oval">
<font SIZE="18"/>
<hook NAME="MapStyle" zoom="0.91">
    <properties edgeColorConfiguration="#808080ff,#ff0000ff,#0000ffff,#00ff00ff,#ff00ffff,#00ffffff,#7c0000ff,#00007cff,#007c00ff,#7c007cff,#007c7cff,#7c7c00ff" fit_to_viewport="false"/>

<map_styles>
<stylenode LOCALIZED_TEXT="styles.root_node" STYLE="oval" UNIFORM_SHAPE="true" VGAP_QUANTITY="24.0 pt">
<font SIZE="24"/>
<stylenode LOCALIZED_TEXT="styles.predefined" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="default" ICON_SIZE="12.0 pt" COLOR="#000000" STYLE="fork">
<font NAME="SansSerif" SIZE="10" BOLD="false" ITALIC="false"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.details"/>
<stylenode LOCALIZED_TEXT="defaultstyle.attributes">
<font SIZE="9"/>
</stylenode>
<stylenode LOCALIZED_TEXT="defaultstyle.note" COLOR="#000000" BACKGROUND_COLOR="#ffffff" TEXT_ALIGN="LEFT"/>
<stylenode LOCALIZED_TEXT="defaultstyle.floating">
<edge STYLE="hide_edge"/>
<cloud COLOR="#f0f0f0" SHAPE="ROUND_RECT"/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.user-defined" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="styles.topic" COLOR="#18898b" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subtopic" COLOR="#cc3300" STYLE="fork">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.subsubtopic" COLOR="#669900">
<font NAME="Liberation Sans" SIZE="10" BOLD="true"/>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.important">
<icon BUILTIN="yes"/>
</stylenode>
</stylenode>
<stylenode LOCALIZED_TEXT="styles.AutomaticLayout" POSITION="right" STYLE="bubble">
<stylenode LOCALIZED_TEXT="AutomaticLayout.level.root" COLOR="#000000" STYLE="oval" SHAPE_HORIZONTAL_MARGIN="10.0 pt" SHAPE_VERTICAL_MARGIN="10.0 pt">
<font SIZE="18"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,1" COLOR="#0033ff">
<font SIZE="16"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,2" COLOR="#00b439">
<font SIZE="14"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,3" COLOR="#990000">
<font SIZE="12"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,4" COLOR="#111111">
<font SIZE="10"/>
</stylenode>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,5"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,6"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,7"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,8"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,9"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,10"/>
<stylenode LOCALIZED_TEXT="AutomaticLayout.level,11"/>
</stylenode>
</stylenode>
</map_styles>
</hook>
<hook NAME="AutomaticEdgeColor" COUNTER="4" RULE="ON_BRANCH_CREATION"/>
<node TEXT="Flow Methods" POSITION="right" ID="ID_1557366035" CREATED="1614015040056" MODIFIED="1614015051794">
<edge COLOR="#ff00ff"/>
<node TEXT="Compositional" ID="ID_160650350" CREATED="1614015052296" MODIFIED="1614015134085">
<node TEXT="Multiple Composer" ID="ID_1347785996" CREATED="1614015134675" MODIFIED="1614015150814"/>
<node TEXT="Composer order" ID="ID_172431510" CREATED="1614015151564" MODIFIED="1614015181295">
<node TEXT="Is usually required somewhere" ID="ID_1889026082" CREATED="1614015181805" MODIFIED="1614015186351"/>
<node TEXT="but does not always matter in every step" ID="ID_1548507079" CREATED="1614015186517" MODIFIED="1614015192695"/>
</node>
<node TEXT="Requestor sends to an Orchestrator to compose" ID="ID_1962195513" CREATED="1614015207470" MODIFIED="1614015242113"/>
<node TEXT="The Orchestrator may parallelize/Serialize the process" ID="ID_924905672" CREATED="1614015242983" MODIFIED="1614015293851">
<node TEXT="Sounds like a non-compiled problem" ID="ID_1191682375" CREATED="1614015299880" MODIFIED="1614015325035"/>
<node TEXT="Orchestrator is a Exer" ID="ID_1880328417" CREATED="1614015333345" MODIFIED="1614015362876"/>
<node TEXT="Message Routes messages" ID="ID_222425522" CREATED="1614015363578" MODIFIED="1614015392573"/>
<node TEXT="Public/Private Manager" ID="ID_378396412" CREATED="1614015392890" MODIFIED="1614015402021"/>
</node>
</node>
</node>
<node TEXT="Runtime Environment" POSITION="right" ID="ID_1674840559" CREATED="1614015019719" MODIFIED="1614015415925">
<edge COLOR="#ff0000"/>
<node TEXT="Layered Stack" ID="ID_687904068" CREATED="1614015416539" MODIFIED="1614015433997">
<node TEXT="Stack Key" ID="ID_1518346734" CREATED="1614015443772" MODIFIED="1614015445926">
<node TEXT="EventName" ID="ID_1054003071" CREATED="1614015450628" MODIFIED="1614015544104"/>
<node TEXT="EventParameter" ID="ID_1701203559" CREATED="1614015453916" MODIFIED="1614015529160"/>
<node TEXT="EventParameterClass" ID="ID_1838689174" CREATED="1614015529710" MODIFIED="1614015535479">
<node TEXT="One Class" ID="ID_703459114" CREATED="1614015574910" MODIFIED="1614015577776"/>
<node TEXT="SubClass of Class" ID="ID_264384842" CREATED="1614015578302" MODIFIED="1614015581944"/>
</node>
<node TEXT="EventParameterClassObject" ID="ID_1449072783" CREATED="1614015536038" MODIFIED="1614015540351">
<node TEXT="Specific Object" ID="ID_1301721927" CREATED="1614015589615" MODIFIED="1614015602088">
<node TEXT="With Key" ID="ID_695173023" CREATED="1614015606943" MODIFIED="1614015609225"/>
<node TEXT="With Id" ID="ID_252746911" CREATED="1614015612671" MODIFIED="1614015614297"/>
</node>
<node TEXT="Any Object" ID="ID_413885157" CREATED="1614015602639" MODIFIED="1614015605633">
<node TEXT="Filtered" ID="ID_439292700" CREATED="1614015615319" MODIFIED="1614015621289">
<node TEXT="By List" ID="ID_472326126" CREATED="1614015626175" MODIFIED="1614015651346"/>
<node TEXT="By Function" ID="ID_127268334" CREATED="1614015651648" MODIFIED="1614015654810"/>
<node TEXT="By Query" ID="ID_1461159484" CREATED="1614015659616" MODIFIED="1614015663081"/>
</node>
</node>
</node>
</node>
<node TEXT="Name Resolution" ID="ID_110771926" CREATED="1614015446428" MODIFIED="1614015449838">
<node TEXT="Order of Enclosement" ID="ID_106698097" CREATED="1614015670448" MODIFIED="1614015692179"/>
<node TEXT="Order of Flow" ID="ID_1702209075" CREATED="1614015692576" MODIFIED="1614015704289">
<node TEXT="(In Compository)" ID="ID_1736500859" CREATED="1614015704292" MODIFIED="1614015712139"/>
</node>
<node TEXT="Specific order" ID="ID_857344497" CREATED="1614015714705" MODIFIED="1614015719377">
<node TEXT="I.e., if X is present, then variables come from there" ID="ID_1343947002" CREATED="1614015719380" MODIFIED="1614015753987">
<node TEXT="Look Aside" ID="ID_1634554544" CREATED="1614015760498" MODIFIED="1614015767684"/>
</node>
</node>
<node TEXT="Resolves to Source Data" ID="ID_255158945" CREATED="1614016680483" MODIFIED="1614016704493">
<node TEXT="Path to Source Data is generated" ID="ID_1244919399" CREATED="1614016706795" MODIFIED="1614016723293"/>
<node TEXT="Sounds like compositional procedure" ID="ID_1738455821" CREATED="1614016731579" MODIFIED="1614016789865"/>
</node>
</node>
<node TEXT="Listener" ID="ID_1507187878" CREATED="1614016817613" MODIFIED="1614016837199">
<node TEXT="Routes Original Message Scope to New Action Scope" ID="ID_198587736" CREATED="1614016837717" MODIFIED="1614016859950"/>
</node>
<node TEXT="Stack Type" ID="ID_1233722231" CREATED="1614016875659" MODIFIED="1614016877684">
<node TEXT="Event" ID="ID_1885848309" CREATED="1614016878219" MODIFIED="1614016883220">
<node TEXT="Before" ID="ID_1048400108" CREATED="1614016923832" MODIFIED="1614016935930"/>
<node TEXT="Start" ID="ID_863141052" CREATED="1614016936288" MODIFIED="1614016937850"/>
<node TEXT="End" ID="ID_493276497" CREATED="1614016930864" MODIFIED="1614016932458"/>
<node TEXT="Finally" ID="ID_1528247408" CREATED="1614016940120" MODIFIED="1614016943146"/>
<node TEXT="Catch" ID="ID_1003238113" CREATED="1614016950703" MODIFIED="1614016952897">
<node TEXT="Like Airplane and discard problems" ID="ID_1378420974" CREATED="1614016953535" MODIFIED="1614016967512"/>
</node>
</node>
<node TEXT="Flow" ID="ID_489372254" CREATED="1614016884306" MODIFIED="1614016921586">
<node TEXT="Automatic Ends" ID="ID_493717568" CREATED="1614016969055" MODIFIED="1614016982200"/>
<node TEXT="Unless there are hooks" ID="ID_1243352262" CREATED="1614016982926" MODIFIED="1614016991439"/>
</node>
<node TEXT="Task Actors" ID="ID_305136516" CREATED="1614016992182" MODIFIED="1614017026078">
<node TEXT="Resource Aware" ID="ID_1685950433" CREATED="1614017001845" MODIFIED="1614017041918">
<node TEXT="Protection to Data" ID="ID_624370748" CREATED="1614017042372" MODIFIED="1614017051837"/>
<node TEXT="Provides Access/Model to Data" ID="ID_1725671009" CREATED="1614017052228" MODIFIED="1614017065029"/>
</node>
</node>
</node>
</node>
</node>
</node>
</map>
